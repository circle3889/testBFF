<%@ page language="java" contentType="text/html;charset=EUC-KR" session="false" %>
<%@ page import="java.util.*" %>
<%@ page import="kr.co.tworld.util.NumberUtil" %>
<%@ page import="kr.co.tworld.main.domain.User" %>
<%
	Boolean isLogin = request.getAttribute("isLogin") != null ? (Boolean) request.getAttribute("isLogin") : false;
	HashMap<String, Object> user = request.getAttribute("user") != null ? (HashMap<String, Object>) request.getAttribute("user") : null;
	
	HashMap<String, Object> selectedSvcMgmtNum = null;
	List<String> svcNumList = null;
	String sSvcMgmtNum = "";
	
	if(user != null){
		svcNumList = (List<String>) user.get("svcNum");
		selectedSvcMgmtNum = (HashMap<String, Object>) user.get("selectedSvcMgmtNum");
		sSvcMgmtNum = (String) selectedSvcMgmtNum.get("svcNum");
	}
%>
<!doctype HTML>
<html lang="ko">
<head>
	<meta charset="euc-kr" />
	<meta http-equiv="Cache-Control" content="no-cache" />
	<meta id="viewport" name="viewport" content="user-scalable=yes, initial-scale=1.0, width=device-width" />
	<meta name="format-detection" content="telephone=no">
	<title>������ȭ(��ȸ) &lt; �ܿ��⺻��ȭ | T world</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/new_layout.css?ver=1" />
	<link rel="stylesheet" type="text/css" href="/inc/css/new_billsearch.css?ver=1" />
	<link rel="stylesheet" type="text/css" href="/inc/css/new_product.css" />
	<link rel="stylesheet" type="text/css" href="/inc/css/mtworld.circle.progress.css">
	<script src="/inc/js/jquery-1.7.2.min.js"></script>
	<script src="/inc/js/new_common.js"></script>
	<script src="/inc/js/new_tworld.js"></script>
</head>
<script>
var GbDataYn ="Y";
$(document).ready(function(){
	
	<% if(isLogin && selectedSvcMgmtNum != null){ %>
	$.ajax({
		type: "get",
		data : "",
		dataType: "json",
		url: "/freebill_detail_ajax",
		success: function(result) {
			if(result.returnCode == 'error'){
				alert(result.returnMsg);
				location.href = "/";
			}else{
				setData(result);
			}
		},
		error:function(result){
		    // ��Ŷ�극��Ŀ������ ���� ó���ؾ��ϳ�?
		    console.log("result Error: " + result.error);
		}
	});
	<% }else{ %>
		alert('������ ����Ǿ����ϴ�.');
		location.href = "/";	
	<% } %>
    
    //MB/GB ��ȯ
	$("#mbGbData").click(function(){
		if(GbDataYn =="Y"){
			GbDataYn= "N";
			$(this).text("GB�� Ȯ���ϱ�");
			$(".gbdata").hide();
			$(".mbdata").show();
			$("#toastBox").fadeIn().find("p").html("�����͸� MB(�ް�����Ʈ)<br>������ ǥ���մϴ�.");
		}else{
			GbDataYn ="Y";
			$(this).text("MB�� Ȯ���ϱ�");
			$(".gbdata").show();
			$(".mbdata").hide();
			$("#toastBox").fadeIn().find("p").html("1,024MB �̻��� GB(�Ⱑ����Ʈ)<br>������ ǥ���մϴ�.");
		}
		setTimeout(function(){
			$("#toastBox").fadeOut();
		}, 2000);
	});
});

function goAppBack(){
    location.href = "/";
}

function fnSearch(){
    
}

function fnMenuAll(){
    
}

function getPercentClass(percent){
	var classPercent = 0;
	if (percent != null && percent != "0"){
		classPercent = 20 * percent/100;
	}
	 
	return "p" + classPercent;
}

function getRandom(){
	var random = (Math.floor(Math.random() * 100) + 1);
	return random;
}

