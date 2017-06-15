/* 2016-10-25 GA import 추가 [s] */
/* 2016-11-29 추가_01 [s] */
window.onload=function() {
	//js import;
	try {
		if(typeof(tid)=="undefined"){
			//$('head').append('<script src=\'/inc/js/dlkrga.js\'><\/script>');
			ga('create', 'UA-44615111-6');
			ga('send', 'pageview');
		}
	}
	catch(err) {
	}
	
};
/* 2016-11-29 추가_01 [e] */
/* 2016-10-25 GA import 추가 [e] */

// 모바일 주소창 감추기
try {
	window.addEventListener('load', function(){
		setTimeout(scrollTo, 0, 0, 1);
	}, false);
} catch(e) {}

$(document).ready(function(){
	/* 2016-08-24 수정_01 [s] */
	$("section").append($("<div class='notice copyright'> \n <a href='http://m2.tworld.co.kr/normal.do?serviceId=S_ETC_0021&viewId=V_CMN_0004&domainVer=m2&menuId=8,2' class='bar'>이용약관</a><a href='http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0033&viewId=V_CMIS0002' class='bar'>이용자 피해예방 센터 </a><a href='http://m2.tworld.co.kr/normal.do?serviceId=S_ETC_0066&viewId=V_CMN_0012&menuId=8,2&serNum=8&app=Y'>개인정보 처리방침</a>\n</div>"));
	/* 2016-08-24 수정_01 [e] */
	if (!$("#ifr_body").length > 0) {	
		/*if($(document).height() == $(window).height()){ 
			$(this).find('.copyright').addClass('notice_copy');
		}*/
		var h_header = $("header").height();
		var h_section = $("section").height();
		var bodyHeight = h_header + h_section;
		
		if(bodyHeight < $(window).height()){ 
			$(this).find('.copyright').addClass('notice_copy');
		}
	}
	
	/* 2014-03-04 BP높이관련 스크립트 */
	$("#short_cont").find('.copyright').addClass('notice_copy');
});

function membershipReady(){
	if ($("#ifr_body").length > 0) {
		if($(document).height() <= $(window).height()){ 
			$('.copyright').addClass('notice_copy');
		}
	}
}

// List menu
function accordion(){
	$('.list_accordion .list_tit a').click(function(){
		if ($(this).parents('p').parents('.list_accordion > li').hasClass('on')) {
			$(this).parents('p').parents('.list_accordion > li').removeClass('on');
		} else {
			$('.list_accordion > li').removeClass('on');
			$(this).parents('p').parents('li').addClass('on');
		}
	});
}

