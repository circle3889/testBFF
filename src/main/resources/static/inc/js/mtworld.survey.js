Survey = { //Survey
	currIdx : 0,
	objArray : undefined,
	init : function(objId){
		Survey.objArray = $("." + objId + " > div");
		$(".surveyBox-pagination").html("1/" + Survey.objArray.length);
		$(".surveyWrap").height($(Survey.objArray[Survey.currIdx]).height());
		Survey.setTitle($(Survey.objArray[Survey.currIdx]));
		if(Survey.objArray.length == 0){
			$("#survey_outter").hide();
		} else if(Survey.objArray.length > 0){
			$('#iframe_survey', parent.document).css("height", $("#survey_outter").outerHeight(true));
			if(Survey.objArray.length > 1)
			$(".surveyBox-guide-wrapper .control .surveyBox-button-next").addClass("ov");
		}
		
		$(".surveyBox-button-next").click(function(){
			Survey.showHide($(this), "next");
		});
		
		$(".surveyBox-button-prev").click(function(){
			Survey.showHide($(this), "prev");
		});
	},
	
	setTitle : function(obj){
		if(obj.hasClass("survey-type")){
			$(".surveyBox-guide-wrapper .tit").html("오늘의 설문");
		} else if(obj.hasClass("quiz-type")){
			$(".surveyBox-guide-wrapper .tit").html("오늘의 퀴즈");
		} else if(obj.hasClass("poll-type")){
			$(".surveyBox-guide-wrapper .tit").html("퀵서베이");
		} 
	},
	
	showHide : function(obj, di){
		var otherBtn = undefined;
		if(di == "next") {
			otherBtn = $(".surveyBox-guide-wrapper .control .surveyBox-button-prev");
			lastIdx = Survey.objArray.length - 1;
		} else if(di == "prev"){
			otherBtn = $(".surveyBox-guide-wrapper .control .surveyBox-button-next");
			lastIdx = 0;
		}
		if(obj.hasClass("ov")){
			otherBtn.addClass("ov");
			$(Survey.objArray[Survey.currIdx]).hide();
			var nextIdx = (di == "next" ) ? (Survey.currIdx + 1) : (Survey.currIdx - 1);//  % Survey.objArray.length;
			$(Survey.objArray[nextIdx]).show().css("opacity", 1);
			$(".surveyWrap").height($(Survey.objArray[nextIdx]).height());
			Survey.currIdx = nextIdx;
			$(".surveyBox-pagination").html((Survey.currIdx+1) + "/" + Survey.objArray.length);
			Survey.setTitle($(Survey.objArray[nextIdx]))
			if(Survey.currIdx == lastIdx){
				obj.removeClass("ov");
			}
			$('#iframe_survey', parent.document).css("height", $("#survey_outter").outerHeight(true));
//			parent.postMessage($("#survey_outter").outerHeight(true),"http://m2.tworld.co.kr");
		}
	},
	
	fadeInOut : function(obj, di){
		var otherBtn = undefined;
		if(di == "next") {
			otherBtn = $(".surveyBox-guide-wrapper .control .surveyBox-button-prev");
			lastIdx = Survey.objArray.length - 1;
		} else if(di == "prev"){
			otherBtn = $(".surveyBox-guide-wrapper .control .surveyBox-button-next");
			lastIdx = 0;
		}
		if(obj.hasClass("ov")){
			otherBtn.addClass("ov");
			$(Survey.objArray[Survey.currIdx]).animate({
				"opacity" : 0
			}, 500, function(){
				$(this).hide();
			});
			var nextIdx = (di == "next" ) ? (Survey.currIdx + 1) : (Survey.currIdx - 1);
			$(Survey.objArray[nextIdx]).show()
			$(".surveyWrap").height($(Survey.objArray[nextIdx]).height());
			$(".surveyBox-pagination").html((nextIdx+1) + "/" + Survey.objArray.length);
			$(Survey.objArray[nextIdx]).animate({
				"opacity" : 1
			}, 500, function(){
				Survey.currIdx = nextIdx;
				if(Survey.currIdx == lastIdx){
					obj.removeClass("ov");
				}
			});
		}
	},
	
	slideDownUp : function(obj, di){
		var otherBtn = undefined;
		if(di == "next") {
			otherBtn = $(".surveyBox-guide-wrapper .control .surveyBox-button-prev");
			lastIdx = Survey.objArray.length - 1;
		} else if(di == "prev"){
			otherBtn = $(".surveyBox-guide-wrapper .control .surveyBox-button-next");
			lastIdx = 0;
		}
		if(obj.hasClass("ov")){
			otherBtn.addClass("ov");
			$(Survey.objArray[Survey.currIdx]).slideUp(500, function(){
				$(Survey.objArray[Survey.currIdx]).css({
					opacity:0
				});
				var nextIdx = (di == "next" ) ? (Survey.currIdx + 1) : (Survey.currIdx - 1);
				$(".surveyBox-pagination").html((nextIdx+1) + "/" + Survey.objArray.length);
				$(Survey.objArray[nextIdx]).show();
				$(".surveyWrap").animate({
					"height" : $(Survey.objArray[nextIdx]).height()
				}, 500);
				$(Survey.objArray[nextIdx]).hide().css("opacity", "1");
				$(Survey.objArray[nextIdx]).slideDown(500, function(){
					Survey.currIdx = nextIdx;
					if(Survey.currIdx == lastIdx){
						obj.removeClass("ov");
					}
				});				
			});
		}
	}
};

var QueryString = function () {
	  // This function is anonymous, is executed immediately and 
	  // the return value is assigned to QueryString!
	  var query_string = {};
	  var query = window.location.search.substring(1);
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	        // If first entry with this name
	    if (typeof query_string[pair[0]] === "undefined") {
	      query_string[pair[0]] = decodeURIComponent(pair[1]);
	        // If second entry with this name
	    } else if (typeof query_string[pair[0]] === "string") {
	      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
	      query_string[pair[0]] = arr;
	        // If third or later entry with this name
	    } else {
	      query_string[pair[0]].push(decodeURIComponent(pair[1]));
	    }
	  } 
	  return query_string;
	}();
	

function gotoContent(){
	if(QueryString.surveyId != undefined){
		var posTop = $("#" + QueryString.surveyId).offset().top;
//		$('body').scrollTop(posTop);
		$("html, body").animate({scrollTop: posTop}, 100);
	}
}