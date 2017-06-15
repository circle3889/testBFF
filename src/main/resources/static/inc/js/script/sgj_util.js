/**
 * @fileoverview 유틸성 함수 스크립트
 *
 * @author hychul
 * @version 0.1
 */

/** 
 * BIO HSM 목록을 세팅하는 함수
 * @param {String}lsit 바이오 토큰 드라이버 목록
 */
function SGJ_setBioHsmList( list )
{
	var SG = document.getElementById(object_id);

	var strCert = SG.setBioHsmList(list)

	if ( isNull(list))
	{
		setErrorCode( "NO_DATA_VALUE" );
		setErrorMessage( "" );
		setErrorFunctionName( "SGJ_setBioHsmList" );
		return;
	}
	return;
}

/**
 * BIO 토큰 에러 목록 얻기
 */
function SGJ_getBioErrorCodes()
{
	var SG = document.getElementById(object_id);
	return SG.getBioErrorCodes()
}


/** 입력으로 들어온 스트링의 CRLF를 삭제하는 메소드
* @param {String}str 임의의 String
* @return {String}CRLF가 제거된 스트링
*/
function removeCRLF( str )
{
	var SG = document.getElementById(object_id);

	var i = 0;
	var buf = "";
	for( i = 0; i < str.length; i++ )
	{
		if ( str.charAt(i) != '\n' && str.charAt(i) != '\r' )
		{
			buf += str.charAt(i);
		}
	}
	return buf;
}

/**
* 로컬 파일 시스템에 저장된 HTML파일에서
* 다른 파일의 상대 경로를 절대 경로로 바꾸어 준다
* @param {String}strFileName 파일의 절대 경로
* @return {String}성공 - 'SUCCESS', 실패 - ""
*/
function getLocalPath( strFileName )
{
	var SG = document.getElementById(object_id);

	var strLocalPath = "";
	var pos = 0;
	var i = 0;

	if ( strFileName == null || strFileName == "" )
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		return "";
	}

	var buf = location.href.substring( 0, 8 );
	if ( buf != "file:///" )
	{
		setErrorCode( "NOT_LOCAL_FILE" );
		setErrorMessage( "" );
		return "";
	}

	buf = location.href.substring( 8, location.href.length );

	for ( i = 0; i < buf.length; i++ )
	{
		if ( buf.charAt(i) == "/" )
		{
			strLocalPath += "\\";
			pos = strLocalPath.length;
		} else if ( buf.charAt(i) == "%"
				&& buf.charAt(i+1) == "2"
				&& buf.charAt(i+2) == "0" )
		{
			strLocalPath += " ";
			i += 2;
		} else {
			strLocalPath += buf.charAt(i);
		}
	}

	strLocalPath = strLocalPath.substring( 0, pos ) + strFileName;

	return strLocalPath;
}

/**
* LF를 제거한 PEM 형식 인증서에 LF를 다시 추가하는 메소드
* @param {String}strCert LF 문자를 제거한 PEM 형식 인증서
* @param {String}outFilePath 목표 파일 절대 경로
* @return {String}성공	- LF가 포함된 PEM 형식 인증서, 실패	- ""
*/
function insertLF( strCert )
{
	var SG = document.getElementById(object_id);

	if ( strCert == null || strCert == "" )
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "insertLFtoPEMCert()" );
		return "";
	}

	var pemHeader	= "-----BEGIN CERTIFICATE-----";
	var pemTrailer	= "-----END CERTIFICATE-----";
	var buf = removeCRLF( strCert );

	var i = 0;
	var nCount = 0;
	for ( i = 0; i < pemHeader.length; i++ )
	{
		if ( pemHeader.charAt( i ) == buf.charAt( i ) )
		{
			nCount = nCount + 1;
		}
	}
	if  ( nCount != pemHeader.length )
	{
		setErrorCode("NOT_PEM_CERT");
		setErrorMessage( "" );
		setErrorFunctionName( "insertLFtoPEMCert()" );
		return "";
	}

	nCount = 0;
	for ( i = 0; i < pemTrailer.length; i++ )
	{
		if ( pemTrailer.charAt( i ) == buf.charAt( buf.length - pemTrailer.length + i ) )
		{
			nCount = nCount + 1;
		}
	}
	if  ( nCount != pemTrailer.length )
	{
		setErrorCode("NOT_PEM_CERT");
		setErrorMessage( "" );
		setErrorFunctionName( "insertLFtoPEMCert()" );
		return "";
	}

	var strPEMCert = "";
	nCount = 0;
	for ( i = 0; i < buf.length - pemHeader.length - pemTrailer.length; i++ )
	{
		strPEMCert += buf.charAt( i + pemHeader.length );
		nCount = nCount + 1;
		if ( nCount == 64 )
		{
			strPEMCert += '\n';
			nCount = 0;
		}
	}

	strPEMCert = pemHeader + "\n" + strPEMCert + "\n" + pemTrailer;

	return strPEMCert;
}

/**
* Base64 인코딩된 String 반환
* @param {String}strMessage String
* @return 인코딩된 메세지
*/function base64Encode( strMessage )
{
	var SG = document.getElementById(object_id);

	if ( isNull(strMessage))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "base64Encode()" );
		return "";
	}

	var buf = SG.base64Encode ( strMessage );
	if ( isNull(buf))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "base64Encode()" );
		return "";
	}

	return removeCRLF( buf );
}


/**
* Base64 디코딩된 String 반환
* @param {String}strMessage BASE64 String
* @return 디코딩된 메세지
*/
function base64Decode( strMessage )
{
	var SG = document.getElementById(object_id);

	if ( isNull(strMessage))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "base64Decode()" );
		return "";
	}

	var buf = SG.base64Decode( strMessage );
	if ( isNull(buf))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "base64Decode()" );
		return "";
	}

	return buf;
}

/**
* 해당 객체가 null 인지체크
* @param {String}string 객체
* @return true 또는 false
*/
function isNull( string )
{
	if ( string == null || string == "" )
		return true;
	return false
}

/**
* CA IP 및 포트 설정
* @param{String} ip CA IP
* @param{String} port CA PORT
*/
function SGJ_setCaInfo(ip, port)
{
	var SG = document.getElementById(object_id);
	SG.setCaInfo(ip, port);
}


/**
* 스마트폰 중계 서버 IP 및 포트 설정
* @param{String} ip 중계서버 IP
* @param{String} port 중계서버 PORT
*/
function SGJ_setMobileRelayInfo(ip, port)
{
	var SG = document.getElementById(object_id);
	SG.setMobileRelayInfo(ip, port);
}

/**
* 인증서 발급시 키 길이 설정
* @param{Integr} keyLength 인증서 발급시 키 길이 선택
*
*/
function SGJ_setKeyLength(keyLength)
{
	var SG = document.getElementById(object_id);
	SG.setKeyLength(keyLength);
}

/**
* 선택한 인증서의 파일 경로 반환
*/
function SGJ_getFilePath()
{
	var SG = document.getElementById(object_id);
	return SG.getFilePath();
}