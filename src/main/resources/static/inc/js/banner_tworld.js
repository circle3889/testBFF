/// 타이틀---------

/** @@ 2013 웹접근성 개선 START */
/// 타이틀---------
if(document.title == ""){
	document.title=" | 모바일 T world";
}
/** @@ 20132 웹접근성 개선 START */
document.domain = "tworld.co.kr";

/************************************************************************
* 제목 : Xtractor_CRM_분석스크립트 추가 start
* 설명 :  CSDummy 파일은 실제 존재하지 않으며 callCSScript()메소드를 통해 log만 남긴다.
* 추가 : 2012.2.21
/************************************************************************/
var AJAX = function() {
    var request = null;
    this.sendRequest = sendRequest;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        request = new ActiveXObject("MSXML2.XMLHTTP");
        if (!request) {
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    function sendRequest(reqType, url, asynch, action, queryString) {
        //request.onreadystatechange = action;  // CallBack
        request.open(reqType, url, asynch);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=UTF-8");
        request.send(queryString);
    }
}
function callCSScriptBn(V_ID, L_ID, E_ID, CS_ID, P_ID) {
    var URI = "http://m2.tworld.co.kr/global/xtractor/CSDummy";
    var PARAMS = "V_ID=" + V_ID + "&L_ID=" + L_ID + "&E_ID=" + E_ID + "&CS_ID=" + CS_ID + "&P_ID=" + P_ID;
    var ajax = new AJAX();
    ajax.sendRequest("POST", URI, true, null, PARAMS);
}
/************************************************************************
* 제목 : Xtractor_CRM_분석스크립트 추가 end 
/************************************************************************/
