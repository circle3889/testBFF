
 // - true: 유효한 CAS 번호
 // - false: 유효하지 않은 CAS 번호
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
		}else {
		tmp2 = 0;
		}

		chkdgt += tmp2/10;
		chkdgt += tmp%10;
	}

	tmp = chkdgt%10;
	if(tmp==0) {
		tmp = 0;
	}else {
		tmp = 10-tmp;
	}

	if(parseInt(arg.substr(10,1)) == tmp) {
		return true;
	}  else {
		return false;
	}
}

function checkSvcNo(frm)	// 서비스번호 입력 form submit
{
    var sCell;
	var sCell1;
	var sCell2;
	var SvcCd;
	
    for( i=0; i<frm.SvcCd.length; i++) {
        if(frm.SvcCd[i].checked) {
            SvcCd = frm.SvcCd[i].value;
        }
    }

    if(SvcCd == 'C'){
        sCell  = frm.SvcNum1.value;
        sCell1 = frm.SvcNum2.value;
        sCell2 = frm.SvcNum3.value;
        if (sCell == "" || sCell == "20")
        {
            alert("핸드폰 번호를 선택하세요");
            return false;
        }
        if (sCell1 == "")
        {
            alert("핸드폰 번호를 입력하세요");
            frm.SvcNum2.focus();
            return false;
        }
        if (sCell2 == "")
        {
            alert("핸드폰 번호를 입력하세요");
            frm.SvcNum3.focus();
            return false;
        }
    } else if(SvcCd == 'T'){
        sCell  = frm.TSvcNum1.value;
        sCell1 = frm.TSvcNum2.value;
        sCell2 = frm.TSvcNum3.value;
        if (sCell == "" || sCell == null)
        {
            alert("태블릿 번호를 입력하세요");
            frm.TSvcNum1.focus();
            return false;
        }
        if (sCell1 == "")
        {
            alert("태블릿 번호를 입력하세요");
            frm.TSvcNum2.focus();
            return false;
        }
        if (sCell2 == "")
        {
            alert("태블릿 번호를 입력하세요");
            frm.TSvcNum3.focus();
            return false;
        }        
    } else if(SvcCd == 'D'){
        sCell  = frm.DmbNum1.value;
        sCell1 = frm.DmbNum2.value;
        sCell2 = frm.DmbNum3.value;
        if (sCell == "" || sCell == null)
        {
            alert("위성DMB 번호를 입력하세요");
            frm.DmbNum1.focus();
            return false;
        }
        if (sCell1 == "")
        {
            alert("위성DMB 번호를 입력하세요");
            frm.DmbNum2.focus();
            return false;
        }
        if (sCell2 == "")
        {
            alert("위성DMB 번호를 입력하세요");
            frm.DmbNum3.focus();
            return false;
        }
        var result = isSmartCardNoCheckDigit(sCell+sCell1+sCell2);
        if (result == false){
            alert('위성DMB 번호를 확인하세요.');
            frm.DmbNum1.focus();
            return false;
        }

	    //DMB일경우를 서비스번호 항목에 값 set
	    frm.SvcNum1.value	=	sCell ;
	    frm.SvcNum2.value	=	sCell1;
	    frm.SvcNum3.value	=	sCell2;
    } else if(SvcCd == 'T'){
    	
    } else if(SvcCd != ''){
		alert("서비스구분을 선택하세요");
	    return false;
    }
    return true;
}

function newCheckSvcNo(frm)	// 서비스번호 입력 form submit
{
	var SvcCd;
	
    for( i=0; i<frm.SvcCd.length; i++) {
        if(frm.SvcCd[i].checked) {
            SvcCd = frm.SvcCd[i].value;
        }
    }
	
	if(frm.SvcNum2.value == "" || frm.SvcNum3.value == ""){			
		if(SvcCd == 'C'){
			frm.SvcNum1.value	=	frm.chkSvcNum1.value;
		    frm.SvcNum2.value	=	frm.chkSvcNum2.value;
		    frm.SvcNum3.value	=	frm.chkSvcNum3.value;
	    } else if(SvcCd == 'T'){
			frm.TSvcNum1.value	=	frm.chkSvcNum1.value;
		    frm.TSvcNum2.value	=	frm.chkSvcNum2.value;
		    frm.TSvcNum3.value	=	frm.chkSvcNum3.value;
	    } else if(SvcCd == 'D'){
	        sCell  = frm.chkSvcNum1.value;
	        sCell1 = frm.chkSvcNum2.value;
	        sCell2 = frm.chkSvcNum3.value;
	        var result = isSmartCardNoCheckDigit(sCell+sCell1+sCell2);
	        if (result == false){
	            alert('위성DMB 번호를 확인하세요.');
	            frm.DmbNum1.focus();
	            return false;
	        }
	
		    //DMB일경우를 서비스번호 항목에 값 set
		    frm.DmbNum1.value	=	sCell ;
		    frm.DmbNum2.value	=	sCell1;
		    frm.DmbNum3.value	=	sCell2;
	    } else if(SvcCd == 'T'){
	    } else if(SvcCd != ''){
			alert("서비스구분을 선택하세요");
		    return false;
	    }
	}	
	
    return true;
}

