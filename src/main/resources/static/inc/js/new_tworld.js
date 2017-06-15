/// Ÿ��Ʋ---------

/** @@ 2013 �����ټ� ���� START */
/// Ÿ��Ʋ---------
if(document.title == ""){
	document.title=" | ����� T world";
}
/** @@ 20132 �����ټ� ���� START */
//document.domain = "tworld.co.kr";

/************************************************************************
* ���� : Xtractor_CRM_�м���ũ��Ʈ �߰� start
* ���� :  CSDummy ������ ���� �������� ������ callCSScript()�޼ҵ带 ���� log�� �����.
* �߰� : 2012.2.21
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
function callCSScript(V_ID, L_ID, E_ID, CS_ID, P_ID) {
    var URI = "http://m2.tworld.co.kr/global/xtractor/CSDummy";
    var PARAMS = "V_ID=" + V_ID + "&L_ID=" + L_ID + "&E_ID=" + E_ID + "&CS_ID=" + CS_ID + "&P_ID=" + P_ID;
    var ajax = new AJAX();
    ajax.sendRequest("POST", URI, true, null, PARAMS);
}
/************************************************************************
* ���� : Xtractor_CRM_�м���ũ��Ʈ �߰� end 
/************************************************************************/

function checkTopFrame() {
	if ( window.top.opener ) return;
	var tObj = this;
	var i = 0;
	try {
		for ( i = 0; tObj.frames["a"] == null ; i++ ) {
			if (i == 10 ) break;
			tObj = tObj.parent;
			if ( tObj == null ) break;
		}
		if ( i >= 10 ) tObj = this.parent;
		if ( tObj.frames["a"] == null )
			window.top.document.location.href = "http://m2.tworld.co.kr/outsitens.html?" + document.location.href;
	}
	catch(e) {
	}
}
//checkTopFrame();

//document.write("<script type='text/javascript' src='" + location.protocol + "//m.tworld.co.kr/inc/js/common_url.js'></script>");

function popr(url,name,w,h) {
	window.open(url,name,'width='+w+',height='+h+',scrollbars=auto,resizable=1') ;
} //Popup(��ũ�ѹ�����)

function goOpenerUrl(url) {
	window.top.location.href = url;
}

//-------------------------------------------------------------------------------------------------
//----------------------------------------  index.jsp ���� --------------------------------------
//-------------------------------------------------------------------------------------------------
// MODIFY : 20071123 õ����

function isLogin() {
	 var cname = GetCookie("twdstatus");
	 //alert("171");
	 //if(cname!=null && cname!="" && isLogonOnServer_org()) {//&& isLogonOnServer()
	 // modified by hubba 2010.07.25 - checkLogonOnServer() �Լ� ��� ����
	 //if(cname!=null && cname!="" && checkLogonOnServer()) {//&& isLogonOnServer()
	 if(cname!=null && cname!="") {//&& isLogonOnServer()
	  return true;
	 }
	 return false;
}

//SSO���� cymkt��Ű�� ����Ȯ�� - 07.11.06 �߰�
function isSSOLogin() {
    var lname = GetCookie("cymkt");
    var estdmb = GetCookie("estdmb");
	// modified by hubba
    if(lname!=null && lname!="") {
	//if (hasCookie("cymkt")) {
        return true;
    } else {
        if(estdmb!=null && estdmb!="") return true;
		//if (hasCookie("estdmb")) return true;
        else return false;
    }
    return false;
}

/***2003.03. Nexzone SJCho TC & VIP �����ϱ� ���� ***/
function GetCookiePs(cName, idname) {
	  for (var i=0; i < cName.length; i++) {
		  var tPsname = cName[i].split("=");
		if (idname == tPsname[0]) {
			return tPsname[1];
		}
	  }
	  return "";
}

// added by hubba
function hasCookie(sName) {
	var aCookie = document.cookie.split("; ");
	for (var i=0; i < aCookie.length; i++)  {
		var cPos = aCookie[i].indexOf( "=" );
		var cName = aCookie[i].substring( 0, cPos );
//alert("common --> "+cName);
		if ( cName == sName ) {
			return true;
		}
	}
	return false;
}

function GetCookie(sName) {
	var aCookie = document.cookie.split("; ");
	for (var i=0; i < aCookie.length; i++)  {
		var cPos = aCookie[i].indexOf( "=" );
		var cName = aCookie[i].substring( 0, cPos );

		if ( cName == sName ) {
			return unescape( aCookie[i].substring( cPos + 1 ) );
		}
	}
	// a cookie with the requested name does not exist
	return "";
}


function getSinCookie(cookValue, tarNm){
	var retVal = '';
	var aPairs = cookValue.split("~");

	retVal = GetCookiePs(aPairs, tarNm);

	return retVal;
}
/* 2007-11-09 ������ */

function updateSinCookie(firstNm, cookValue, tarNm, val){
	var retVal = '';
	var aPairs = cookValue.split("~");

	if(aPairs.length>1){
		for (var i=0; i < aPairs.length; i++)  {
			if(i==0) retVal = firstNm+"=";
			var tPsname = aPairs[i].split("=");
			if (tarNm == tPsname[0]){
				retVal += tPsname[0] + "=" + val;
			}else{
				retVal += aPairs[i];
			}
			retVal += '~';
			//twdstatus=DISPLAYNAME=���̼�~USERID=iswind~GRADE=A~EQUIPMODLCD=SSHU
		}
	}
	retVal = retVal.substr(0, retVal.length-1);

	return retVal;
}

// index.jsp���� ȣ��
function setLoginedUserInfo() {//cookValue, flashName, isMain
	var depth = arguments.length;

	var cookValue = GetCookie("twdstatus");

		// �α��� ��, Ƽ���� �ΰ�� ���
		if ( isLogin() ) {
			if ( GetCookie('Tsound') != 'done' ){
				try {
					//document.getElementById('TworldLogo').autoStart = true;
					var todayDate = new Date();
					todayDate.setDate( todayDate.getDate() );
					//document.cookie = 'Tsound=done; path=/; domain=.tworld.co.kr';
				} catch (e) {
				}
			}
		  /*if( GetCookie('TPoPNateLyr') != 'done' ) {
				try {
					//document.getElementById('TworldLogo').autoStart = true;
					var todayDate = new Date();
					todayDate.setDate( todayDate.getDate() );
					document.cookie = 'TPoPNateLyr=done; path=/; domain=.tworld.co.kr';
				} catch (e) {
				}
			}*/
		}
}

