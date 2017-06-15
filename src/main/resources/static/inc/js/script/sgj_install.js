var _app = navigator.appName;
//alert(_app);
var os = window.navigator.appVersion;
//alert(os);

var object_id = "SG_OpenWeb";

var popupWin;

var code;
var codebase;
var archive;
var ProductHome;
var sgAppletFile;
var sgAppletFileVersion;
var sessionId = "enteryoursitename";
var nativeLib;

//코드 베이스 초기화 
function initCodebase()
{
	//애플릿 모듈이 설치된 위치
	codebase = "/jsp/appsign/info/cab/";
	code = "com.sg.openews.client.launcher.LauncherApplet";
}

//Secukit 만 띄울 경우
function initCore()
{
	archive ="launcher.jar,ldapjdk.jar,sgsecukit.jar,signgateCrypto.jar,libgpkiapi_jni.jar,sggpki.jar";
	//애플릿 모듈이 설치된 위치
	ProductHome ="/jsp/appsign/info/cab/";
	sgAppletFile = "sgapplet.jar;ewscommon.jar;images.jar";
	//애플릿 모듈 버전
	sgAppletFileVersion = "1.0.46;1.0.47;1.0.42";
	//윈도우인 경우 C 라이브러리 버전
	nativeLib = "BHSM_JNI.dll-1.0.0.1,KICAUAC.dll-1.0.0.2,KicaUACJni.dll-1.0.0.2,VerCheck-1.0.0.1";
}


function getParamString(name, value)
{
	return '<param name="' + name + '" value="' + value + '"/>';
}

function getObjectTag(id, objclassid, jreCodebase)
{
	return '<object id="' + id + '" classid="' + objclassid + '" width="0" height="0" codebase="' + jreCodebase + '">';
}

function getAppletTag(id, appletCode, appletCodebase, appletArchive)
{
	return '<applet '
	+ 'id="' + id + '" '
	+ 'code="'+ appletCode + '" '
	+ 'width="0" height="0" MAYSCRIPT '
	+ 'codebase="' + appletCodebase + '" '
	+ 'archive="' + appletArchive + '">';
}

function getAppletTagNoArchive(id, appletCode, appletCodebase)
{
	return '<applet '
	+ 'id="' + id + '" '
	+ 'code="'+ appletCode + '" '
	+ 'width="0" height="0" MAYSCRIPT '
	+ 'codebase="' + appletCodebase + '">';
}

window.onload = function ()
{

	initCodebase();
	initCore();

	/*
	initCodebaseJodal();
	initCoreJodal();
	*/

	var divObj = document.createElement('div');
	divObj.setAttribute("id", "sgews");
	document.body.appendChild(divObj);
	document.getElementById("sgews").style.width = 0;
	document.getElementById("sgews").style.height = 0;
	var sgews = document.getElementById("sgews");

	if((_app == 'Mozilla' || _app == "Netscape"))
	{
		var embed = '<embed ';
		var embedAttribute = new Array(
			'id="'+ object_id + '"',
			'code="'+ code + '"',
			'codebase="'+ codebase + '" ',
			'type="application/x-java-applet;version=1.6"',
			//'pluginpage="http://java.sun.com/javase/downloads"',
			'pluginpage="http://javadl.sun.com/webapps/download/GetFile/1.6.0_25-b06/windows-i586/xpiinstall.exe"',
			'width="0"', 'height="0"',
			'archive="'+ archive + '"',
			//'cache_archive="'+ archive + '"',
			'java_arguments="-Djnlp.packEnabled=true"',
			'separate_jvm=true',
			'MAYSCRIPT="yes"',
			'codebase_lookup="false"',
			'ProductHome="'+ ProductHome + '"',
			'sgAppletFile="'+ sgAppletFile + '"',
			'nativeLib="'+ nativeLib + '"',
			'sgAppletFileVersion="'+ sgAppletFileVersion + '"'
		);

		var embedAttrString = '';
		for(var i=0;i<embedAttribute.length;i++)
		{
			embedAttrString = embedAttrString + embedAttribute[i] + ' ';
		}
		var embedTagString = '<embed ' + embedAttrString + '/>';
		sgews.innerHTML = embedTagString;

	}
	else if(_app == "Microsoft Internet Explorer")
	{
		var classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93";
		var jreCodebase="http://java.sun.com/update/1.6.0/jinstall-6u25-windows-i586.cab#Version=6,0,25,4";
		var onError = "";

		var objectTagString = getObjectTag(object_id, classid, jreCodebase)
			+ getParamString("code", code)
			+ getParamString("archive", archive)
			//+ getParamString("cache_archive", archive)
			+ getParamString("codetype", "application/x-java-applet")
			+ getParamString("ProductHome", ProductHome)
			+ getParamString("sgAppletFile", sgAppletFile)
			+ getParamString("sgAppletFileVersion", sgAppletFileVersion)
			+ getParamString("nativeLib", nativeLib)
			+ getParamString("MAYSCRIPT", "yes")
			+ getParamString("scriptable", "true")
			+ getParamString("codebase", codebase)
			+ getParamString("codebase_lookup", "false")
			+ getParamString("java_arguments", "-Djnlp.packEnabled=true")
			+ getParamString("separate_jvm", "true")
			+ ' </object>';

		sgews.innerHTML = objectTagString;
	}
	else
	{
		var appletTagString = getAppletTagNoArchive(object_id, code, codebase)
		//+ getParamString("cache_archive", archive)
		+ getParamString("archive", archive)
		+ getParamString("scriptable", "true")
		+ getParamString("MAYSCRIPT", "yes")
		+ getParamString("ProductHome", ProductHome)
		+ getParamString("sgAppletFile", sgAppletFile)
		+ getParamString("sgAppletFileVersion", sgAppletFileVersion)
		+ getParamString("nativeLib", nativeLib)
		+ getParamString("java_arguments", "-Djnlp.packEnabled=true")
		+ getParamString("separate_jvm", "true")
		+ getParamString("codebase_lookup", "false")
		+ '</applet>';
		sgews.innerHTML = appletTagString;
	}
};