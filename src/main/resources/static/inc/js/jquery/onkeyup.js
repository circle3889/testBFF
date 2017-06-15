if (typeof(beta) == "undefined")
    _beta = beta = {};

if (typeof(_beta.fix) == "undefined")
    _beta.fix = {};
else
    alert("keyfix is already set!");

if(typeof(window.beta.instances) == "undefined")
    window.beta.instances = new Array();

_beta.fix = function(targetId) {
	// this fix is only for mozilla browsers
	if(jQuery.browser.mozilla == false)
		return false;
	var thisClass = this;
	this.keyEventCheck = null;
	this.db = null;
	this.targetId = targetId;
	window.beta.instances[this.targetId] = this;
	var focusFunc = function() {
		if(!thisClass.keyEventCheck) thisClass.watchInput();
	};
	var blurFunc = function() {
		if(thisClass.keyEventCheck) {
			window.clearInterval(thisClass.keyEventCheck);
			thisClass.keyEventCheck = null;
		}
	};
	jQuery("#" + this.targetId).bind("focus", focusFunc);
	jQuery("#" + this.targetId).bind("blur", blurFunc);
	jQuery("#" + this.targetId).bind("keydown", function(event) { //검색어 자동완성 선택(키보드)
		var keyCode = (window.event) ? event.which : event.keyCode;
		if(keyCode =="38") { //위화살표
			blurFunc();
		} else if(keyCode =="40") { //아래화살표
			blurFunc();
		}
	});


};

_beta.fix.prototype.watchInput = function() {
	if(this.db != jQuery("#" + this.targetId).val()) {
		// trigger event
		jQuery("#" + this.targetId).trigger('keyup');
	}
	this.db = jQuery("#" + this.targetId).val();
	if(this.keyEventCheck) window.clearInterval(this.keyEventCheck);
	this.keyEventCheck = window.setInterval("window.beta.instances['" + this.targetId + "'].watchInput()", 100);
};
