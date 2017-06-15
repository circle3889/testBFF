/** 
 * @fileoverview 인증서 관련 정보 획득 및 신원확인 스크립트
 *
 * @author hychul
 * @version 0.1
 */

/**
* 해당 인증서의 유효성을 검증<br>
* 기본 CRL 저장디렉토리는 USER_HOME<br>
* strCert 값이 null 인경우 세션에 저장된 인증서의 유효성을 검증<br>
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strCert PEM 타입의 인증서
* @return true 또는 false
*/
function SGJ_checkCertValidity(strUserID, strCert)
{
	var SG = document.getElementById(object_id);

	if ( isNull(strUserID) || isNull(strCert))
	{
		setErrorCode( "NO_DATA_VALUE" );
		setErrorMessage( "" );
		setErrorFunctionName( "checkCertValidity()" );
		return false;
	}

	var bReturn = SG.checkCertValidity(strUserID, strCert );

	if ( !bReturn )
	{
		setErrorCode( GetLastErrMsg() );
		setErrorMessage( "" );
		setErrorFunctionName( "checkCertValidity()" );
		return bReturn;
	}
	return bReturn;
}

/**
* 인증서의 유효성을 검증
* strCert 값이 null 인경우 세션에 저장된 인증서의 유효성을 검증
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strCert PEM 타입의 인증서
* @param {String}crlPath CRL 저장 경로
* @return true 또는 false
*/
function SGJ_checkCertValidityWithPath( strUserID, strCert, crlPath )
{
	var SG = document.getElementById(object_id);

	if ( isNull(strUserID) || isNull(strCert) || isNull(crlPath))
	{
		setErrorCode( "NO_DATA_VALUE" );
		setErrorMessage( "" );
		setErrorFunctionName( "checkCertValidity()" );
		return false;
	}

	var bReturn = SG.checkCertValidity(strUserID, strCert, crlPath);

	if ( !bReturn )
	{
		setErrorCode( GetLastErrMsg() );
		setErrorMessage( "" );
		setErrorFunctionName( "checkCertValidity()" );
		return bReturn;
	}
	return bReturn;
}


/**
* 인증서 사용자의 신원확인
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}idn 사용자의 주민번호 또는 사업자 번호
* @param {String}encRandom 암호화된 랜덤값(BASE64 인코딩)
* @return true 또는 false
*/
function SGJ_checkCertUserIdentity( strUserID, idn, encRandom )
{
	var SG = document.getElementById(object_id);

	if ( isNull(strUserID) || isNull(idn) || isNull(encRandom))
	{
		setErrorCode( "NO_DATA_VALUE" );
		setErrorMessage( "" );
		setErrorFunctionName( "checkCertUserIdentity()" );
		return false;
	}

	var bReturn = SG.checkCertUserIdentity( strUserID, idn, encRandom );

	if ( !bReturn )
	{
		setErrorCode( GetLastErrMsg() );
		setErrorMessage( "" );
		setErrorFunctionName( "checkCertUserIdentity()" );
		return bReturn;
	}
	return bReturn;
}



/**
* 세션에 저장된 인증서 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}certType 얻고자 하는 인증서 타입("SIGN" 또는 "KM");
* @return {String}PEM 타입의 인증서
*/
function SGJ_getCert( strUserID, certType )
{
	var SG = document.getElementById(object_id);

	var strCert = SG.getCert(strUserID, certType)

	if ( isNull(strCert))
	{
		setErrorCode( "NO_DATA_VALUE" );
		setErrorMessage( "" );
		setErrorFunctionName( "getCert()" );
		return "";
	}
	return strCert;
}

//보안토큰 관련 추가 메소드========================================

/**
* 보안토큰에 저장된 개인 사용자 인증서 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}certType 얻고자 하는 인증서 타입("SIGN" 또는 "KM");
* @return {String}PEM 타입의 인증서
*/
function SGJ_getBioUserCert( strUserID, certType )
{
	var SG = document.getElementById(object_id);

	var strCert = SG.getBioUserCert(strUserID, certType)

	if ( isNull(strCert))
	{
		setErrorCode( "NO_DATA_VALUE" );
		setErrorMessage( "" );
		setErrorFunctionName( "SGJ_getBioUserCert()" );
		return "";
	}
	return strCert;
}