function checkTabletPcSvcNo(frm)	// 서비스번호 입력 form submit    //2011-05-04 태블릿pc 기종 인증방법 추가 (함수 별개 생성)
{
    var sCell,sCell1,sCell2,SvcCd;
    for( i=0; i<frm.SvcCd.length; i++) {
        if(frm.SvcCd[i].checked) {
            SvcCd = frm.SvcCd[i].value;
        }
    }

    if(SvcCd == 'C'){
        sCell  = frm.SvcNum1.value;
        sCell1 = frm.SvcNum2.value;
        sCell2 = frm.SvcNum3.value;
        if (sCell == "" || sCell == "20")
        {
            alert("핸드폰 번호를 선택하세요");
            return false;
        }
        if (sCell1 == "")
        {
            alert("핸드폰 번호를 입력하세요");
            frm.SvcNum2.focus();
            return false;
        }
        if (sCell2 == "")
        {
            alert("핸드폰 번호를 입력하세요");
            frm.SvcNum3.focus();
            return false;
        }
    } else if(SvcCd == 'T'){
        sCell  = frm.TSvcNum1.value;
        sCell1 = frm.TSvcNum2.value;
        sCell2 = frm.TSvcNum3.value;
        if (sCell == "" || sCell == null)
        {
            alert("태블릿 번호를 입력하세요");
            frm.TSvcNum1.focus();
            return false;
        }
        if (sCell1 == "")
        {
            alert("태블릿 번호를 입력하세요");
            frm.TSvcNum2.focus();
            return false;
        }
        if (sCell2 == "")
        {
            alert("태블릿 번호를 입력하세요");
            frm.TSvcNum3.focus();
            return false;
        }        
    } else if(SvcCd == 'D'){
        sCell  = frm.DmbNum1.value;
        sCell1 = frm.DmbNum2.value;
        sCell2 = frm.DmbNum3.value;
        if (sCell == "" || sCell == null)
        {
            alert("위성DMB 번호를 입력하세요");
            frm.DmbNum1.focus();
            return false;
        }
        if (sCell1 == "")
        {
            alert("위성DMB 번호를 입력하세요");
            frm.DmbNum2.focus();
            return false;
        }
        if (sCell2 == "")
        {
            alert("위성DMB 번호를 입력하세요");
            frm.DmbNum3.focus();
            return false;
        }

        var result = isSmartCardNoCheckDigit(sCell+sCell1+sCell2);
        if (result == false){
            alert('위성DMB 번호를 확인하세요.');
            frm.DmbNum1.focus();
            return false;
        }

	    //DMB일경우를 서비스번호 항목에 값 set
	    frm.SvcNum1.value	=	sCell ;
	    frm.SvcNum2.value	=	sCell1;
	    frm.SvcNum3.value	=	sCell2;
    } else if(SvcCd != ''){
		alert("서비스구분을 선택하세요");
	    return false;
    }
    	
    return true;
}




function sendSvcNo(frm)	// 서비스번호 입력 form submit
{
    if ( !checkSvcNo(frm) ) return;

	frm.target = "ifr_hidden";
    frm.submit();
}

function Sendsvcinfo(frm){	//명의자 확인 form submit
    NameMsg = frm.NameTitle.value;
    NoMsg	= frm.CorpTitle.value;
    if (frm.CustName.value == ""){
        alert(NameMsg + '을 입력하세요.');
        frm.CustName.focus();
        return;
    }
	sCtzCorpNum = frm.CtzCorpNum1.value + frm.CtzCorpNum2.value + frm.CtzCorpNum3.value;
	if(sCtzCorpNum == ""){
		alert(NoMsg + '를 입력하세요.');
		frm.CtzCorpNum1.focus();
		return;
	}
	frm.target = "ifr_hidden";
	frm.CtzCorpNum.value = sCtzCorpNum;
	frm.submit();
}

var processCheck = "1";
function sendConFirm(frm)	//명의자 확인 form submit
{
	if(processCheck=="1"){
		processChecke = "2";
        if (frm.ConfirmNum.value == "")
        {
            alert("인증번호를 입력하세요");
            frm.ConfirmNum.focus();
            return;
        }

        frm.target = "ifr_hidden";
        frm.submit();
	}else{
		return;
	}
}


function newSendConFirm(frm)	//명의자 확인 form submit
{
	var processCheck = "1";
	//////var parentFrm = parent.opener.document.frmMain; 
	
	if(processCheck=="1"){
		processChecke = "2";
        if (frm.ConfirmNum.value == "")
        {
            alert("인증번호를 입력하세요");
            frm.ConfirmNum.focus();
            return;
        }
		
		var svcCd = frm.SvcCd.value;
		
		/*
		if(svcCd == "T"){			
			parentFrm.chkSvcNum1.value = frm.TSvcNum1.value;
			parentFrm.chkSvcNum2.value = frm.TSvcNum2.value;
			parentFrm.chkSvcNum3.value = frm.TSvcNum3.value;
		}else if(svcCd == "C"){
			parentFrm.chkSvcNum1.value = frm.SvcNum1.value;
			parentFrm.chkSvcNum2.value = frm.SvcNum2.value;
			parentFrm.chkSvcNum3.value = frm.SvcNum3.value;
		}else if(svcCd == "D"){
			parentFrm.chkSvcNum1.value = frm.DmbNum1.value;
			parentFrm.chkSvcNum2.value = frm.DmbNum2.value;
			parentFrm.chkSvcNum3.value = frm.DmbNum3.value;
		}
		*/

        frm.target = "ifr_hidden";
        frm.submit();
	}else{
		return;
	}
}

function sendSMS() {	//인증번호 보내기
    with (document.HiddenForm) {
        target = "SMSAuth";
        submit();
    }
}