function onClickLogout(){
	//alert('onClickLogout');
	goLogout();
}

// �α׾ƿ� ������    -- loginout.js���� �ڸ���
function goLogout(site_cd) {
		//deleteCookies();
	if (site_cd=="tingjunior") {
		//window.location.href = "http://nicasams.sktelecom.com:2040/icas/fc/LogOffSV?URL=http://m2.tworld.co.kr/jsp/common/loginout/view/cm6_logout_page.jsp?site_cd=tingjunior";
		window.location.href = "http://m2.tworld.co.kr/jsp/common/loginout/control/LogoutServlet.jsp?site_cd=tingjunior";
	} else {
		//window.location.href = "http://nicasams.sktelecom.com:2040/icas/fc/LogOffSV?URL=http://m2.tworld.co.kr/jsp/common/loginout/view/cm6_logout_page.jsp";
		window.location.href = "http://m2.tworld.co.kr/jsp/common/loginout/control/LogoutServlet.jsp";
	}
}

// WINDOW ONLOAD EVENT START
function changeLogin(){
	// �α��� ��, Ƽ���� �ΰ�� ���
	if ( isLogin() && GetCookie('Tsound') != 'done' ) {
		try {

			var quickLayer = "";
			quickLayer += "<embed id='TworldLogo' src='http://m2.tworld.co.kr/inc/sound/TRING.wav' loop='false' autostart='1' hidden='true' volume='0'></embed>";

			var oDiv = document.createElement('DIV');
			oDiv.id = 'TworldLogoDiv';
			oDiv.innerHTML = quickLayer;
			document.body.appendChild(oDiv);
			//document.getElementById('TworldLogo').autoStart = true;
			var todayDate = new Date();
			todayDate.setDate( todayDate.getDate() );
			document.cookie = 'Tsound=done; path=/; domain=.tworld.co.kr';
			window.top.b.IframeMultiLogin.location.reload();
		} catch (e) {
		}
	}else if(isLogin()) {
		try{
			window.top.b.IframeMultiLogin.location.reload();
		} catch (e) { }
	}
}


/******************************************************************************
 ******************************************************************************

  added by hubba - ���Ͽ� loginout.js �� �߰���

 ******************************************************************************
*******************************************************************************/


// �α��� ���� cmd ���� �����Ͽ� �˾����� �α��� �� ��� ���
function goPopLogin(returnURL,goCmd) { // returnURL�� encoding �ؾ� ��.
    if ( !isLogin() ) { //442*285
        if (confirm("�α��� �Ͻðڽ��ϱ�?")) {
            window.open('http://m2.tworld.co.kr/jsp/common/loginout/view/cm8_login_popup.jsp?cmd='+goCmd+'&returnURL='+returnURL,'new','width=442,height=285,menubar=no');
        }
    }
}

// �α��� ���� cmd ���� 7�� �����Ͽ� �˾����� �α��� �� ��� ���
function goLogpop() {
    if ( !isLogin() ) { //442*285
        if (confirm("�α��� �Ͻðڽ��ϱ�?")) {
            window.open('http://m2.tworld.co.kr/jsp/common/loginout/view/cm8_login_popup.jsp?cmd=7&returnURL=','new','width=442,height=285,menubar=no');
        }
    }
}

// �α��� ��ư Ŭ����
function goLogin() {
	var depth = arguments.length;
	var returnURL = escape(document.URL);
	if (depth > 0) {
		returnURL = goLogin.arguments[0];
	}
    if ( !isLogin() ) {
        window.location.href="http://m2.tworld.co.kr/jsp/common/loginout/view/api_login_test.jsp?returnURL="+returnURL;
    } else {
		//if (confirm("���� ��û ��ȿ�ð��� ����Ͽ����ϴ�.\n�α׾ƿ� �Ͻðڽ��ϱ�?")) goLogout();
		deleteCookies();
		//alert('��� �ð��� ���� ����Ǿ� �ڵ� �α׾ƿ� �Ǿ����ϴ�.');
		window.location.href="http://m2.tworld.co.kr/jsp/common/loginout/view/api_login_test.jsp?returnURL="+returnURL;
        //if (confirm("�������� �̹� �α��εǾ����ϴ�.\n�α׾ƿ� �Ͻðڽ��ϱ�?")) goLogout();
        //alert('�������� �̹� �α��� �����Դϴ�');
    }
}

// added by hubba
function goLink(url) {
	if (url.indexOf("?") > 0) {
		window.location.href=url+"&returnURL="+escape(url);
	}
	else {
		window.location.href=url+"?returnURL="+escape(url);
	}
}

// �α��� Parameter ����
function goLoginPara(para) {
    if ( !isLogin() )
        window.location.href="http://m2.tworld.co.kr/jsp/common/loginout/view/cm8_login_page.jsp?returnURL="+escape(document.URL + para);
}

// �ܺηα���
function goLoginOutSide(para, cmd) {
    if ( !isLogin() )
        window.location.href="http://m2.tworld.co.kr/jsp/common/loginout/view/cm8_login_page.jsp?popup=N&returnURL="+escape(para)+"&cmd="+cmd;
}

