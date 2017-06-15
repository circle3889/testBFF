package kr.co.tworld.main.service;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisService {
	
	@Autowired
	@Resource(name = "redisTemplate")
	private RedisTemplate<String, Object> template;
	
	public String getCommonCode(String code) {
		
    	String msg = (String) template.opsForValue().get(code);

		return msg;
		
	}
	
	public HashMap<String, Object> getSession(String tokenId) {
		
		if (tokenId.equals("")) {
			return null;
		}
		
		HashMap<String, Object> user = new HashMap<String, Object>();

		HashMap<String, Object> userSession = (HashMap<String, Object>) template.opsForHash().get(tokenId, "all");
		String selectedsvcMgmtNum = (String) template.opsForHash().get(tokenId, "selected");
		
		int svcCnt = (int) userSession.get("svcCnt");
		String custNm = (String) userSession.get("custNm");
		String userId = (String) userSession.get("userId");
		List<String> svcMgmtNum = (List<String>)userSession.get("svcMgmtNum");
		List<String> svcNum = (List<String>)userSession.get("svcNum");
		HashMap<String, Object> selectedSvcMgmtNum = (HashMap<String, Object>) userSession.get(selectedsvcMgmtNum);

		user.put("svcCnt", svcCnt);
		user.put("custNm", custNm);
		user.put("userId", userId);
		user.put("svcMgmtNum", svcMgmtNum);
		user.put("svcNum", svcNum);
		user.put("selectedSvcMgmtNum", selectedSvcMgmtNum);
		
		return user;
	}
	
	public String getData(String token, String key) {
		String re = null;
		
		switch (key) {
			case "svcMgmtNum":
			case "svcNum":
				//System.out.println("[L] " + key + " :");
				re = getList(token + ":" + key).toString();
				break;
			default:
				if (key.length() > 8) {
					//System.out.println("[H] " + key + " :");
					re = getHash(token + ":" + key).toString();
				} else {
					//System.out.println("[S] " + key + " :");
					re = getString(token + ":" + key);
				}
				break;
		}
		
		return re;
	}
	
	public List getList(String token) {
		List list = (List) template.opsForValue().get(token);
		
		for (int i = 0; i < list.size(); i++) {
			//System.out.println("              " + list.get(i));
		}
		
		return list;
	}
	
	public HashMap getHash(String token) {
		HashMap dataMap = (HashMap) template.opsForValue().get(token);
		
		Iterator iterator = dataMap.entrySet().iterator();
		while (iterator.hasNext()) {
			Entry entry = (Entry) iterator.next();
			//System.out.println("              " + entry.getKey() + " : " + entry.getValue());
		}
		
		return dataMap;
	}
	
	public String getString(String token) {
		String re = (String) template.opsForValue().get(token);
		
		//System.out.println("              " + re);
		
		return re;
	}
	
	public String setToken(String tokenId) {
		String token = "";
		
		if (tokenId != null && !tokenId.equals("")) {
			token = tokenId;
		} else {
			token = "";
		}
		
		return token;
	}
	
	public boolean setIsLogin(String tokenId) {
		
		if (!tokenId.equals("")) {
			return true;
		} else {
			return false;
		}
	}
}