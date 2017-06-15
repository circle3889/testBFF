var MobileUA = ( function () {
	var ua = navigator.userAgent.toLowerCase();
	var mua = {
			IOS: /ipod|iphone|ipad/.test(ua),                                	//iOS
			IPHONE: /iphone/.test(ua),                                        	//iPhone
			IPAD: /ipad/.test(ua),                                            		//iPad
			ANDROID: /android/.test(ua),                                    	//Android Device
			WINDOWS: /windows/.test(ua),                                   //Windows Device
			TOUCH_DEVICE: ('ontouchstart' in window) || /touch/.test(ua),    //Touch Device
			MOBILE: /mobile/.test(ua),                                        	//Mobile Device (iPad)
			ANDROID_TABLET: false,                                            //Android Tablet
			WINDOWS_TABLET: false,                                           //Windows Tablet
			TABLET: false,                                                    		//Tablet (iPad, Android, Windows)
			SMART_PHONE: false                                                	//Smart Phone (iPhone, Android)
	};

	mua.ANDROID_TABLET = mua.ANDROID && !mua.MOBILE;
	mua.WINDOWS_TABLET = mua.WINDOWS && /tablet/.test(ua);
	mua.TABLET = mua.IPAD || mua.ANDROID_TABLET || mua.WINDOWS_TABLET;
	mua.SMART_PHONE = mua.MOBILE && !mua.TABLET;

	return mua;
}());

FloatingBanner = {
	target : undefined,	
	show : function(target){
		var isFBannerShow = "Y";
		if(FloatingBanner.target == undefined) FloatingBanner.target = target;
		if(MobileUA.ANDROID){
			isFBannerShow = toapp.checkConfirmDate("com.skt.prod." + FloatingBanner.target,"86400000"); //두번째 파라미터는 서버에서 불러와 셋팅 해야 합니다.
		} else if(MobileUA.IOS){
			if (document.cookie.indexOf(FloatingBanner.target+"=done") < 0) {
				isFBannerShow = "Y"
    		} else {
    			isFBannerShow = "N"
    		}
		}
		if(isFBannerShow == "Y"){
			$(".floatingBnnr").show();
			FloatingBanner.init();
		} else {
			FloatingBanner.close();
		}
	},
	init : function(){
		$(".floatingBnnr .todayExp").click(function(){
			FloatingBanner.setCookieClose();
		});
		$(".floatingBnnr .btnClose").click(function(){
			FloatingBanner.close();
		});
	},
	setCookieClose : function(){
		if(MobileUA.ANDROID){
			location.href = "toapp.settingpackageconfirmdate:com.skt.prod." + FloatingBanner.target; //하루동안 기준 시각.
		} else if(MobileUA.IOS){
			FloatingBanner.setCookie( FloatingBanner.target, "done" , 1 );
		}
		FloatingBanner.close();
	},
	close : function(){
		$(".floatingBnnr").hide();
	},
	setCookie : function(name, value, expiredays) {
		var todayDate = new Date();   
	    todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);  
	    if (todayDate > new Date()) {  
	    	expiredays = expiredays - 1;  
	    }  
	    todayDate.setDate( todayDate.getDate() + expiredays );   
	    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
	}
}