// Sub Menu
function subMenu(index,viewnum,attr){
	/* 2012-12-11 수정*/ //기존에 2번째 li만 찾던것에서 마지막 찾는 것으로 수정함
	if ($('.menu_two_list')){
		$('.menu_two_list .menu_list').find('li').last().addClass('last');
		$('.menu_two_list .prv_btn').addClass('prv_disabled');
		$('.menu_two_list .next_btn').addClass('next_disabled');
	}

	var menuLength = $('.menu_roll_list .menu_list').find('li').length,
		menuLi = $('.menu_roll_list .menu_list').find('li'),
		hiddenLi = viewnum - 3;

	if (index == 6){
		var indexNum = 3;
	} else if (index == 5){
		var indexNum = 2;
	} else if (index == 4){
		var indexNum = 1;
	} else if (index == 11){
		var indexNum = 8;
	}

	if (hiddenLi > 0){
		menuLi.eq(hiddenLi + 2).addClass('last');
		$('.menu_roll_list .menu_list').find('li:gt('+hiddenLi + 2 +')').addClass('disabled_list_d');
	} else {
		menuLi.eq(2).addClass('last');
		$('.menu_roll_list .menu_list').find('li:gt(2)').addClass('disabled_list_d');
	}

	if (menuLength <= 3){
		$('.menu_roll_list .prv_btn').addClass('prv_disabled');
		$('.menu_roll_list .next_btn').addClass('next_disabled');
	} else {
		if (hiddenLi > 0){
			for (var i = 0 ; i < hiddenLi ; i++ ){
				menuLi.eq(i).addClass('disabled_list');
			}
		}

		/* 2016-02-04 수정_01 [s] */
		if ($('.menu_roll_list .menu_list').find('.disabled_list').length == indexNum){
			$('.menu_roll_list .next_btn').addClass('next_disabled');
			if(attr == 'title'){
				$('.menu_roll_list .next_btn').attr("title", "다음메뉴/다음메뉴가 없습니다.");
			} else {
				$('.menu_roll_list .next_btn').html("다음메뉴/다음메뉴가 없습니다.");
			}
			
		} else if ($('.menu_roll_list .menu_list').find('.disabled_list').length == 0){
			$('.menu_roll_list .prv_btn').addClass('prv_disabled');
			if(attr == "title"){
				$('.menu_roll_list .prv_btn').attr("title", "이전메뉴/이전메뉴가 없습니다.");
			} else {
				$('.menu_roll_list .prv_btn').html("이전메뉴/이전메뉴가 없습니다.");
			}
		}

		$('.menu_roll_list .next_btn').click(function(){
			if(!$(this).hasClass("next_disabled")){
				var hdList = $('.menu_roll_list .menu_list').find('.disabled_list');
				var hdListNum = hdList.length;

				if (hdListNum == indexNum - 1){
					$('.menu_roll_list .next_btn').addClass('next_disabled');
					if(attr == "title"){
						$('.menu_roll_list .next_btn').attr("title", "다음메뉴/다음메뉴가 없습니다.");
					} else {
						$('.menu_roll_list .next_btn').html("다음메뉴/다음메뉴가 없습니다.");
					}
					
				}

				if (hdListNum < indexNum){
					menuLi.eq(hdListNum).addClass('disabled_list');
					menuLi.removeClass('last');
	                menuLi.eq(hdListNum + 3).removeClass('disabled_list_d');
					menuLi.eq(hdListNum + 3).addClass('last');
				}
	
				if (hdListNum >= 0){
					$('.menu_roll_list .prv_btn').removeClass('prv_disabled');
					if(attr == "title"){
						$('.menu_roll_list .prv_btn').attr('title', '이전메뉴');
					} else {
						$('.menu_roll_list .prv_btn').html('이전메뉴');
					}
					
				}
			}
		});

		$('.menu_roll_list .prv_btn').click(function(){
			if(!$(this).hasClass("prv_disabled")){
				var hdList = $('.menu_roll_list .menu_list').find('.disabled_list');
				var hdListNum = hdList.length;

				if (hdListNum <= 1){
					$('.menu_roll_list .prv_btn').addClass('prv_disabled');
					if(attr == "title"){
						$('.menu_roll_list .prv_btn').attr('title', '이전메뉴/이전메뉴가 없습니다.');
					} else {
						$('.menu_roll_list .prv_btn').html("이전메뉴/이전메뉴가 없습니다.");
					}
					
				}
	
				if (hdListNum <= indexNum){
					menuLi.eq(hdListNum - 1).removeClass('disabled_list');
					menuLi.removeClass('last');

					if (hdListNum + 1 >= 2){
						menuLi.eq(hdListNum + 1).addClass('last');
						menuLi.eq(hdListNum + 2).addClass('disabled_list_d');
					} else {
						menuLi.eq(2).addClass('last');
						menuLi.eq(3).addClass('disabled_list_d');
					}
				}
	
				if (hdListNum <= indexNum){
					$('.menu_roll_list .next_btn').removeClass('next_disabled');
					if(attr == "title"){
						$('.menu_roll_list .next_btn').attr('title', '다음메뉴');
					} else {
						$('.menu_roll_list .next_btn').html("다음메뉴");
					}
				}
			}
			return false;
		});
	}
}

// Layer Popup
/* 2016-09-22 웹 접근성 팝업 레이어 포커싱 처리 start*/
var retObj = undefined
/* 2016-09-22 웹 접근성 팝업 레이어 포커싱 처리 end*/
function layerView(id, fobj, robj){
	/* 2016-09-22 웹 접근성 팝업 레이어 포커싱 처리 start*/
	retObj = robj;
	/* 2016-09-22 웹 접근성 팝업 레이어 포커싱 처리 end*/
	var layerId = $('#' + id),
		layerH = layerId.find('.layer_content').height()/2,
		wHeight = $(window).height()/2,
		scrollH = $(window).scrollTop()/2,
		scrollHtow = $(window).scrollTop(),
		mHeight = wHeight + scrollHtow,
		layerTop = mHeight - layerH,
		scrollHtop = scrollH*2 - 44;
	var dHeight = $(document).height();

	layerId.addClass('view_layer');
	/* 2016-09-22 웹 접근성 팝업 레이어 포커싱 처리 start*/
	if(fobj != undefined){
		setTimeout(function(){
			$('#' + fobj).focus();
		}, 100);
	}
	/* 2016-09-22 웹 접근성 팝업 레이어 포커싱 처리 end*/
	//$('.layer_dimed').css('height',dHeight);

	/* 2014-03-31 레이어팝업 위치값 고정 */
	layerId.find('.layer_content').css('top', '0px').css('margin-top', '44px');
}