// �α׾ƿ��� ��Ű����
function deleteCookies() {
    //alert('deleteCookies');
    document.cookie = 'asp=; expires=Sun, 01-Jan-1995 01:00:00 GMT; path=/; domain=.tworld.co.kr';
    document.cookie = 'natedrive=; expires=Sun, 01-Jan-1995 01:00:00 GMT; path=/; domain=.tworld.co.kr';
    document.cookie = 'twdstatus=; expires=Sun, 01-Jan-1995 01:00:00 GMT; path=/; domain=.tworld.co.kr'; 
	// @TODO hubba
    document.cookie = 'XTLID=; expires=Sun, 01-Jan-1995 01:00:00 GMT; path=/; domain=.tworld.co.kr'; 
	document.cookie = 'TWDJSESSIONID=; expires=Sun, 01-Jan-1995 01:00:00 GMT; path=/; domain=.tworld.co.kr';
	document.cookie = 'MBRJSESSIONID=; expires=Sun, 01-Jan-1995 01:00:00 GMT; path=/; domain=.tworld.co.kr';
	// added by hubba
	document.cookie = 'cymkt=; expires=Sun, 01-Jan-1995 01:00:00 GMT; path=/; domain=.tworld.co.kr';
	document.cookie = 'cymkt1=; expires=Sun, 01-Jan-1995 01:00:00 GMT; path=/; domain=.tworld.co.kr';
	document.cookie = 'estdmb=; expires=Sun, 01-Jan-1995 01:00:00 GMT; path=/; domain=.tworld.co.kr';
	document.cookie = 'mbssite=; expires=Sun, 01-Jan-1995 01:00:00 GMT; path=/; domain=.tworld.co.kr';
	document.cookie = 'pps=; expires=Sun, 01-Jan-1995 01:00:00 GMT; path=/; domain=.tworld.co.kr';
	document.cookie = 'prod_id_cookie=; expires=Sun, 01-Jan-1995 01:00:00 GMT; path=/; domain=.tworld.co.kr';
	document.cookie = 'SmsAuth=; expires=Sun, 01-Jan-1995 01:00:00 GMT; path=/; domain=.tworld.co.kr';
	document.cookie = 'TWDMBRJSESSIONID=; expires=Sun, 01-Jan-1995 01:00:00 GMT; path=/; domain=.tworld.co.kr';
	document.cookie = 'uotp=; expires=Sun, 01-Jan-1995 01:00:00 GMT; path=/; domain=.tworld.co.kr';
}


// flash �α��� ó�� START

// @TODO hubba
document.write("<script type='text/javascript' src='http://m2.tworld.co.kr/inc/js/recommend/xtvid.min.js'></script>");
function loginCheck(login_id, login_pw, returnURL, security) {
	// @TODO hubba
    makeXTVIDc();   // xTractor ��Ű����

	// remarked by hubba - ����� T world �� �������� icas ȣ�� ���� : ���� �ʿ�
    //var actionUrl = 'http://nicasams.sktelecom.com:2040/icas/fc/LogOnSV';
	var actionUrl = "http://m2.tworld.co.kr/jsp/common/loginout/view/cm8_login_page.jsp?returnURL="+returnURL;
    //if (security == 'Y') actionUrl = 'https://nicasams.sktelecom.com:2552/icas/fc/LogOnSV';

    loginForm.action = actionUrl;
    loginForm.URL.value ='http://m2.tworld.co.kr/loginservlet.do?cmd=1&returnURL='+returnURL+'&ID='+login_id;
    loginForm.SERVERIP.value  = '203.236.20.129';
    loginForm.ID.value = login_id;
    loginForm.PASSWORD.value = login_pw;
    loginForm.target = 'loginFrame';
    loginForm.submit();
}

function custPWDCheck(login_id, login_pw, cust_pw, returnURL, security) {
	// @TODO hubba
    makeXTVIDc();   // xTractor ��Ű����

	// remarked by hubba - ����� T world �� �������� icas ȣ�� ���� : ���� �ʿ�
    //var actionUrl = 'http://nicasams.sktelecom.com:2040/icas/fc/LogOnSV';
	var actionUrl = "http://m2.tworld.co.kr/jsp/common/loginout/view/cm8_login_page.jsp?returnURL="+returnURL;
    //if (security == 'Y') actionUrl = 'https://nicasams.sktelecom.com:2552/icas/fc/LogOnSV';

    loginForm.URL.value ='http://m2.tworld.co.kr/loginservlet.do?cmd=1&returnURL='+returnURL+'&ID='+login_id;
    loginForm.SERVERIP.value  = '203.236.20.129';
    loginForm.ID.value = login_id;
    loginForm.PASSWORD.value = login_pw;
    loginForm.custPWD.value = cust_pw;
    loginForm.target = 'loginFrame';
    loginForm.submit();
}
// flash �α��� ó�� END

function callFlash(stat, messages)
{
//    alert("callFlash ==> stat : " + stat + " Message : " + messages);
    var obj = document.main_top;
    obj.SetVariable("loginStat", stat);
    obj.SetVariable("loginMessages", messages);
    obj.SetVariable('loginResultFlash','');
    //loginFrame.location.href = 'http://m2.tworld.co.kr/jsp/common/loginout/view/cm6_flash_login.jsp';
    setLogin();
    //alert("setLogin() ");
}

function goCustPwdSet() {
    alert('�� ��й�ȣ�� �ʱ� �����ϼž� �մϴ�.');
    window.location.href = 'http://m2.tworld.co.kr/normal.do?serviceId=SDUMMY0001&viewId=V_CMN_1000'+'&returnURL='+escape(document.URL);
}
/***
-.05.5.2, CSä�� �����, ������
-.ž�޴��� '��������'�߰�(/estation_front/common/img/util_menu05.gif, util_bg.gif �̹��� �߰�)

***/
/**
@@@NGM SSR �߰� 2006. 05. 24 ������ DMB ��Ű �߰�
**/

/*function setLogin() {
//alert("setLogin()");
    var flashObj = window.document.mNavFla;
    if (isLogin()) {
        flashObj.SetVariable('flashLogin',getuserid());
        subMyFav();
    }
}*/

function getCookieProj1()
{
    //var cymkt = GetCookie("cymkt");
    //var estdmb = GetCookie("estdmb");
    //var cymkt1 = GetCookie("cymkt1");
    //var proj1 = "";
    //if( cymkt !=null && cymkt != "") return getCyberCookieValue("proj1_ind");
    //if( cymkt1 !=null && cymkt1 != "") return getCyberCookieValue("proj1_ind");
    var proj1 = getCyberCookieValue("proj1_ind");
    return proj1;
}

function getpricplanid()
{
    var pricplan = getCyberCookieValue("pricplanid");
    return pricplan;
}

function getsvcnum()
{
    var svc_num = getCyberCookieValue("svc_num");
    return svc_num;
}

