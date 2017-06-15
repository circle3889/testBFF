<!--
/** 
 * 에러 처리를 합니다.
 */
function errHandler(msg, value )
{
	var isErr = false;

	if ( value == 0 | value == null | value == "" )
	{
		alert(msg + " 실패");
		isErr = false;
	}
	else isErr = true;

	return isErr;
}
/**
 * 어떤값이 널인지 체크합니다.
 */
function isNull( str )
{
	if (str == "" | str == null ) return true;
	else false;
}

/**
 * 폼의 값이 널인지 체크합니다.
 */
function formCheck (msg, formValue)
{
	if (isNull(formValue))
	{
		alert(msg + "가(이) 없습니다.!!");
		return false;
	} else return true;
}
/**
 * 문자열의 앞뒤 공백을 없앱니다.
 */
function trim(value) {
	value = value.replace(/^\s+/, "");  // remove leading white spaces
	value = value.replace(/\s+$/g, ""); // remove trailing while spaces
	return value;
}

function removeCR(value)
{
	return value.replace(/\r/,"");
}

/**
 * 브라우저의 버전을 체크합니다.
 */
function getbrowser()
{
    var tempdocument = window.document;

    if (tempdocument.all && tempdocument.getelementbyid) // 인터넷 익스플로러 5.x
    {
        return 1;
    }
    else if (tempdocument.all && !tempdocument.getelementbyid) // 인터넷 익스플로러 4.x
    {
        return 2;
    }
    else if (tempdocument.getelementbyid && !tempdocument.all) // 넷스케이프 6
    {
        return 3;
    }
    else if (tempdocument.layers) // 넷스케이프 4.x
    {
        return 4;
    }
}

/**
 * 페이지 이동을 합니다.
 * @param        delay        페이지 이동 지연 시간 (milliseconds)
 */
function movepage(str,delay)
{
    if (delay==null)
        window.location.href=str;
    else
        window.setinterval("window.location.href='"+str+"'",delay);
}
/**
 * 현재 히스토리 엔트리에 페이지를 읽어들입니다. (뒤로가기 버튼 비활성화)
 */
function replacepage(str,delay)
{
    if (delay==null)
        window.location.replace(str);
    else
        window.setinterval("window.location.replace('"+str+"')",delay);
}

/**
 * 현재 페이지 새로 고침
 */
function reloadpage(delay)
{
if (delay==null)
        window.location.reload();
    else
        window.setinterval("window.location.reload()",delay);
}
/**
 * 올바른 메일형식인지 체크합니다.
 */
function isvalidemail(str)
{
    var re=new regexp("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$","gi");
    var matcharray=str.match(re);
    if (matcharray) return true;
    else return false;
}
/**
 * 올바른 전화번호 형식(숫자-숫자-숫자)인지 체크합니다.
 */
function isvalidphone(str)
{
    if (str.search(/^(\d+)-(\d+)-(\d+)$/g)!=-1) return true;
    else return false;
}

/**
 * 알파벳만으로 구성된 문자열인지 체크합니다.
 */
function isalphabet(str)
{
    if (str.search(/[^a-za-z]/g)==-1) return true;
    else return false;
}

/**
 * 대문자로만 구성된 문자열인지 체크합니다.
 */
function isuppercase(str)
{
    if (str.search(/[^a-z]/g)==-1) return true;
    else return false;
}

/**
 * 소문자로만 구성된 문자열인지 체크합니다.
 */
function islowercase(str)
{
    if (str.search(/[^a-z]/g)==-1) return true;
    else return false;
}

/**
 * 한글로만 구성된 문자열인지 체크합니다.
 */
function iskorean(str)
{
    var strlength = str.length;
    var i;
    var unicode;

    for (i=0;i<strlength;i++)
    {
        unicode = str.charCodeAt(i);
        if ( !(44032 <= unicode && unicode <= 55203) ) return false;
    }
    return true;
}

/**
 * 숫자만으로 구성된 문자열인지 체크합니다.
 */
function isdigit(str)
{
    if (str.search(/[^0-9]/g)==-1) return true;
    else return false;
}