/**
* 보안토큰 사용자 인증값 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}svrCert 암호화를 위한 서버 인증서;
* @param {String}gonggoNum 공고번호;
* @return {String}사용자 인증값
*/
function SGJ_getAuthValue( strUserID, svrCert, gonggoNum )
{
	var SG = document.getElementById(object_id);

	var authValue = SG.getAuthValue(strUserID, svrCert, gonggoNum)

	if ( isNull(authValue))
	{
		setErrorCode( "NO_DATA_VALUE" );
		setErrorMessage( "" );
		setErrorFunctionName( "SGJ_getAuthValue()" );
		return "";
	}
	return authValue;
}


/**
* 보안토큰 기기 인증값 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}keyId 기관 번호(조달청은 01);
* @param {String}gonggoNum 공고번호;
* @return {String}보안토큰 기기 인증값
*/
function SGJ_getBioGenDevAuth( strUserID, keyId, gonggoNum )
{
	var SG = document.getElementById(object_id);

	var devAuthValue = SG.getBioGenDevAuth( strUserID, keyId, gonggoNum )

	if ( isNull(devAuthValue))
	{
		setErrorCode( "NO_DATA_VALUE" );
		setErrorMessage( "" );
		setErrorFunctionName( "SGJ_getBioGenDevAuth()" );
		return "";
	}
	return devAuthValue;
}

/**
* 보안토큰 개인 사용자 랜덤값 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @return {String}보안토큰 개인 사용자랜덤값
*/
function SGJ_getBioUserRandom( strUserID )
{
	var SG = document.getElementById(object_id);

	var random = SG.getBioUserRandom(strUserID)

	if ( isNull(random))
	{
		setErrorCode( "NO_DATA_VALUE" );
		setErrorMessage( "" );
		setErrorFunctionName( "SGJ_getBioUserRandom()" );
		return "";
	}
	return random;
}

/**
* 보안토큰 개인 주민번호 또는 사업자 번호 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @return {String}보안토큰 개인 주민번호 또는 사업자번호
*/
function SGJ_getBioUserIDN( strUserID )
{
	var SG = document.getElementById(object_id);

	var idn = SG.getBioUserIDN(strUserID)

	if ( isNull(idn))
	{
		setErrorCode( "NO_DATA_VALUE" );
		setErrorMessage( "" );
		setErrorFunctionName( "SGJ_getBioUserIDN()" );
		return "";
	}
	return idn;
}

/**
* 세션키로 암호화된 보안토큰 개인 주민번호 또는 사업자 번호 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @return {String}세션키로 암호화된 보안토큰 개인 주민번호 또는 사업자번호
*/

function SGJ_getEncryptedBioUserIDN( strUserID )
{
	var SG = document.getElementById(object_id);

	var idn = SG.getEncryptedBioUserIDN(strUserID)

	if ( isNull(idn))
	{
		setErrorCode( "NO_DATA_VALUE" );
		setErrorMessage( "" );
		setErrorFunctionName( "SGJ_getEncryptedBioUserIDN()" );
		return "";
	}
	return idn;
}

/**
* 보안토큰 시리얼 번호 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @return {String}보안토큰 시리얼 번호
*/
function SGJ_getBioCSN( strUserID)
{
	var SG = document.getElementById(object_id);

	var csn = SG.getBioCSN(strUserID)

	if ( isNull(csn))
	{
		setErrorCode( "NO_DATA_VALUE" );
		setErrorMessage( "" );
		setErrorFunctionName( "SGJ_getBioCSN()" );
		return "";
	}
	return csn;
}
//보안토큰 관련 추가 메소드 끝========================================

/**
* 실제 인증서가 저장된 경로 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @return {String}인증서 저장경로
*/
function SGJ_getCertPath( strUserID )
{
	var SG = document.getElementById(object_id);

	var strCertPath = SG.getCertPath(strUserID);
	if ( isNull(strCertPath) )
	{
		setErrorCode( "NO_DATA_VALUE" );
		setErrorMessage( "" );
		setErrorFunctionName( "getCertPath()" );
		return "";
	}
	return strCertPath;
}

