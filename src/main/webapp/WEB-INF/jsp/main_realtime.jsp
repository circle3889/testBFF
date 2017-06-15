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
		var EVENT_TYPE_02 = 2;//�ܿ��⺻��ȭ
		var MESSAGE_DONE_USE ="������ SK�ڷ��� ���� ȸ���� <br/> ����Ͻ� �� �̿��Ͻ� �� �ֽ��ϴ�.";
		var MSG_LOAD_TYPE_02 = "��ø� ��ٷ� �ּ���.<br>�ܿ��⺻��ȭ�� ��ȸ�ϴ� ���Դϴ�.";
		var loginPage = 'http://m2.tworld.co.kr/jsp/common/loginout/view/app_login_alert.jsp';
		
		$(window).load(function(){
		    /*
			if(parent.getFreeCookis("freeBillData11111") == ""){
				console.log("cookis����");
				parent.freeBillCookis("freeBillData11111","22222");
			}else{
				console.log("cookis����")
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
				var msg = "��ȸ�� ��Ȱ���� �ʽ��ϴ�. <br>��� �� �ٽ� �õ��� �ּ���." ;
				//�ε� �޼��� ���â�ݱ�
				toggleMsg(EVENT_TYPE_02 , msg, 'Y');
			}else{
				residuumTelMessage();
			}
		});	
		
		
		/**
		* ������ [+] �̹��� ���� 
		* false : ����
		* true  : ���̱�
		*/
		$.fnHideMore = function(view){
			var $moreDiv = $('.main_tab > ul > li',mainObj);
			if(!view){
			   	$moreDiv.find('.mag_btn').css('display','none');
			}else {
				$moreDiv.find('.mag_btn').css('display','block');
			}
		}
	
		//�ܿ��⺻��ȭ ���䰪 ó��
	    function residuumTelMessage(){
	   	  removeMessage(true);
	   	  
	   	  requestURL = 'N';
	   	  var prodNm = "33333"; 
	   	  var prodId = "44444";  	  
	   	  $("#p_Charge",mainObj).html("<a href='/normal.do?serviceId=S_PROD2001&viewId=V_PROD2001&prod_id="+prodId+"' ga:ca='MTA_main' ga:ac='��ܸ޴�' title="+prodNm+">"+prodNm+"</a>");
	 	 /**
	   	  * - ��ȸ���н�  �޼��� ���
	   	  * - ��������� �α��� �������� �̵�ó�� 
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
			    //grap barchart �׸����� ���
				if(percent == ''){
					percent = 0;
				}else {
					percent = 100 - parseInt(percent);
				}
				
				if("V" == freeBillCd){ 		  //����/����
				
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
					
					
					//�����ϰ�� ���
					if(checkData(remain)=='Y'){
						$("#sms_mms_remain").html(remain);
						//return true;
					}
					
					//������ �������� ���������
					//(�ݾ� , �Ǽ�) ���� ó����
					if(freeBillNm.match(/��/g)){
						$("#sms_mms_remain").html(commify(remain)+"��");
					}else if(freeBillNm.match(/��/g)){
						$("#sms_mms_remain").html(commify(remain)+"��");
					}else {
						$("#sms_mms_remain").html(remain);
					}
					
					//return true;
					
				}else if("D" == freeBillCd){  //��������ȭ
				
					D_Check = true;
					$("#d_call_h4").html(freeBillNm);
					$('#graph_bar3').attr("style", "width:"+percent+"%");
					
					if( remain == ''){
						remain = '0';
					}
				
					//�����ϰ�� ���
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
		                 // �Ҽ����� ���� 
		                 if ((1024 <= tempSize ) && ( tempSize < (1024 * 1024))){
		                 	 console.log (" 1024MB �̸�");
		                     sizeK = Math.floor(tempSize /1024);
		                     console.log ("===================== ��� �� sizeK" + sizeK);
		        	         unit = "MB";
							 
		                 }
		                 
		                 // 1GB (1024MB) ~ 1,023GB (1024*1024*1024) 
		        	     // ���� ǥ�ø� GB
		        	     // ǥ���ϴ� ������ �Ҽ����� 0�̸� ǥ�� ����
		                else if ( (1024*1024 <= tempSize ) && ( tempSize < (1024 * 1024 * 1024))){
		                 
		                 	  console.log (" 1024GB �̸�");
		                 	  sizeK = tempSize /1024/1024;
		                 	  unit = "GB";
		                 	  console.log ("===================== ��� �� sizeK" + sizeK);
		        	          
		        	          
		        	           // 1,000 �̻��� �Ҽ��� ǥ�� ����
		        	          if (sizeK >= 1000) {
                         
		                         sizeK = Math.floor(sizeK);
		                         console.log("===================== sizeK >= 1000 ��� �� sizeK" + sizeK);
		                         
		                      // 100 �̻��� �Ҽ��� ���ڸ� (���ڸ� ����)
		                      } else if ( (100 <= sizeK) && (sizeK < 1000)){
		                         
		                         sizeK = sizeK.toFixed(1);
		                         console.log("===================== 100 �̻��� �Ҽ��� ���ڸ�  sizeK" + sizeK);
		                         
		                       // 1~99 �Ҽ��� ���ڸ� ǥ�� (���ڸ� ����)
		                      } else if ( (1 <= sizeK) && (sizeK < 100)){
		                       
		                         sizeK = sizeK.toFixed(2);
		                         console.log("===================== 1~99 �Ҽ��� ���ڸ�  sizeK" + sizeK);
		
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
		   // xml���� (����,����,������) ���߿� ���� ������ �� ��� //
		   // �޼��� ó��                                                              //
		   //////////////////////////////////////////////////
		   var msgHTML = '';
		   //����
		   if( !V_Check ){
		   	  $("#v_con").hide();
		   	  $('#v_call').append("<div class='data_no' id='v_msg'><span>���� ����/����<br>�ܿ��⺻��ȭ<br>������ �����ϴ�.</span></div>");
		   }
		   
		   //����
		   if( !S_Check ){
		   	  $("#s_con").hide();
		   	  $('#sms_mms').append("<div class='data_no' id='sms_msg'><span>���� ����<br>�ܿ��⺻��ȭ<br>������ �����ϴ�.</span></div>");
		   }
		   
		   //������
		   if(!D_Check){
		   	  $("#d_con").hide();
		   	  $('#d_call').append("<div class='data_no' id='d_msg'><span>���� ������<br>�ܿ��⺻��ȭ<br>������ �����ϴ�.</span></div>");
		   }		   
		    toggleMsg(EVENT_TYPE_02, MSG_LOAD_TYPE_02, 'N');
	   }
	   
	   
	   /**
	   	  * - ��ȸ���н�  �޼��� ���
	   	  * - ��������� �α��� �������� �̵�ó�� 
	   	  * - ������ ȸ�� �޼��� ���
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
		   	  	 
		   	  	 //������ ȸ�� �޼��� ó��
		   	  	 var resultMessage = "�α��� �ϼ���.";
		   	  	 if(resultCode == 'A998'){
		   	  	 	resultMessage = MESSAGE_DONE_USE;
		   	  	 }
		   	  	 
				//�ܿ��⺻��ȭ
				if(callType == EVENT_TYPE_02){
					resultMessage += "<div class='n_btn'><a href='http://m2.tworld.co.kr/normal.do?serviceId=S_BILL0070&viewId=V_CENT0261&domainVer=m2&menuId=2,2&mainMenu=Y' class='btn2' target='_top'  title='�ڼ��� ���� �ٷΰ���'>�ڼ��� ����</a></div>";
				}
				
		   	  	toggleMsg(callType, resultMessage, 'N');
		   	  	 
		   	  	 return true;
	   	  	}
	   	  	return false;
		}
		
		/**
		 * ȭ�鿡�� �޽����� �����ְų� �����Ѵ�.
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
	    * �ܿ��⺻��ȭ UI�ʱ�ȭ 
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
	   // �ܿ� ���� ǥ�� 
	// �ʴ� ����
	// 1�ð� 0���� ��� '0' �� ǥ�� ����
	// 09 �ð� 05�� -> 9�ð� 5��
	function changeVoiceRemain (remain){
		// �ʱⰪ : **�ð�**��**�� 
		console.log ("changeVoiceRemain remain" + remain + remain.length);
		var vRemain = "";
 	    
 	    if (remain != null && remain.length > 9) {
 	    
 	    	var hour = remain.substring(0,2);
 	    	var minute = remain.substring(4, 6);
 	    	var second = remain.substring(7, 9);
 	    	
 	    	// 00�� ǥ�þ��� 
 	    	if( hour != null && hour != "00"){
            
	            hour = changeTime(hour);
	 			vRemain = vRemain + hour + "�ð�";
	   		}
	   		 
	   		if( minute != null && minute != "00"){
	   		    
	   		 	minute = changeTime(minute);
	   			vRemain = vRemain + minute + "��";
	   		}
	   		 
	   		if( second != null && second != "00"){
	   		 
	   		 	// 1�� �̻��̸� �ʴ� ���� -> 1�� �����϶��� �� ���� ǥ�� 
	   		 	if ((hour == null ||  hour == "") && (minute == null || minute == "")){
	   		 		second = changeTime(second);
	   		    	vRemain = vRemain + second + "��";
	   		 	}
	   		 	
	   		}
		
			// 00�ð�00��00��->0�� 
	   		if (hour == "00" && minute == "00" && second == "00"){
	   		    vRemain = "0��";
	   		}
 	     }
        
 	     return vRemain;
	
	
	}
	
	// 09�ð� 05�� -> 9�ð� 5������ ǥ�� 
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
		<a href="http://m2.tworld.co.kr/normal.do?serviceId=S_BILL0070&viewId=V_CENT0261&domainVer=m2&menuId=2,2&mainMenu=Y" target="_top" class="data" id="d_call" title="�ܿ��⺻��ȭ �ٷΰ���">
			<span id="d_con" style="display:block">
			<span class="txt"><em id="d_call_h4">��������ȭ 2.2GB ����</em></span>
			<div class="graph"><span class="graph_bar" id="graph_bar3" style="width:50%;"></span></div><!-- style="width:;" bar�ۼ�Ʈ -->
			<span class="remain">�ܿ�</span>
				<strong class="volume" id="d_call_remain">1.45GB</strong>
			</span>
		</a>	
						
		<a href="http://m2.tworld.co.kr/normal.do?serviceId=S_BILL0070&viewId=V_CENT0261&domainVer=m2&menuId=2,2&mainMenu=Y" target="_top" class="pic" id="v_call" title="�ܿ��⺻��ȭ �ٷΰ���">
			<span id="v_con" style="display:block">
			<span class="txt"><em id="v_call_h4">����, �ΰ���ȭ 50��</em></span>
			<div class="graph"><span class="graph_bar" id="graph_bar1" style="width:30%;"></span></div><!-- style="width:;" bar�ۼ�Ʈ -->
			<span class="remain">�ܿ�</span>
				<strong class="volume" id="v_call_remain">38��</strong>
			</span>
		</a>
							
		<a href="http://m2.tworld.co.kr/normal.do?serviceId=S_BILL0070&viewId=V_CENT0261&domainVer=m2&menuId=2,2&mainMenu=Y" target="_top" class="sms" id="sms_mms" title="�ܿ��⺻��ȭ �ٷΰ���">
			<span id="s_con" style="display:block">
				<span class="txt"><em id="sms_mms_h4">SMS/MMS/�ٸ޽��� �⺻����</em></span>
			<div class="graph"><span class="graph_bar" id="graph_bar2" style="width:90%;"></span></div><!-- style="width:;" bar�ۼ�Ʈ -->
			<span class="remain">�ܿ�</span>
				<strong class="volume" id="sms_mms_remain">�⺻����</strong>
			</span>
		</a>
	</div>
</body>
</html>