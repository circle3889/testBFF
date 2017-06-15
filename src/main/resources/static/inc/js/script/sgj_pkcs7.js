/**
 * @fileoverview PKCS7 생성 및 검증 스트립트
 *
 * @author hychul
 * @version 0.1
 */
/** 
* PKCS#7 Signed 메세지에 서명을 추가하는 메소드
* @param{String} strUserID 사용자 ID
* @param{String} data 원본 pkcs7 데이터
* @return{String} 서명이 추가된 PKCS#7 Signed 메세지
*/
function SGJ_addSignPKCS7File(strUserID, data)
{
	return SGJ_addSignPKCS7FileWithAlgo(strUserID, data , 'SHA1');
}

/**
* PKCS#7 Signed 메세지에 서명을 추가하는 메소드
* @param{String} strUserID 사용자 ID
* @param{String} data 원본 pkcs7 데이터
* @param{String} 해쉬 알고리즘
* @return{String} 서명이 추가된 PKCS#7 Signed 메세지
*/
function SGJ_addSignPKCS7FileWithAlgo(strUserID, data, algorithm)
{
	return SG.SGJ_genPKCS7SignedDataWithAlgo(strUserID, data, algorithm);
}

/**
* 파일기반으로 PKCS#7 Signed 메세지에 서명을 추가하는 메소드
* @param{String} strUserID 사용자 ID
* @param{String} data 원본 pkcs7 데이터
* @return{String} 서명이 추가된 PKCS#7 Signed 메세지
*/

function SGJ_addSignPKCS7Data(strUserID, data)
{
	return SGJ_genPKCS7SignedDataWithAlgo(strUserID, data , 'SHA1');
}


/**
* 파일 기반으로 PKCS#7 Signed 메세지에 서명을 추가하는 메소드
* @param{String} strUserID 사용자 ID
* @param{String} data 원본 pkcs7 데이터
* @param{String} 해쉬 알고리즘
* @return{String} 서명이 추가된 PKCS#7 Signed 메세지
*/
function SGJ_addSignPKCS7DataWithAlgo(strUserID, data, algorithm)
{
	return SG.SGJ_addSignPKCS7DataWithAlgo(strUserID, data , algorithm);
}

/**
* PKCS#7 Signed 메세지 생성 메소드
* @param{String} strUserID 사용자 ID
* @param{String} strMessage 원본 메세지
* @return{String} PKCS#7 Signed 메세지
*/
function SGJ_genPKCS7SignedData(strUserID, data)
{
	return SGJ_genPKCS7SignedDataWithAlgo(strUserID, data , 'SHA1');
}

/**
* PKCS#7 Signed 메세지 생성 메소드
* @param{String} strUserID 사용자 ID
* @param{String} strMessage 원본 메세지
* @return{String} PKCS#7 Signed 메세지
*/
function SGJ_genPKCS7SignedDataWithAlgo(strUserID, data, algorithm )
{
	var SG = document.getElementById(object_id);

	if ( isNull(data))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "genPKCS7SignedData()" );
		return "";
	}

	var strPKCS7Message = SG.genPKCS7SignedData( strUserID, data, algorithm );

	if( isNull(strPKCS7Message))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "genPKCS7SignedData()" );
		return "";
	}
	return strPKCS7Message;
}

/**
* 파일 기반의 PKCS#7 Signed 메세지 생성 메소드
* @param{String} strUserID 사용자 ID
* @param{String} strInputFilePath 원본 파일 경로
* @param{String} strOutputFilePath PKCS#7 Signed 메세지 파일 경로
* @return{String} PKCS#7 Signed 메세지
*/
function SGJ_genPKCS7SignedFile( strUserID, strInputFilePath, strOutputFilePath, fileType)
{
	return SGJ_genPKCS7SignedFileWithAlgo( strUserID, strInputFilePath, strOutputFilePath, 'SHA1', fileType);
}


