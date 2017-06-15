
// 중계서버 정보
//var g_SMPServerIP = "relay.signgate.com";
//var g_SMPServerPort = 443;
var g_SMPServerIP = "61.250.20.235";
var g_SMPServerPort = 9014;
var g_SMPNewApp = 1;

// 해쉬 알고리즘
var g_HashAlg = "SHA1";



/*************************************************************************************************************/
// 기능 : 인증서 발급 및 관리를 위한 인증서 정보 세팅 (실서버로 세팅)
/*************************************************************************************************************/
function SetCommonInfoFromVal()
{
	var CA_IP1	= "ca.signgate.com";
	var CA_IP2	= "ldap.signgate.com";
	var SG_CN	= "CN=ROOT-RSA-CRL,OU=ROOTCA,O=KISA,C=KR";

	// 해당 OID 세팅(사이트 별 인증서 정책에 따라 허용하는 인증서 세팅)
	var POLICIES= "1.2.410.200004.5.2.1.2|1.2.410.200004.5.2.1.1|1.2.410.200004.5.1.1.5|1.2.410.200004.5.1.1.7|1.2.410.200005.1.1.1|1.2.410.200005.1.1.5|1.2.410.200004.5.3.1.9|1.2.410.200004.5.3.1.2|1.2.410.200004.5.3.1.1|1.2.410.200004.5.4.1.1|1.2.410.200004.5.4.1.2|1.2.410.200012.1.1.1|1.2.410.200012.1.1.3";

	// 해당 OID만 허용하고 싶다면 아래 파라미터 "yes" -> "no" 로 설정
	document.KicaAX.SetCommonInfoFromVal( CA_IP1, 4502, CA_IP2, 389, CA_IP2, 389, SG_CN, "yes", POLICIES );
}

/*************************************************************************************************************/
// 기능: 인증서 스마트폰으로 내보내기 */
// 비고: SG_init_user 파라미터 9 번 세팅
/*************************************************************************************************************/
function SMP_PushCert()
{
	var	dn = "";

	// 인증서 정보 및 세부 정보 세팅
	SetCommonInfoFromVal();

	// 중계서버 세팅
	var ret = document.KicaAX.SetCommonInfoFromServerInfo( g_SMPServerIP, g_SMPServerPort);
	if( ret != 0 )
		return;

	ret = document.KicaAX.SetCommonInfoFromNewApp(g_SMPNewApp);
	if( ret != 0 )
		return;
	
	// 번호 8 세팅 (인증서 내보내기 세팅)
	// (실패시 내부적으로 오류메시지 출력)
	dn = document.KicaAX.SG_init_user( 9, "" );

	if( dn == "" || dn == null ) 
		return;

	alert( "스마트폰 인증서 내보내기 : " + "성공" );
}

/*************************************************************************************************************/
// 기능: 인증서 스마트폰으로 가져오기 */
// 비고: SG_init_user 파라미터 10 번 세팅
/*************************************************************************************************************/
function SMP_RecvCert()
{
	var	dn = "";

	// 인증서 정보 및 세부 정보 세팅
	SetCommonInfoFromVal();

	// 중계서버 세팅
	var ret = document.KicaAX.SetCommonInfoFromServerInfo( g_SMPServerIP, g_SMPServerPort);
	if( ret != 0 )
		return;

	ret = document.KicaAX.SetCommonInfoFromNewApp(g_SMPNewApp);
	if( ret != 0 )
		return;

	// 번호 10 세팅 (인증서 가져오기 세팅)
	// (실패시 내부적으로 오류메시지 출력)
	dn = document.KicaAX.SG_init_user( 10, "" );

	if( dn == "" || dn == null ) 
		return;

	alert( "스마트폰 인증서 가져오기 : " + "성공" );
}



/*************************************************************************************************************/
// 기능			: VID 검증 													 
// 리턴 값		: 0이 아니면 신원확인 실패
// 비고: 주민번호 입력창을 뛰워서 사용자 입력을 통해 VID 검증을 시행한다. 												
/*************************************************************************************************************/
function VerifyIdentify()
{
	SetCommonInfoFromVal();

	var ret = document.KicaAX.VerifyIdentify( "" ,"" );
	if( ret != 0 ) 
		return ;
}


/*************************************************************************************************************/
// 기능			: 인증서 암호 확인										 
//				  1. 성공: 전자서명 값 (base64 인코딩 문자열),
//				  2. 실패: null , ""	
// 비고: 인증서 비밀번호를 이용하여 전자서명을 시도함으로써 성공 유뮤에 따라 인증서 암호확인 유뮤 체크									
/*************************************************************************************************************/
function CheckPasswd()
{
	SetCommonInfoFromVal();
    var ret = document.KicaAX.InitializeUser();
    if( ret != 0 )
        return;
   
    var dn = document.KicaAX.GetUserDN();
    
    var signData = document.KicaAX.PKeySignData( dn, g_HashAlg, dn, "" );
    
	if (signData == null || signData == "")
    	return;
	
	alert( "인증서 비밀번호가 일치합니다." );
}

