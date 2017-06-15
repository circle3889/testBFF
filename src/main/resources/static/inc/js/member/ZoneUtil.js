

function zeroCheck(obj)		// 전화번호 입력시 국번에 0을 입력하지 못하도록 함.
{
    var chk = obj.value;
    if(obj.value.substring(0) == '0'){
        document.frmMain.PhoneNum1.value = '';
        return;
    }

}

function zeroCheckComm(obj, objTelGuk)		// 전화번호 입력시 국번에 0을 입력하지 못하도록 함.(0505,0502 제외)
{
    var telGuk = objTelGuk.value;
    //alert("telGuk==" + telGuk);

    var chk = obj.value;
    
    if(telGuk == '0505'  ||  telGuk == '0502')
    {}
    else   {
	    if(obj.value.substring(0) == '0'){
	        document.frmMain.PhoneNum1.value = '';
	        return;
	    }
	}   
}


function checkNum(obj)		//숫자 검사
{
	inStr	=	obj.value;
	for(var i=0; i<inStr.length;i++)
	{
		if(inStr.substring(i,i+1) < "0" || inStr.substring(i,i+1) > "9")
		{
			alert("이 필드는 숫자만 입력 가능합니다.");
			obj.value = "";
			obj.focus();
			return false;
		}
	}
	return true;
}

function checkNumCode()		//숫자 검사
{
    if((event.keyCode < 48) || (event.keyCode > 57)) {
        event.returnValue = false;
        alert("이 필드는 숫자만 입력 가능합니다.");
        return;
    }
    return true;
}

//checkChar 고객명 체크 전용함수로 변경. 변경사항: 하이픈'-' 대상에서 제외 2008.12.16
function checkChar(obj) {		//알파벳 검사
    var chars = "`~!@#$%^&*()_-=+{}[]|\:;\"\\'<>,./?0123456789";
    var InStr = obj.value;
    for (var inx = 0; inx < InStr.length; inx++) {
        if (chars.indexOf(InStr.charAt(inx)) > -1){
            alert('특수문자 또는 숫자는 입력할 수 없습니다.');
            obj.value ='';
            obj.focus();
            return false; // 해당 문자가 있을 때
        }
    }
	return true;
}

	function checkLenMoveNext(CurObj, chSize, AftObj) 	//첫번째 obj의 길이 검사 후 다음으로 focus 옯김
	{
	   if(CurObj.value.length>=chSize)  AftObj.focus();
	   else  return false ;
	   return true ;
	}

    function clear(frm){
        frm.value="";
        frm.focus();
    }

function getCookie(name) {		//쿠키 읽음
    var Found = false
    var start, end
    var i = 0

    while(i <= document.cookie.length) {
        start = i
        end = start + name.length

        if(document.cookie.substring(start, end) == name) {
            Found = true
            break
        }
        i++
    }

    if(Found == true) {
        start = end + 1
        end = document.cookie.indexOf(";", start)
        if(end < start)
            end = document.cookie.length
        return document.cookie.substring(start, end)
    }
    return ""
}

function ignoreSpaces(string) 
{
	var temp = ""; 
	string = '' + string; 
	splitstring = string.split(" "); 
	for(i = 0; i < splitstring.length; i++) 
		temp += splitstring[i]; 
	return temp; 
}

//일자검사
function checkdate(v_year,v_month,v_day )
{
	var err=0;
	r_year = eval(v_year) ; 
	r_month = eval(v_month); 
	r_day = eval(v_day)  ; 
	
	if (r_month==4 || r_month==6 || r_month==9 || r_month==11)
	{
		if (r_day==31) err=1;
	}

	// 2,윤년체크
	if (r_month==2)
	{
		var g = parseInt(r_year/4);

		if (isNaN(g)) 
		{
			err=1;
		}
		
		if (r_day>29) err=1;
		
		if (r_day==29 && ((r_year/4)!=parseInt(r_year/4))) err=1;
	}

	if (err==1)
	{
		return false;
	}
	else
	{
	    return true;
	}
}

/*  기능 : 넘겨온 일자와 현재일자를 비교한다.
 *  Param   v_year  년도
 *  Param   v_month 월
 *  Param   v_day   일
 *  return  1 : 현재일자보다 크다, 0 : 같다. -1 : 현재일자보다 작다.
*/
function compCurrdate(v_year, v_month, v_day)
{
	var now,cyear,cmonth,cdate,currdate,ryear,rmonth,rday,pdate;
	var rtn=0;

	//현재일자 구함
	now = new Date();
	cyear = now.getYear();
	cmonth = (now.getMonth()+1);
	cdate = now.getDate();
	currdate = cyear * 10000 + cmonth * 100 + cdate

	ryear = eval(v_year) ; 
	rmonth = eval(v_month); 
	rday = eval(v_day)  ; 
	pdate = ryear * 10000 + rmonth * 100 + rday
	
	if (currdate < pdate)	{
		rtn = 1;
	}else if (currdate == pdate) {
		rtn = 0;
	} else {
		rtn = -1;
	}
    return rtn
}


function getToDay()	//오늘날짜
{

    var date = datToday;

    var year  = date.getFullYear();
    var month = date.getMonth() + 1; // 1월=0,12월=11이므로 1 더함
    var day   = date.getDate();

    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + day).length   == 1) { day   = "0" + day;   }

    return ("" + year + month + day)

}


function ByteLen(sMsg) {

	var sOneChar   = '';
	var iCounts    = 0;

	for (k = 0 ;k < sMsg.length ;k++) {
		sOneChar = sMsg.charAt(k);
		if (escape(sOneChar).length > 4) {
			iCounts += 2;
		}
		else  {
			iCounts++;
		}
	}

	return iCounts
}

function checkByteLen(Obj, maxsize) {

	var imaxlen    = 0;
	sMsg	=	Obj.value;

	imaxlen	=	ByteLen(sMsg);
	if ( imaxlen > maxsize ) {
		alert("항목의 최대 길이는 " + maxsize + "입니다.\n항목을 확인하세요.");
		Obj.value	=	"";
		return false;
	} else
		return true;
}

function checkByteLenYN(sMsg, maxsize) {
	var imaxlen    = 0;
	imaxlen	=	ByteLen(sMsg);
	if ( imaxlen > maxsize ) {
		return false;
	} else
		return true;
}
