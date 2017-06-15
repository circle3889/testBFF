$(document).ready(function(){
	$("#list_wrapper").css("height", $(window).height()-$("header").height());
	$(".swiper-wrapper").css("height", $(window).height()-$("header").height());
	$(".swiper-slide").css("height", $(window).height()-$("header").height()-$(".swiper-action-layer").height());
	var seq = QueryString.seq;
	if(seq == undefined) seq = 0;
	Swiper.init("list_wrapper", "lists", parseInt(seq));
});

var Swiper = {
    currIdx : 0,
	targetWidth : 0,
	count: 0,
	aniSpeed : 300,
	rollingInterval : 3000,
	rollingID : undefined,
	targetID : undefined,
	targetParentId : undefined,
	isSliding : false,
	chkValue : 5,
	touches : {
		"touchstart": {"x":-1, "y":-1, "currLeft":undefined, "nextLeft":undefined, "prevLeft":undefined}, 
		"touchmove" : {"x":-1, "y":-1}, 
		"touchend"  : false,
		"direction" : "undetermined"
	},
	touchHandler: function(event) {
		var touch;
		if (typeof event !== 'undefined' && !Swiper.isSliding){
			event.preventDefault();
			if (typeof event.touches !== 'undefined') {
				touch = event.touches[0];
				switch (event.type) {
					case 'touchstart':
						Swiper.touches[event.type].x = touch.pageX;
						Swiper.touches[event.type].y = touch.pageY;
						Swiper.touches["touchmove"].x = -1;
						Swiper.touches["touchmove"].y = -1;
						Swiper.touches[event.type].currLeft = $($("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div")[Swiper.currIdx]).position().left;
						Swiper.touches[event.type].nextLeft = Swiper.targetWidth;
						Swiper.touches[event.type].prevLeft = -1 * Swiper.targetWidth;
						var nextIdx = (Swiper.currIdx + 1) % $("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div").length
						var prevIdx = (Swiper.currIdx - 1) < 0 ? Swiper.count-1 : (Swiper.currIdx - 1);
						$($("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div")[nextIdx]).css({
							"left": Swiper.touches.touchstart.nextLeft
						});
						$($("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div")[prevIdx]).css({
							"left": Swiper.touches.touchstart.prevLeft
						});
						break;
					case 'touchmove':
						Swiper.touches[event.type].x = touch.pageX;
						Swiper.touches[event.type].y = touch.pageY;
						
						if (Swiper.touches.touchstart.x > -1 && Swiper.touches.touchmove.x > -1) {
							Swiper.touches.direction = Swiper.touches.touchstart.x < Swiper.touches.touchmove.x ? "right" : "left";
							// DO STUFF HERE
							var diff = Swiper.touches.touchmove.x - Swiper.touches.touchstart.x;
							$($("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div")[Swiper.currIdx]).css({
								"left":  Swiper.touches.touchstart.currLeft + diff
							});
							var nextIdx = (Swiper.currIdx + 1) % $("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div").length
							var prevIdx = (Swiper.currIdx - 1) < 0 ? Swiper.count-1 : (Swiper.currIdx - 1);
							$($("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div")[nextIdx]).removeClass("swiper-slide-hide").css({
								"left": Swiper.touches.touchstart.nextLeft + diff
							});
							$($("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div")[prevIdx]).removeClass("swiper-slide-hide").css({
								"left": Swiper.touches.touchstart.prevLeft + diff
							});
						}
						break;
					case 'touchend':
						if (!Swiper.isSliding && Swiper.touches.touchstart.x > -1 && Swiper.touches.touchmove.x > -1) {
							Swiper.touches.direction = Swiper.touches.touchstart.x < Swiper.touches.touchmove.x ? "right" : "left";
							// DO STUFF HERE
							var diff = Swiper.touches.touchmove.x - Swiper.touches.touchstart.x;
							diff = Math.abs(diff);
							var moveBaseValue = Swiper.targetWidth / 5;
							Swiper.isSliding = true;
							if(diff >= 20){
								Swiper.slide(Swiper.touches.direction, "swipe");
							} else if(diff < 20){
								Swiper.slideReset(Swiper.touches.direction);
							}
						} 
							
						Swiper.ismoveYaxis = false;
						Swiper.ismoveXaxis = false;
						Swiper.touches.touchstart.x = -1;
						Swiper.touches.touchmove.x = -1;
					default:
						break;
				}
			}
		}
	},
	
	init: function(pObjId, objId, seq) {
		if($("#" + objId + " > div").length == 0){
			$("#" + pObjId).hide();
		} else if($("#" + objId + " > div").length < 2){
			$(".swiper-container").show();
			$(".swiper-guide-wrapper").hide();
			Swiper.addEventListener(pObjId, objId, seq);
		} else {
			$(".swiper-container").show();
			Swiper.addEventListener(pObjId, objId, seq);
		}
	},
	
	addEventListener : function(pObjId, objId, seq){
		Swiper.targetParentId = pObjId;
		Swiper.targetID = objId;
		var sbanner = document.getElementById(objId);
		sbanner.addEventListener('touchstart', Swiper.touchHandler, false);	
		sbanner.addEventListener('touchmove', Swiper.touchHandler, false);	
		sbanner.addEventListener('touchend', Swiper.touchHandler, false);
		Swiper.targetWidth = $("#" + Swiper.targetParentId).width();
		Swiper.count = $("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div").length;
		
		/*$(".swiper-pagination ul").empty().append('<li class="active"></li>');
		for(var i=1; i<Swiper.count; i++){
			$($("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div")[i]).addClass("swiper-slide-hide");
			$($("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div")[i]).css("left", Swiper.targetWidth);
			$(".swiper-pagination ul").append('<li></li>');
		}*/
		$(".swiper-pagination ul").empty();
		for(var i=0; i<Swiper.count; i++){
			if(i == seq){
				Swiper.currIdx = seq;
				$(".swiper-pagination ul").append('<li class="active"></li>');
			} else {
				$($("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div")[i]).addClass("swiper-slide-hide");
				var initLeftValue = Swiper.targetWidth;
				if(i < seq){
					initLeftValue = -1 * Swiper.targetWidth;
				} 
				$($("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div")[i]).css("left", initLeftValue);
				$(".swiper-pagination ul").append('<li></li>');
			}
			
		}
		
		
		$("#" + Swiper.targetID).height($($("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div")[Swiper.currIdx]).find('img').height());
		
		$("#" + Swiper.targetParentId + " .swiper-button-prev").click(function(){
			if (!Swiper.isSliding){
				Swiper.isSliding = true;
				Swiper.slide("right", 'click');
			}
		});
		
		$("#" + Swiper.targetParentId + " .swiper-button-next").click(function(){
			if (!Swiper.isSliding){
				Swiper.isSliding = true;
				Swiper.slide("left", 'click');
			}
		});
		
	},
	
	slide : function(direction, action_type){
		var nextIdx = undefined;
		var otherIdx = undefined;
		var leftValue = undefined;
		if(direction == "left"){
			nextIdx = (Swiper.currIdx + 1) % $("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div").length;
			otherIdx = (Swiper.currIdx - 1) < 0 ? Swiper.count-1 : (Swiper.currIdx - 1);
			leftValue = -1 *  Swiper.targetWidth;
		} else {
			nextIdx = (Swiper.currIdx - 1) < 0 ? Swiper.count-1 : (Swiper.currIdx - 1);
			otherIdx = (Swiper.currIdx + 1) % $("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div").length;
			leftValue = Swiper.targetWidth;
		}
		$($("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div")[Swiper.currIdx]).animate({
			"left": leftValue
		},Swiper.aniSpeed, function(){
			$(this).addClass("swiper-slide-hide");
		});
		
		$($("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div")[otherIdx]).animate({
			"left": leftValue
		},Swiper.aniSpeed, function(){
			$(this).addClass("swiper-slide-hide");
		});
		
		if(action_type == 'click'){
			$($("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div")[nextIdx]).css("left", -1 * leftValue);
		}
		$($("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div")[nextIdx]).removeClass("swiper-slide-hide").animate({
			"left": 0
		},Swiper.aniSpeed, function(){
			Swiper.currIdx = nextIdx;
			$(".swiper-pagination ul li").removeClass("active");
			$($(".swiper-pagination ul li")[Swiper.currIdx]).addClass("active");
			Swiper.isSliding = false;
		});
	},
	
	
	slideReset : function(direction){
		var otherIdx = undefined;
		var leftValue = undefined;
		
		if(direction == "left"){
			prevIdx = (Swiper.currIdx - 1) < 0 ? Swiper.count-1 : (Swiper.currIdx - 1);
			nextIdx = (Swiper.currIdx + 1) % $("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div").length;
			nextLeftValue = Swiper.targetWidth;
			prevLeftValue = -1 * Swiper.targetWidth;
			
		} else {
			prevIdx = (Swiper.currIdx + 1) % $("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div").length;
			nextIdx = (Swiper.currIdx - 1) < 0 ? Swiper.count-1 : (Swiper.currIdx - 1);
			nextLeftValue = -1 * Swiper.targetWidth;
			prevLeftValue = Swiper.targetWidth;
		}
		
		
		$($("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div")[Swiper.currIdx]).animate({
			"left": 0
		},Swiper.aniSpeed, function(){
			Swiper.isSliding = false;
		});
		$($("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div")[nextIdx]).animate({
			"left": nextLeftValue
		},Swiper.aniSpeed, function(){
			$(this).addClass("swiper-slide-hide");
		});
		$($("#" + Swiper.targetParentId + " #" + Swiper.targetID + " > div")[prevIdx]).animate({
			"left": prevLeftValue
		},Swiper.aniSpeed, function(){
			$(this).addClass("swiper-slide-hide");
		});
	},

	rollingStart : function(){
		$(".swiper-pagination .bplay_btn").removeClass("b_play");
		Swiper.rollingID = setInterval(function(){
			Swiper.slide("left", 'click');
		}, Swiper.rollingInterval);
	},
	
	rollingStop : function(){
		clearInterval(Swiper.rollingID);
		$(".swiper-pagination .bplay_btn").addClass("b_play");
	}
}; 