function setData(result){
	
	var D_List; //D
	var V_List; //V, VP, P
	var S_List; //S
	var ETC_List; //ETC, VSP, VSD, TING

	var freeBillList = result.freeBillEditList;	
	
	var qtyList = result.qtyList;	
	var remainGbQtyList = result.remainGbQtyList;	
	var remainMbQtyList = result.remainMbQtyList;	
	var useGbQtyList = result.useGbQtyList;
	var useMbQtyList = result.useMbQtyList;	
	
	$("#prodNm").text(result.prodNm);

	if(result.dataCnt > 0){
		$("#D_List_Area").show();
	}
	if(result.smsCnt > 0){
		$("#V_List_Area").show();
	}
	if(result.voiceAndpictureCnt > 0){
		$("#S_List_Area").show();
	}
	if(result.etcCnt > 0){
		$("#ETC_List_Area").show();
	}
	
	for(i=0; i<freeBillList.length; i++){
		var PlanName = freeBillList[i].prodName;
		var freePlanName = freeBillList[i].skipName;
		var skipCode = freeBillList[i].skipCode;
		var totalQty = freeBillList[i].baseQty;
		var useQty = freeBillList[i].useQty;
		var remainQty = freeBillList[i].remaindQty;
		var percent = freeBillList[i].percent;
		var unitCode = freeBillList[i].unit;   											    
		var useHMS = freeBillList[i].editUseQty; // hash
		var remainHMS = freeBillList[i].editRemaindQty; // hash
		var totalHMS = freeBillList[i].editTotalQty; // hash
		var PlanId = freeBillList[i].prodId;
		var codeType = freeBillList[i].codeType;
		
		if(codeType == "D"){
			
			D_List = "";
			
			if("DDZ25" == skipCode || "DDZ23" == skipCode || "DD0PB" == skipCode){
				
				D_List += "<li>";
				D_List += "	<div class=\"graphWrap\">";
				D_List += "		<div class=\"clearfix\">";
				D_List += "			<div class=\"circlePct\">";
				D_List += "				<span class=\"limit\">������</span>";
				D_List += "				<div class=\"slice\">";
				D_List += "					<div class=\"fbar\"></div>";
				D_List += "					<div class=\"fill\"></div>";
				D_List += "				</div>";
				D_List += "			</div>";
				D_List += "		</div>";
				D_List += "	</div>";
				D_List += "	<div class=\"contWrap\">";
				D_List += "		<a href=\"javascript:goParentPage('http://m2.tworld.co.kr/normal.do?serviceId=SDUMMY0002&viewId=V_MYTW2014');\" class=\"link\">";
				D_List += "			<strong class=\"ctTit\">" + freePlanName + "</strong>";
				D_List += "			<span class=\"ctLst gbdata\">";
				D_List += "				<span class=\"use\"><span role=\"text\">��� : " + useGbQtyList[i] + "</span></span>";
				D_List += "			</span>";
				D_List += "			<span class=\"ctLst mbdata\" style=\"display:none\">";
				D_List += "				<span class=\"use\"><span role=\"text\">��� : " + useMbQtyList[i] + "</span></span>";
				D_List += "			</span>";
				D_List += "		</a>";
				D_List += "	</div>";
				D_List += "</li>";
				
			}else if("������" != remainQty){
				
				var percentClass = getPercentClass(percent);
				
				D_List += "<li>";
				D_List += "	<div class=\"graphWrap\">";
				D_List += "		<div class=\"clearfix\">";
				D_List += "			<div class=\"circlePct " + percentClass + "\">";
				D_List += "				<span>" + percent + "%</span>";
				D_List += "				<div class=\"slice\">";
				D_List += "					<div class=\"fbar\"></div>";
				D_List += "					<div class=\"fill\"></div>";
				D_List += "				</div>";
				D_List += "			</div>";
				D_List += "		</div>";
				D_List += "	</div>";
				D_List += "	<div class=\"contWrap\">";
				D_List += "		<strong class=\"ctTit\">" + freePlanName + "</strong>";
				D_List += "		<span class=\"ctLst gbdata\">";
				D_List += "			<span class=\"rem\"><span role=\"text\">�ܿ� : " + remainGbQtyList[i] + "</span></span>";
				D_List += "			<span class=\"use\"><span role=\"text\">��� : " + useGbQtyList[i] + "</span></span>";
				D_List += "		</span>";
				D_List += "		<span class=\"ctLst mbdata\" style=\"display:none\">";
				D_List += "			<span class=\"rem\"><span role=\"text\">�ܿ� : " + remainMbQtyList[i] + "</span></span>";
				D_List += "			<span class=\"use\"><span role=\"text\">��� : " + useMbQtyList[i] + "</span></span>";
				D_List += "		</span>";
				D_List += "	</div>";
				D_List += "</li>";
				
			}else{
				
				D_List += "<li>";
				D_List += "	<div class=\"graphWrap\">";
				D_List += "		<div class=\"clearfix\">";
				D_List += "			<div class=\"circlePct \">";
				D_List += "				<span class=\"limit\">������</span>";
				D_List += "				<div class=\"slice\">";
				D_List += "					<div class=\"fbar\"></div>";
				D_List += "					<div class=\"fill\"></div>";
				D_List += "				</div>";
				D_List += "			</div>";
				D_List += "		</div>";
				D_List += "	</div>";
				D_List += "	<div class=\"contWrap\">";
				D_List += "		<strong class=\"ctTit\">" + freePlanName + "</strong>";
				
				if (skipCode != null && "PA" == skipCode){
					D_List += "				 <span class=\"ctLst gbdata\">";
					D_List += "					<span class=\"use\"><span role=\"text\">��� : " + useGbQtyList[i] + "</span></span>";
					D_List += "				</span>";
					D_List += "				 <span class=\"ctLst mbdata\" style=\"display:none\">";
					D_List += "					<span class=\"use\"><span role=\"text\">��� : " + useMbQtyList[i] + "</span></span>";
					D_List += "				</span>";
				}
				
				D_List += "	</div>";
				D_List += "</li>";
			}
			
			$("#D_List").append(D_List);
			
		}else if(codeType == "V" || codeType == "VP" || codeType == "P"){
			
			V_List = "";
			
			if("������" != remainQty) {
				
				var percentClass = getPercentClass(percent);
				
				V_List += "<li>";
				V_List += "	<div class=\"graphWrap\">";
				V_List += "		<div class=\"clearfix\">";
				V_List += "			<div class=\"circlePct " + percentClass + "\">";
				V_List += "				<span>" + percent + "%</span>";
				V_List += "				<div class=\"slice\">";
				V_List += "					<div class=\"fbar\"></div>";
				V_List += "					<div class=\"fill\"></div>";
				V_List += "				</div>";
				V_List += "			</div>";
				V_List += "		</div>";
				V_List += "	</div>";
				V_List += "	<div class=\"contWrap\">";
				V_List += "		<strong class=\"ctTit\">" + freePlanName + "</strong>";
				V_List += "		<span class=\"ctLst\">";
				V_List += "			<span class=\"rem\"><span role=\"text\">�ܿ� : " + remainGbQtyList[i] + "</span></span>";
				V_List += "			<span class=\"use\"><span role=\"text\">��� : " + useGbQtyList[i] + "</span></span>";
				V_List += "		</span>";
				V_List += "	</div>";
				V_List += "</li>";
				
			}else{
				
				V_List += "<li>";
				V_List += "	<div class=\"graphWrap\">";
				V_List += "		<div class=\"clearfix\">";
				V_List += "			<div class=\"circlePct \">";
				V_List += "				<span class=\"limit\">������</span>";
				V_List += "				<div class=\"slice\">";
				V_List += "					<div class=\"fbar\"></div>";
				V_List += "					<div class=\"fill\"></div>";
				V_List += "				</div>";
				V_List += "			</div>";
				V_List += "		</div>";
				V_List += "	</div>";
				V_List += "	<div class=\"contWrap\">";
				V_List += "		<strong class=\"ctTit\">" + freePlanName + "</strong>";
				V_List += "		<span class=\"ctLst\">";
				V_List += "			<span class=\"use\"><span role=\"text\">��� : " + useGbQtyList[i] + "</span></span>";
				V_List += "		</span>";
				V_List += "	</div>";
				V_List += "</li>";
				
			}
			
			$("#V_List").append(V_List);
			
		}else if(codeType == "S"){
			
			S_List = "";
			
			if("������" != remainQty) {
				
				S_List += "<li>";
				
				if(remainQty.indexOf("�⺻����") > 0) {
					
					S_List += "<div class=\"graphWrap\">";
					S_List += "	<div class=\"clearfix\">";
					S_List += "		<div class=\"circlePct \">";
					S_List += "			<span class=\"limit\">������</span>";
					S_List += "			<div class=\"slice\">";
					S_List += "				<div class=\"fbar\"></div>";
					S_List += "				<div class=\"fill\"></div>";
					S_List += "			</div>";
					S_List += "		</div>";
					S_List += "	</div>";
					S_List += "</div>";
					S_List += "<div class=\"contWrap\">";
					S_List += "	<strong class=\"ctTit\">" + freePlanName + "</strong>";
					S_List += "	<span class=\"ctLst\">";
					S_List += "		<span class=\"use\"><span role=\"text\">�⺻������</span></span>";
					S_List += "";
					S_List += "	</span>";
					S_List += "</div>";
					
				}else{
					
					var percentClass = getPercentClass(percent);

					S_List += "<div class=\"graphWrap\">";
					S_List += "	<div class=\"clearfix\">";
					S_List += "		<div class=\"circlePct " + percentClass + "\">";
					S_List += "			<span>" + percent + "%</span>";
					S_List += "			<div class=\"slice\">";
					S_List += "				<div class=\"fbar\"></div>";
					S_List += "				<div class=\"fill\"></div>";
					S_List += "			</div>";
					S_List += "		</div>";
					S_List += "	</div>";
					S_List += "</div>";
					S_List += "<div class=\"contWrap\">";
					S_List += "	<strong class=\"ctTit\">" + freePlanName + "</strong>";
					S_List += "	<span class=\"ctLst\">";
					S_List += "		<span class=\"rem\"><span role=\"text\">�ܿ� : " + remainGbQtyList[i] + "</span></span>";
					S_List += "		<span class=\"use\"><span role=\"text\">��� : " + useGbQtyList[i] + "</span></span>";
					S_List += "";
					S_List += "";
					S_List += "	</span>";
					S_List += "</div>";
				
				}
				
				S_List += "</li>";
				
			}else{
				
				S_List += "<li>";
				S_List += "	<div class=\"graphWrap\">";
				S_List += "		<div class=\"clearfix\">";
				S_List += "			<div class=\"circlePct \">";
				S_List += "				<span class=\"limit\">������</span>";
				S_List += "				<div class=\"slice\">";
				S_List += "					<div class=\"fbar\"></div>";
				S_List += "					<div class=\"fill\"></div>";
				S_List += "				</div>";
				S_List += "			</div>";
				S_List += "		</div>";
				S_List += "	</div>";
				S_List += "	<div class=\"contWrap\">";
				S_List += "		<strong class=\"ctTit\">" + freePlanName + "</strong>";
				S_List += "		<span class=\"ctLst\">";
				S_List += "			<span class=\"use\"><span role=\"text\">014</span></span>";
				S_List += "		</span>";
				S_List += "	</div>";
				S_List += "</li>";
				
			}
			
			$("#S_List").append(S_List);
			
		}else if(codeType == "ETC" || codeType == "VSP" || codeType == "VSD" || codeType == "TING"){
			
			ETC_List = "";
			
			if(totalQty != "0"){
				
				if("������" != remainQty) {
					
					var percentClass = getPercentClass(percent);
					
					ETC_List += "<li>";
					ETC_List += "	<div class=\"graphWrap\">";
					ETC_List += "		<div class=\"clearfix\">";
					ETC_List += "			<div class=\"circlePct " + percentClass + "\">";
					ETC_List += "				<span>" + percent + "%</span>";
					ETC_List += "				<div class=\"slice\">";
					ETC_List += "					<div class=\"fbar\"></div>";
					ETC_List += "					<div class=\"fill\"></div>";
					ETC_List += "				</div>";
					ETC_List += "			</div>";
					ETC_List += "		</div>";
					ETC_List += "	</div>";
					ETC_List += "	<div class=\"contWrap\">";
					ETC_List += "		<strong class=\"ctTit\">" + freePlanName + "</strong>";
					ETC_List += "		<span class=\"ctLst\">";
					ETC_List += "			<span class=\"rem\"><span role=\"text\">�ܿ� : " + remainGbQtyList[i] + "</span></span>";
					ETC_List += "			<span class=\"use\"><span role=\"text\">��� : " + useGbQtyList[i] + "</span></span>";
					ETC_List += "		</span>";
					ETC_List += "	</div>";
					ETC_List += "</li>";
					
				}else{
					
					ETC_List += "<li>";
					ETC_List += "	<div class=\"graphWrap\">";
					ETC_List += "		<div class=\"clearfix\">";
					ETC_List += "			<div class=\"circlePct \">";
					ETC_List += "				<span>������</span>";
					ETC_List += "				<div class=\"slice\">";
					ETC_List += "					<div class=\"fbar\"></div>";
					ETC_List += "					<div class=\"fill\"></div>";
					ETC_List += "				</div>";
					ETC_List += "			</div>";
					ETC_List += "		</div>";
					ETC_List += "	</div>";
					ETC_List += "	<div class=\"contWrap\">";
					ETC_List += "		<strong class=\"ctTit\">" + freePlanName + "</strong>";
					ETC_List += "	</div>";
					ETC_List += "</li>";
					
				}
				
				$("#ETC_List").append(ETC_List);
				
			}
		}
	}	
}
	
