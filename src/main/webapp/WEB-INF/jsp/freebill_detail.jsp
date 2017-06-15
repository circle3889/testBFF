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
	<title>무료통화(조회) &lt; 잔여기본통화 | T world</title>
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
		    // 서킷브레이커에의해 에러 처리해야하나?
		    console.log("result Error: " + result.error);
		}
	});
	<% }else{ %>
		alert('세션이 종료되었습니다.');
		location.href = "/";	
	<% } %>
    
    //MB/GB 변환
	$("#mbGbData").click(function(){
		if(GbDataYn =="Y"){
			GbDataYn= "N";
			$(this).text("GB로 확인하기");
			$(".gbdata").hide();
			$(".mbdata").show();
			$("#toastBox").fadeIn().find("p").html("데이터를 MB(메가바이트)<br>단위로 표시합니다.");
		}else{
			GbDataYn ="Y";
			$(this).text("MB로 확인하기");
			$(".gbdata").show();
			$(".mbdata").hide();
			$("#toastBox").fadeIn().find("p").html("1,024MB 이상은 GB(기가바이트)<br>단위로 표시합니다.");
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
				D_List += "				<span class=\"limit\">무제한</span>";
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
				D_List += "				<span class=\"use\"><span role=\"text\">사용 : " + useGbQtyList[i] + "</span></span>";
				D_List += "			</span>";
				D_List += "			<span class=\"ctLst mbdata\" style=\"display:none\">";
				D_List += "				<span class=\"use\"><span role=\"text\">사용 : " + useMbQtyList[i] + "</span></span>";
				D_List += "			</span>";
				D_List += "		</a>";
				D_List += "	</div>";
				D_List += "</li>";
				
			}else if("무제한" != remainQty){
				
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
				D_List += "			<span class=\"rem\"><span role=\"text\">잔여 : " + remainGbQtyList[i] + "</span></span>";
				D_List += "			<span class=\"use\"><span role=\"text\">사용 : " + useGbQtyList[i] + "</span></span>";
				D_List += "		</span>";
				D_List += "		<span class=\"ctLst mbdata\" style=\"display:none\">";
				D_List += "			<span class=\"rem\"><span role=\"text\">잔여 : " + remainMbQtyList[i] + "</span></span>";
				D_List += "			<span class=\"use\"><span role=\"text\">사용 : " + useMbQtyList[i] + "</span></span>";
				D_List += "		</span>";
				D_List += "	</div>";
				D_List += "</li>";
				
			}else{
				
				D_List += "<li>";
				D_List += "	<div class=\"graphWrap\">";
				D_List += "		<div class=\"clearfix\">";
				D_List += "			<div class=\"circlePct \">";
				D_List += "				<span class=\"limit\">무제한</span>";
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
					D_List += "					<span class=\"use\"><span role=\"text\">사용 : " + useGbQtyList[i] + "</span></span>";
					D_List += "				</span>";
					D_List += "				 <span class=\"ctLst mbdata\" style=\"display:none\">";
					D_List += "					<span class=\"use\"><span role=\"text\">사용 : " + useMbQtyList[i] + "</span></span>";
					D_List += "				</span>";
				}
				
				D_List += "	</div>";
				D_List += "</li>";
			}
			
			$("#D_List").append(D_List);
			
		}else if(codeType == "V" || codeType == "VP" || codeType == "P"){
			
			V_List = "";
			
			if("무제한" != remainQty) {
				
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
				V_List += "			<span class=\"rem\"><span role=\"text\">잔여 : " + remainGbQtyList[i] + "</span></span>";
				V_List += "			<span class=\"use\"><span role=\"text\">사용 : " + useGbQtyList[i] + "</span></span>";
				V_List += "		</span>";
				V_List += "	</div>";
				V_List += "</li>";
				
			}else{
				
				V_List += "<li>";
				V_List += "	<div class=\"graphWrap\">";
				V_List += "		<div class=\"clearfix\">";
				V_List += "			<div class=\"circlePct \">";
				V_List += "				<span class=\"limit\">무제한</span>";
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
				V_List += "			<span class=\"use\"><span role=\"text\">사용 : " + useGbQtyList[i] + "</span></span>";
				V_List += "		</span>";
				V_List += "	</div>";
				V_List += "</li>";
				
			}
			
			$("#V_List").append(V_List);
			
		}else if(codeType == "S"){
			
			S_List = "";
			
			if("무제한" != remainQty) {
				
				S_List += "<li>";
				
				if(remainQty.indexOf("기본제공") > 0) {
					
					S_List += "<div class=\"graphWrap\">";
					S_List += "	<div class=\"clearfix\">";
					S_List += "		<div class=\"circlePct \">";
					S_List += "			<span class=\"limit\">무제한</span>";
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
					S_List += "		<span class=\"use\"><span role=\"text\">기본제공량</span></span>";
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
					S_List += "		<span class=\"rem\"><span role=\"text\">잔여 : " + remainGbQtyList[i] + "</span></span>";
					S_List += "		<span class=\"use\"><span role=\"text\">사용 : " + useGbQtyList[i] + "</span></span>";
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
				S_List += "				<span class=\"limit\">무제한</span>";
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
				
				if("무제한" != remainQty) {
					
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
					ETC_List += "			<span class=\"rem\"><span role=\"text\">잔여 : " + remainGbQtyList[i] + "</span></span>";
					ETC_List += "			<span class=\"use\"><span role=\"text\">사용 : " + useGbQtyList[i] + "</span></span>";
					ETC_List += "		</span>";
					ETC_List += "	</div>";
					ETC_List += "</li>";
					
				}else{
					
					ETC_List += "<li>";
					ETC_List += "	<div class=\"graphWrap\">";
					ETC_List += "		<div class=\"clearfix\">";
					ETC_List += "			<div class=\"circlePct \">";
					ETC_List += "				<span>무제한</span>";
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
			<div class="h1_wrap"><h1 onClick="getRandom();"><span id="title" tabindex="0">잔여기본통화</span></h1></div>
			<button onClick="javascript:goAppBack();" class="head_back_page" id="backBtn">뒤로가기</button>
			<p class="search_allmenu">
                <button class="head_search" onClick="javascript:fnSearch();">검색</button>
                <button class="head_allmenu" onClick="javascript:fnMenuAll();">전체메뉴보기</button>
            </p>
        </div>
    </div>
	<section>
		<div id="content">
			<div class="contbox conifr">
			
				<!-- START - MultiNumber SelectBox -->
			    <form method="post" name="frmMultiNumSelect" action="/freebill_detail.do">
					<dl class="my_line_number line_number_border">
						<dt>나의 회선번호</dt>
						<dd class="">
							<div class="select_type1" style="width: 100%;">
								<select name='selMultiNum' id='selMultiNum' class='slct_ch' title='나의 회선번호' style='background-image: none' disabled="disabled" >
<%-- 									<% for(String svcNum : svcNumList){ %> --%>
<%-- 									<option value="<%=svcNum%>" <%= selectedSvcMgmtNum.get("svcNum").equals(svcNum) ? "selected" : "" %>><%=svcNum%></option> --%>
<%-- 									<% } %> --%>
									<option value="<%= sSvcMgmtNum %>" selected><%= sSvcMgmtNum %></option>
								</select>
							</div>
							<a href='javascript:void(0);' class='sel_ok'>
								<img src='/img/common/select_ok_btn.gif' alt='확인' />
							</a>
						</dd>
					</dl>
				</form>
			    <!-- END - MultiNumber SelectBox -->
				
				<!-- 2015-10-26 [s] 추가 -->
					
	<!-- 2016-12-23 추가_01 [s] -->
	<div class="contbox newRemainBasic">
		<div class="inquiryArea">
			<div class="cont">
				<strong class="chargeName" id="prodNm"></strong> 
				<p class="remainTerm" role="text">이번달 잔여기간은 <em class="days" id="remainDay"><%= getRemainDay() %>일</em> 남았습니다.</p>
			</div>
		</div>
		<!-- 데이터 영역 -->
		<div class="sectionBoxWrap data" id="D_List_Area" style="display:none;">
			<div class="titArea">
				<h2>데이터</h2>
				<!-- 2017-02-20 수정_01 [s] -->
<!-- 				<button type="button" class="icoBtn icoBtnB" id="mbGbData" ga:ca="MTA_rate" ga:ac="잔여기본통화>데이터" ga:la="MB로 확인하기">MB로 확인하기</button> -->
				<!-- 2017-02-20 수정_01 [e] -->
			</div>
			<div class="sectionArea">
				<ul id="D_List">
				</ul>
			</div>
			<!-- 2017-02-01 추가_01 [s] -->
			<div id="toastBox"><p></p></div>
			<!-- 2017-02-01 추가_01 [e] -->
		</div>
		<!-- // 데이터 영역 -->
		<!-- 음성 영역 -->
		<div class="sectionBoxWrap voice" id="V_List_Area" style="display:none;">
			<div class="titArea">
				<h2>음성</h2>
			</div>
			<div class="sectionArea">
				<ul id="V_List">
				</ul>
			</div>
		</div>
		<!-- // 음성 영역 -->
		<!-- 문자 영역 -->
		<div class="sectionBoxWrap msg" id="S_List_Area" style="display:none;">
			<div class="titArea">
				<h2>문자</h2>
			</div>
			<div class="sectionArea">
				<ul id="S_List">
				</ul>
			</div>
		</div>
		<!-- // 문자 영역 -->
		
		<!-- 기타 영역 -->
		<div class="sectionBoxWrap etc" id="ETC_List_Area" style="display:none;">
			<div class="titArea">
				<h2>기타</h2>
			</div>
			<div class="sectionArea">
				<ul id="ETC_List">
				</ul>
			</div>
		</div>
		<!-- // 기타 영역 -->
		
		<div class="menuBox">
			<div class="titArea">
				<h2>관련 메뉴를 이용해 보세요</h2>
			</div>
			<ul class="lstArea">
				<!-- //쿠폰 사용 가능자에게만 노출 -->
				<li><a href="javascript:alert('실시간 요금조회 이동')" onclick="event.stopPropagation();ga('send','event','MTA_rate','잔여기본통화>하단메뉴', '실시간 요금조회');" >실시간 요금조회</a></li>
				<li><a href="javascript:alert('월별 사용량 이동');" onclick="event.stopPropagation();ga('send','event','MTA_rate','잔여기본통화>하단메뉴', '월별 사용량');" >월별 사용량</a></li>
				<li><a href="javascript:alert('T끼리 데이터 이동');" onclick="event.stopPropagation();ga('send','event','MTA_rate','잔여기본통화>하단메뉴', 'T끼리 데이터 선물');" >T끼리 데이터 선물</a></li>
			</ul>
		</div>
		
		<div class="toggleSection">
			<div class="titBox">
				<h3 class="subTit2">이용안내</h3>
			</div>
			<ul class="toggleWrap">
				<li class="item">
					<strong>실제 청구금액과 차이가 있을 수 있습니다.</strong>
					<p class="tidtPara">- 잔여기본통화는 실제 청구금액과 다소 차이가 있을 수 있으니 단순 참고용으로 활용하시기 바랍니다.</p>
				</li>
				<li class="item">
					<strong>월 중 변경 시 초과 요금이 발생될 수 있습니다.</strong>
					<ul class="tidtList">
						<li class="fcRed">- 월 중 요금제 변경 및 일시 정지를 할 경우 기본 제공되는 음성/문자/데이터 등은 일할 계산되어 제공됩니다.</li>
						<li class="fcRed">- 요금제에 따라 일할 계산된 기본제공 음성/문자/데이터 혜택이 반영되어 있지 않을 수 있으니 주의하시기 바랍니다.</li>
						<li>- 월 중 정지이력이 있을 시 잔여기본통화의 잔여량이 다소 변경될 수 있으니 참고 부탁드립니다.</li>
					</ul>
				</li>
				<li class="item">
					<strong>일부 이월된 잔여기본통화는 다음달에 조회 가능합니다.</strong>
					<p class="tidtPara">- 잔여기본통화는 이월되지 않으며 일부 이월 가능한 요금제의 이월된 잔여기본통화는 다음달 5일부터 사용 및 조회가 가능합니다.</p>
				</li>
			</ul>
		</div>
	</div>
				</div> 
				<!-- 2015-10-26 [e] 추가 -->
				
				
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
					isFBannerShow = toapp.checkConfirmDate("com.skt.prod.remainBasicBanner","86400000"); //두번째 파라미터는 서버에서 불러와 셋팅 해야 합니다.
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
					location.href = "toapp.settingpackageconfirmdate:com.skt.prod.remainBasicBanner"; //하루동안 기준 시각.
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
	<!-- 2016-06-27 추가_03 [e] -->

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
         sb.append("원");
    }else if("160".equals(unitCode)){
   	if(type.equals("2")){
       	sb.append("<em class='volume'>"+data+"</em>"); 
   	}else{
       	sb.append(data);
   	}
       sb.append("팥");	   	         
     }else if("140".equals(unitCode)){
         
        //data = StringUtil.replace(data, ",", "");
        float fData = Float.parseFloat(data);
       
        
        // 1KB ~ 1MB 미만
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
            // 소수점은 버림 
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
   	     // 숫자 표시를 GB
   	     // 표시하는 마지막 소수점이 0이면 표시 안함
            } else if ( (1024*1024 <= fData ) && ( fData < (1024 * 1024 * 1024))){
                
                fData = fData /1024/1024;
                
                // 1,000 이상은 소수점 표시 안함
                if (fData >= 1000) {
                    
                    data = NumberUtil.format(fData, "###,###,###,###");
                    
                // 100 이상은 소수점 한자리 (두자리 버림)
                } else if ( (100 <= fData) && (fData < 1000)){
                    
                    data = NumberUtil.format(fData, "###.#");
                    
                 // 1~99 소수점 두자리 표시 (세자리 버림)
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
        sb.append("건");
     }
     
     return sb.toString();
 }         
	
	/**
	 * 그래프의 사용량,잔여량을 표기  (단위가 '분'일 경우 표현) 
	 * @param hm '시간','분','초' 값
	 * @param type 사용량(1), 잔여량(2)
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
    
 // 00시간00분00초->0
		if ("0".equals(hour) && "0".equals(minute) && "0".equals(second)){
			if(type.equals("2")){
         	sb.append("<em class='volume'>0</em>"); 
        }else{
        	sb.append("0"); 
        }
			sb.append("초");
			return sb;
		}
 
    if(!"0".equals(hour)){
        
        hour = changeTime(hour);
        if(type.equals("2")){
        	sb.append("<em class='volume'>"+hour+"</em>"); 
        }else{
        	sb.append(hour);
        }
			sb.append("시간");
		}
		if(!"0".equals(minute)){
		    
		 	 minute = changeTime(minute);
   		 if(type.equals("2")){
         	sb.append("<em class='volume'>"+minute+"</em>"); 
         }else{
         	sb.append(minute);
         }
			 sb.append("분");
		}
		if((!"0".equals(second)) && "0".equals(minute) && "0".equals(hour)){ //초 표기
		    
		 	second = changeTime(second);
		 	if(type.equals("2")){
         	sb.append("<em class='volume'>"+second+"</em>"); 
        }else{
        	sb.append(second);
        }
			sb.append("초");    	
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
 	 * 그래프의 사용량,잔여량을 표기 
 	 * @param data 원본데이타
 	 * @param hm '시간','분','초' 값
 	 * @param unitCode 단위
 	 * @param type 사용량(1), 잔여량(2)
 	 * @return String
 	 */	
 	 public static String makeDataStringMb(String data, String type ){
 	    
 	    StringBuffer sb = new StringBuffer();
		
		float fData = Float.parseFloat(data);
            
             
		// 1KB ~ 1MB 미만
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
  	
  	// 시간 앞에 '0' 은 표시 안함
  	// 09시간 -> 9시간, 05분 -> 5분 
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