function layerClose(id){
	var layerId = $('#' + id);

	layerId.removeClass('view_layer');
	//$('#content').css('height','auto');
	$('body').css('height','auto');
	/* 2016-09-22 웹 접근성 팝업 레이어 포커싱 처리 start*/
	setTimeout(function(){
		$(retObj).focus();
	}, 100);
	/* 2016-09-22 웹 접근성 팝업 레이어 포커싱 처리 end*/
}

function loadLayerView(id){
	var layerId = $('#' + id),
		layerH = layerId.find('.layer_content').height()/2,
		wHeight = $(window).height()/2,
		scrollH = $(window).scrollTop()/2,
		scrollHtow = $(window).scrollTop(),
		mHeight = wHeight + scrollHtow,
		layerTop = mHeight - layerH,
		scrollHtop = scrollH*2 - 44;

	layerId.addClass('view_layer');

	if (layerTop <= 0){
		if (layerTop <= scrollH*2){
			layerId.find('.layer_content').css('top', scrollH + 'px');
			if ($('#content').outerHeight(true) + 44 <= (scrollH*2) + layerId.find('.layer_content').outerHeight(true)){
				$('#content').css('height',(scrollH*2) + layerId.find('.layer_content').outerHeight(true) -44 + 'px');
			}
		} else {
			layerId.find('.layer_content').css('top', '10px');
		}
	} else if (layerTop <= scrollH*2){
		layerId.find('.layer_content').css('top', scrollH*2 - 44 + 'px');
		if ($('#content').outerHeight(true) + 44 <= (scrollH*2) + layerId.find('.layer_content').outerHeight(true)){
			$('#content').css('height',(scrollH*2) + layerId.find('.layer_content').outerHeight(true) -44 + 'px');
		}
	} else {
		layerId.find('.layer_content').css('top', layerTop - 22 + 'px');
	}

	if ($('#content').height() <= layerId.find('.layer_content').height()){
		$('#content').css('height',layerId.find('.layer_content').height());
	}

	if ($(window).height() > $('#content').outerHeight(true)){
		$('#content').css('height',$(window).height()-74);
	}
}

// 주변가맹점 찾기
function memberStore(){
	$('.op_cl_btn img').attr('alt','지도보기/전화걸기 펼치기'); // 2014-01-02 웹접근성 추가

	var storeT = $('.cont_listbox'),
		listArea = $('.cont_listbox .item_area'),
		textArea = listArea.find('.text_area'),
		textW = listArea.width() - 111,
		listBtn = storeT.find('.listbox_more');

	textArea.css('width', textW + 'px');

	if (listBtn.length <= 0){
		var lastList = storeT.find('ul > li').length;
		storeT.find('ul > li').eq(lastList - 1).addClass('no_btn_last_li');
	}
	
	listArea.bind('click', function() {		
		var self = $(this),
		selfimg = $('.op_cl_btn img'),
		theTimer = 0; // 2015-02-17 웹접근성 추가
		if (self.parent().hasClass('view_btn')) {			
			window.clearTimeout(theTimer);
			theTimer = window.setTimeout(function () {
				storeT.find('li').removeClass('view_btn');
			}, 1000);// 2015-02-17 웹접근성 추가			
			selfimg.attr('src','/images/bg/bg_faq_note_arrow_d_as.png'); // 2014-01-02 웹접근성 추가
			selfimg.attr('alt','지도보기/전화걸기 펼치기'); // 2014-01-07 웹접근성 추가
			
			//storeT.find('li .item_btn_area').slideUp(200);
		} else {
			storeT.find('li').removeClass('view_btn');
			selfimg.attr('alt','지도보기/전화걸기 펼치기'); // 2014-01-02 웹접근성 추가
			selfimg.attr('src','/images/bg/bg_faq_note_arrow_d_as.png'); // 2014-01-02 웹접근성 추가
			window.clearTimeout(theTimer);
			theTimer = window.setTimeout(function () {
				self.parent().addClass('view_btn');
			}, 1000);// 2015-02-17 웹접근성 추가	
			
			self.parent().find('.op_cl_btn img').attr('alt','지도보기/전화걸기 접기'); // 2014-01-07 웹접근성 수정 : children -> parent
			self.parent().find('.op_cl_btn img').attr('src','/images/bg/bg_faq_note_arrow_u_as.png'); // 2014-01-07 웹접근성 수정 : children -> parent

			//storeT.find('li .item_btn_area').slideUp(200);
			//self.parent().find('.item_btn_area').slideDown(200);
		}
	});
}

