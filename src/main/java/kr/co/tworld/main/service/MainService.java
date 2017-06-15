package kr.co.tworld.main.service;

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
public class MainService {
	
	private static Logger logger = LoggerFactory.getLogger(MainService.class);
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private RedisService redisService;
	
	@Value("${uri.apigateway}")
	private String URI_APIGATEWAY;
	
	@Value("${uri.main}")
	private String URI_MAIN;
	
	@HystrixCommand(fallbackMethod = "mainBannerAjaxFallback")
	public ResponseEntity<String> mainBannerAjax(String reqType) {
		
		return restTemplate.getForEntity(URI_APIGATEWAY + URI_MAIN + "/main/mainBanner?reqType={reqType}", String.class, reqType);
		
	}
	
	public ResponseEntity<String> mainBannerAjaxFallback(String reqType, Throwable t) {
		
		logger.debug(t.toString());
		
	    return new ResponseEntity<String>(errorJsonObject().toString(), HttpStatus.OK);
		
	}
	
	@HystrixCommand(fallbackMethod = "mainNoticeAjaxFallback")
	public ResponseEntity<String> mainNoticeAjax() {
		
		return restTemplate.getForEntity(URI_APIGATEWAY + URI_MAIN + "/main/notice", String.class);
		
	}
	
	public ResponseEntity<String> mainNoticeAjaxFallback(Throwable t) {
		
		logger.debug(t.toString());
		
	    return new ResponseEntity<String>(errorJsonObject().toString(), HttpStatus.OK);
		
	}
	
	@HystrixCommand(fallbackMethod = "mainGuideAjaxFallback")
	public ResponseEntity<String> mainGuideAjax() {
		
		return restTemplate.getForEntity(URI_APIGATEWAY + URI_MAIN + "/main/guide", String.class);
		
	}
	
	public ResponseEntity<String> mainGuideAjaxFallback(Throwable t) {
		
		logger.debug(t.toString());
		
	    return new ResponseEntity<String>(errorJsonObject().toString(), HttpStatus.OK);
	}
	
	@HystrixCommand(fallbackMethod = "mainAjaxFallback")
	public ResponseEntity<String> mainAjax(String tokenId) {
		
		return restTemplate.getForEntity(URI_APIGATEWAY + URI_MAIN + "/main?tokenId={tokenId}", String.class, tokenId);
		
	}
	
	public ResponseEntity<String> mainAjaxFallback(String tokenId, Throwable t) {
		
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