/*************************************************************************************************
 *	@CreateDate			: 2016.05.11
 *	@ModifyDate			: 2016.05.11
 *	@FileName			: common_tweb.js
 *	@Author				: ndarkness
 *
 1. log				: 로그레벨 설정
 2. setEnv   		: 환경변수 및 backend목록을 세팅
 3. showProgress	: 프로그레스 노출 처리
 4. callbackTemplate: 템플릿 바인딩처리
 5. renderData		: 데이터 가져오기 및 콜백함수 실행
 6. execute		    : 실행
 *************************************************************************************************/



 ( function(){
 	
	//환경변수
	var _env = {
		logView : "N"
	};
	
	//호출페이지 주소
	var _locationUrl = location.pathname;
	
	//backend 목록
	var _backendList = {};
	
	//백엔드 기준정보 가져오기
 	var _urlJs="<script type='text/javascript' charset='euc-kr' src='/inc/js/tweb/common_backend.js'></script>";
 	$('head').append(_urlJs);	
		
	
	//공통 스크립트 제어 클래스
	tweb = {
		
		//로그레벨 설정
		log : function(obj1, obj2){
			if(_env.logView == "Y"){
				if(obj2 == undefined){
					console.log(obj1);
				}else{
					console.log(obj1+" = ", obj2);
				}
			}
		},
		
		//환경변수 및 backend목록을 세팅
		setEnv : function(){
		
			if("undefined" !== typeof(tweb_env)){
				_env = $.extend(_env, tweb_env);
			}
			
			_backendList = _urlJson[_locationUrl];
		},
		
		//프로그레스 노출 처리
		showProgress : function(){
			var DEFAULT_LOAD_TAG = "<div class='tSpinnerA'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div><div class='bounce4'></div></div>";
			
			for(var key in _backendList){
				for (var i=1, len=_backendList[key].cnt; i<=len; i++){
					var loading = "";
					var tpId    = key+i;
					
					if("undefined" !== typeof(tweb_backend) && "undefined" !== typeof(tweb_backend[tpId])){
						loading = tweb_backend[tpId].loading || "no";
						
						tweb.log("tpId", tpId);
						tweb.log("loading", loading);
						
						if(loading != "no"){
							$("#"+tpId).html(loading);
						}
					}else{
						$("#"+tpId).html(DEFAULT_LOAD_TAG);
					}				
				}
			}
		},
		
		//템플릿 바인딩처리
		callbackTemplate : function(type, tpCnt, tpId, tpOnAfterBinding, data){
			var suffix = "";
			
			switch(type){
				case "0000" : //정상
					suffix = "_normal";
					break;
				case "0004" : //차단
					suffix = "_block";
					break;
				case "0006" : //권한불가
					suffix = "_notAllow";
					break;
				default :
					tweb.log("default");
					break;				
			}
			
			for(var i=1; i<=tpCnt; i++){
				var source = $("#"+tpId+suffix+i).html();
				var template = Handlebars.compile(source);			
				var html = template(data);
				$("#"+tpId+i).html(html);
			}
		
			//핸들바 바인딩 완료 후에 실행
			if("_normal" == suffix){
				if("no" != tpOnAfterBinding){
					if("undefined" !== typeof(onAfterBinding)){
						tweb.log("onAfterBinding is call on "+tpId);
						onAfterBinding.init(data);
					}				
				}
			};			
		},
		
		//데이터 가져오기 및 콜백함수 실행
		renderData : function(key, value){
		
			tweb.log("renderData start ====================================================");
			var tpId  = key;
			var tpUrl = value.url;
			var tpCnt = value.cnt;
			var tpTimeout = 0;
			var tpError   = "default"; //error 
			var tpBlock   = "default"; //차단
			var tpAuth    = "default";  //권한
			var tpOnAfterBinding = ""; //바인딩 후에 onAfterBinding()을 호출할 것인지
			var parameters = getParameters();
			var param = "";
			
			if("undefined" !== typeof(tweb_backend) && "undefined" !== typeof(tweb_backend[tpId])){
				tpTimeout = tweb_backend[tpId].timeout || 0;
				tpError   = tweb_backend[tpId].error || "default";
				tpBlock   = tweb_backend[tpId].block || "default";
				tpAuth    = tweb_backend[tpId].auth || "default";  
				tpOnAfterBinding = tweb_backend[tpId].onAfterBinding || "";  
			}			

			//모든 파라메터들을 그래로 넘겨준다.
			if("undefined" !== typeof(parameters)){
				for(var key in parameters){
					param += key + "=" + parameters[key] + "&";	
				}
			}
			
			tweb.log("tpId", tpId);
			tweb.log("tpUrl", tpUrl);
			tweb.log("tpCnt", tpCnt);			
			tweb.log("tpTimeout", tpTimeout);
			tweb.log("tpError", tpError);
			tweb.log("tpBlock", tpBlock);
			tweb.log("tpAuth", tpAuth);
			tweb.log("tpOnAfterBinding", tpOnAfterBinding);
			tweb.log("param = "+param);
			
			$.ajax({
				type:"post",
				url: tpUrl,
				data: param,
				timeout: tpTimeout,
				dataType:"json",
				async: true, 
				contentType: "application/x-www-form-urlencoded; charset=UTF-8", 
				
				success:function(result){
					tweb.log("success!!!");
					
					var twdCmn = result.RESULT;
					tweb.log("twdCmn.RTNCD: " + twdCmn.RTNCD);
					
					switch(twdCmn.RTNCD){
						
						case '0000' :
							tweb.callbackTemplate("0000", tpCnt, tpId, tpOnAfterBinding, result);
							break;
						
						case '0001' :
							tweb.log("common error");
							
							if(tpError != "default"){ 
								tweb.callbackTemplate("0001", tpCnt, tpError, "", result);
							}else{
								location.replace(twdCmn.ERRURL+"?errCd="+twdCmn.ERRCD+"&errMsg="+twdCmn.ERRMSG);
							}
							break;
						
						case '0002' :
							tweb.log("로그인 요청");
							location.replace("/jsp/common/loginout/view/app_login_alert.jsp");
							break;
							
						case '0003' :
							tweb.log("view resolver");
							tweb.log("twdCmn.DISPATCHERURL: "+ twdCmn.DISPATCHERURL);

							if(twdCmn.DISPATCHERURL != ""){
								location.replace(twdCmn.DISPATCHERURL);
							}else{
								tweb.log("viewResolver를 설정해주세요.");
								tweb.error();
							}
							break;

						case '0004' :
							tweb.log("화면 차단");
							if(tpBlock != "default"){ 
								tweb.callbackTemplate("0004", tpCnt, tpBlock, "", result);
							}else{
								location.replace("/common/error/error_system_check.html");
							}
							break;
							
						case '0005' :
							tweb.log("고객비밀번호");
							location.replace(twdCmn.PWDURL);
							break;
						
						case '0006' :
							tweb.log("권한 안내");
							if(tpAuth != 'default'){ 
								tweb.callbackTemplate("0006", tpCnt, tpAuth, "", result);
							}else{
								location.replace(twdCmn.GUIDEURL);
							}
							break;
							
						case '0007' :
							tweb.log("2차 인증");
							location.replace(twdCmn.AUTHURL+"&REURL=http%3A%2F%2Fm2.tworld.co.kr"+encodeURIComponent(_locationUrl));
							break;
						
						default :
							tweb.log("default");
							break;
					}
				},
				
				error:function(a, b, c){
				
					console.error("ajax error("+b+")");
					var errMsg = {};
					
					if (b.indexOf("timeout")>-1) {
						errMsg = {ERRCD:'TIMEOUT', ERR: '잠시후 다시 시도해주세요.'};
					}else{
						errMsg = {ERRCD:'ERROR', ERR: '잠시후 다시 시도해주세요.'};
					}
					
					if(tpError != "default"){ 
						tweb.callbackTemplate("0001", tpCnt, tpError, "", errMsg);
					}else{
						location.replace("/jsp/common/error/ErrorMsg_full.jsp?errCd="+errMsg.ERRCD+"&errMsg="+errMsg.ERR);
					}											
				}
			});
			
			tweb.log("renderData end ====================================================");
		},
	
		//실행함수
		execute: function() {
			this.setEnv();
			this.showProgress();
			
			for(var key in _backendList){
				this.renderData(key, _backendList[key]);
			}
		},
				
		//종료함수
		endFunction : function(){}
	};
	
	
	//파라메터 가져오기
	var getParameters = function(){
		var parameterMap = {};
		var parameters = window.location.search.substr(1);
		var splitParameters = parameters.split("&");
		for(var i=0; i<splitParameters.length; i++){
			var parameter = splitParameters[i];
			var splitParameter = parameter.split("=");
			parameterMap[splitParameter[0]] = splitParameter[1];
		}
		return parameterMap;		
	}	
		
} )( window );


