<%@ page language="java" contentType="text/html;charset=EUC-KR" session="false" %>
<!doctype html>
<html lang="ko">
<head>
	<meta charset="euc-kr" />
	<meta http-equiv="Cache-Control" content="no-cache" />
	<meta name="format-detection" content="telephone=no">
	<meta id="viewport" name="viewport" content="user-scalable=yes, initial-scale=1.0, width=device-width">
	<title>Home | T world</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/new_layout.css" />
	<link rel="stylesheet" type="text/css" href="/inc/css/new_main.css">
	<link rel="stylesheet" type="text/css" href="/inc/css/tworld_spinner.css" />
	<link rel="stylesheet" type="text/css" href="/inc/css/mtworld.swipe.css">
	<script type="text/javascript" src="/inc/js/jquery-1.7.2.min.js"></script>	
	<script type="text/javascript" src="/inc/js/common.js"></script>		
	<script type="text/javascript" src="/inc/js/mytworld.js"></script>
	<script type="text/javascript" src="/inc/js/recommend/xtvid.js"></script>	
	<script type="text/javascript" src="/inc/js/suggest_js_main.js"></script>
	<script type="text/javascript" src="/inc/js/mtworld.swipe_banners_tweb.js"></script>
	<script type="text/javascript" src="/inc/js/mtworld.line_banners.js"></script>
