SECBanner = { // seconde banner : quiz, poll, tapps
		currIdx : 0,
		objArray : undefined,
		init : function(){
			SECBanner.objArray = $(".second_banner_wrap > div");
			$(".second_banner-pagination").html("1/" + SECBanner.objArray.length);
			SECBanner.setTitle($(SECBanner.objArray[SECBanner.currIdx]));
			if(SECBanner.objArray.length == 0){
				parent.postMessage(0,"http://m2.tworld.co.kr");
			} else if(SECBanner.objArray.length > 0){
				parent.postMessage($("#second_banner_outter").height(),"http://m2.tworld.co.kr");
//				$('#iframe_banner', parent.document).css("height", $("#survey_outter").outerHeight(true));
				if(SECBanner.objArray.length > 1)
				$(".second_banner_header .control .second_banner-button-next").addClass("ov");
				
			} 
			$(".second_banner-button-next").click(function(){
				SECBanner.showHide($(this), "next");
			});
			
			$(".second_banner-button-prev").click(function(){
				SECBanner.showHide($(this), "prev");
			});
		},
		
		setTitle : function(obj){
			if(obj.hasClass("tapps-type")){
				$(".second_banner_header .tit").html("ø¿¥√¿« √ﬂ√µ App");
			} else if(obj.hasClass("quiz-type")){
				$(".second_banner_header .tit").html("ø¿¥√¿« ƒ˚¡Ó");
			} else if(obj.hasClass("poll-type")){
				$(".second_banner_header .tit").html("ƒ¸º≠∫£¿Ã");
			} else if(obj.hasClass("survey-type")){
				$(".second_banner_header .tit").html("ø¿¥√¿« º≥πÆ");
			}
		},
		
		showHide : function(obj, di){
			var otherBtn = undefined;
			if(di == "next") {
				otherBtn = $(".second_banner_header .control .second_banner-button-prev");
				lastIdx = SECBanner.objArray.length - 1;
			} else if(di == "prev"){
				otherBtn = $(".second_banner_header .control .second_banner-button-next");
				lastIdx = 0;
			}
			if(obj.hasClass("ov")){
				otherBtn.addClass("ov");
				$(SECBanner.objArray[SECBanner.currIdx]).hide();
				var nextIdx = (di == "next" ) ? (SECBanner.currIdx + 1) : (SECBanner.currIdx - 1);//  % SECBanner.objArray.length;
				$(SECBanner.objArray[nextIdx]).show().css("opacity", 1);
				SECBanner.currIdx = nextIdx;
				$(".second_banner-pagination").html((SECBanner.currIdx+1) + "/" + SECBanner.objArray.length);
				SECBanner.setTitle($(SECBanner.objArray[nextIdx]))
				if(SECBanner.currIdx == lastIdx){
					obj.removeClass("ov");
				}
			}
		},
	};

