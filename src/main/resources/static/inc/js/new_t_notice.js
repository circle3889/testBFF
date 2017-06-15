$(document).ready(function(){
	fnGetOutLink();
	if(!MobileUA.ANDROID){
		$("#onlyShowinAndroid").hide();
	}
	$(".notice.copyright").removeClass("notice_copy");
	$(".sect_wrap .sect .tit").show();
}); 

//아이프래임 리사이징
function resizeTopIframe(dynheight) {
	$('iframe').height(parseInt(dynheight));  
	$('.tdirect_iframe_wrapper').height(parseInt(dynheight));
	//if(dynheight == 0) $('iframe').hide();

	/* 2016-09-06 추가_01 [s] */
	var h_header = $("header").height();
	var h_section = $("section").height();
	var bodyHeight = h_header + h_section;
	
	if(bodyHeight > $(window).height()){ 
		$(".notice.copyright").removeClass("notice_copy");
	}
	/* 2016-09-06 추가_01 [e] */
}

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

function fnChkOSType(osType){
	if(osType.toUpperCase() == "X") return true;
	else if(osType.toUpperCase() == "I" && MobileUA.IOS) return true;
	else if(osType.toUpperCase() == "A" && MobileUA.ANDROID) return true;
	else return false
}

function fnGetOutLink() {
	
	var now = new Date();
	var rndTime = now.getTime();
	$.ajax('http://m2.tworld.co.kr/json/t_out_link.json' + '?' + rndTime.toString(), {
	      success: function(data) {
	         fnSetOutLink(data)
	      },
	      error: function(status) {
	         console.log(status);
	      }
	   });
}
function fnSetOutLink(data){
	var strHTML = "";
	var data = JSON.parse(data);
	if(data.talert_out_link != undefined && (data.talert_out_link.mapp_subj_cnts !=undefined && data.talert_out_link.mapp_subj_cnts.length != 0)){
		$("#tNotice_outLink_title").html(data.talert_out_link.talert_subj_nm);
//		$("#tNotice_outLink_contents").empty();
		$(".articleList").empty();
		for(var i=0; i<data.talert_out_link.mapp_subj_cnts.length; i++){
			if(fnChkOSType(data.talert_out_link.mapp_subj_cnts[i].mbl_os_typ_cd)){
				var strHTML = '<li class="item">'
					+ '<a href="javascript:fnTalertGotoLiknk(\''
					+ data.talert_out_link.mapp_subj_cnts[i].link_url
					+ '\', \'' 
					+ data.talert_out_link.mapp_subj_cnts[i].bill_yn
					+ '\', \''
					+ data.talert_out_link.mapp_subj_cnts[i].bill_chnl_inout_cl_cd
					+ '\', \''
					/* 2016-03-10 추가 [s] 통계 코드 파라미터 추가 */
					+ data.talert_out_link.mapp_subj_cnts[i].stc_cd
					+ '\', \''
					/* 2016-03-10 추가 [e] 통계 코드 파라미터 추가 */
					+ data.talert_out_link.mapp_subj_cnts[i].mbl_os_typ_cd
					+ '\');" title="'
					+ data.talert_out_link.mapp_subj_cnts[i].link_title_nm // 링크 타이클 필요(앱 접근성)
					+ '"><span class="dvImg"><img src="'
					+ data.talert_out_link.mapp_subj_cnts[i].img_file_path_nm1
					+ '" alt="'
					+ data.talert_out_link.mapp_subj_cnts[i].webacc_img_alt_ctt //이미지 대체텍스트(앱 접근성)
					+ '"></span><span class="dvTxt"><span class="flex"><strong class="dvt"><span>'
					+ data.talert_out_link.mapp_subj_cnts[i].talert_cnts_nm
					+ '</span>'
					+ data.talert_out_link.mapp_subj_cnts[i].talert_cnts_desc
					+ '</strong></span></span></a></li>';
				//$("#tNotice_outLink_contents").append(strHTML);
				$(".articleList").append(strHTML);
			}
		}
	}
}