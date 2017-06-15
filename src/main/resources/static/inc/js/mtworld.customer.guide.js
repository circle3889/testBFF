var MobileUA = ( function () {
		var ua = navigator.userAgent.toLowerCase();
		var mua = {
			IOS: /ipod|iphone|ipad/.test(ua),										//iOS
			IPHONE: /iphone/.test(ua),												//iPhone
			IPAD: /ipad/.test(ua),													//iPad
			ANDROID: /android/.test(ua),											//Android Device
			WINDOWS: /windows/.test(ua),										//Windows Device
			TOUCH_DEVICE: ('ontouchstart' in window) || /touch/.test(ua),	//Touch Device
			MOBILE: /mobile/.test(ua),												//Mobile Device (iPad)
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

/* 2016-06-14 수정 */
pollCheck = {
	init : function(){
		this.$obj = $(".pollType02, .pollBox");
		this.addEvent();
	},

    addEvent : function() {
    	var $list = $(".pollType02 li"),
    		$pollBox = $(".svyTbl td");
    	
    	$("input[type=radio]").on("click", function() {
    		$(this).focus();
    		$list.removeClass("on");
			$(this).closest("li").addClass("on");
    		$pollBox.removeClass("on");
			$(this).closest("td").addClass("on");
		});
    }
}

/* 2016-08-10 추가 */ /* 추가 가이드 배너 랜덤 노출을 위한 스크립트 */
moreGuideBanner = {
	leftLink : [
	            {
	            	imgUrl : "/img/new_customer/center_left_00.png",
	            	linkUrl : "http://m2.tworld.co.kr/dev/emphasis/customer/customer_damage_menu02.html",
	            	altText : "이용자 피해예방 센터, 신종 금융사기 메모리 해킹 예방법 알아보기"
	            },
	            {
	            	imgUrl : "/img/new_customer/center_left_01.png",
	            	linkUrl : "http://m2.tworld.co.kr/dev/emphasis/customer/customer_damage_menu03.html",
	            	altText : "이용자 피해예방 센터, 파밍 웹사이트 식별법과 대처방안 알아보기"
	            },
	            {
	            	imgUrl : "/img/new_customer/center_left_02.png",
	            	linkUrl : "http://m2.tworld.co.kr/dev/emphasis/customer/customer_damage_menu05.html",
	            	altText : "이용자 피해예방 센터, 스마트폰 보안수칙 알아보기"
	            },
	            {
	            	imgUrl : "/img/new_customer/center_left_03.png",
	            	linkUrl : "http://m2.tworld.co.kr/dev/emphasis/customer/customer_damage_menu01.html",
	            	altText : "이용자 피해예방 센터, 스마트폰을 통한 스미싱 피해 방지법 알아보기"
	            },
	            {
	            	imgUrl : "/img/new_customer/center_left_04.png",
	            	linkUrl : "http://m2.tworld.co.kr/dev/emphasis/customer/customer_damage_menu06.html",
	            	altText : "이용자 피해예방 센터, 과다한 불법 스팸 대처방법 알아보기"
	            },
	            {
	            	imgUrl : "/img/new_customer/center_left_05.png",
	            	linkUrl : "http://m2.tworld.co.kr/dev/emphasis/customer/customer_damage_menu04.html",
	            	altText : "이용자 피해예방 센터, 쉽고 간단한 클라우드 보안 방법 알아보기"
	            }
	            ],
	rightLink : [
				{
					imgUrl : "/img/new_customer/08_ban_how01_01.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0001",
					altText : "이럴땐 이렇게 하세요. SKT LTE 고객이라면 데이터 초과 요금 걱정마세요!"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how01_02.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0002",
					altText : "이럴땐 이렇게 하세요. 이럴땐 이렇게 하세요. 안심하고 마음껏 데이터를 쓰려면?"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how01_03.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0003",
					altText : "이럴땐 이렇게 하세요. 이럴땐 이렇게 하세요. 데이터 걱정 없이 TV 실컷 보려면?"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how01_04.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0004",
					altText : "이럴땐 이렇게 하세요. 이럴땐 이렇게 하세요. 나만의 데이터 이용패턴에 맞는 할인 방법!"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how01_05.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0005",
					altText : "이럴땐 이렇게 하세요. 이럴땐 이렇게 하세요. 휴대폰 데이터 태블릿과 함께 쓸 수 있어요!"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how01_06.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0006",
					altText : "이럴땐 이렇게 하세요. 이럴땐 이렇게 하세요. 데이터 다 썼을 땐 데이터 리필하세요!"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how01_07.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0007",
					altText : "이럴땐 이렇게 하세요. 이럴땐 이렇게 하세요. 남는 데이터 친구와 가족에게 선물하세요!"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how02_01.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0008",
					altText : "이럴땐 이렇게 하세요. 이럴땐 이렇게 하세요. 휴대폰 분실했다면? 가장 먼저 분실신고!"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how02_02.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0009",
					altText : "이럴땐 이렇게 하세요. 이럴땐 이렇게 하세요. 잃어버린 휴대폰 위치추적으로 찾아보세요!"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how02_03.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0010",
					altText : "이럴땐 이렇게 하세요. 이럴땐 이렇게 하세요. 휴대폰 분실했다면? 임대폰 or 기기변경"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how02_04.png",	
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0011",
					altText : "이럴땐 이렇게 하세요. 이럴땐 이렇게 하세요. 분실보험 가입자라면 분실보상 받으세요!"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how02_05.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0012",
					altText : "이럴땐 이렇게 하세요. 미리 안심백업 했다면? 데이터 복원!"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how03_01.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0013",
					altText : "이럴땐 이렇게 하세요. 해외여행 할 땐 로밍 서비스 확인하세요!"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how03_02.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0014",
					altText : "이럴땐 이렇게 하세요. 데이터 미 사용시 차단해주세요!"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how03_03.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0015",
					altText : "이럴땐 이렇게 하세요. 로밍 전용 요금제로 안심 여행하세요!"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how03_04.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0016",
					altText : "이럴땐 이렇게 하세요. 해외여행 중 알아두면 유용한 Tip!"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how03_05.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0017",
					altText : "이럴땐 이렇게 하세요. 해외여행 다녀와서 챙겨야 할 것!"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how04_01.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0018",
					altText : "이럴땐 이렇게 하세요. 스팸 아직도 받고 있나요?"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how04_02.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0019",
					altText : "이럴땐 이렇게 하세요. 더 이상 스미싱에 속지 마세요!"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how04_03.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0020",
					altText : "이럴땐 이렇게 하세요. 대비하면 막을 수 있어요! 휴대폰 명의도용"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how04_04.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0021",
					altText : "이럴땐 이렇게 하세요. 생활 속 예방과 관리로 개인정보 지키세요!"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how05_01.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0022",
					altText : "이럴땐 이렇게 하세요. 똑똑한 엄마들의 자녀 요금 관리법"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how05_02.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0023",
					altText : "이럴땐 이렇게 하세요. 아이 안전을 위한 스마트폰 활용방법"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how05_03.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0024",
					altText : "이럴땐 이렇게 하세요. 바른 휴대폰 사용습관을 위한 실천 가이드"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how06_01.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0025",
					altText : "이럴땐 이렇게 하세요. 알고 쓰면 더 편리한 T멤버십"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how06_02.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0026",
					altText : "이럴땐 이렇게 하세요. 나눠 쓰고 적립하는 멤버십 활용팁!"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how06_03.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0027",
					altText : "이럴땐 이렇게 하세요. T나는 전용쇼핑몰 초콜릿"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how06_04.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0028",
					altText : "이럴땐 이렇게 하세요. 급이 다른 혜택 T나게 쓰는 방법"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how07_01.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0029",
					altText : "이럴땐 이렇게 하세요. 데이터 요금 걱정은 적게! 이용은 맘 편하게!"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how07_02.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0030",
					altText : "이럴땐 이렇게 하세요. 스마트폰 초보 탈출을 위한 이용법"
				},
				{
					imgUrl : "/img/new_customer/08_ban_how07_03.png",
					linkUrl : "http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=TIP0031",
					altText : "이럴땐 이렇게 하세요. 스마트폰 센스를 올려주는 활용 가이드"
				}
	             ],
	init : function(){
		var now = new Date();
		var leftRandIdx = now.getTime() % moreGuideBanner.leftLink.length;
		var rightRandIdx = now.getTime() % moreGuideBanner.rightLink.length;
		$("#more_left_link .contents_link").attr("href", moreGuideBanner.leftLink[leftRandIdx].linkUrl)
										   .attr("title", moreGuideBanner.leftLink[leftRandIdx].altText);;
		$("#more_left_link img").attr("src", moreGuideBanner.leftLink[leftRandIdx].imgUrl)
								
		$("#more_right_link .contents_link").attr("href", moreGuideBanner.rightLink[rightRandIdx].linkUrl)
											.attr("title", moreGuideBanner.rightLink[rightRandIdx].altText);
		$("#more_right_link img").attr("src", moreGuideBanner.rightLink[rightRandIdx].imgUrl)
								
	},
}
