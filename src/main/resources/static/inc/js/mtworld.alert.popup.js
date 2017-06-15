var MobileUA = (function(){
	var ua = navigator.userAgent.toLowerCase();
	var mua = {
		IOS : /ipod|iphone|ipad/.test(ua),								// iOS
		IPHONE : /iphone/.test(ua),										// iPhone
		IPAD : /ipad/.test(ua),											// iPad
		ANDROID : /android/.test(ua),									// Android Device
		WINDOWS : /windows/.test(ua),									// Windows Device
		TOUCH_DEVICE : ('ontouchstart' in window) || /touch/.test(ua),	// Touch Device
		MOBILE : /mobile/.test(ua),										// Mobile Device (iPad)
		ANDROID_TABLET : false,											// Android Tablet
		WINDOWS_TABLET : false,											// Windows Tablet
		TABLET : false,													// Tablet (iPad, Android, Windows)
		SMART_PHONE : false												// Smart Phone (iPhone, Android)
	};
	mua.ANDROID_TABLET = mua.ANDROID && !mua.MOBILE;
	mua.WINDOWS_TABLET = mua.WINDOWS && /tablet/.test(ua);
	mua.TABLET = mua.IPAD || mua.ANDROID_TABLET || mua.WINDOWS_TABLET;
	mua.SMART_PHONE = mua.MOBILE && !mua.TABLET;

	return mua;
}());

alertPopup = {
	show : function(){
		$(".alertPopup").show();
		alertPopup.init();
		
		if (MobileUA.IOS){   // OS 체크
			$(document).bind("touchstart", function(e){ 
				e.preventDefault(); 
				
				if(e.target.className == "btnClose"){
					alertPopup.close();
				} else if(e.target.tagName == "INPUT" || e.target.tagName == "input"){
					$($(e.target)).get(0).click();
				} else if(e.target.tagName == "LABEL" || e.target.tagName == "label"){
					$($(e.target)).get(0).click();
				} else if(e.target.tagName == "A" || e.target.tagName == "a"){
					$($(e.target)).get(0).click();
				} else if(e.target.tagName == "BUTTON" || e.target.tagName == "button"){
					alertPopup.close();
				}
			});
			$("body").css("overflow", "hidden");
		} else {
			$("body").css("overflow", "hidden");
			if($(".alertPopup .btnTypeB").get(0).tagName == "BUTTON" || $(".alertPopup .btnTypeB").get(0).tagName == "button"){
				$(".alertPopup .btnTypeB").click(function(){
					alertPopup.close();
				});
			}
		}
	},

	init : function(){
		this.$altPop = $(".alertPopup");
		this.addEvent();
		
		$(".alertPopup .btnClose").click(function(){
			alertPopup.close();
		});
	},

    addEvent : function() {
    	$(".alertPopup").find(".inner").css({
	        top : ($(window).height() - $(".alertPopup").find(".inner").outerHeight()) / 2
	    });
    },
    
	close : function(){
		$("#title").attr("tabindex","-1");
		$(".alertPopup").fadeOut(function(){
			$("#title").focus();
		});
		if (MobileUA.IOS){   // OS 체크
			$(document).unbind("touchstart");
			$("html, body").css("overflow", "");
		}else{
			$("html, body").css("overflow", "");
		}
	}
}

/* myT T가족결합 팝업 추가 2017-02-22 */
layerPopupCache = {
	checkCookie : function(){
		var isPopupShow = "Y";
		if(MobileUA.ANDROID){
			isPopupShow = toapp.checkConfirmDate("com.skt.prod.tFamilyPopupup","31536000000"); //두번째 파라미터는 서버에서 불러와 셋팅 해야 합니다.
			if(isPopupShow == "Y"){
				layerPopupCache.show();
			} else {
				layerPopupCache.close();
			}
		} else if(MobileUA.IOS){
			if (document.cookie.indexOf("tFamilyPopupup=done") < 0) {
				layerPopupCache.show();
    		} else {
    			layerPopupCache.close();
    		}
		}
	},
 
	show : function(target){				
		$(".tFamilyPopup").show();			
		$("body").append("<div class=bgDimm></div>");
		$(".tFamilyPopup").css("display", "table"); 
		$(".tFamilyPopup .cont").css("height", "auto");
		$(".tFamilyPopup").addClass("on").show(function(){
			if($(window).height() < $(".tFamilyPopup").height() + 40) {
				$(".tFamilyPopup").css("overflow","hidden");
				$(".tFamilyPopup").css("height", $(window).height() - 40);
				$(".tFamilyPopup .cont").css("height", $(window).height() - $(".tFamilyPopup .head").outerHeight(true) - 40);
			}
			$(".tFamilyPopup button").unbind('click').click(function(){
				layerPopupCache.close();
			});
			$(".tFamilyPopup .popClose").unbind('click').click(function(){
				layerPopupCache.close();
			});
			if (MobileUA.IOS){   // OS 체크
				$(document).bind("touchstart",  function(e){
					//e.preventDefault(); 
					if(e.target.className == "btnClose" || e.target.className == "btnBlillChangeClose"){
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
    	$(".tFamilyPopup").css({
	        top: $(document).scrollTop() + 45
	    });
    	$(".tFamilyPopup .chkExpire").click(function(){
    		layerPopupCache.setCookieClose();
		});
    },
    
	setCookieClose : function(){
		if(MobileUA.ANDROID){
			location.href = "toapp.settingpackageconfirmdate:com.skt.prod.tFamilyPopupup"; //하루동안 기준 시각.
			layerPopupCache.close();
		} else if(MobileUA.IOS){
			layerPopupCache.setCookie( "tFamilyPopupup", "done" , 31536000000 );
		}
	},
	
	close : function(){
		$(".bgDimm").remove();
		$(".tFamilyPopup").removeClass("on").hide();
		
		if (MobileUA.IOS){   // OS 체크
			$(document).unbind("touchstart");
		}
		$("body").css("overflow","auto");
		$("#title").focus();
	},
	
	setCookie : function(name, value, expiredays){
		var now = new Date();
		var expDate = new Date();
		var todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
		
		expDate.setDate(todayDate.getDate() + expiredays); 
		document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + expDate.toGMTString() + ";"
		layerPopupCache.close();
	}
}