/**
 * @loadJson (JSON 공통 스크립트)
 * @version 1.0, 2008-06-03
 * @author Yoon Tae Hyun ( thrukill@hotmail.com )
*/
function loadJson() {
	var xmlHttp;
	var retStr;
	this.Result = getResult;
	this.mget = doRequestUsingGET;
	this.mpost = doRequestUsingPOST;

	function createXMLHttpRequest() {
		if (window.ActiveXObject) {
			xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
		} else if (window.XMLHttpRequest) {
			xmlHttp = new XMLHttpRequest();
		}
	}
	function handleStateChange() {
	    if(xmlHttp.readyState == 4) {
	        if(xmlHttp.status == 200) {
	        	try {
	        		retStr = xmlHttp.responseText;
	            } catch(e) {}
	        } else if (xmlHttp.status == 404) {
	        	alert('잘 못된 페이지를 호출하였습니다.');
	        }
	    }
	}
	function hangleCheck(value) {
		return escape(value).replace(/\+/g, '%2B');
	}
	function doRequestUsingGET(vStr) {
	    createXMLHttpRequest();
	    xmlHttp.onreadystatechange = handleStateChange;
	    xmlHttp.open('GET', vStr, false);
	    xmlHttp.send(null);
	}
	function doRequestUsingPOST(vUrl, vStr) {
	    createXMLHttpRequest();
	    xmlHttp.open('POST', vUrl, false);
	    xmlHttp.onreadystatechange = handleStateChange;
	    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    xmlHttp.send(vStr);
	}
	function getResult() {
		return retStr;
	}
}

/**
 * Ajax Call을 통한 Action 처리
 * 사용법 :
 * 		new Action(서비스ID, 뷰ID, 함수명).copyParams(폼이름).run(결과function에 넘겨줄 파라미터들<선택 입력>);
 *      또는
 *      var action = new Action(서비스ID, 뷰ID, 함수명);
 *      action.copyParams(폼이름1);
 *      action.copyParams(폼이름2);
 *      action.addParam(키, 값);
 *      action.run(결과function에 넘겨줄 파라미터들<선택 입력>);
 *  ※ 결과함수의 파라미터
 *     첫번째 parameter는 responseText를 JSon객체화시킨 Object가 오며,
 *     두번째 이후는 run호출시 던진 파라미터가 순서대로 오게 된다.
 *
 * @param aServiceId 서비스ID(필수 입력)
 * @param aViewId    뷰ID(필수 입력)
 * @param aFuncName  Ajax실행후 호출되는 함수명(필수 입력)
 * @param aEncrypt   INIPlugin 암호화 여부(true/false, Default true, 선택 입력)
 */
