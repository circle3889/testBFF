function OCB_NotAgree_pop(SvcNum){	//OCB 미적립 및 정보 미동의 화면
    frm	=	document.frmMain;
    Param = "UP_CD=INIT&SvcNum=" + SvcNum + "&SktMemCardYn=" + frm.SktMemCardYn.value + "&OcbAccmAgreeYn=" + frm.OcbAccmAgreeYn.value;
    frm = document.PopupForm;
    frm.PostParam.value = Param;
    frm.action      = "/normal.do?serviceId=S_MUPT0014&viewId=V_MUPT4000";
    window.open('','NotAgree','toolbar=no,width=480,height=460,status=no,menubar=no,scrollbars=no,resizable=no');
    frm.target = "NotAgree";
    frm.submit();
}

function OCB_Agree_pop(SvcNum){  //OCB 미적립 및 정보 미동의 화면
    frm =   document.frmMain;
    Param = "UP_CD=AGREE&SvcNum=" + SvcNum + "&SktMemCardYn=" + frm.SktMemCardYn.value + "&OcbAccmAgreeYn=" + frm.OcbAccmAgreeYn.value;
    frm = document.PopupForm;
    frm.PostParam.value = Param;
    frm.action      = "/normal.do?serviceId=S_MUPT0014&viewId=V_MUPT4001";
    window.open('','Agree','toolbar=no,width=630,height=600,status=no,menubar=no,scrollbars=yes,resizable=no');
    frm.target = "Agree";
    frm.submit();
}

function pw_change_pop(){	//패스워드변경 팝업
 
/*
    frm = document.PopupForm;
    frm.thisViewId.value = "V_MUPT0001";
    frm.action = "/normal.do?serviceId=S_MUPT0003&viewId=V_COMM1001";
    window.open('','pw_change','toolbar=no,width=480,height=343,status=no,menubar=no,scrollbars=no,resizable=no');
    frm.target = "pw_change";
    frm.submit();
*/

    //2011-09-15 패스워드변경 팝업 전화번호 입력으로  referer 추가로 인한 수정
    frm = document.PopupForm;
    frm.thisViewId.value = "V_MUPT0001";
    frm.action = "/normal.do?serviceId=S_MUPT0003&viewId=V_COMM1001";
    //window.open('','pw_change','toolbar=no,width=650,height=330,status=no,menubar=no,scrollbars=no,resizable=no');
    frm.target = "ifr_hidden";
    frm.submit();
    
}

function popupOpenPwChange(returnViewId)	// 2011-09-15  비밀번호 변경 팝업 ( referer 값을 생성하기 위해 popup 처리 )  ////////
{
    
    frm = document.PopupForm;

    // 인증종류에 따른 구분
	window.open('','pw_change','toolbar=no,width=650,height=330,status=no,menubar=no,scrollbars=yes,resizable=no');
   	frm.target = "pw_change";
   	frm.action = "/normal.do?serviceId=SDUMMY0001&viewId=" + returnViewId;
    frm.submit();
    
}

/*
function multiSvcAdd(mCnt)		// 다회선 추가등록
{
    if ( 8 < mCnt)
    {
        alert("추가회선은 9개까지 등록 가능합니다. (대표회선 포함 총10개만 등록)");
        return;
    }

    
   // Param = "UP_CD=INIT&ReqSite=MULTI&SiteCd=est";
   // frm = document.PopupForm;
  //  frm.PostParam.value = Param;
   // frm.thisViewId.value = "V_MUPT0001";
   // frm.action      = "/normal.do?serviceId=S_MUPT0009&viewId=V_COMM1001";
   // var win = window.open('','SvcAdd','width=615,height=500');
  //  frm.target      = "SvcAdd";
  //  frm.submit();
	
	
	Param = "UP_CD=INIT&ReqSite=MULTI&SiteCd=est";
    frm = document.PopupForm;
    frm.PostParam.value = Param;
    frm.thisViewId.value = "V_MUPT0001";
    frm.target      = "ifr_hidden";
    frm.action      = "/normal.do?serviceId=S_MUPT0009&viewId=V_COMM1001";    
    frm.submit();
    		
}
*/