function getuserid()
{
    //var cymkt = GetCookie("cymkt");
    //var estdmb = GetCookie("estdmb");
    //var cymkt1 = GetCookie("cymkt1");
    //var user_id = "";
    //if( cymkt !=null && cymkt != "") return getCyberCookieValue("user_id");
    //if( cymkt1 !=null && cymkt1 != "") return getCyberCookieValue("user_id");
    var user_id = getCyberCookieValue("user_id");
    return user_id;
}


// main page ����
function InitFocus() {
    //if( !isLogin() ) {
        var fID = document.loginform.ID;
		var fPASSWORD = document.loginform.PASSWORD;
        try {
            var IdInd   = GetCookie('FILLID');

			// ��ȣȭ �߰�
			//var PwInd	= GetCookie('FILLPW');
			var PwInd = RSAdoDecryption();

            //alert('getCookie ---'+IdInd);
            if ( IdInd ) {
                document.loginform.SaveIdInd.checked = true;
                fID.value = IdInd;
                //fID.style.backgroundImage='none';
                
            }
            if ( PwInd ) {
                document.loginform.SavePwInd.checked = true;
                fPASSWORD.value = PwInd;
                //fPASSWORD.style.backgroundImage='none';
                
            }
        } catch(e) {}
        if (fID.value) {
			//if (fPASSWORD.value) {
			//	document.loginform.LOGINBTN.focus();
			//} else {
				document.loginform.PASSWORD.focus();
			//}
        } else fID.focus();
    //}
}

function chkMainValue() {
	// @TODO hubba
	    makeXTVIDc();

    if(document.loginform.ID.value.length==0 ) {
        alert('���̵� �Է����ּ���.');
        document.loginform.ID.focus();
        return false;
    }
    if(document.loginform.PASSWORD.value.length==0 ) {
        alert('�н����带 �Է����ּ���.');
        document.loginform.PASSWORD.focus();
           return false;
    }	
	
		   
    try {
		var expiredays = -1;
        //if ( document.loginform.SaveIdInd.checked ) expiredays = 30;
		if ( document.loginform.SaveIdInd.checked ||
			document.loginform.SavePwInd.checked ) expiredays = 30;
        var todayDate = new Date();
        todayDate.setDate( todayDate.getDate() + expiredays );
    	   		
        

			document.cookie = 'OFFEROPEN=' + escape(1)+ '; path=/; domain=.tworld.co.kr';        	
      
      //if(arguments[0] && arguments[0] == '1'){
			if(document.loginform.SaveIdInd.checked){

				document.cookie = 'FILLID=' + escape( document.loginform.ID.value ) + '; path=/; expires=' + todayDate.toGMTString() + '; domain=tworld.co.kr';        	

			}else{
        		//alert('���� no');
        		//document.cookie = 'FILLID=""; path=/; expires=' + todayDate.toGMTString() + '; domain=tworld.co.kr';
        		document.cookie = 'FILLID=""; path=/; expires=Sun, 01-Jan-1995 01:00:00 GMT; domain=tworld.co.kr'; 
			}
			// hubba - ��� ���� �߰�
			if(document.loginform.SavePwInd.checked){

				// ��ȣȭ �߰�
				RSAdoEncryption(document.loginform);
				//document.cookie = 'FILLPW=' + escape( document.loginform.PASSWORD.value ) + '; path=/; expires=' + todayDate.toGMTString() + '; domain=tworld.co.kr';        	

			}else{
        		//alert('���� no');
        		//document.cookie = 'FILLID=""; path=/; expires=' + todayDate.toGMTString() + '; domain=tworld.co.kr';
        		//document.cookie = 'FILLPW=""; path=/; expires=Sun, 01-Jan-1995 01:00:00 GMT; domain=tworld.co.kr'; 
			}
/*


				document.cookie = 'FILLID=' + escape( document.loginform.ID.value ) + '; path=/; expires=' + todayDate.toGMTString() + '; ';        	//domain=.tworld.co.kr
        	}else{
        		//alert('���� no');
        		document.cookie = 'FILLID=""; path=/; expires=Sun, 01-Jan-1995 01:00:00 GMT;'; //expires=' + todayDate.toGMTString() + '; ';//domain=.tworld.co.kr
        	}

*/
        
    } catch(e) {}
    document.loginform.URL.value = document.loginform.URL.value + '&ID=' + document.loginform.ID.value;
    //var actionUrl = 'http://nicasams.sktelecom.com:2040/icas/fc/LogOnSV';
    //var actionUrl = '/loginssoservlet.do?returnURL='+escape(document.URL);
	var actionUrl = 'https://m2.tworld.co.kr/loginssoservlet.do';                                      // ���ȹ����� https �� �ٲ�  ������ 2011.06.09
/*    try {
        if ( document.loginform.SecurityChk.checked ) {
        	//alert("SecurityChk.checked");
            actionUrl = 'https://nicasams.sktelecom.com:2552/icas/fc/LogOnSV';
        }
    } catch(e) {}*/

    document.loginform.action = actionUrl;
    //alert('chkMainValue true');	
    return true;
}


function getID(cname) {
    var cookiescymkt1 = "cymkt1";
    var cookieList = document.cookie.split("; ");
    var cookieArray = new Array();
    var cvr ="";

    for(var i = 0 ; i < cookieList.length ; i++) {
        var name = cookieList[i].split("=");
        cookieArray[unescape(name[0])] = unescape(name[1]);
    }

    if(cookieArray[cookiescymkt1] != null) {
        var psname     = cookieArray[cookiescymkt1].split("~");
        cvr    = GetCookiePs(psname, cname);
    }

    return cvr;
}

function getCookieID(cname) {
    var ck = document.cookie;
    if(ck.length>0)    {
        begin=ck.indexOf(cname);
        if(begin!=-1) {
            begin += cname.length+1;
            end = ck.indexOf(";",begin);
            if(end==-1) end=ck.length;
            cval = ck.substring(begin,end);
            if(begin != end) return unescape(cval);
            else return "";
        }
        else return "";
    }
    else return "";
}