</head>
<style>
.rem_con1 > a{width:31%;height:auto;float:left;margin:18px 5px 0 0;line-height:1.2;text-align:center}
.rem_con1 > a:last-of-type{margin-right:0}
.rem_con1 > a span,
.rem_con1 > a strong{display:block}
.rem_con1 > a .txt{height:26px;color:#000;font-size:11px}
.rem_con1 > a .txt em{color:#000}
.rem_con1 > a .graph{width:90%;height:5px;margin:10px 0 5px 5px;border-radius:5px;background-color:#eee}
.rem_con1 > a .graph span{position:relative;height:5px;float:right;border-radius:5px}
.rem_con1 > a .remain{color:#000;font-size:11px}
.rem_con1 > a .volume{font-size:14px;font-weight:bold;color:#ec1b43}
.rem_con1 .data{margin-left:2.5%}
.rem_con1 .data .graph span{background-color:#68c0cd}
.rem_con1 .pic .graph span{background-color:#f5b044}
.rem_con1 .sms .graph span{background-color:#d655c2}
.rem_con1 .data_no{width:100%;height:78px;line-height:1.5;text-align:center;font-size:11px;color:#000;border-radius:10px;background-color:#eee}
.rem_con1 .data_no span{padding-top:12px}
.rem_con1 .mag_btn{width:25px;height:25px;background-position:-70px -40px;position:absolute;bottom:1px;right:0}
</style> 
<script language="JavaScript" type="text/JavaScript">
		console.log("freebil_main start");	
		var mainObj = parent.parent.document;
		var EVENT_TYPE_02 = 2;//잔여기본통화
		var MESSAGE_DONE_USE ="고객님의 SK텔레콤 서비스 회선을 <br/> 등록하신 후 이용하실 수 있습니다.";
		var MSG_LOAD_TYPE_02 = "잠시만 기다려 주세요.<br>잔여기본통화를 조회하는 중입니다.";
		var loginPage = 'http://m2.tworld.co.kr/jsp/common/loginout/view/app_login_alert.jsp';
		
		$(window).load(function(){
		    /*
			if(parent.getFreeCookis("freeBillData11111") == ""){
				console.log("cookis없음");
				parent.freeBillCookis("freeBillData11111","22222");
			}else{
				console.log("cookis있음")
			}
		    */
			if($('.main_tab > ul > li',parent.parent.document).length == 0){
				mainObj == parent.document;
			}else{
				$("#main_sub1",mainObj).hide(); 
				$("#main_sub2",mainObj).show();
				$("#main_sub1",mainObj).remove();
			}
			$.fnHideMore(true);
			if("N" =="Y"){
				removeMessage(true);
				var msg = "조회가 원활하지 않습니다. <br>잠시 후 다시 시도해 주세요." ;
				//로딩 메세지 출력창닫기
				toggleMsg(EVENT_TYPE_02 , msg, 'Y');
			}else{
				residuumTelMessage();
			}
		});	
		
		
		/**
		* 더보기 [+] 이미지 숨기 
		* false : 숨김
		* true  : 보이기
		*/
		$.fnHideMore = function(view){
			var $moreDiv = $('.main_tab > ul > li',mainObj);
			if(!view){
			   	$moreDiv.find('.mag_btn').css('display','none');
			}else {
				$moreDiv.find('.mag_btn').css('display','block');
			}
		}
	
		//잔여기본통화 응답값 처리
	    function residuumTelMessage(){
	   	  removeMessage(true);
	   	  
	   	  requestURL = 'N';
	   	  var prodNm = "33333"; 
	   	  var prodId = "44444";  	  
	   	  $("#p_Charge",mainObj).html("<a href='/normal.do?serviceId=S_PROD2001&viewId=V_PROD2001&prod_id="+prodId+"' ga:ca='MTA_main' ga:ac='상단메뉴' title="+prodNm+">"+prodNm+"</a>");
	 	 /**
	   	  * - 조회실패시  메세지 출력
	   	  * - 세션종료시 로그인 페이지로 이동처리 
	   	  */
	   	  if(sign(EVENT_TYPE_02)){
	   	  	return true;
	   	  }
	   
   	      var V_Check = false;
   	      var S_Check = false;
   	      var D_Check = false;
   	      <%
   	  		 //for(int i=0, len=freeBillList.size(); i<len; i++){
   	  			//HashMap resultData = (HashMap) freeBillList.get(i);
   	      %>
				var freeBillNm = "aaa<%//=resultData.get("freeBillNm")%>";
				var freeBillCd = "bbb<%//=resultData.get("freeBillCd")%>";
				var percent    = "ccc<%//=resultData.get("percent")%>";
				var use        = "Y<%//=resultData.get("use")%>";
				var remain     = "N<%//=resultData.get("remain")%>";
			    //grap barchart 그릴영역 계산
				if(percent == ''){
					percent = 0;
				}else {
					percent = 100 - parseInt(percent);
				}
				
				if("V" == freeBillCd){ 		  //음성/영상
				
					console.log ("voice" + remain);
					remain = changeVoiceRemain(remain);
				
					V_Check = true;
					$("#v_call_h4").html(freeBillNm);
					$("#v_call_remain").html(remain);
					$('#graph_bar1').attr("style", "width:"+percent+"%");
					
					//return true;
					
				}else if("S" == freeBillCd){  //SMS/MMS
				
					S_Check = true;
					$("#sms_mms_h4").html(freeBillNm);
					$('#graph_bar2').attr("style", "width:"+percent+"%");
					
					
					//문자일경우 출력
					if(checkData(remain)=='Y'){
						$("#sms_mms_remain").html(remain);
						//return true;
					}
					
					//데이터 종류별로 구분출력함
					//(금액 , 건수) 구별 처리함
					if(freeBillNm.match(/원/g)){
						$("#sms_mms_remain").html(commify(remain)+"원");
					}else if(freeBillNm.match(/건/g)){
						$("#sms_mms_remain").html(commify(remain)+"건");
					}else {
						$("#sms_mms_remain").html(remain);
					}
					
					//return true;
					
				}else if("D" == freeBillCd){  //데이터통화
				
					D_Check = true;
					$("#d_call_h4").html(freeBillNm);
					$('#graph_bar3').attr("style", "width:"+percent+"%");
					
					if( remain == ''){
						remain = '0';
					}
				
					//문자일경우 출력
					if(checkData(remain)=='Y'){
						$("#d_call_remain").html(remain);
						//return true;
					}
					
					console.log ("--remain--" + remain);
					var size = getNumString(remain);
					var tempSize = parseFloat(size);
					
					console.log ("--size--" + size);
					console.log ("--tempSize--" + tempSize);
					var sizeK = 0;
					var unit = "";
					if(tempSize < 1024){
						unit = "KB";
						sizeK = Math.floor(tempSize);
						
					}else{
					
						 // 1MB (1024KB) ~ 1,023MB (1024*1024)
		                 // 소수점은 버림 
		                 if ((1024 <= tempSize ) && ( tempSize < (1024 * 1024))){
		                 	 console.log (" 1024MB 미만");
		                     sizeK = Math.floor(tempSize /1024);
		                     console.log ("===================== 계산 후 sizeK" + sizeK);
		        	         unit = "MB";
							 
		                 }
		                 
		                 // 1GB (1024MB) ~ 1,023GB (1024*1024*1024) 
		        	     // 숫자 표시를 GB
		        	     // 표시하는 마지막 소수점이 0이면 표시 안함
		                else if ( (1024*1024 <= tempSize ) && ( tempSize < (1024 * 1024 * 1024))){
		                 
		                 	  console.log (" 1024GB 미만");
		                 	  sizeK = tempSize /1024/1024;
		                 	  unit = "GB";
		                 	  console.log ("===================== 계산 후 sizeK" + sizeK);
		        	          
		        	          
		        	           // 1,000 이상은 소수점 표시 안함
		        	          if (sizeK >= 1000) {
                         
		                         sizeK = Math.floor(sizeK);
		                         console.log("===================== sizeK >= 1000 계산 후 sizeK" + sizeK);
		                         
		                      // 100 이상은 소수점 한자리 (두자리 버림)
		                      } else if ( (100 <= sizeK) && (sizeK < 1000)){
		                         
		                         sizeK = sizeK.toFixed(1);
		                         console.log("===================== 100 이상은 소수점 한자리  sizeK" + sizeK);
		                         
		                       // 1~99 소수점 두자리 표시 (세자리 버림)
		                      } else if ( (1 <= sizeK) && (sizeK < 100)){
		                       
		                         sizeK = sizeK.toFixed(2);
		                         console.log("===================== 1~99 소수점 두자리  sizeK" + sizeK);
		
		                      }
		                 }
		                 $("#d_call_remain").html(commify(sizeK)+unit);
        	         }
					//return true;
				}
   	      <%
   	      	//}
   	      %>
   	       
		   //////////////////////////////////////////////////
		   // xml응답 (음성,문자,데이터) 값중에 값이 누락이 될 경우 //
		   // 메세지 처리                                                              //
		   //////////////////////////////////////////////////
		   var msgHTML = '';
		   //음성
		   if( !V_Check ){
		   	  $("#v_con").hide();
		   	  $('#v_call').append("<div class='data_no' id='v_msg'><span>현재 음성/영상<br>잔여기본통화<br>정보가 없습니다.</span></div>");
		   }
		   
		   //문자
		   if( !S_Check ){
		   	  $("#s_con").hide();
		   	  $('#sms_mms').append("<div class='data_no' id='sms_msg'><span>현재 문자<br>잔여기본통화<br>정보가 없습니다.</span></div>");
		   }
		   
		   //데이터
		   if(!D_Check){
		   	  $("#d_con").hide();
		   	  $('#d_call').append("<div class='data_no' id='d_msg'><span>현재 데이터<br>잔여기본통화<br>정보가 없습니다.</span></div>");
		   }		   
		    toggleMsg(EVENT_TYPE_02, MSG_LOAD_TYPE_02, 'N');
	   }
	   
	   
	   /**
	   	  * - 조회실패시  메세지 출력
	   	  * - 세션종료시 로그인 페이지로 이동처리 
	   	  * - 미인증 회원 메세지 출력
	   	  */
		function sign(callType){
			 var resultCode =  1;
			 console.log(" sign resultCode =["+resultCode+"]");
			 console.log(" callType =["+callType+"]");
			 console.log(" EVENT_TYPE_02 =["+EVENT_TYPE_02+"]");
		 	 if(resultCode != 0){
		 	 	
		   	  	 if(resultCode == 999){
		   	  	 	mainObj.location.href = loginPage;
		   	  	 	return true;
		   	  	 }
		   	  	 
		   	  	 //미인증 회원 메세지 처리
		   	  	 var resultMessage = "로그인 하세요.";
		   	  	 if(resultCode == 'A998'){
		   	  	 	resultMessage = MESSAGE_DONE_USE;
		   	  	 }
		   	  	 
				//잔여기본통화
				if(callType == EVENT_TYPE_02){
					resultMessage += "<div class='n_btn'><a href='http://m2.tworld.co.kr/normal.do?serviceId=S_BILL0070&viewId=V_CENT0261&domainVer=m2&menuId=2,2&mainMenu=Y' class='btn2' target='_top'  title='자세히 보기 바로가기'>자세히 보기</a></div>";
				}
				
		   	  	toggleMsg(callType, resultMessage, 'N');
		   	  	 
		   	  	 return true;
	   	  	}
	   	  	return false;
		}
		
		/**
		 * 화면에서 메시지를 보여주거나 제거한다.
		 */
		function toggleMsg(sector, msg, isView){
		    
		    console.log(sector + " | " + msg + " | " + isView);
			
			var contentElement;
			var msgElement;
			
			contentElement = $('.rem_con',mainObj);
			msgElement = $('#rem_sector > div.tab_con > .n_login',mainObj);	
			
			if(isView == 'Y'){
				var editMsg = "<div class='table_b'><p class='txt'>" + msg + "</p></div>";
				if(msg.indexOf("<div class='n_btn'>") > 0){
					editMsg = "<div class='table_b pa'><p class='txt'>" + msg + "</p></div>";
				}
				msgElement.html(editMsg);
				msgElement.css('display','block');
				contentElement.css('display','none');
				
			}else{
				msgElement.css('display','none');
				contentElement.css('display','block');
			}				
		}
		
		/** 
	    * 잔여기본통화 UI초기화 
	    */
	   function removeMessage(result){
	   
	      $("#v_msg").remove();
	      $("#sms_msg").remove();
	      $("#d_msg").remove();
	      
	   	  if(result){
		      $("#v_con").show();
		      $("#s_con").show();
		      $("#d_con").show();
	      }
	   }
	   // 잔여 음성 표시 
	// 초는 버림
	// 1시간 0분일 경우 '0' 은 표시 안함
	// 09 시간 05분 -> 9시간 5분
	function changeVoiceRemain (remain){
		// 초기값 : **시간**분**초 
		console.log ("changeVoiceRemain remain" + remain + remain.length);
		var vRemain = "";
 	    
 	    if (remain != null && remain.length > 9) {
 	    
 	    	var hour = remain.substring(0,2);
 	    	var minute = remain.substring(4, 6);
 	    	var second = remain.substring(7, 9);
 	    	
 	    	// 00은 표시안함 
 	    	if( hour != null && hour != "00"){
            
	            hour = changeTime(hour);
	 			vRemain = vRemain + hour + "시간";
	   		}
	   		 
	   		if( minute != null && minute != "00"){
	   		    
	   		 	minute = changeTime(minute);
	   			vRemain = vRemain + minute + "분";
	   		}
	   		 
	   		if( second != null && second != "00"){
	   		 
	   		 	// 1분 이상이면 초는 버림 -> 1분 이하일때만 초 단위 표시 
	   		 	if ((hour == null ||  hour == "") && (minute == null || minute == "")){
	   		 		second = changeTime(second);
	   		    	vRemain = vRemain + second + "초";
	   		 	}
	   		 	
	   		}
		
			// 00시간00분00초->0초 
	   		if (hour == "00" && minute == "00" && second == "00"){
	   		    vRemain = "0초";
	   		}
 	     }
        
 	     return vRemain;
	
	
	}
	
	// 09시간 05분 -> 9시간 5분으로 표시 
	function changeTime(time){
 	    
 	   for (var i=0; i < time.length; i++){
           if (time.substring(0) != null && time.substring(0, 1) == "0"){
               time = time.substring(1, time.length);
               console.log ("after hour ===" + time);
           }
       }
 	   return time;
 	}
</script>		
<body>
	<div class="rem_con1">
		<a href="http://m2.tworld.co.kr/normal.do?serviceId=S_BILL0070&viewId=V_CENT0261&domainVer=m2&menuId=2,2&mainMenu=Y" target="_top" class="data" id="d_call" title="잔여기본통화 바로가기">
			<span id="d_con" style="display:block">
			<span class="txt"><em id="d_call_h4">데이터통화 2.2GB 무료</em></span>
			<div class="graph"><span class="graph_bar" id="graph_bar3" style="width:50%;"></span></div><!-- style="width:;" bar퍼센트 -->
			<span class="remain">잔여</span>
				<strong class="volume" id="d_call_remain">1.45GB</strong>
			</span>
		</a>	
						
		<a href="http://m2.tworld.co.kr/normal.do?serviceId=S_BILL0070&viewId=V_CENT0261&domainVer=m2&menuId=2,2&mainMenu=Y" target="_top" class="pic" id="v_call" title="잔여기본통화 바로가기">
			<span id="v_con" style="display:block">
			<span class="txt"><em id="v_call_h4">영상, 부가전화 50분</em></span>
			<div class="graph"><span class="graph_bar" id="graph_bar1" style="width:30%;"></span></div><!-- style="width:;" bar퍼센트 -->
			<span class="remain">잔여</span>
				<strong class="volume" id="v_call_remain">38분</strong>
			</span>
		</a>
							
		<a href="http://m2.tworld.co.kr/normal.do?serviceId=S_BILL0070&viewId=V_CENT0261&domainVer=m2&menuId=2,2&mainMenu=Y" target="_top" class="sms" id="sms_mms" title="잔여기본통화 바로가기">
			<span id="s_con" style="display:block">
				<span class="txt"><em id="sms_mms_h4">SMS/MMS/ⓜ메신저 기본제공</em></span>
			<div class="graph"><span class="graph_bar" id="graph_bar2" style="width:90%;"></span></div><!-- style="width:;" bar퍼센트 -->
			<span class="remain">잔여</span>
				<strong class="volume" id="sms_mms_remain">기본제공</strong>
			</span>
		</a>
	</div>
</body>
</html>