/**
* 파일 기반의 PKCS#7 Signed 메세지 생성 메소드
* @param{String} strUserID 사용자 ID
* @param{String} strInputFilePath 원본 파일 경로
* @param{String} strOutputFilePath PKCS#7 Signed 메세지 파일 경로
* @return{String} PKCS#7 Signed 메세지
*/
function SGJ_genPKCS7SignedFileWithAlgo( strUserID, strInputFilePath, strOutputFilePath, algorithm, fileType)
{
	var SG = document.getElementById(object_id);

	if ( isNull(strInputFilePath) || isNull(strOutputFilePath))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "genPKCS7SignedFileWithAlgo()" );
		return false ;
	}

	bReturn = SG.genPKCS7SignedFile( strUserID, strInputFilePath, strOutputFilePath, algorithm, fileType);
	if( !bReturn )
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "genPKCS7SignedFile()" );
		return false;
	}
	return bReturn;
}

/**
* PKCS#7 Signed 메세지에 서명자 추가 메소드
* @param{String} strUserID 사용자 ID
* @param{String} strP7Msg  PKCS#7 Signed 메세지
* @return{String} 서명자가 추가된 PKCS#7 Signed 메세지
*/
function SGJ_addSignPKCS7Data( strUserID, strP7Msg )
{
	var SG = document.getElementById(object_id);

	if( isNull(strP7Msg) )
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "addSignPKCS7Data()" );
		return "";
	}

	var strPKCS7Message = SG.addSignPKCS7Data( strUserID, strP7Msg );
	if( isNull(strPKCS7Message))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "addSignPKCS7Data()" );
		return "";
	}

	return strPKCS7Message;
}
/**
* 파일기반의 PKCS#7 Signed 메세지에 서명자 추가 메소드
* @param{String} strUserID 사용자 ID
* @param{String} strP7FilePath  PKCS#7 Signed 메세지 파일 경로
* @param{String} strOutputFilePath  생성될 PKCS#7 Signed 메세지 경로
* @return 성공 여부(true|false)
*/
function SGJ_addSignPKCS7File( strUserID, strP7FilePath, strOutputFilePath)
{
	var SG = document.getElementById(object_id);

	if ( isNull(strP7FilePath) || isNull(strOutputFilePath))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "addSignPKCS7File()" );
		return false;
	}

	bReturn = SG.addSignPKCS7File( strUserID, strP7FilePath, strOutputFilePath );
	if( !bReturn )
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "addSignPKCS7File()" );
		return false;
	}

	return bReturn;
}

function SGJ_genPKCS7EnvelopedData( strUserID, kmCert, data )
{
	return SGJ_genPKCS7EnvelopedDataWithAlgo( strUserID, kmCert, data, 'SEED/CBC/PKCS5' );
}

/**
* PKCS#7 Enveloped 메세지 생성 메소드
* @param{String} strMessage 원본 메세지
* @param{String} strMyCert 자신의 인증서
* @param{String} strRecipientCert 상대방의 인증서
* @return PKCS#7 Signed 메세지
*/
function SGJ_genPKCS7EnvelopedDataWithAlgo( strUserID, kmCert, data, algorithm )
{
	var SG = document.getElementById(object_id);

	if ( isNull(data))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "genPKCS7EnvelopedDataWithAlgo()" );
		return "" ;
	}

	if ( isNull(kmCert))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "genPKCS7EnvelopedDataWithAlgo()" );
		return "" ;
	}

	var strPKCS7Message = SG.genPKCS7EnvelopedData( strUserID, kmCert, data, algorithm );
	if( isNull(strPKCS7Message))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "genPKCS7EnvelopedData()" );
		return "" ;
	}

	return strPKCS7Message ;
}

function SGJ_genPKCS7EnvelopedFile( strUserID, kmCert, strInputFilePath, strOutputFilePath, fileType )
{
	return SGJ_genPKCS7EnvelopedFileWithAlgo( strUserID, kmCert, strInputFilePath, strOutputFilePath, 'SEED/CBC/PKCS5', fileType );
}


