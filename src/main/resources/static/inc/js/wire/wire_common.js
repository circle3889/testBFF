// 유선서비스 회사구분 체크---------
function checkCoClCd()
{
	var wform = document.wireform;
	if(wform.co_cl_cd !=null) {
		if(wform.co_cl_cd.value != "T") 
		{
			alert("선택하신 서비스는 SK브로드밴드를 통해 가입하신 서비스이므로 전화 106 또는 SK브로드밴드 웹사이트를 이용해 주시기 바랍니다.");
			return false;
		} 
	}
	return true;
}

function checkRepYn()
{
	var wform = document.wireform;
	var aRadio = wform.wire_svc_mgmt_num;
	if(wform.rep_yn !=null) {
		if(wform.rep_yn.value != "Y") 
		{
			alert("대표 서비스만 가능합니다.");
			return false;
		} 
	}
	return true;
}

function checkSvcCd()
{
	var wform = document.wireform;
	if(wform.svc_cd !=null) {
		if(wform.svc_cd.value == "P") 
		{
			return true;
		} else  {
			alert("유선전화 서비스를 선택해 주세요.");
			return false;
		}
	}
	return false;
}

var telLayer = '<div id="telLayer" class="layer_pop" style="top:100px;display:none">';
telLayer += '	<div class="wrap">';
telLayer += '		<div class="pop_header">';
telLayer += '			<div class="header_in">';
telLayer += '				<a href="#" onclick="showTelLayer(false);" id="nfocus2"><img src="/img/wire/pop_close.png" alt="전화상담 창 닫기"/></a>'; //2013-10-22 alt 추가 a 태그 속성 추가 및 수정 
telLayer += '				<h1>전화상담</h1>';
telLayer += '			</div>';
telLayer += '		</div>';
telLayer += '		<div class="pop_contents">';
telLayer += '			<p class="pop_txt_bor">SKT 고객센터(080-816-2000, 무료)로 연결하시겠습니까?<span>*유료 상담전화를 원하시는 분께서는 1600-2000으로 전화주시기 바랍니다.</span></p>';
telLayer += '			<div class="btn_area01">';
telLayer += '				<a href="tel:080-816-2000"><img src="/img/wire/btn_call.gif" alt="통화" /></a>';  //2013-10-22 alt 추가 
telLayer += '				<a href="#" onclick="showTelLayer(false);"><img src="/img/wire/btn_cancel.png" alt="취소"  /></a>';  //2013-10-22 alt,a 추가 
telLayer += '			</div>';
telLayer += '		</div>';
telLayer += '	</div>';
telLayer += '</div>';
telLayer += '<div id="modal" class="progress_img_all_cover"><div id="layerLoddig" style=" width:69px; padding-top:200px; margin:0 auto; display:none"><img src="/img/common/loading.png" alt="처리중입니다."/></div></div>'; //2013-10-22 alt 추가 
document.write(telLayer);

function showModalLayer(isView, isLodding) {
	var modal = document.getElementById("modal");	
	var layerLoddig = document.getElementById("layerLoddig");	

	if (isView) {
		modal.style.display = "block";        
	}else{
		modal.style.display = "none";        
	}

	if (isLodding) {
		layerLoddig.style.display = "block";        
	}else{
		layerLoddig.style.display = "none";        
	}

	window.scrollTo(0,0);
}

function showTelLayer(isView) {
	var obj = document.getElementById("telLayer");
	var obj2 = document.getElementById("nfocus2");// 2013-11-07 웹접근성 추가
	var obj3 = document.getElementById("nfocus");// 2013-11-07 웹접근성 추가

	if (isView) {
		obj.style.display = "block";
		obj2.focus();// 2013-11-07 웹접근성 추가
	}else{
		obj.style.display = "none";
		obj3.focus();// 2013-11-07 웹접근성 추가
	}
	showModalLayer(isView, false);
}	

function toggleDisable(elementName, isDisable) {
	var elementArr = document.form1.getElementsByTagName(elementName);
	for(var i=0; i<elementArr.length; i++) {
		elementArr[i].disabled = isDisable;
	}
}
    
function disabledCheck(isView) {
	toggleDisable("select", isView);   
	toggleDisable("input", isView);
	toggleDisable("textarea", isView);
	toggleDisable("checkbox", isView);    	    	
}

function showModalDisableLayer(isView, isLodding) {
	showModalLayer(isView, isLodding);
	disabledCheck(isView);
}

function eleshow(ele) { /* 보이기 */
	if(typeof ele == "string") ele = document.getElementById(ele);
	ele.style.display = 'block';
	return false;
}	

function elehidden(ele) { /* 감추기 */
	if(typeof ele == "string") ele = document.getElementById(ele);
	ele.style.display = 'none';
	return false;
}