// 고객센터 및 공지사항
function faqNote(){
	$('.noti_btn').html('열기<span class="noti_btn_sp"></span>');

	var noteT = $('.faq_note_list'),
		titleArea = $('.faq_note_list .title_area'),
		listTotal = noteT.find('li').length;

	titleArea.bind('click', function(){
		var self = $(this);

		if (self.parent().hasClass('view_cont')) {
			noteT.find('li').removeClass('view_cont');
			$('.noti_btn').html('열기<span class="noti_btn_sp"></span>');

			if($(document).height() == $(window).height()){ 
				$('.copyright').addClass('notice_copy');
			}
		} else {
			noteT.find('li').removeClass('view_cont');
			$('.noti_btn').html('열기<span class="noti_btn_sp"></span>');

			self.parent().addClass('view_cont');
			self.find('button').html('닫기<span class="noti_btn_sp"></span>');

			if($(document).height() != $(window).height()){ 
				$('.copyright').removeClass('notice_copy');
			}
		}
	});
}

// 고객센터 및 공지사항 (Param)
function faqNote_item(notice_no){
	var noteT = $('.faq_note_list'),
		titleArea = $('.faq_note_list .title_area'),
		listTotal = noteT.find('li').length;

	noteT.find('#'+notice_no).addClass('view_cont');

	titleArea.bind('click', function() {
		var self = $(this);

		if (self.parent().hasClass('view_cont')) {
			noteT.find('li').removeClass('view_cont');
		} else {
			noteT.find('li').removeClass('view_cont');
			self.parent().addClass('view_cont');
		}
	});
}

// 상품 아코디언
function prdAccordion(){
	$('.product_accordion .pd_accordion_title a').attr('title','열기');
	$('.product_accordion .pd_accordion_title span').click(function(){
		if ($(this).parents().parents('li').hasClass('view_cont')) {
			$(this).parents().parents('li').removeClass('view_cont');
			$(this).parent('a').attr('title','열기');
		} else {
			$('.product_accordion > li').removeClass('view_cont');
			$('.product_accordion .pd_accordion_title a').attr('title','열기');
			$(this).parents().parents('li').addClass('view_cont');
			$(this).parent('a').attr('title','닫기');
		}
	});
}

// 클릭시 view/hidden
function viewHidden(id, className){
	var idName = $('#' + id);

	if (idName.hasClass(className)) {
		idName.removeClass(className);
	} else {
		idName.addClass(className);
	}
}

// 자주 찾는 문의
function faqNote2(){
	$('.faq_arrow img').attr('alt','열기');

	var noteT = $('.faq_note_list'),
		titleArea = $('.faq_note_list .title_area'),
		listTotal = noteT.find('li').length;

	titleArea.bind('click', function() {
		var self = $(this),
		selfimg = $('.faq_arrow img');

		if (self.parent().hasClass('view_cont')) {
			noteT.find('li').removeClass('view_cont');
			selfimg.attr('src','/images/bg/bg_faq_note_arrow_d_300dpi.png');
			selfimg.attr('alt','열기');
		} else {
			noteT.find('li').removeClass('view_cont');
			selfimg.attr('alt','열기');
			selfimg.attr('src','/images/bg/bg_faq_note_arrow_d_300dpi.png');

			self.parent().addClass('view_cont');
			self.parent().find('.faq_arrow img').attr('alt','닫기');
			self.parent().find('.faq_arrow img').attr('src','/images/bg/bg_faq_note_arrow_u_300dpi.png');
		}
	});
}

