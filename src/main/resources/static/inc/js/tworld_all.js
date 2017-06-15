// <![CDATA[
$(document).ready(function(){
  $('#btnall').toggle(function(){
  	$(this).css('background-position','-50px -50px');
		$('#mall').addClass('mallblock');
		$('#mall').removeClass('mallnone');
  },function(){
		$(this).css('background-position','-50px 0');
		$('#mall').removeClass('mallblock');
		$('#mall').addClass('mallnone');
  })
	$('#mall').addClass('mallnone');
});
var menuall  ='<div id="mall" class="mallnone">'
	menuall +='<ul>'
	menuall +='<li>'
	menuall +='<h1>나의 정보</h1>'
	menuall +='<a href="/normal.do?serviceId=S_PHON0003&viewId=V_CENT0365&menuId=11">가입정보</a>' 
	menuall +='<a href="/normal.do?serviceId=S_PHON0070&viewId=V_CENT1068&menuId=12">약정할부정보</a>'
	menuall +='<a href="/normal.do?serviceId=S_BILL0001&viewId=V_CENT0024&menuId=13">이용서비스</a>'
	menuall +='</li>'
	
	menuall +='<li>'
	menuall +='<h1>요금조회</h1>'
	menuall +='<a href="/normal.do?serviceId=S_BILL0025&viewId=V_CENT0119&menuId=21">실시간요금</a>'
	menuall +='<a href="/normal.do?serviceId=S_BILL0070&viewId=V_CENT0261&menuId=22">잔여기본통화</a>'
	menuall +='<a href="/normal.do?serviceId=S_BILL0059&viewId=V_CENT0238&menuId=23">청구요금</a>'
	menuall +='<a href="/normal.do?serviceId=S_BILL0080&viewId=V_CENT1008&menuId=24">자녀요금</a>'
	menuall +='</li>'
	
	menuall +='<li>'
	menuall +='<h1>멤버십</h1>'
	menuall +='<a href="/normal.do?serviceId=SDUMMY0001&viewId=V_MBRS0003&menuId=31">MY멤버십</a>'
	menuall +='<a href="/normal.do?serviceId=SDUMMY0001&viewId=V_MBRS0099&menuId=32">멤버십안내</a>'
	menuall +='<a href="/normal.do?serviceId=SDUMMY0001&viewId=V_MBRS0097&menuId=33">T멤버십스토어</a>'
	menuall +='</li>'
	
	menuall +='<li>'
	menuall +='<h1>요금제</h1>'
	menuall +='<a href="/normal.do?serviceId=S_BILL0001&viewId=V_CENT0014&menuId=41">이용요금제</a>'
	menuall +='<a href="/normal.do?serviceId=S_PROD9001&viewId=V_PROD1001&menuId=42">요금제안내</a>'
	menuall +='<a href="/normal.do?serviceId=S_BILL0106&viewId=V_CENT0005&menuId=43">추천요금제</a>'
	menuall +='</li>'
	
	menuall +='<li>'
	menuall +='<h1>부가서비스</h1>'
	menuall +='<a href="/normal.do?serviceId=S_ADD_0017&viewId=V_CENT0021&menuId=51">이용서비스</a>'
    menuall +='<a href="/normal.do?serviceId=S_ADD_0017&viewId=V_CENT0004&menuId=52">추천서비스</a>'
	menuall +='</li>'
	
	menuall +='<li>'
	menuall +='<h1>T로밍</h1>'
	menuall +='<a href="/normal.do?serviceId=S_ROAM0003&viewId=V_ROAM0000&menuId=61">My로밍</a>'
	menuall +='<a href="/normal.do?serviceId=SDUMMY0002&viewId=V_ROAM0001&menuId=62">로밍안내</a>'
	menuall +='<a href="/normal.do?serviceId=S_PROD1002&viewId=V_ROAM0002&menuId=63&paramCtg1=1&paramCtg2=1200&paramCtg3=1205&paramCtg4=3,3,5">요금제/서비스</a>'
	menuall +='<a href="/normal.do?serviceId=SDUMMY0002&viewId=V_ROAM0005&menuId=64">로밍센터</a>'
	menuall +='</li>'
	
	menuall +='<li>'
	menuall +='<h1>고객센터</h1>'
	menuall +='<a href="/normal.do?serviceId=S_CMIS0017&viewId=V_CENT0099&menuId=71">지점/대리점</a>'
	menuall +='<a href="/normal.do?serviceId=S_CMIS0006&viewId=V_CENT0103&menuId=72">FAQ&nbsp;&nbsp;</a>'
	menuall +='</li>'
	
	menuall +='<li>'
	menuall +='<h1>공지사항</h1>'
	menuall +='<a href="/normal.do?serviceId=S_ETC_0021&viewId=V_CMN_0004&menuId=81">공지사항</a>'
	menuall +='</li>'
	
	menuall +='<li>'
	menuall +='<h1>T APP.</h1>'
	menuall +='<a href="/normal.do?serviceId=S_ETC_0041&viewId=V_CENT0127&menuId=91">T서비스앱</a>'
	menuall +='<a href="/normal.do?serviceId=S_ETC_0043&viewId=V_CENT0123&menuId=92">T패밀리앱</a>'
	menuall +='</li>'
	menuall +='</ul>'
	menuall +='</div>'
document.write( menuall );
//]]>