function getCymkt1Cookies() {

	var cookieList = document.cookie.split( "; " );
	var cymkt1 = new Array();

		for ( i = 0; i < cookieList.length; i++ ) {
			keyPos = cookieList[i].indexOf( "=" );
			key = cookieList[i].substring( 0, keyPos );

			if ( key == "cymkt1" ) {
				value = cookieList[i].substring( keyPos + 1 );
				cymkt1Value = value.split("~");
				for ( j = 0; j < cymkt1Value.length; j++ ) {
					field = cymkt1Value[j].split("=");
					cymkt1[unescape(field[0])] = unescape(field[1]);
				}
			}
		}

		return cymkt1;
}

function convSvcCd( cd ) {
        var result = "";
        var kukList = new Array( "010", "011", "016", "017", "018", "019" );
        var svcCdList = new Array( "0", "C", "6", "H", "8", "9" );

        if ( cd != null && cd != "" ) {
            // ������ svc_cd�� ��ȯ
            if ( cd.length == 1 ) {
                result = kukList[getArrPos(svcCdList, svcCd)];
            }
            // svc_cd�� �������� ��ȯ
            else if ( cd.length == 3 ) {
                result = svcCdList[getArrPos(kukList, svcCd)];
            }
        }

        return result;
}


function getArrPos( arr, str ) {
    for ( i = 0; i < arr.length; i++ ) {
        if ( str == arr[i] ) {
            return i;
        }
    }

    return -1;
}

function convSvcNum( mdn ) {
        var result = "";
        var kukList = new Array( "010", "011", "016", "017", "018", "019" );
        var svcCdList = new Array( "0", "C", "6", "H", "8", "9" );

        if ( mdn != null && mdn != "" ) {
            // mdn -> svc_num
            if ( mdn.length == 11 ) {
                result += convSvcCd( mdn.substring( 0, 3 ) );
                result += mdn.substring( 3 );
            }
            // svc_num => mdn
            else if ( mdn.length == 9 ) {
                result += convSvcCd( mdn.substring( 0, 1 ) );
                result += mdn.substring( 1 );
            }
        }

        return result;
}


function convMobile( mdn ) {
    var result = "";

    result = mdn.substring( 0, 1);

    if(result == "C") result = "011-";
    else if(result == "H") result = "017-";
    else if(result == "0") result = "010-";
    else if(result == "6") result = "016-";
    else if(result == "8") result = "018-";
    else if(result == "9") result = "019-";

    if ( mdn.substring( 1, 2) == "0" ) {
    result += mdn.substring( 2, 5) + "-"  + mdn.substring( 5, 9);
    }
    else if ( mdn.substring( 1, 2) != "0" ) {
    result += mdn.substring( 1, 5) + "-"  + mdn.substring( 5, 9);
    }

    return result;
}



function getMainID() {
    var cookiescymkt = "cymkt";
    var cookieskid = "skid";
    var cookiechk = 0;
    var cookieList = document.cookie.split("; ");
    var skid = " ";

    var cookieArray = new Array();
    for(var i = 0 ; i < cookieList.length ; i++) {
        var name = cookieList[i].split("=");
        cookieArray[unescape(name[0])] = unescape(name[1]);
    }

    if(cookieArray[cookiescymkt] != null) {
        cookiechk = 1;
        if(cookieArray[cookieskid] == null)    skid = " ";
        else skid = cookieArray[cookieskid];
    }

    return skid;
}


function getSvcNum() {
    var cookiescymkt = "cymkt";
    var cookiescymkt1 = "cymkt1";
    var cookiesvcnum = "svcnum";
    var cookieskid = "skid";
    var cookiechk = 0;
    var cookieList = document.cookie.split("; ");
    var svcnum = " ";

    var cookieArray = new Array();
    for(var i = 0 ; i < cookieList.length ; i++) {
        var name = cookieList[i].split("=");
        cookieArray[unescape(name[0])] = unescape(name[1]);
    }

    if(cookieArray[cookiescymkt] != null) {
        cookiechk = 1;
        if(cookieArray[cookiesvcnum] == null || cookieArray[cookiesvcnum] == "0")
            svcnum = "<td width=173></td>";
        else //svcnum = "<td width=173><img src=/img/share/main01_ip_icon.gif width=7 height=10 align=absmiddle> ��ȣ : " + makeNum(cookieArray[cookiesvcnum]) + "</td>";
			svcnum = "<td width=173>��ȣ : " + makeNum(cookieArray[cookiesvcnum]) + "</td>";

        function makeNum(para) {
            var HandPhone = "";
            if ( para.substring(1,2) == "0" ) {
                if ( para.substring(0,1) == "C" ) {
                    HandPhone = "011-" + para.substring(2,5) + "-" + para.substring(5);
                } else if ( para.substring(0,1) == "H" ) {
                    HandPhone = "017-" + para.substring(2,5) + "-" + para.substring(5);
                } else if ( para.substring(0,1) == "0" ) {
                    HandPhone = "010-" + para.substring(2,5) + "-" + para.substring(5);
                } else if ( para.substring(0,1) == "6" ) {
                    HandPhone = "016-" + para.substring(2,5) + "-" + para.substring(5);
                } else if ( para.substring(0,1) == "8" ) {
                    HandPhone = "018-" + para.substring(2,5) + "-" + para.substring(5);
                } else if ( para.substring(0,1) == "9" ) {
                    HandPhone = "019-" + para.substring(2,5) + "-" + para.substring(5);
                }

            }
            else {
                if ( para.substring(0,1) == "C" ) {
                    HandPhone = "011-" + para.substring(1,5) + "-" + para.substring(5);
                } else if ( para.substring(0,1) == "H" ) {
                    HandPhone = "017-" + para.substring(1,5) + "-" + para.substring(5);
                } else if ( para.substring(0,1) == "0" ) {
                    HandPhone = "010-" + para.substring(1,5) + "-" + para.substring(5);
                } else if ( para.substring(0,1) == "6" ) {
                    HandPhone = "016-" + para.substring(1,5) + "-" + para.substring(5);
                } else if ( para.substring(0,1) == "8" ) {
                    HandPhone = "018-" + para.substring(1,5) + "-" + para.substring(5);
                } else if ( para.substring(0,1) == "9" ) {
                    HandPhone = "019-" + para.substring(1,5) + "-" + para.substring(5);
                }
            }
            return  HandPhone;
        }
    }
    return svcnum;
}