function SMSAuthMsg(Ind)	//인증번호 발송 후 결과 메시지
{	
    if ( Ind == "S" )
        alert("인증번호를 성공적으로 발송 했습니다. 인증번호를 확인하시고 입력하십시오.");
    else {
        alert("인증번호 전송에 실패했습니다. \n잠시후 다시 이용해주세요.");
    }
    document.frmMain.ConfirmNum.focus();
}


function ChangeSvcNum1(frm)	//이동전화번호 011/017 선택시
{
    if ( frm.SvcNum1.value == ""  ){	//전화없음 선택
    	frm.SvcNum2.value = "";
    	frm.SvcNum3.value = "";
    	frm.SvcNumCheck.value = "NON";	//INI:초기, UP:서비스번호 변경, CRM:가입자 확인, NON:전화없음 선택
    	if ( frm.SvcMgmtNum )
    		frm.SvcMgmtNum.value = "";
    	if ( OCBView )
    		OCBView.style.display = "none";
    } else {
    	frm.SvcNum2.value = "";
    	frm.SvcNum3.value = "";
    	frm.SvcNumCheck.value = "UP";	//INI:초기, UP:서비스번호 변경, CRM:가입자 확인
	    frm.SvcNum2.focus();
    }
   	return;
}

function checkSvcNum1()	//이동전화번호 011/017 선택시
{
    var frm	=	document.frmMain;
    if ( frm.SvcNum1.value == "20" || frm.SvcNum1.value == ""  ){
	    alert("휴대폰 구분번호를 선택 하시고 입력 하세요.");
    	frm.SvcNum1.focus();
    }
   	return;
}

function ChangeSvcNum(frm)	//이동전화번호 011/017 선택시
{
	frm.SvcNumCheck.value = "UP";	//INI:초기, UP:서비스번호 변경, CRM:가입자 확인
}
function aftMultiOpenerLink(Msg, RetUrl, Param)		//다회선 처리후 Opener 새로고침
{
	alert(Msg);
	if (parent.linkPost)    {
		parent.linkPost("RetUrl", Param);
	} else if (opener.parent.linkPost) {
		opener.parent.linkPost(RetUrl, Param);
	}
	self.close();
}

//function CertOk		정회원 처리후 가입/변경에따른 Opener의 값 set
function CertOk(up_cd, SvcMgmtNum, AuthSeq, twdGrade, twdGText, mbsGrade, mbsGText, ttlGrade, ttlGText, tngGrade, tngGText,
				CamsYn, RecvInd, RecIndDt, RecvInd1, RecInd1Dt, RelCd, OcbYn, SktMemCardYn, OcbAccmAgreeYn, msg )
{
	var frm = opener.document.frmMain;
	frm.SvcMgmtNum.value = SvcMgmtNum;
	frm.SvcNumCheck.value = "CRM";		//INI:초기, UP:서비스번호 변경, CRM:가입자 확인
	frm.AuthSeq.value = AuthSeq;
	
	//회원등급 set
	frm.TwdGradeCd.value = twdGrade;
	frm.TwdGradeNm.value = twdGText;
	frm.MbsGradeCd.value = mbsGrade;
	frm.MbsGradeNm.value = mbsGText;
	frm.TtlGradeCd.value = ttlGrade;
	frm.TtlGradeNm.value = ttlGText;
	frm.TngGradeCd.value = tngGrade;
	frm.TngGradeNm.value = tngGText;
	if ( up_cd == "REGUP" ) {
		frm.SktMemCardYn.value = SktMemCardYn;
		frm.OcbAccmAgreeYn.value = OcbAccmAgreeYn;
	}

	if ( CamsYn == "Y" ) {
		frm.CamsInd.value=CamsYn;
		if ( RecvInd.length > 0 ) {
			frm.RecvInd.value=RecvInd;	//NewsLetter 수신여부
			frm.RecvIndDt.value=RecIndDt;
		}
		if ( RecvInd1.length > 0 ) {
			frm.RecvIndEvt.value=RecvInd1;	//이벤트,광고 수신여부
			frm.RecvIndEvtDt.value=RecInd1Dt;
		}
	}

	frm.RelCd.value=RelCd; // 명의자와의 관계
	opener.changeOCB(OcbYn)
//	opener.changeOCB();
	alert(msg);
	window.close();
}

