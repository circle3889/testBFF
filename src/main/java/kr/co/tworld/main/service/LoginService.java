package kr.co.tworld.main.service;

import javax.servlet.http.HttpServletRequest;

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

@Service
public class LoginService {
	
	private static Logger logger = LoggerFactory.getLogger(LoginService.class);
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private RedisService redisService;
	
	@Value("${uri.apigateway}")
	private String URI_APIGATEWAY;
	
	@Value("${uri.login}")
	private String URI_LOGIN;


	public ResponseEntity<String> loginProcTest(String id,String password,HttpServletRequest request) {
		
	    String sessionId = request.getSession().getId();
	    
		return restTemplate.getForEntity(URI_APIGATEWAY + URI_LOGIN + "/loginProc?id={id}&password={password}&SESSION={sessionId}", String.class, id,password,sessionId);
		
	}
	
	@HystrixCommand(fallbackMethod = "loginProcFallback")
	public ResponseEntity<String> loginProc(String id, String password, HttpServletRequest request) {
		
	    String sessionId = request.getSession().getId();
	    
	    //logger.debug("Redis Session : " + request.getSession().getId());
	    
	    //logger.debug(URI_APIGATEWAY + URI_LOGIN + "/loginProc");
	    
	    ResponseEntity<String> result = restTemplate.getForEntity(URI_APIGATEWAY + URI_LOGIN + "/loginProc?id={id}&password={password}&SESSION={sessionId}", String.class, id,password,sessionId);
	    
		return result;
		
	}
	
	public ResponseEntity<String> loginProcFallback(String id, String password, HttpServletRequest request, Throwable t) {
		
		logger.debug(t.toString());
		
	    return new ResponseEntity<String>(errorJsonObject().toString(), HttpStatus.OK);
    }
	
	@HystrixCommand(fallbackMethod = "logoutProcFallback")
	public ResponseEntity<String> logoutProc(HttpServletRequest request) {
		
		String sessionId = request.getSession().getId();
	    
		return restTemplate.getForEntity(URI_APIGATEWAY + URI_LOGIN + "/logoutProc?SESSION={sessionId}", String.class, sessionId);
		
	}
	
	public ResponseEntity<String> logoutProcFallback(HttpServletRequest request,Throwable t) {	
		
		logger.debug(t.toString());
		
	    return new ResponseEntity<String>(errorJsonObject().toString(), HttpStatus.OK);
    }
	
	@HystrixCommand(fallbackMethod = "loginListenerFallback")
	public ResponseEntity<String> loginListener(String sessionId) {
		
		return restTemplate.getForEntity(URI_APIGATEWAY + URI_LOGIN + "/loginListener?SESSION={sessionId}", String.class, sessionId);
		
	}
	
	public ResponseEntity<String> loginListenerFallback(String sessionId,Throwable t) {	
		
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