//********************************************************************
// * �� �� �� �� : 2003.10.28
// * ��   ��  �� : ��ö��
// * ó �� �� �� : est��Ű�� �� KEY���� VALUE����
//********************************************************************/

function getEstCookieValue(lKey)
{

    var ck = document.cookie;
    var index = ck.indexOf("est");
    if (index == -1) return "";
    index = document.cookie.indexOf("=", index) + 1;
    var endstr = document.cookie.indexOf(";", index);
    if (endstr == -1) endstr = document.cookie.length;

    var EstValue = unescape(document.cookie.substring(index, endstr));

    if(EstValue != null)
    {
        var aPairs = EstValue.split("~");
        rValue = GetCookiePs(aPairs, lKey);
        return rValue;
    }
    return null;
}

//********************************************************************
// * �� �� �� �� : 2003.5.20
// * ��   ��  �� : ����ȣ
// * ó �� �� �� : CYMKT1��Ű�� �� KEY���� VALUE����
//********************************************************************/
function getCyberCookieValue(lKey)
{
	var cyberValue 	= GetCookie("cymkt1");
	if(cyberValue != null)
	{
		var aPairs = cyberValue.split("~");
		rValue = GetCookiePs(aPairs, lKey);
		return rValue;
	}
	return null;
}

function getEstDmbCookieValue(lKey)
{
	var estdmbValue = GetCookie("estdmb");
	if(estdmbValue != null)
	{
		var aPairs = estdmbValue.split("~");
		rValue = GetCookiePs(aPairs, lKey);
		return rValue;
	}
	return null;
}


/** NGM SSR **/
// CAS ��ȣ ��ȿ�� üũ
// CAS ��ȣ �Է�����(11�ڸ�): 111-222-3333-4
// - true: ��ȿ�� CAS ��ȣ
// - false: ��ȿ���� ���� CAS ��ȣ
function isSmartCardNoCheckDigit(arg) {
    var i = 0;
    var tmp = 0;
    var tmp2 = 0;
    var chkdgt = 0;

    for(i=9 ; i>=0 ; i--) {
        tmp = arg.substr(i,1) * (i%2 + 1);
        if(tmp>9) {
            tmp2 = tmp+"";
            tmp2 = tmp2.substr(0,1);
            tmp2 = parseInt(tmp2)*10;
        }
        else {
            tmp2 = 0;
        }
       chkdgt += tmp2/10;
       chkdgt += tmp%10;
    }

    tmp = chkdgt%10;
    if(tmp==0) {
        tmp = 0;
    }
    else {
        tmp = 10-tmp;
    }

    if(parseInt(arg.substr(10,1)) == tmp) {
        return true;
    }
    else {
        return false;
    }
}




//********************************************************************/
// hini �׸�
//********************************************************************/
// ������ ��ȸ START
function subsidyCheck(svc_num1, svc_num2, svc_num3, soc_sec_num1, soc_sec_num2, pName) {

    if ( !svc_num1 || svc_num1.length < 3) {
        alert('�޴�����ȣ�� �ٸ��� �Է��� �ּ���.');
    } else if ( !svc_num2 || svc_num2.length < 3 ) {
        alert('�޴�����ȣ�� �ٸ��� �Է��� �ּ���.');
    } else if ( !svc_num3 || svc_num3.length < 4 ) {
        alert('�޴�����ȣ�� �ٸ��� �Է��� �ּ���.');
    } else if ( !soc_sec_num1 || soc_sec_num1.length < 6 ) {
        alert('�ֹε�Ϲ�ȣ�� �ٸ��� �Է��� �ּ���.');
    } else if ( !soc_sec_num2 || soc_sec_num2.length < 7 ) {
        alert('�ֹε�Ϲ�ȣ�� �ٸ��� �Է��� �ּ���.');
    } else if ( !pName ) {
        alert('�̸��� �ٸ��� �Է��� �ּ���.');
    } else {
    	//var page= 'http://150.20.15.155/common/popup/popup_phone_subsidy02.html';
		
			var page='http://m2.tworld.co.kr/jsp/global/subsidy/view/cm7_grantpay_ifram_main.jsp'+'?returnURL='+escape(document.URL);
    	//page = 'http://m2.tworld.co.kr/jsp/subsidy_test.jsp';
    	
    	//document.write(' <form name="mform" method="post" action='+page+'>	');
	    //document.write(' <input type="hidden" name="SVCNUM1" value='+svc_num1+'>      ');
	    //document.write(' <input type="hidden" name="SVCNUM2" value='+svc_num2+'>      ');
	    //document.write(' <input type="hidden" name="SVCNUM3" value='+svc_num3+'>      ');
	    //document.write(' <input type="hidden" name="SOCSECNUM1" value='+soc_sec_num1+'>   ');
	    //document.write(' <input type="hidden" name="SOCSECNUM2" value='+soc_sec_num1+'>   ');
	    //document.write(' </form>                                                      ');
    	
    	
			var winName = '';
		//	var page='http://m2.tworld.co.kr/global/subsidy/view/cm6_grantpay_ifram_main.jsp?svc_num1='+svc_num1+
		//		'&svc_num2='+svc_num2+'&svc_num3='+svc_num3+'&soc_sec_num1='+soc_sec_num1+'&soc_sec_num2='+soc_sec_num2+'&pName='+pName;
			
			//popup(winName, page,'480','350','auto','auto','0','0','0');
	 
	    //window.open('','SUBSIDY','toolbar=no,width=570px,height=570px,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no');
	    
	    document.mform.method = 'post';
	    document.mform.action = page;
	    document.mform.target = 'hiddenFrm';
    	document.mform.submit();
    }
}



/******************************************************************************
 ******************************************************************************

  added by hubba - ���Ͽ� n_main_index_ver2.js �� �߰���

 ******************************************************************************
*******************************************************************************/