//function CertMcgOk       정회원 처리후 가입/변경에따른 Opener의 값 set
function CertMcgOk(Flag, up_cd, SvcMgmtNum, AuthSeq, twdGrade, twdGText, mbsGrade, mbsGText, ttlGrade, ttlGText, tngGrade, tngGText,
                CamsYn, RecvInd, RecIndDt, RecvInd1, RecInd1Dt, RelCd, OcbYn, SktMemCardYn, OcbAccmAgreeYn, msg,
				EmailId, EmailDomain, PostCd1, PostCd2, PostAddr, DtlAddr, PhoneArea, PhoneNum1, PhoneNum2, EmailValue, SocSecNum )
{
    //frm = opener.document.frmMain;
    //frm = opener.parent.frmMain;

	var frm;
    if (Flag == 'parent') {
		frm = parent.opener.parent.document.frmMain;
	}else if (Flag == 'dmb') {
		frm = parent.document.frmMain;
	}else {
		frm = parent.opener.document.frmMain;
	}
	
    frm.SvcMgmtNum.value = SvcMgmtNum;
    frm.SvcNumCheck.value = "CRM";      //INI:초기, UP:서비스번호 변경, CRM:가입자 확인
    frm.AuthSeq.value = AuthSeq;
	
    //회원등급 set
    frm.TwdGradeCd.value = twdGrade;
    frm.TwdGradeNm.value = twdGText;
    frm.MbsGradeCd.value = mbsGrade;
    frm.MbsGradeNm.value = mbsGText;
    frm.TtlGradeCd.value = ttlGrade;
    frm.TtlGradeNm.value = ttlGText;
    frm.TngGradeCd.value = tngGrade;
    frm.TngGradeNm.value = tngGText;

    //2011-08-02 주소정보삭제 (mcg 청구지정보조회 제거)
    /*
    if( frm.PostCd1.value.length == 0 ){
        frm.PostCd1.value      = PostCd1;
        frm.PostCd2.value      = PostCd2;
        frm.PostAddr.value     = PostAddr;
        frm.DtlAddr.value      = DtlAddr;
    }

    if( frm.PhoneNum1.value.length == 0 ){
        frm.PhoneArea.value    = PhoneArea;
        frm.PhoneNum1.value    = PhoneNum1;
        frm.PhoneNum2.value    = PhoneNum2;
    }
    */

    if ( up_cd == "REGUP" ) {
        frm.SktMemCardYn.value = SktMemCardYn;
        frm.OcbAccmAgreeYn.value = OcbAccmAgreeYn;
    }

    if ( CamsYn == "Y" ) {
        frm.CamsInd.value=CamsYn;
        if ( RecvInd.length > 0 ) {
            frm.RecvInd.value=RecvInd;  //NewsLetter 수신여부
            frm.RecvIndDt.value=RecIndDt;
        }
        if ( RecvInd1.length > 0 ) {
            frm.RecvIndEvt.value=RecvInd1;  //이벤트,광고 수신여부
            frm.RecvIndEvtDt.value=RecInd1Dt;
        }
    }
    frm.RelCd.value=RelCd; // 명의자와의 관계

    //opener.changeOCB(OcbYn)
    //opener.parent.changeOCB(OcbYn);

    if (Flag == 'parent') {
		parent.opener.parent.changeOCB(OcbYn);
	}else if (Flag == 'dmb') {
		parent.changeOCB(OcbYn);
	}else {
		parent.opener.changeOCB(OcbYn);
	}
	
    if ( EmailId.length > 0 && frm.EmailId.value.length == 0 ){
        frm.EmailId.value      = EmailId;
        frm.EmailDomain.value  = EmailDomain;
		frm.EmailDomain1.value = EmailValue;
        frm.EmailDomain.onchange();
    }

    frm.SocSecNum.value = SocSecNum;

    if (Flag != 'dmb') {
		parent.window.close();
	}
}


//function CertMcgOk       정회원 처리후 가입/변경에따른 Opener의 값 set   :  태블릿 기기 인증용 
function tabletCertMcgOk(Flag, up_cd, SvcMgmtNum, AuthSeq, twdGrade, twdGText, mbsGrade, mbsGText, ttlGrade, ttlGText, tngGrade, tngGText, CamsYn, RecvInd, RecIndDt, RecvInd1, RecInd1Dt, RelCd, OcbYn, SktMemCardYn, OcbAccmAgreeYn, msg, EmailId, EmailDomain, PostCd1, PostCd2, PostAddr, DtlAddr, PhoneArea, PhoneNum1, PhoneNum2, EmailValue, SocSecNum){
	//frm = opener.document.frmMain;
	//frm = opener.parent.frmMain;

	
	if (Flag == 'parent') {
		frm = parent.opener.parent.document.frmMain;
	}else if (Flag == 'dmb') {
		frm = parent.document.frmMain;
	}else if (Flag == 'mupt') {
		frm = parent.opener.opener.document.frmMain;
	}else if (Flag == 'muptOutTel') {
		frm = parent.parent.opener.document.frmMain;
	}else {
		if (parent.opener) {
			frm = parent.opener.document.frmMain;
		} else {
			frm = parent.document.frmMain;

		}
	}

	frm.SvcMgmtNum.value = SvcMgmtNum;
	frm.SvcNumCheck.value = "CRM"; //INI:초기, UP:서비스번호 변경, CRM:가입자 확인
	frm.AuthSeq.value = AuthSeq;
	
	//회원등급 set
	frm.TwdGradeCd.value = twdGrade;
	frm.TwdGradeNm.value = twdGText;
	frm.MbsGradeCd.value = mbsGrade;
	frm.MbsGradeNm.value = mbsGText;
	frm.TtlGradeCd.value = ttlGrade;
	frm.TtlGradeNm.value = ttlGText;
	frm.TngGradeCd.value = tngGrade;
	frm.TngGradeNm.value = tngGText;
	
	//2011-08-02 주소정보삭제 (mcg 청구지정보조회 제거)
	/*
	 if( frm.PostCd1.value.length == 0 ){
	 frm.PostCd1.value      = PostCd1;
	 frm.PostCd2.value      = PostCd2;
	 frm.PostAddr.value     = PostAddr;
	 frm.DtlAddr.value      = DtlAddr;
	 }
	 if( frm.PhoneNum1.value.length == 0 ){
	 frm.PhoneArea.value    = PhoneArea;
	 frm.PhoneNum1.value    = PhoneNum1;
	 frm.PhoneNum2.value    = PhoneNum2;
	 }
	 */
	if (up_cd == "REGUP") {
		frm.SktMemCardYn.value = SktMemCardYn;
		frm.OcbAccmAgreeYn.value = OcbAccmAgreeYn;
	}
	
	if (CamsYn == "Y") {
		frm.CamsInd.value = CamsYn;
		if (RecvInd.length > 0) {
			frm.RecvInd.value = RecvInd; //NewsLetter 수신여부
			frm.RecvIndDt.value = RecIndDt;
		}
		if (RecvInd1.length > 0) {
			frm.RecvIndEvt.value = RecvInd1; //이벤트,광고 수신여부
			frm.RecvIndEvtDt.value = RecInd1Dt;
		}
	}
	
	
	frm.RelCd.value = RelCd; // 명의자와의 관계
	//opener.changeOCB(OcbYn)
	//opener.parent.changeOCB(OcbYn);
	
	if (Flag == 'parent'){
		parent.opener.parent.changeOCB(OcbYn);
	}else if( Flag == 'dmb' ){
    	parent.changeOCB(OcbYn);
	}else if( Flag == 'mupt' ){
	    parent.opener.opener.changeOCB(OcbYn);
	}else if( Flag == 'muptOutTel' ){
	    parent.parent.opener.changeOCB(OcbYn);	    
    }else{
		if (parent.opener) {
			parent.opener.changeOCB(OcbYn);
		} else {
			parent.changeOCB(OcbYn);

		}    	
	}
		
    if ( EmailId.length > 0 && frm.EmailId.value.length == 0 ){
        frm.EmailId.value      = EmailId;
        frm.EmailDomain.value  = EmailDomain;
		frm.EmailDomain1.value = EmailValue;
        frm.EmailDomain.onchange();
    }


    frm.SocSecNum.value = SocSecNum;

	if( Flag == 'mupt' )		 //2011-06-22  팝업창 control 
		parent.opener.window.close();

	if( Flag == 'muptOutTel' )		 //2011-06-22  팝업창 control 
		parent.opener.window.close();
				
    if( Flag != 'dmb' )
		parent.window.close();
	
}