/**
* 파일 기반의 PKCS#7 Enveloped 메세지 생성 메소드
* @param{String} strInputFilePath 원본 메세지 파일 경로
* @param{String} strMyCert 자신의 인증서
* @param{String} strRecipientCert 상대방의 인증서
* @param{String}strOutputFilePath 생성될 PKCS#7 Enveloped 메세지
* @return 성공 여부(true|false)
*/
function SGJ_genPKCS7EnvelopedFileWithAlgo( strUserID, kmCert, strInputFilePath, strOutputFilePath, algorithm, fileType )
{
	var SG = document.getElementById(object_id);

	if ( isNull(strInputFilePath) || isNull(strOutputFilePath))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "genPKCS7EnvelopedFile()" );
		return false;
	}

	if ( isNull(kmCert))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "genPKCS7EnvelopedFile()" );
		return false;
	}

	var bReturn = SG.genPKCS7EnvelopedFile( strUserID, kmCert, strInputFilePath, strOutputFilePath, algorithm, fileType );
	if( !bReturn )
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "genPKCS7EnvelopedFile()" );
		return false;
	}

	return bReturn;
}

function SGJ_genPKCS7SignEnvData( strUserID, kmCert, data)
{
	return SGJ_genPKCS7SignEnvDataWithAlgo( strUserID, kmCert, data, 'SEED/CBC/PKCS5', 'SHA1' );
}

/**
* PKCS#7 SignedAndEnveloped 메세지 생성 메소드
* @param{String} strUserID 사용자 ID
* @param{String} strMessage 원본 메세지
* @param{String} strMyCert 자신의 인증서
* @param{String} strRecipientCert 상대방의 인증서
* @return{String} PKCS#7 SignedAndEnveloped 메세지
*/
function SGJ_genPKCS7SignEnvDataWithAlgo( strUserID, kmCert, data, encAlgorithm, signAlgorithm )
{
	var SG = document.getElementById(object_id);

	if ( isNull(data))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "genPKCS7SignEnvData()" );
		return "" ;
	}

	if ( isNull(kmCert))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "genPKCS7SignEnvData()" );
		return "" ;
	}

	var strPKCS7Message = SG.genPKCS7SignEnvData( strUserID, kmCert, data, encAlgorithm, signAlgorithm );
	if( isNull(strPKCS7Message))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "genPKCS7SignEnvData()" );
		return "" ;
	}

	return strPKCS7Message;
}


function SGJ_genPKCS7SignEnvFile( strUserID, kmCert, strInputFilePath, strOutputFilePath, fileType )
{
	return SGJ_genPKCS7SignEnvFileWithAlgo( strUserID, kmCert, strInputFilePath, strOutputFilePath, 'SEED/CBC/PKCS5', 'SHA1', fileType );
}

/**
* 파일 기반의 PKCS#7 SignedAndEnveloped 메세지 생성 메소드
* @param{String} strUserID 사용자 ID
* @param{String} strInputFilePath 원본 파일 경로
* @param{String} strMessage 원본 메세지
* @param{String} strMyCert 자신의 인증서
* @param{String} strRecipientCert 상대방의 인증서
* @param{String} strOutputFilePath 생성될 PKCS#7 SignedAndEnveloped 메세지 파일 경로
* @return 성공 여부(true|false)
*/
function SGJ_genPKCS7SignEnvFileWithAlgo( strUserID, kmCert, strInputFilePath, strOutputFilePath, encAlgorithm, signAlgorithm, fileType )
{
	var SG = document.getElementById(object_id);

	if ( isNull(strInputFilePath) || isNull(strOutputFilePath))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "genPKCS7SignEnvFile()" );
		return false;
	}

	if ( isNull(kmCert) )
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "genPKCS7SignEnvFile()" );
		return false;
	}

	bReturn =  SG.genPKCS7SignEnvFile( strUserID, kmCert, strInputFilePath, strOutputFilePath, encAlgorithm, signAlgorithm, fileType );
	if( !bReturn )
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "genPKCS7SignEnvFile()" );
		return false;
	}

	return bReturn;
}

