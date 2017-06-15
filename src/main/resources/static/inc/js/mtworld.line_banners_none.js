//var lineBannersAlt = [
//    "이번 주말 할인 혜택 아웃백/VIPS 50% 할인", //일
//    "이번 주말 할인 혜택 아웃백/VIPS 50% 할인", //월
//    "이번 주말 할인 혜택 아웃백/VIPS 50% 할인", //화
//    "이번 주 금요일 할인 혜택 파리바게트 최대 30%", //수
//    "이번 주 금요일 할인 혜택 파리바게트 최대 30%", //목
//    "이번 주말 할인 혜택 아웃백/VIPS 50% 할인", //금
//    "이번 주말 할인 혜택 아웃백/VIPS 50% 할인"] //토
$(document).ready(function(){
//	var nowDate = new Date();
//	var weekDay = nowDate.getDay();
//	var conditionDate = new Date(2016, 8, 19);
//	if(nowDate.getTime() < conditionDate.getTime()){ 
//		$(".banner_line_banner img").attr("src", "/img/new_main/banner_tpay" + weekDay.toString() + ".png")
//									.attr("alt", lineBannersAlt[weekDay])
//									.parent().parent().show();
//	} else {
//		$(".banner_line_banner").hide();
//	}
	
	$(".banner_line_banner img").attr("src", "/img/new_main/line_banner_NCSI.png")
								.attr("alt", "3대 고객만족도 1위, 1등갑게 더 잘하라는 목소리에 귀 기울이겠습니다.")
								.parent().parent().show();
	$(".banner_line_banner img").parent().attr("href","#none").attr("title", "");
});