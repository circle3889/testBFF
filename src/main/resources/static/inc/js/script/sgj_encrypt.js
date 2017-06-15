/** 
 * @fileoverview 세션키 암호화 및 대칭키/비대칭키 암/복호화 스크립트
 *
 * @author hychul
 * @version 0.1
 */

/**
* 암호화된 세션키 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param  {String}strKmCert PEM 타입의 인증서
* @return {String}암호화된 세션키(BASE64)
*/
function SGJ_encryptSessionKey(strUserID, strKmCert )
{
	var SG = document.getElementById(object_id);
	if ( isNull(strKmCert))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage("");
		setErrorFunctionName( "encryptSessionKey()" );
		return "";
	}

	var strEncryptedSessionKey = SG.encryptSessionKey( strUserID, strKmCert );
	if ( isNull(strEncryptedSessionKey))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "encryptSessionKey()" );
		return "";
	}
	return strEncryptedSessionKey;
}

/**
* 복호화된 세션키 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strEncryptedSessionKey 암호화된 세션키
* @return {String}복호화된 세션키
*/
function SGJ_decryptSessionKey( strUserID, strEncryptedSessionKey )
{
	var SG = document.getElementById(object_id);
	if ( isNull(strUserID) )
	{
		setErrorCode( "NO_USER_ID" );
		setErrorMessage( "" );
		setErrorFunctionName( "decryptSessionKey()" );
		return "";
	}

	if (isNull(strEncryptedSessionKey))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "decryptSessionKey()" );
		return "";
	}

	var decryptSessionKey = SG.decryptSessionKey(strUserID, strEncryptedSessionKey);
	if ( isNull(decryptSessionKey))
	{
		setErrorFunctionName( "decryptSessionKey()" );
		return "";
	}
	return decryptSessionKey;
}

/**
* 세션키로 암호화된 String 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strMessage 원본 메세지(암호화 대상)
* @return {String}대칭키로 암호화된 메세지(BASE64)
*/
function SGJ_encryptData( strUserID, strMessage )
{
	return SGJ_encryptDataWithAlgo(strUserID, strMessage, 'SEED/CBC/PKCS5');
}

/**
* 세션키로 암호화된 String 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strMessage 원본 메세지(암호화 대상)
* @param {String}algorithm 대칭키 알고리즘
* @return {String}대칭키로 암호화된 String
*/
function SGJ_encryptDataWithAlgo( strUserID, strMessage, algorithm )
{
	var SG = document.getElementById(object_id);
	if ( strMessage == null || strMessage == "" )
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage("");
		setErrorFunctionName( "encryptData()" );
		return "";
	}

	var encStr = SG.encryptData( strUserID, strMessage, algorithm );

	if ( isNull(encStr))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "encryptData()" );
		return "";
	}

	return encStr;
}

/**
* 세션키로 복호화된 String 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strEncryptedMessage 암호화된 String
* @return {String}세션키로 복호화된 String
*/
function SGJ_decryptData( strUserID, strEncryptedMessage )
{
	return SGJ_decryptDataWithAlgo( strUserID, strEncryptedMessage, 'SEED/CBC/PKCS5' )
}

/**
* 세션키로 복호화된 String 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strEncryptedMessage 암호화된 String
* @return {String}세션키로 복호화된 String
*/
function SGJ_decryptDataWithAlgo( strUserID, strEncryptedMessage, algorithm )
{
	var SG = document.getElementById(object_id);
	if ( isNull(strEncryptedMessage))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage("");
		setErrorFunctionName( "decryptData()" );
		return "";
	}

	var decStr = SG.decryptData(strUserID, strEncryptedMessage, algorithm);
	if ( isNull(decStr))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "decryptData()" );
		return "";
	}

	return decStr;
}

/**
* 세션키로 암호화된 파일 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strInputFilePath 암호화할 파일명
* @param {String}strOutputFilePath 암호화된 파일명
* @return {boolean}true 또는 false
*/
function SGJ_encryptFile(strUserID,  strInputFilePath, strOutputFilePath )
{
	return SGJ_encryptFileWithAlgo(strUserID,  strInputFilePath, strOutputFilePath, 'SEED/CBC/PKCS5');
}


/**
* 세션키로 암호화된 파일 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strInputFilePath 암호화할 파일명
* @param {String}strOutputFilePath 암호화된 파일명
* @param {String}algorithm 대칭키 알고리즘
* @return {boolean}true 또는 false
*/
function SGJ_encryptFileWithAlgo(strUserID,  strInputFilePath, strOutputFilePath, algorithm )
{
	var SG = document.getElementById(object_id);
	if ( isNull(strInputFilePath) || isNull(strOutputFilePath))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage("");
		setErrorFunctionName( "encryptFile()" );
		return false;
	}

	var bReturn = SG.encryptFile( strUserID, strInputFilePath, strOutputFilePath, algorithm );
	if ( !bReturn )
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "encryptFile()" );
		return false;
	}
	return bReturn;
}



/**
* 세션키로 복호화된 파일 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strInputFilePath 복호화할 파일명
* @param {String}strOutputFilePath 복호화된 파일명
* @return true 또는 false
*/
function SGJ_decryptFile(strUserID,  strInputFilePath, strOutputFilePath )
{
	return SGJ_decryptFileWithAlgo(strUserID,  strInputFilePath, strOutputFilePath, 'SEED/CBC/PKCS5' );
}

/**
* 세션키로 복호화된 파일 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}strInputFilePath 복호화할 파일명
* @param {String}strOutputFilePath 복호화된 파일명
* @param {String}algorithm 대칭키 알고리즘
* @return true 또는 false
*/
function SGJ_decryptFileWithAlgo(strUserID,  strInputFilePath, strOutputFilePath, algorithm )
{
	var SG = document.getElementById(object_id);

	if ( isNull(strInputFilePath) || isNull(strOutputFilePath))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage("");
		setErrorFunctionName( "decryptFile()" );
		return false;
	}

	var bReturn = SG.decryptFile(  strUserID, strInputFilePath, strOutputFilePath, algorithm  );
	if ( !bReturn )
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "decryptFile()" );
		return false;
	}
	return bReturn;
}

/**
* 주어진 인증서로 암호화된 데이터 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}kmCertString PEM 타입의 인증서
* @param {String}data 암호화할 String
* @return {String}RSA 암호화된 String(BASE64)
*/
function SGJ_encryptRSA( strUserID, kmCertString, data )
{
	var SG = document.getElementById(object_id);

	if ( isNull(kmCertString) || isNull(data))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage("");
		setErrorFunctionName( "encryptRSA()" );
		return "";
	}

	var encStr = SG.encryptRSA( strUserID, kmCertString, data );

	if ( isNull(encStr))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "encryptRSA()" );
		return "";
	}

	return encStr;
}


/**
* RSA 복호화된 데이터 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @param {String}encString 암호화된 String
* @return {String}RSA 복호화된 String
*/
function SGJ_decryptRSA( strUserID, encString )
{
	var SG = document.getElementById(object_id);
	if ( isNull(encString))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage("");
		setErrorFunctionName( "decryptRSA()" );
		return "";
	}

	var decStr = SG.decryptRSA(strUserID, encString);
	if ( isNull(decStr))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "decryptRSA()" );
		return "";
	}

	return decStr;
}