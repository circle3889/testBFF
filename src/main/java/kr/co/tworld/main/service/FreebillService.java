package kr.co.tworld.main.service;

import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;

import kr.co.tworld.util.FreeBillUtil;
import kr.co.tworld.util.GsonUtil;

@Service
public class FreebillService {
	
	private static Logger logger = LoggerFactory.getLogger(FreebillService.class);

	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private RedisService redisService;
	
	@Value("${uri.apigateway}")
	private String URI_APIGATEWAY;
	
	@Value("${uri.freebill}")
	private String URI_FREEBILL;
	
	@Autowired
	private GsonUtil gsonUtil;
	
	@Autowired
	private FreeBillUtil freeBillUtil;
	
	@HystrixCommand(fallbackMethod = "getFreeBillMainAjaxFallback")
	public ResponseEntity<String> getFreeBillMainAjax(String tokenId) {
		
		return restTemplate.getForEntity(URI_APIGATEWAY + URI_FREEBILL + "/freebill/main?tokenId={tokenId}", String.class, tokenId);
		
	}
	
	private ResponseEntity<String> getFreeBillMainAjaxFallback(String tokenId, Throwable t) {
		
		logger.debug(t.toString());
		
	    return new ResponseEntity<String>(errorJsonObject().toString(), HttpStatus.OK);
        
    }
	
	//@HystrixCommand(fallbackMethod = "getFreeBillDetailAjaxFallback")
	public Map<String,Object> getFreeBillDetailAjax(String tokenId) {
		
		ResponseEntity<String> restResult = restTemplate.getForEntity(URI_APIGATEWAY + URI_FREEBILL + "/freebill/detail?tokenId={tokenId}", String.class, tokenId);
				
		Map<String,Object> map = gsonUtil.stringToJson(restResult.getBody());
		
		map = freeBillUtil.setDataString(map);
		
		return map;
		
	}
	
	private ResponseEntity<String> getFreeBillDetailAjaxFallback(String tokenId, Throwable t) {
		
		logger.debug(t.toString());
		
	    return new ResponseEntity<String>(errorJsonObject().toString(), HttpStatus.OK);
        
    }
	
	@HystrixCommand(fallbackMethod = "getFreeBillMainAjaxFallback2")
	public ResponseEntity<String> getFreeBillMainAjax2(String tokenId) {
		
		return restTemplate.getForEntity(URI_APIGATEWAY + URI_FREEBILL + "/freebill/main?tokenId={tokenId}", String.class, tokenId);
		
	}
	
	private ResponseEntity<String> getFreeBillMainAjaxFallback2(String tokenId, Throwable t) {
		
		logger.debug(t.toString());
		
	    return new ResponseEntity<String>(errorJsonObject().toString(), HttpStatus.OK);
        
    }
	
	private JSONObject errorJsonObject(){
		
		JSONObject json = new JSONObject();
		
	    try {
			json.put("returnCode", "error");
			json.put("returnMsg", redisService.getCommonCode("AJAX_ERROR"));
		} catch (JSONException e) {
			e.printStackTrace();
		}
	    
	    return json;
		
	}
}