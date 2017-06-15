Banners = {
	getBannerData : function(opt, url, gaca, gaac){
		if(url == undefined) {
			url = "/json/main_banner.json";
			gaca = "MTA_main";
			gaac = "메인 배너"; 
		}
		$.post(url, function(data) {
			var jsonData = JSON.parse(data);
			var currentDate = new Date();
			var nDate =  fnDateFormat(currentDate,"YYYYMMDD");
			var banner = "";
			var page   = "";
			var count = 0;
			var tempArray = [];
			var arraySize = jsonData.length;
			var now = new Date();
			var idx = now.getTime() % arraySize;
			tempArray.push(jsonData[idx]);
			for(var i=0; i<arraySize; i++){
				if(idx == i) continue;
				tempArray.push(jsonData[i]);
			}
			var targetBannerArray = [];
			
			$.each(tempArray, function (index, value) {
				var b_sdate = new Date(value.b_start_date.replace(/-/g, "/"));
				var b_edate = new Date(value.b_end_date.replace(/-/g, "/"));
				b_sdate = fnDateFormat(b_sdate,"YYYYMMDD");
				b_edate = fnDateFormat(b_edate,"YYYYMMDD");
				var b_os_typ_bltn_yn = value.b_os_typ_bltn_yn;
				if(b_os_typ_bltn_yn == undefined) b_os_typ_bltn_yn = "B"
				if(/ipod|iphone|ipad/.test(navigator.userAgent.toLowerCase())){
					if ( b_os_typ_bltn_yn == 'B' || b_os_typ_bltn_yn == '' || b_os_typ_bltn_yn == 'I'){
						if ((b_edate >= nDate) && (b_sdate <= nDate) ){	
							targetBannerArray.push(value); 
						}
					}
				} else {
					if ( b_os_typ_bltn_yn == 'B' || b_os_typ_bltn_yn == '' || b_os_typ_bltn_yn == 'A'){
						if ((b_edate >= nDate) && (b_sdate <= nDate) ){	
							targetBannerArray.push(value);
						}
					}
				}
			});
			
			BannerSwiper.itemLength = targetBannerArray.length;
			
			if(targetBannerArray.length == 2){
				targetBannerArray.push(targetBannerArray[0]);
				targetBannerArray.push(targetBannerArray[1]);
			}
			
			
			
			$.each(targetBannerArray, function (index, value) {
				count++;
			    var t_link = value.b_link;
			    t_link = t_link.replace("http://","");
			    t_link = t_link.replace("https://","");
			    if(opt == "nonLogin"){
				    banner = '<div class="swiper-slide" '
			    		   +'>'
				    	   +'<a href="javascript:alert(\'로그인 후 이용 가능합니다.\')">'
				    	   +'<img src="'+ value.b_img +'" alt="'+ value.b_alt +'"/></a>'
				    	   +'</div>'
			    } else {
			    	var strGa = '';
			    	//if(gaca != undefined && gaac != undefined){
			    		strGa = ' ga:ca="'
					    	   + (gaca == undefined ? '배너클릭' : gaca)
					    	   + '" ga:ac="'
					    	   + (gaac == undefined ? '배너클릭' : gaac)
					    	   + '" ga:la="'
					    	   + value.b_alt
					    	   + '"'
			    	//} 
			    	
			    	banner = '<div class="swiper-slide" '
			    		   +'>'
			    		   + '<a href="javascript:goBanner(\''
			    		   + t_link
			    		   + "', '"
				    	   + value.b_billyn
				    	   + "', '"
				    	   + value.b_inout
				    	   + "', '"
				    	   + value.b_static_cd
				    	   + '\')" title="'
				    	   + value.b_alt
				    	   + (value.b_inout == "OUT" ? ' 새창 열기 ' : '')
				    	   + '"'
				    	   + strGa
				    	   + '>' 
				    	   +'<img src="'+ value.b_img +'" '
				    	   + strGa
				    	   + '/></a>'
				    	   +'</div>'
			    }
			    $("#swiper_banners").append(banner); 
			});
			
			setTimeout(function(){
				BannerSwiper.init("swiper_banner", "swiper_banners", opt);
			}, 100);
		});
	},
	
	clickEvent : function(opt, obj){
		if(opt == 0){
			alert('로그인 후 이용 가능합니다.');
		} else {
			if( "Y" == $(obj).attr("data-bill") ){
				if(confirm("3G/LTE망 사용 시 데이터 요금이 발생됩니다.")){				
					Banners.gotoURL(obj);
				}
			}else{
				Banners.gotoURL(obj);
			}
		}
	},
	
	gotoURL : function(obj){
		if($(obj).attr("data-inout") == "OUT"){
			if (/ipod|iphone|ipad/.test(navigator.userAgent.toLowerCase())) {   
				location.href = "toapp:webbrowserouter:" + $(obj).attr("href");
			}else{
				toapp.webbrowserouter($(obj).attr("href"));
			}
		} else {
			location.href = "http://" + $(obj).attr("href");
		}
	}
}