/**
* 인증서 시리얼넘버 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strCert PEM 타입 인증서
* @return {String}인증서 시리얼 넘버
*/
function SGJ_getSerialNumber( strUserID, strCert )
{
	var SG = document.getElementById(object_id);

	if ( isNull(strCert) )
	{
		setErrorCode( "NO_DATA_VALUE" );
		setErrorMessage( "" );
		setErrorFunctionName( "getCertSerialNumber()" );
		return -1;
	}

	var nSerial = SG.getSerialNumber( strUserID, strCert );

	if ( nSerial < 0 )
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "getCertSerialNumber()" );
		return -1;
	}
	return nSerial;
}

/**
* 인증서의 subjectDN 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strCert PEM 타입의 인증서
* @return {String}인증서의 subjectDN
*/
function SGJ_getSubjectDN( strUserID, strCert )
{
	var SG = document.getElementById(object_id);

	if ( isNull(strCert))
	{
		setErrorCode( "NO_DATA_VALUE" );
		setErrorMessage( "" );
		setErrorFunctionName( "getCertSubjectDN()" );
		return "";
	}

	var buf = SG.getSubjectDN( strUserID, strCert );
	if ( isNull(buf))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "getCertSubjectDN()" );
		return "";
	}

	return buf;
}

/**
* 인증서의 IssuerDN 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strCert PEM 타입의 인증서
* @return {String}인증서의 subjectDN
*/
function SGJ_getIssuerDN( strUserID, strCert )
{
	var SG = document.getElementById(object_id);

	if (isNull(strCert))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "getCertIssuerDN()" );
		return "";
	}

	var buf = SG.getIssuerDN(strUserID, strCert);
	if ( isNull(buf))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "getCertIssuerDN()" );
		return "";
	}

	return buf;
}

/**
* 인증서의 유효시작시점 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strCert PEM 타입의 인증서
* @return {String}인증서의 유효 시작시점
*/

function SGJ_getNotBefore( strUserID, strCert )
{
	var SG = document.getElementById(object_id);
	if ( isNull(strCert))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "getCertNotBefore()" );
		return "";
	}

	var buf = SG.getNotBefore( strUserID, strCert );
	if ( isNull(buf))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "getCertNotBefore()" );
		return "";
	}

	return buf;
}

/**
* 인증서의 유효종료시점 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strCert PEM 타입의 인증서
* @return {String}인증서의 유효 종료시점
*/
function SGJ_getNotAfter( strUserID, strCert )
{
	var SG = document.getElementById(object_id);
	if ( isNull(strCert))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "getCertNotAfter()" );
		return "";
	}

	var buf = SG.getNotAfter( strUserID, strCert );
	if ( isNull(buf))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "getCertNotAfter()" );
		return "";
	}

	return buf;
}


/**
* 인증서의 공개키 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strCert PEM 타입의 인증서
* @return {String}인증서의 공개키(Hex)
*/
function SGJ_getPublicKey( strUserID, strCert )
{
	var SG = document.getElementById(object_id);
	if ( isNull(strCert))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "getCertPublicKey()" );
		return "";
	}

	var buf = SG.getPublicKey( strUserID, strCert );
	if ( isNull(buf))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "getCertPublicKey()" );
		return "";
	}

	return buf;
}

/**
* 인증서의 키용도키 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strCert PEM 타입의 인증서
* @return {String}인증서의 키용도
*/
function SGJ_getKeyUsage( strUserID, strCert )
{
	var SG = document.getElementById(object_id);

	if ( isNull(strCert))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "getCertKeyUsage()" );
		return "";
	}

	var buf = SG.getKeyUsage( strUserID, strCert );
	if ( isNull(buf))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "getCertKeyUsage()" );
		return "";
	}
	return buf;
}

/**
* 인증서의 정책 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strCert PEM 타입의 인증서
* @return {String}인증서 정책
*/
function SGJ_getPolicy( strUserID, strCert )
{
	var SG = document.getElementById(object_id);
	if ( isNull(strCert))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "getCertPolicy()" );
		return "";
	}

	var buf = SG.getPolicy( strUserID, strCert );
	if ( isNull(buf))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "SGJ_getPolicy()" );
		return "";
	}

	return buf;
}