function multiSvcAdd(mCnt)		// 다회선 추가등록
{
    if ( 8 < mCnt)
    {
        alert("추가회선은 9개까지 등록 가능합니다. (대표회선 포함 총10개만 등록)");
        return;
    }
	
	var frmPopup = document.PopupForm;
    var frm = document.frmMain;	
	var tmpSvcCheck = frmPopup.tmpSvcCheck.value;
	var tmpSvcSplit = tmpSvcCheck.split("/");
    var SvcNum,SvcNum1,SvcNum2,SvcNum3,SocSecNum,UserId,UserName,SiteCd,SvcMgmtNum;
    var TFlag ="";
	
	 if ( !checkSvcNo(frm) ) return;
	
    for( i=0; i<frm.SvcCd.length; i++) {
        if(frm.SvcCd[i].checked) {
            SvcCd = frm.SvcCd[i].value;
        }
    }
	
	if(SvcCd=='C'){
		
	    frmPopup.SvcNum1.value	=	frm.SvcNum1.value;
	    frmPopup.SvcNum2.value  =	frm.SvcNum2.value;
	    frmPopup.SvcNum3.value  =	frm.SvcNum3.value;
		
		SvcNum = frmPopup.SvcNum1.value + frmPopup.SvcNum2.value + frmPopup.SvcNum3.value;
		
	}else if(SvcCd=='T'){
		
	    frmPopup.SvcNum1.value	=	frm.TSvcNum1.value;
	    frmPopup.SvcNum2.value  =	frm.TSvcNum2.value;
	    frmPopup.SvcNum3.value  =	frm.TSvcNum3.value;
	    TFlag ="tablet";       
		
		SvcNum = frmPopup.SvcNum1.value + frmPopup.SvcNum2.value + frmPopup.SvcNum3.value;
		
	}else if(SvcCd=='D'){
		
	    frmPopup.SvcNum1.value	=	frm.DmbNum1.value;
	    frmPopup.SvcNum2.value  =	frm.DmbNum2.value;
	    frmPopup.SvcNum3.value  =	frm.DmbNum3.value;

		SvcNum = frmPopup.SvcNum1.value + frmPopup.SvcNum2.value + frmPopup.SvcNum3.value;
	}
	 
	for(var i=0; i < tmpSvcSplit.length-1 ; i++){
		
		if(tmpSvcSplit[i] == SvcNum){
			alert("이미 추가회선 또는 대표번호에 등록된 서비스번호 입니다.");
			return;
		}
	}
	
    SocSecNum   =	frmPopup.SocSecNum.value;
	UserId      =	frmPopup.UserId.value;
	UserName    =	frmPopup.UserName.value;
	SiteCd		=   frmPopup.SiteCd.value;
	SvcMgmtNum  =   frmPopup.SvcMgmtNum.value;
	
	Param = "ReqSite=MULTI&UP_CD=CHKSVCNO&SiteCd="+SiteCd+"&SvcCd="+SvcCd+"&SvcNum1="+frmPopup.SvcNum1.value + "&SvcNum2="+frmPopup.SvcNum2.value+"&SvcNum3="+frmPopup.SvcNum3.value+"&SocSecNum="+SocSecNum+"&UserId="+UserId+"&UserName="+UserName+"&SvcNum="+SvcNum+"&SvcMgmtNum="+SvcMgmtNum;
    frmPopup.PostParam.value = Param;
	
    if (SvcCd == 'T') {
	
		if (frm.tabletCertConfirmYN.value == 'Y') {
			frm.target = "ifr_hidden";
			frm.action = "/normal.do?serviceId=S_MUPT0019&viewId=V_COMM1001&thisViewId=V_MUPT3001"; //doMultiSvcTabletPcInsert()
			frm.thisViewId.value = "V_MUPT3001";
			frm.UP_CD.value = "REGCERT";
			frm.submit();
			
		}
		else {
			alert("태블릿 번호 인증을 받지 않으셨습니다. SMS/신용카드/범용공인인증서 인증을 받으세요.");
			return;
		}
		
		top.location.href = "https://webzone.tworld.co.kr/normal.do?serviceId=S_MUPT0002&viewId=V_MUPT0001";
		
		
	}else {		
		
		frmPopup.SvcCd.value = SvcCd;
		
		window.open('','addMemberInfo','toolbar=no,width=615,height=550,status=no,menubar=no,scrollbars=no,resizable=no'); //530
   		frmPopup.target = "addMemberInfo";
	
		//frmPopup.target = "ifr_hidden";
		frmPopup.thisViewId.value = "V_MUPT3002";
		frmPopup.returnViewId.value = "V_MUPT3000";
		frmPopup.action = "/normal.do?serviceId=S_CERT0004&viewId=V_COMM1001";
		frmPopup.submit();
	}
}

// 다회선 삭제
function multiSvcDel(idx, para2) {
	frm = document.frmMain;
	para2 = para2 + "&SvcCd=" + frm.MSSvcCd[idx].value + "&SvcNum=" + frm.MSSvcNum[idx].value + "&SvcMgmtNum=" + frm.MSSvcMgmtNum[idx].value;

    if(confirm("삭제하시겠습니까?\n삭제하시면, 해당 전화번호는 다회선 서비스 이용이 불가능합니다."))
    {
        linkPost("/normal.do?serviceId=S_MUPT0011&viewId=V_COMM1001", para2, "Y");
    }
}


// 다회선 삭제
function multiSvcDel(idx, para2, para3 ) {
	frm = document.frmMain;
	para2 = para2 + "&SvcCd=" + frm.MSSvcCd[idx].value + "&SvcNum=" + frm.MSSvcNum[idx].value + "&SvcMgmtNum=" + frm.MSSvcMgmtNum[idx].value;

    if(confirm("삭제하시겠습니까?\n삭제하시면, 해당 전화번호는 다회선 서비스 이용이 불가능합니다."))
    {
        linkPost("/normal.do?serviceId=S_MUPT0011&viewId=V_COMM1001", para2, para3 );
    }
}



function linkPost(LinkPage, Param, HiddenGbn) {	// HiddenGbn : "Y" - 다회선 삭제, "N" - "회원탈퇴"  , "P" - " 다회선 추가 팝업"
    frm = document.PopupForm;
    frm.PostParam.value = Param;
    if ( HiddenGbn == "Y" ) {
	    frm.thisViewId.value = "V_MUPT0001";
	    frm.target = "ifr_hidden";
	} else if ( HiddenGbn == "P"  ) { 
	    frm.thisViewId.value = "V_MUPT6001";
	    frm.target = "ifr_hidden";
	} else
	{
    	frm.target = "_self";
	}
    frm.action      = LinkPage;
    frm.submit();
}