var MobileUA = ( function () {
	var ua = navigator.userAgent.toLowerCase();
	var mua = {
		IOS: /ipod|iphone|ipad/.test(ua),                                //iOS
		IPHONE: /iphone/.test(ua),                                        //iPhone
		IPAD: /ipad/.test(ua),                                            //iPad
		ANDROID: /android/.test(ua),                                    //Android Device
		WINDOWS: /windows/.test(ua),                                    //Windows Device
		TOUCH_DEVICE: ('ontouchstart' in window) || /touch/.test(ua),    //Touch Device
		MOBILE: /mobile/.test(ua),                                        //Mobile Device (iPad  ы븿)
		ANDROID_TABLET: false,                                            //Android Tablet
		WINDOWS_TABLET: false,                                            //Windows Tablet
		TABLET: false,                                                    //Tablet (iPad, Android, Windows)
		SMART_PHONE: false                                                //Smart Phone (iPhone, Android)
	};
	mua.ANDROID_TABLET = mua.ANDROID && !mua.MOBILE;
	mua.WINDOWS_TABLET = mua.WINDOWS && /tablet/.test(ua);
	mua.TABLET = mua.IPAD || mua.ANDROID_TABLET || mua.WINDOWS_TABLET;
	mua.SMART_PHONE = mua.MOBILE && !mua.TABLET;

	return mua;
}());

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