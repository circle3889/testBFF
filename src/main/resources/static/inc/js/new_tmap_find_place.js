$(function(){
	if($('.popup_tmap .cont > ul').find('a.off').length > 0){
		$('.popup_tmap .cont > ul > li > a.off').click(function(){
			$(this).parent().parent().find('a.on').hide();
			$(this).parent().parent().find('a.off').show();
			$(this).parent().parent().find('ul').hide();
			$(this).parent().find('a.on').show();
			$(this).parent().find('ul').show();
			$(this).hide();			
			$('.popup_tmap').css('height',$(document).height() + $(this).parent().height());
		});
		
		$('.popup_tmap .cont > ul > li > a.on').click(function(){
			if($(this).parent().find('a.off').length > 0){
				var parentObj = $(this).parent();
				$(this).parent().find('a.off').show();
				$(this).parent().find('ul').hide();
				//parentObj.find('ul').find('.on').removeClass('on');
				$(this).hide(0, '', function(){
					parentObj.find('a.off').focus();
				});
				$('.popup_tmap').css('height',$(document).height());
			}
		});
		
	
		$('.popup_tmap .head button').click(function(){
			$('.popup_tmap').hide(function(){
				$("#content .head_map .btn_tmap_popup").focus();
			});
			return false
		});
		
		$('.btn_tmap_popup').click(function(){
			var dheight= $(document).height();
			var wHeight = $(window).height();
			var rHeight = undefined;
			if(dheight > wHeight) rHeight = dheight;
			else rHeight = wHeight;
			
			$('.popup_tmap').height(rHeight).show(function(){
//				if($(this).find('a.off:visible')){
//					$(this).find('a.off').parent().find('ul').find(".on a").focus();
//				} else {
					//$(".popup_tmap .head button").focus();
				$(".popup_tmap .head #pop_tmap").focus();
//				}
			});
			$('.popup_tmap').css('height',$(document).height())
			$('.layer_content').css('marginTop','10px');
			return false
		});
		/*var wheight= $(window).height();
		var layeriScoll = undefined;
		$('.btn_tmap_popup').click(function(){
			$('.popup_tmap').show(function(){
				
				
				if($('#other_area_list_wrapper').height() > wheight){
	            	if(layeriScoll==undefined){
	            		$('#other_area_list_wrapper').css({
	                		"height" : wheight,
	                	});
	            		layeriScoll = new iScroll('other_area_list');
	            	}
	            }
				
				if($(this).find('a.off:visible')){
					$(this).find('a.off').parent().find('ul').find(".on a").focus();
				} else {
					$(".popup_tmap .head button").focus();
				}
				$(".popup_tmap .head button").focus();
				
			});
			$('.popup_tmap').css('height',$(document).height())
			$('.layer_content').css('marginTop','10px');
			return false
		});*/
	}
});