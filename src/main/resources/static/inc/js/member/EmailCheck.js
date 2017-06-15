///////이메일 체크/////////////////////
/////2005.07.13 회원가입시 이메일실시간 검사추가 
/////이메일 실시간검사 여부 검사 function checkMailEnd(frm) 추가
///////EmailId 실시간 검사         function checkRealMail(frm)
//////f메일 검사                 unction checkeMailAddr(frm)	//

var DomainArray = new Array();
//DomainArray["hanmail.net"] = "Y";
//DomainArray["lycos.co.kr"] = "Y"; 2007.05.10 lycos.co.kr 사이트 이메일 실시간 검사가 안되므로 막음
//DomainArray["korea.com"] = "Y";   2007.04.18 korea.com 사이트 이메일 실시간 검사가 안되므로 막음
//DomainArray["nate.com"] = "Y";    2006.08.06 nate동기화 안함으로 막음
//DomainArray["empal.com"] = "Y";   2006.03.17막음
//DomainArray["freechal.com"] = "Y";
//DomainArray["yahoo.co.kr"] = "Y"; 2009.10.27 막음
//DomainArray["hotmail.com"] = "Y"; 2009.07.02 hotmail VOC 급증으로 인하여 막음
//DomainArray["dreamwiz.com"] = "Y"; 2009.10.27 막음


///////email 기타시///////////
function changeMail(frm)
{
    if (frm.EmailDomain.value == "0")
    {
        mailShow.style.display="";
        frm.EmailDomain1.focus();
    }
    else
    {
        mailShow.style.display = "none";
        checkRealMail(frm);
    }
}


