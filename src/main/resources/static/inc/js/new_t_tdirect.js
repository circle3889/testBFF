 /*2016-02-05 추가_02 [s]*/

$(document).ready(function(){
	$(".sect_wrap .sect .tit").html("요즘 많이 찾은 단말기").show();
    callResize();  
	tdArrowEvent();
}); 
	function callResize() {
		var height = document.body.scrollHeight;
		parent.resizeTopIframe(height);  
	}  
    var tdCurrentIdx = 0;
    var tdMoveSpeed = 300;
    function tdArrowEvent(){
    	if($(".tdirect_lst li").length < 2){
    		$($(".tdirect_lst li")[0]).show().css("left", "0%");
    		var othersHTML = $('<li class="item others" style="left: 50%;">'
    					   + '<div class="item_inner">'
    					   + '<span>다른 휴대폰<br>둘러보기 </span><br>'
    					   + '<a href="javascript:goImage(\'http://shop.tworld.co.kr/handler/Mobile-MobileMain?category_id=20010001\');" " title="티 다이렉트로 이동하기, 새창 열기">바로가기</a>'
    					   + '</div></li>');
    		$(".tdirect_lst").append(othersHTML)
    		$(".tdirect_wrapper .arrow").hide();
    	} else {
    		$($(".tdirect_lst li")[0]).show().css("left", "0%");
        	$($(".tdirect_lst li")[1]).show().css("left", "50%");
        	if($(".tdirect_lst li").length > 2){
	        	$(".tdirect_wrapper .leftArrow").click(function(){
	        		if($(this).find("a").hasClass('on')){
	        			tdMoveToLeft();
	        		}
	        	});
	        	
	        	$(".tdirect_wrapper .rightArrow").click(function(){
	        		if($(this).find("a").hasClass('on')){
	        			tdMoveToRight();
	        		}
	        	});
        	} else {
        		$(".tdirect_wrapper .arrow").hide();
        	}
    	}
    }
    
    function tdMoveToRight(dir){
    	var liLen = $(".tdirect_lst li").length;
    	var cidxL = tdCurrentIdx;
    	var cidxR = tdCurrentIdx + 1;
    	var nidxL = tdCurrentIdx + 2;
    	$($(".tdirect_lst li")[cidxL]).animate({
    		"left" : "-50%"
    	}, tdMoveSpeed, function(){
    		$(this).hide();
    		tdCurrentIdx = cidxR;
    		$(".tdirect_wrapper .leftArrow a").addClass("on");
    		if(nidxL + 1 >= liLen) $(".tdirect_wrapper .rightArrow a").removeClass("on");
    	});
		$($(".tdirect_lst li")[cidxR]).animate({
    		"left" : "0%"
    	}, tdMoveSpeed);
    	$($(".tdirect_lst li")[nidxL]).show().css("left", "100%").animate({
    		"left" : "50%"
    	}, tdMoveSpeed);
    }
    
    function tdMoveToLeft(dir){
    	var liLen = $(".tdirect_lst li").length;
    	var cidxL = tdCurrentIdx;
    	var cidxR = tdCurrentIdx + 1;
    	var pidxL = tdCurrentIdx - 1;
    	$($(".tdirect_lst li")[cidxL]).animate({
    		"left" : "50%"
    	}, tdMoveSpeed, function(){
    		tdCurrentIdx = pidxL;
    		$(".tdirect_wrapper .rightArrow a").addClass("on");
    		if(pidxL == 0) $(".tdirect_wrapper .leftArrow a").removeClass("on");
    	});
		$($(".tdirect_lst li")[cidxR]).animate({
    		"left" : "100%"
    	}, tdMoveSpeed, function(){
    		$(this).hide();
    	});
    	$($(".tdirect_lst li")[pidxL]).show().css("left", "-50%").animate({
    		"left" : "0%"
    	}, tdMoveSpeed);
    }
