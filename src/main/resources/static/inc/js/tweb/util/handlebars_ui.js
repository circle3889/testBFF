/*************************************************************************************************
 *	@CreateDate	: 2016.07
 *	@ModifyDate	: 2016.07
 *	@FileName	: handlebars_ui.js
 *	@Author		: witchgreen
 *************************************************************************************************/
 
//ui 영역 삭제
Handlebars.registerHelper('_remove', function(a) {
	$("#"+a).remove();
});

//ui 영역 숨기기
Handlebars.registerHelper('_hide', function(a) {
	$("#"+a).hide();
});

//ui 영역 표시
Handlebars.registerHelper('_show', function(a) {
	$("#"+a).show();
});