// 부가서비스/T로밍 리스트 수정
function prdAccordion2(){
    $('.product_list2 h2 a').attr('title','열기');
    /*$('.product_list2 h2 a').click(function(){
        if ($(this).parents().parents('li').hasClass('view_cont')) {
            $(this).parents().parents('li').removeClass('view_cont');
            $(this).attr('title','열기');
        } else {
            $('.product_list2 > li').removeClass('view_cont');
            $(this).attr('title','열기');
            $(this).parents().parents('li').addClass('view_cont');
            $(this).attr('title','닫기');
        }
    });*/
	$('.product_list2 h2 a').on('click', function(){
		if ($(this).hasClass("active")) {
			return false;
		} else {
			$(this).addClass("active");
			$(this).animate({
				"opacity" : 1
			},1000, function() {
				$(this).removeClass("active").removeAttr("style");

				if ($(this).parents('li').hasClass('view_cont')) {
					$(this).parents('li').removeClass('view_cont');
					$(this).attr('title','열기');
				} else {
					$('.product_list2 > li').removeClass('view_cont');
					$(this).attr('title','열기');
					$(this).parents('li').addClass('view_cont');
					$(this).attr('title','닫기');
				}
			});
		}
	});
}

// SNS 공유 버튼
function goShareOpen(id, className){
	var idName = $('#' + id);
	/* 2017-01-25 수정_01 [s] */
	if (idName.hasClass(className)){
		setTimeout(function(){idName.removeClass(className); return;}, 1000); //개발 테스트 소스
		$('.share_layer2').removeClass('view');
		$('.sns_ico_share').attr('src','/img/sns/present_share.jpg').attr('alt', '공유하기 안내 열기');
	} else {
		setTimeout(function(){idName.addClass(className); return;}, 1000); //개발 테스트 소스
		$('.share_layer2').addClass('view');
		$('.sns_ico_share').attr('src','/img/sns/present_share_on.jpg').attr('alt', '공유하기 안내 닫기');
	}
	/* 2017-01-25 수정_01 [e] */
	if ($('#share_sns').hasClass('sms_on')){
		$('#share_sns').removeClass('sms_on');
		$('.sns_tab').hide();
	}
}

// SMS + SNS 공유 버튼
function goSmsOpen(id, className){
	var idName = $('#' + id),
		snsTab = $('.sns_tab').height();
	
	if (idName.hasClass(className)) {
		setTimeout(function(){idName.removeClass(className); return;}, 1000); //개발 테스트 소스
		//idName.removeClass(className); //현재 소스
		$('.sns_note').show();
		$('#share_sns').css('margin-bottom', '0');
		$('.sns_tab').hide();
	} else {
		setTimeout(function(){idName.addClass(className); return;}, 1000); //개발 테스트 소스
		//idName.addClass(className); //현재 소스
		$('.sns_tab').attr('tabindex', '0').show();
		$('#share_sns').css('margin-bottom', snsTab + 20 + 'px');
		$('.sns_note').hide();
	}
}