// 다회선 번호를 대표번호로 적용
function multiSvcToMager(idx) {
    var sGubun;

	svc_num1    =   document.frmMain.MSIdx1[idx].value;
	svc_num2    =   document.frmMain.MSIdx2[idx].value;
	svc_num3    =   document.frmMain.MSIdx3[idx].value;
	SvcMgmtNum  =   document.frmMain.MSSvcMgmtNum[idx].value;

    if(confirm(svc_num1 + "-" + svc_num2 + "-" + svc_num3 + "을(를) 대표회선으로 변경 하시겠습니까?"))
    {
        if (svc_num3.length == 5){
            sGubun = 'D';
        } else {
            sGubun = 'C';
			//다회선정보에 3자리수인경우 0빼서 보여주게 수정
			if (svc_num2.length == 3) svc_num2 = "0" + svc_num2;
        }

        frm = document.MultiForm;
        frm.SvcCd.value = sGubun;
        frm.SvcNum1.value  =   svc_num1;
        frm.SvcNum2.value  =   svc_num2;
        frm.SvcNum3.value  =   svc_num3;
        frm.SvcMgmtNum.value  =   SvcMgmtNum
        frm.target = "ifr_hidden";
        frm.submit();
    }
}

function memberInfo(ReqInd, MultiCnt)
{
	var frmPopup = document.PopupForm;
	var frm = document.frmMain;
    var SvcNum1,SvcNum2,SvcNum3,SvcCd;
    var SocSecNum,UserId,UserName,returnViewId;
    if ( !checkSvcNo(frm) ) return;

    for( i=0; i<frm.SvcCd.length; i++) {
        if(frm.SvcCd[i].checked) {
            SvcCd = frm.SvcCd[i].value;
        }
    }
    
    SiteCd      =	frm.SiteCd.value;
    SvcNum1     =	frm.SvcNum1.value;
    SvcNum2     =	frm.SvcNum2.value;
    SvcNum3     =	frm.SvcNum3.value;
    if ( SvcCd == "D" ) {
	    SvcNum1     =	frm.DmbNum1.value;
	    SvcNum2     =	frm.DmbNum2.value;
	    SvcNum3     =	frm.DmbNum3.value;
    }else if(SvcCd == "T"){
		SvcNum1     =	frm.DmbNum1.value;
	    SvcNum2     =	frm.DmbNum2.value;
	    SvcNum3     =	frm.DmbNum3.value;
	}
	
    if ( ReqInd != "UPDATE" ) {
		SocSecNum   =	frm.SocSecNum.value;
		UserId      =	frm.UserId.value;
		UserName    =	frm.UserName.value;
    } else {
		SocSecNum   =	"";
		UserId      =	"";
		UserName    =	"";
    }

    // 다회선번호 체크
    if ( eval(MultiCnt) > 0 ) {
		var chkNum1,chkNum2,chkNum3;
		var inputNum1,inputchkNum2,inputchkNum3,inputSvcCd;
		chkNum1 = SvcNum1;
		chkNum2 = SvcNum2;
		chkNum3 = SvcNum3;
	   	if ( SvcCd == "C" && chkNum2.length == 3 )
			chkNum2 = "0" + chkNum2;
	
	    for( i=1; i<frm.MSSvcCd.length; i++) {
	    	inputSvcCd = frm.MSSvcCd[i].value;
	    	inputNum1 = frm.MSIdx1[i].value;
	    	inputNum2 = frm.MSIdx2[i].value;
	    	inputNum3 = frm.MSIdx3[i].value;
	
	    	if ( inputSvcCd == "C" && inputNum2.length == 3 )
				inputNum2 = "0" + inputNum2;
	
		    if ( inputSvcCd == SvcCd && inputNum1 == chkNum1 && inputNum2 == chkNum2 && inputNum3 == chkNum3 )
		    {
		    	alert("추가회선에 등록되어있는 번호입니다.\n\n대표회선으로 변경하실 경우 추가회선의 대표회선으로 변경 버튼을 클릭하세요.");
		    	return;
		    }
	    }
    }

	frmPopup.target = "ifr_hidden";
    Param = "ReqSite=" + ReqInd + "&UP_CD=CHKSVCNO&SiteCd=" +SiteCd+"&SvcCd="+SvcCd+"&SvcNum1="+SvcNum1 + "&SvcNum2="+SvcNum2+"&SvcNum3="+SvcNum3+"&SocSecNum="+SocSecNum+"&UserId="+UserId+"&UserName="+UserName;
   
	frmPopup.PostParam.value = Param;
    frmPopup.thisViewId.value = "V_MUPT0001";
    frmPopup.returnViewId.value = "V_MUPT0003";
    frmPopup.action = "/normal.do?serviceId=S_CERT0004&viewId=V_COMM1001&pageFlag=upUSER";
    frmPopup.submit();
}


