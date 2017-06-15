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

function membershipReady(){
	//alert("$(document).height() : " + $(document).height() +  "$(window).height() : " + $(window).height() +  "$(#ifr_body) : " + $("#ifr_body").height());
	if ( $("#ifr_body").length > 0  ) {
		if($(document).height() <= $(window).height()){
			$('.copyright').addClass('notice_copy');
		}
	}
}

// 모바일 주소창 감추기
try {
	window.addEventListener('load', function(){
		setTimeout(scrollTo, 0, 0, 1); 
	}, false);
} catch(e) {}

// list menu
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

//sub menu
function subMenu(index,viewnum){
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
	}



	if (hiddenLi > 0){



		menuLi.eq(hiddenLi + 2).addClass('last');

		$('.menu_roll_list .menu_list').find('li:gt('+hiddenLi + 2 +')').addClass('disabled_list_d'); // 2013-10-04 추가

	} else {



		menuLi.eq(2).addClass('last');

		$('.menu_roll_list .menu_list').find('li:gt(2)').addClass('disabled_list_d'); // 2013-10-04 추가

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



		if ($('.menu_roll_list .menu_list').find('.disabled_list').length == indexNum){



			$('.menu_roll_list .next_btn').addClass('next_disabled');



		} else if ($('.menu_roll_list .menu_list').find('.disabled_list').length == 0){



			$('.menu_roll_list .prv_btn').addClass('prv_disabled');



		}



		$('.menu_roll_list .next_btn').click(function(){



			var hdList = $('.menu_roll_list .menu_list').find('.disabled_list');



			var hdListNum = hdList.length;



			if (hdListNum == indexNum - 1){

				$('.menu_roll_list .next_btn').addClass('next_disabled');

			}



			if (hdListNum < indexNum){



				menuLi.eq(hdListNum).addClass('disabled_list');



				menuLi.removeClass('last');

                menuLi.eq(hdListNum + 3).removeClass('disabled_list_d'); // 2013-10-04 추가

				menuLi.eq(hdListNum + 3).addClass('last');



			}



			if (hdListNum >= 0){



				$('.menu_roll_list .prv_btn').removeClass('prv_disabled');



			}



		});



		$('.menu_roll_list .prv_btn').click(function(){



			var hdList = $('.menu_roll_list .menu_list').find('.disabled_list');



			var hdListNum = hdList.length;



			if (hdListNum <= 1){



				$('.menu_roll_list .prv_btn').addClass('prv_disabled');



			}



			if (hdListNum <= indexNum){



				menuLi.eq(hdListNum - 1).removeClass('disabled_list');



				menuLi.removeClass('last');



				if (hdListNum + 1 >= 2){



					menuLi.eq(hdListNum + 1).addClass('last');

					menuLi.eq(hdListNum + 2).addClass('disabled_list_d');; // 2013-10-04 추가

				} else {



					menuLi.eq(2).addClass('last');

					menuLi.eq(3).addClass('disabled_list_d'); //2013-10-04 추가



				}



			}



			if (hdListNum <= indexNum){



				$('.menu_roll_list .next_btn').removeClass('next_disabled');



			}



			return false;

		});



	}



}







//layerpopup



function layerView(id){



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

	//$('.layer_dimed').css('height',dHeight);



	/* 2014-03-31 레이어팝업 위치값 고정 */

	layerId.find('.layer_content').css('top', '0px').css('margin-top', '44px');



}





