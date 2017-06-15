layerPopup = {
	isIOS : false,
	init : function(){
		layerPopup.isIOS = /ipod|iphone|ipad/.test(navigator.userAgent.toLowerCase());
		for(var i=0; i<$("*[data-layer]").length; i++){
			var btn = $("*[data-layer]")[i];
			layerPopup.addEvent(btn, $(btn).attr("data-layer"));
		}
	},
    addEvent : function(btn, tgLayer) {
    	$(btn).on("click", function(e){
    		e.preventDefault();
    		$(this).attr('tabIndex', 0).focus();
    		$("body").append("<div class=bgDimm></div>");
    		$("#"+tgLayer).css("display", "table"); 
			$("#"+tgLayer).find(".cont").css("height", "auto");
    		$("#"+tgLayer).addClass("on").show(function(){
    			$("#"+tgLayer).find("button").unbind("click").click(function(){
					layerPopup.close(btn, tgLayer);
				});
    			if($(window).height() < $("#"+tgLayer).height() + 40) {
    				$("#"+tgLayer).css("overflow","hidden");
    				$("#"+tgLayer).css("height", $(window).height() - 40);
    				$("#"+tgLayer).find(".cont").css("height", $(window).height() - $("#"+tgLayer).find(".head").outerHeight(true) - 40);
    			}
    			$("body").css("overflow","hidden");
    			$("#"+tgLayer).find("h1").focus();
    		});
    		$("#content").attr("aria-hidden", true);
    		$("#header").attr("aria-hidden", true);
    		$(".notice").attr("aria-hidden", true);
    	});
    	$("#"+tgLayer).css({
	        top: $(document).scrollTop() + 21
	    });
    },
	close : function(btn, tgLayer){
		$(".bgDimm").remove();
		$("#"+tgLayer).removeClass("on").hide();
		$("body").css("overflow","auto");
		$(btn).focus();
		$("#content").attr("aria-hidden", false);
		$("#header").attr("aria-hidden", false);
		$(".notice").attr("aria-hidden", false);
	}
}