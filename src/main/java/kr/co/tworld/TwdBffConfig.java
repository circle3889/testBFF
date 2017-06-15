package kr.co.tworld;

import java.nio.charset.Charset;

import javax.servlet.http.HttpSessionListener;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.config.java.AbstractCloudConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.session.data.redis.RedisFlushMode;
import org.springframework.session.data.redis.config.ConfigureRedisAction;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.web.client.RestTemplate;

import kr.co.tworld.util.FreeBillUtil;
import kr.co.tworld.util.GsonUtil;

@Configuration
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 600,redisFlushMode=RedisFlushMode.IMMEDIATE)
public class TwdBffConfig extends AbstractCloudConfig  {
	
	@Value("${services.redis.name}")
	private String redisName;
	
	@Bean //로컬 redis 접속
//	JedisConnectionFactory jedisConnectionFactory() {
//
//	    JedisConnectionFactory jedisConFactory = new JedisConnectionFactory();
//	    
//	    jedisConFactory.setHostName("169.56.68.111");
//	    jedisConFactory.setPort(19236);
//	    jedisConFactory.setPassword("8f05223c-1311-4fc2-b5f8-38302c679092");
//	    
//	    return jedisConFactory;
//	}

	public RedisConnectionFactory redisConnectionFactory() {
		return connectionFactory().redisConnectionFactory(redisName);
	}
	 
	@Bean
	public RedisTemplate<String, Object> redisTemplate() {
	    RedisTemplate<String, Object> template = new RedisTemplate<String, Object>();
	    template.setConnectionFactory(redisConnectionFactory());
//	    template.setConnectionFactory(jedisConnectionFactory());
	    return template;
	}
	
	@Bean
	public static ConfigureRedisAction configureRedisAction() {
		return ConfigureRedisAction.NO_OP;
	}
	
	@Bean
	public RestTemplate restTemplate(){
		
		RestTemplate template = new RestTemplate();
		
		template.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
		
		return template;
	}
	
	@Bean
 	public HttpSessionListener httpSessionListener(){
  	    return new SessionListener(); 
  	}
	
	@Bean
 	public GsonUtil gsonUtil(){
  	    return new GsonUtil(); 
  	}
	
	@Bean
 	public FreeBillUtil freeBillUtil(){
  	    return new FreeBillUtil(); 
  	}

}