//통계 관련 스크립트
/************************************************************************
* 제목 : Xtractor_CRM_분석스크립트 추가 start
* 설명 : CSDummy 파일은 실제 존재하지 않으며 callCSScript()메소드를 통해 log만 남긴다.
* 추가 : 2012.2.21
/************************************************************************/
var AJAX = function() {
	var request = null;
	this.sendRequest = sendRequest;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("MSXML2.XMLHTTP");
		if (!request) {
			request = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	function sendRequest(reqType, url, asynch, action, queryString) {
		request.open(reqType, url, asynch);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=UTF-8");
		request.send(queryString);
	}
}

function callCSScript(V_ID, L_ID, E_ID, CS_ID, P_ID) {
	var URI = "http://m2.tworld.co.kr/global/xtractor/CSDummy";
	var PARAMS = "V_ID=" + V_ID + "&L_ID=" + L_ID + "&E_ID=" + E_ID + "&CS_ID=" + CS_ID + "&P_ID=" + P_ID;
	var ajax = new AJAX();
	ajax.sendRequest("POST", URI, true, null, PARAMS);
}

/************************************************************************
* 제목 : Xtractor_CRM_분석스크립트 추가 end 
/************************************************************************/

/* 다른 지역 팝업 이벤트 수정 ==> new_tmap_place.js */
/* 매장찾기 */
$(function(){
	var height = $(document).height();
	
	/* 2016-02-15  앱 접근성 관련 수정 */
	if(!$('.popup_tmap .cont > ul').find('a.off').length > 0){
		$('.popup_tmap .cont > ul > li > a').click(function(){
			$(this).toggleClass('on');
			$(this).parent().siblings().find('a').removeClass('on');
			var height_plus = $(this).parent().height();
			$(this).next('ul').toggle();
			$(this).parent().siblings().find('a').next('ul').hide();
			var height_plus2 = $(this).parent().height();
	
			if ($(this).hasClass('on')){
				$('.popup_tmap').css('height',height + height_plus2);
			} else {
				$('.popup_tmap').css('height',height);
			}

			if ($(this).parent('li').siblings().find('a').hasClass('on')){
			}
			return false;
		});
		
		$('.popup_tmap .cont > ul > li > ul li a').click(function(){
			$(this).parent().toggleClass('on');
			$(this).parent().siblings().removeClass('on');
			return false;
		});
		
		$('.popup_tmap .head button').click(function(){
			$('.popup_tmap').hide();
			$('.popup_tmap .cont ul').find('.on').removeClass('on');
			$('.popup_tmap .cont ul li ul').hide();
			return false;
		});
		
		$('.btn_tmap_popup').click(function(){
			$('.popup_tmap').show();
			$('.popup_tmap').css('height',height)
			$('.layer_content').css('marginTop','10px');
			return false;
		});
	}
	/*2016-02-15  앱 접근성 관련 수정 */
});

$(document).ready(function(){
	$("section").append($("<div class='and_layer' style='display:none;'><div class='and_layer_content sub'><div class='head'>안드로이드 구 버전 제한 안내</div><div class='cont'><div class='img_wrap sub'>이 기능은 안드로이드 2.2 이하<br>구 버전에서 <span>이용이 제한</span>됩니다.</div><p class='txt_and'>온라인 T world를 이용해 주시기 바랍니다.<br><span>* 자세한 내용은 공지사항을 참고 해 주세요.</span></p><a href='http://m2.tworld.co.kr/normal.do?serviceId=S_ETC_0021&viewId=V_CMN_0004&domainVer=m2&menuId=8,1&osType=A'><img src='/img/main/btn_popup_notigo.png' alt='공지사항 보러 가기'></a></div><div class='footer'><button title='안드로이드 구 버전 제한 안내 팝업 닫기' onClick='javascript:goAppBack();'><img src='/img/wire/btn_closeX.png' alt='닫기'></button></div></div><div class='layer_dimed'>layer dimed영역</div></div>"));
});

var OsType = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	}
};

function getAndroidVersion(ua) {
	ua = (ua || navigator.userAgent).toLowerCase();
	var match = ua.match(/android\s([0-9\.]*)/);
	return match ? match[1] : false;
};
 
$(document).ready(function(){
	if (window.location.protocol == "https:") {
		if (OsType.Android() ) {
			if (parseFloat(getAndroidVersion()) < 2.3) {//대상 단말기 
			
			// 여기에 팝업 호출 코드 추가
			$('.and_layer').show();								
			$('body').css('overflow-y','hidden').bind('touchmove', function(e){e.preventDefault()}); 
				
			}
		}
	}
});

// 이럴땐 이렇게 하세요 서브페이지 2016-04-27
/*$(window).scroll(function() {
//$(window).on("scrollstart", function() {
	if ($(window).scrollTop() < $("header").height()) {
		$(".q_txt").css({
			"top" : $("header").height() - $(window).scrollTop()
		});
	} else {
		//$(".q_txt").removeAttr("style");
		$(".q_txt").css({
			"top" : 0
		});
	}
	
	console.log($("#header").offset().top - $(window).scrollTop() )
	if($("#header").offset().top - $(window).scrollTop() < -1){
		$(".q_txt").css({
			"top" : 0
		});
	} else {
		$(".q_txt").css({
			"top" : $("#header").height() - $(window).scrollTop()
		});
	}
});*/

/*$(window).scroll(function() {
	if ($(document).scrollTop() < 46){
		$(".q_txt").css({
			"top" : $("header").height()
		});
	}else{
		$(".q_txt").css({ 
			"top" : 0
		});
	}
});*/

$(window).bind('scroll', function() {
	if ($(document).scrollTop() > 46){
		$(".q_txt").css({
			"position":"fixed",
			"top" : "0px"
		});
	} else {
		$(".q_txt").css({
			"position" : "absolute",
			"top" : "45px"
		});
	}
});