/*

	if (layerTop <= 0){



		if (layerTop <= scrollH*2){



			if (scrollHtow <= 44){



				layerId.find('.layer_content').css('top', '0');



			} else {



				layerId.find('.layer_content').css('top', scrollH - 16 + 'px');



			}



			if ($('#content').outerHeight(true) + 44 <= (scrollH*2) + layerId.find('.layer_content').outerHeight(true)){



				$('body').css('height',(scrollH*2) + layerId.find('.layer_content').outerHeight(true) + 'px');

			}



		} else {



			layerId.find('.layer_content').css('top', '10px');



		}



	} else if (layerTop <= scrollH*2){



		layerId.find('.layer_content').css('top', scrollH*2 - 44 + 'px');



		if ($('#content').outerHeight(true) + 44 <= (scrollH*2) + layerId.find('.layer_content').outerHeight(true)){



			$('body').css('height',(scrollH*2) + layerId.find('.layer_content').outerHeight(true) + 'px');



		}



	} else {



		if (layerTop <= 44){



			layerId.find('.layer_content').css('top', '10px');



		} else {



			//layerId.find('.layer_content').css('top', layerTop - 50 + 'px');

			layerId.find('.layer_content').css('top', layerTop + 10 + 'px');



		}



	}



	if ($('#content').height() <= layerId.find('.layer_content').height()){



		$('body').css('height',layerId.find('.layer_content').height());



	}



	if ($(window).height() > $('#content').outerHeight(true)){



		$('body').css('height',$(window).height()-74);



	}



}

*/





