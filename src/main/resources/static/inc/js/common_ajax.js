/**
 *
 * T WORLD Common AJAX
 *
 * 작성자 : 성일경.
 *
 * 이 파일만 사용하시면 안되고 미리 정의된 include 페이지를 통해서 포함시키셔야 정상적으로 작동됩니다.
 *
 * Usage : ajaxSend( url, parameters, callback_function );
 *             ajaxSend( url, parameters, callback_function, options );
 *
 *  options : { method : 'get', onLoading : onLoading, onError : onError }
 *
 */


var common = new Object();

common.ajax = function( url, parameters, callback, options ) {
    this.url = url;
    this.parameters = parameters;
    this.callback = callback;
    this.options = options;
}

common.ajax.prototype = {
    send : function() {
        var ajaxRequest = new Ajax.Request( this.url, this.createOptions() );
    },

    createOptions : function() {
        var ajaxOptions = {};

        ajaxOptions.parameters = this.parameters;
        ajaxOptions.onSuccess = this.onSuccess;
        ajaxOptions.onFailure = this.onError;

        if ( this.options ) {
            if ( this.options.method ) {
                ajaxOptions.method = this.options.method;
            }

            if ( this.options.onLoading ) {
                ajaxOptions.onUninitialized = this.options.onLoading;
                ajaxOptions.onLoading = this.options.onLoading;
                ajaxOptions.onLoaded = this.options.onLoading;
                ajaxOptions.onInteractive = this.options.onLoading;
            }

            if ( this.options.onError ) {
                ajaxOptions.onFailure = this.onError;
            }
			
			if ( ! this.options.asynchronous ) {
				ajaxOptions.asynchronous = this.options.asynchronous;
			}
        }

        return ajaxOptions;
    },

    onSuccess : function( request ) {
        var xml;

        try {
            xml = (new DOMParser()).parseFromString(request.responseText, "text/xml");
        }
        catch(e) {
            xml = request.responseXML;
        }

        __ajax.callback( xml );
    },

    onError : function() {
        alert( "처리중 오류가 발생하였습니다. 잠시 후 다시 이용해 주시기 바랍니다." );
    }
}



var __ajax;


/**
 * AJAX Send
 */
function ajaxSend( url, parameters, callback, options ) {
    __ajax = new common.ajax( url, parameters, callback, options );
    __ajax.send();
}


/**
 *
 * id값을 한 개 이상 넘기면 해당 object들의 '이름=값&' 형태로 queryString을 만들어 반환함.
 * 이 때 값은 urlEncoding 된 형태임.
 *
 */
function $qs() {
    var qryStr = "";

    for ( var i = 0; i < arguments.length; i++ ) {
        qryStr += $(arguments[i]).name + "=" + encodeURIComponent( $F( arguments[i] ) );

        if ( i < arguments.length - 1 ) {
            qryStr += "&";
        }
    }

    return qryStr;
}


/**
 * XML 결과로부터 특정 태그의 Node를 추출
 */
function $xn( xml, tagName ) {
    return $xl( xml, tagName ).item(0);
}


/*
 * XML 결과로부터 특정 태그의 Node List를 추출
 */
function $xl( xml, tagName ) {
    return xml.getElementsByTagName( tagName );
}


/**
 * XML Node로부터 특정 태그의 값을 추출.
 * 파라메터가 하나이면 그냥 값만 반환.
 * node는 Xml Document Element 또는 일반 Node 타입이 될 수 있다.
 */
function $xv( node, tagName ) {
    if ( arguments.length == 1 ) {
        return node.firstChild.nodeValue;
    }

    if ( node.nodeType == 9 ) {
        return $xn(node, tagName).firstChild.nodeValue
    }

    return node.getElementsByTagName( tagName ).item(0).firstChild.nodeValue;
}



/*
 *
 * Common Javascript Logger
 *
 * 작성자 : 성일경
 *
 */

function _log( msg ) {
    if ( ! $('loggingConsole') ) {
        _createDivConsole();
        Element.hide( 'loggingConsole' );
    }

    var textNode = document.createTextNode( msg );
    $('loggingConsole').appendChild( textNode );
}

function _createDivConsole() {
    var container = document.createElement( "div" );
    container.setAttribute( "id", "loggingConsole" );
    document.body.appendChild( container );
}