function memberInfoTablet(ReqInd, MultiCnt)   //2011-05-19  태블릿기기 인증추가로 인한 생성(대표번호 변경하기 클릭시)
{
	
	var SvcNum1,SvcNum2,SvcNum3;
	var frm = document.frmMain;
	
	if ( !checkTabletPcSvcNo(frm) ) return;	    
	    
	for( i=0; i<frm.SvcCd.length; i++) {
        if(frm.SvcCd[i].checked) {
            SvcCd = frm.SvcCd[i].value;
        }
    }
	    
    SvcNum1     =	frm.TSvcNum1.value;
    SvcNum2     =	frm.TSvcNum2.value;
    SvcNum3     =	frm.TSvcNum3.value;
	    
	// 다회선번호 체크
    if ( eval(MultiCnt) > 0 ) {
		var chkNum1,chkNum2,chkNum3;
		var inputNum1,inputchkNum2,inputchkNum3,inputSvcCd;
		chkNum1 = SvcNum1;
		chkNum2 = SvcNum2;
		chkNum3 = SvcNum3;
	   	if ( SvcCd == "T" && chkNum2.length == 3 )
			chkNum2 = "0" + chkNum2;
	
	    for( i=1; i<frm.MSSvcCd.length; i++) {
	    	inputSvcCd = frm.MSSvcCd[i].value;
	    	inputNum1 = frm.MSIdx1[i].value;
	    	inputNum2 = frm.MSIdx2[i].value;
	    	inputNum3 = frm.MSIdx3[i].value;
	
			//alert("inputSvcCd===" + inputSvcCd + ", inputNum1=="+ inputNum1 + ", inputNum2==" + inputNum2 + ", SvcCd==" + SvcCd + ", inputNum1==" + inputNum1 + ",inputNum2==" + inputNum2   );
	
	    	if ( inputSvcCd == "T" && inputNum2.length == 3 )
				inputNum2 = "0" + inputNum2;
	
		    //if ( inputSvcCd == SvcCd && inputNum1 == chkNum1 && inputNum2 == chkNum2 && inputNum3 == chkNum3 )
		    if ( inputNum1 == chkNum1 && inputNum2 == chkNum2 && inputNum3 == chkNum3 )
		    {
		    	alert("추가회선에 등록되어있는 번호입니다.\n\n대표회선으로 변경하실 경우 추가회선의 대표회선으로 변경 버튼을 클릭하세요.");
		    	return;
		    }
	    }
    }	    
	    
    frm.thisViewId.value = "V_MUPT0001" ;
    frm.ReqSite.value=ReqInd;
    frm.UP_CD.value="CHKSVCNO";
    //frm.target = "ifr_hidden";
    frm.action = "/normal.do?serviceId=S_CERT0004&viewId=V_COMM1001&pageFlag=upUSER";
    frm.submit(); 
}


function popupOpen(LinkGbn)	//휴대폰 및 DMB 가입자 정보 확인////////
{
    var frmPopup = document.PopupForm;
    var frm = document.frmMain;

    var SvcNum1,SvcNum2,SvcNum3;
    if ( !checkSvcNo(frm) ) return;
    for( i=0; i<frm.SvcCd.length; i++) { 
        if(frm.SvcCd[i].checked) {
            SvcCd = frm.SvcCd[i].value;
        }
    }
    frmPopup.SvcCd.value	=	SvcCd;
    frmPopup.SvcNum1.value	=	frm.SvcNum1.value;
    frmPopup.SvcNum2.value  =	frm.SvcNum2.value;
    frmPopup.SvcNum3.value  =	frm.SvcNum3.value;
    frmPopup.DmbNum1.value  =	frm.DmbNum1.value;
    frmPopup.DmbNum2.value  =	frm.DmbNum2.value;
    frmPopup.DmbNum3.value  =	frm.DmbNum3.value;
    
    //20111212 태블릿 법인폰 등록 수정
    var TFlag ="";
    if(SvcCd=='T')
    {
	    frmPopup.SvcNum1.value	=	frm.TSvcNum1.value;
	    frmPopup.SvcNum2.value  =	frm.TSvcNum2.value;
	    frmPopup.SvcNum3.value  =	frm.TSvcNum3.value;
	    TFlag ="tablet";       
	 }   


    // 인증종류에 따른 구분
    if ( LinkGbn == "0" ) {	
		if(frmPopup.SvcNum.value == ""){
			window.open('','memberInfoTarget'+LinkGbn,'toolbar=no,width=650,height=470,status=no,menubar=no,scrollbars=no,resizable=no');
	    	frmPopup.target = 'memberInfoTarget'+LinkGbn;
		}
    	frmPopup.action = "/normal.do?serviceId=SDUMMY0001&viewId=V_MUPT3001";
    } else if ( LinkGbn == "1" ) {
		if(frmPopup.SvcNum.value == ""){
			window.open('','memberInfoTarb'+LinkGbn,'toolbar=no,width=650,height=470,status=no,menubar=no,scrollbars=no,resizable=no');
	    	frmPopup.target = 'memberInfoTarb'+LinkGbn;
		}
    	frmPopup.action = "/normal.do?serviceId=S_AUTH0003&viewId=V_AUTH3000&TFlag="+TFlag;
    } else if ( LinkGbn == "2" ) {
    	frmPopup.target = "ifr_hidden";
    	frmPopup.action = "/normal.do?serviceId=SDUMMY0001&viewId=V_AUTH0000&SiteCd="+SiteCd+"&pageGubun=mupt";
    } else if ( LinkGbn == "3" ) {
		window.open('','memberInfoTarget'+LinkGbn,'toolbar=no,width=480,height=343,status=no,menubar=no,scrollbars=no,resizable=no');

    	frmPopup.target = 'memberInfoTarget'+LinkGbn;
    	frmPopup.action = "/normal.do?serviceId=SDUMMY0001&viewId=V_MUPT1003";
    } else if ( LinkGbn == "4" ) {
		window.open('','memberInfoTarget'+LinkGbn,'toolbar=no,width=615,height=500,status=no,menubar=no,scrollbars=no,resizable=no');

    	frmPopup.target = 'memberInfoTarget'+LinkGbn;
    	frmPopup.action = "/normal.do?serviceId=SDUMMY0001&viewId=V_MUPT3002";
    } else if ( LinkGbn == "5" ) {
    	frmPopup.action = "/normal.do?serviceId=SDUMMY0001&viewId=V_MUPT3001&LinkGbn=5";
    } 

    frmPopup.submit();
}


