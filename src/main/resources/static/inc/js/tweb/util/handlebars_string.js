/*************************************************************************************************
 *	@CreateDate	: 2016.02.26
 *	@ModifyDate	: 2016.02.26
 *	@FileName	: handlebars_string.js
 *	@Author		: witchgreen
 *************************************************************************************************/

//if ¿¬»êÀÚ
Handlebars.registerHelper('ifCond', function(v1, operator, v2, options){
	switch(operator){
		case '==' : 
			return (v1 == v2) ? options.fn(this) : options.inverse(this);
		case '===' : 
			return (v1 === v2) ? options.fn(this) : options.inverse(this);
		case '<' : 
			return (v1 < v2) ? options.fn(this) : options.inverse(this);
		case '<=' : 
			return (v1 <= v2) ? options.fn(this) : options.inverse(this);
		case '>' : 
			return (v1 > v2) ? options.fn(this) : options.inverse(this);
		case '>=' : 
			return (v1 >= v2) ? options.fn(this) : options.inverse(this);
		case '&&' : 
			return (v1 && v2) ? options.fn(this) : options.inverse(this);
		case '||' : 
			return (v1 || v2) ? options.fn(this) : options.inverse(this);
		default : 
			return options.inverse(this);
	}
});

//index of 
Handlebars.registerHelper('_contains', function(str, key){
	
	if (str.indexOf(key)>-1){
		return true;
	}else {
		return false;
	}

});

Handlebars.registerHelper('_equals', function() {
	if (arguments.length ==3){
		if (arguments[0]==arguments[1]){
		   	return true;
		} else {
			return false;
		}
	}else{
		if (arguments[0]==arguments[1]){
		   	return arguments[2];
		} else {
			return arguments[3];
		}
	}
});
			
//
Handlebars.registerHelper('_defaultString', function(a) {
	if (a==null ||a===undefined) {
		return "";
	} else {
		return a;
	}
});
			
//
Handlebars.registerHelper('_defaultString', function(a, b) {
	if (a==null ||a===undefined) {
		return b;
	} else {
		return a;
	}
});

//
Handlebars.registerHelper('_isBlank', function(a) {
	if (a==null ||a=="" || a===undefined) {
		return true;
	} else {
		return false;
	}
});

//
Handlebars.registerHelper('_substring', function() {
	if (arguments.length ==3){
		if (arguments[0]==null ||arguments[0]=="" || arguments[0]===undefined) {
			return "";
		} else {
			return  arguments[0].substring(arguments[1]);
		}
		
	}else{
		if (arguments[0]==null ||arguments[0]=="" || arguments[0]===undefined) {
			return "";
		} else {
			return  arguments[0].substring(arguments[1], arguments[2]);
		}
	}
});