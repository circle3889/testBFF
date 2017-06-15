$(document).ready(function() {
	// 서브 메인 및 부가서비스 메인 배너
	startAutoPlay();
	function RandomBanner() {
		var random = Math.floor(Math.random() * 8) + 1;
		var random_txt = '#banner_type' + '0' + random;
		// console.log(random_txt);
		$(random_txt).show();
	}

	// 자동 실행 시작
	function startAutoPlay() {
		/* 2016-03-07 수정 : 앱 접근성 문제로 배너의 자동 롤링 제거 */
		if (!(/ipod|iphone|ipad/.test(navigator.userAgent
				.toLowerCase()))) {
			if (this.banner_time != 0)
				clearInterval(this.banner_time);
			this.banner_time = setInterval(function() {
				$('#banner_type .arw_r').trigger('click');
			}, 3000);
		} else {
			$('#banner_type .bplay_btn').hide();
		}
		/* 2016-03-07 수정 : 앱 접근성 문제로 배너의 자동 롤링 제거 */

	}
	// 자동실행 멈춤.
	function stopAutoPlay() {
		if (this.banner_time != 0)
			clearInterval(this.banner_time);

		this.banner_time = 0;
	}

	// banner right button
	$('#banner_type .arw_r').click(function() {
		var $this = $(this);
		var box_id = $this.parent();
		var c_page_index = $('#banner_type li.c_page').index();
		var li_num = $('#banner_type li').length;

		box_id.find('ul li').removeClass('c_page');
		box_id.find('.b_paging span').removeClass('on');
		box_id.find('.b_paging span').removeAttr("title");
		if (c_page_index == li_num - 1) {
			c_page_index = 0;
		} else {
			c_page_index = c_page_index + 1;
		}

		box_id.find('ul li').eq(c_page_index).addClass('c_page');
		box_id.find('.b_paging span').eq(c_page_index).addClass('on');
		box_id.find('.b_paging span').eq(c_page_index).attr("title", "현재 배너");

		if ($('.b_paging .b_page:first-of-type').hasClass('on')) {
			$('.arw_l .ico_comm').removeClass('ov');
			$('.arw_r .ico_comm').addClass('ov');
		} else if ($('.b_paging .b_page:last-of-type').hasClass('on')) {
			$('.arw_l .ico_comm').addClass('ov');
			$('.arw_r .ico_comm').removeClass('ov');
		} else if (!$('.b_paging .b_page:first-of-type, .b_paging .b_page:last-of-type').hasClass('on')) {
			$('.arw_r .ico_comm, .arw_l .ico_comm').addClass('ov');
		}

		// startAutoPlay();
		return false;
	});
	
	// banner left button
	$('#banner_type .arw_l').click(function() {
		var $this = $(this);
		var box_id = $this.parent();
		var c_page_index = $('#banner_type li.c_page').index();
		var li_num = $('#banner_type li').length;

		box_id.find('ul li').removeClass('c_page');
		box_id.find('.b_paging span').removeClass('on');
		box_id.find('.b_paging span').removeAttr("title");
		if (c_page_index == 0) {
			c_page_index = li_num - 1;
		} else {
			c_page_index = c_page_index - 1;
		}

		box_id.find('ul li').eq(c_page_index).addClass('c_page');
		box_id.find('.b_paging span').eq(c_page_index).addClass('on');
		box_id.find('.b_paging span').eq(c_page_index).attr("title", "현재 배너");
		// startAutoPlay();

		if ($('.b_paging .b_page:first-of-type').hasClass('on')) {
			$('.arw_l .ico_comm').removeClass('ov');
			$('.arw_r .ico_comm').addClass('ov');
		} else if ($('.b_paging .b_page:last-of-type').hasClass('on')) {
			$('.arw_l .ico_comm').addClass('ov');
			$('.arw_r .ico_comm').removeClass('ov');
		} else if (!$('.b_paging .b_page:first-of-type, .b_paging .b_page:last-of-type').hasClass('on')) {
			$('.arw_r .ico_comm, .arw_l .ico_comm') .addClass('ov');
		}

		return false;
	});

	// banner paging dot
	$('#banner_type .b_paging .b_page ').click(function() {
		var $this = $(this);
		var page_index = $this.index();
		var box_id = $this.parent().parent();
		box_id.find('ul li').removeClass('c_page');
		$this.siblings().removeClass('on');
		box_id.find('ul li').eq(page_index).addClass('c_page');
		$this.addClass('on');
		return false;
	});

	// banner stop button toggle
	$('#banner_type .bplay_btn').toggle(function() {

		// window.clearInterval(banner_time);

		stopAutoPlay();
		$(this).addClass('b_play');
		$(this).text('배너이미지 재생');
		return false;

	}, function() {
		startAutoPlay();

		$(this).removeClass('b_play');
		$(this).text('배너이미지 일시정지');
		return false;
	});
	/**
	 * Format date as a string
	 * 
	 * @param date -
	 *            a date object (usually "new Date();")
	 * @param format -
	 *            a string format, eg. "DD-MM-YYYY"
	 */
	$.fnDateFormat = function(date, format) {
		format = format.replace("DD", (date.getDate() < 10 ? '0' : '') + date.getDate());
		format = format.replace("MM", (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1));
		format = format.replace("YYYY", date.getFullYear());
		return format;
	}

	// $.post("/json/prod_submain_banner.json", function(data){
	// //상품서브메인 베너 test

	// var jsonData = JSON.parse(data);
	// var currentDate = new Date();
	// var nDate = $.fnDateFormat(currentDate,"YYYYMMDD");
	// var banner = ""
	// var page = "";
	// var count = 0;
	// $.each(jsonData, function (index, value) {

	// var b_sdate = new Date(value.b_start_date.replace(/-/g,
	// "/"));
	// var b_edate = new Date(value.b_end_date.replace(/-/g,
	// "/"));
	// b_sdate = $.fnDateFormat(b_sdate,"YYYYMMDD");
	// b_edate = $.fnDateFormat(b_edate,"YYYYMMDD");

	// if ((b_edate >= nDate) && (b_sdate <= nDate) ){
	// count++;
	// var t_link = value.b_link;
	// t_link = t_link.replace("http://","");

	// banner ="<li style=\"background:"+ value.b_banner_bg +"\"
	// ><a href=\"javascript:goBanner('" + t_link + "',
	// '"+value.b_billyn+"', '"+value.b_inout+"',
	// '"+value.b_static_cd+"')\"><img src='"+ value.b_img +"'
	// alt='"+ value.b_alt +"'/></a></li>";
	// page ="<span class='b_page'><img src='/img/blank.png'
	// width='9px' height='9px' alt='"+count+"번째 배너보기' /></span>
	// ";

	// $('#banner_type ul').append(banner);
	// $('#banner_type .bplay_btn').after(page);
	// }
	// });
	// $('#banner_type ul li:first').addClass('c_page');
	// $('span.b_page:first').addClass('on');
	// });

	// 아코디언 리스트(accordionList) : 20150612 모두 펼쳐지게 변경
	// $('.accordion_wrap > dd').css('display','none');
	// $('.accordion_wrap > dt[class=on]').next('dd').show();
	// $(".accordion_wrap > dt").click(function(){
	// $(this).next(".accordion_wrap >
	// dd").slideToggle('fast').siblings("dd:visible").slideUp("fast");
	// if($(this).is(".on")){
	// $(this).removeClass("on");
	// }else{
	// $(this).addClass("on").siblings(".accordion_wrap >
	// dt").removeClass("on");
	// }
	// return true;
	// });

	// 아코디언 토글 리스트(accordionList2)
	$('dl[class^="accordion_wrap"] > dd').css('display', 'none');
	$('dl[class^="accordion_wrap"] > dt[class=on]').next('dd').show();
	var isAction = true;
	$('dl[class^="accordion_wrap"] > dt').click(function() {
		/* 2016-01-19 접근성 수정 */
		/*
		 * if ($(this).hasClass('on') == true){
		 * $(this).removeClass("on");
		 * $(this).next('dl[class^="accordion_wrap"] >
		 * dd').slideUp("fast"); }else{
		 * $(this).addClass("on");
		 * $(this).next('dl[class^="accordion_wrap"] >
		 * dd').slideDown("fast"); }
		 */
		if(isAction){
			isAction = false;
			if ($(this).hasClass("active")) {
				return false;
			} else {
				$(this).addClass("active");
				$(this).animate({
					"opacity" : 1
				}, 300, function() {
					$(this).removeClass("active").removeAttr("style");
					if ($(this).hasClass('on')) {
						$(this).removeClass("on");
						$(this).find('a').attr('title', '상세보기 보이기');
						$(this).next('dl[class^="accordion_wrap"] > dd').css('display', 'none');
					} else {
						$(this).addClass("on");
						$(this).find('a').attr('title', '상세보기 숨기기');
						$(this).next('dl[class^="accordion_wrap"] > dd').css('display', 'block');
					}
				});
			}
			setTimeout(function(){
				//alert("1111")
				isAction = true;
			}, 1000)
		}
		/* 2016-01-19 접근성 수정 */
		return true;
	});

	// 물음표 버튼 : 내용보기, 내용닫기 공통으로 사용하기
	$('a[href^="#ui_toggle_"]').click(function() {
		var target = $(this).attr('href');
		var targetId = target.slice(1);
		if ($('#' + targetId + '').is(':hidden')) {
			$('#' + targetId + '').show();
			$(this).find('span');
		} else {
			$('#' + targetId + '').hide();
			$(this).find('span');
		}
		return false;
	});

	/* 2016-02-12 수정 앱 접근성 개선 */
	// 요금제 찾기 결과보기 : 사용중 요금제 보기
	$('.toggle_wrap .btn_toggle').click(function() {
		if ($(this).hasClass('folding') == true) {
			// $('.toggle_wrap
			// .toggle_detail2').slideUp('fast');
			$(this).removeClass('folding').addClass('show').attr('title', '내용열기');
		} else {
			// $('.toggle_wrap
			// .toggle_detail2').slideDown('fast');
			$(this).addClass('folding').removeClass('show').attr('title', '내용접기');
			$("#ui_toggle_01 .use_now .name a").focus();
		}
	});
	/* 2016-02-12 수정 앱 접근성 개선 */

	// 논리적인 탭 세팅 부분(tab)
	$('ul.tab_menu_s').each(function() {
		$(this).find('li').each(function(i) {
			$(this).click(function() {
				$(this).addClass('on').siblings().removeClass('on').parents('[class^="tab2_"] , [class^="tab3_"]').find('.ui_tab_s').eq($(this).index()).fadeIn(150).siblings('.ui_tab_s').hide().removeClass('visual');
				$(this).parent().find("a").removeAttr("title");
				$(this).find("a").attr("title", "현재 탭");
			});
		});
	});

	// layer menu : 원장 레이어
	$('.content_up').hide();
	var scrollStat = true;
	var scrollContentOpen = false;
	var scroll_varPrev = 0;
	/* 2016-02-15 수정 앱 접근성 -> 상품 하단 팝업 레이어 이벤트 iOS에 제거 */
	if (!(/ipod|iphone|ipad/.test(navigator.userAgent.toLowerCase()))) {
		setTimeout(function() {
			scroll_varPrev = 0
			$(window).on('scroll', scrollHandlerLayerMenu);
		}, 100);
	}
	/* 2016-02-15 수정 앱 접근성 -> 상품 하단 팝업 레이어 이벤트 iOS에 제거 */

	function scrollHandlerLayerMenu() {
		if (scroll_varPrev > $("html,body").offset().top && 0 > $("html,body").offset().top) {
			if (scrollStat && !scrollContentOpen) {
				$('.layer_menu ').addClass("close");
				if ($(window).scrollTop() == $(document).height() - $(window).height()) {
					$('.layer_menu ').removeClass("close");
				} else {
					if ($(window).scrollTop() == $('html').height() - $('body').height()) {
						$('.layer_menu ').removeClass("close");
					}
				}
			}
		} else {
			if (scrollStat && !scrollContentOpen) {
				$('.layer_menu ').removeClass("close");
			}
		}
		scroll_varPrev = $("html,body").offset().top;
	}

	$('.layer_menu > li').click(function() {
		if ($(this).hasClass("stickLayer")) {
			scrollStat = false;
			setTimeout(function() {
				var _uph = $(".tab3_three").offset().top - ($(window).height() - 254);
				$('html,body').stop().animate({
					scrollTop : _uph
				}, 500, function() {
					setTimeout(function() {
						scrollStat = true;
					}, 100);
				});
			}, 1);
		}

		$(this).addClass('on').siblings().removeClass('on');
		if (!$(this).hasClass("btn_top")) {
			$('.layer_menu > li').not(".btn_top").children("a").removeAttr("title");
			$("> a", $(this)).attr("title","현재위치");
		} else {
			$('.layer_menu > li').not(".btn_top").children("a").removeAttr("title");
		}

		$(this).find('.content_up').slideDown("fast");
		$(this).siblings().find('.content_up').slideUp("fast");

		if (!$(this).hasClass("btn_top")) {
			scrollContentOpen = true;
		}
	});

	$('.btn_close').click(function() {
		scrollContentOpen = false;
		$('.layer_menu ').removeClass("close");
		$(this).parents('.content_up').slideUp("fast");
		$('.layer_menu > li').removeClass('on');
		var tempNum = $('.layer_menu > li').index($(this).parent().parent().parent()) + 1;
		$('.layer_menu > li').eq(tempNum).attr('tabindex', 0).trigger('focus');
		// console.log(tempNum);
		// $('.layer_menu >
		// li.btn_top').attr('tabindex',0).trigger('focus');
		return false;
	});

	// 내게 맞는 요금제 보기 결과
	/* 2016-02-12 수정_01 [s] 앱 접근성 개선 */
	$('div[class^="recommend_type"]').click(function() {
		$('div[class^="recommend_type"]').removeClass('up');
		setTimeout(function() {
			/*
			 * $('div[class^="recommend_type"]
			 * a.').each(function() {
			 * $(this).attr('href',$(this).attr('data-url'));
			 * });
			 */
			$('div[class^="recommend_type"] a.toggle_link').each(function() {
				$(this).hide();
			});
			$('div[class^="recommend_type"] a.real_link').each(function() {
				$(this).show();
			});
		}, 1);

		$('.recommend_wrap .btn_result3').addClass('open');
		$(this).find(".real_link").focus();

		$('html, body').animate({
			scrollTop : $(this).offset().top
		}, 500);

		// $("body").scrollTop($(this).position().top);
	});
	/* 2016-02-12 수정_01 [s] 앱 접근성 개선 */

	// 온가족 행복플랜 더보기
	// $('a[href^="#ui_toggle2_"]').click(function() {
	// var target = $(this).attr('href');
	// var targetId = target.slice(1);
	// if ($('#'+targetId+'').is(':hidden')) {
	// $('#'+targetId+'').show();
	// $(this).find('span').text("닫기");
	// $(this).addClass('hide2');
	// } else{
	// $('#'+targetId+'').hide();
	// $(this).find('span').text("더보기");
	// $(this).removeClass('hide2');
	// }
	// return false;
	// });
	// 온가족 무료 결합할 회선 수 선택 +, - 버튼
	// $('.btn_plus').click(function(){
	// var n = $('.btn_plus').index(this);
	// var num = $(".num:eq("+n+")").val();
	// num = $(".num:eq("+n+")").val(num*1+1);
	// });
	// $('.btn_minus').click(function(){
	// var n = $('.btn_minus').index(this);
	// var num = $(".num:eq("+n+")").val();
	// num = $(".num:eq("+n+")").val(num*1-1);
	// });
	//  
}); /* 마지막 닫기 */