function Action(aServiceId, aViewId, aFuncName, aEncrypt) {
	var actionUrl = "/wire.do";
	var serviceId = aServiceId == null ? "" : aServiceId;
	var viewId    = aViewId    == null ? "" : aViewId;
	var funcName  = aFuncName  == null ? "" : aFuncName;
	var bEncrypt  = aEncrypt   == null ? true : aEncrypt;
	var resultArgs = new Array();
	var paramForm  = null;
	var encForm    = null;
	var xmlRequest = false;
	var resultType = "0"; // 0:JSon객체, 1:responseText
	
	this.getRequest = function() {
		try {
			xmlRequest = new XMLHttpRequest();
		} catch (microsoft) {
			try {
				xmlRequest = new ActiveXObject('Msxml2.XMLHTTP');
			} catch (othermicrosoft) {
				try {
					xmlRequest = new ActiveXObject('Microsoft.XMLHTTP');
				} catch (failed) {
					return false;
				}
			}
		}

		return xmlRequest;
	};
	
	this.createParamForm = function() {
		// IE9 대비 문구 수정(IE9에서는 document.createElement시 속성까지 문장으로 처리하는 것이 않됨)
		try {
			paramForm = document.createElement("<form name=__PARAMFORM__></form>");
		} catch (e) {
			paramForm = document.createElement("form");
			paramForm.setAttribute("name", "__PARAMFORM__");
		}
		document.body.appendChild(paramForm);
	};
	
	this.createEncForm = function() {
		// IE9 대비 문구 수정(IE9에서는 document.createElement시 속성까지 문장으로 처리하는 것이 않됨)
		try {
			encForm   = document.createElement("<form name=__ENCFORM__></form>");
		} catch (e) {
			encForm = document.createElement("form");
			encForm.setAttribute("name", "__ENCFORM__");
		}
		// IE9 대비 문구 수정(IE9에서는 document.createElement시 속성까지 문장으로 처리하는 것이 않됨)
		var INIpluginData = null;
		try {
			INIpluginData = document.createElement("<input type=hidden name=INIpluginData>");
		} catch (e) {
			INIpluginData = document.createElement("input");
			INIpluginData.setAttribute("type", "hidden");
			INIpluginData.setAttribute("name", "INIpluginData");
		}
		encForm.appendChild(INIpluginData);
		document.body.appendChild(encForm);
	};
	
	this.addParam = function(key, value) {
		if (!paramForm) this.createParamForm();
		// IE9 대비 문구 수정(IE9에서는 document.createElement시 속성까지 문장으로 처리하는 것이 않됨)
		var hiddenInput = null;
		try {
			hiddenInput = document.createElement("<input type=hidden name='" + key + "' value='" + value + "'>");
		} catch (e) {
			hiddenInput = document.createElement("input");
			hiddenInput.setAttribute("type", "hidden");
			hiddenInput.setAttribute("name", key);
			hiddenInput.setAttribute("value", value);
		}
		paramForm.appendChild(hiddenInput);
	};
	
	this.setActionUrl = function(aActionUrl) {
		actionUrl = aActionUrl;
	};
	
	this.setFuncName = function(aFuncName) {
		funcName = aFuncName;
	};
	
	this.setResultType = function(aType) {
		resultType = aType;
	};
	
	this.destroyForm = function() {
		if (paramForm != null) document.body.removeChild(paramForm);
		if (encForm != null) document.body.removeChild(encForm);
	};
	
	this.copyParams = function(oForm) {
		if (oForm.tagName.toUpperCase() == "FORM") {
			var objInputs = oForm.getElementsByTagName("input");
			
			for(var i = 0; i < objInputs.length; i++) {
				var obj = objInputs[i];
				switch (obj.type.toUpperCase()) {
				    case "HIDDEN" :
				    case "TEXT" :
				    	this.addParam(obj.name, obj.value);
				    	break;
				    case "RADIO" :
                        if (obj.checked == true) {
                            this.addParam(obj.name, obj.value);
                        }
				    	break;
				    default :
				    	break;
				}
			}
			
			var objSelects = oForm.getElementsByTagName("select");
			
			for(var i = 0; i < objSelects.length; i++) {
				var obj = objSelects[i];
				if (obj.length > 0) {
					this.addParam(obj.name, obj.options[obj.options.selectedIndex].value);
				}
			}
			
			var objTextareas = oForm.getElementsByTagName("textarea");
			
			for(var i = 0; i < objTextareas.length; i++) {
				this.addParam(objTextareas[k].name, objTextareas[k].value);
			}
		} else {
			alert("FORM 객체명을 넣어주세요.");
		}
	};
	
	this.debug = function() {
		var parameters = "";
		var objInputs = paramForm.getElementsByTagName("INPUT");
		for (var i = 0; i < objInputs.length; i++) {
			parameters += "\n\t" + objInputs[i].name + "=" + objInputs[i].value;
		}
		alert("Ajax Call Debugging 정보\n"
		    + "=============================================\n"
		    + "1. serviceId : " + serviceId + "\n"
		    + "2. viewId : " + viewId + "\n"
		    + "3. parameters : " + parameters + "\n"
		    + "4. 함수명 : " + funcName);
	};
	
	this.run = function() {
		if (serviceId == "") {
			alert("serviceId가 없습니다.");
			return;
		}
		
		if (viewId == "") {
			alert("viewId가 없습니다.");
			return;
		}
		
		if (!this.getRequest()) {
			alert("XMLHttpRequest객체를 사용할 수 없습니다.");
			return;
		}
	    xmlRequest.open('POST', actionUrl, false);
	    xmlRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    xmlRequest.onreadystatechange = this.callFunc;
	    
	    if (arguments.length > 0) {
		    for(var i = 0; i < arguments.length; i++) {
		    	resultArgs[i+1] = arguments[i];
		    }
	    }
		
		var PARAMS = "serviceId=" + serviceId + "&viewId=" + viewId;
		
		if (bEncrypt) {
			if (encForm == null) this.createEncForm();
			
			if (EncForm2(paramForm, encForm)) {
				PARAMS += "&INIpluginData=" + escape(encForm.INIpluginData.value);
				
			    xmlRequest.send(PARAMS);
			} else {
				alert('보안상 문제가 생겨 전송이 취소 되었습니다.');
			}
		} else {
			var parameters = "";
			var objInputs = paramForm.getElementsByTagName("INPUT");
			for (var i = 0; i < objInputs.length; i++) {
				parameters += "&" + objInputs[i].name + "=" + escape(objInputs[i].value);
			}
			xmlRequest.send(PARAMS + parameters);
		}
		
		this.destroyForm();
	};
	
	this.callFunc = function() {
	    if (xmlRequest.readyState == 4) {
	        if (xmlRequest.status == 200) {
	        	try {
	        		var result = xmlRequest.responseText;//alert(result);
	        		
	        		var start = result.indexOf("{'");
	        		if ( start < 0 ) start = result.indexOf("{\"");
	        		var retStr = result.substring(start, result.lastIndexOf("}")+1);
	        		
	        		if (retStr) {
	        			retStr = eval("(" + retStr + ")");
	        			
	        			if (retStr.ERROR.ERR != "0") {
	        				alert(retStr.ERROR.ERRMSG + "(" + retStr.ERROR.ERR + ")");
	        				return;
	        			}
	        		}
        			
	        		if (resultType == "0") {
		        		result = retStr;
	        		}
					
	    			resultArgs[0] = result;
    				window[funcName].apply(this, resultArgs);
				} catch (error) {
					alert(error);
					alert("죄송합니다. 시스템 점검중입니다.\n잠시 후 다시 이용해 주시기 바랍니다.");
	            }
	        } else if (xmlRequest.status == 404) {
	        	alert('잘못된 페이지를 호출하였습니다.');
	        } else {
	        	alert(xmlRequest.statusText);
	        }
	    }
	};
}