function tabletPopupOpen()	//2011-05-19  태블릿기기 대표번호 변경 팝업
{
    var frmPopup = document.PopupForm;
    var frm = document.frmMain;

    var SvcNum1,SvcNum2,SvcNum3;
    if ( !checkSvcNo(frm) ) return;
    for( i=0; i<frm.SvcCd.length; i++) {
        if(frm.SvcCd[i].checked) {
            SvcCd = frm.SvcCd[i].value;
        }
    }
    frmPopup.SvcCd.value	=	SvcCd;
    frmPopup.SvcNum1.value	=	frm.TSvcNum1.value;
    frmPopup.SvcNum2.value  =	frm.TSvcNum2.value;
    frmPopup.SvcNum3.value  =	frm.TSvcNum3.value;

    // 인증종류에 따른 구분
	tabletpcpop = window.open('','tabletpcpop','toolbar=no,width=555,height=320,status=no,menubar=no,scrollbars=no,resizable=no');
	//2011-06-22 팝업이름 지정 (종료시 필요)

   	frmPopup.target = "tabletpcpop";
   	frmPopup.action = "/normal.do?serviceId=SDUMMY0001&viewId=V_MUPT3003";

    frmPopup.submit();
    
    
}
/*
function popupOpenMultiSvc(usimChk)	//다회선 추가 팝업 ( referer 값을 생성하기 위해 popup 처리 )  ////////
{
    var frmPopup = document.PopupForm;
    var frm = document.frmMain;

    var SvcNum1,SvcNum2,SvcNum3;
    if ( !checkSvcNo(frm) ) return;
    for( i=0; i<frm.SvcCd.length; i++) {
        if(frm.SvcCd[i].checked) {
            SvcCd = frm.SvcCd[i].value;
        }
    }
    frmPopup.SvcCd.value	=	SvcCd;
    frmPopup.SvcNum1.value	=	frm.SvcNum1.value;
    frmPopup.SvcNum2.value  =	frm.SvcNum2.value;
    frmPopup.SvcNum3.value  =	frm.SvcNum3.value;
    frmPopup.DmbNum1.value  =	frm.DmbNum1.value;
    frmPopup.DmbNum2.value  =	frm.DmbNum2.value;
    frmPopup.DmbNum3.value  =	frm.DmbNum3.value;

    // 인증종류에 따른 구분
	window.open('','memberInfo','toolbar=no,width=615,height=550,status=no,menubar=no,scrollbars=no,resizable=no'); //530

   	frmPopup.target = "memberInfo";
   	if(usimChk != '')
   	{
	   	frmPopup.action = "/normal.do?serviceId=SDUMMY0001&viewId=V_MUPT3002&usimChk="+usimChk;
	}else
	{
	   	frmPopup.action = "/normal.do?serviceId=SDUMMY0001&viewId=V_MUPT3002";
	}  	

    frmPopup.submit();
}
*/
function popupOpenMultiSvc(usimChk)	//다회선 추가 팝업 ( referer 값을 생성하기 위해 popup 처리 )  ////////
{
    var frmPopup = document.PopupForm;
    var frm = document.frmMain;
    var SvcNum,SvcNum1,SvcNum2,SvcNum3;

    if ( !checkSvcNo(frm) ) return;
    for( i=0; i<frm.SvcCd.length; i++) {
        if(frm.SvcCd[i].checked) {
            SvcCd = frm.SvcCd[i].value;
        }
    }
    	
	frmPopup.SvcCd.value	=	SvcCd;
			
	if(SvcCd=='C'){
	    frmPopup.SvcNum1.value	=	frm.SvcNum1.value;
	    frmPopup.SvcNum2.value  =	frm.SvcNum2.value;
	    frmPopup.SvcNum3.value  =	frm.SvcNum3.value;
		
	}
	if(SvcCd=='T'){
		
	    frmPopup.TSvcNum1.value	=	frm.TSvcNum1.value;
	    frmPopup.TSvcNum2.value  =	frm.TSvcNum2.value;
	    frmPopup.TSvcNum3.value  =	frm.TSvcNum3.value;
	    TFlag ="tablet";       
		
	}
	if(SvcCd=='T'){
		
	    frmPopup.DmbNum1.value	=	frm.DmbNum1.value;
	    frmPopup.DmbNum1.value  =	frm.DmbNum2.value;
	    frmPopup.DmbNum1.value  =	frm.DmbNum3.value;
	}	
	
    // 인증종류에 따른 구분
	window.open('','memberInfoInsert','toolbar=no,width=615,height=550,status=no,menubar=no,scrollbars=no,resizable=no'); //530
   	frmPopup.target = "memberInfoInsert";
	
   	if(usimChk != '')
   	{
	   	frmPopup.action = "/normal.do?serviceId=SDUMMY0001&viewId=V_MUPT3002&usimChk="+usimChk;
	}else
	{
		frmPopup.action = "/normal.do?serviceId=SDUMMY0001&viewId=V_MUPT3001";
	}  	

    frmPopup.submit();
}


function reg_conform(Ind)
{
    if ( Ind == "Y" ) {
        return confirm("회선 인증을 받으면 매달 무료 SMS 100건을 이용 하실 수 있습니다.\n 회선 인증을 받으시겠습니까?");
    }
    return false; 
}