function setNonMember()		//SKT폰이 아닌경우 Opener의 값 set
{
	var frm = opener.document.frmMain;
	if ( frm.SvcMgmtNum )
		frm.SvcMgmtNum.value = "";
	frm.SvcNumCheck.value = "NON";	//INI:초기, UP:서비스번호 변경, CRM:가입자 확인, NON:전화없음 선택
	frm.AuthSeq.value = "0";

	//회원등급 set
	frm.TwdGradeCd.value = "N";
	frm.TwdGradeNm.value = "준회원";
	frm.MbsGradeCd.value = "E";
	frm.MbsGradeNm.value = "기타웹회원";
	frm.TtlGradeCd.value = "E";
	frm.TtlGradeNm.value = "준회원";
	frm.TngGradeCd.value = "E";
	frm.TngGradeNm.value = "준회원";
	frm.CamsInd.value	 = "N";
	frm.RelCd.value=""; // 명의자와의 관계
	if ( opener.OCBView )
		opener.OCBView.style.display = "none";
	window.close();
}

function bIsDualMsg(bIsDualYn, SvcCd)		//휴대폰, DMB 겸용의 메시지 처리
{
	if (bIsDualYn == "Y")    {
		if ( SvcCd == "C") 
	        alert('고객님께서 현재 이동전화 서비스와 DMB 서비스를 \n동시에 사용하시고 계시며, T world을 통해 \nDMB 서비스를 동시에 이용하실 수 있습니다.');
		else {
	        alert('고객님께서 현재 이동전화 서비스와 DMB 서비스를 \n동시에 사용하시고 계시며, T world을 통해 이동전화번호를 등록 하시면 \nDMB 서비스를 동시에 이용하실 수 있으며 DMB서비스는 등록 하실 수 없습니다.');
			//입력된 값 clear
			opener.document.frmMain.SvcNum1.value = "";
			opener.document.frmMain.SvcNum2.value = "";
			opener.document.frmMain.SvcNum3.value = "";
			opener.document.frmMain.DmbNum1.value = "";
			opener.document.frmMain.DmbNum2.value = "";
			opener.document.frmMain.DmbNum3.value = "";
			self.close();
		}
	}
}


