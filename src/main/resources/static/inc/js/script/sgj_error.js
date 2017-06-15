var strErrMsg = "";
var strErrCode = "";
var strErrFuncName = "";

/** 
* 오류에 대한 코드를 지정한다.
*	오류 코드
*
*	NO_DATA_VALUE	: 함수의 인자 값이 null이거나 ""일 경우
*	NO_USER_ID	: 사용자를 구분하기 위한 ID 값이 null 이거나 ""일 경우
*	NO_SESSION_KEY	: 데이터를 복호화 하기위한 대칭키가 없는 경우
*	WRONG_PASSWORD	: 사용자가 인증서 암호를 지정한 회수 이상 틀리게 입력할 경우
*	NOT_INDEX_VALUE : 함수의 nIndex 인자 값이 0 이상의 수가 아닐 경우
*	NOT_PEM_CERT	: PEM 타입 인증서가 아닐 경우
*	NOT_LOCAL_FILE	: 현재 브라우저로 열려있는 페이지가 사용자 PC에 저장된
*			  로컬 파일이 아닌경우
* @param strCode 오류 코드
* @return 없음
*/
function setErrorCode( strCode )
{
	strErrCode = strCode;
	return;
}

/**
* 오류에 대한 메세지를 저장한다.
* @param strCode 오류메세지
* @return 없음
*/
function setErrorMessage( strMsg )
{
	strErrMsg = strMsg;
	return;
}
/**
* 오류가 발생한 함수 이름을 저장한다.
* @param strFunctionName 함수 이름
* @return 없음
*/
function setErrorFunctionName( strFunctionName )
{
	strErrFuncName = strFunctionName;
	return;
}

/**
* 마지막으로 발생한 오류에 대한 코드를 얻는다.
* @return 성공 - 오류코드, 실패 - ""
*/
function getErrorCode()
{
	var buf = strErrCode;
	strErrCode = "";
	return buf;
}

/**
* 마지막으로 발생한 오류에 대한 코드를 얻는다.
* @return 성공 - 오류코드, 실패 - ""
*/
function GetLastErrMsg()
{
	var buf = strErrCode;
	strErrCode = "";
	return buf;
}
/**
* 마지막으로 발생한 오류에 대한 메세지를 얻는다.
* @return 성공	- 오류 메시지
*		  실패	- ""
*/
function getErrorMsg()
{
	return SG.getErrorMsg();
}

/**
* 마지막으로 오류가 발생한 함수 이름을 넣는다.
* @return 성공	- 오류가 발생한 함수 이름
*		  실패	- ""
*/
function getErrorFunctionName()
{
	var buf = strErrFuncName;
	strErrFuncName = "";
	return buf;
}
/**
* 마지막으로 발생한 오류에 대한 코드나 메세지를 얻는다.
* @return 성공	- 오류 코드 또는 오류 메시지
*		  실패	- ""
*/
function getErrorString()
{
	var buf = getErrorCode();
	buf += getErrorMessage();
	return buf;	
}