function checkMember()	//명의자 확인 여부 검사
{
    var frm	= document.frmMain;
    var sSvcCd;
    var chkSvcNum1, chkSvcNum2, chkSvcNum3;
    for( i=0; i<frm.SvcCd.length; i++) {
        if(frm.SvcCd[i].checked) {
            sSvcCd = frm.SvcCd[i].value;
        }
    }

    if ( sSvcCd == "" ) {	//전화없음 선택시 처리
    	frm.SvcNumCheck.value == "NON"
    }
	
    if (frm.SvcNumCheck.value == "UP")		//INI:초기, UP:서비스번호 변경, CRM:가입자 확인, NON:전화없음선택
    {
    	if( sSvcCd == 'C' )
    	{
    		chkSvcNum1 = frm.SvcNum1.value;
    		chkSvcNum2 = frm.SvcNum2.value;
    		chkSvcNum3 = frm.SvcNum3.value;
    	}
    	if( sSvcCd == 'T' )  //2011-05-24  태블릿기기 추가로 인한 수정
    	{
    		chkSvcNum1 = frm.TSvcNum1.value;
    		chkSvcNum2 = frm.TSvcNum2.value;
    		chkSvcNum3 = frm.TSvcNum3.value;
    	}    	

    	if( sSvcCd == 'D' )
    	{
    		chkSvcNum1 = frm.DmbNum1.value;
    		chkSvcNum2 = frm.DmbNum2.value;
    		chkSvcNum3 = frm.DmbNum3.value;
    	}
		
		//alert("sSvcCd===" + sSvcCd + "\n  , chkSvcNum1==" + chkSvcNum1 + ", frm.chkSvcNum1.value===  " + frm.chkSvcNum1.value + "\n    , chkSvcNum2==" + chkSvcNum2 + ", frm.chkSvcNum2.value===  " + frm.chkSvcNum2.value  + "\n    , chkSvcNum3==" + chkSvcNum3 + ", frm.chkSvcNum3.value===  " + frm.chkSvcNum3.value  );
    	/*
		if(sSvcCd == 'T'){
			
			if(document.frmMain.tabletCertConfirmYN.value != 'Y'){
				alert(" 회선추가시 [인증] 버튼을 클릭하여\n본인인증 후 회선추가 가능합니다.");
				return;				
			}
			
			if (chkSvcNum1 != frm.chkSvcNum1.value || chkSvcNum2 != frm.chkSvcNum2.value || chkSvcNum3 != frm.chkSvcNum3.value) {
				alert(" 회선추가시 [인증] 버튼을 클릭하여\n본인인증 후 회선추가 가능합니다.");
				return;				
			}
			
		}else{
		*/
		
		if( chkSvcNum1 != frm.chkSvcNum1.value || chkSvcNum2 != frm.chkSvcNum2.value || chkSvcNum3 != frm.chkSvcNum3.value )
    	{
			//alert("입력하신 이동전화번호, 태블릿번호 또는 위성 DMB 번호 정보의 가입자 정보 확인 버튼을 눌러서 확인하세요");
	    	if(sSvcCd == 'C'){
				alert(" 회선추가시 [인증] 버튼을 클릭하여\n본인인증 후 회선추가 가능합니다.");
				frm.SvcNum1.focus();
			}else if(sSvcCd == 'D'){
				frm.DmbNum1.focus();				
			}
	        return false;
    	}
			
		//}
		
    	
    	//2011-06-01  정회원인경우, 없음선택후, 같은 대표번호 입력후 [변경하기]버튼 실행없이 [확인]실행한 경우 
    	// 기존에는 준회원으로 바뀌지만,  같은 번호일경우는  변경없이 처리한다.
    	if( chkSvcNum1 == frm.chkSvcNum1.value && chkSvcNum2 == frm.chkSvcNum2.value && chkSvcNum3 == frm.chkSvcNum3.value )
    	{
    	    //frm.SvcNumCheck.value = "INI";      //INI:초기, UP:서비스번호 변경, CRM:가입자 확인
    	    frm.SvcNumCheck.value = "CRM";      //INI:초기, UP:서비스번호 변경, CRM:가입자 확인
    	    frm.SvcMgmtNum.value = frm.defaultSvcMgmtNum.value;
    	    frm.chkSameData.value = "Y";    //대표회선변동없음을 나타내는 값     
    	}
    }

	return true;
}

function Ment()		//RegMainView.jsp(웹존의 신규가입 화면 id 중복검사 전)
{
    alert("아이디 중복확인 후 사용 가능합니다.");
    return;
}


function searchId(frm, LinkUrl)	//아이디 중복 체크
{
    if ( !checkID(frm) ) return
    var UserId = frm.UserId.value;
    frm = document.HiddenFrm;
    frm.UserId.value = UserId
    window.open('','idcheck','toolbar=no,width=480,height=310,status=no,menubar=no,scrollbars=no,resizable=no');
    frm.target = "idcheck";
    frm.action = LinkUrl;
    frm.submit()
}

function changeOCB(ViewInd)	//OCB 동의 부분 없애고 OCB도의 신청여부를 미신청(N)으로 변경
{
    var frm = document.frmMain;

	if (ViewInd == "Y" )	{	//OCB 동의 화면 보여줌
	    document.getElementById('OCBView').style.display = "none";
    } else {
	    document.getElementById('OCBView').style.display = "none";
    }
	
    return;
}