//tweb 실행
jQuery( function(){
	tweb.execute();
});

//미니마이티 구성하기
var MiniMyT = {

	init : function(multiNumSelectAlign, multiNumSubmitURL){
		var domain = location.protocol + "//m2.tworld.co.kr"; 
		var url =  "/jsp/common/multiNumSelect.jsp";			
		var param = "?multiNumSelectAlign="+multiNumSelectAlign + "&multiNumSubmitURL=" + multiNumSubmitURL;

		jQuery("div.mini_myT").load(url + param);	
	}
}

//상단메뉴 구성하기
var Menu = {

	init : function(menuId, titleString, titleSize, backPageUrl, isBackButtonVisible, menuBackUrl, titleFocusYN, mPageRefer){
		var domain = location.protocol + "//m2.tworld.co.kr"; 
		var url =  "/jsp/common/menu.jsp";			
		var param = "?menuId="+menuId+"&titleString="+titleString+"&titleSize="+titleSize+"&backPageUrl="+backPageUrl+"&isBackButtonVisible="+isBackButtonVisible+"&menuBackUrl="+menuBackUrl+"&titleFocusYN="+titleFocusYN+"&mPageRefer="+mPageRefer;

		jQuery("div.my_menu").load(url + param);	
	}
}

//하단배너 구성하기
var Banner = {

	init : function(expsMenuCd){
		var domain = location.protocol + "//m2.tworld.co.kr"; 
		var url =  "/jsp/main/sub_banner.jsp";			
		var param = "?expsMenuCd="+expsMenuCd;

		jQuery("div.bottom_banner").load(url + param);	
	}
}

//멤버쉽|잔여기본통화|실시간요금조회 구성하기
var MainSub = {

	init : function(p_cust_grade, appVer, osType, isRefresh, isCallFromIOSWidget, isCallFromAndroidWidget){
		var domain = location.protocol + "//m2.tworld.co.kr"; 
		var url =  "/jsp/main/main_sub.jsp";			
		var param = "?p_cust_grade="+p_cust_grade+"&APP_VER="+appVer+"&OS_TYPE="+osType+"&isRefresh="+isRefresh+"&isCallFromIOSWidget="+isCallFromIOSWidget+"&isCallFromAndroidWidget="+isCallFromAndroidWidget;

		jQuery("div.main_sub").load(url + param);	
	}
}