/**
 * 폼의 값을 초기화
 * @params formType : 폼 타입(text, textarea 등등)
 */
function resetForm(tag, formType)
{
	// document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	var collTxt = document.getElementsByTagName(tag);

	for(var i=0; i<collTxt.length; i++)  // 모든 INPUT 에 대하여
	{
		if (formType == null | formType == "")
		{
			collTxt[i].value="";
		}
		// 그 TYPE을 검사하여 TEXT 이면 값을 비운다.
		else if (collTxt[i].type == formType) collTxt[i].value="";
	}
}

/**
 * 경로를 입력받아 디렉토리이름, 파일이름, 파일 확장자가 담긴 배열을 반환합니다.
 * @params formType : 파일 경로
 */
function splitPath( fullPath )
{
	var pathLength = fullPath.length;
	var lastDelim = fullPath.lastIndexOf("\\")+1;
	var startIndex = 0;

	//디렉토리 분리
	var dirname = fullPath.substring(0 , lastDelim);
	//파일 분리 및 파일이름과 확장자 분리
	var fullfilename = fullPath.substring(lastDelim, pathLength);
	var filename = fullfilename.substring(0, fullfilename.lastIndexOf("."));
	var fileext= fullfilename.substring(fullfilename.lastIndexOf("."), fullfilename.length);

	//var signedXmlFile = dirname+filename+"-sign"+fileext;

	var splitArray = new Array (dirname, filename, fileext);
	return (splitArray);
}
/**
 * 새로운 창을 연다.
 * @params url : 파일 경로
 * @params name : 창 타이틀 이름
 * @params width : 넓이
 * @params height : 높이
 * @params scroll : 스크롤 여부
 * @params locTop : top 마진
 * @params locLeft : left 마진
 *
 */
function jsOpenWindowPos(url, name, width, height, scroll, locTop, locLeft){
	var top, left;
	if(scroll == null || scroll == '')	scroll='0';
	if(locTop != null) {
		top	 = locTop;
		left = locLeft;
	} else {
		top  = 10;
		left = 10;
	}
	var	option = 'width='+width+',height='+height+',top='+top+',left='+left+',resizable=yes,status=no,toolbar=no,menubar=no,scrollbars=' + scroll;
   	var win = window.open(url, name, option);
   	win.focus();
   	return win;
}

function jsOpenWindow(url, name, width, height, scroll, loc){
	var top, left;
	if(scroll == null || scroll == '')	scroll='0';
	if(loc != null) {
		top	 = screen.height/2 - height/2 - 50;
		left = screen.width/2 - width/2 ;
	} else {
		top  = 10;
		left = 10;
	}
	var	option = 'width='+width+',height='+height+',top='+top+',left='+left+',resizable=yes,status=no,toolbar=no,menubar=no,scrollbars=' + scroll;
   	var win = window.open(url, name, option);
   	win.focus();
   	return win;
}

function goIbChalTuchal(num, cha){

	var x = (screen.width - 840) / 2 ;
	var y = (screen.height - 600) / 2 ;
	var action = "투찰";
	var docType = "OrderBid";

	/*window.open("http://www.g2b.go.kr:8081/servlet/GG/EP_MPV_GGQ019?gonggo_num=" + num +
		"&gonggo_cha=" + cha + "&action=" + action + "&docType=" + docType,"tuchal", "left=50, top=50, width=840, height=600, toolbar=no, scrollbars=yes, menubar=no, resizable=yes");*/

	window.open("a.jsp","tuchal", "left=50, top=50, width=840, height=600, toolbar=no, scrollbars=yes, menubar=no, resizable=yes");

}

function myfun()
{
 var collTxt = document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
 for(var i=0; i<collTxt.length; i++)  // 모든 INPUT 에 대하여
 {
  if(collTxt[i].type=="text")           // 그 TYPE을 검사하여 TEXT 이면
   collTxt[i].value="";                 // 값을 비운다.
 }
}

function getFilePath(inputform)
{
	inputform.value = SG.SGJ_getFilePath();
}

-->