// �������� �󼼺���
function goNoticeDetail(pk_num){
    //alert('�������� �󼼺��� �̵� pk_num ::'+pk_num);
     var depth = arguments.length;
    if (depth>0){
        document.location.href="http://m2.tworld.co.kr/normal.do?serviceId=S_ETC_0022&viewId=V_CMN_0005&serNum=" + pk_num+"&returnURL="+escape(document.URL);
    }else{
        document.location.href="http://m2.tworld.co.kr/normal.do?serviceId=S_ETC_0021&viewId=V_CMN_0004"+"&returnURL="+escape(document.URL);
    }
}

function rollNotice(thisHeight)
{
    var divTag = document.getElementById("noticexml");
	var height = 14;	// text font size : pixel
//	var delay = 2000;	
	var delay = 3000;	
//	var speed = 40;	// 1ĭ �̵� �ӵ�
	var speed = 40;	// 1ĭ �̵� �ӵ�
    var aTag, i;
    
    thisHeight ++;
    if(thisHeight < height) {
        divTag.style.top = -thisHeight;
        setTimeout("rollNotice(" + thisHeight + ");", speed);
    } else {
        aTag = divTag.getElementsByTagName("a");
        divTag.appendChild(aTag[0]);
        divTag.style.top = 0;
        setTimeout("rollNotice(0);", delay);
    }

    return true;
}


/******************************************************************************
 ******************************************************************************

  added by hubba - ���Ͽ� ��ǰ�̵� ��ũ��Ʈ ����

 ******************************************************************************
*******************************************************************************/



/**
 * ��ǰ ���� �̵� 2008.08.29
 * @author ������
 */
function goProductDetailUI(prodId) {
	var vUrl = 'http://m2.tworld.co.kr';
	var servlet = '/normal.do?serviceId=S_PROD2001&viewId=V_PROD2001';
	var vParam = '&prod_id='+prodId;
	location.href = vUrl + servlet + vParam;
}

/**
 * ��ǰ ���� �̵� - ���񽺰�����ȣ ���� (��ȸ��) 2008.08.29
 * @author ������
 */
function goProductDetailUISvc(prodId,svcNo) {
	var vUrl = 'http://m2.tworld.co.kr';
	var servlet = '/normal.do?serviceId=S_PROD2001&viewId=V_PROD2001';
	var vParam = '&prod_id='+prodId+'&svc_mgmt_num='+svcNo;
	location.href = vUrl + servlet + vParam;
}

/**
 * ��ǰ ���� �̵� � iframe �ȿ����� 2008.09.18
 * @author ������
 */
function goProductDetailUIFrame(prodId) {

	var vUrl = 'http://m2.tworld.co.kr';
	var servlet = '/normal.do?serviceId=S_PROD2001&viewId=V_PROD2001';
	var vParam = '&prod_id='+prodId;
	window.top.b.location.href=vUrl + servlet + vParam;
}

/**
 * ��ǰ ����Ʈ �̵� 2008.08.29
 * @author ������
 */
function goProductListUI(paramctg1,paramctg2,paramctg3,paramctg4) {
	var vUrl = 'http://m2.tworld.co.kr';
	var servlet1 = '/normal.do?serviceId=S_PROD1001&viewId=V_PROD1001';
	var servlet2 = '/normal.do?serviceId=S_PROD1002&viewId=V_PROD1002';
	var vParam = '&paramCtg1='+paramctg1+'&paramCtg2='+paramctg2+'&paramCtg3='+paramctg3+'&paramCtg4='+paramctg4;
	if(paramctg3 == "" || paramctg2 == paramctg3) location.href = vUrl + servlet1 + vParam;
	else location.href = vUrl + servlet2 + vParam;
}

/**
 * ��ǰ �±� ����Ʈ �̵� 2008.08.29
 * @author ������
 */
function goProductListTagUI(param1) {
	var vUrl = 'http://m2.tworld.co.kr';
	var servlet = '/normal.do?serviceId=S_PROD1003&viewId=V_PROD1003';
	var vParam = '&cmd=tag&paramSearch='+param1;
	location.href = vUrl + servlet + vParam;
}

/**
 * ��ǰ MKT ����Ʈ �̵�2008.08.29
 * @author ������
 */
function goProductListMktUI(param1) {
	var vUrl = 'http://m2.tworld.co.kr';
	var servlet = '/normal.do?serviceId=S_PROD1003&viewId=V_PROD1003';
	var vParam = '&cmd=mkt&paramSearch='+param1;
	location.href = vUrl + servlet + vParam;
}



/******************************************************************************
 ******************************************************************************

  added by hubba - ���Ͽ� MM_ ��ũ��Ʈ ����

 ******************************************************************************
*******************************************************************************/

/*function setPng24(obj) {
    obj.width=obj.height=1;
    obj.className=obj.className.replace(/\bpng24\b/i,'');
    obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');"
    obj.src='';
    return '';
}*/

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
function MM_showHideLayers() { //v9.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) 
  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}


/******************************************************************************
 ******************************************************************************

  ��ȣȭ ���� ��ũ��Ʈ

 ******************************************************************************
*******************************************************************************/
function genkey() {
	seed("MTWORLD");

	var bits=128;

	rsaKeys(bits);
	
	var mpi=s2r(b2mpi(rsa_pq)+b2mpi(rsa_e));
	mpi=mpi.replace(/\n/,'');

	return mpi;
}

