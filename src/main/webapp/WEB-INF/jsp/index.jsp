<%@ page language="java" contentType="text/html; charset=EUC-KR" session="false" %>
<%@ page import="java.util.HashMap"%>
<%
	Boolean isLogin = request.getAttribute("isLogin") != null ? (Boolean) request.getAttribute("isLogin") : false;
%>
<!doctype html>
<html lang="ko">
<head>
<meta charset="euc-kr" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8;" />
<meta http-equiv="Cache-Control" content="no-cache" />
<meta name="format-detection" content="telephone=no">
<meta id="viewport" name="viewport" content="user-scalable=yes, initial-scale=1.0, width=device-width">
<title>Home | T world</title>
<link rel="stylesheet" type="text/css" href="/inc/css/new_layout.css" />
<link rel="stylesheet" type="text/css" href="/inc/css/new_main.css">
<link rel="stylesheet" type="text/css" href="/inc/css/mtworld.swipe.css">
<link rel="stylesheet" type="text/css" href="/inc/css/tworld_spinner.css" />
<script type="text/javascript" src="/inc/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/inc/js/common.js"></script>
<script type="text/javascript" src="/inc/js/mytworld.js"></script>
<script type="text/javascript" src="/inc/js/index.js"></script>

<!-- 바코드 생성 -->
<link rel=stylesheet type=text/css href="/barcode/code128.css">
<script type=text/javascript src="/barcode/base2-jsb-fp.js"></script>
<script type=text/javascript src="/barcode/code128-base2.js"></script>
<script type=text/javascript src="/barcode/get.js"></script>
<script>
	new jsb.Rule(".barcodeTest, .barcodeTest2", base2.Barcode.code128behaviour);