/**
* PKCS#7 메세지 검증 메소드
* @param{String} strUserID 사용자 ID
* @param{String} p7File PKCS#7 메시지
* @param{String} orgFIle 원본 메시지
* @return 성공 여부(true|false)
*/
function SGJ_verifyPKCS7Data( strUserID, strP7Msg )
{
	var SG = document.getElementById(object_id);

	if( isNull(strP7Msg) )
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "verifyPKCS7Data()" );
		return "";
	}

	var strOriginalMessage = SG.verifyPKCS7Data( strUserID, strP7Msg );
	if( isNull(strOriginalMessage))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "verifyPKCS7Data()" );
		nSignerCount = 0;
		return "";
	}
	return strOriginalMessage;
}

/**
* PKCS#7 메세지 검증 메소드
* @param{String} strP7Msg PKCS#7 메시지
* @return 성공 여부(true|false)
*/
function SGJ_verifyPKCS7SignedData( strP7Msg )
{
	var SG = document.getElementById(object_id);

	if( isNull(strP7Msg) )
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "verifyPKCS7SignedData()" );
		return "";
	}

	var strOriginalMessage = SG.verifyPKCS7SignedData( strP7Msg );
	if( isNull(strOriginalMessage))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "verifyPKCS7SignedData()" );
		nSignerCount = 0;
		return "";
	}
	return strOriginalMessage;
}

/**
* PKCS#7 Enveloped 메세지 검증 메소드
* @param{String} strUserID 세션식별이 가능한 ID
* @param{String} strP7Msg PKCS#7 Enveloped 메시지
* @return 성공 여부(true|false)
*/
function SGJ_verifyPKCS7EnvelopedData( strUserID, strP7Msg )
{
	var SG = document.getElementById(object_id);

	if( isNull(strUserID) || isNull(strP7Msg) )
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "verifyPKCS7EnvelopedData()" );
		return "";
	}

	var strOriginalMessage = SG.verifyPKCS7EnvelopedData( strP7Msg );
	if( isNull(strOriginalMessage))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "verifyPKCS7EnvelopedData()" );
		nSignerCount = 0;
		return "";
	}
	return strOriginalMessage;
}

/**
* PKCS#7 SignedAndEnveloped 메세지 검증 메소드
* @param{String} strUserID 세션식별이 가능한 ID
* @param{String} strP7Msg PKCS#7 SignedAndEnveloped 메시지
* @return 성공 여부(true|false)
*/
function SGJ_verifyPKCS7SignEnvData( strUserID, strP7Msg )
{
	var SG = document.getElementById(object_id);

	if( isNull(strUserID) || isNull(strP7Msg) )
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "verifyPKCS7SignEnvData()" );
		return "";
	}

	var strOriginalMessage = SG.verifyPKCS7SignEnvData( strP7Msg );
	if( isNull(strOriginalMessage))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "verifyPKCS7SignEnvData()" );
		nSignerCount = 0;
		return "";
	}
	return strOriginalMessage;
}

/**
* PKCS#7 파일 검증 메소드
* @param{String} strUserID 사용자 ID
* @param{String} p7File PKCS#7 파일
* @param{String} orgFIle 원본 파일
* @return 성공 여부(true|false)
*/
function SGJ_verifyPKCS7File(strUserID, p7File, orgFile)
{
	var SG = document.getElementById(object_id);

	if( isNull(p7File) )
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "verifyPKCS7File()" );
		return "";
	}

	var check = SG.verifyPKCS7File( strUserID, p7File, orgFile );
	if(!check)
	{
		setErrorCode( "" );
		setErrorMessage(GetLastErrMsg());
		setErrorFunctionName( "verifyPKCS7File()" );
	}

	return check;
}