/*
 * 내게 맞는 요금제 찾기 FORM OBJECT CONTROL
 * @function
 * @param ( act, objId, _alt )
    act     : 동작 ( open, close )
    objId   : 대상객체 ID 값
    _alt    : 이미지 alt 값
*/
(function() {
	this._Product = {
		findFeeSystem : function() {
			var obj = {};
			obj.maxVoice = 99999; // 음성통화 사용량 MAX VALUE
			obj.maxData = 9999; // 데이터 사용량 MAX VALUE

			obj.setVoiceObj = '', obj.setDataObj = '', obj.setDealy = 100;

			// 로그인 여부 판별용 변수
			obj.loginResult = '', obj.loginType = '', obj.setLoginObj = '',
					obj.setLoginCnt = 0, obj.setLoginLimit = 20,
					obj.setLoginDealy = 200;

			obj.childInit = function(className, callback) {
				jQuery('.' + className).each(function() {
					var _child_class = jQuery(this).attr('data-name');
					_child_class = _child_class.replace('_child', '');

					jQuery('.' + _child_class).each(function() {
						var _idx = jQuery(this).attr('data-idx');
						var _class = 'op' + _idx;
						var _html = jQuery(this).find('em').html();
						_html = _html.replace(' 선택', '');

						jQuery(this).removeClass(_class + '_on');
						jQuery(this).addClass(_class);
						jQuery(this).find('em').html(_html);

						var _inputName = _child_class.replace('jq_', 'fee_');
						jQuery('input[name="' + _inputName + '"]').val('');

						_idx = null;
						_class = null;
						_html = null;
						_inputName = null;
					});

					jQuery(this).hide();

					_child_class = null;
				});
			};

			obj.setVoiceFunc = function(getParam) {
				// getParam 정의
				if (getParam) {
					if (!getParam.type) {
						getParam.type = '';
					}
					if (!getParam.init) {
						getParam.init = '';
					}
					if (!getParam.voiceType) {
						getParam.voiceType = '';
					}
				} else {
					getParam = {};
					getParam.type = '', getParam.init = '', getParam.voiceType = '';
				}

				var _this = {};
				_this.inputFocus = 'N';
				jQuery('.jq_voice').each(function() {
					var _tmpFocus = jQuery(this).attr('data-focus');
					if (_tmpFocus && _tmpFocus == 'Y') {
						_this.inputFocus = 'Y';
						return;
					}
					_tmpFocus = null;
				});

				if (_this.inputFocus == 'Y' && getParam.type != 'change') {
					return false;
				}

				_this.voiceTotalUsed = jQuery('input[name="fee_voiceTotalUsed"]');
				_this.totalValue = _this.voiceTotalUsed.val();
				if (!_this.totalValue) {
					return false;
				}
				try {
					_this.totalValue = _this.totalValue.replace(/,/g, '');
				} catch (e) {
					return false;
				}
				_this.totalValue = parseInt(_this.totalValue, 10);
				if (isNaN(_this.totalValue)) {
					return false;
				}

				_this.voiceInUsed = jQuery('input[name="fee_voiceInUsed"]');
				_this.inValue = _this.voiceInUsed.val();
				if (_this.inValue) {
					_this.inValue = _this.inValue.replace(/,/g, '');
				}

				_this.voiceOutUsed = jQuery('input[name="fee_voiceOutUsed"]');
				_this.outValue = _this.voiceOutUsed.val();
				if (_this.outValue) {
					_this.outValue = _this.outValue.replace(/,/g, '');
				}

				if (getParam.voiceType == 'total' && getParam.init == 'Y') {
					_this.voiceInUsed.val(_this.totalValue);
					_this.voiceOutUsed.val(0);
				} else {
					if (getParam.voiceType == 'in') {
						if (!_this.inValue || isNaN(_this.inValue)) {
							return false;
						}
						_this.inValue = parseInt(_this.inValue, 10);

						if (_this.totalValue < _this.inValue) {
							_this.voiceInUsed.val(_this.totalValue);
							_this.voiceOutUsed.val(0);
							_this.inValue = _this.voiceInUsed.val();
							_this.outValue = _this.voiceOutUsed.val();
							// return false;
							/*
							 * alert('음성통화 총 사용량 보다 클 수가 없습니다.'); setTimeout(
							 * function() { _this.voiceInUsed.focus(); }, 1 );
							 * return false;
							 */
						}

						_this.outValue = _this.totalValue - _this.inValue;
						_this.voiceOutUsed.val(_this.outValue);
					} else if (getParam.voiceType == 'out') {
						if (!_this.outValue || isNaN(_this.outValue)) {
							return false;
						}
						_this.outValue = parseInt(_this.outValue, 10);

						if (_this.totalValue < _this.outValue) {
							_this.voiceInUsed.val(0);
							_this.voiceOutUsed.val(_this.totalValue);
							_this.inValue = _this.voiceInUsed.val();
							_this.outValue = _this.voiceOutUsed.val();

							/*
							 * alert('음성통화 총 사용량 보다 클 수가 없습니다.'); setTimeout(
							 * function() { _this.voiceOutUsed.focus(); }, 1 );
							 * return false;
							 */
						}
						_this.inValue = _this.totalValue - _this.outValue;
						_this.voiceInUsed.val(_this.inValue);
					}
				}

				// 망내, 망외 음성 사용량 재정의
				_this.inValue = _this.voiceInUsed.val();
				if (_this.inValue) {
					_this.inValue = _this.inValue.replace(/,/g, '');
					_this.inValue = parseInt(_this.inValue, 10);
				}

				_this.outValue = _this.voiceOutUsed.val();
				if (_this.outValue) {
					_this.outValue = _this.outValue.replace(/,/g, '');
					_this.outValue = parseInt(_this.outValue, 10);
				}

				if (!isNaN(_this.totalValue) && !isNaN(_this.inValue) && !isNaN(_this.outValue)) {
					_this.excute = 'N';

					_this.inValueOrg = _this.voiceInUsed.attr('data-setvalue');
					if (_this.inValueOrg) {
						_this.inValueOrg = parseInt(_this.inValueOrg, 10);
						if (_this.inValueOrg != _this.inValue) {
							_this.excute = 'Y';
						}
					} else {
						_this.excute = 'Y';
					}

					_this.outValueOrg = _this.voiceOutUsed.attr('data-setvalue');
					if (_this.outValueOrg) {
						_this.outValueOrg = parseInt(_this.outValueOrg, 10);
						if (_this.outValueOrg != _this.outValue) {
							_this.excute = 'Y';
						}
					} else {
						_this.excute = 'Y';
					}

					if (_this.excute == 'Y') {
						jQuery('.jq_voice_graph_bar').draggable();
						// 망내, 망외 음성 사용량을 음성통화 총 사용량 값보다 크게 될 경우 재 정의
						_this.pulsTotalValue = _this.inValue + _this.outValue;
						if (_this.totalValue != _this.pulsTotalValue) {
							if (_this.inValue > _this.outValue) {
								_this.inValue = _this.totalValue - _this.outValue;
								_this.voiceInUsed.val(_this.inValue);
							} else {
								_this.outValue = _this.totalValue - _this.inValue;
								_this.voiceOutUsed.val(_this.outValue);
							}
						}
						// 마우스 제어 시에 필요한 attribute 정의
						_this.voiceTotalUsed.attr('data-orgvalue', _this.totalValue);
						_this.voiceTotalUsed.attr('data-setvalue', _this.totalValue);

						_this.voiceInUsed.attr('data-orgvalue', _this.inValue);
						_this.voiceOutUsed.attr('data-orgvalue', _this.outValue);

						_this.voiceInUsed.attr('data-setvalue', _this.inValue);
						_this.voiceOutUsed.attr('data-setvalue', _this.outValue);

						if (_this.totalValue > 0) {
							_this.leftPercent = (_this.inValue / _this.totalValue) * 100;
						} else {
							_this.leftPercent = 50;
						}

						if (_this.totalValue > 0) {
							_this.rightPercent = (_this.outValue / _this.totalValue) * 100;
						} else {
							_this.rightPercent = 50;
						}

						if (_this.inValue > _this.outValue) {
							_this.leftPercent = Math.floor(_this.leftPercent);
							_this.rightPercent = Math.ceil(_this.rightPercent);
						} else {
							_this.leftPercent = Math.ceil(_this.leftPercent);
							_this.rightPercent = Math.floor(_this.rightPercent);
						}

						_this.totalPercent = _this.leftPercent + _this.rightPercent;
						if (_this.totalPercent > 100) {
							if (_this.leftPercent > _this.rightPercent) {
								_this.rightPercent = 100 - _this.leftPercent;
							} else {
								_this.leftPercent = 100 - _this.rightPercent;
							}
						}

						_this.graphLeft = jQuery('.jq_voice_graph_left');
						_this.graphRight = jQuery('.jq_voice_graph_right');

						_this.graphLeft.css('width', _this.leftPercent + '%').attr('data-val', _this.leftPercent);
						_this.graphRight.css('width', _this.rightPercent + '%').attr('data-val', _this.rightPercent);

						_this.barGraph = jQuery('.jq_voice_graph_bar');
						_this.barGraph.css('left', _this.leftPercent + '%');
						_this.barGraph.attr('data-val', _this.leftPercent);
						/* 2016-02-12 수정_01 [s] 앱 접근성 개선 */
						_this.barGraph.attr("title", "음성통화 총 사용량 선택바 SKT간 음성 사용량 " + _this.leftPercent + "%, SKT외 음성사용량 " + _this.rightPercent + "%");
						/* 2016-02-12 수정_01 [e] 앱 접근성 개선 */

						// 망내, 망외 음성 그래프 영역 text 적용
						if (_this.totalValue > 0) {
							_this.graphLeftHtml = _this.leftPercent > 0 ? obj.comma(_this.inValue) : '0';
							jQuery('.jq_voice_graph_left_txt').html(_this.graphLeftHtml + '분');

							_this.graphRightHtml = _this.rightPercent > 0 ? obj.comma(_this.outValue) : '0';
							jQuery('.jq_voice_graph_right_txt').html(_this.graphRightHtml + '분');
						} else {
							jQuery('.jq_voice_graph_left_txt').html('0분');
							jQuery('.jq_voice_graph_right_txt').html('0분');
						}

						_this.graphLeftWidth = parseInt(_this.graphLeft.width(), 10);
						_this.graphRightWidth = parseInt(_this.graphRight.width(), 10);

						_this.graphLeftTxt = jQuery('.jq_voice_graph_left_txt');
						_this.graphLeftTxtWidth = parseInt(_this.graphLeftTxt.width(), 10);

						_this.graphRightTxt = jQuery('.jq_voice_graph_right_txt');
						_this.graphRightTxtWidth = parseInt(_this.graphRightTxt.width(), 10);

						// 망내음성 영역 width 가 작을경우 왼쪽에 텍스트 노출
						if (_this.graphLeftWidth < _this.graphLeftTxtWidth - 20) {
							_this.graphLeftTxt.css({
								'left' : '-35px',
								'color' : '#666'
							});
							/*
							 * if( _this.leftPercent > 0 ) {
							 * _this.graphLeftTxt.css('left', '-24px'); } else {
							 * _this.graphLeftTxt.css({'left':'-35px','color':'#666'}); }
							 */

						} else {
							_this.graphLeftTxt.removeAttr('style');
						}

						// 망외음성 영역 width 가 작을경우 오른쪽에 텍스트 노출
						if (_this.graphRightWidth < _this.graphRightTxtWidth - 15) {
							_this.graphRightTxt.css({
								'left' : '25px',
								'white-space' : 'nowrap',
								'color' : '#666'
							});
						} else {
							_this.graphRightTxt.removeAttr('style');
						}

						// 사용량 입력 필드 콤마 넣기
						obj.commaInit(jQuery('.jq_voice'));

						if (jQuery('.jq_voice_graph_bar').size() > 0) {
							_this.barExec = jQuery('.jq_voice_graph_bar').attr('data-execute');

							if (_this.barExec != 'Y') {
								jQuery('.jq_voice_graph_bar').attr('data-execute', 'Y');
								jQuery('.jq_voice').removeAttr('disabled');
							}
						}
					} else {
						// 사용량 입력 필드 콤마 넣기
						obj.commaInit(jQuery('.jq_voice'));
					}
				}
			};

			obj.voiceGraphMove = function(getObj, event) {
				if (getObj) {
					var _this = {};
					_this.graphBar = getObj;
					_this.graphBarWidth = parseInt(_this.graphBar.width(), 10);
					_this.graphBarWidth = Math.ceil(_this.graphBarWidth / 2);
					_this.mouseDown = _this.graphBar.attr('data-mousedown');
					if (_this.mouseDown == 'Y' && jQuery('.jq_voice_graph_parent').size() > 0) {
						clearInterval(obj.setVoiceObj);

						_this.parentObj = jQuery('.jq_voice_graph_parent');
						_this.parentWidth = parseInt(_this.parentObj.width(), 10);
						_this.parentOffset = _this.parentObj.offset();
						_this.parentLeft = parseInt(_this.parentOffset.left, 10);
						_this.parentRight = _this.parentLeft + _this.parentWidth;

						_this.mouseLeft = parseInt(event.pageX, 10);

						_this.graphBarLeft = _this.mouseLeft - _this.parentLeft;

						if (_this.graphBarLeft > 0 && _this.graphBarLeft < (_this.parentWidth + _this.graphBarWidth)) {
							_this.graphBarLeft = (_this.graphBarLeft / _this.parentWidth) * 100;
							_this.graphBarLeft = Math.floor(_this.graphBarLeft);
							_this.graphBarLeft = _this.graphBarLeft > 100 ? 100 : _this.graphBarLeft;

							_this.excute = 'Y';

							_this.graphBarLeftOrg = _this.graphBar.attr('orgleft');
							if (_this.graphBarLeftOrg) {
								_this.graphBarLeftOrg = parseInt(_this.graphBarLeftOrg, 10);
								if (_this.graphBarLeftOrg == _this.graphBarLeft) {
									_this.excute = 'N';
								}
							}

							if (_this.excute == 'Y') {
								_this.graphBar.css('left', _this.graphBarLeft + '%').attr('orgleft', _this.graphBarLeft);
								/* 2016-02-12 수정_02 [s] 앱 접근성 개선 */
								_this.graphBar.attr("title", "음성통화 총 사용량 선택바 SKT간 음성 사용량 " + _this.graphBarLeft + "%, SKT외 음성사용량 " + (100 - _this.graphBarLeft) + "%");
								/* 2016-02-12 수정_02 [e] 앱 접근성 개선 */
								_this.voiceTotalUsed = jQuery('input[name="fee_voiceTotalUsed"]');
								_this.totalValue = _this.voiceTotalUsed.val();
								try {
									_this.totalValue = _this.totalValue.replace(',', '');
								} catch (e) {
								}

								_this.totalValue = parseInt(_this.totalValue, 10);
								_this.inValuePercent = _this.graphBarLeft;
								_this.outValuePercent = 100 - _this.inValuePercent;

								_this.inValue = Math.round(_this.totalValue * (_this.inValuePercent / 100));
								_this.outValue = Math.round(_this.totalValue * (_this.outValuePercent / 100));

								_this.plusValue = _this.inValue + _this.outValue;
								if (_this.totalValue < _this.plusValue) {
									if (_this.inValue > _this.outValue) {
										_this.inValue = _this.totalValue - _this.outValue;
									} else {
										_this.outValue = _this.totalValue - _this.inValue;
									}
								}

								jQuery('input[name="fee_voiceInUsed"]').val(_this.inValue);
								jQuery('input[name="fee_voiceOutUsed"]').val(_this.outValue);

								obj.setVoiceFunc();
							}
						}
					}
				}
			};

			obj.setVoiceDestory = function() {
				var _this = {};
				_this.self = jQuery('.jq_voice_graph_bar');
				_this.excute = _this.self.attr('data-execute');

				if (_this.excute == 'Y') {
					clearInterval(obj.setVoiceObj);

					_this.self.attr('data-mousedown', 'N');
					jQuery(document).unbind('mousemove', 'dragstart', 'mouseup');

					obj.setVoiceObj = setInterval(function() {
						obj.setVoiceFunc();
					}, obj.setDealy);
				}
				_this = null;
			};

			obj.setDataFunc = function() {
				var _this = {};
				_this.dataUsed = jQuery('input[name="fee_dataUsed"]');
				_this.dataValue = _this.dataUsed.val();
				if (!_this.dataValue) {
					return false;
				} // 데이터가 없는경우

				try {
					_this.dataValue = _this.dataValue.replace(/,/g, '');
				} catch (e) {
				}
				if (isNaN(_this.dataValue)) {
					return false;
				} // 숫자가 아닌경우
				_this.dataValue = parseFloat(_this.dataValue);

				if (_this.dataValue > obj.maxData) {
					return false;
				} // MAX 데이터 사용량 보다 클 경우

				// 소수점 2 자리이하 자르기
				if (_this.dataValue > 0) {
					_this.dataValue = obj.toFixedOf(_this.dataValue);
					_this.dataValue = parseFloat(_this.dataValue);
				}

				_this.excute = 'N';
				_this.dataValueOrg = _this.dataUsed.attr('data-setvalue');

				if (_this.dataValueOrg) {
					_this.dataValueOrg = parseFloat(_this.dataValueOrg);

					if (_this.dataValueOrg != _this.dataValue) {
						_this.excute = 'Y';
					}
				} else {
					_this.excute = 'Y';
				}

				if (_this.excute == 'Y') {
					jQuery('.jq_data_graph_bar').draggable();
					_this.dataUsed.attr('data-orgvalue', _this.dataValue);
					_this.dataUsed.attr('data-setvalue', _this.dataValue);

					if (_this.dataValue > 0) {
						_this.inputValue = obj.comma(_this.dataValue);
					} else {
						_this.inputValue = 0;
					}

					_this.gigaByte = 1 * 20;
					_this.percent = (_this.dataValue / _this.gigaByte) * 100;
					_this.percent = _this.percent.toFixed(2);
					_this.percent = Math.ceil(_this.percent);

					_this.percent = _this.percent > 100 ? 100 : _this.percent;

					_this.graph = jQuery('.jq_data_graph');
					_this.graph.css('width', _this.percent + '%');
					_this.graph.attr('data-val', _this.percent);

					_this.barGraph = jQuery('.jq_data_graph_bar');
					_this.barGraph.css('left', _this.percent + '%');
					_this.barGraph.attr('data-val', _this.percent);
					/* 2016-02-12 수정_03 [s] 앱 접근성 개선 */
					_this.barGraph.attr("title", "데이터 사용량 선택바 데이터 사용량 " + _this.dataValue + "GB");
					/* 2016-02-12 수정_03 [e] 앱 접근성 개선 */

					_this.graphWidth = parseInt(_this.graph.width(), 10);

					_this.graphTxt = jQuery('.jq_data_graph_txt');
					_this.graphTxtWidth = parseInt(_this.graphTxt.width(), 10);

					// @데이터 사용량 영역 width 가 작을경우 왼쪽에 텍스트 노출
					if (_this.graphWidth < (_this.graphTxtWidth + (_this.barGraph
							.width() / 2))) {
						_this.graphTxt.css({
							'left' : '-35px',
							'color' : '#666666'
						});
					} else {
						_this.graphTxt.removeAttr('style');
					}

					if (_this.percent > 0) {
						_this.graphTxt.html(obj.comma(_this.dataValue) + 'GB');
						// _this.graphTxt.html( obj.comma( parseInt(
						// _this.dataValue, 10 ) ) + 'GB' ); 소수점제거
					} else {
						_this.graphTxt.html('0GB');
					}
					_this.dataUsed.val(_this.inputValue);

					if (jQuery('.jq_data_graph_bar').size() > 0) {
						_this.barExec = jQuery('.jq_data_graph_bar').attr('data-execute');
						if (_this.barExec != 'Y') {
							jQuery('.jq_data_graph_bar').attr('data-execute', 'Y');
							jQuery('.jq_data').removeAttr('disabled');
						}
					}
				} else {
					obj.commaInit(jQuery('.jq_data'), 'float');
				}
			};

			obj.dataGraphMove = function(getObj, event) {
				if (getObj) {
					var _this = {};
					_this.graphBar = getObj;
					_this.graphBarWidth = parseInt(_this.graphBar.width(), 10);
					_this.graphBarWidth = Math.ceil(_this.graphBarWidth / 2);
					_this.mouseDown = _this.graphBar.attr('data-mousedown');

					if (_this.mouseDown == 'Y' && jQuery('.jq_data_graph_parent').size() > 0) {
						clearInterval(obj.setDataObj);

						_this.parentObj = jQuery('.jq_data_graph_parent');
						_this.parentWidth = parseInt(_this.parentObj.width(), 10);
						_this.parentOffset = _this.parentObj.offset();
						_this.parentLeft = parseInt(_this.parentOffset.left, 10);
						_this.parentRight = _this.parentLeft + _this.parentWidth;

						_this.mouseLeft = parseInt(event.pageX, 10);

						_this.graphBarLeft = _this.mouseLeft - _this.parentLeft;

						if (_this.graphBarLeft > 0 && _this.graphBarLeft < (_this.parentWidth + _this.graphBarWidth)) {
							_this.graphBarLeft = (_this.graphBarLeft / _this.parentWidth) * 100;
							_this.graphBarLeft = Math.floor(_this.graphBarLeft);
							_this.graphBarLeft = _this.graphBarLeft > 100 ? 100 : _this.graphBarLeft;

							_this.excute = 'Y';

							_this.graphBarLeftOrg = _this.graphBar.attr('orgleft');
							if (_this.graphBarLeftOrg) {
								_this.graphBarLeftOrg = parseInt(_this.graphBarLeftOrg, 10);
								if (_this.graphBarLeftOrg == _this.graphBarLeft) {
									_this.excute = 'N';
								}
							}

							if (_this.excute == 'Y') {
								_this.graphBar.css('left', _this.graphBarLeft + '%').attr('orgleft', _this.graphBarLeft);

								_this.dataObj = jQuery('input[name="fee_dataUsed"]');
								_this.dataValue = _this.dataObj.val();
								try {
									_this.dataValue = _this.dataValue.replace(/,/g, '');
								} catch (e) {
								}

								_this.gigaByte = 1 * 20;
								_this.dataValue = parseFloat(_this.dataValue, 10);

								_this.dataValuePercent = _this.graphBarLeft;

								_this.dataValue = _this.gigaByte * (_this.dataValuePercent / 100);

								_this.dataValueTxt = _this.dataValue.toString();
								_this.decimalResult = 'N';
								if (_this.dataValueTxt && _this.dataValueTxt.indexOf('.') != -1) {
									_this.decimalResult = 'Y';
								}
								if (_this.decimalResult == 'Y') {
									_this.dataValue = _this.dataValue.toFixed(2);
								}

								_this.dataValue = parseFloat(_this.dataValue, 10);
								jQuery('input[name="fee_dataUsed"]').val(_this.dataValue);
								/* 2016-02-12 수정_04 [s] 앱 접근성 개선 */
								_this.graphBar.attr("title", "데이터 사용량 선택바 데이터 사용량 " + _this.dataValue + "GB");
								/* 2016-02-12 수정_04 [e] 앱 접근성 개선 */
								obj.setDataFunc();
							}
						}
					}
				}
			};

			obj.setDataDestory = function() {
				var _this = {};
				_this.self = jQuery('.jq_data_graph_bar');
				_this.excute = _this.self.attr('data-execute');

				if (_this.excute == 'Y') {
					clearInterval(obj.setDataObj);

					_this.self.attr('data-mousedown', 'N');
					jQuery(document).unbind('mousemove', 'dragstart', 'mouseup');

					obj.setDataObj = setInterval(function() {
						obj.setDataFunc();
					}, obj.setDealy);
				}
				_this = null;
			};

			obj.toFixedOf = function(getValue) {
				if (getValue) {
					getValue = getValue.toString();
					if (getValue.indexOf('.') != -1) {
						getValue = getValue.substring(0, getValue.indexOf('.') + 3);
					}
					return parseFloat(getValue);
				} else {
					return false;
				}
			};
			obj.toFixedOf0 = function(getValue) {
				if (getValue) {
					getValue = getValue.toString();
					if (getValue.indexOf('.') != -1) {
						getValue = getValue.substring(0, getValue.indexOf('.'));
					}
					return parseFloat(getValue);
				} else {
					return false;
				}
			};

			obj.comma = function(getValue) {
				if (getValue) {
					var reg = /(^[+-]?\d+)(\d{3})/;
					getValue += '';

					while (reg.test(getValue)) {
						getValue = getValue.replace(reg, '$1' + ',' + '$2');
					}

					return getValue;
				} else {
					return false;
				}
			};

			obj.commaInit = function(getObj, numType) {
				if (getObj) {
					getObj.each(function() {
						var _focus = jQuery(this).attr('data-focus');

						if (_focus != 'Y') {
							var _value = jQuery(this).val();
							if (_value) {
								if (numType == 'float') {
									_value = parseFloat(_value.replace(/,/g, ''), 10);
									_value = obj.toFixedOf(_value);
								} else {
									_value = parseInt(_value.replace(/,/g, ''), 10);
								}
								_value = _value > 0 ? obj.comma(_value) : '0';
								jQuery(this).val(_value);
							}
							_value = null;
						}
						_focus = null;
					});
				}
			};

			obj.focusAtLast = function(getObj) {
				var _this = {};
				_this.target = getObj.get(0);

				if (_this.target != null && _this.target.value.length != 0) {
					if (_this.target.createTextRange) {
						_this.fieldRange = _this.target.createTextRange();
						_this.fieldRange.moveStart('character', _this.target.value.length);
						_this.fieldRange.collapse();
						_this.fieldRange.select();
					} else if (_this.target.selectionStart || _this.target.selectionStart == '0') {
						_this.targetLength = _this.target.value.length;
						_this.target.selectionStart = _this.targetLength;
						_this.target.selectionEnd = _this.targetLength;
						_this.target.focus();
					}
				} else {
					_this.target.focus();
				}
			};

			obj.loginResultFunc = function() {
				var _btnInit = function() {
					// jQuery('.jq_cpType').filter('[data-value="L"]').trigger('click');
					// jQuery('.jq_tingResult').filter('[data-value="N"]').trigger('click');
					// jQuery('.jq_disProg_1').filter('[data-value="N"]').trigger('click');
					// jQuery('.jq_welfareResult').filter('[data-value="N"]').trigger('click');
				};

				if (obj.setLoginCnt < obj.setLoginLimit) {
					var _this = {};
					obj.loginResult = '';
					_this.result = 'N';
					_this.loginArea = jQuery('.mytNavi_login');

					try {
						if (_this.loginArea.find('.btn_login').size() > 0) { // JSP
							obj.loginResult = 'N';
						} else {
							if (_this.loginArea.find('>iframe').size() > 0) { // IFRAME
								if (_this.loginArea.find('>iframe').contents().find('.btn_login').size() > 0) { // #비로그인
									obj.loginResult = 'N';
								} else {
									if (_this.loginArea.find('>iframe').contents().find('.login_name').size() > 0) { // #로그인
										obj.loginResult = 'Y';
										obj.loginType = 'iframe';

										// 로그인시에 초기값 세팅으로 인한 dimed 레이어 제거
										// jQuery('#dimedLayer').unbind('click').remove();

										// 입력필드 버튼들 개발 defaultPattern() 함수와 동기화
										_btnInit();
									}
								}
							} else {
								if (_this.loginArea.find('.login_name').size() > 0) {
									obj.loginResult = 'Y';
									obj.loginType = 'main';

									// 로그인시에 초기값 세팅으로 인한 dimed 레이어 제거
									// jQuery('#dimedLayer').unbind('click').remove();

									// 입력필드 버튼들 개발 defaultPattern() 함수와 동기화
									_btnInit();
								}
							}
						}
						/*
						 * if( obj.loginResult && obj.loginResult == 'N' ) {
						 * _Product.findFeeSystemDimed( function() {
						 * jQuery('#dimedLayer').unbind().bind({ click :
						 * function( event ) { var _loginResult =
						 * jQuery('#jq_loginResult').attr('data-result'); var
						 * _loginType =
						 * jQuery('#jq_loginResult').attr('data-type');
						 * 
						 * if( _loginResult != 'Y' ) { if( confirm('로그인 하신 후 이용이
						 * 가능합니다. 로그인 하시겠습니까?') ) { try{ if( u1_2_5 ) { var
						 * _tmpArr = u1_2_5.split('$'); var _tmpCnt = parseInt(
						 * _tmpArr.length, 10 ); var _returnUrl =
						 * _tmpArr[_tmpCnt-1];
						 * 
						 * if( _returnUrl ) { var _url =
						 * '/twd/common/loginout/view/login_page.jsp?returnURL=' +
						 * encodeURIComponent( _returnUrl ); location.href =
						 * _url; _url=null; } _tmpArr=null; _tmpCnt=null;
						 * _returnUrl=null; }
						 *  } catch(e) {
						 * //console.log('/twd/inc/js/cmn/common_twd.js 연동 실패'); } } } }
						 * }); }, 'Y'); }
						 */
					} catch (e) {
						// console.log('ACCESS DENIED');
					}

					if (!obj.loginResult) {
						obj.setLoginCnt++;
						obj.setLoginObj = setTimeout(function() {
							obj.loginResultFunc();
						}, obj.setLoginDealy);
					} else {
						jQuery('body').append('<div id="jq_loginResult" style="display:none;" data-result="' + obj.loginResult + '" data-type="' + obj.loginType + '">&nbsp;</div>');
						clearTimeout(obj.setLoginObj);
						// obj.selectedResult();
					}
				} else {
					clearTimeout(obj.setLoginObj);
					// obj.selectedResult();
				}
			};

			obj.setLoginObj = setTimeout(function() {
				obj.loginResultFunc();
			}, obj.setLoginDealy);

			// 음성통화 총 사용량
			if (jQuery('.jq_voice').size() > 0) {
				jQuery('.jq_voice').attr('data-orgvalue', '');
				jQuery('.jq_voice').attr('data-setvalue', '');
				jQuery('.jq_voice').bind({
					focusin : function(event) {
						clearInterval(obj.setVoiceObj);

						jQuery(this).attr('data-focus', 'Y');

						var _this = {};
						_this.target = jQuery(this);
						_this.value = _this.target.val();
						if (!_this.value) {
							_this.target.attr('data-orgvalue', '');
							return false;
						}
						_this.value = _this.value.replace(/,/g, '');

						jQuery(this).val(_this.value);

						setTimeout(function() {
							obj.focusAtLast(_this.target);
						}, 1);
					},
					focusout : function(event) {
						jQuery(this).attr('data-focus', 'N');

						var _this = {};
						_this.target = jQuery(this);
						_this.value = _this.target.val();
						if (!_this.value) {
							_this.target.attr('data-orgvalue', '');
							return false;
						}
						_this.value = _this.value.replace(/,/g, '');

						if (isNaN(_this.value)) {
							alert('숫자만 입력할 수 있습니다.');
							_this.target.val(_this.target.attr('data-orgvalue'));
							setTimeout(function() {
								_this.target.focus();
							}, 1);
						} else {
							_this.value = parseInt(_this.value, 10);
							if (_this.value > obj.maxVoice) {
								alert(obj.maxVoice + '이하만 입력할 수 있습니다.');
								_this.target.val(_this.target.attr('data-orgvalue'));
								setTimeout(function() {
									obj.focusAtLast(_this.target);
								}, 1);
							} else {
								_this.voiceInit = 'N';
								_this.voiceType = '';

								if (_this.target.hasClass('jq_voice_total')) {
									_this.voiceType = 'total';
								} else if (_this.target.hasClass('jq_voice_in')) {
									_this.voiceType = 'in';
								} else if (_this.target.hasClass('jq_voice_out')) {
									_this.voiceType = 'out';
								}

								if (!_this.voiceType) {
									return false;
								} // wrong access

								if (_this.voiceType == 'total') {
									if (_this.target.attr('data-orgvalue')) {
										_this.orgValue = parseInt(_this.target.attr('data-orgvalue'), 10);
										if (_this.orgValue != parseInt(_this.value)) {
											_this.voiceInit = 'Y';
										}
									} else {
										_this.voiceInit = 'Y';
									}
								}

								_this.target.val(_this.value);
								_this.target.attr('data-orgvalue', _this.value);

								setTimeout(function() {
									var _tmpMouse = jQuery('.jq_voice_graph_bar').attr('data-mousedown');
									if (_tmpMouse == 'Y') {
										var _tmpValue = _this.target.attr('data-setvalue');
										if (_tmpValue) {
											_this.target.val(_tmpValue);
										}
										_tmpValue = null;
									} else {
										var param = {};
										param.type = 'change';
										param.init = _this.voiceInit;
										param.voiceType = _this.voiceType;

										obj.setVoiceFunc(param);
										param = null;
									}
									_tmpMouse = null;
								}, 1);
							}
						}
					}
				});

				obj.setVoiceObj = setInterval(function() {
					obj.setVoiceFunc();
				}, obj.setDealy);

				// 음성통화량 그래프 마우스 제어
				if (jQuery('.jq_voice_graph_bar').size() > 0) {
					obj.voice_graph_bar = jQuery('.jq_voice_graph_bar');
					obj.voice_graph_bar.attr('data-execute', 'Y');
					obj.voice_graph_bar.attr('data-mousedown', 'N');

					obj.voice_graph_bar.bind({
						click : function(event) {
							event.preventDefault();
						},
						mousedown : function(event) {
							if (event.which && event.which == 1) {
								// 음성통화 input 객체 focusout 시키기
								jQuery('.jq_voice').each(function(idx) {
									if (jQuery(this).is(':focus')) {
										setTimeout(function() {
											jQuery('.jq_voice:eq(' + idx + ')').blur();
										}, 1);
									}
								});

								jQuery('.jq_voice').attr('data-focus', 'N');

								var _this = {};
								_this.excute = jQuery(this).attr('data-execute');

								if (_this.excute == 'Y') {
									event.preventDefault();

									_this.self = jQuery(this);
									jQuery(this).attr('data-mousedown', 'Y');
									jQuery(this).attr('data-mouseLeft', event.pageX);

									jQuery(document).bind({
										mousemove : function(event) {
											var _totalValue = jQuery('input[name="fee_voiceTotalUsed"]').attr('data-setvalue');
											// console.log(jQuery('input[name="fee_voiceTotalUsed"]'));
											if (!isNaN(_totalValue)) {
												_totalValue = parseInt(_totalValue, 10);
												if (_totalValue > 0) {
													obj.voiceGraphMove(_this.self, event);
												}
											}
										},
										dragstart : function(
												event) {
											return false;
										},
										mouseup : function(event) {
											// alert("mouseup");
											if (event.which && event.which == 1) {
												obj.setVoiceDestory();
											}
										}
									});
								}

								// 데이터 사용량 focus 빼기
								setTimeout(function() {
									jQuery('.jq_data').blur();
								}, 1);
							}
							return false;
						},
						mouseup : function(event) {
							if (event.which && event.which == 1) {
								obj.setVoiceDestory();
							}
						},
						focusin : function(event) {
							event.preventDefault();

							// setTimeout( function() {
							// if(
							// jQuery('.jq_voice_graph_bar').attr('data-mousedown')
							// != 'Y' ) {
							// jQuery('input[name="fee_dataUsed"]').focus();
							// }
							// }, 1 );
						}
					});
				}
			}
			// 데이터 사용량
			if (jQuery('.jq_data').size() > 0) {
				jQuery('.jq_data').attr('data-orgvalue', '');
				jQuery('.jq_data').attr('data-setvalue', '');
				jQuery('.jq_data').bind({
					focusin : function(event) {
						clearInterval(obj.setDataObj);

						jQuery(this).attr('data-focus', 'Y');

						var _this = {};
						_this.target = jQuery(this);
						_this.value = _this.target.val();
						if (!_this.value) {
							_this.target.attr('data-orgvalue',
									'');
							return false;
						}
						_this.value = _this.value.replace(/,/g, '');
						_this.target.val(_this.value);

						setTimeout(function() {
							obj.focusAtLast(_this.target);
						}, 1);
					},
					focusout : function(event) {
						jQuery(this).attr('data-focus', 'N');

						var _this = jQuery(this);
						var _value = _this.val();
						if (!_value) {
							_this.attr('data-orgvalue', '');
							return false;
						}
						_value = _value.replace(/,/g, '');

						if (isNaN(_value)) {
							alert('숫자만 입력할 수 있습니다.');
							_this.val(_this.attr('data-orgvalue'));
							setTimeout(function() {
								_this.focus();
							}, 1);
						} else {
							if (_value > obj.maxData) {
								alert(obj.maxData + 'GB 이하만 입력할 수 있습니다.');
								_this.val(_this.attr('data-orgvalue'));
								setTimeout(function() {
									_this.focus();
								}, 1);
							} else {
								/*
								 * // 소수점 2 자리이하 자르기 _value =
								 * obj.toFixedOf0( _value );
								 */
								// 소수점 1 자리 이하 자르기
								_value = parseFloat(_value);
								_value = _value.toFixed(1); // 123.1

								_this.val(_value);
								_this.attr('data-orgvalue', _value);

								obj.setDataObj = setInterval(function() {
									obj.setDataFunc();
								}, obj.setDealy);
							}
						}
					},
					keydown : function(event) {
						var keycode = String((event.keyCode ? event.keyCode : event.which));
						if (keycode == '9' && event.shiftKey) {
							event.preventDefault();

							setTimeout(function() {
								jQuery('input[name="fee_voiceOutUsed"]').focus();
							}, 1);
						}
						keycode = null;
					}
				});

				obj.setDataObj = setInterval(function() {
					obj.setDataFunc();
				}, obj.setDealy);

				// 데이터 사용량 그래프 마우스 제어
				if (jQuery('.jq_data_graph_bar').size() > 0) {
					obj.data_graph_bar = jQuery('.jq_data_graph_bar');
					obj.data_graph_bar.attr('data-execute', 'N');
					obj.data_graph_bar.attr('data-mousedown', 'N');

					obj.data_graph_bar.bind({click : function(event) {
							event.preventDefault();
						},
						mousedown : function(event) {
							if (event.which && event.which == 1) {
								// 데이터 사용량 input 객체 focusout 시키기
								jQuery('.jq_data').each(function(idx) {
									if (jQuery(this).is(':focus')) {
										setTimeout(function() {
											jQuery('.jq_data:eq(' + idx + ')').blur();
										}, 1);
									}
								});
	
								jQuery('.jq_data').attr('data-focus', 'N');
	
								var _this = {};
								_this.excute = jQuery(this).attr('data-execute');
	
								if (_this.excute == 'Y') {
									event.preventDefault();
	
									_this.self = jQuery(this);
									jQuery(this).attr('data-mousedown', 'Y');
									jQuery(this).attr('data-mouseLeft', event.pageX);
	
									jQuery(document).bind({
										mousemove : function(event) {
											obj.dataGraphMove(_this.self, event);
										},
										dragstart : function(event) {
											return false;
										},
										mouseup : function(
												event) {
											if (event.which && event.which == 1) {
												obj.setDataDestory();
											}
										}
									});
								}
	
								// 음성 사용량 focus 빼기
								setTimeout(function() {
									jQuery('.jq_voice').blur();
								}, 1);
							}
							return false;
						},
						mouseup : function(event) {
							if (event.which && event.which == 1) {
								obj.setDataDestory();
							}
						},
						focusin : function(event) {
							event.preventDefault();
	
							setTimeout(function() {
								if (jQuery('.jq_data_graph_bar').attr(
										'data-mousedown') != 'Y') {
									jQuery('.jq_cpType:eq(0)').focus();
								}
							}, 1);
						}
					});
				}
			}
		},

		endFunction : function() {
		},

	};
})(window);