function checkMemberInfo(frm)	//회원정보 가입/변경 시 기타정보 검사
{
	var SvcNumChk = frm.defaultSvcMgmtNum.value;
	var tabletChk = frm.strFirstPhoneTabletPcYn.value;
	var SvcCdChk = frm.SvcCdChk.value;
	var SvcCd;
	
    for( i=0; i<frm.SvcCd.length; i++) {
        if(frm.SvcCd[i].checked) {
            SvcCd = frm.SvcCd[i].value;
        }
    }
	
	if(tabletChk == "Y"){
		
		if(SvcCd == "C" || SvcCd == "D"){		
		    // 입력 받은 서비스번호 검사
		    if ( !checkSvcNo(frm) ) return;	
		}else{
			// 입력 받은 서비스번호 검사
		    if ( !newCheckSvcNo(frm) ) return;
		}
	}else{
		
		if(SvcNumChk == "" || SvcCdChk != SvcCd){		
		    // 입력 받은 서비스번호 검사
		    if ( !checkSvcNo(frm) ) return;	
		}else{
			// 입력 받은 서비스번호 검사
		    if ( !newCheckSvcNo(frm) ) return;
		}
	}
	
	
    // 입력 받은 생일 검사
    var inputDate = frm.BirthYear.value + frm.BirthMon.value + frm.BirthDay.value;
    if(inputDate > getToDay){
        alert('입력하신 생일을 확인하시기 바랍니다.');
        return false;
    }

    var checkboxvalue;

    if (frm.BirthInd[0].checked) {
        checkboxvalue = frm.BirthInd[0].value;
    } else {
        checkboxvalue = frm.BirthInd[1].value;
    }

    if ( frm.BirthInd[0].checked ) {
        if(checkdate(frm.BirthYear.value,frm.BirthMon.value,frm.BirthDay.value ) == false)
        {
            alert("유효한 양력 일자가 아닙니다.\n 생년월일을 확인해주세요.");
            frm.BirthYear.focus();
            return false;
        }
    } else {
        if(day_deal(frm.BirthYear.value,frm.BirthMon.value,frm.BirthDay.value ) == false)
        {
            alert("유효한 음력 일자가 아닙니다.\n 생년월일을 확인해주세요.");
            frm.BirthYear.focus();
            return false;
        }
    }

	if ( !checkMember() )	return false;
    //이메일 실시간 검사가 종료 되었는지 검사
    if ( !checkMailEnd(frm) ) return false;
    
	return true;
}

//14세 미만 이용 시작
function checkLegalSvcNum1()	//법정대리인 이동전화번호 011/017 선택시
{
    var frm	= document.frmMain;
	
    if ( frm.LegalSvcNum1.value == "20" || frm.LegalSvcNum1.value == ""  ){
	    alert("연락전화 구분번호를 선택 하시고 입력 하세요.");
    	frm.LegalSvcNum1.focus();
    }
   	return;
}

///////email 기타시///////////
function changeLegalMail(frm)
{
    if (frm.LegalEmailDomain.value == "0")
    {
        LegalmailShow.style.display="";
        frm.LegalEmailDomain1.focus();
    }
    else
    {
        LegalmailShow.style.display = "none";
    }
}

function checkeLegalMailAddr(frm)	//법정대리인 메일 검사
{
	var emailAddr;
	var emailValue;
	if (frm.LegalEmailId.value == "")
	{
		alert("이메일 주소를 입력하세요");
		frm.LegalEmailId.focus();
		return false;
	}
	if (frm.LegalEmailDomain.value == "0")
	{
		if (frm.LegalEmailDomain1.value == "")
		{
			alert("이메일 주소를 입력하세요");
			return false;
		}
		if(! ignoreSpaces(frm.LegalEmailId.value))
		{
			alert("이메일 주소에 공백을 포함하셨습니다. 정확히 입력하세요");
			frm.LegalEmailId.focus();
			return false;
		}
		if(! ignoreSpaces(frm.LegalEmailDomain1.value))
		{
			alert("이메일 주소에 공백을 포함하셨습니다. 정확히 입력하세요");
			frm.LegalEmailDomain1.focus();
			return false;
		}
		if( !checkEmail(frm.LegalEmailId.value+"@"+frm.LegalEmailDomain1.value) )
		{
			alert("이메일 주소가 올바르지 않습니다.");
			frm.LegalEmailId.focus();
			return false;
		}
		emailAddr = frm.LegalEmailId.value+"@"+frm.LegalEmailDomain1.value;
		emailValue = parseDomain(emailAddr);
		if (DomainCheck(emailValue))
		{
			alert("이메일 주소가 올바르지 않습니다.");
			frm.LegalEmailId.focus();
			return false;
		}
	}
	else
	{
		if( !checkEmail(frm.LegalEmailId.value+"@"+frm.LegalEmailDomain.value) )
		{
			alert("이메일 주소가 올바르지 않습니다.");
			frm.LegalEmailId.focus();
			return false;
		}
		emailAddr = frm.LegalEmailId.value+"@"+frm.LegalEmailDomain.value;
		emailValue = parseDomain(emailAddr);

		if (DomainCheck(emailValue))
		{
			alert("이메일 주소가 올바르지 않습니다.");
			frm.LegalEmailId.focus();
			return false;
		}
	}
	return true;

}

	function checkLegalJuminName() {		//법정대리인 주민번호, 이름 입력시 검사
		if( document.frmMain.LegalName.value == "" )
		{
			alert("이름을 입력하세요");
			document.frmMain.LegalName.focus();
			return false;
		}

		//알파벳 및 공백검사
		var includeAlpha    =   0;
		var includeSpace    =   0;
		for(i = 0; i < document.frmMain.LegalName.value.length; i++){
			if(document.frmMain.LegalName.value.substring(i, i+1)==" ")
			    includeSpace++;
            if(document.frmMain.LegalName.value.substring(i,i+1) >= "a" || document.frmMain.LegalName.value.substring(i,i+1) <= "Z")
			    includeAlpha++;
		}
		//외국인이고 영문 이름의 경우 공백 입력 가능하게 수정
		if ( document.frmMain.LegalInd ) {
			if ( includeSpace > 0 && (!document.frmMain.LegalInd.checked || includeAlpha < 1) ) {
				alert("이름에 공백을 포함할 수 없습니다.");
    		    document.frmMain.LegalName.focus();
				return false;
		    }
		} else {
			if ( includeSpace > 0 ) {
				alert("이름에 공백을 포함할 수 없습니다.");
    		    document.frmMain.LegalName.focus();
				return false;
		    }
		}

		if(document.frmMain.LegalSecNum1.value.length != 6) {
			alert("주민등록번호를 입력해주세요.");
		    document.frmMain.LegalSecNum1.focus();
		    return false;
		}
		if(document.frmMain.LegalSecNum2.value.length != 7) {
			alert("주민등록번호를 입력해주세요.");
		    document.frmMain.LegalSecNum2.focus();
		    return false;
		}

		var fgn_reg_no = document.frmMain.LegalSecNum1.value + document.frmMain.LegalSecNum2.value;
		if ( document.frmMain.LegalInd ) {
			if ( document.frmMain.LegalInd.checked )
				document.frmMain.LegalInd.value = "9";	//외국인
			else
				document.frmMain.LegalInd.value = "1";	//내국인
			if (document.frmMain.LegalInd.value == 9)	{
				if (! fgn_no_chksum(fgn_reg_no)){
					alert('외국인등록번호에 오류가 있습니다. 다시 확인하십시오.');
					document.frmMain.LegalSecNum1.focus();
					return false ;
				}
			} else {
				if( checkRegisterNum(fgn_reg_no) == false) {
					alert("주민등록 번호를 바르게 적어 주십시오.");
					document.frmMain.LegalSecNum1.focus();
					return false;
				}
			}
		}
	    return true;
	}