/*************************************************************************************************************/
// 기능			: 인증서 암호변경											 
// 리턴 값		: 
//				  1. 성공: 0
//				  2. 실패: 0 외의 값
// 비고: 						
/*************************************************************************************************************/
function ChangePrivKeyPwd()
{
	SetCommonInfoFromVal();
	var ret = document.KicaAX.ChangePrivKeyPwd();
	if(ret != 0 )
		return;


}

/*************************************************************************************************************/
// 기능			: 인증서 복사									 
// 리턴 값		: 
//				  1. 성공: 0
//				  2. 실패: 0 외의 값
// 비고: 						
/*************************************************************************************************************/
function ChangeMedia()
{    
	SetCommonInfoFromVal();
	var ret = document.KicaAX.ChangeMedia( "", "",0,0,"" );
	if( ret != 0 )
		return;
   

	alert( "인증서복사가 성공하였습니다." );
}

/*************************************************************************************************************/
// 기능			: 인증서 보기								 
// 리턴 값		: 
//				  1. 성공: 0
//				  2. 실패: 0 외의 값
// 비고: 인증서 선택창을 로딩하고 리스트의 인증서를 더블클릭하여 인증서 정보를 확인한다.						
/*************************************************************************************************************/
function ShowCertInfo()
{
	SetCommonInfoFromVal();

	var ret = document.KicaAX.InitializeUser();
    if( ret != 0 )
        return;
}

/***************************************************************/
// 해당 선택 미디어를 이용한 전자서명 검증 테스트
// 기능:	전자서명 및 검증 테스트
/***************************************************************/
function VerifySignKey()
{
	/* 1. SetCommonInfoFromVal 함수를 호출 */
	SetCommonInfoFromVal();
	var strSign = "";

	// 원문(임의의 값)
	var strPlaintext = "signgate";
	
	var strUserDN = document.KicaAX.SG_init_user(0, "");
	if ( strUserDN == null || strUserDN == "" )
		return ;
	
	document.KicaAX.SetInitUserMedia(6); 

	/* 2. 전자서명 생성 */
	strSign = document.KicaAX.PKeySignData(strPlaintext, g_HashAlg, strUserDN, "");
	if( strSign == null || strSign  == "" )
	{
		alert("전자서명 값 생성에 실패하였습니다.");
		return ;
	}

	/* 3. 전자서명 검증 */
	if( document.KicaAX.PKeyVerifyData(strPlaintext, strSign, g_HashAlg, strUserDN, "") != 0 )
	{
		alert("선택한 해당 매체의 인증서 키(공개키,개인키) 쌍 검증에 실패하였습니다.");
		return ;
	}

	alert("인증서 전자서명 검증에 성공하였습니다.")
}


/************************************************************************/
// 인증서 유효성 검증 테스트
// 기능:	1. PKCS#7_Signed 생성 및 검증
//			2. PKCS#7_Signed 생성 후 검증 시, 인증서 유효성 체크와 전자서명 값 검증		
// 추가:	1. 기존 인증서 뿐만아니라 용도제한용 인증서도 검증 가능하도록 수정 테스트(OID 활성화("yes"))
//			2. RA팀 요청사항 반영
/************************************************************************/
function ValidateCert()
{
	SetCommonInfoFromVal();
    var userDN = document.KicaAX.SG_init_user(0, "");
    if ( userDN == null || userDN == "" )
	{
		document.KicaAX.SetInitUserMedia(0);
		document.KicaAX.HSMFree();
		return ;
	}
   
    document.KicaAX.SetInitUserMedia(6);

	//64 byte 원문(임의의 샘플 값)
	var strPlaintext = "abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcd";
	
    // PKCS#7_signed 메시지 생성
    var signedData = document.KicaAX.SignData( strPlaintext , g_HashAlg, "");

	if( signedData  == null || signedData == "" )
	{
		document.KicaAX.SetInitUserMedia(0);
		document.KicaAX.HSMFree();
		return ;
	}
	
	//PKCS#7_Signed 메시지 검증
	var strRetPlaintext =  document.KicaAX.VerifysignSignature( signedData , g_HashAlg );
   
    if( strRetPlaintext == null || strRetPlaintext == "" )
    {
		document.KicaAX.SetInitUserMedia(0);
		document.KicaAX.HSMFree();
        return;
    }
	else if(strRetPlaintext != strPlaintext)
	{
		document.KicaAX.SetInitUserMedia(0);
		alert("인증서가 유효하지 않습니다.");
	}
	else
	{
		alert("선택한 인증서는 유효한 인증서 입니다.")
	}

	//로드된 HSM 메모리 해제
	document.KicaAX.SetInitUserMedia(0);
	document.KicaAX.HSMFree();
}


/************************************************************************/
// PC 시간 맞추기
// 기능:	1. 로컬 피시의 시간을 서버와 일치시킨다.
//			
// 추가:	1. 
/************************************************************************/
function SetTime()
{
	SetCommonInfoFromVal();
    var ret = document.KicaAX.SetSystemTimeFromSrv();
    if ( ret == 0 )
    	alert( "PC 시간이 성공적으로 변경되었습니다." );
    
}