jQuery(function() {

});

var isBtnClick = false;
$(document).ready(function() {
	_Product.findFeeSystem();
	/* 2016-03-07 추가 : 스크롤바 앱 접근성을 위한 좌우 버튼 추가에 따른 이벤트 설정 */
	$("#btn_plan_left").click(function(e) {
		e.preventDefault();
		$(this).hide();
		$("#btn_plan_left_dummy").css("display", 'block');
		voiceBarMove(0, this, "#btn_plan_left_dummy");
	});

	var bpRC = 0;
	$("#btn_plan_right").click(function(e) {
		e.preventDefault();
		$(this).hide();
		$("#btn_plan_right_dummy").css("display", 'block');
		voiceBarMove(1, this, "#btn_plan_right_dummy");
	});

	$("#btn_data_left").click(function(e) {
		e.preventDefault();
		// $(this).unbind('click');
		$(this).hide();
		$("#btn_data_left_dummy").css("display", 'block');
		dataBarMove(0, this, "#btn_data_left_dummy");
	});
	$("#btn_data_right").click(function(e) {
		e.preventDefault();
		$(this).hide();
		$("btn_data_right_dummy").css("display", 'block');
		dataBarMove(1, this, "#btn_data_right_dummy");
	});
	/* 2016-03-07 추가 : 스크롤바 앱 접근성을 위한 좌우 버튼 추가에 따른 이벤트 설정 */

});
/* 2016-03-07 추가 : 스크롤바 앱 접근성을 위한 좌우 버튼 추가에 따른 이벤트 설정 */

