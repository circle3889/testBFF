/** 
 * @fileoverview 인증서 선택창 관련 설정 스크립트
 *
 * @author hychul
 * @version 0.1
 */


/**
* 인증서 선택창 띄우는 메소드
* 세션에 이미 인증서 정보가 존재하면 true 반환
* 창을 띄우다 오류가 발생하면 false 반환
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @return true 또는 false
*/
function SGJ_selectCertificate( strUserId )
{
	var SG = document.getElementById(object_id);
	var bReturn = SG.selectCertificate(strUserId);
	if ( !bReturn )
	{
		setErrorCode( "GetLastErrMsg()" );
		setErrorMessage( "" );
		setErrorFunctionName( "selectCertificate()" );
		return false;
	}
	return bReturn;
}

/**
* 인증서 선택창 배너이미지 설정
* @param {String}imagePath 이미지 Url 경로
*/
function SGJ_setBannerImage( imagePath )
{
	var SG = document.getElementById(object_id);
	if ( isNull(imagePath) )
	{
		setErrorCode( "NO_USER_ID" );
		setErrorMessage( "" );
		setErrorFunctionName( "setBannerImage()" );
		return false;
	}
	SG.setBannerImage( imagePath );
	return true;
}

/**
* 인증서 선택창에 보여질 인증서 정책 설정
* @param {String}policyList 보여질 정책 리스트
*/
function SGJ_setCertPolicy( policyList )
{
	var SG = document.getElementById(object_id);
	SG.setCertPolicy( policyList );
	return true;
}


/**
* 인증서 레이아웃 설정
* @param {String}layout 레이아웃 형태("NORMAL" | "EXT");
*/
function SGJ_setLayout( layout )
{
	var SG = document.getElementById(object_id);
	if ( isNull(layout) )
	{
		setErrorCode( "no layout" );
		setErrorMessage( "" );
		setErrorFunctionName( "setLayout()" );
		return false;
	}
	SG.setLayout( layout );
	return true;
}

/**
* <pre>
* 활성화 미디어 설정
* mediaType 에 허용 가능한 값
* "" -> 모든 매체 비활성화
* location_hdd -> 하드디스크
* location_removable -> 이동식디스크
* location_token -> 저장토큰
* location_hsm -> 보안토큰
* location_bhsm -> 바이오 보안토큰
* 복수로 쓰려면 구분자 "|"를 사용
* ex) location_hdd|location_token
* </pre>
* @param {String}mediaType 활성화 시킬 미디어 타입
*/
function SGJ_setEnableMedia( mediaType )
{
	var SG = document.getElementById(object_id);
	/*
	if ( isNull(mediaType) )
	{
		setErrorCode( "no media" );
		setErrorMessage( "" );
		setErrorFunctionName( "SGJ_setEnableMedia()" );
		return false;
	}
	*/
	SG.setEnableMedia( mediaType );
	return true;
}

/**
* 서로 다른 세션 연계
* @param {String}strUserId 연계시킬 세션 ID<br>
*/
function SGJ_setPreSessionId( strUserId )
{
	var SG = document.getElementById(object_id);
	SG.setPreSessionId( strUserId );
	return true;
}


/**
* 인증서 선택창에서 갱신 경고창을 여부 세팅
* @param {boolean}setting 갱신 경고창 설정 여부<br>
*/
function SGJ_setUpdateWran ( setting )
{
	var SG = document.getElementById(object_id);
	SG.SGJ_setUpdateWran(setting);
	return;
}


/**
 * 인증서 선택창 설정정보 세팅
 */
function SGJ_getConfigMap()
{
	var SG = document.getElementById(object_id);
	var obj = SG.getConfigMap();
	return obj;
}

/**
* <pre>
* 사용자가 선택한 인증서가 담긴 미디어 타입 반환
* location_hdd -> 하드디스크
* location_removable -> 이동식디스크
* location_token -> 저장토큰
* location_hsm -> 보안토큰
* location_bhsm -> 바이오 보안토큰
* </pre>
* @param {String}strUserID 세션식별이 가능한 세션 ID
* @return {String}사용자가 선택한 인증서가 담긴 미디어 타입
*/

function SGJ_getSelectedMedia( strUserId )
{
	var SG = document.getElementById(object_id);
	if ( isNull(strUserId) )
	{
		setErrorCode( "no strUserId" );
		setErrorMessage( "" );
		setErrorFunctionName( "SGJ_getSelectedMedia()" );
		return "";
	}
	return SG.getSelectedMedia( strUserId );
}