/**
* 인증서 정보 요약
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strCert PEM 타입의 인증서
* @return {String}인증서 정보 요약
*/
function SGJ_getCertInfo( strUserID, strCert )
{
	var SG = document.getElementById(object_id);
	if ( isNull(strCert) )
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "getCertInfo()" );
		return "";
	}

	var buf = SG.getCertInfo( strUserID, strCert );
	if ( isNull(buf))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "getCertInfo()" );
		return "";
	}
	return buf;
}

/**
* 인증서 종류 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}certType 인증서 종류("NPKI", "GPKI", "EPKI");
* @return {String}인증서 정보 요약
*/
function SGJ_getCertClass ( strUserID, certType )
{
	var SG = document.getElementById(object_id);
	var certClass = SG.getCertClass(strUserID, certType)

	if ( isNull(certClass))
	{
		setErrorFunctionName( "getCertClass()" );
		return "";
	}

	return certClass;
}

/**
* 주어진 인증서를 암호화된 랜덤값 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strCert PEM 타입 인증서
* @return {String}인증서로 암호화된 랜덤값(BASE64)
*/
function SGJ_getEncryptedRandomWithCert(strUserID, strCert)
{
	var SG = document.getElementById(object_id);
	if ( isNull(strCert))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "getEncryptedRandom()" );
		return "";
	}

	var strRandomNumber = SG.getEncryptedRandom(strUserID, strCert);

	if ( isNull(strRandomNumber))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "getEncryptedRandom()" );
		return "";
	}
	return strRandomNumber;
}

/**
* 세션키로 암호화된 랜덤값 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @return {String}세션키로 암호화된 랜덤값(BASE64)
*/
function SGJ_getEncryptedRandom(strUserID)
{
	var SG = document.getElementById(object_id);
	var strRandomNumber = SG.getEncryptedRandom(strUserID);
	if ( isNull(strRandomNumber))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "getEncryptedRandom()" );
		return "";
	}
	//return removeCRLF( strRandomNumber );
	return strRandomNumber;
}

/**
* 인증서의 비밀번호 체크
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @return true 또는 false
*/
function SGJ_isCorrectPasswd( strUserID )
{
	var SG = document.getElementById(object_id);
	var check = SG.isCorrectPasswd(strUserID);
	if ( !check)
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "isCorrectPasswd()" );
		return check;
	}
	return check;
}
/**
* 인증서 발급
*/
function SGJ_issueCert()
{
	var SG = document.getElementById(object_id);
	SG.issueCert();
}


/**
* 인증서 발급
* @param {String}authCode 참조번호
* @param {String}refNumber 인가코드
*/
function SGJ_issueCert(authCode, refNumber)
{
	var SG = document.getElementById(object_id);
	SG.issueCert(authCode, refNumber);
}


/**
* 인증서 갱신
*/
function SGJ_updateCert()
{
	var SG = document.getElementById(object_id);
	SG.updateCert();
}

/**
* 인증서 재발급
*/
function SGJ_reIssueCert()
{
	var SG = document.getElementById(object_id);
	SG.reIssueCert();
}


/**
* 인증서 재발급
* @param {String}authCode 참조번호
* @param {String}refNumber 인가코드
*/
function SGJ_reIssueCert(authCode, refNumber)
{
	var SG = document.getElementById(object_id);
	SG.reIssueCert(authCode, refNumber);
}

/**
* 인증서 폐지
*/
function SGJ_revokeCert()
{
	var SG = document.getElementById(object_id);
	SG.revokeCert();
}

/**
* 인증서 효력정지
*/
function SGJ_stopCert()
{
	var SG = document.getElementById(object_id);
	SG.stopCert();
}


/**
* PC에서 모바일 기기로 인증서 내보내기
* @param {String}phoneType 폰타입 지정("iphone", "android");
*
*/
function SGJ_pcToMobile()
{
	var SG = document.getElementById(object_id);
	SG.pcToMobile();
}

/**
* 모바일 기기에서 PC로 인증서 내보내기
* @param {String}phoneType 폰타입 지정("iphone", "android");
*
*/
function SGJ_mobileToPc()
{
	var SG = document.getElementById(object_id);
	SG.mobileToPc();
}