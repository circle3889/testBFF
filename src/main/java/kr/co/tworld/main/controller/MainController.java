package kr.co.tworld.main.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.tworld.main.service.FreebillService;
import kr.co.tworld.main.service.LoginService;
import kr.co.tworld.main.service.MainService;
import kr.co.tworld.main.service.RedisService;

@Controller
public class MainController {
	
	private static Logger logger = LoggerFactory.getLogger(MainController.class);
	
	@Autowired
	private FreebillService freebillService;
	
	@Autowired
	private LoginService loginService;
	
	@Autowired
	private RedisService redisService;
	
	@Autowired
	private MainService mainService;
	
	private String TOKEN_ID;
	
	@RequestMapping("/login.do")
	public String login(HttpServletRequest request) {
		
		return "/login/login";
	}
	
	@RequestMapping("/")
	public String main(Model model, HttpServletRequest request) {
		
		TOKEN_ID = redisService.setToken((String) request.getSession().getAttribute("tokenId"));
		
		model.addAttribute("user", redisService.getSession(TOKEN_ID));
		model.addAttribute("isLogin", redisService.setIsLogin(TOKEN_ID));
		
		return "index";
		
	}
	
	@RequestMapping("/loginProc.do")
	public String loginProcDo(Model model, @RequestParam("id") String id, @RequestParam("password") String password, HttpServletRequest request) {
		
		model.addAttribute("loginProc", loginService.loginProc(id, password, request));
		
		return "loginProc";
	}
	
	@ResponseBody
	@RequestMapping("/loginProc")
	public ResponseEntity<String> loginProc(@RequestParam("id") String id, @RequestParam("password") String password, HttpServletRequest request) {

		return loginService.loginProc(id, password, request);
	}
	
	@RequestMapping("/logoutProc.do")
	public String logoutProcDo(Model model, HttpServletRequest request) {
		
		model.addAttribute("loginProc", loginService.logoutProc(request));
		
		request.getSession().invalidate();
		
		return "logoutProc";
	}
	
	@ResponseBody
	@RequestMapping("/logoutProc")
	public ResponseEntity<String> logoutProc(HttpServletRequest request) {
		
		ResponseEntity<String> responseEntity = loginService.logoutProc(request);
		
		request.getSession().invalidate();
		
		return responseEntity;
	}
	
	@RequestMapping("/freebill_main.do")
	public String getFreeBillMain(Model model, HttpServletRequest request) {
		
		TOKEN_ID = redisService.setToken((String) request.getSession().getAttribute("tokenId"));
		
		HashMap<String, Object> user = redisService.getSession(TOKEN_ID);
		
		model.addAttribute("isLogin", redisService.setIsLogin(TOKEN_ID));
		model.addAttribute("user", user);
		
		return "freebill_main";
	}
	
	@ResponseBody
	@RequestMapping("/freebill_main_ajax")
	public ResponseEntity<String> freeBillMainAjax(HttpServletRequest request) {
		
		TOKEN_ID = redisService.setToken((String) request.getSession().getAttribute("tokenId"));
		
		return freebillService.getFreeBillMainAjax(TOKEN_ID);
	}
	
	@RequestMapping("/freebill_detail.do")
	public String getFreeBillDetail(Model model, HttpServletRequest request) {
		
		TOKEN_ID = redisService.setToken((String) request.getSession().getAttribute("tokenId"));
		
		HashMap<String, Object> user = redisService.getSession(TOKEN_ID);
		
		model.addAttribute("isLogin", redisService.setIsLogin(TOKEN_ID));
		model.addAttribute("user", user);
		
		return "freebill_detail";
	}
	
	@ResponseBody
	@RequestMapping("/freebill_detail_ajax")
	public Map<String,Object> freeBillDetailAjax(HttpServletRequest request) {
		
		TOKEN_ID = redisService.setToken((String) request.getSession().getAttribute("tokenId"));
		
		return freebillService.getFreeBillDetailAjax(TOKEN_ID);
	}
	
	@ResponseBody
	@RequestMapping("/main_banner_ajax")
	public ResponseEntity<String> mainBannerAjax(@RequestParam("reqType") String reqType) {
		
		return mainService.mainBannerAjax(reqType);
	}
	
	@ResponseBody
	@RequestMapping("/main_notice_ajax")
	public ResponseEntity<String> mainNoticeAjax() {
		
		return mainService.mainNoticeAjax();
	}
	
	@ResponseBody
	@RequestMapping("/main_guide_ajax")
	public ResponseEntity<String> mainGuideAjax() {
		
		return mainService.mainGuideAjax();
	}
	
	@ResponseBody
	@RequestMapping("/main_ajax")
	public ResponseEntity<String> mainAjax(HttpServletRequest request) {
		
		TOKEN_ID = redisService.setToken((String) request.getSession().getAttribute("tokenId"));
		
		return mainService.mainAjax(TOKEN_ID);
	}
	
	@ResponseBody
	@RequestMapping("/drive")
	public void drive(HttpServletRequest request, @RequestParam(value="cnt", defaultValue="3") int cnt) {
		
		for(int i=1; i<=cnt; i++){
			
			ResponseEntity<String> result = loginService.loginProcTest("1111", "2222", request);
			
			System.out.println("[B] CNT : " + i + " : " + result.getBody());
			
			try {
				Thread.sleep(400);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
		}
	}
	
	
	
}