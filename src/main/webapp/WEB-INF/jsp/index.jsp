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

<!-- ���ڵ� ���� -->
<link rel=stylesheet type=text/css href="/barcode/code128.css">
<script type=text/javascript src="/barcode/base2-jsb-fp.js"></script>
<script type=text/javascript src="/barcode/code128-base2.js"></script>
<script type=text/javascript src="/barcode/get.js"></script>
<script>
	new jsb.Rule(".barcodeTest, .barcodeTest2", base2.Barcode.code128behaviour);
</script>
<!-- ���ڵ� ���� -->
<script type="text/javascript">
$(document).ready(function(){
    
    var ajaxParam;
    var ajaxUrl
    
    // ���̷�Ʈ
    ajaxParam = "reqType=direct";
    ajaxUrl = "/main_banner_ajax";
    ajaxCall(ajaxUrl, ajaxParam, "DIRECT");
    
 	// Hot & New
    ajaxParam = "reqType=hotnew";
    ajaxUrl = "/main_banner_ajax";
    ajaxCall(ajaxUrl, ajaxParam, "HOT&NEW");
    
	// ��������
	ajaxParam = "";
    ajaxUrl = "/main_notice_ajax";
    ajaxCall(ajaxUrl, ajaxParam, "NOTICE");
    
	// ���̵�
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
		
		//console.log(nameNm + " API ȣ��");
		//console.log("login : <%= isLogin %>");
	
		// api ȣ�� ���� ���ο� ���� ����
		$(this).addClass('on').attr("title","���� ��").next('.tab_con').show().parent().siblings().find('.menu_button').removeClass('on').attr("title","").next('.tab_con').hide();
	});
    
	$('#logoutBtn').on('click', function(){
	    
	    if(confirm("�α׾ƿ� �Ͻðڽ��ϱ�?")){
	    
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
				    // ��Ŷ�극��Ŀ������ ���� ó���ؾ��ϳ�?
				    console.log("result Error: " + result);
				}
			});
		
	    }
	});
	
	// �α��� ���ο� ���� ��, ���� ó��
	$('#meb2').click();
	
});
</script>
</head>
<body id="main">
	<!-- 2017-03-03 �߰�_01 [s] -->
	<!-- ���ټ� ���� -->
	<div class="floating_banner_dim" style="display: none">
		<div class="floating_banner_wrapper" id="floating_banner">
			<div class="floating_icon floating_show_icon">
				<img src="/img/new_main/btn_floating_offer.png" alt="��õ����" tabindex=0>
			</div>
			<div class="floating_close">
				<img src="/img/new_main/floating_close.png" alt="�ݱ�">
			</div>
			<div class="floating_txt_wrapper"></div>
			<div class="sub_floating_list">
				<ul>
				</ul>
			</div>
			<div class="floating_icon floating_close_icon">
				<img src="/img/new_main/btn_floating_offer_close.png" alt="��õ����ݱ�">
			</div>
		</div>
	</div>
	<!-- 2017-03-03 �߰�_01 [e] -->
	<!-- ���ټ� ���� -->
	<header id="main_header">
		<h1 id="logoutBtn">
			<img src="/img/new_main/h1_logo.png" alt="mobile T world" width="30" tabindex="1" />
		</h1>
		<div class="m_search">
			<form id="search" name="search" action="/jsp/search/search.jsp?domainVer=m2" method="POST">
				<input type="text" name="query" id="query" title="�˻���" autocomplete="off" placeholder="" value="" onkeypress="if(event.keyCode == 13) { doSearch(); return false;}" />
			</form>
			<button id="b_search" class="main_search ico_comm">�˻�</button>
		</div>
		<button id="all_menu" class="all_menu_btn ico_comm">��ü�޴�����</button>
	</header>
	<section>
		<!-- main_content -->
		<div id="main_content">
			<!-- personal_info -->
			<div id="personal_info">
				<span class="bar_nlogin" style="width:100%">����� T world�� ���Ű� ȯ���մϴ�.</span>
				<span class="bar_login" id="mainCustArea">
					<span class='strong' id="mainCustNm"></span>
				</span>
				<span class="bar_login" id="mainSvcNum"></span>
				<span class="bar_login" id="p_Charge"></span>
			</div>
			<div class="main_sub">
				<!-- �����ī�� / �ܿ��⺻��ȭ / �ǽð����-->
				<!-- main_tab -->
				<div class="main_tab">
					<ul>
						<li id="mem_sector">
							<a href="javascript:void(0);" class="menu_button" id="meb1">�����</a>
							<div class="tab_con" style='display: block;'>
								<a href="javascript:void(0);" id="zoom" class="mem_con bar_login" title="����� ���ڵ� Ȯ���ϱ�">
									<div class="left">
										<span class="txt_desc">�ܿ� �����ѵ�</span>
										<span class="money_desc" id="meb_sub_limit">97,000</span>
										<ul class="user_box">
											<li>
												���
												<strong id="meb_sub_gr">���</strong>
											</li>
											<li>
												ī��
												<strong id="meb_sub_type">T�����</strong>
											</li>
										</ul>
									</div>
									<div class="right">
										<div class="barcode" id="meb_sub_con">
											<div class="barcodeTest bar4">1234 5678</div>
										</div>
										<span class="num" id="meb_sub_num"></span>
									</div>
									<button class="mag_btn ico_comm" id="zoom" title="����� ���ڵ� Ȯ���ϱ�">Ȯ���ϱ�</button>
								</a>
								<div class="n_login bar_nlogin">
									<div class='table_b pa'>
										<p class='txt'>
										���� �α��� �Ͻø�<br><span style='color:red;'>�����</span>�� �ٷ� ��ȸ�Ͻ� �� �ֽ��ϴ�.
										<div class='n_btn'>
											<a href="javascript:goLogin();" class='btn2' target='_top' title='�α��� �ٷΰ���'>�α���</a>
											<a href="javascript:alert('ȸ������');" class='btn2' target='_top' title='ȸ������ �ٷΰ���'>ȸ������</a>
										</div>
										</p>
									</div>
								</div>
							</div>
						</li>
						<li id="rem_sector">
							<a href="javascript:void(0);" class="menu_button on" title="���� ��" id="meb2">�ܿ��⺻��ȭ</a>
							<div class="tab_con">
								<div id="rem_con" class="rem_con bar_login">
									<iframe src="" frameborder="0" id="freebillIframe" width="100%" scrolling="no"></iframe>
									<button id="freebillDetailBtn" class="mag_btn ico_comm" style="display: none" onClick="asdf" title="�ܿ��⺻��ȭ �ٷΰ���">�ٷΰ���</button>
								</div>
								<div class="n_login bar_nlogin">
									<div class='table_b pa'>
										<p class='txt'>
										���� �α��� �Ͻø�<br><span style='color:red;'>�ܿ��⺻��ȭ</span>�� �ٷ� ��ȸ�Ͻ� �� �ֽ��ϴ�.
										<div class='n_btn'>
											<a href="javascript:goLogin();" class='btn2' target='_top' title='�α��� �ٷΰ���'>�α���</a>
											<a href="javascript:alert('ȸ������');" class='btn2' target='_top' title='ȸ������ �ٷΰ���'>ȸ������</a>
										</div>
										</p>
									</div>
								</div>
							</div>
						</li>
						<li id="time_sector">
							<a href="javascript:void(0);" class="menu_button" id="meb3">�ǽð� ���</a>
							<div class="tab_con">
								<a href="#" class="time_con bar_login" id="time_con" title="�ǽð� ��� �ٷΰ���">
									<p class="year" id="searchTermDate">2017�� 03��01�Ϻ��� ~ 2017�� 03��31�ϱ���</p>
									<p class="charge">
										����Ͻ� �����
										<strong>
											<span class="one" id="totOpenBal2">36,438</span>
											<span class="two">��</span>
										</strong>
										�Դϴ�.
									</p>
									<button class="mag_btn ico_comm" onClick="alert('�ǽð� ��� �ٷΰ���');" title="�ǽð� ��� �ٷΰ���">�ٷΰ���</button>
								</a>
								<div class="n_login bar_nlogin">
									<div class='table_b pa'>
										<p class='txt'>
										���� �α��� �Ͻø�<br><span style='color:red;'>�ǽð� ���</span>�� �ٷ� ��ȸ�Ͻ� �� �ֽ��ϴ�.
										<div class='n_btn'>
											<a href="javascript:goLogin();" class='btn2' target='_top' title='�α��� �ٷΰ���'>�α���</a>
											<a href="javascript:alert('ȸ������');" class='btn2' target='_top' title='ȸ������ �ٷΰ���'>ȸ������</a>
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
			<!-- �� ��� -->
			<!-- 2016-12-28 �߰�_01 [s] -->
			<div class="banner_line_banner"></div>
			<!-- 2016-12-28 �߰�_01 [e] -->
			<!-- �� ��� -->
			<div class="main_menu">
				<ul>
					<li>
						<a href="javascript:alert('my T');">
							<img src="/img/new_main/main_menu01_off.png" alt="my T">
						</a>
					</li>
					<li>
						<a href="javascript:alert('�����ȸ/����');">
							<img src="/img/new_main/main_menu02_off.png" alt="�����ȸ/����">
						</a>
					</li>
					<li>
						<a href="javascript:alert('����/����/����');">
							<img src="/img/new_main/main_menu03_off.png" alt="����/����/����">
						</a>
					</li>
					<li>
						<a href="javascript:alert('�����/T Apps/�ΰ�����');">
							<img src="/img/new_main/main_menu04_off.png" alt="�����/T Apps/�ΰ�����">
						</a>
					</li>
					<li>
						<a href="javascript:alert('�����');">
							<img src="/img/new_main/main_menu05_off.png" alt="�����">
						</a>
					</li>
					<li>
						<a href="javascript:alert('T�ι�');">
							<img src="/img/new_main/main_menu06_off.png" alt="T�ι�">
						</a>
					</li>
					<li>
						<a href="javascript:alert('���þȳ�');">
							<img src="/img/new_main/main_menu07_off.png" alt="���þȳ�">
						</a>
					</li>
					<li>
						<a href="javascript:alert('�̿�ȳ�');">
							<img src="/img/new_main/main_menu08_off.png" alt="�̿�ȳ�">
						</a>
					</li>
					<li>
						<a href="javascript:alert('���ͳ�/��ȭ/TV');">
							<img src="/img/new_main/main_menu09_off.png" alt="���ͳ�/��ȭ/TV">
						</a>
					</li>
					<li>
						<a href="javascript:alert('T ���̷�Ʈ, �޴��� ���� ���, 1��1 ��ȭ������� �޴����� ������ �����ϰ� �����ϼ���.');">
							<img src="/img/new_main/menu_tDirect_off.png" alt="T ���̷�Ʈ, �޴��� ���� ���, 1��1 ��ȭ������� �޴����� ������ �����ϰ� �����ϼ���.">
						</a>
					</li>
				</ul>
			</div>
			<!-- //main_menu -->
			<!-- 2016-05-10 �߰�_03 [s] -->
			<div id="swiper_banner" class="swiper-container">
				<div id="swiper_banners" class="swiper-wrapper"></div>
				<div class="swiper-guide-wrapper">
					<button class="swiper-button-prev">
						<span class="ico_comm">���� ��ʺ���</span>
					</button>
					<div class="swiper-pagination">
						<ul></ul>
						<button class="bplay_btn ">����̹��� �Ͻ�����</button>
					</div>
					<button class="swiper-button-next">
						<span class="ico_comm">���� ��ʺ���</span>
					</button>
				</div>
			</div>
			<!-- 2016-05-10 �߰�_03 [e] -->
			<!-- 2016-01-04 [s] ���� -->
			<!-- h_and_n_box -->
			<div class="h_and_n_box">
				<h2 class="mtlth2">
					Hot & New
					<span class="txt">���� ���ϰ� ���ο� ����</span>
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
				<!-- 2017-03-23 TWD �����Ķ���� �߰� [S] -->
				<h2 class="mtlth2">
					<a href="javascript:void(0);" title="��â">
						<img src="/img/new_main/tlt_t_direct.png" width="99" alt="T world Direct">
						<span class="txt">
							�ű԰���/��� ���� ���� �¶��� ���θ�
							<span class="ico_comm"></span>
						</span>
					</a>
				</h2>
				<!-- 2017-03-23 TWD �����Ķ���� �߰� [E] -->
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
			<!-- 2015-12-18 [s] ���� -->
			<div class="situation_box">
				<h2 class="mtlth2">
					<a href="javascript:void(0);" title="�̷��� �̷��� �ϼ��� �ٷΰ���">
						��Ȳ�� ��ó��
						<span class="txt">
							�̷��� �̷��� �ϼ���
							<span class="ico_comm"></span>
						</span>
					</a>
				</h2>
				<ul class="like_this_type">
				</ul>
			</div>
			<!-- 2015-12-18 [e] ���� -->
			<!-- //situation_box -->
			<div class="m_one_banner box_section">
				<iframe src="" id="iframe_banner" width="100%" frameborder="0" scrolling="no" height=0></iframe>
			</div>
			<!-- 2016-08-25 ����_02 [e] --
		<!-- floor_btn -->
			<div class="floor_btn">
				<p class="left">
					<a href="javascript:void(0);" title="T world ���� ã�� �ٷΰ���">
						<img src="/img/new_main/img_floorBtn01.png" alt="Ƽ���� ����ã��">
					</a>
				</p>
				<p class="right">
					<a href="javascript:void(0);" title="���� ã�� ���� �ٷΰ���">
						<img src="/img/new_main/img_floorBtn02.png" alt="����ã�¹���">
					</a>
				</p>
			</div>
			<!-- //floor_btn -->
			<!-- notice -->
			<div id="notice" class="notice">
				<h2>
					<a href="javascript:alert('��������');">��������</a>
				</h2>
				<ul>
				</ul>
				<button class="go_top ico_comm" onclick="gotop();">������</button>
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
				<a href="javascript:alert('�̿���');" title="�̿��� �ٷΰ���">�̿���</a>
			</li>
			<li>
				<a href="javascript:alert('�̿��� ���ؿ��� ����');" class="nolink" title="�̿��� ���ؿ��� ���� �ٷΰ���">�̿��� ���ؿ��� ����</a>
			</li>
			<li>
				<a href="javascript:alert('�������� ó����ħ');" title="�������� ��޹�ħ �ٷΰ���">�������� ó����ħ</a>
			</li>
		</ul>
		<ul class="f_menu">
			<li>
				<a href="javascript:alert('������ �̸��� ����');" class="nolink" title="������ �̸��� ���� �ٷΰ���">������ �̸��� ����</a>
			</li>
			<li>
				<a href="javascript:alert('��ȭǰ�� ��������');" title="��ȭǰ�� �������� �ٷΰ���">��ȭǰ�� ��������</a>
			</li>
			<li>
				<a href="javascript:alert('Ī���մϴ�');" title="Ī���մϴ� �ٷΰ���">Ī���մϴ�</a>
			</li>
		</ul>
		<div class="floor_con">
			<ul class="fc_desc">
				<li>
					<span class="bar">����Ư���� �߱� ������ 65(������ 2��)</span>
					��ǥ�̻�/���� : ����ȣ
				</li>
				<li>
					<span class="bar">����� ��Ϲ�ȣ : 104-81-37225</span>
					�Ǹ��㰡��ȣ : �߱� - 02923ȣ
				</li>
				<li>�̵���ȭ ������ : �޴��� �������� T.114(����)</li>
				<li>���ͳ�/(����)��ȭ/���ͳ���ȭ ������ : T.080-816-2000(����)</li>
			</ul>
			<div class="footbtn">
				<a href="javascript:alert('����� ���� Ȯ��');" class="batalink" title="����� ���� Ȯ�� �ٷΰ���">����� ���� Ȯ��</a>
				<a href="javascript:alert('���¼ҽ� ���̼���');" class="batalink" title="���¼ҽ� ���̼��� �ٷΰ���">���¼ҽ� ���̼���</a>
			</div>
		</div>
		<!-- //floor_con -->
		<p class="copylight">
			<a href="javascript:alert('BY SK TELECOM Co., LTD ALL RIGHTS RESERVED');">&copy;</a>
			BY SK TELECOM Co., LTD ALL RIGHTS RESERVED
		</p>
		<div class="certify_box">
			<ul>
				<!-- 2016-07-07 ����_01 [s] -->
				<li>
					<img src="/img/new_main/img_certify01.png" width="100%" alt="2016�� ������������ 19�� ���� 1��">
				</li>
				<li>
					<img src="/img/new_main/img_certify02.png" width="100%" alt="2016�� �ѱ������ �������� 19�� ���� 1��">
				</li>
				<li>
					<img src="/img/new_main/img_certify03.png" width="100%" alt="�ѱ�����ǰ������ 17�� ���� 1��">
				</li>
				<li>
					<img src="/img/new_main/img_certify04.png" width="100%" alt="Mobile Accessibility ����� ���ټ�����">
				</li>
				<!-- 2016-07-07 ����_01 [e] -->
			</ul>
		</div>
	</footer>
	<!-- //main_footer -->
</body>
</html>