</script>
<body>
    <div id="header">
        <div class="header_cont">
			<div class="h1_wrap"><h1 onClick="getRandom();"><span id="title" tabindex="0">�ܿ��⺻��ȭ</span></h1></div>
			<button onClick="javascript:goAppBack();" class="head_back_page" id="backBtn">�ڷΰ���</button>
			<p class="search_allmenu">
                <button class="head_search" onClick="javascript:fnSearch();">�˻�</button>
                <button class="head_allmenu" onClick="javascript:fnMenuAll();">��ü�޴�����</button>
            </p>
        </div>
    </div>
	<section>
		<div id="content">
			<div class="contbox conifr">
			
				<!-- START - MultiNumber SelectBox -->
			    <form method="post" name="frmMultiNumSelect" action="/freebill_detail.do">
					<dl class="my_line_number line_number_border">
						<dt>���� ȸ����ȣ</dt>
						<dd class="">
							<div class="select_type1" style="width: 100%;">
								<select name='selMultiNum' id='selMultiNum' class='slct_ch' title='���� ȸ����ȣ' style='background-image: none' disabled="disabled" >
<%-- 									<% for(String svcNum : svcNumList){ %> --%>
<%-- 									<option value="<%=svcNum%>" <%= selectedSvcMgmtNum.get("svcNum").equals(svcNum) ? "selected" : "" %>><%=svcNum%></option> --%>
<%-- 									<% } %> --%>
									<option value="<%= sSvcMgmtNum %>" selected><%= sSvcMgmtNum %></option>
								</select>
							</div>
							<a href='javascript:void(0);' class='sel_ok'>
								<img src='/img/common/select_ok_btn.gif' alt='Ȯ��' />
							</a>
						</dd>
					</dl>
				</form>
			    <!-- END - MultiNumber SelectBox -->
				
				<!-- 2015-10-26 [s] �߰� -->
					
	<!-- 2016-12-23 �߰�_01 [s] -->
	<div class="contbox newRemainBasic">
		<div class="inquiryArea">
			<div class="cont">
				<strong class="chargeName" id="prodNm"></strong> 
				<p class="remainTerm" role="text">�̹��� �ܿ��Ⱓ�� <em class="days" id="remainDay"><%= getRemainDay() %>��</em> ���ҽ��ϴ�.</p>
			</div>
		</div>
		<!-- ������ ���� -->
		<div class="sectionBoxWrap data" id="D_List_Area" style="display:none;">
			<div class="titArea">
				<h2>������</h2>
				<!-- 2017-02-20 ����_01 [s] -->
