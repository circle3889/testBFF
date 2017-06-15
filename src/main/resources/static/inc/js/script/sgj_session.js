/**
 * @fileoverview 세션 관리 스크립트
 *
 * @author hychul
 * @version 0.1
 */

/**
* 주어진 세션 ID 의 정보 삭제 
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @return {boolean}true 또는 false
*/
function SGJ_removeSession( strUserID )
{
	var SG = document.getElementById(object_id);
	if ( isNull(strUserID))
	{
		setErrorCode( "NO_USER_ID" );
		setErrorMessage( "" );
		setErrorFunctionName( "removeSession()" );
		return false;
	}
	SG.removeSession(strUserID);
	return true;
}

/**
* 모든 세션 정보 삭제
* @return {boolean}true 또는 false
*/
function SGJ_removeAllSession()
{
	var SG = document.getElementById(object_id);
	var bReturn = SG.removeAllSession();
	if ( !bReturn )
	{
		setErrorCode( GetLastErrMsg() );
		setErrorMessage( "" );
		setErrorFunctionName( "removeAllSession()" );
		return false;
	}
	return bReturn;
}

/**
* 마지막으로 발생한 오류 반환
* 에러가 없는 경우 null 반환
* @return {String}에러 메시지
*/
function SGJ_getErrorMsg() {
	var SG = document.getElementById(object_id);
	var errMsg = SG.getErrorMsg();
	return errMsg;
}

/**
* 에러 스택 반환
* 에러 스택이 없는 경우 null 반환
* @return {String}에러 스택
*/
function SGJ_getStackTrace() {
	var SG = document.getElementById(object_id);
	var stack = SG.getStackTrace();
	return stack;
}