/**
* PKCS#7 Signed 파일 검증 메소드
* @param{String} p7File PKCS #7 Signed 파일
* @param{String} orgFile 생성될 원본 파일
* @return 성공 여부(true|false)
*/
function SGJ_verifyPKCS7SignedFile( p7File, orgFile )
{
	var SG = document.getElementById(object_id);

	if( isNull(p7File) )
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "verifyPKCS7SignedFile()" );
		return "";
	}

	var check = SG.verifyPKCS7SignedFile( strUserID, p7File, orgFile );
	if(!check)
	{
		setErrorCode( "" );
		setErrorMessage(GetLastErrMsg());
		setErrorFunctionName( "verifyPKCS7SignedFile()" );
	}
	return check;
}


/**
* PKCS#7 Enveloped 파일 검증 메소드
* @param{String} strUserID 사용자 ID
* @param{String} p7File PKCS#7 Enveloped 파일
* @param{String} orgFile 원본 파일
* @return 성공 여부(true|false)
*/
function SGJ_verifyPKCS7EnvelopedFile( strUserID, p7File, orgFile )
{
	var SG = document.getElementById(object_id);

	if( isNull(strUserID) || isNull(p7File) )
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "verifyPKCS7EnvelopedFile()" );
		return "";
	}

	var check = SG.verifyPKCS7EnvelopedFile( strUserID, p7File, orgFile );
	if(!check)
	{
		setErrorCode( "" );
		setErrorMessage(GetLastErrMsg());
		setErrorFunctionName( "verifyPKCS7EnvelopedFile()" );
	}
	return check;
}

/**
* PKCS#7 SignAndEnveloped 파일 검증 메소드
* @param{String} strUserID 사용자 ID
* @param{String} p7File PKCS#7 SignAndEnveloped 파일
* @param{String} orgFile 원본 파일
* @return 성공 여부(true|false)
*/
function SGJ_verifyPKCS7SignEnvFile(strUserID, p7File, orgFile)
{
	var SG = document.getElementById(object_id);

	if( isNull(strUserID) || isNull(p7File) )
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "verifyPKCS7SignEnvFile()" );
		return "";
	}

	var check = SG.verifyPKCS7SignEnvFile( strUserID, p7File, orgFile );
	if(!check)
	{
		setErrorCode( "" );
		setErrorMessage(GetLastErrMsg());
		setErrorFunctionName( "verifyPKCS7SignEnvFile()" );
	}
	return check;
}

/**
* PKCS #7 메세지의 타입을 반환
* @param{String} strP7Msg PKCS #7 메세지
* @return{String} 성공 : (PKCS7SignedMessage|PKCS7EnvelopedMessage|PKCS7SignedAndEnvelopedMessage)
*		  실패 : ""
*/
function SGJ_getPKCS7Type( strP7Msg )
{
	var SG = document.getElementById(object_id);

	if( isNull(strP7Msg) )
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "getPKCS7Type()" );
		return "" ;
	}

	var strType = SG.getPKCS7Type( strP7Msg );
	if(isNull(strType))
	{
			setErrorCode( "" );
			setErrorMessage( GetLastErrMsg() );
			setErrorFunctionName( "getPKCS7TypeFile()" );
			return "" ;
	}

	return strType;
}

/**
* PKCS #7 메세지의 타입을 반환
* @param{String} strP7FilePath PKCS#7 파일
* @return{String} 성공 : (PKCS7SignedMessage|PKCS7EnvelopedMessage|PKCS7SignedAndEnvelopedMessage)
*		  실패 : ""
*/
function SGJ_getPKCS7TypeFile( strP7FilePath)
{
	var SG = document.getElementById(object_id);

	if( isNull(strP7FilePath))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "getPKCS7TypeFile()" );
		return "" ;
	}

	var strType = SG.getPKCS7TypeFile( strP7FilePath );

	if(isNull(strType))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "getPKCS7TypeFile()" );
		return "" ;
	}

	return strType;
}


