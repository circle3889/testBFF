	function checkJuminName() {		//주민번호, 이름 입력시 검사
		if( document.frmMain.UserName.value == "" )
		{
			alert("이름을 입력하세요");
			document.frmMain.UserName.focus();
			return false;
		}

		//알파벳 및 공백검사
		var includeAlpha    =   0;
		var includeSpace    =   0;
		for(i = 0; i < document.frmMain.UserName.value.length; i++){
			if(document.frmMain.UserName.value.substring(i, i+1)==" "){
			    includeSpace++;				
			}
				
            if(document.frmMain.UserName.value.substring(i,i+1) >= 'a' || document.frmMain.UserName.value.substring(i,i+1) <= 'Z'){
			    includeAlpha++;				
			}
		}
				
		//외국인이고 영문 이름의 경우 공백 입력 가능하게 수정
		if ( document.frmMain.UserInd ) {
			if ( includeSpace > 0 && (!document.frmMain.UserInd.checked || includeAlpha < 1) ) {
				alert("이름에 공백을 포함할 수 없습니다.");
    		    document.frmMain.UserName.focus();
				return false;
		    }
		} else {
			
			var juminCheck = document.frmMain.Jumin2.value;
			var juminStr   = juminCheck.substring(0,1);
			
			if ( includeSpace > 0 && (juminStr == "1" || juminStr == "2" || juminStr == "3" || juminStr == "4")) {
				alert("이름에 공백을 포함할 수 없습니다.");
    		    document.frmMain.UserName.focus();
				return false;
		    }
		}

		if(document.frmMain.Jumin1.value.length != 6) {
			alert("주민등록번호를 입력해주세요.");
		    document.frmMain.Jumin1.focus();
		    return false;
		}
		if(document.frmMain.Jumin2.value.length != 7) {
			alert("주민등록번호를 입력해주세요.");
		    document.frmMain.Jumin2.focus();
		    return false;
		}

		var fgn_reg_no = document.frmMain.Jumin1.value + document.frmMain.Jumin2.value;
		if ( document.frmMain.UserInd ) {
			if ( document.frmMain.UserInd.checked )
				document.frmMain.UserInd.value = "9";	//외국인
			else
				document.frmMain.UserInd.value = "1";	//내국인
			if (document.frmMain.UserInd.value == 9)	{
				if (! fgn_no_chksum(fgn_reg_no)){
					alert('외국인등록번호에 오류가 있습니다. 다시 확인하십시오.');
					document.frmMain.Jumin1.focus();
					return false ;
				}
			} else {
				if( checkRegisterNum(fgn_reg_no) == false) {
					alert("주민등록 번호를 바르게 적어 주십시오.");
					document.frmMain.Jumin1.focus();
					return false;
				}
			}
		}
	    return true;
	}


	function checkLegalJuminName() {		//미성년자 법정대리인 주민번호, 이름 입력시 검사
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
			
			var juminCheck = document.frmMain.LegalSecNum2.value;
			var juminStr   = juminCheck.substring(0,1);
			
			if ( includeSpace > 0  && (juminStr == "1" || juminStr == "2" || juminStr == "3" || juminStr == "4")) {
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

	function checkIdPwdCrm() {		//기 가입자 ID/PWD 확인

		if( document.frmMain.UserId.value == "" )
		{
			alert("아이디를 입력하세요");
			document.frmMain.UserId.focus();
			return false;
		}
		if( document.frmMain.UserPwd.value == "" )
		{
			alert("패스워드를 입력하세요");
			document.frmMain.UserPwd.focus();
			return false;
		}
	    return true;
	}

	function cancel_reset()
	{
		document.frmMain.UserName.value = '';
		document.frmMain.Jumin1.value = '';
		document.frmMain.Jumin2.value = '';
		document.frmMain.UserName.focus();
	}

