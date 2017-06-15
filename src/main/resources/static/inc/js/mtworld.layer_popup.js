layerPopup = {
	isIOS : false,
	show : function(){				
		if($(".layerPop").is(":visible")){
			$(".layerPop").show();
			layerPopup.init();
		} else {
			layerPopup.close();
		}
	},
	init : function(){
		this.addEvent();
		this.isIOS = /ipod|iphone|ipad/.test(navigator.userAgent.toLowerCase());
	},
    addEvent : function() {
    	//var lyIScroll = undefined;
    	
    	$(".btnLayer").on("click", function(){
    		$(this).attr('tabIndex', 0).focus();
    		$("body").append("<div class=bgDimm></div>");
    		$(".layerPop").css("display", "table"); 
			$(".layerPop .cont").css("height", "auto");
    		$(".layerPop").addClass("on").show(function(){
    			$(".layerPop button").unbind("click").click(function(){
					layerPopup.close();
				});
    			if($(window).height() < $(".layerPop").height() + 40) {	// header:46px + 여백:10px
    				$(".layerPop").css("overflow","hidden");
    				$(".layerPop").css("height", $(window).height() - 40);
    				$(".layerPop .cont").css("height", $(window).height() - $(".layerPop .head").outerHeight(true) - 40);
    				/*if(lyIScroll == undefined){
    		    		lyIScroll = new iScroll("cont");
    		    	}*/
    			}
    			if (layerPopup.isIOS){	// OS 체크
    				$(document).bind("touchstart", function(e){ 
    					e.preventDefault();
    					if(e.target.className == "btnClose"){
    						layerPopup.close();
    					}else if(e.target.tagName == "A" || e.target.tagName == "a"){
    						var link = $(e.target).attr("href");
    						if(link == "#"){
    							$(e.target).click(); //외부 링크 일 경우 goLink 함수 호출
    						}else{
    							location.href = link; //내부 링크 일 경우
    						}
    						$($(e.target)).get(0).click();
    					}else if(e.target.tagName == "BUTTON" || e.target.tagName == "button"){
    						layerPopup.close();
    					}
    				});
    			}
    			$("body").css("overflow","hidden");
    		});
    	});
    	$(".layerPop").css({
	        top: $(document).scrollTop() + 45
	    });
    },  	
	close : function(){
		$(".bgDimm").remove();
		$(".layerPop").removeClass("on").hide();
		if (layerPopup.isIOS){	// OS 체크
			$(document).unbind("touchstart");
		}
		$("body").css("overflow","auto");
		$(".btnLayer").focus();
	}
}

var MobileUA = ( function () {
	var ua = navigator.userAgent.toLowerCase();
	var mua = {
		IOS: /ipod|iphone|ipad/.test(ua),                                //iOS
		IPHONE: /iphone/.test(ua),                                        //iPhone
		IPAD: /ipad/.test(ua),                                            //iPad
		ANDROID: /android/.test(ua),                                    //Android Device
		WINDOWS: /windows/.test(ua),                                    //Windows Device
		TOUCH_DEVICE: ('ontouchstart' in window) || /touch/.test(ua),    //Touch Device
		MOBILE: /mobile/.test(ua),                                        //Mobile Device (iPad  ы븿)
		ANDROID_TABLET: false,                                            //Android Tablet
		WINDOWS_TABLET: false,                                            //Windows Tablet
		TABLET: false,                                                    //Tablet (iPad, Android, Windows)
		SMART_PHONE: false                                                //Smart Phone (iPhone, Android)
	};
	mua.ANDROID_TABLET = mua.ANDROID && !mua.MOBILE;
	mua.WINDOWS_TABLET = mua.WINDOWS && /tablet/.test(ua);
	mua.TABLET = mua.IPAD || mua.ANDROID_TABLET || mua.WINDOWS_TABLET;
	mua.SMART_PHONE = mua.MOBILE && !mua.TABLET;

	return mua;
}());


layerPopupCache = {
	limitDate : new Date(2017, 00, 24),
	checkCookie : function(){
		var isPopupShow = "Y";
		if(MobileUA.ANDROID){
			isPopupShow = toapp.checkConfirmDate("com.skt.prod.billUsePopup","2592000000"); //두번째 파라미터는 서버에서 불러와 셋팅 해야 합니다.
//			isPopupShow = toapp.checkConfirmDate("com.skt.prod.billUsePopup","86400000"); //두번째 파라미터는 서버에서 불러와 셋팅 해야 합니다.
			if(isPopupShow == "Y"){
				layerPopupCache.show();
			} else {
				layerPopupCache.close();
			}
		} else if(MobileUA.IOS){
			if (document.cookie.indexOf("billUsePopup=done") < 0) {
				layerPopupCache.show();
    		} else {
    			layerPopupCache.close();
    		}
		}
		
	},
	show : function(target){				
		$(".billUsePop").fadeIn();			
		$("body").append("<div class=bgDimm></div>");
		$(".billUsePop").css("display", "table"); 
		$(".billUsePop .cont").css("height", "auto");
		$(".billUsePop").addClass("on").show(function(){
			if($(window).height() < $(".billUsePop").height() + 40) {
				$(".billUsePop").css("overflow","hidden");
				$(".billUsePop").css("height", $(window).height() - 40);
				$(".billUsePop .cont").css("height", $(window).height() - $(".billUsePop .head").outerHeight(true) - 40);
			}
			$(".billUsePop button").unbind('click').click(function(){
				layerPopupCache.close();
			});
			if (MobileUA.IOS){   // OS 체크
				$(document).bind("touchstart",  function(e){
					e.preventDefault(); 
					if(e.target.className == "btnClose"){
						layerPopupCache.close();
					} else if(e.target.tagName == "A" || e.target.tagName == "a"){
						var link = $(e.target).attr("href");
						if(link == "#"){
							$(e.target).click(); //외부 링크 일 경우 goLink 함수 호출
						}else {
							location.href = link; //내부 링크 일 경우
						}
						
						$($(e.target)).get(0).click();
					} else if(e.target.tagName == "BUTTON" || e.target.tagName == "button"){
						layerPopupCache.close();
					}
				});
			} 
			$("body").css("overflow","hidden");
		});
    	$(".billUsePop").css({
	        top: $(document).scrollTop() + 45
	    });
    	$(".billUsePop .monthExp").click(function(){
    		layerPopupCache.setCookieClose();
		});
    },
	setCookieClose : function(){
		if(MobileUA.ANDROID){
			location.href = "toapp.settingpackageconfirmdate:com.skt.prod.billUsePopup"; //하루동안 기준 시각.
			layerPopupCache.close();
		} else if(MobileUA.IOS){
			layerPopupCache.setCookie( "billUsePopup", "done" , 30 );
		}
	},
	
	close : function(){
		$(".bgDimm").remove();
		$(".billUsePop").removeClass("on").fadeOut();
		
		if (MobileUA.IOS){   // OS 체크
			$(document).unbind("touchstart");
		}
		$("body").css("overflow","auto");
		$("#title").focus();
	},
	
	setCookie : function(name, value, expiredays){
		var now = new Date();
		var expDate = new Date();
		//var endDate = new Date(2017, 01, 24);
		
		/* if(todayDate > endDate) {
			layerPopup.close();
		} */
		var todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
		expDate.setDate(todayDate.getDate() + expiredays); 
		document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + expDate.toGMTString() + ";"
		layerPopupCache.close();
	}
}