function RSAdoEncryption(frm) {
	var pkey = genkey();

	var mod=new Array();
	var exp=new Array();
	
	var s = r2s(pkey);
	var l = Math.floor((s.charCodeAt(0)*256 + s.charCodeAt(1)+7)/8);
	
	mod = mpi2b(s.substr(0,l+2));
	exp = mpi2b(s.substr(l+2));
	
	var p = frm.PASSWORD.value+String.fromCharCode(1);
	var pl = p.length;
	
	if(pl > l-3)
	{
	   alert('��ȣ�� '+(l-3)+' bytes ���� �Է��Ͽ� �ֽʽÿ�.');
	   return;
	}
	
	var b=s2b(p);
	
	var t;
	var i;
	
	var enc=RSAencrypt(b,exp,mod);
	
	var ciphertext = s2hex(b2s(enc));

	var expiredays = -1;
	//if ( document.loginform.SaveIdInd.checked ) expiredays = 30;
	if ( frm.SaveIdInd.checked ||
		frm.SavePwInd.checked ) expiredays = 30;
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	
	document.cookie = 'rsa_p=' + rsa_p+ '; path=/; expires=' + todayDate.toGMTString() + '; domain=.tworld.co.kr';        		
	document.cookie = 'rsa_q=' + rsa_q+ '; path=/; expires=' + todayDate.toGMTString() + '; domain=.tworld.co.kr';        		
	document.cookie = 'rsa_d=' + rsa_d+ '; path=/; expires=' + todayDate.toGMTString() + '; domain=.tworld.co.kr';        		
	document.cookie = 'rsa_e=' + rsa_e+ '; path=/; expires=' + todayDate.toGMTString() + '; domain=.tworld.co.kr';        		
	document.cookie = 'rsa_u=' + rsa_u+ '; path=/; expires=' + todayDate.toGMTString() + '; domain=.tworld.co.kr';        		
	document.cookie = 'rsa_pq=' + rsa_pq+ '; path=/; expires=' + todayDate.toGMTString() + '; domain=.tworld.co.kr';        		
	document.cookie = 'ciphertext=' + ciphertext+ '; path=/; expires=' + todayDate.toGMTString() + '; domain=.tworld.co.kr';        		
}
 
function RSAdoDecryption() {	
	if(GetCookie('ciphertext') == null || GetCookie('ciphertext') == "") {
		return "";
	} else {
		var p = GetCookie('rsa_p').split(",");
		var q = GetCookie('rsa_q').split(",");
		var d = GetCookie('rsa_d').split(",");
		var u = GetCookie('rsa_u').split(",");
		var enc=s2b(hex2s(GetCookie('ciphertext')));

		var dec=b2s(RSAdecrypt(enc, d, p, q, u));
		
		var pwd = dec.substr(0, dec.length-1);
	
		return pwd;
	}
}

function goMenuInfo(menuId) {
	if(menuId == "1_1") {
		//�ǽð� �����ȸ
		location.href = "/jsp/center/menu/cm8_menu_guide_sub_1.jsp"+"?returnURL="+escape(document.URL);
	} else if(menuId == "1_2") {
		//�ܿ� ������ȭ ��ȸ
		location.href = "/jsp/center/menu/cm8_menu_guide_sub_2.jsp"+"?returnURL="+escape(document.URL);
	} else if(menuId == "1_3") {
		//û����� ��ȸ
		location.href = "/jsp/center/menu/cm8_menu_guide_sub_3.jsp"+"?returnURL="+escape(document.URL);
	} else if(menuId == "1_4") {
		//���γ��� ��ȸ
		location.href = "/jsp/center/menu/cm8_menu_guide_sub_4.jsp"+"?returnURL="+escape(document.URL);
	} else if(menuId == "1_5") {
		//�ڳ��� ��ȸ
		location.href = "/jsp/center/menu/cm8_menu_guide_sub_5.jsp"+"?returnURL="+escape(document.URL);
	} else if(menuId == "1_6") {
		//������� ��ȸ
		location.href = "/jsp/center/menu/cm8_menu_guide_sub_6.jsp"+"?returnURL="+escape(document.URL);
	} else if(menuId == "1_7") {
		//�Ҿװ���/���������� �̷�
		location.href = "/jsp/center/menu/cm8_menu_guide_sub_7.jsp"+"?returnURL="+escape(document.URL);
	} else if(menuId == "1_8") {
		//���� ��ȯ�ޱ� ��ȸ
		location.href = "/jsp/center/menu/cm8_menu_guide_sub_8.jsp"+"?returnURL="+escape(document.URL);
	} else if(menuId == "1_9") {
		//û�� ���� ����
		location.href = "/jsp/center/menu/cm8_menu_guide_sub_9.jsp"+"?returnURL="+escape(document.URL);
	} else if(menuId == "2_1") {
		//T�Һ�/�⺻���� �����ȸ
		location.href = "/jsp/center/menu/cm8_menu_guide_sub_10.jsp"+"?returnURL="+escape(document.URL);
	} else if(menuId == "4_1") {
		//����� �����ѵ�
		location.href = "/jsp/center/menu/cm8_menu_guide_sub_11.jsp"+"?returnURL="+escape(document.URL);
	} else if(menuId == "4_2") {
		//���κ�������Ʈ
		location.href = "/jsp/center/menu/cm8_menu_guide_sub_13.jsp"+"?returnURL="+escape(document.URL);
	} else if(menuId == "4_3") {
		//����Ʈ�ڽ�
		location.href = "/jsp/center/menu/cm8_menu_guide_sub_14.jsp"+"?returnURL="+escape(document.URL);
	} else if(menuId == "4_4") {
		//����ʾȳ�
		location.href = "/jsp/center/menu/cm8_menu_guide_sub_15.jsp"+"?returnURL="+escape(document.URL);
	} else if(menuId == "5_1") {
		//��ȭ��㿹��
		location.href = "/jsp/center/menu/cm8_menu_guide_sub_16.jsp"+"?returnURL="+escape(document.URL);
	}
}	

function enterKeyFalse() {
	if(event.keyCode == 13 ) {
		event.returnValue = false;
	}
}
/**
 * ���� ��ǰ ���� �̵� 2011.05.23
 * @author ������
 */
function goWireProductDetailUI(prodId) {

	var vUrl = 'http://m2.tworld.co.kr';
	var servlet = '/wire.do?serviceId=S_WIRE3000&viewId=V_WIRE3000';
	var vParam = '&prod_id='+prodId;
	location.href = vUrl + servlet + vParam;
}

// pc���� tworld ����
function goTworld() {
    if(confirm("�Ϻ� ȭ���� ����Ͽ��� ����������\n�̿��Ͻ� �� �����ϴ�.\n�� 3G �Ǵ� LTE�� ���� ������ �����\n���ݵ˴ϴ�.")) {
        window.open('http://www.tworld.co.kr?goPc=Y');
        //location.href = 'http://www.tworld.co.kr?goPc=Y';
    }
}

function telConfirm(val, type){
    if(type!='I' && type!='B') {
        if(confirm(val + "������ ��ȭ ���� �Ͻðڽ��ϱ�?")) {
            location.href = 'tel:' + val;
        }
    } else {
        location.href = 'tel:' + val;
    }
}    