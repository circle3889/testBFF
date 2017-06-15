/**
 *
 * T WORLD Form 관련 js util
 *
 * 작성자 : 성일경.
 *
 * 이 파일만 사용하시면 안되고 미리 정의된 include 페이지를 통해서 포함시키셔야 정상적으로 작동됩니다.
 *
 */



/**
 * 공백 제거
 */
String.prototype.trim = function()
{
    return this.replace( /(^\s*)|(\s*$)/g, "" );
}


function trim( val ) {
    var len = val.length;

    if ( len == 0 ) {
        return val;
    }

    var str = "", chr = "";
    for ( i = 0; i < len; i++ ) {
        chr = val.charAt( i );
        if ( chr != " " ) {
            str += chr;
        }
    }

    return str;
}


/**
 * 값이 비었는지 확인
 */
function isEmpty( val ) {
    return ( ! trim( val ) );
}


/**
 * 숫자형인지를 체크
 */
function isNumber( val ) {
    re = /^\d+$/;

    if ( re.test( val ) ) {
        return true;
    } else {
        return false;
    }
}


/**
 * 메시지 뿌리고, id에 포커스
 */
function msgFocus( msg, id ) {
    alert( msg );

    if ( $(id).type != "hidden" ) {
        $(id).focus();
    }
}


/**
 * form field 체크 후 메시지 & focus
 */
function required( id, msg ) {
    if ( ! msg ) {
        msg = "필수 입력사항이 누락되었습니다.";
    }

    if ( isEmpty( $F(id) ) ) {
        msgFocus( msg, id );
        $(id).value = "";

        return true;
    }

    return false;
}


/**
 * form field number 체크 & 메시지
 */
function requiredNumber( id, msg ) {
    if ( ! msg ) {
        msg = "숫자형만 입력이 가능합니다.";
    }

    if ( ! isNumber( $F(id) ) ) {
        msgFocus( msg, id );
        $(id).value = "";

        return true;
    }

    return false;
}


/**
 * radio button 체크 여부
 */
function isRadioChecked( formId, elementName ) {
    return isFormElementChecked( formId, 'radio', elementName );
}


/**
 * checkbox 체크 여부
 */
function isChecked( formId, elementName ) {
    return isFormElementChecked( formId, 'checkbox', elementName );
}


/**
 * from element 체크 여부
 */
function isFormElementChecked( formId, elementType, elementName ) {
    var radioList = $(formId).getInputs( elementType, elementName );

    for ( var i = 0; i < radioList.length; i++ ) {
        if ( radioList[i].checked ) {
            return true;
        }
    }

    return false;
}


/**
 * 선택된 radio button의 값
 */
function getRadioValue( formId, elementName ) {
    var radioList = $(formId).getInputs( 'radio', elementName );

    for ( var i = 0; i < radioList.length; i++ ) {
        if ( radioList[i].checked ) {
            return radioList[i].value;
        }
    }

    return "";
}


/**
 * 선텍된 checkbox의 값 list
 */
function getCheckedValueList( formId, elementName ) {
    var checkboxList = $(formId).getInputs( 'checkbox', elementName );
    var resultList = [], idx = 0;

    for ( var i = 0; i < checkboxList.length; i++ ) {
        if ( checkboxList[i].checked ) {
            resultList[idx++] = checkboxList[i].value;
        }
    }

    return resultList;
}