function layerClose(id){



	var layerId = $('#' + id);



	layerId.removeClass('view_layer');



	//$('#content').css('height','auto');

	$('body').css('height','auto');



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







//주변가맹점 찾기



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

		

		var self = $(this), // 2014-01-02 웹접근성 수정

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







//고객센터 및 공지사항



function faqNote(){

	$('.noti_btn').html('열기<span class="noti_btn_sp"></span>'); // 2014-01-02 웹접근성 추가



	var noteT = $('.faq_note_list'),



		titleArea = $('.faq_note_list .title_area'),



		listTotal = noteT.find('li').length;







	//noteT.find('li').eq(listTotal - 1).addClass('list_list');



	titleArea.bind('click', function() {



		var self = $(this);



		if (self.parent().hasClass('view_cont')) {



			noteT.find('li').removeClass('view_cont');

			$('.noti_btn').html('열기<span class="noti_btn_sp"></span>'); // 2014-01-02 웹접근성 추가



			if($(document).height() == $(window).height()){ 

				$('.copyright').addClass('notice_copy');

			}

			//storeT.find('li .item_btn_area').slideUp(200);



		} else {



			noteT.find('li').removeClass('view_cont');

			$('.noti_btn').html('열기<span class="noti_btn_sp"></span>'); // 2014-01-02 웹접근성 추가



			self.parent().addClass('view_cont');

			self.find('button').html('닫기<span class="noti_btn_sp"></span>'); // 2014-01-02 웹접근성 추가



			if($(document).height() != $(window).height()){ 

				$('.copyright').removeClass('notice_copy');

			}

			//storeT.find('li .item_btn_area').slideUp(200);



			//self.parent().find('.item_btn_area').slideDown(200);



		}



	});



}



//고객센터 및 공지사항-param



function faqNote_item(notice_no){



	var noteT = $('.faq_note_list'),



		titleArea = $('.faq_note_list .title_area'),



		listTotal = noteT.find('li').length;



	//공지사항 항목(parameter) 열기

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

	$('.product_accordion .pd_accordion_title a').attr('title','열기'); // 2014-01-02 웹접근성 추가



	$('.product_accordion .pd_accordion_title span').click(function(){



		if ($(this).parents().parents('li').hasClass('view_cont')) {



			$(this).parents().parents('li').removeClass('view_cont');

			$(this).parent('a').attr('title','열기'); // 2014-01-02 웹접근성 추가



		} else {



			$('.product_accordion > li').removeClass('view_cont');

			$('.product_accordion .pd_accordion_title a').attr('title','열기'); // 2014-01-02 웹접근성 추가

			$(this).parents().parents('li').addClass('view_cont');

			$(this).parent('a').attr('title','닫기'); // 2014-01-02 웹접근성 추가



		}



	});



}







//클릭시 view/hidden



function viewHidden(id, className){



	var idName = $('#' + id);



	if (idName.hasClass(className)) {



		idName.removeClass(className);



	} else {



		idName.addClass(className);



	}



}



//2014-03-26 자주 찾는 문의 + 2014-05-02 추가 이미지 변경

function faqNote2(){

	//$('.noti_btn').html('열기<span class="noti_btn_sp"></span>'); // 2014-01-02 웹접근성 추가

	$('.faq_arrow img').attr('alt','열기'); // 2014-01-02 웹접근성 추가



	var noteT = $('.faq_note_list'),



		titleArea = $('.faq_note_list .title_area'),



		listTotal = noteT.find('li').length;







	//noteT.find('li').eq(listTotal - 1).addClass('list_list');



	titleArea.bind('click', function() {



		//var self = $(this);

		var self = $(this), // 2014-01-02 웹접근성 수정

		selfimg = $('.faq_arrow img'); // 2014-01-02 웹접근성 추가



		if (self.parent().hasClass('view_cont')) {



			noteT.find('li').removeClass('view_cont');

			//$('.noti_btn').html('열기<span class="noti_btn_sp"></span>'); // 2014-01-02 웹접근성 추가

			selfimg.attr('src','/images/bg/bg_faq_note_arrow_d_300dpi.png'); // 2014-01-02 웹접근성 추가

			selfimg.attr('alt','열기'); // 2014-01-07 웹접근성 추가



			

			//storeT.find('li .item_btn_area').slideUp(200);



		} else {



			noteT.find('li').removeClass('view_cont');

			//$('.noti_btn').html('열기<span class="noti_btn_sp"></span>'); // 2014-01-02 웹접근성 추가

			selfimg.attr('alt','열기'); // 2014-01-02 웹접근성 추가

			selfimg.attr('src','/images/bg/bg_faq_note_arrow_d_300dpi.png'); // 2014-01-02 웹접근성 추가



			self.parent().addClass('view_cont');

			//self.find('button').html('닫기<span class="noti_btn_sp"></span>'); // 2014-01-02 웹접근성 추가

			self.parent().find('.faq_arrow img').attr('alt','닫기'); // 2014-01-07 웹접근성 수정 : children -> parent

			self.parent().find('.faq_arrow img').attr('src','/images/bg/bg_faq_note_arrow_u_300dpi.png'); // 2014-01-07 웹접근성 수정 : children -> parent



			

			//storeT.find('li .item_btn_area').slideUp(200);



			//self.parent().find('.item_btn_area').slideDown(200);



		}



	});



}



//2014-08-26 SNS 공유 버튼 : 2014-12-19 앱접근성 반영 후 삭제

/*

function goShareOpen(id, className){

	var idName = $('#' + id);

	if (idName.hasClass(className)) {

		idName.removeClass(className);

		$('.share_layer').hide();

		$('.sns_ico_share').attr('src','/img/sns/present_share.jpg');

	} else {

		idName.addClass(className);

		$('.share_layer').show();

		$('.sns_ico_share').attr('src','/img/sns/present_share_on.jpg');

	}

	if ($('#present_sns').hasClass('sms_on')){

		$('#present_sns').removeClass('sms_on');

		$('.sns_tab').hide();

	}

}

*/

// 2014-10-20 부가서비스/T로밍 리스트 수정

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



//2014-12-19 SNS 공유 버튼

function goShareOpen(id, className){

	var idName = $('#' + id);

	if (idName.hasClass(className)){

		setTimeout(function(){idName.removeClass(className); return;}, 1000); //개발 테스트 소스

		//idName.removeClass(className); //현재 소스

		$('.share_layer2').removeClass('view');

		$('.sns_ico_share').attr('src','/img/sns/present_share.jpg');

	} else {

		setTimeout(function(){idName.addClass(className); return;}, 1000); //개발 테스트 소스

		//idName.addClass(className); //현재 소스

		$('.share_layer2').addClass('view');

		$('.sns_ico_share').attr('src','/img/sns/present_share_on.jpg');

	}

	if ($('#share_sns').hasClass('sms_on')){

		$('#share_sns').removeClass('sms_on');

		$('.sns_tab').hide();

	}

}



//2014-12-19 SMS + SNS 공유 버튼

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

//2015-04-08 유선메인 팝업

$(function(){

	$('.btv_close').click(function(){

		$('.view_layer').hide();

		return false

	});

	var d_height = $(document).height();

	$('.layer_area').css('height',d_height);

	

});

$(window).load(function(){

	var w_height = $(window).height();

	var c_height = $('.layer_content').height();

	var w50 = w_height / 2

	var c50 = -(c_height / 2)

	$('.layer_content').css({top: w50, marginTop: c50});

});

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

//request.onreadystatechange = action; // CallBack

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