var diffValue = 1;
function voiceBarMove(opt, objBtn, objDummy) {
	var inValue = parseInt(jQuery('input[name="fee_voiceInUsed"]').val());
	var outValue = parseInt(jQuery('input[name="fee_voiceOutUsed"]').val());
	var chValue = diffValue;
	switch (opt) {
	case 0: // click left button
		if (chValue > inValue) {
			chValue = inValue;
		}
		inValue = inValue - chValue;
		outValue = outValue + chValue;
		break;
	case 1: // click right button
		if (chValue > outValue) {
			chValue = outValue;
		}
		inValue = inValue + chValue;
		outValue = outValue - chValue;
		break;
	}
	$("#btn_plan_left").attr("title", "SKT간 음성 사용량 1분 줄이고 SKT외 음성 사용량 1분씩 늘이기 " + "현재, SKT간 음성 사용량 " + inValue + "분, SKT외 음성 사용량" + outValue + "분");
	$("#btn_plan_right").attr("title", "SKT외 음성 사용량 1분 줄이고  SKT 음성 사용량 1분씩 늘이기 " + "현재, SKT간 음성 사용량 " + inValue + "분, SKT외 음성 사용량" + outValue + "분");
	jQuery('input[name="fee_voiceInUsed"]').val(inValue);
	jQuery('input[name="fee_voiceOutUsed"]').val(outValue);
	$('input[name="fee_voiceInUsed"]').trigger('focusout');
	setTimeout(function() {
		$(objDummy).css("display", 'none');
		$(objBtn).show();
	}, 1);
}

function dataBarMove(opt, objBtn, objDummy) {
	var dataValue = parseFloat(jQuery('input[name="fee_dataUsed"]').val());
	var chValue = 0;
	switch (opt) {
	case 0: // click left button
		chValue = dataValue - 0.1;
		if (chValue < 0) {
			chValue = 0;
		}
		break;
	case 1: // click right button
		chValue = dataValue + 0.1;
		if (chValue > 20) {
			chValue = 20;
		}
		break;
	}
	chValue = chValue.toFixed(1);
	$("#btn_data_left").attr("title", "데이터 사용량 1GB씩 줄이기" + "현재, 데이터 사용량" + chValue + "GB");
	$("#btn_data_right").attr("title", "데이터 사용량 1GB씩 늘이기" + "현재, 데이터 사용량" + chValue + "GB");
	jQuery('input[name="fee_dataUsed"]').val(chValue);
	$('input[name="fee_dataUsed"]').trigger('focusout');
	setTimeout(function() {
		$(objDummy).css("display", 'none');
		$(objBtn).show();
	}, 1);
}
/* 2016-03-07 추가 : 스크롤바 앱 접근성을 위한 좌우 버튼 추가에 따른 이벤트 설정 */
