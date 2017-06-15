$(document).ready(function(){
	$(".notice.copyright").remove();
	$("body").append($("<div class='notice copyright'>" + 
			"<a href='http://m2.tworld.co.kr/normal.do?serviceId=S_ETC_0021&viewId=V_CMN_0004&domainVer=m2&menuId=8,2' class='bar'>이용약관</a>" + 
			"<a href='http://m2.tworld.co.kr/normal.do?serviceId=S_CMIS0033&viewId=V_CMIS0002' class='bar'>이용자 피해예방 센터</a>" + 
			"<a href='http://m2.tworld.co.kr/normal.do?serviceId=S_ETC_0066&viewId=V_CMN_0012&menuId=8,2&serNum=8&app=Y'>개인정보 처리방침</a>" + 
		"</div>"));
});