function view_cat3(UP_CD)		//서비스 구분의 선택에따른 처리	(업무코드 : MEM:회원 가입, 변경,  OTR:이외)
{
	var sSvc_cd;
	var frm = document.frmMain;

	for( i=0; i<frm.SvcCd.length; i++) {
		if(frm.SvcCd[i].checked) {
			sSvc_cd = document.frmMain.SvcCd[i].value;
		}
	}
	
	if ( UP_CD == "MEM" ) {		//MEM:회원 가입, 변경
		if (sSvc_cd == "C")	{	//이동전화
			document.getElementById("NON_TEXT").style.display = "none";
			document.getElementById("NON_TEXTTH").style.display = "none";
			document.getElementById("NON_TEXTTD").style.display = "none";
			document.getElementById("TabletPc").style.display = "none";
			document.getElementById("TabletPcTH").style.display = "none";
			document.getElementById("TabletPcTD").style.display = "none";
			document.getElementById("DMBView").style.display = "none";
			document.getElementById("DMBViewTH").style.display = "none";
			document.getElementById("DMBViewTD").style.display = "none";
			document.getElementById("Cellular").style.display = "";
			document.getElementById("CellularTH").style.display = "";
			document.getElementById("CellularTD").style.display = "";
			document.getElementById("NON_TEXTCM").style.display = "none";
			document.getElementById("TabletPcCM").style.display = "none";
			document.getElementById("DMBViewCM").style.display = "none";
			document.getElementById("CellularCM").style.display = "";
			document.frmMain.SvcNum2.value = "";
			document.frmMain.SvcNum3.value = "";			
			document.frmMain.SvcCdDel.value = "";			
		} else if (sSvc_cd == "T")	{	//태블릿pc 기종  2011-05-04 추가
			document.getElementById("Cellular").style.display = "none";
			document.getElementById("CellularTH").style.display = "none";
			document.getElementById("CellularTD").style.display = "none";
			document.getElementById("TabletPc").style.display = "";
			document.getElementById("TabletPcTH").style.display = "";
			document.getElementById("TabletPcTD").style.display = "";
			document.getElementById("DMBView").style.display = "none";
			document.getElementById("DMBViewTH").style.display = "none";
			document.getElementById("DMBViewTD").style.display = "none";
			document.getElementById("NON_TEXT").style.display = "none";
			document.getElementById("NON_TEXTTH").style.display = "none";
			document.getElementById("NON_TEXTTD").style.display = "none";
			document.getElementById("CellularCM").style.display = "none";
			document.getElementById("TabletPcCM").style.display = "";
			document.getElementById("DMBViewCM").style.display = "none";
			document.getElementById("NON_TEXTCM").style.display = "none";
			document.frmMain.TSvcNum1.value = "";
			document.frmMain.TSvcNum2.value = "";			
			document.frmMain.TSvcNum3.value = "";						
			document.frmMain.SvcCdDel.value = "";			
		}else if (sSvc_cd == "D")	{	//위성 DMB(전용폰)
			document.getElementById("NON_TEXT").style.display = "none";
			document.getElementById("NON_TEXTTH").style.display = "none";
			document.getElementById("NON_TEXTTD").style.display = "none";
			document.getElementById("Cellular").style.display = "none";
			document.getElementById("CellularTH").style.display = "none";
			document.getElementById("CellularTD").style.display = "none";
			document.getElementById("TabletPc").style.display = "none";
			document.getElementById("TabletPcTH").style.display = "none";
			document.getElementById("TabletPcTD").style.display = "none";
			document.getElementById("DMBView").style.display = "";
			document.getElementById("DMBViewTH").style.display = "";
			document.getElementById("DMBViewTD").style.display = "";
			document.getElementById("NON_TEXTCM").style.display = "none";
			document.getElementById("CellularCM").style.display = "none";
			document.getElementById("TabletPcCM").style.display = "none";
			document.getElementById("DMBViewCM").style.display = "";
			document.frmMain.DmbNum1.focus();
			document.frmMain.DmbNum1.value = "";
			document.frmMain.DmbNum2.value = "";
			document.frmMain.DmbNum3.value = "";			
			document.frmMain.SvcCdDel.value = "";			
		} else 	{	//전화없음
			document.getElementById("Cellular").style.display = "none";
			document.getElementById("CellularTH").style.display = "none";
			document.getElementById("CellularTD").style.display = "none";
			document.getElementById("TabletPc").style.display = "none";
			document.getElementById("TabletPcTH").style.display = "none";
			document.getElementById("TabletPcTD").style.display = "none";
			document.getElementById("DMBView").style.display = "none";
			document.getElementById("DMBViewTH").style.display = "none";
			document.getElementById("DMBViewTD").style.display = "none";
			document.getElementById("NON_TEXT").style.display = "";
			document.getElementById("NON_TEXTTH").style.display = "";
			document.getElementById("NON_TEXTTD").style.display = "";
			document.getElementById("CellularCM").style.display = "none";
			document.getElementById("TabletPcCM").style.display = "none";
			document.getElementById("DMBViewCM").style.display = "none";
			document.getElementById("NON_TEXTCM").style.display = "";
	    	frm.SvcNum2.value = "";
	    	frm.SvcNum3.value = "";
	    	frm.SvcNumCheck.value = "NON";	//INI:초기, UP:서비스번호 변경, CRM:가입자 확인, NON:전화없음 선택
			frm.SvcCdDel.value = "";			
	    	if ( frm.SvcMgmtNum )
	    		frm.SvcMgmtNum.value = "";
	    	if ( OCBView )
	    		OCBView.style.display = "none";
		}
	} else if ( UP_CD == "MEM_LOAD" ) {		//MEM_LOAD:회원 가입, 변경
		if (sSvc_cd == "C")	{	//이동전화
			document.getElementById("NON_TEXT").style.display = "none";
			document.getElementById("NON_TEXTTH").style.display = "none";
			document.getElementById("NON_TEXTTD").style.display = "none";
			document.getElementById("TabletPc").style.display = "none";
			document.getElementById("TabletPcTH").style.display = "none";
			document.getElementById("TabletPcTD").style.display = "none";
			document.getElementById("DMBView").style.display = "none";
			document.getElementById("DMBViewTH").style.display = "none";
			document.getElementById("DMBViewTD").style.display = "none";
			document.getElementById("Cellular").style.display = "";
			document.getElementById("CellularTH").style.display = "";
			document.getElementById("CellularTD").style.display = "";
		} else if (sSvc_cd == "T")	{	//태블릿pc 기종  2011-05-04 추가
			document.getElementById("Cellular").style.display = "none";
			document.getElementById("CellularTH").style.display = "none";
			document.getElementById("CellularTD").style.display = "none";
			document.getElementById("TabletPc").style.display = "";
			document.getElementById("TabletPcTH").style.display = "";
			document.getElementById("TabletPcTD").style.display = "";
			document.getElementById("DMBView").style.display = "none";
			document.getElementById("DMBViewTH").style.display = "none";
			document.getElementById("DMBViewTD").style.display = "none";
			document.getElementById("NON_TEXT").style.display = "none";			
			document.getElementById("NON_TEXTTH").style.display = "none";			
			document.getElementById("NON_TEXTTD").style.display = "none";			
		}else if (sSvc_cd == "D")	{	//위성 DMB(전용폰)
			document.getElementById("NON_TEXT").style.display = "none";
			document.getElementById("NON_TEXTTH").style.display = "none";
			document.getElementById("NON_TEXTTD").style.display = "none";
			document.getElementById("Cellular").style.display = "none";
			document.getElementById("CellularTH").style.display = "none";
			document.getElementById("CellularTD").style.display = "none";
			document.getElementById("TabletPc").style.display = "none";
			document.getElementById("TabletPcTH").style.display = "none";
			document.getElementById("TabletPcTD").style.display = "none";
			document.getElementById("DMBView").style.display = "";
			document.getElementById("DMBViewTH").style.display = "";
			document.getElementById("DMBViewTD").style.display = "";
			document.frmMain.DmbNum1.focus();
		} else 	{	//전화없음
			document.getElementById("Cellular").style.display = "none";
			document.getElementById("CellularTH").style.display = "none";
			document.getElementById("CellularTD").style.display = "none";
			document.getElementById("TabletPc").style.display = "none";
			document.getElementById("TabletPcTH").style.display = "none";
			document.getElementById("TabletPcTD").style.display = "none";
			document.getElementById("DMBView").style.display = "none";
			document.getElementById("DMBViewTH").style.display = "none";
			document.getElementById("DMBViewTD").style.display = "none";
			document.getElementById("NON_TEXT").style.display = "";
			document.getElementById("NON_TEXTTH").style.display = "";
			document.getElementById("NON_TEXTTD").style.display = "";
	    	frm.SvcNum2.value = "";
	    	frm.SvcNum3.value = "";
	    	frm.SvcNumCheck.value = "NON";	//INI:초기, UP:서비스번호 변경, CRM:가입자 확인, NON:전화없음 선택
	    	frm.SvcCdDel.value = "";
	    	if ( frm.SvcMgmtNum )
	    		frm.SvcMgmtNum.value = "";
	    	if ( OCBView )
	    		OCBView.style.display = "none";
		}
	} else {					//OTR:이외
		if (sSvc_cd == "C")	{	//이동전화
			document.getElementById("DMBView").style.display = "none";
			document.getElementById("DMBViewTH").style.display = "none";
			document.getElementById("DMBViewTD").style.display = "none";
			document.getElementById("Cellular").style.display = "";
			document.getElementById("CellularTH").style.display = "";
			document.getElementById("CellularTD").style.display = "";
			document.frmMain.SvcNum2.value = "";
			document.frmMain.SvcNum3.value = "";
		}else if (sSvc_cd == "D")	{	//위성 DMB(전용폰)
			document.getElementById("Cellular").style.display = "none";
			document.getElementById("CellularTH").style.display = "none";
			document.getElementById("CellularTD").style.display = "none";
			document.getElementById("DMBView").style.display = "";
			document.getElementById("DMBViewTH").style.display = "";
			document.getElementById("DMBViewTD").style.display = "";
			document.frmMain.DmbNum1.focus();
			document.frmMain.DmbNum1.value = "";
			document.frmMain.DmbNum2.value = "";
			document.frmMain.DmbNum3.value = "";
		} else 	{	//전화없음
			document.getElementById("Cellular").style.display = "none";
			document.getElementById("CellularTH").style.display = "none";
			document.getElementById("CellularTD").style.display = "none";
			document.getElementById("DMBView").style.display = "none";
			document.getElementById("DMBViewTH").style.display = "none";
			document.getElementById("DMBViewTD").style.display = "none";
		}
	}
}
/*
function view_cat4()		//아이디/패스워드 찾기 인증번호 받기
{
	var sSvc_cd;
	var frm = document.frmMain;
	
	for( i=0; i<frm.SvcCd.length; i++) {
		if(frm.SvcCd[i].checked) {
			sSvc_cd = document.frmMain.SvcCd[i].value;
		}
	}
					
	if (sSvc_cd == "C")	{	//이동전화
		document.getElementById("DMBView").style.display = "none";
		document.getElementById("Cellular").style.display = "";
		document.getElementById("TabletPc").style.display = "none";
		document.frmMain.SvcNum2.value = "";
		document.frmMain.SvcNum3.value = "";
	}else if (sSvc_cd == "D")	{	//위성 DMB(전용폰)
		document.getElementById("Cellular").style.display = "none";
		document.getElementById("DMBView").style.display = "";
		document.getElementById("TabletPc").style.display = "none";
		document.frmMain.DmbNum1.focus();
		document.frmMain.DmbNum1.value = "";
		document.frmMain.DmbNum2.value = "";
		document.frmMain.DmbNum3.value = "";
	}else if (sSvc_cd == "T")	{	//태블릿pc
		document.getElementById("Cellular").style.display = "none";
		document.getElementById("DMBView").style.display = "none";
		document.getElementById("TabletPc").style.display = "";
		document.frmMain.TSvcNum1.value = "";
		document.frmMain.TSvcNum2.value = "";			
		document.frmMain.TSvcNum3.value = "";
	}
}
*/