/**
* PKCS #7 Signed 메시지에서 주어진 색인번호의 인증서를 반환
* @param{String} p7Data PKCS #7 메세지
* @param{Integer} index PKCS #7 메세지
* @return{String} 인증서 스트링
*/
function SGJ_getSignerCert(p7Data, index)
{
	var SG = document.getElementById(object_id);

	if( isNull(p7Data) || isNull(index))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "getSignerCert()" );
		return "" ;
	}

	var strCert = SG.getSignerCert(p7Data, index);

	if(isNull(strCert))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "getSignerCert()" );
		return "" ;
	}
	return strCert;
}

/**
* PKCS #7 Signed 메시지에서 주어진 DN을 가진 인증서를 반환
* @param{String} p7Data PKCS #7 메세지
* @param{String} subjectDN 인증서DN
* @return{String} 인증서 스트링
*/
function SGJ_getSignerCertwithDN(p7Data, subjectDN)
{
	var SG = document.getElementById(object_id);

	if( isNull(p7Data) || isNull(subjectDN))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "getSignerCert()" );
		return "" ;
	}

	var strCert = SG.getSignerCert(p7Data, subjectDN);

	if(isNull(strCert))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "getSignerCert()" );
		return "" ;
	}
	return strCert;
}

/**
* PKCS #7 Signed 메시지에서 서명자의 수 반환
* @param{String} p7Data PKCS #7 메세지
* @return{Integer} 인증서 스트링
*/
function SGJ_getSignerCount(p7Data)
{
	var SG = document.getElementById(object_id);

	if( isNull(p7Data))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "getSignerCount()" );
		return 0;
	}

	var count = SG.getSignerCount(p7Data);

	if(isNull(count))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "getSignerCount()" );
		return 0;
	}
	return count;
}

/**
* PKCS #7 Signed 파일에서 주어진 색인번호의 인증서를 반환
* @param{String} p7File PKCS #7 파일
* @param{Integer} index PKCS #7 메세지
* @return{String} 인증서 스트링
*/
function SGJ_getSignerCertFile(p7File, index)
{
	var SG = document.getElementById(object_id);

	if( isNull(p7File) || isNull(index))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "getSignerCertFile()" );
		return "" ;
	}

	var strCert = SG.getSignerCertFile(p7File, index);

	if(isNull(strCert))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "getSignerCertFile()" );
		return "" ;
	}
	return strCert;
}

/**
* PKCS #7 Signed 파일에서 주어진 DN을 가진 인증서를 반환
* @param{String} p7File PKCS #7 파일
* @param{String} subjectDN 인증서DN
* @return{String} 인증서 스트링
*/
function SGJ_getSignerCertFileWithDN(p7File, subjectDN)
{
	var SG = document.getElementById(object_id);

	if( isNull(p7File) || isNull(index))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "getSignerCertFile()" );
		return "" ;
	}

	var strCert = SG.getSignerCertFile(p7File, subjectDN)

	if(isNull(strCert))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "getSignerCertFile()" );
		return "" ;
	}
	return strCert;
}

/**
* PKCS #7 Signed 파일에서 서명자의 수 반환
* @param{String} p7File PKCS #7 파일
* @return{Integer} 인증서 스트링
*/
function SGJ_getSignerCountFile(p7File)
{
	var SG = document.getElementById(object_id);

	if( isNull(p7Data) || isNull(index))
	{
		setErrorCode("NO_DATA_VALUE");
		setErrorMessage( "" );
		setErrorFunctionName( "getSignerCountFile()" );
		return 0;
	}

	var count = SG.getSignerCountFile(p7File);

	if(isNull(strCert))
	{
		setErrorCode( "" );
		setErrorMessage( GetLastErrMsg() );
		setErrorFunctionName( "getSignerCountFile()" );
		return 0;
	}
	return count;
}
