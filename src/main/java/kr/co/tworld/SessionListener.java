package kr.co.tworld;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import org.springframework.beans.factory.annotation.Autowired;
import kr.co.tworld.main.service.LoginService;

public class SessionListener implements HttpSessionListener {
	
	@Autowired
	private LoginService loginService;
	
	@Override
	public void sessionCreated(HttpSessionEvent se) {
		
		//System.out.println("session Created   : " + se.getSession().getId());
		
	}
	
	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
		
		if(se.getSession().getId() != null){
			loginService.loginListener(se.getSession().getId());
		}
		
		//System.out.println("session Destroyed : " + se.getSession().getId());
		
	}
}