//서비스 구분의 선택에따른 처리	(업무코드 : OTR: 인증,IDPW찾기쪽,  OTR2: 다회선추가 )  2011-05-04  태블릿pc 기종추가로 함수 생성 (변경은 차후 반영으로 별도 생성)
function view_cat3_tabletPc(UP_CD)		
{
	var sSvc_cd;
	var frm = document.frmMain;
	for( i=0; i<frm.SvcCd.length; i++) {
		if(frm.SvcCd[i].checked) {
			sSvc_cd = document.frmMain.SvcCd[i].value;
		}
	}
	if ( UP_CD == "OTR" ) {		//OTR:회원 가입 쪽 
	    //태블릿pc 기종  2011-05-04 추가
		if (sSvc_cd == "C")	{	//이동전화

			document.getElementById("DMBView").style.display = "none";
			document.getElementById("DMBViewTD").style.display = "none";
			document.getElementById("TabletPc").style.display = "none";
			document.getElementById("TabletPcTD").style.display = "none";
			document.getElementById("Cellular").style.display = "";
			document.getElementById("CellularTD").style.display = "";
			document.getElementById("Cellular_Cert").style.display = "";
			document.getElementById("confirmBtn").style.display = "";
			document.frmMain.SvcNum2.value = "";
			document.frmMain.SvcNum3.value = "";
			document.frmMain.tabletCertConfirmYN.value = "N";

		} else if (sSvc_cd == "T")	{	//태블릿pc 기종  2011-05-04 추가

			document.getElementById("Cellular").style.display = "none";
			document.getElementById("CellularTD").style.display = "none";
			document.getElementById("Cellular_Cert").style.display = "none";
			document.getElementById("DMBView").style.display = "none";
			document.getElementById("DMBViewTD").style.display = "none";
			document.getElementById("TabletPc").style.display = "";
			document.getElementById("TabletPcTD").style.display = "";
			document.getElementById("confirmBtn").style.display = "none";
			document.frmMain.TSvcNum1.value = "";
			document.frmMain.TSvcNum2.value = "";			
			document.frmMain.TSvcNum3.value = "";

		}else if (sSvc_cd == "D")	{	//위성 DMB(전용폰)

			document.getElementById("Cellular").style.display = "none";
			document.getElementById("CellularTD").style.display = "none";
			document.getElementById("Cellular_Cert").style.display = "none";
			document.getElementById("TabletPc").style.display = "none";
			document.getElementById("TabletPcTD").style.display = "none";
			document.getElementById("DMBView").style.display = "";
			document.getElementById("DMBViewTD").style.display = "";
			document.getElementById("confirmBtn").style.display = "";
			document.frmMain.DmbNum1.focus();
			document.frmMain.DmbNum1.value = "";
			document.frmMain.DmbNum2.value = "";
			document.frmMain.DmbNum3.value = "";
			document.frmMain.tabletCertConfirmYN.value = "N";

		} else 	{	//전화없음

			document.getElementById("Cellular").style.display = "none";
			document.getElementById("CellularTD").style.display = "none";
			document.getElementById("Cellular_Cert").style.display = "none";
			document.getElementById("TabletPc").style.display = "none";
			document.getElementById("TabletPcTD").style.display = "none";
			document.getElementById("DMBView").style.display = "none";
			document.getElementById("DMBViewTD").style.display = "none";
			document.getElementById("confirmBtn").style.display = "";
			document.frmMain.tabletCertConfirmYN.value = "N";

		}
		
	} else {					//OTR_below: 회선추가 쪽
	    //태블릿pc 기종  2011-05-04 추가
		if (sSvc_cd == "C")	{	//이동전화
			document.getElementById("DMBView").style.display = "none";
			document.getElementById("TabletPc").style.display = "none";
			document.getElementById("TabletPc_below").style.display = "none";
			document.getElementById("Cellular").style.display = "";
			document.getElementById("Cellular_Cert").style.display = "";
			document.frmMain.SvcNum2.value = "";
			document.frmMain.SvcNum3.value = "";
			document.frmMain.tabletCertConfirmYN.value = "N";
			
		} else if (sSvc_cd == "T")	{	//태블릿pc 기종  2011-05-04 추가
			document.getElementById("Cellular").style.display = "none";
			document.getElementById("Cellular_Cert").style.display = "none";
			document.getElementById("DMBView").style.display = "none";
			document.getElementById("TabletPc").style.display = "";
			document.getElementById("TabletPc_below").style.display = "";
			document.frmMain.TSvcNum1.value = "";
			document.frmMain.TSvcNum2.value = "";			
			document.frmMain.TSvcNum3.value = "";
		}else if (sSvc_cd == "D")	{	//위성 DMB(전용폰)
			document.getElementById("Cellular").style.display = "none";
			document.getElementById("Cellular_Cert").style.display = "none";
			document.getElementById("TabletPc").style.display = "none";
			document.getElementById("TabletPc_below").style.display = "none";
			document.getElementById("DMBView").style.display = "";
			document.frmMain.DmbNum1.focus();
			document.frmMain.DmbNum1.value = "";
			document.frmMain.DmbNum2.value = "";
			document.frmMain.DmbNum3.value = "";
			document.frmMain.tabletCertConfirmYN.value = "N";
			
		} else 	{	//전화없음
			document.getElementById("Cellular").style.display = "none";
			document.getElementById("Cellular_Cert").style.display = "none";
			document.getElementById("TabletPc").style.display = "none";
			document.getElementById("DMBView").style.display = "none";
			document.getElementById("TabletPc_below").style.display = "none";
			document.frmMain.tabletCertConfirmYN.value = "N";
			
		}
	}
}