$(function(){
	if($('.q_txt #q_txt_off').length > 0){
		$('.q_txt #q_txt_on').attr("title","메뉴열기");
		$('.q_txt #q_txt_off').attr("title","메뉴닫기");
		$('.q_txt #q_txt_on').click(function(){
			$(this).parent('.q_txt').addClass('back');
			$(this).attr("title","메뉴열기").hide();
			$('.q_txt #q_txt_off').show();
			$(".layer_dimmed").css("height", $("section").height()).show();
			$("body").css("overflow-y", "hidden").bind("touchmove", function(e) { e.preventDefault(); });
			$(this).parent().siblings().attr("aria-hidden", true);
			$(".notice").attr("aria-hidden", true);
		});
		
		$('.q_txt #q_txt_off').click(function(){
			$(this).parent('.q_txt').removeClass('back');
			$(this).attr("title","메뉴닫기").hide();
			$('.q_txt #q_txt_on').show();
			$(".layer_dimmed").hide();
			$("body").removeAttr("style").unbind("touchmove");
			$(this).parent().siblings().attr("aria-hidden", false);
			$(".notice").attr("aria-hidden", false);
		});
	} else {
		$('.q_txt .text').click(function(){
			$(this).parent('.q_txt').toggleClass('back');
			if ($(this).parent('.q_txt').hasClass("back")) {
				$(this).find('span').addClass('on').text('닫기');
				$(".layer_dimmed").show();
				$("body").css("overflow-y", "hidden").bind("touchmove", function(e) { e.preventDefault(); }); 
			} else {
				$(this).find('span').removeClass('on').text('열기');
				$(".layer_dimmed").hide();
				$("body").removeAttr("style").unbind("touchmove"); 
			}
			return false;
		});
		
	}
});
// 이럴떈 이렇게 하세요 서브페이지 top menu 2015-09-22 [e]

/* 2016-02-01 UI관련 추가 */
$(function () {
	// Init
	noticeView("faq_note_list");
});

/**********************
 UI : noticeView
***********************/
var noticeView = function(className) {
	var $obj = $("." + className),
		$titArea = $obj.find(".title_area"),
		$notiToggle = $obj.find("> ul > li button.noti_btn"),
		$notiDetail = $obj.find(".cont_area"),
		$speed = 150;

	$titArea.bind("click", function(){
		var $self = $(this);
		
		if(!$(this).closest("li").is(".view_cont")) {
			var btn = $(this);
			$(this)
				.closest("li")
				.parent()
				.siblings(".faq_note_list > ul")
				.find("li .cont_area")
				.stop(true, true)
				.slideUp(0);
			$("li").removeClass("view_cont");
			$("button.noti_btn").removeClass("on");
			$(this).find("button").addClass("on").text("상세보기 닫기");
			$(this)
				.next($notiDetail)
				.stop(true, true)
				.slideDown($speed)
				.parent("li")
				.siblings()
				.find($notiDetail)
				.stop(true, true)
				.slideUp(0);
			$(this).parents("li").addClass("view_cont").siblings().removeClass("view_cont");
			
			if($(document).height() == $(window).height()){ 
				$(".copyright").addClass("notice_copy");
			}
		} else {
			$(this).find("button").removeClass("on").text("상세보기 열기");
			$notiDetail.stop(true, true).slideUp(0);
			$notiDetail.parent("li").removeClass("view_cont");
			
			if($(document).height() != $(window).height()){ 
				$(".copyright").removeClass("notice_copy");
			}
		}
	});
		
	/*$notiToggle.on("click", function(e) {
		if(!$(this).closest("li").is(".view_cont")) {
			$(this)
				.closest("li")
				.parent()
				.siblings(".faq_note_list > ul")
				.find("li .cont_area")
				.stop(true, true)
				.slideUp(0);
			$("li").removeClass("view_cont");
			$("button.noti_btn").removeClass("on");
			$(this).addClass("on").text("상세보기 닫기");
			$(this)
				.parent()
				.next($notiDetail)
				.stop(true, true)
				.slideDown($speed)
				.parent("li")
				.siblings()
				.find($notiDetail)
				.stop(true, true)
				.slideUp(0);
			$(this).parents("li").addClass("view_cont").siblings().removeClass("view_cont");
		} else {
			$(this).removeClass("on").text("상세보기 열기");
			$notiDetail.stop(true, true).slideUp(0);
			$notiDetail.parent("li").removeClass("view_cont");
			$(this).parents().find(".title").focus();
		}
	});*/
}