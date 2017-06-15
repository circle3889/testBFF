/**
 * @xmlHttp.js (Ajax 공통 스크립트)
 * @version 1.0, 2007-12-14
 * @author Yoon Tae Hyun ( thrukill@nate.com )
*/
var xmlHttp;
var userFunction;

// modified by hubba 2010.07.23 - 아래는 사용불가로 코멘트 처리
/*function createXMLDocRequest(fXml) {
    var xmlDoc;
    if (window.ActiveXObject) {
        xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
    } else if (window.XMLHttpRequest) {
        xmlDoc = document.implementation.createDocument('', '', null);
    }
    xmlDoc.async = false;
    xmlDoc.load(fXml);
    return xmlDoc;
}
function createXMLTextRequest(fXml) {
    var xmlDoc;
    if (window.ActiveXObject) {
        xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
        xmlDoc.async = false;
        xmlDoc.loadXML(fXml);
    } else if (window.XMLHttpRequest) {
        xmlDoc = document.implementation.createDocument('', '', null);
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(fXml, 'text/xml');
        delete parser;
    }
    return xmlDoc;
}
function createXMLHttpRequest() {
	if (window.ActiveXObject) {
		xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
	} else if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	}
}
function doRequestUsingGET(vStr, uFun) {
	userFunction = uFun;
    createXMLHttpRequest();
    xmlHttp.onreadystatechange = handleStateChange;
    xmlHttp.open('GET', vStr, false);
    xmlHttp.send(null);
}
function doRequestUsingPOST(vUrl, vStr, uFun) {
	userFunction = uFun;
    createXMLHttpRequest();
    xmlHttp.open('POST', vUrl, false);
    xmlHttp.onreadystatechange = handleStateChange;
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttp.send(vStr);
}
function handleStateChange() {
    if(xmlHttp.readyState == 4) {
        if(xmlHttp.status == 200) {
        	try {
        		eval(userFunction);
            } catch(e) {}
        } else if (xmlHttp.status == 404) {
        	alert('잘 못된 페이지를 호출하였습니다.');
        }
    }
}*/
function hangleCheck(value) {
	return escape(value).replace(/\+/g, '%2B');
}

function tworldLogo() {
	//document.write("<embed id='TworldLogo' src='http://m.tworld.co.kr/inc/sound/TRING.wav' loop='false' autostart='false' hidden='true'></embed>");
}