function checkEmail(mail)
{

	if( mail == "" || mail == " " )
	{
		return true;
	}
	
	for(i = 0; i< mail.length; i++){
		if(mail.substring(i, i+1) == " " || mail.substring(i, i+1)==""){
			return false;
		}
	}
	/*************************************************************
	**@다음이 한글일경우 
	**************************************************************/
	idx = mail.indexOf("@");
	if( idx == -1 ) return false; // error
	//이메일 아이디 검사
	emailid = mail.substring(0, idx);
	if ( emailid.length < 1) return false; // error
	for(i = 0; i< emailid.length; i++){ 
		c = emailid.charAt(i); 
		if( !( (c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') 
		                              || (c == '-' || c == '_' || c == '.' ) ) ) {
			return false;	
		} 
	}
	idx++;
	temp = mail.substring(idx);	
	//alert("temp : " + temp);
	for(i = 0; i< temp.length; i++){ 
		c = temp.charAt(i); 
		//alert("c : " + c);
		if( !( (c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') 
		                              || (c == '-' || c == '_' || c == '.') ) ) {
			idx = temp.indexOf(".");
			if(idx == -1) return false; // error
			//alert("temp.substring(idx+1) : "+temp.substring(idx+1));
			if(temp.substring(idx+1)!="kr" && temp.substring(idx+1)!="KR"){
				return false;	
			}
		} 
	}
	return true;
}
//이메일 도메인 체크
function DomainCheck(Domainstr)
{	
	var asTopLevels;
	
	asTopLevels = new Array(258);
	
	asTopLevels[0] = "COM";
	asTopLevels[1] = "ORG";
	asTopLevels[2] = "NET";
	asTopLevels[3] = "EDU";
	asTopLevels[4] = "GOV";
	asTopLevels[5] = "MIL";
	asTopLevels[6] = "INT";
	asTopLevels[7] = "AF";
	asTopLevels[8] = "AL";
	asTopLevels[9] = "DZ";
	asTopLevels[10] = "AS";
	asTopLevels[11] = "AD";
	asTopLevels[12] = "AO";
	asTopLevels[13] = "AI";
	asTopLevels[14] = "AQ";
	asTopLevels[15] = "AG";
	asTopLevels[16] = "AR";
	asTopLevels[17] = "AM";
	asTopLevels[18] = "AW";
	asTopLevels[19] = "AC";
	asTopLevels[20] = "AU";
	asTopLevels[21] = "AT";
	asTopLevels[22] = "AZ";
	asTopLevels[23] = "BS";
	asTopLevels[24] = "BH";
	asTopLevels[25] = "BD";
	asTopLevels[26] = "BB";
	asTopLevels[27] = "BY";
	asTopLevels[28] = "BZ";
	asTopLevels[29] = "BT";
	asTopLevels[30] = "BJ";
	asTopLevels[31] = "BE";
	asTopLevels[32] = "BM";
	asTopLevels[33] = "BO";
	asTopLevels[34] = "BA";
	asTopLevels[35] = "BW";
	asTopLevels[36] = "BV";
	asTopLevels[37] = "BR";
	asTopLevels[38] = "IO";
	asTopLevels[39] = "BN";
	asTopLevels[40] = "BG";
	asTopLevels[41] = "BF";
	asTopLevels[42] = "BI";
	asTopLevels[43] = "KH";
	asTopLevels[44] = "CM";
	asTopLevels[45] = "CA";
	asTopLevels[46] = "CV";
	asTopLevels[47] = "KY";
	asTopLevels[48] = "CF";
	asTopLevels[49] = "TD";
	asTopLevels[50] = "CL";
	asTopLevels[51] = "CN";
	asTopLevels[52] = "CX";
	asTopLevels[53] = "CC";
	asTopLevels[54] = "CO";
	asTopLevels[55] = "KM";
	asTopLevels[56] = "CD";
	asTopLevels[57] = "CG";
	asTopLevels[58] = "CK";
	asTopLevels[59] = "CR";
	asTopLevels[60] = "CI";
	asTopLevels[61] = "HR";
	asTopLevels[62] = "CU";
	asTopLevels[63] = "CY";
	asTopLevels[64] = "CZ";
	asTopLevels[65] = "DK";
	asTopLevels[66] = "DJ";
	asTopLevels[67] = "DM";
	asTopLevels[68] = "DO";
	asTopLevels[69] = "TP";
	asTopLevels[70] = "EC";
	asTopLevels[71] = "EG";
	asTopLevels[72] = "SV";
	asTopLevels[73] = "GQ";
	asTopLevels[74] = "ER";
	asTopLevels[75] = "EE";
	asTopLevels[76] = "ET";
	asTopLevels[77] = "FK";
	asTopLevels[78] = "FO";
	asTopLevels[79] = "FJ";
	asTopLevels[80] = "FI";
	asTopLevels[81] = "FR";
	asTopLevels[82] = "GF";
	asTopLevels[83] = "PF";
	asTopLevels[84] = "TF";
	asTopLevels[85] = "GA";
	asTopLevels[86] = "GM";
	asTopLevels[87] = "GE";
	asTopLevels[88] = "DE";
	asTopLevels[89] = "GH";
	asTopLevels[90] = "GI";
	asTopLevels[91] = "GR";
	asTopLevels[92] = "GL";
	asTopLevels[93] = "GD";
	asTopLevels[94] = "GP";
	asTopLevels[95] = "GU";
	asTopLevels[96] = "GT";
	asTopLevels[97] = "GG";
	asTopLevels[98] = "GN";
	asTopLevels[99] = "GW";
	asTopLevels[100] = "GY";
	asTopLevels[101] = "HT";
	asTopLevels[102] = "HM";
	asTopLevels[103] = "VA";
	asTopLevels[104] = "HN";
	asTopLevels[105] = "HK";
	asTopLevels[106] = "HU";
	asTopLevels[107] = "IS";
	asTopLevels[108] = "IN";
	asTopLevels[109] = "ID";
	asTopLevels[110] = "IR";
	asTopLevels[111] = "IQ";
	asTopLevels[112] = "IE";
	asTopLevels[113] = "IM";
	asTopLevels[114] = "IL";
	asTopLevels[115] = "IT";
	asTopLevels[116] = "JM";
	asTopLevels[117] = "JP";
	asTopLevels[118] = "JE";
	asTopLevels[119] = "JO";
	asTopLevels[120] = "KZ";
	asTopLevels[121] = "KE";
	asTopLevels[122] = "KI";
	asTopLevels[123] = "KP";
	asTopLevels[124] = "KR";
	asTopLevels[125] = "KW";
	asTopLevels[126] = "KG";
	asTopLevels[127] = "LA";
	asTopLevels[128] = "LV";
	asTopLevels[129] = "LB";
	asTopLevels[130] = "LS";
	asTopLevels[131] = "LR";
	asTopLevels[132] = "LY";
	asTopLevels[133] = "LI";
	asTopLevels[134] = "LT";
	asTopLevels[135] = "LU";
	asTopLevels[136] = "MO";
	asTopLevels[137] = "MK";
	asTopLevels[138] = "MG";
	asTopLevels[139] = "MW";
	asTopLevels[140] = "MY";
	asTopLevels[141] = "MV";
	asTopLevels[142] = "ML";
	asTopLevels[143] = "MT";
	asTopLevels[144] = "MH";
	asTopLevels[145] = "MQ";
	asTopLevels[146] = "MR";
	asTopLevels[147] = "MU";
	asTopLevels[148] = "YT";
	asTopLevels[149] = "MX";
	asTopLevels[150] = "FM";
	asTopLevels[151] = "MD";
	asTopLevels[152] = "MC";
	asTopLevels[153] = "MN";
	asTopLevels[154] = "MS";
	asTopLevels[155] = "MA";
	asTopLevels[156] = "MZ";
	asTopLevels[157] = "MM";
	asTopLevels[158] = "NA";
	asTopLevels[159] = "NR";
	asTopLevels[160] = "NP";
	asTopLevels[161] = "NL";
	asTopLevels[162] = "AN";
	asTopLevels[163] = "NC";
	asTopLevels[164] = "NZ";
	asTopLevels[165] = "NI";
	asTopLevels[166] = "NE";
	asTopLevels[167] = "NG";
	asTopLevels[168] = "NU";
	asTopLevels[169] = "NF";
	asTopLevels[170] = "MP";
	asTopLevels[171] = "NO";
	asTopLevels[172] = "OM";
	asTopLevels[173] = "PK";
	asTopLevels[174] = "PW";
	asTopLevels[175] = "PA";
	asTopLevels[176] = "PG";
	asTopLevels[177] = "PY";
	asTopLevels[178] = "PE";
	asTopLevels[179] = "PH";
	asTopLevels[180] = "PN";
	asTopLevels[181] = "PL";
	asTopLevels[182] = "PT";
	asTopLevels[183] = "PR";
	asTopLevels[184] = "QA";
	asTopLevels[185] = "RE";
	asTopLevels[186] = "RO";
	asTopLevels[187] = "RU";
	asTopLevels[188] = "RW";
	asTopLevels[189] = "KN";
	asTopLevels[190] = "LC";
	asTopLevels[191] = "VC";
	asTopLevels[192] = "WS";
	asTopLevels[193] = "SM";
	asTopLevels[194] = "ST";
	asTopLevels[195] = "SA";
	asTopLevels[196] = "SN";
	asTopLevels[197] = "SC";
	asTopLevels[198] = "SL";
	asTopLevels[199] = "SG";
	asTopLevels[200] = "SK";
	asTopLevels[201] = "SI";
	asTopLevels[202] = "SB";
	asTopLevels[203] = "SO";
	asTopLevels[204] = "ZA";
	asTopLevels[205] = "GS";
	asTopLevels[206] = "ES";
	asTopLevels[207] = "LK";
	asTopLevels[208] = "SH";
	asTopLevels[209] = "PM"
	asTopLevels[210] = "SD";
	asTopLevels[211] = "SR";
	asTopLevels[212] = "SJ";
	asTopLevels[213] = "SZ";
	asTopLevels[214] = "SE";
	asTopLevels[215] = "CH";
	asTopLevels[216] = "SY";
	asTopLevels[217] = "TW";
	asTopLevels[218] = "TJ";
	asTopLevels[219] = "TZ";
	asTopLevels[220] = "TH";
	asTopLevels[221] = "TG";
	asTopLevels[222] = "TK";
	asTopLevels[223] = "TO";
	asTopLevels[224] = "TT";
	asTopLevels[225] = "TN";
	asTopLevels[226] = "TR";
	asTopLevels[227] = "TM";
	asTopLevels[228] = "TC";
	asTopLevels[229] = "TV";
	asTopLevels[230] = "UG";
	asTopLevels[231] = "UA";
	asTopLevels[232] = "AE";
	asTopLevels[233] = "GB";
	asTopLevels[234] = "US";
	asTopLevels[235] = "UM";
	asTopLevels[236] = "UY";
	asTopLevels[237] = "UZ";
	asTopLevels[238] = "VU";
	asTopLevels[239] = "VE";
	asTopLevels[240] = "VN";
	asTopLevels[241] = "VG";
	asTopLevels[242] = "VI";
	asTopLevels[243] = "WF";
	asTopLevels[244] = "EH";
	asTopLevels[245] = "YE";
	asTopLevels[246] = "YU";
	asTopLevels[247] = "ZR";
	asTopLevels[248] = "ZM";
	asTopLevels[249] = "ZW";
	asTopLevels[250] = "UK";
	asTopLevels[251] = "PS";
	asTopLevels[252] = "BIZ";
	asTopLevels[253] = "INFO";
	asTopLevels[254] = "NAME";
	asTopLevels[255] = "MUSEUM";
	asTopLevels[256] = "COOP";
	asTopLevels[257] = "AERO";
	var bReturn;
	var checkReturn;
	var valued;
	valued = Domainstr.toUpperCase();
	bReturn = 0;
	for (i = 0 ; i<258;i++)
	{		
		if (asTopLevels[i] == valued)
		{		
			bReturn = bReturn +1;
		}
	}
	if (bReturn == 0)
	{
		checkReturn = true;
	}
	else
	{
		checkReturn = false;
	}
	return checkReturn;
}
function parseDomain(d )
{
		lo = d.toLowerCase();
		var j;
		j = 0;
		idx = d.indexOf("@");
		if( idx == -1 ) return ""; // error
		idx++;
		d = d.substring( idx );
		
		for(i = 0;i< d.length; i++) 
		{
			if( d.charAt(i) == '.' ) 
			{ 
				j = i + 1;
			}		
		}	
		
	return d.substring( j,d.length);
}

/////이메일 실시간검사 여부 검사///////
function checkMailEnd(frm)
{
	if (frm.RealCheckMail.value == "I" ) {
		alert("이메일 주소를 입력하세요");
		frm.EmailId.focus();
		return false;
	} else if (frm.RealCheckMail.value == "P" ) {
		alert("죄송합니다.고객님께서 입력하신 이메일 주소에 대한 \n정합성 여부를 판단 중이오니 잠시만 기다려 주십시오.\n예상 소요시간은 2분 미만입니다.");
		return false;
	} else if (frm.RealCheckMail.value == "N" ) {
		checkRealMail(frm);
		return false;
	} else if (frm.RealCheckMail.value == "F" ) {
		alert("입력하신 이메일 주소가 유효하지 않은 메일이니 다시 입력해주시기 바랍니다");
		frm.EmailId.focus();
		return false;
	}
	if ( !checkeMailAddr(frm) )	{
		frm.EmailId.focus();
		return;
	}
	return true;
}


///////EmailId 실시간 검사///////////
function checkRealMail(frm)
{
	frm.RealCheckMail.value = "N";
	if ( !checkeMailAddr(frm) )	{
		frm.EmailId.focus();
		return;
	}

	if (frm.EmailDomain.value == "0")  {
		if (DomainArray[frm.EmailDomain1.value] != "Y") {
			frm.RealCheckMail.value = "T";
			return;
		}
	} else {
		if (DomainArray[frm.EmailDomain.value] != "Y") {
			frm.RealCheckMail.value = "T";
			return;
		}
	}
	var prog
	prog = confirm("이메일 주소를 실시간 검사 합니다.\n현재 입력한 이메일 주소가 정확합니까?");
	if ( !prog) {
		frm.RealCheckMail.value = "N";
		return;
	}
	//이메일 실시간 검사
	frm.RealCheckMail.value = "P";
	frm.EmailId.readOnly = true;
	frm.EmailDomain.disabled = true;
	frm.EmailDomain1.readOnly = true;
	with (document.HiddenForm) {
		DNSServer.value		=	"203.236.1.12";
		DomainName.value	=	"tworld.co.kr";
		target = "HiddenFrame";
	    submit();
	}
}

function checkeMailAddr(frm)	//메일 검사
{
	var semailAddr;
	var emailValue;

	if (frm.EmailId.value == "")
	{
		alert("이메일 주소를 입력하세요");
		frm.EmailId.focus();
		return false;
	}
	if (frm.EmailDomain.value == "0")
	{
		if (frm.EmailDomain1.value == "")
		{
			alert("이메일 주소를 입력하세요");
			return false;
		}
		if(! ignoreSpaces(frm.EmailId.value))
		{
			alert("이메일 주소에 공백을 포함하셨습니다. 정확히 입력하세요");
			frm.EmailId.focus();
			return false;
		}
		if(! ignoreSpaces(frm.EmailDomain1.value))
		{
			alert("이메일 주소에 공백을 포함하셨습니다. 정확히 입력하세요");
			frm.EmailDomain1.focus();
			return false;
		}
		if( !checkEmail(frm.EmailId.value+"@"+frm.EmailDomain1.value) )
		{
			alert("이메일 주소가 올바르지 않습니다.");
			frm.EmailId.focus();
			return false;
		}
		semailAddr = frm.EmailId.value+"@"+frm.EmailDomain1.value;
		emailValue = parseDomain(semailAddr);
		if (DomainCheck(emailValue))
		{
			alert("이메일 주소가 올바르지 않습니다.");
			frm.EmailId.focus();
			return false;
		}
	}
	else
	{
		if( !checkEmail(frm.EmailId.value+"@"+frm.EmailDomain.value) )
		{
			alert("이메일 주소가 올바르지 않습니다.");
			frm.EmailId.focus();
			return false;
		}
		semailAddr = frm.EmailId.value+"@"+frm.EmailDomain.value;
		emailValue = parseDomain(semailAddr);

		if (DomainCheck(emailValue))
		{
			alert("이메일 주소가 올바르지 않습니다.");
			frm.EmailId.focus();
			return false;
		}
	}
	document.HiddenForm.EmailAddr.value	=	semailAddr;
	return true;

}

function openEmailRecv(LinkUrl, ReqSite)	// 이메일팝업
{
	var frm = document.frmMain;
    var EmailAddr;
	var UserId;
	var SiteCd;
    if (frm.EmailDomain.value == "0")
    {
        EmailAddr = frm.EmailId.value+"@"+ frm.EmailDomain1.value;
	    if ( EmailAddr.length < 2 ) {
	    	alert("이메일 주소를 입력 하세요.");
	    	frm.EmailId.focus();
	    	return;
	    }
    }
    else
    {
        EmailAddr = frm.EmailId.value +"@"+ frm.EmailDomain.value;
	    if ( frm.EmailId.value.length < 2 ) {
	    	alert("이메일 주소를 입력 하세요.");
	    	frm.EmailId.focus();
	    	return;
	    }
    }    
    
	if ( ReqSite != "UP" ) {
		UserId      =	frm.UserId.value;
    }
    SiteCd = frm.SiteCd.value;
    Param = "ProcInd=V&UP_CD=RECV&ReqSite=" + ReqSite;

	if ( SiteCd == "est")
	   window.open('','EmailRecv','toolbar=no,width=650,height=550,status=no,menubar=no,scrollbars=no,resizable=no');
	else
	   window.open('','EmailRecv','toolbar=no,width=650,height=550,status=no,menubar=no,scrollbars=no,resizable=no');
    frmPopup = document.PopupForm;
    frmPopup.PostParam.value = Param;
    frmPopup.action	= LinkUrl;
    frmPopup.target	= "EmailRecv";
    frmPopup.submit();
}


function checkMailEndMsg(ErrorMsg, ErrorCd)		//이메일 실시간검사 여부 검사
{
	alert(ErrorMsg);
	frm	=	document.frmMain;
	frm.RealCheckMail.value = ErrorCd;
	frm.EmailId.readOnly = false;
	frm.EmailDomain.disabled = false;
	frm.EmailDomain1.readOnly = false;
}