function checkLegalInfo(frm)	//대리인 정보 확인
{
    var val;
    if( !checkLegalJuminName())	return false;

    /*
    if (! ageCheck(20,String(frm.LegalSecNum1.value+frm.LegalSecNum2.value)))
    {
        alert("법정대리인(부모님,친권자,후견인 등)은 만20세이상만 가능합니다.\n법정대리인(부모님,친권자,후견인 등)을 확인하여주십시요");
        frm.LegalSecNum1.focus();
        return false;
    }
    */

    var  SocSecNum1 =  frm.SocSecNum1.value;
    var  SocSecNum2_firNum =  frm.SocSecNum2_firNum.value;    //성별 1 자리 
    var  LegalSecNum1 = frm.LegalSecNum1.value  ;
    var  LegalSecNum2 = frm.LegalSecNum2.value  ;

    var  SocSecNum1_sum = "19";
    var  LegalSecNum1_sum = "19";
    
    var  LegalSecNum2_firNum = LegalSecNum2.substring(0,1);
    
    //1,2 (외국인 5,6) => 1900 년도생    3,4 (외국인 7,8) => 2000년도생
    if(SocSecNum2_firNum == '3' || SocSecNum2_firNum == '4' || 
        SocSecNum2_firNum == '7' || SocSecNum2_firNum == '8' )
    {
    	SocSecNum1_sum = "20" + SocSecNum1;
    }else
    {
    	SocSecNum1_sum = "19" + SocSecNum1;
    }   
    
    if(LegalSecNum2_firNum == '3' || LegalSecNum2_firNum == '4' || 
       LegalSecNum2_firNum == '7' || LegalSecNum2_firNum == '8' )
    {
    	LegalSecNum1_sum = "20" + LegalSecNum1; 
    }else
    {
    	LegalSecNum1_sum = "19" + LegalSecNum1;
    }    
     
    var  legalAgeDiffer =  SocSecNum1_sum - LegalSecNum1_sum  ;
        
    //alert("SocSecNum1_sum==" + SocSecNum1_sum + "LegalSecNum1_sum==" + LegalSecNum1_sum + ", legalAgeDiffer===" + legalAgeDiffer );
	//alert(ageCheck(20,String(LegalSecNum1_sum+frm.LegalSecNum2.value)) );

	//2011-03-11  수정
    if (! ageCheck(20,String(frm.LegalSecNum1.value+frm.LegalSecNum2.value))   ||  legalAgeDiffer < 140000 )
    {
        alert("대리인(부모님, 후견인)의 임의 설정 방지를 위하여 법정대리인은 만20세 이상이면서\n미성년자 회원과 14세 이상 차이가 나는 경우로 제한하고 있습니다.\n\n위 조건에도 불구하고 실제 법정대리인인 경우에는 고객센터로 연락 주시기 바랍니다.");
        frm.LegalSecNum1.focus();
        return false;
    }    

    /*
    if (frm.LegalRelCd[0].checked == false && frm.LegalRelCd[1].checked == false)
    {
        alert("법적대리인 관계를 선택하세요");
        return false;
    }

    LegalSvcNum	=	frm.LegalSvcNum1.value + frm.LegalSvcNum2.value + frm.LegalSvcNum3.value;
    if (frm.LegalSvcNum1.value != "" && LegalSvcNum.length < 9)
    {
        alert("법정 대리인 연락처를 선택하세요");
        frm.LegalSvcNum1.focus();
        return false;
	}

	if ( !checkeLegalMailAddr(frm) )	{
		frm.LegalEmailId.focus();
		return false;
	}
	*/
    return true;
}

//14세 미만 이용 종료