var BannerSwiper = {
	itemLength: 0,
    currIdx : 0,
	targetWidth : 0,
	count: 0,
	aniSpeed : 300,
	rollingInterval : 3000,
	rollingID : undefined,
	targetID : undefined,
	targetParentId : undefined,
	ismoveYaxis : false, 
	ismoveXaxis : false,
	isSliding : false,
	chkValue : 5,
	tempItem : undefined,
	touches : {
		"touchstart": {"x":-1, "y":-1, "currLeft":undefined, "nextLeft":undefined, "prevLeft":undefined}, 
		"touchmove" : {"x":-1, "y":-1}, 
		"touchend"  : false,
		"direction" : "undetermined"
	},
	touchHandler: function(event) {
		var touch;
		if (typeof event !== 'undefined' && !BannerSwiper.isSliding){
			if(BannerSwiper.ismoveXaxis) event.preventDefault();
			BannerSwiper.rollingStop()
			if (typeof event.touches !== 'undefined') {
				touch = event.touches[0];
				switch (event.type) {
					case 'touchstart':
						BannerSwiper.ismoveYaxis = false;
						BannerSwiper.ismoveXaxis = false;
						BannerSwiper.touches[event.type].x = touch.pageX;
						BannerSwiper.touches[event.type].y = touch.pageY;
						BannerSwiper.touches["touchmove"].x = -1;
						BannerSwiper.touches["touchmove"].y = -1;
						BannerSwiper.touches[event.type].currLeft = $($("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div")[BannerSwiper.currIdx]).position().left;
						BannerSwiper.touches[event.type].nextLeft = BannerSwiper.targetWidth;
						BannerSwiper.touches[event.type].prevLeft = -1 * BannerSwiper.targetWidth;;
						
						if(BannerSwiper.count == 2){
							var nextIdx = (BannerSwiper.currIdx + 1) % BannerSwiper.count;
							BannerSwiper.tempItem = $($("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div")[nextIdx]).clone();
							BannerSwiper.tempItem.attr("data-idx", nextIdx);
							$("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID).append(BannerSwiper.tempItem); 
						}
						break;
					case 'touchmove':
						BannerSwiper.touches[event.type].x = touch.pageX;
						BannerSwiper.touches[event.type].y = touch.pageY;
						
						var diffX = BannerSwiper.touches.touchmove.x - BannerSwiper.touches.touchstart.x;
						var diffY = BannerSwiper.touches.touchmove.y - BannerSwiper.touches.touchstart.y;
						
						if(!BannerSwiper.ismoveXaxis && Math.abs(diffY) > 5){
							BannerSwiper.ismoveYaxis = true;
						} 
						if (!BannerSwiper.ismoveYaxis && BannerSwiper.touches.touchstart.x > -1 && BannerSwiper.touches.touchmove.x > -1) {
							BannerSwiper.touches.direction = BannerSwiper.touches.touchstart.x < BannerSwiper.touches.touchmove.x ? "right" : "left";
							// DO STUFF HERE
							var diff = BannerSwiper.touches.touchmove.x - BannerSwiper.touches.touchstart.x;
							if(Math.abs(diff)>BannerSwiper.chkValue) {
								BannerSwiper.ismoveXaxis = true;
								event.preventDefault();
								$($("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div")[BannerSwiper.currIdx]).css({
									"left":  BannerSwiper.touches.touchstart.currLeft + diff
								});
								
								var nextIdx = (BannerSwiper.currIdx + 1) % $("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div").length
								var prevIdx = (BannerSwiper.currIdx - 1) < 0 ? $("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div").length-1 : (BannerSwiper.currIdx - 1);
								console.log("move", BannerSwiper.currIdx, nextIdx, prevIdx);
								$($("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div")[nextIdx]).removeClass("swiper-slide-hide").css({
									"left": BannerSwiper.touches.touchstart.nextLeft + diff
								});
								$($("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div")[prevIdx]).removeClass("swiper-slide-hide").css({
									"left": BannerSwiper.touches.touchstart.prevLeft + diff
								});
							}
						}
						
						break;
					case 'touchend':
						if (BannerSwiper.ismoveXaxis && BannerSwiper.touches.touchstart.x > -1 && BannerSwiper.touches.touchmove.x > -1) {
							BannerSwiper.touches.direction = BannerSwiper.touches.touchstart.x < BannerSwiper.touches.touchmove.x ? "right" : "left";
							// DO STUFF HERE
							var diff = BannerSwiper.touches.touchmove.x - BannerSwiper.touches.touchstart.x;
							diff = Math.abs(diff);
							var moveBaseValue = BannerSwiper.targetWidth / 5;
							BannerSwiper.isSliding = true;
							if(diff >= 20){
								BannerSwiper.slide(BannerSwiper.touches.direction, "swipe");
							} else if(diff < 20){
								BannerSwiper.slideReset(BannerSwiper.touches.direction);
							}
						} 
							
						BannerSwiper.ismoveYaxis = false;
						BannerSwiper.ismoveXaxis = false;
						BannerSwiper.touches.touchstart.x = -1;
						BannerSwiper.touches.touchmove.x = -1;
					default:
						break;
				}
			}
		}
	},
	
	init: function(pObjId, objId, opt) {
		if($("#" + objId + " > div").length == 0){
			$("#" + pObjId).hide();
		} else if($("#" + objId + " > div").length ==1){
			$(".swiper-container").show();
			$(".swiper-guide-wrapper").hide();
			BannerSwiper.setWrapperHeight(pObjId, objId, opt);
		} else {
			if(BannerSwiper.itemLength < 2)
			BannerSwiper.itemLength = $("#" + objId + " > div").length
			$(".swiper-container").show();
			BannerSwiper.addEventListener(pObjId, objId, opt);
		}
		
	},
	
	setWrapperHeight : function(pObjId, objId, opt){
		var imgWidth =$($("#" + pObjId + " #" + objId + " > div")[0]).find('img').width();
		if(opt == "sub"){
			var swiperHeight = 145*imgWidth/640;
		} else if(opt == "tapp"){
			var swiperHeight = 500*imgWidth/640;
		} else if(opt == 't-alram'){
			var swiperHeight = 126;
		} else{
			var swiperHeight = 210*imgWidth/640;
		}
		$("#" + objId).height(swiperHeight);
	},
	
	addEventListener : function(pObjId, objId, opt){
		BannerSwiper.targetParentId = pObjId;
		BannerSwiper.targetID = objId;
		var sbanner = document.getElementById(objId);
		sbanner.addEventListener('touchstart', BannerSwiper.touchHandler, false);	
		sbanner.addEventListener('touchmove', BannerSwiper.touchHandler, false);	
		sbanner.addEventListener('touchend', BannerSwiper.touchHandler, false);
		BannerSwiper.targetWidth = $("#" + BannerSwiper.targetParentId).width();
		BannerSwiper.count = $("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div").length;
		
		$(".swiper-pagination ul").empty().append('<li class="active"></li>');
		for(var i=1; i<BannerSwiper.itemLength; i++){
			$(".swiper-pagination ul").append('<li></li>');
		}
		
		for(var i=1; i<BannerSwiper.count; i++){
			$($("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div")[i]).addClass("swiper-slide-hide");
			$($("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div")[i]).css("left", BannerSwiper.targetWidth);
		}
		
		BannerSwiper.setWrapperHeight(pObjId, objId, opt);
		
		
		$(".swiper-guide-wrapper .swiper-button-prev").click(function(){
			BannerSwiper.clickSlide("right");
		});
		
		$(".swiper-guide-wrapper .swiper-button-next").click(function(){
			BannerSwiper.clickSlide("left");
		});
		
//		if(!/ipod|iphone|ipad/.test(navigator.userAgent.toLowerCase())){
//			$(".swiper-guide-wrapper .bplay_btn").click(function(){
//				if($(this).hasClass("b_play")){
//					BannerSwiper.rollingStart()
//				} else {
//					BannerSwiper.rollingStop()
//				}
//			});
//			BannerSwiper.rollingStart();
//		} else {
			$(".swiper-guide-wrapper .bplay_btn").hide();
//		}
		
	},
	
	clickSlide : function(direction){
		if(!BannerSwiper.isSliding){
			if(BannerSwiper.count == 2){
				var nextIdx = (BannerSwiper.currIdx + 1) % BannerSwiper.count;
				BannerSwiper.tempItem = $($("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div")[nextIdx]).clone();
				BannerSwiper.tempItem.attr("data-idx", nextIdx);
				$("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID).append(BannerSwiper.tempItem); 
			}
			BannerSwiper.slide(direction, 'click');
		}
	},
	
	
	slide : function(direction, action_type){
		var nextIdx = undefined;
		var otherIdx = undefined;
		var leftValue = undefined;
		
		BannerSwiper.isSliding = true;
		
		if(direction == "left"){
			nextIdx = (BannerSwiper.currIdx + 1) % $("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div").length;
			otherIdx = (BannerSwiper.currIdx - 1) < 0 ? $("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div").length-1 : (BannerSwiper.currIdx - 1);
			leftValue = -1 *  BannerSwiper.targetWidth;
		} else {
			nextIdx = (BannerSwiper.currIdx - 1) < 0 ? $("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div").length-1 : (BannerSwiper.currIdx - 1);
			otherIdx = (BannerSwiper.currIdx + 1) % $("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div").length;
			leftValue = BannerSwiper.targetWidth;
		}
		$($("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div")[BannerSwiper.currIdx]).animate({
			"left": leftValue
		},BannerSwiper.aniSpeed, function(){
			$(this).addClass("swiper-slide-hide");
		});
		
		$($("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div")[otherIdx]).animate({
			"left": leftValue
		},BannerSwiper.aniSpeed, function(){
			$(this).addClass("swiper-slide-hide");
		});
		
		if(action_type == 'click'){
			$($("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div")[nextIdx]).css("left", -1 * leftValue);
		}
		$($("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div")[nextIdx]).removeClass("swiper-slide-hide").animate({
			"left": 0
		},BannerSwiper.aniSpeed, function(){
			if(BannerSwiper.count == 2){
				var dataIdx = parseInt($($("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div")[nextIdx]).attr("data-idx"));
				BannerSwiper.currIdx =  (isNaN(dataIdx) || dataIdx == undefined) ? nextIdx : dataIdx;
				$($("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div")[BannerSwiper.currIdx]).css("left", 0).removeClass("swiper-slide-hide");
				$(BannerSwiper.tempItem).remove();
				BannerSwiper.tempItem = undefined;
			} else {
				BannerSwiper.currIdx = nextIdx;
			}
			$(".swiper-pagination ul li").removeClass("active");
			$($(".swiper-pagination ul li")[BannerSwiper.currIdx % BannerSwiper.itemLength]).addClass("active");
			BannerSwiper.isSliding = false;
//			if(BannerSwiper.rollingID == undefined)
//			BannerSwiper.rollingStart();
		});
	},
	
	
	slideReset : function(direction){
		var otherIdx = undefined;
		var leftValue = undefined;
		if(direction == "left"){
			prevIdx = (BannerSwiper.currIdx - 1) < 0 ? $("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div").length-1 : (BannerSwiper.currIdx - 1);
			nextIdx = (BannerSwiper.currIdx + 1) % $("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div").length;
			nextLeftValue = BannerSwiper.targetWidth;
			prevLeftValue = -1 * BannerSwiper.targetWidth;
			
		} else {
			prevIdx = (BannerSwiper.currIdx + 1) % $("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div").length;
			nextIdx = (BannerSwiper.currIdx - 1) < 0 ? $("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div").length-1 : (BannerSwiper.currIdx - 1);
			nextLeftValue = -1 * BannerSwiper.targetWidth;
			prevLeftValue = BannerSwiper.targetWidth;
		}
		
		
		$($("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div")[BannerSwiper.currIdx]).animate({
			"left": 0
		},BannerSwiper.aniSpeed, function(){
			BannerSwiper.isSliding = false;
		});
		$($("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div")[nextIdx]).animate({
			"left": nextLeftValue
		},BannerSwiper.aniSpeed, function(){
			$(this).addClass("swiper-slide-hide");
		});
		$($("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div")[prevIdx]).animate({
			"left": prevLeftValue
		},BannerSwiper.aniSpeed, function(){
			$(this).addClass("swiper-slide-hide");
			$(BannerSwiper.tempItem).remove();
		});
	},

	rollingStart : function(){
//		$(".swiper-pagination .bplay_btn").removeClass("b_play");
//		BannerSwiper.rollingID = setInterval(function(){
//			if($("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div").length == 2){
//				var nextIdx = (BannerSwiper.currIdx + 1) % $("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div").length
//				BannerSwiper.tempItem = $($("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID + " > div")[nextIdx]).clone();
//				BannerSwiper.tempItem.attr("data-idx", nextIdx);
//				$("#" + BannerSwiper.targetParentId + " #" + BannerSwiper.targetID).append(BannerSwiper.tempItem); 
//			}
//			if(!BannerSwiper.isSliding) BannerSwiper.slide("left", 'click');
//		}, BannerSwiper.rollingInterval);
	},
	
	rollingStop : function(){
//		clearInterval(BannerSwiper.rollingID);
//		BannerSwiper.rollingID = undefined;
//		$(".swiper-pagination .bplay_btn").addClass("b_play");
	}
}; 

/**
* Format date as a string
* 
* @param date -
*            a date object (usually "new Date();")
* @param format -
*            a string format, eg. "DD-MM-YYYY"
*/
function fnDateFormat(date, format) {
	format = format.replace("DD", (date.getDate() < 10 ? '0' : '') + date.getDate());
	format = format.replace("MM", (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1));
	format = format.replace("YYYY", date.getFullYear());
	return format;
}