<!-- 				<button type="button" class="icoBtn icoBtnB" id="mbGbData" ga:ca="MTA_rate" ga:ac="�ܿ��⺻��ȭ>������" ga:la="MB�� Ȯ���ϱ�">MB�� Ȯ���ϱ�</button> -->
				<!-- 2017-02-20 ����_01 [e] -->
			</div>
			<div class="sectionArea">
				<ul id="D_List">
				</ul>
			</div>
			<!-- 2017-02-01 �߰�_01 [s] -->
			<div id="toastBox"><p></p></div>
			<!-- 2017-02-01 �߰�_01 [e] -->
		</div>
		<!-- // ������ ���� -->
		<!-- ���� ���� -->
		<div class="sectionBoxWrap voice" id="V_List_Area" style="display:none;">
			<div class="titArea">
				<h2>����</h2>
			</div>
			<div class="sectionArea">
				<ul id="V_List">
				</ul>
			</div>
		</div>
		<!-- // ���� ���� -->
		<!-- ���� ���� -->
		<div class="sectionBoxWrap msg" id="S_List_Area" style="display:none;">
			<div class="titArea">
				<h2>����</h2>
			</div>
			<div class="sectionArea">
				<ul id="S_List">
				</ul>
			</div>
		</div>
		<!-- // ���� ���� -->
		
		<!-- ��Ÿ ���� -->
		<div class="sectionBoxWrap etc" id="ETC_List_Area" style="display:none;">
			<div class="titArea">
				<h2>��Ÿ</h2>
			</div>
			<div class="sectionArea">
				<ul id="ETC_List">
				</ul>
			</div>
		</div>
		<!-- // ��Ÿ ���� -->
		
		<div class="menuBox">
			<div class="titArea">
				<h2>���� �޴��� �̿��� ������</h2>
			</div>
			<ul class="lstArea">
				<!-- //���� ��� �����ڿ��Ը� ���� -->
				<li><a href="javascript:alert('�ǽð� �����ȸ �̵�')" onclick="event.stopPropagation();ga('send','event','MTA_rate','�ܿ��⺻��ȭ>�ϴܸ޴�', '�ǽð� �����ȸ');" >�ǽð� �����ȸ</a></li>
				<li><a href="javascript:alert('���� ��뷮 �̵�');" onclick="event.stopPropagation();ga('send','event','MTA_rate','�ܿ��⺻��ȭ>�ϴܸ޴�', '���� ��뷮');" >���� ��뷮</a></li>
				<li><a href="javascript:alert('T���� ������ �̵�');" onclick="event.stopPropagation();ga('send','event','MTA_rate','�ܿ��⺻��ȭ>�ϴܸ޴�', 'T���� ������ ����');" >T���� ������ ����</a></li>
			</ul>
		</div>
		
		<div class="toggleSection">
			<div class="titBox">
				<h3 class="subTit2">�̿�ȳ�</h3>
			</div>
			<ul class="toggleWrap">
				<li class="item">
					<strong>���� û���ݾװ� ���̰� ���� �� �ֽ��ϴ�.</strong>
					<p class="tidtPara">- �ܿ��⺻��ȭ�� ���� û���ݾװ� �ټ� ���̰� ���� �� ������ �ܼ� ��������� Ȱ���Ͻñ� �ٶ��ϴ�.</p>
				</li>
				<li class="item">
					<strong>�� �� ���� �� �ʰ� ����� �߻��� �� �ֽ��ϴ�.</strong>
					<ul class="tidtList">
						<li class="fcRed">- �� �� ����� ���� �� �Ͻ� ������ �� ��� �⺻ �����Ǵ� ����/����/������ ���� ���� ���Ǿ� �����˴ϴ�.</li>
						<li class="fcRed">- ������� ���� ���� ���� �⺻���� ����/����/������ ������ �ݿ��Ǿ� ���� ���� �� ������ �����Ͻñ� �ٶ��ϴ�.</li>
						<li>- �� �� �����̷��� ���� �� �ܿ��⺻��ȭ�� �ܿ����� �ټ� ����� �� ������ ���� ��Ź�帳�ϴ�.</li>
					</ul>
				</li>
				<li class="item">
					<strong>�Ϻ� �̿��� �ܿ��⺻��ȭ�� �����޿� ��ȸ �����մϴ�.</strong>
					<p class="tidtPara">- �ܿ��⺻��ȭ�� �̿����� ������ �Ϻ� �̿� ������ ������� �̿��� �ܿ��⺻��ȭ�� ������ 5�Ϻ��� ��� �� ��ȸ�� �����մϴ�.</p>
				</li>
			</ul>
		</div>
	</div>
				</div> 
				<!-- 2015-10-26 [e] �߰� -->
				
				
				</div>
		</div>
	</section>
	<script> 
		
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
		
		
		$(document).ready(function(){
			
		});
		
		FloatingBanner = {
			show : function(){
				var isFBannerShow = "Y";
				if(MobileUA.ANDROID){
					isFBannerShow = toapp.checkConfirmDate("com.skt.prod.remainBasicBanner","86400000"); //�ι�° �Ķ���ʹ� �������� �ҷ��� ���� �ؾ� �մϴ�.
				} else if(MobileUA.IOS){
					if (document.cookie.indexOf("remainBasicBanner=done") < 0) {
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
					location.href = "toapp.settingpackageconfirmdate:com.skt.prod.remainBasicBanner"; //�Ϸ絿�� ���� �ð�.
				} else if(MobileUA.IOS){
					FloatingBanner.setCookie( "remainBasicBanner", "done" , 1 );
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
	</script>
	<!-- 2016-06-27 �߰�_03 [e] -->

</body>
</html>
<%!

 public static String makeDataString(String data, HashMap hm, String unitCode, String type ){
    
     StringBuffer sb = new StringBuffer();
     
     if("240".equals(unitCode)){
         sb = makeDataStringByMinUnit(hm, type);
     }else if("110".equals(unitCode)){
    	if(type.equals("2")){
      	 sb.append("<em class='volume'>"+data+"</em>"); 
       }else{
      	 sb.append(data);
       }
         sb.append("��");
    }else if("160".equals(unitCode)){
   	if(type.equals("2")){
       	sb.append("<em class='volume'>"+data+"</em>"); 
   	}else{
       	sb.append(data);
   	}
       sb.append("��");	   	         
     }else if("140".equals(unitCode)){
         
        //data = StringUtil.replace(data, ",", "");
        float fData = Float.parseFloat(data);
       
        
        // 1KB ~ 1MB �̸�
        if(fData < 1024){
            
            data = NumberUtil.format(fData, "###,###,###,##0");
            if(type.equals("2")){
           	 sb.append("<em class='volume'>"+data+"</em>"); 
            }else{
           	 sb.append(data);
            }
	         sb.append("KB");
	         
        }else{
            
            // 1MB (1024KB) ~ 1,023MB (1024*1024)
            // �Ҽ����� ���� 
            if ( (1024 <= fData ) && ( fData < (1024 * 1024))){
                
                fData = fData /1024;
                data = NumberUtil.format(fData, "###,###,###,##0");
                
                if(type.equals("2")){
               	 sb.append("<em class='volume'>"+data+"</em>"); 
                }else{
               	 sb.append(data);
                }
   	         sb.append("MB");
   	         
   	     // 1GB (1024MB) ~ 1,023GB (1024*1024*1024) 
   	     // ���� ǥ�ø� GB
   	     // ǥ���ϴ� ������ �Ҽ����� 0�̸� ǥ�� ����
            } else if ( (1024*1024 <= fData ) && ( fData < (1024 * 1024 * 1024))){
                
                fData = fData /1024/1024;
                
                // 1,000 �̻��� �Ҽ��� ǥ�� ����
                if (fData >= 1000) {
                    
                    data = NumberUtil.format(fData, "###,###,###,###");
                    
                // 100 �̻��� �Ҽ��� ���ڸ� (���ڸ� ����)
                } else if ( (100 <= fData) && (fData < 1000)){
                    
                    data = NumberUtil.format(fData, "###.#");
                    
                 // 1~99 �Ҽ��� ���ڸ� ǥ�� (���ڸ� ����)
                } else if ( (1 <= fData) && (fData < 100)){
                  
                    data = NumberUtil.format(fData, "##.##");

                }
                if(type.equals("2")){
               	 sb.append("<em class='volume'>"+data+"</em>"); 
                }else{
               	 sb.append(data);
                }
   	         sb.append("GB");
                
            }
        }	         
        
     }else if("310".equals(unitCode) || "320".equals(unitCode)){
        
    	if(type.equals("2")){
      	 	sb.append("<em class='volume'>"+data+"</em>"); 
       }else{
      	 	sb.append(data);
       }
        sb.append("��");
     }
     
     return sb.toString();
 }         
	
	/**
	 * �׷����� ��뷮,�ܿ����� ǥ��  (������ '��'�� ��� ǥ��) 
	 * @param hm '�ð�','��','��' ��
	 * @param type ��뷮(1), �ܿ���(2)
	 * @return String
	 */	 
	public static StringBuffer makeDataStringByMinUnit(HashMap hm, String type){
	    
	    
	    StringBuffer sb = new StringBuffer();
    String hour     = (String)hm.get("hour");
    String minute  = (String)hm.get("minute");
    String second  = (String)hm.get("second");
    
    int iHour = Integer.parseInt(hour);
    int iMinute = Integer.parseInt(minute);
    int iSecond = Integer.parseInt(second);
    
    hour = NumberUtil.format(iHour, "#,##0");
    minute = NumberUtil.format(iMinute, "#0");
    second = NumberUtil.format(iSecond, "#0");
    
 // 00�ð�00��00��->0
		if ("0".equals(hour) && "0".equals(minute) && "0".equals(second)){
			if(type.equals("2")){
         	sb.append("<em class='volume'>0</em>"); 
        }else{
        	sb.append("0"); 
        }
			sb.append("��");
			return sb;
		}
 
    if(!"0".equals(hour)){
        
        hour = changeTime(hour);
        if(type.equals("2")){
        	sb.append("<em class='volume'>"+hour+"</em>"); 
        }else{
        	sb.append(hour);
        }
			sb.append("�ð�");
		}
		if(!"0".equals(minute)){
		    
		 	 minute = changeTime(minute);
   		 if(type.equals("2")){
         	sb.append("<em class='volume'>"+minute+"</em>"); 
         }else{
         	sb.append(minute);
         }
			 sb.append("��");
		}
		if((!"0".equals(second)) && "0".equals(minute) && "0".equals(hour)){ //�� ǥ��
		    
		 	second = changeTime(second);
		 	if(type.equals("2")){
         	sb.append("<em class='volume'>"+second+"</em>"); 
        }else{
        	sb.append(second);
        }
			sb.append("��");    	
		}
	    return sb;
	}  
 	
 	public static String getPercentClass(String percent){
 		 int classPercent = 0;
		 
		 if (percent != null && !percent.equals("0")){
		     classPercent = 20 * Integer.valueOf(percent)/100;
		 }
		 
 		return "p" + String.valueOf(classPercent);
 	}
 	
 	
 	/**
 	 * �׷����� ��뷮,�ܿ����� ǥ�� 
 	 * @param data ��������Ÿ
 	 * @param hm '�ð�','��','��' ��
 	 * @param unitCode ����
 	 * @param type ��뷮(1), �ܿ���(2)
 	 * @return String
 	 */	
 	 public static String makeDataStringMb(String data, String type ){
 	    
 	    StringBuffer sb = new StringBuffer();
		
		float fData = Float.parseFloat(data);
            
             
		// 1KB ~ 1MB �̸�
		if(fData < 1024){
                 
                 
			data = NumberUtil.format(fData, "###,###,###,##0");
			if(type.equals("2")){
				sb.append("<em class='volume'>"+data+"</em>"); 
			}else{
				sb.append(data);
			}
			sb.append("KB");
    	         
		}else{
			fData = fData /1024;
			data = NumberUtil.format(fData, "###,###,###,##0");
                 
			if(type.equals("2")){
				sb.append("<em class='volume'>"+data+"</em>"); 
			}else{
				sb.append(data);
			}
			sb.append("MB");
        }	         
	         
 	     
 	     return sb.toString();
 	 }  
  	
  	// �ð� �տ� '0' �� ǥ�� ����
  	// 09�ð� -> 9�ð�, 05�� -> 5�� 
  	public static String changeTime(String time){
  	    
  	   for (int i=0; i < time.length(); i++){
            
            if (time.substring(0) != null && "0".equals(time.substring(0, 1))){
                time = time.substring(1, time.length());
            }
        }
  	    return time;
  	}
	private String getRemainDay(){
	   Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("JST"));
	   String remainDay = String.valueOf(cal.getActualMaximum(Calendar.DAY_OF_MONTH) - cal.get(Calendar.DATE));
	   
	   return remainDay;
	}
%>