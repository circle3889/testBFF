function ajaxCall(ajaxUrl, ajaxParam, type){
	$.ajax({
		type: "get",
		data : ajaxParam,
		dataType: "json",
		url: ajaxUrl,
		success: function(result) {
		    console.log("ajax success : " + type);
		    
		    //type에 따라 구분
		    if(type == "DIRECT"){
		    	
		    	setMainBanner(result, 'DIRECT');
		    	
		    }else if(type == "HOT&NEW"){
		    	
		    	setMainBanner(result, 'HOT&NEW');	
		    	
		    }else if(type == "NOTICE"){
		    	
		    	setMainNotice(result);
		    	
		    }else if(type == "GUIDE"){
		    	
		    	setMainGuide(result);
		    	
		    }else if(type == "MAIN"){
		    	
		    	setMain(result);
		    	
		    }
		    
		},
		error:function(result){
		    console.log("ajax error : " + type + " : " + result);
		}
	});
}

function goFreebillDetail() {
	location.href = "/freebill_detail.do";
}

function goLogin() {
	location.href = "/login.do";
}

function setMainBanner(result, type) {

	var obj;
	var html;

	if (type == 'DIRECT') {
		
		if (result.returnCode == "error") {

			html = "<span>" + result.returnMsg + "</span>";
			html += "<img style=\"width:50%;height:50%;text-align:center;\" src='/img/new_main/btn_floating_offer_close.png'/>";
			
			$('#tdirect_0').append(html);
			$('#tdirect_1').append(html);
			
		}else{

			obj = result.tdirectBannerList;
			
			for (i = 0; i < obj.length; i++) {
				html = "<span>" + obj[i].b_title_nm + "</span>";
				html += "<a href=\"javascript:goBanner('" + obj[i].b_link + "', '" + i + "');\" class='img' title='" + obj[i].b_alt + "'><img src='" + obj[i].b_img + "'/></a>";
				$('#tdirect_' + i).append(html);
			}
			
		}

	} else if (type == 'HOT&NEW') {
		
		if (result.returnCode == "error") {
			
			html = "<span>" + result.returnMsg + "</span>";
			html += "<img style=\"width:50%;height:50%;text-align:center;\" src='/img/new_main/btn_floating_offer_close.png'/>";
			
			$('#hotNew_0').append(html);
			$('#hotNew_1').append(html);
			
		}else{

			obj = result.hotNewList;

			for (i = 0; i < obj.length; i++) {
				html = "<a href=\"javascript:goBanner('" + obj[i].b_link + "', '" + i + "');\" class='img' title='" + obj[i].b_alt + "'><img src='" + obj[i].b_img + "'/></a>";
				$('#hotNew_' + i).append(html);
			}
			
		}

	}

}

function setMainNotice(result) {

	var obj;
	var html;
	
	if (result.returnCode == "error") {
		
		html = "<li>" + result.returnMsg + "</li>";
		$('#notice ul').append(html);
		$('#notice ul li:first').addClass('current');
		
	}else{

		obj = result.noticeList;

		for (i = 0; i < obj.length; i++) {
			html = "<li><a style='font-weight:normal;' href='" + obj[i].notice_link + "'>" + obj[i].notice_txt + "</a></li>";
			$('#notice ul').append(html);
		}

		$('#notice ul li:first').addClass('current');
		
	}

}

function setMainGuide(result) {

	if (result.returnCode == "error") {
		html = "<li class=\"on\" style=\"text-align:center;\">" + result.returnMsg + "</li>";
		$('.like_this_type').append(html);

	} else {
		var obj = result.guideList;
		var html;

		for (i = 0; i < obj.length; i++) {
			html = "<li id=\"banner" + i + "\" class=\"on\"><a href=\"http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0122&viewId=V_CMIS1091&cntsId=" + obj[i].cntsId + "&mainMenu=Y\" title=\"" + obj[i].cntsNm + "\">" + obj[i].cntsNm + "</a></li>";
			$('.like_this_type').append(html);
		}
	}

}

function setMain(result) {
	
	if (result.returnCode == "error") {
		
		$("#mainSvcNum").text("error");
		$("#mainCustNm").text("error");
		
	}else{
		$("#mainSvcNum").text(replaceSvcNum(result.main.svcNum));
		$("#mainCustNm").text(result.main.custNm);
		
		if("Z" != result.main.cust_grade){
			html = "<button id=\"b_sms\" class=\"ico_comm\" onclick=\"javascript:freeSms()\">무료문자</button>";
			$("#mainCustArea").append(html);
		}
		
	}

}

function replaceSvcNum(sSvc_num){
	
	if(sSvc_num == null || sSvc_num == ""){
		return "";
	}else{
		
      if (sSvc_num.length == 11 ) {
	      return sSvc_num.substring( 0, 3 ) + "-" + sSvc_num.substring( 3, 7 ) + "-" + sSvc_num.substring( 7 );
      }else{
    	  return sSvc_num;
      }
	}
	
}



function goBanner(link, billyn) {
	if ("0" == billyn) {
		if (confirm("3G/LTE망 사용 시 데이터 요금이 발생됩니다.")) {
			location.href = "http://" + link;
		}
	} else {
		location.href = "http://" + link;
	}
}

function freeSms(){//메인 무료문자 통계
	alert('무료문자 이동');
	//location.href= "/normal.do?serviceId=SDUMMY0001&viewId=V_CENT0002&mainMenu=Y";
}