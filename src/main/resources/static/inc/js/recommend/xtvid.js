// function isXTVID()		: xTractor에서 사용하기 위한 virtual id가 쿠키에 존재하는지 체크한다
// function datetime()		: 현재 시간으로부터 yymmddhhmmssMMM 형식의 문자열을 생성한다
// function SetVIDCookie()	: 쿠키 sol에 XTVID 값을 설정한다
// function makeXTVID()		: 쿠키 여부를 체크하여 없을때 쿠키를 생성시킨다

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

function isXTVID() {
	var vid = GetCookie("XTVID");    
	if(vid!=null && vid!="") {
		return true;
	} 
	return false;
}

function makeXTVID(yy,mm,dd,hh,mn,ss,mis) {
    if (! isXTVID()) {
        SetVIDCookie(yy,mm,dd,hh,mn,ss,mis);
	}
}

function makeXTVIDc() {
    if (! isXTVID()) {
        SetVIDCookiec();
	}
}

function SetVIDCookie(yy,mm,dd,hh,mn,ss,mis){
//	alert(yy+"," + mm + "," + dd + "," + hh + "," + mn + "," + ss + "," +mis);
    var randomValue = Math.floor(Math.random()* 1000);        // 3자리 난수 발생
    cookieVal = "A" + datetime(yy,mm,dd,hh,mn,ss,mis) + randomValue;
	expireDate = new Date(yy,mm,dd,hh,mn,ss,mis);
	expireDate.setYear(expireDate.getYear()+ 10);
	document.cookie = "XTVID="+escape(cookieVal)+"; expires="+ expireDate.toGMTString() + "; path=/; domain=tworld.co.kr";
      // XTVID =  웹서버 식별문자 (A...Z ) 한자리  + yymmdd (쿠키생성일자)  + hhmmss (쿠키생성시각)  
      //       +  MMM (쿠키 생성시각 1/1000 초) + RRR (난수)
}
function SetVIDCookiec(){
    var randomValue = Math.floor(Math.random()* 1000);        
    cookieVal = "A" + datetimeToStr() + randomValue;
	expireDate = new Date();
	expireDate.setYear(expireDate.getYear()+ 10);
	document.cookie = "XTVID="+escape(cookieVal)+"; expires="+ expireDate.toGMTString() + "; path=/; domain=tworld.co.kr";
}

function datetimeToStr() {
    var str = '';
    nowdate = new Date();
    digit = nowdate.getYear();
    if (digit < 2000) { 
		digit = digit - 1900;
    } else {
		digit = digit - 2000;
	}
	str = str + makeStr(digit);

    digit = nowdate.getMonth() + 1;
	str   = str + makeStr(digit);

    digit = nowdate.getDate();
	str   = str + makeStr(digit);

    digit = nowdate.getHours();
	str   = str + makeStr(digit);
    
	digit = nowdate.getMinutes();
	str   = str + makeStr(digit);

    digit = nowdate.getSeconds();
	str   = str + makeStr(digit);

    digit = nowdate.getMilliseconds();
	if ((digit <= 99) && (digit > 9)) { 
        str = str+ '0' + digit;
    } else if (digit <= 9) {
        str = str+ '00' + digit;
    } else {
		str = str + '' + digit;
	}
    return str;
}

function datetime(yy,mm,dd,hh,mn,ss,mis) {
    var str = '';
    if (yy < 2000) { 
		yy = yy - 1900;
    } else {
		yy = yy - 2000;
	}
	str = str + makeStr(yy);
	str = str + makeStr(mm);
	str = str + makeStr(dd);
	str = str + makeStr(hh);
	str = str + makeStr(mn);
	str = str + makeStr(ss);

	if ((mis <= 99) && (mis > 9)) { 
        str = str+ '0' + mis;
    } else if (mis<=9) {
        str = str+ '00' + mis;
    } else {
		str = str + '' + mis;
	}
    return str;
}

function makeStr(val) {
	var st = '';
	if (val <= 9) {
		st = st + '0' + val
	} else {
		st = st + '' + val
	}
	return st;
}