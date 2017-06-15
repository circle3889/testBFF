var MobileUA = ( function () {
		var ua = navigator.userAgent.toLowerCase();
		var mua = {
			IOS: /ipod|iphone|ipad/.test(ua),										//iOS
			IPHONE: /iphone/.test(ua),												//iPhone
			IPAD: /ipad/.test(ua),													//iPad
			ANDROID: /android/.test(ua),											//Android Device
			WINDOWS: /windows/.test(ua),										//Windows Device
			TOUCH_DEVICE: ('ontouchstart' in window) || /touch/.test(ua),	//Touch Device
			MOBILE: /mobile/.test(ua),												//Mobile Device (iPad  ы븿)
			ANDROID_TABLET: false,												//Android Tablet
			WINDOWS_TABLET: false,												//Windows Tablet
			TABLET: false,															//Tablet (iPad, Android, Windows)
			SMART_PHONE: false													//Smart Phone (iPhone, Android)
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
			$(document).bind("touchstart",  function(e){ 
				e.preventDefault(); 
				if(e.target.className == "btnClose"){
					alertPopup.close();
				} else if(e.target.tagName == "A" || e.target.tagName == "a"){
//					var link = $(e.target).attr("href");
//					if(link == "#"){
//						$(e.target).click(); //외부 링크 일 경우 goLink 함수 호출
//					} else {
//						location.href = link; //내부 링크 일 경우
//					}
					
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
		this.$alertPop = $(".alertPopup");
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
		$(".alertPopup").hide();
		if (MobileUA.IOS){   // OS 체크
			$(document).unbind("touchstart");
			$("html, body").css("overflow", "");
		}else{
			$("html, body").css("overflow", "");
		}
	}
}

pollCheck = {
	init : function(){
		this.$obj = $(".pollType02");
		this.addEvent();
	},

    addEvent : function() {
    	var $list = $(".pollType02 li");
    	
    	$("input[type=radio]").on("click", function() {
    		$(this).focus();
    		$list.removeClass("on");
			$(this).closest("li").addClass("on");
		});
    }
}