</script>
<!-- 바코드 생성 -->
<script type="text/javascript">
$(document).ready(function(){
    
    var ajaxParam;
    var ajaxUrl
    
    // 다이렉트
    ajaxParam = "reqType=direct";
    ajaxUrl = "/main_banner_ajax";
    ajaxCall(ajaxUrl, ajaxParam, "DIRECT");
    
 	// Hot & New
    ajaxParam = "reqType=hotnew";
    ajaxUrl = "/main_banner_ajax";
    ajaxCall(ajaxUrl, ajaxParam, "HOT&NEW");
    
	// 공지사항
	ajaxParam = "";
    ajaxUrl = "/main_notice_ajax";
    ajaxCall(ajaxUrl, ajaxParam, "NOTICE");
    
	// 가이드
	ajaxParam = "";
    ajaxUrl = "/main_guide_ajax";
    ajaxCall(ajaxUrl, ajaxParam, "GUIDE");
    
    <% if(isLogin){ %>
    
		// Main
		ajaxParam = "";
	    ajaxUrl = "/main_ajax";
	    ajaxCall(ajaxUrl, ajaxParam, "MAIN");
    
    	$("#freebillIframe").attr("src","/freebill_main.do");
    
    	$(".bar_login").show();
    	$(".bar_nlogin").hide();

    <% }else{ %>
    
    	$(".bar_login").hide();
    	$(".bar_nlogin").show();
    	
    <% } %>
    
	$('.main_tab > ul > li > .menu_button').on('click', function(){
	
	    var nameId = $(this).attr("id");
	    var nameNm = $(this).text();
		
		//console.log(nameNm + " API 호출");
		//console.log("login : <%= isLogin %>");
	
		// api 호출 성공 여부에 따라 수행
		$(this).addClass('on').attr("title","현재 탭").next('.tab_con').show().parent().siblings().find('.menu_button').removeClass('on').attr("title","").next('.tab_con').hide();
	});
    
	$('#logoutBtn').on('click', function(){
	    
	    if(confirm("로그아웃 하시겠습니까?")){
	    
			$.ajax({
				type: "get",
				data : "",
				dataType: "json",
				url: "/logoutProc",
				success: function(result) {
				    console.log("ajax success : logoutProc");
				    if(result.returnCode == "success"){
					    location.href="/";
				    }else{
					
				    }
				},
				error:function(result){
				    // 서킷브레이커에의해 에러 처리해야하나?
				    console.log("result Error: " + result);
				}
			});
		
	    }
	});
	
	// 로그인 여부에 따라 탭, 정보 처리
	$('#meb2').click();
	
});
</script>
</head>
<body id="main">
	<!-- 2017-03-03 추가_01 [s] -->
	<!-- 접근성 개선 -->
	<div class="floating_banner_dim" style="display: none">
		<div class="floating_banner_wrapper" id="floating_banner">
			<div class="floating_icon floating_show_icon">
				<img src="/img/new_main/btn_floating_offer.png" alt="추천보기" tabindex=0>
			</div>
			<div class="floating_close">
				<img src="/img/new_main/floating_close.png" alt="닫기">
			</div>
			<div class="floating_txt_wrapper"></div>
			<div class="sub_floating_list">
				<ul>
				</ul>
			</div>
			<div class="floating_icon floating_close_icon">
				<img src="/img/new_main/btn_floating_offer_close.png" alt="추천보기닫기">
			</div>
		</div>
	</div>
	<!-- 2017-03-03 추가_01 [e] -->
	<!-- 접근성 개선 -->
	<header id="main_header">
		<h1 id="logoutBtn">
			<img src="/img/new_main/h1_logo.png" alt="mobile T world" width="30" tabindex="1" />
		</h1>
		<div class="m_search">
			<form id="search" name="search" action="/jsp/search/search.jsp?domainVer=m2" method="POST">
				<input type="text" name="query" id="query" title="검색어" autocomplete="off" placeholder="" value="" onkeypress="if(event.keyCode == 13) { doSearch(); return false;}" />
			</form>
			<button id="b_search" class="main_search ico_comm">검색</button>
		</div>
		<button id="all_menu" class="all_menu_btn ico_comm">전체메뉴보기</button>
	</header>
	<section>
		<!-- main_content -->
		<div id="main_content">
			<!-- personal_info -->
			<div id="personal_info">
				<span class="bar_nlogin" style="width:100%">모바일 T world에 오신걸 환영합니다.</span>
				<span class="bar_login" id="mainCustArea">
					<span class='strong' id="mainCustNm"></span>
				</span>
				<span class="bar_login" id="mainSvcNum"></span>
				<span class="bar_login" id="p_Charge"></span>
			</div>
			<div class="main_sub">
				<!-- 멤버십카드 / 잔여기본통화 / 실시간요금-->
				<!-- main_tab -->
				<div class="main_tab">
					<ul>
						<li id="mem_sector">
							<a href="javascript:void(0);" class="menu_button" id="meb1">멤버십</a>
							<div class="tab_con" style='display: block;'>
								<a href="javascript:void(0);" id="zoom" class="mem_con bar_login" title="멤버십 바코드 확대하기">
									<div class="left">
										<span class="txt_desc">잔여 할인한도</span>
										<span class="money_desc" id="meb_sub_limit">97,000</span>
										<ul class="user_box">
											<li>
												등급
												<strong id="meb_sub_gr">골드</strong>
											</li>
											<li>
												카드
												<strong id="meb_sub_type">T멤버십</strong>
											</li>
										</ul>
									</div>
									<div class="right">
										<div class="barcode" id="meb_sub_con">
											<div class="barcodeTest bar4">1234 5678</div>
										</div>
										<span class="num" id="meb_sub_num"></span>
									</div>
									<button class="mag_btn ico_comm" id="zoom" title="멤버십 바코드 확대하기">확대하기</button>
								</a>
								<div class="n_login bar_nlogin">
									<div class='table_b pa'>
										<p class='txt'>
										지금 로그인 하시면<br><span style='color:red;'>멤버십</span>을 바로 조회하실 수 있습니다.
										<div class='n_btn'>
											<a href="javascript:goLogin();" class='btn2' target='_top' title='로그인 바로가기'>로그인</a>
											<a href="javascript:alert('회원가입');" class='btn2' target='_top' title='회원가입 바로가기'>회원가입</a>
										</div>
										</p>
									</div>
								</div>
							</div>
						</li>
						<li id="rem_sector">
							<a href="javascript:void(0);" class="menu_button on" title="현재 탭" id="meb2">잔여기본통화</a>
							<div class="tab_con">
								<div id="rem_con" class="rem_con bar_login">
									<iframe src="" frameborder="0" id="freebillIframe" width="100%" scrolling="no"></iframe>
									<button id="freebillDetailBtn" class="mag_btn ico_comm" style="display: none" onClick="asdf" title="잔여기본통화 바로가기">바로가기</button>
								</div>
								<div class="n_login bar_nlogin">
									<div class='table_b pa'>
										<p class='txt'>
										지금 로그인 하시면<br><span style='color:red;'>잔여기본통화</span>를 바로 조회하실 수 있습니다.
										<div class='n_btn'>
											<a href="javascript:goLogin();" class='btn2' target='_top' title='로그인 바로가기'>로그인</a>
											<a href="javascript:alert('회원가입');" class='btn2' target='_top' title='회원가입 바로가기'>회원가입</a>
										</div>
										</p>
									</div>
								</div>
							</div>
						</li>
						<li id="time_sector">
							<a href="javascript:void(0);" class="menu_button" id="meb3">실시간 요금</a>
							<div class="tab_con">
								<a href="#" class="time_con bar_login" id="time_con" title="실시간 요금 바로가기">
									<p class="year" id="searchTermDate">2017년 03월01일부터 ~ 2017년 03월31일까지</p>
									<p class="charge">
										사용하신 요금은
										<strong>
											<span class="one" id="totOpenBal2">36,438</span>
											<span class="two">원</span>
										</strong>
										입니다.
									</p>
									<button class="mag_btn ico_comm" onClick="alert('실시간 요금 바로가기');" title="실시간 요금 바로가기">바로가기</button>
								</a>
								<div class="n_login bar_nlogin">
									<div class='table_b pa'>
										<p class='txt'>
										지금 로그인 하시면<br><span style='color:red;'>실시간 요금</span>을 바로 조회하실 수 있습니다.
										<div class='n_btn'>
											<a href="javascript:goLogin();" class='btn2' target='_top' title='로그인 바로가기'>로그인</a>
											<a href="javascript:alert('회원가입');" class='btn2' target='_top' title='회원가입 바로가기'>회원가입</a>
										</div>
										</p>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<!-- //main_tab -->
				</div>
			<!-- 띠 배너 -->
			<!-- 2016-12-28 추가_01 [s] -->
			<div class="banner_line_banner"></div>
			<!-- 2016-12-28 추가_01 [e] -->
			<!-- 띠 배너 -->
			<div class="main_menu">
				<ul>
					<li>
						<a href="javascript:alert('my T');">
							<img src="/img/new_main/main_menu01_off.png" alt="my T">
						</a>
					</li>
					<li>
						<a href="javascript:alert('요금조회/납부');">
							<img src="/img/new_main/main_menu02_off.png" alt="요금조회/납부">
						</a>
					</li>
					<li>
						<a href="javascript:alert('충전/선물/리필');">
							<img src="/img/new_main/main_menu03_off.png" alt="충전/선물/리필">
						</a>
					</li>
					<li>
						<a href="javascript:alert('요금제/T Apps/부가서비스');">
							<img src="/img/new_main/main_menu04_off.png" alt="요금제/T Apps/부가서비스">
						</a>
					</li>
					<li>
						<a href="javascript:alert('멤버십');">
							<img src="/img/new_main/main_menu05_off.png" alt="멤버십">
						</a>
					</li>
					<li>
						<a href="javascript:alert('T로밍');">
							<img src="/img/new_main/main_menu06_off.png" alt="T로밍">
						</a>
					</li>
					<li>
						<a href="javascript:alert('혜택안내');">
							<img src="/img/new_main/main_menu07_off.png" alt="혜택안내">
						</a>
					</li>
					<li>
						<a href="javascript:alert('이용안내');">
							<img src="/img/new_main/main_menu08_off.png" alt="이용안내">
						</a>
					</li>
					<li>
						<a href="javascript:alert('인터넷/전화/TV');">
							<img src="/img/new_main/main_menu09_off.png" alt="인터넷/전화/TV">
						</a>
					</li>
					<li>
						<a href="javascript:alert('T 다이렉트, 휴대폰 구매 상담, 1대1 전화상담으로 휴대폰을 빠르고 간편하게 구매하세요.');">
							<img src="/img/new_main/menu_tDirect_off.png" alt="T 다이렉트, 휴대폰 구매 상담, 1대1 전화상담으로 휴대폰을 빠르고 간편하게 구매하세요.">
						</a>
					</li>
				</ul>
			</div>
			<!-- //main_menu -->
			<!-- 2016-05-10 추가_03 [s] -->
			<div id="swiper_banner" class="swiper-container">
				<div id="swiper_banners" class="swiper-wrapper"></div>
				<div class="swiper-guide-wrapper">
					<button class="swiper-button-prev">
						<span class="ico_comm">다음 배너보기</span>
					</button>
					<div class="swiper-pagination">
						<ul></ul>
						<button class="bplay_btn ">배너이미지 일시정지</button>
					</div>
					<button class="swiper-button-next">
						<span class="ico_comm">이전 배너보기</span>
					</button>
				</div>
			</div>
			<!-- 2016-05-10 추가_03 [e] -->
			<!-- 2016-01-04 [s] 수정 -->
			<!-- h_and_n_box -->
			<div class="h_and_n_box">
				<h2 class="mtlth2">
					Hot & New
					<span class="txt">가장 핫하고 새로운 서비스</span>
				</h2>
				<div class="bt_box">
					<div class="left">
						<p class="l_box" id="hotNew_0">
							<img src="" />
						</p>
					</div>
					<div class="right">
						<p class="r_box" id="hotNew_1">
							<img src="" />
						</p>
					</div>
				</div>
			</div>
			<!-- //h_and_n_box -->
			<!-- t_direct_box -->
			<div class="t_direct_box">
				<!-- 2017-03-23 TWD 유입파라미터 추가 [S] -->
				<h2 class="mtlth2">
					<a href="javascript:void(0);" title="새창">
						<img src="/img/new_main/tlt_t_direct.png" width="99" alt="T world Direct">
						<span class="txt">
							신규가입/기기 변경 공식 온라인 쇼핑몰
							<span class="ico_comm"></span>
						</span>
					</a>
				</h2>
				<!-- 2017-03-23 TWD 유입파라미터 추가 [E] -->
				<div class="img_box"style="text-align: center;">
					<div class="left">
						<p id="tdirect_0" class="l_box"></p>
					</div>
					<div class="right">
						<p id="tdirect_1" class="r_box"></p>
					</div>
				</div>
			</div>
			<!-- //t_direct_box -->
			<!-- situation_box -->
			<!-- 2015-12-18 [s] 수정 -->
			<div class="situation_box">
				<h2 class="mtlth2">
					<a href="javascript:void(0);" title="이럴땐 이렇게 하세요 바로가기">
						상황별 대처법
						<span class="txt">
							이럴땐 이렇게 하세요
							<span class="ico_comm"></span>
						</span>
					</a>
				</h2>
				<ul class="like_this_type">
				</ul>
			</div>
			<!-- 2015-12-18 [e] 수정 -->
			<!-- //situation_box -->
			<div class="m_one_banner box_section">
				<iframe src="" id="iframe_banner" width="100%" frameborder="0" scrolling="no" height=0></iframe>
			</div>
			<!-- 2016-08-25 수정_02 [e] --
		<!-- floor_btn -->
			<div class="floor_btn">
				<p class="left">
					<a href="javascript:void(0);" title="T world 매장 찾기 바로가기">
						<img src="/img/new_main/img_floorBtn01.png" alt="티월드 매장찾기">
					</a>
				</p>
				<p class="right">
					<a href="javascript:void(0);" title="자주 찾는 문의 바로가기">
						<img src="/img/new_main/img_floorBtn02.png" alt="자주찾는문의">
					</a>
				</p>
			</div>
			<!-- //floor_btn -->
			<!-- notice -->
			<div id="notice" class="notice">
				<h2>
					<a href="javascript:alert('공지사항');">공지사항</a>
				</h2>
				<ul>
				</ul>
				<button class="go_top ico_comm" onclick="gotop();">맨위로</button>
			</div>
			<!-- //notice -->
		</div>
		<!-- //main_content -->
	</section>
	<!-- //section -->
	<!-- main_footer -->
	<footer id="main_footer">
		<ul class="f_menu">
			<li>
				<a href="javascript:alert('이용약관');" title="이용약관 바로가기">이용약관</a>
			</li>
			<li>
				<a href="javascript:alert('이용자 피해예방 센터');" class="nolink" title="이용자 피해예방 센터 바로가기">이용자 피해예방 센터</a>
			</li>
			<li>
				<a href="javascript:alert('개인정보 처리방침');" title="개인정보 취급방침 바로가기">개인정보 처리방침</a>
			</li>
		</ul>
		<ul class="f_menu">
			<li>
				<a href="javascript:alert('고객센터 이메일 문의');" class="nolink" title="고객센터 이메일 문의 바로가기">고객센터 이메일 문의</a>
			</li>
			<li>
				<a href="javascript:alert('통화품질 개선문의');" title="통화품질 개선문의 바로가기">통화품질 개선문의</a>
			</li>
			<li>
				<a href="javascript:alert('칭찬합니다');" title="칭찬합니다 바로가기">칭찬합니다</a>
			</li>
		</ul>
		<div class="floor_con">
			<ul class="fc_desc">
				<li>
					<span class="bar">서울특별시 중구 을지로 65(을지로 2가)</span>
					대표이사/사장 : 박정호
				</li>
				<li>
					<span class="bar">사업자 등록번호 : 104-81-37225</span>
					판매허가번호 : 중구 - 02923호
				</li>
				<li>이동전화 고객센터 : 휴대폰 국번없이 T.114(무료)</li>
				<li>인터넷/(유선)전화/인터넷전화 고객센터 : T.080-816-2000(무료)</li>
			</ul>
			<div class="footbtn">
				<a href="javascript:alert('사업자 정보 확인');" class="batalink" title="사업자 정보 확인 바로가기">사업자 정보 확인</a>
				<a href="javascript:alert('오픈소스 라이선스');" class="batalink" title="오픈소스 라이선스 바로가기">오픈소스 라이선스</a>
			</div>
		</div>
		<!-- //floor_con -->
		<p class="copylight">
			<a href="javascript:alert('BY SK TELECOM Co., LTD ALL RIGHTS RESERVED');">&copy;</a>
			BY SK TELECOM Co., LTD ALL RIGHTS RESERVED
		</p>
		<div class="certify_box">
			<ul>
				<!-- 2016-07-07 수정_01 [s] -->
				<li>
					<img src="/img/new_main/img_certify01.png" width="100%" alt="2016년 국가고객만족도 19년 연속 1위">
				</li>
				<li>
					<img src="/img/new_main/img_certify02.png" width="100%" alt="2016년 한국산업의 고객만족도 19년 연속 1위">
				</li>
				<li>
					<img src="/img/new_main/img_certify03.png" width="100%" alt="한국서비스품질지수 17년 연속 1위">
				</li>
				<li>
					<img src="/img/new_main/img_certify04.png" width="100%" alt="Mobile Accessibility 모바일 접근성인증">
				</li>
				<!-- 2016-07-07 수정_01 [e] -->
			</ul>
		</div>
	</footer>
	<!-- //main_footer -->
</body>
</html>