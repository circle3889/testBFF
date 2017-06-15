jQuery.noConflict();
jQuery.ajaxSetup({cache:false});
document.write("<script type='text/javascript' src='/inc/js/loginout.js'></script>");
document.write("<script type='text/javascript' src='/inc/js/jquery/jcombox-1.0b.packed.js'></script>");

var hn="";
var sn="";
var cn="";
var pn="";
var kn="";

var snavOn = 0;
var cnavOn = 0;
var cnavStatus = 0;
var menuAllDisplay = 0;

var iEvent_ME;
if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
	if(window.console) console.log("iOS Detected.");
	iEvent_ME = "click.snavOverOut";
} else {
	iEvent_ME = "mouseenter.snavOverOut";
}

var unique_requestid = function() {
	var timestamp = Number(new Date()).toString();
	var random = Math.random() * (Math.random() * 100000 * Math.random() );
	var unique = new String();
	unique = timestamp + random;
	return unique;
}
var is_touch_device = function() {
	try {
		document.createEvent("TouchEvent");
		return true;
	} catch (e) {
		return false;
	}
}
var getLeftPos = function(target) {
	if(target=="sn0"){
		return 118;
	} else {
		var tarPos = jQuery(".renew_gnb .snav ul li."+target).position();
		var tarWidth = jQuery(".renew_gnb .snav ul li."+target).width();
		return tarPos.left + tarWidth / 2 - 62 + 142;
	}
}
var getHeight = function(target) {
	var allbtnHeight = 0;
	if(jQuery(".renew_gnb .gnbCont .cnav_"+target+" dt").length>0) {
		allbtnHeight = jQuery(".renew_gnb .gnbCont .cnav_"+target+" dt").size() * 19 +5;
	}
	return jQuery(".renew_gnb .gnbCont .cnav_"+target+" dd").size() * 19 + 12 + allbtnHeight;
}
var chgGnbOn = function(target,ncode,isAni) {
	jQuery(".renew_gnb ."+target+" ul li").stop().css("backgroundPosition","0px 0px");
	if(isAni=="none") {
		jQuery(".renew_gnb ."+target+" ul li."+ncode).stop().css("backgroundPosition","0px -27px");
	} else {
		jQuery(".renew_gnb ."+target+" ul li."+ncode).stop().animate({"backgroundPosition" : "0px -27px"},{ queue:false, duration:250, easing:"sineEaseOut"});
	}
}
/* 2011-08-31 검색어 추천 */
var r_word = "회원 축제"; //검색어
var r_copy = "T world 회원을 위한 특별한 혜택! 회원 축제!"; //노출할 문구
var r_status = 0;
/* 2011-08-30 u코드 sniffing*/
var uValidate = function(ucodeString) {
	try {
		var errCode = new Array;
		errCode[0] = ["u99_99_99","u3_1"];

		for(i=0;i<errCode.length;i++) {
			var xp = new RegExp(ucodeString)
			if(xp.test(errCode[i][0])) {
				return errCode[i][1];
			} else {
				return ucodeString;
			}
		}
	} finally {
		errCode = null;
	}
}

var nlink = function() {
	var ncode = "";
	var ucode = "";
	var ucodeStr = "";
	var url = "";
	var prefix ="";
	try {
		for(i=0;i<arguments.length;i++) {
			if (i == 0) {
				prefix = "n";
			} else {
				prefix = "_";
			}
			ncode += prefix + arguments[i];
		}
		ucodeStr = eval(ncode).split("$")
		ucode = "u" + ucodeStr[0];
		url = eval(ucode).split("$")
		if(url[1]=="") {
			alert("준비중입니다");
		}else {
			//alert("메뉴 : "+ucodeStr[1]+"\n"+"ncode : "+ncode+"\n"+"ucode : "+ucode+"\n"+"URL : "+url[1]);
			location.href = url[1];
		}
	}catch(e) { alert("서비스 점검중입니다."); }
}

var loadGnb = function() {
	var ncode = "";
	var ucode = "";
	var ncodeStr = "";
	var prefix ="";
	var uniqueIdVal = unique_requestid();
	var argNum;
	var returnUrl = location.href;
	var memberActnUrl = "/jsp/common/loginout/control/ControlMultiSvcInfo.jsp";
	for(i=0;i<arguments.length;i++) {
		if(isNaN(arguments[i]) == false) {
			argNum = arguments.length;
			var loginSettings = jQuery.extend({
				returnUrl : returnUrl,
				uniqueID : uniqueIdVal
			}, {});
		} else {
			argNum = arguments.length -1;
			var loginSettings = jQuery.extend({
				viewId : "",
				svc_mgmt_num : "",
				displayMulti : "",
				returnUrl : "",
				secretYn : "",
				INIpluginData : "",
				mlt_ppay_dtl_typ_cd : "",
				mlt_bamt_cl_cd : "",
				mlt_pt_cl_cd : "",
				retturnParam : "",
				wire_svc_mgmt_num : "",
				returnUrl : returnUrl,
				uniqueID : uniqueIdVal
			}, arguments[i] ||{});
		}
	}
	for(j=0;j<argNum;j++) {
		if (j == 0) {
			prefix = "u";
		} else {
			prefix = "_";
		}
		ucode += prefix + arguments[j];
	}
	ucode = uValidate(ucode); //2011-08-30 u코드 sniffing
	ncodeStr = eval(ucode).split("$");
	ncode = ncodeStr[0].split("_");
	if(ncode.length==0) {
		return;
	} else if(ncode.length==1) {
		hn = ncode[0];
	} else if(ncode.length==2) {
		hn = ncode[0];
		sn = ncode[1];
	} else if(ncode.length==3) {
		hn = ncode[0];
		sn = ncode[1];
		cn = ncode[2];
	} else if(ncode.length==4) {
		hn = ncode[0];
		sn = ncode[1];
		cn = ncode[2];
		pn = ncode[3];
	} else if(ncode.length==5) {
		hn = ncode[0];
		sn = ncode[1];
		cn = ncode[2];
		pn = ncode[3];
		kn = ncode[4];
	}
	var subGnbUrl = "/html/gnb/subgnb_hn"+hn+".html";
	var gnbStr = "";
		gnbStr += "<div class='gnb_util'>";
		gnbStr += "	<a href='http://www.tworld.co.kr/jsp/fla_index.jsp'><img src='/img/gnb/tworld_logo.gif' alt='Tworld' class='logo' /></a>"; // 2011-08-24 수정
		gnbStr += "	<div id='gnb_search'>";
		gnbStr += "		<form action=\"http://www.tworld.co.kr/jsp/search/TotalSearch.jsp\" AUTOCOMPLETE=\"OFF\">";
		gnbStr += "		<input type='text' class='search_input' id='query' name='query' AUTOCOMPLETE='OFF' />";
		gnbStr += "		<a class='search_recomm_btn'>자동완성</a>";
		gnbStr += "		<a class='search_btn'><img src='/img/gnb/search/btn_search.gif' alt='검색' /></a>";
		gnbStr += "		</form>";
		gnbStr += "		<div class='search_recomm'>";
		gnbStr += "			<div class='recomm_list'></div>";
		gnbStr += "			<div class='recomm_btns png_bg'>";
		gnbStr += "				<a class='btnl'>끝단어 더보기</a>";
		gnbStr += "				<a class='btnr'>기능 끄기</a>";
		gnbStr += "			</div>";
		gnbStr += "		</div>";
		gnbStr += "	</div>";
		gnbStr += "	<div id='userContainer'></div>";
		gnbStr += "</div>";
		gnbStr += "<h1 class='gnb_title'><img src=\"/img/gnb/mnav/title_hn"+hn+".gif\"  /></h1>";
		gnbStr += "<div class='mnav'>";
		gnbStr += "	<ul>";
		gnbStr += "		<li class='hn1'><a>my Tworld</a></li>";
		gnbStr += "		<li class='hn3'><a>요금제</a></li>";
		gnbStr += "		<li class='hn4'><a>부가서비스</a></li>";
		gnbStr += "		<li class='hn5'><a>폰꾸미기</a></li>";
		gnbStr += "		<li class='hn6'><a>멤버십/이벤트</a></li>";
		gnbStr += "		<li class='hn25'><a>휴대폰</a></li>";
		gnbStr += "		<li class='hn2'><a>고객센터</a></li>";
		gnbStr += "	</ul>";
		gnbStr += "</div>";
		gnbStr += "<div class='mnav_sub'>";
		gnbStr += "	<a class='hn24'><img src='/img/gnb/mnav/mnav_sub_01.gif' alt='유선생활 B' /></a>";
		gnbStr += "	<a class='hn22'><img src='/img/gnb/mnav/mnav_sub_02.gif' alt='Tsmart shop' /></a>";
		gnbStr += "</div>";
		gnbStr += "<div class='snav'>";
		gnbStr += "</div>";
		gnbStr += "<div class='snav_sub'></div>";
		gnbStr += "<div class='cnav'>";
		gnbStr += "	<div class='cnavCont png_bg'></div>";
		gnbStr += "	<p class='png_bg'></p>";
		gnbStr += "</div>";
		gnbStr += "<div class='anav'></div>";
		gnbStr += "<div class='gnbCont'></div>";
	jQuery(".renew_gnb").append(gnbStr);

	gnbStr = null; //2011-08-23

	var snavOver = function(event) {
		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
			if(jQuery(this).is(".on")) {
				if(window.console) console.log("on:true");
				nlink(hn, jQuery(this).attr("class").replace("sn","").replace(" on",""));
			} else {
				if(window.console) console.log("on:false");
				jQuery(".renew_gnb .snav ul li").removeClass("on");
				jQuery(this).addClass("on");
			}
		}
		var tarSn = jQuery(this).attr("class").replace(" on","");
		chgGnbOn("snav",tarSn);
		if(jQuery(".renew_gnb .gnbCont .cnav_"+tarSn+" dd").size() != 0) {
			if(cnavStatus==0&&snavOn==0) {
				jQuery(".renew_gnb .cnav")
				.stop()
				.css("left" , getLeftPos(tarSn)+"px")
				.css("display","block")
				.find(".cnavCont")
				.stop()
				.animate({"height" : getHeight(tarSn)+"px"},{
					queue:false,
					duration:100,
					easing:"sineEaseIn",
					complete:function() {
						snavOn = 1;
						cnavStatus = 1;
						jQuery(".renew_gnb .cnav .cnavCont").html(jQuery(".renew_gnb .gnbCont .cnav_"+tarSn).clone());
						jQuery(".renew_gnb .cnav dl dd").add(".renew_gnb .cnav dl dt")
						.css("opacity","0.6")
						.hover(function() {jQuery(this).stop().css("opacity" , "1");}, function() {jQuery(this).stop().css("opacity" , "0.6");});
					}
				});
			} else {
				jQuery(".renew_gnb .cnav")
				.stop()
				.animate({"left" : getLeftPos(tarSn)+"px"},{ queue:false, duration:150, easing:"sineEaseIn"})
				.css("display","block")
				.find(".cnavCont")
				.stop()
				.animate({"height" : getHeight(tarSn)+"px"},{
					queue:false,
					duration:100,
					easing:"sineEaseIn",
					complete:function() {
						snavOn = 1;
						cnavStatus = 1;
						jQuery(".renew_gnb .cnav .cnavCont").html(jQuery(".renew_gnb .gnbCont .cnav_"+tarSn).clone());
						jQuery(".renew_gnb .cnav dl dd").add(".renew_gnb .cnav dl dt")
						.css("opacity","0.6")
						.hover(function() {jQuery(this).stop().css("opacity" , "1");}, function() {jQuery(this).stop().css("opacity" , "0.6");});
					}
				});
			}
		} else {
			jQuery(".renew_gnb .cnav")
			.stop()
			.animate({"left" : getLeftPos(tarSn)+"px"},{ queue:false, duration:150, easing:"sineEaseIn"})
			.css("display","none")
			.find(".cnavCont")
			.stop()
			.animate({"height" : getHeight(tarSn)+"px"},{
				queue:false,
				duration:100,
				easing:"sineEaseIn",
				complete:function() {
					snavOn = 1;
					cnavStatus = 1;
					jQuery(".renew_gnb .cnav .cnavCont").html(jQuery(".renew_gnb .gnbCont .cnav_"+tarSn).clone());
					jQuery(".renew_gnb .cnav dl dd")
					.css("opacity","0.6")
					.hover(function() {jQuery(this).stop().css("opacity" , "1");}, function() {jQuery(this).stop().css("opacity" , "0.6");});
				}
			});
		}
	}
	var snavOut = function(event) {
		var cnavHeight = jQuery(".renew_gnb .cnav .cnavCont dl").height() + 34;
		snavOn = 0;
		if(cnavOn==0&&snavOn==0) {
			jQuery(".renew_gnb .cnav")
			.stop()
			.find(".cnavCont")
			.stop()
			.animate({"height" : "0px"},{
				queue:false,
				duration:100,
				easing:"sineEaseIn",
				complete:function() {
					snavOn = 0;
					cnavStatus = 0;
					chgGnbOn("snav","sn"+sn,"none");
					jQuery(".renew_gnb .cnav .cnavCont").empty();
					jQuery(".renew_gnb .cnav").css("display","none");
				}
			});
		}
	}
	var snavOnlyOver = function(event) {
		var tarSn = jQuery(this).attr("class");
		chgGnbOn("snav",tarSn);
	}
/*검색 함수 */
	var searchStatus = 1; //검색 활성/비활성
	var firstMax;
	var lastMax;
	var searchKeyIndex = 0;
	var searchDesc = "펼치기";
	var searchActnUrl = "/jsp/search/suggest_ajax.jsp";
	var en_h = "rRseEfaqQtTdwWczxvg";
	var reg_h = "[" + en_h + "]";
	var en_b = {k:0,o:1,i:2,O:3,j:4,p:5,u:6,P:7,h:8,hk:9,ho:10,hl:11,y:12,n:13,nj:14,np:15,nl:16,b:17,m:18,ml:19,l:20}
	var reg_b = "hk|ho|hl|nj|np|nl|ml|k|o|i|O|j|p|u|P|h|y|n|b|m|l";
	var en_f = {"":0,r:1,R:2,rt:3,s:4,sw:5,sg:6,e:7,f:8,fr:9,fa:10,fq:11,ft:12,fx:13,fv:14,fg:15,a:16,q:17,qt:18,t:19,T:20,d:21,w:22,c:23,z:24,x:25,v:26,g:27}
	var reg_f = "rt|sw|sg|fr|fa|fq|ft|fx|fv|fg|qt|r|R|s|e|f|a|q|t|T|d|w|c|z|x|v|g|";
	var reg_exp = new RegExp("("+reg_h+")("+reg_b+")((?:"+reg_f+")(?=(?:"+reg_h+")(?:"+reg_b+"))|(?:"+reg_f+"))","g");

	var toKorean = function(str) {
		return str.replace(reg_exp,replacePP);
	}
	function replacePP(str,h,b,f) {
		return String.fromCharCode(en_h.indexOf(h)*21*28 + en_b[b]*28 + en_f[f] + 44032);
	}
	var	js_highlight = function(s, d, eq, is_suf) {
		var ret="";
		if (!is_suf) {
			ret=js_makehigh_pre(s, d);
		} else {
			ret=js_makehigh_suf(s, d);
		}
		if (ret=="") return s;
		else return ret;
	}

	var js_makehigh_pre = function(s, t) {
		var d="";
		var s1=s.replace(/ /g, "");
		var t1=t.replace(/ /g, "");
		var t2=t.replace(/ /g, "");
		var temp = "";
		var len = 0;
		t1=t1.toLowerCase();
		t2 = t2.toUpperCase();
		temp =t1;
		t1 = toKorean(t1);   // 영문오타 -> 한글 변환 (만약 영문이 한글로 변환되면 length 가 줄어드는 문제가 발생)
		if(t1 != s1.substring(0, t1.length)){
			d="<span>";
			for (var i=0,j=0; j<temp.length; i++) {
				if (s.substring(i, i+1)!=" ") j++;
				d+=s.substring(i, i+1);
			}
			d+="</span>"+s.substring(i, s.length);
		}else{
			d="<span>";
			for (var i=0,j=0; j<t1.length; i++) {
				if (s.substring(i, i+1)!=" ") j++;
				d+=s.substring(i, i+1);
			}
			d+="</span>"+s.substring(i, s.length);
		}
		return d;
	}

	var js_makehigh_suf = function(s, t) {
		var d="";
		var s1=s.replace(/ /g, "");
		var t1=t.replace(/ /g, "");
		var t2=t.replace(/ /g, "");
		var temp = "";
		t1=t1.toLowerCase();
		t2 = t2.toUpperCase();
		temp = t1;
		t1 = toKorean(t1);
		if(t1 != s1.substring(s1.length-t1.length)){
			for (var i=0,j=0; j<s1.length-temp.length; i++) {
				if (s.substring(i, i+1)!=" ") j++;
				d+=s.substring(i, i+1);
			}
			d+="<span>";
			for (var k=i,l=0; l<temp.length; k++) {
				if (s.substring(k, k+1)!=" ") l++;
				d+=s.substring(k, k+1);
			}
			d+="</span>";
		}else{
			for (var i=0,j=0; j<s1.length-t1.length; i++) {
				if (s.substring(i, i+1)!=" ") j++;
				d+=s.substring(i, i+1);
			}
			d+="<span>";
			for (var k=i,l=0; l<t1.length; k++) {
				if (s.substring(k, k+1)!=" ") l++;
				d+=s.substring(k, k+1);
			}
			d+="</span>";
		}
		return d;
	}
	var searchStr = function(keword) {
		var ke="";
		ke = trim_space_(keword) ;
		ke = ke.replace(/ /g, " ") ;
		ke = ke.replace(/\\/g, "") ;
		ke = ke.replace(/\'/g, "") ;
		ke = ke.replace(/&/g, "") ;
		ke = ke.replace(/|/g, "") ;
		ke = ke.replace(/ or /g, "") ;
		ke = ke.replace(/ and /g, "") ;
		ke = ke.replace(/ OR /g, "") ;
		ke = ke.replace(/ AND /g, "") ;
		ke = ke.replace(/-/g, "") ;
		ke = ke.replace(/ not /g, "") ;
		return ke;
	}
	var trim_space_ = function(keword) {
		var ke="";
		ke = keword.replace(/^ +/g, " ") ;
		ke = ke.replace(/ +$/g, "") ;
		ke = ke.replace(/ +$/g, " ") ;
		return ke ;
	}
	var recommList = function(keyword,textlist) {
		var firstArr =new Array('');
		var lastArr =new Array('');
		var fidx = 0;
		var lidx = 0;
		var seperator = 0;
		var qText = "";
		var aidx = 1;
		var tlength = 0;
		var ds="";
		for (i=0; i<textlist.length; i++) {
			if(textlist[i] == "^^") {
				seperator =1;
				continue;
			}
			if(seperator==0){
				firstArr[fidx++] = textlist[i];
			}else if(seperator == 1){
				lastArr[lidx++] = textlist[i];
			}
		}
		if(!firstMax) { firstMax = 10; }
		if(!lastMax) { lastMax = 13 - firstArr.length; }
		if(firstArr != null && firstArr != "") {
			qText += "<ul>";
			for (i=0; i<firstMax; i++) {
				if(firstArr[i] == null || firstArr[i] == "") break;
				ds = js_highlight(firstArr[i],keyword,keyword,0);
				qText += "<li class=\"key" + aidx + "\">" + ds + "</li>";
				aidx++;
			}
			qText += "</ul>";
		}
		if((firstArr != null && firstArr != "")&&(lastArr != null && lastArr != "")) {
			qText += "<div class=\"seperator\"></div>";
		}
		if(lastArr != null && lastArr != "") {
			qText += "<ul>";
			for (i=0; i<lastMax; i++) {
				if(lastArr[i] == null || lastArr[i] == "") break;
				ds = js_highlight(lastArr[i],keyword,keyword,1);
				qText += "<li class=\"key" + aidx + "\">" + ds + "</li>";
				aidx++;
			}
			qText += "</ul>";
		}
		jQuery("#gnb_search .recomm_list").html(qText);

		if(searchKeyIndex!=0) {
			searchKeyIndex = 1;
			jQuery("#gnb_search div.search_recomm li").removeClass("on");
			jQuery("#gnb_search div.search_recomm li.key"+searchKeyIndex).addClass("on");
		}
		if(lastMax < firstMax) {
			if(lastMax < lastArr.length) {
				jQuery("#gnb_search .recomm_btns a.btnl").css("display","block").text("끝단어 더보기").unbind("click.chgList").bind("click.chgList",function() {
					firstMax = 13 - lastArr.length;
					lastMax = 10;
					recommList(keyword,textlist);
				});
			} else {
				jQuery("#gnb_search .recomm_btns a.btnl").css("display","none");
			}

		}
		if(lastMax > firstMax) {
			if(firstMax < firstArr.length) {
				jQuery("#gnb_search .recomm_btns a.btnl").css("display","block").text("앞단어 더보기").unbind("click.chgList").bind("click.chgList",function() {
					firstMax = 10;
					lastMax = 13 - firstArr.length;
					recommList(keyword,textlist);
				});
			} else {
				jQuery("#gnb_search .recomm_btns a.btnl").css("display","none");
			}
		}
	}
	var searchQuery = function() { //검색어자동완성
		if((jQuery("#gnb_search .search_input").val() != "") && (jQuery("#gnb_search .search_input").val() != null) && (jQuery("#gnb_search .search_input").val() != r_copy)) {
			var keyword = jQuery("#gnb_search .search_input").val();
			jQuery.ajax({
				type: "post",
				data : {"query" : encodeURIComponent(searchStr(keyword))},
				dataType: "text",
				url: searchActnUrl,
				contentTypeString : "application/x-www-form-urlencoded",
				success: function(sresult) {
					sresult = sresult.replace(/\s*$/g,"")
					var listCat = sresult.split("&");
					var listData = new Array();
					try {
						for(i=0;i<listCat.length;i++){
							listCat[i] = listCat[i].split("=");
							listData[i] = listCat[i][1];
						}
						var firstList = listData[1].split(";");
						var lastList = listData[3].split(";");
						if(lastList != null && lastList !="") {
							firstList.splice(firstList.length,0,"^^");
						}
						var resultList = firstList.concat(lastList);

					} catch(e) {
						var resultList ="";
					}
					if((firstList == null || firstList =="") &&(lastList == null || lastList ==""))  {
						jQuery("#gnb_search .recomm_list").html("해당 단어로 시작하는 단어가 없습니다.");
						jQuery("#gnb_search .recomm_btns a.btnl").css("display","none");
					} else {
						recommList(keyword,resultList);
					}
				}

			});
		} else {
			jQuery("#gnb_search .recomm_list").empty();
			jQuery("#gnb_search .recomm_list").html("<p>현재 자동완성 기능을 사용하고 계십니다.</p>");
			jQuery("#gnb_search .recomm_btns a.btnl").css("display","none");
		}
	}
	var searchOn = function() { //검색어자동완성
		if(searchStatus != 0) {
			jQuery("#gnb_search div.search_recomm").css("display","block");
			jQuery("#gnb_search .search_recomm_btn").css("background-position","0px -12px").unbind(".searchOnOff").bind("click.searchOnOff", searchOff);
			searchQuery();
			searchDesc = "닫기";
			if(window.console) console.log("searchOn:true");
		} else {
			if(window.console) console.log("searchOn:false");
		}
	}
	var chgSearchStatus = function() {//검색어자동완성 비활성 -> 활성화
		searchStatus = 1;
		jQuery("#gnb_search div.search_recomm").css("display","block");
		jQuery("#gnb_search .search_recomm_btn").css("background-position","0px -12px").unbind(".searchOnOff").bind("click.searchOnOff", searchOff);
		searchQuery();
		searchDesc = "닫기";
		if(window.console) console.log("chgSearchStatus");
	}
	var searchOff = function() { //검색어자동완성 닫기
		jQuery("#gnb_search div.search_recomm").css("display","none");
		jQuery("#gnb_search .search_recomm_btn").css("background-position","0px 0px").unbind(".searchOnOff").bind("click.searchOnOff", searchOn);
		jQuery("#gnb_search .search_input").val("");
		jQuery("#gnb_search .recomm_list").empty();
		searchDesc = "펼치기";
		if(window.console) console.log("searchOff");
	}
	var searchDis = function() { //검색어자동완성 끄기
		searchStatus = 0;
		jQuery("#gnb_search div.search_recomm").css("display","none");
		jQuery("#gnb_search .search_recomm_btn").css("background-position","0px -24px").unbind(".searchOnOff").bind("click.searchOnOff", chgSearchStatus);
		jQuery("#gnb_search .search_input").val("");
		jQuery("#gnb_search .recomm_list").empty();
		searchDesc = "켜기";
		if(window.console) console.log("searchDis");
	}
/**/
	if(loginSettings.embedType == "iframe") {
		var ifrmParam = jQuery.param(loginSettings);
		var iframe = jQuery("<iframe />").attr({
			"src" : "http://www.tworld.co.kr" + memberActnUrl + "?" + ifrmParam,
			"name" : "IframeMultiLogin",//loginoutIfrm
			"id" : "IframeMultiLogin",//loginoutIfrm
			"frameborder" : "0",
			"width" : "500",
			"height" : "45",
			"scrolling" : "no",
			"marginwidth" : "0",
			"marginheight" : "0"
		});
		jQuery("#userContainer").append(iframe);
	} else if(loginSettings.embedType == "jsp") {
		jQuery("#userContainer").html(jQuery("div.userlogin"));
		jQuery("div.userlogin").css("display","block");
		loginSettings.embedType = "jsp";
	} else if(loginSettings.embedType == "ajax" || loginSettings.loginType == null || loginSettings.loginType == "") {
		loginSettings.embedType = "ajax";
		jQuery("#userContainer").load(memberActnUrl,loginSettings,function() {
			jQuery("div.userlogin").css("display","block");
		});
	}
	jQuery(".renew_gnb .mnav li").mouseenter(function() { //1depth on
		var tarHn = jQuery(this).attr("class");
		chgGnbOn("mnav",tarHn);
	});
	jQuery(".renew_gnb .mnav li").mouseleave(function() { //1depth off
		chgGnbOn("mnav","hn"+hn,"none");
	});
	jQuery(".renew_gnb .mnav li a").live("click", function() { //1depth link;
		nlink(jQuery(this).parent().attr("class").replace("hn",""));
	});
	jQuery(".renew_gnb .mnav_sub a").live("click", function() { //1depthsub link;
		nlink(jQuery(this).attr("class").replace("hn",""));
	});
/* 검색 init */
	jQuery("#gnb_search .search_recomm_btn").bind("click.searchOnOff", searchOn); //검색어자동완성 버튼
	jQuery("#gnb_search .search_recomm_btn").hover(function() {jQuery("#gnb_search .search_recomm_btn").after("<p class='infot'>자동완성 "+searchDesc+"</p>");}, function() {jQuery("#gnb_search p.infot").remove();});
	jQuery("#gnb_search .recomm_btns a").live({
		mouseenter:
			function() {
				jQuery(this).css("text-decoration" , "underline");
				if(jQuery(this).is(".btnr")) {
					jQuery("#gnb_search .recomm_btns a.btnr").after("<p class='info'>기능을 다시 켤 때는 <span></span> 을 클릭하세요!</p>");
				}
			},
		mouseleave:
			function() {
				jQuery(this).css("text-decoration" , "none");
				if(jQuery(this).is(".btnr")) {
					jQuery("#gnb_search div.search_recomm p.info").remove();
				}
			}
	});
	jQuery("#gnb_search .recomm_btns a.btnr").click(searchDis); //검색어 자동완성 끄기
	jQuery("#gnb_search div.search_recomm li").live("mouseenter", function(event) { //검색어 자동완성 선택(마우스)
		jQuery("#gnb_search div.search_recomm li").removeClass("on")
		jQuery(this).addClass("on");
		searchKeyIndex = jQuery("#gnb_search div.search_recomm li").index(jQuery(this)[0]) +1;
	});
	jQuery("#gnb_search .search_input").bind("keyup",function(event) { //검색어자동완성
		var keyCode = (window.event) ? event.which : event.keyCode;
		if(window.console) {console.log("keyup : "+ event.which);}
		if((keyCode == "38") || (keyCode == "40") || (keyCode == "27")) {
			if(window.console) console.log("truetrue");
		} else {
			if(window.console) console.log("searchGo!");
			searchOn();
		}
	});
	jQuery("#gnb_search .search_input").bind("keydown", function(event) { //검색어 자동완성 선택(키보드)
		var keyCode = (window.event) ? event.which : event.keyCode;
		if(window.console) console.log("keydown : "+ event.which);
		if(keyCode =="38") { //위화살표
			searchKeyIndex--;
			if(searchKeyIndex==0) {
				searchKeyIndex = jQuery("#gnb_search div.search_recomm li").size();
			}
			jQuery("#gnb_search div.search_recomm li").removeClass("on");
			jQuery("#gnb_search div.search_recomm li.key"+searchKeyIndex).addClass("on");
			jQuery(this).val(jQuery("#gnb_search div.search_recomm li.key"+searchKeyIndex).text());
		} else if(keyCode =="40") { //아래화살표
			if(searchKeyIndex==0) {
				jQuery("#gnb_search div.search_recomm").css("display","block");
				jQuery("#gnb_search .search_recomm_btn").css("background-position","0px -12px").unbind(".searchOnOff").bind("click.searchOnOff", searchOff);
			}
			searchKeyIndex++;
			if(searchKeyIndex > jQuery("#gnb_search div.search_recomm li").size()) {
				searchKeyIndex = 1;
			}
			jQuery("#gnb_search div.search_recomm li").removeClass("on");
			jQuery("#gnb_search div.search_recomm li.key"+searchKeyIndex).addClass("on");
			jQuery(this).val(jQuery("#gnb_search div.search_recomm li.key"+searchKeyIndex).text());
		} else if (keyCode =="27") { //ESC
			searchKeyIndex = 0;
			searchOff();
		}
	});
	jQuery("#gnb_search div.search_recomm li").live("click", function(event) {
		jQuery("#gnb_search .search_input").val(jQuery(this).text());
		window.setTimeout(function() {
			jQuery("#gnb_search form").submit();
		}, 500);
	});
	//if(hn != 14) {
		jQuery("#gnb_search .search_input").val(r_copy);
	//}
	jQuery("#gnb_search .search_btn").click(function() {
		if(r_status == 0) {
			location.href = "http://www.tworld.co.kr/jsp/search/TotalSearch.jsp?query="+r_word;
		} else {
			jQuery("#gnb_search form").submit();
		}
	});
	jQuery("#gnb_search .search_input").bind("focus",function() {
		jQuery("#gnb_search .search_input").val("");
		r_status++;
	});
	jQuery("#gnb_search form").bind("submit",function(){
		if(jQuery("#gnb_search .search_input").val() == "") {
			alert("검색어를 입력하시기 바랍니다");
			return false;
		}
	});


	/*
	jQuery("#gnb_search .search_input").blur(function() {
		if(window.console) console.log("blur!!");
		if(jQuery("#gnb_search .search_input").val()=="") {
			searchOff();
		}
	});
	*/

/* init start */
	jQuery(".renew_gnb .gnbCont").load(subGnbUrl, function() {
		jQuery(".renew_gnb .snav").html(jQuery(".renew_gnb .gnbCont .snav_hn"+hn));
		chgGnbOn("mnav","hn"+hn);
		chgGnbOn("snav","sn"+sn);
		jQuery(".renew_gnb .mnav_sub a img").css("opacity","0.6").hover(function() {jQuery(this).stop().css("opacity" , "1");}, function() {jQuery(this).stop().css("opacity" , "0.6");});
		jQuery(".renew_gnb .snav ul li").bind(iEvent_ME, snavOver);
		jQuery(".renew_gnb").bind("mouseleave.snavOverOut", snavOut);
		if(is_touch_device()==true) {
		} else {
			jQuery(".renew_gnb .cnav .cnavCont").mouseenter(function() { //3depth box on
				cnavOn = 1;
				cnavStatus = 1;
				jQuery(".renew_gnb .cnav").stop().find(".cnavCont").stop();
			});
			jQuery(".renew_gnb .cnav .cnavCont").mouseleave(function() { //3depth box off
				cnavOn = 0;
				if(cnavOn==0&&snavOn==0) {
					jQuery(".renew_gnb .cnav")
					.stop()
					.find(".cnavCont").stop().animate({"height" : "0px"},{ queue:false, duration:100, easing:"sineEaseIn",  complete:function() {snavOn = 0;cnavStatus = 0;chgGnbOn("snav","sn"+sn,"none");jQuery(".renew_gnb .cnav .cnavCont").empty();jQuery(".renew_gnb .cnav").css("display","none");}});
				}
			});
		}
		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
		} else {
			jQuery(".renew_gnb .snav ul li").bind("click", function() { //2depth link;
				if(is_touch_device()==true) {
					if(jQuery(this).is(".on")) {
						nlink(hn, jQuery(this).attr("class").replace("sn","").replace(" on",""));
					} else {
							jQuery(".renew_gnb .snav ul li").removeClass("on");
							jQuery(this).addClass("on");
					}
				} else {
					nlink(hn, jQuery(this).attr("class").replace("sn",""));
				}
			});
		}


		jQuery(".renew_gnb .cnav .cnavCont dl dd a").live("click", function() { //3depth link;
			nlink(hn, jQuery(this).parent().parent().attr("class").replace("cnav_sn",""), jQuery(this).parent().attr("class").replace("cn",""));
		});
		if(hn != 14) {
			jQuery(".renew_gnb .gnb_title img").css("cursor","pointer").live("click",function() {
				nlink(hn);
			});
		}
		jQuery(".renew_gnb .cnav p").live("click", snavOut);

		if(jQuery(".renew_gnb .gnbCont .snav_subitem").length) { //우측 노출메뉴
			jQuery(".renew_gnb .snav_sub").html(jQuery(".renew_gnb .gnbCont .snav_subitem"));
			jQuery(".renew_gnb .snav_sub a").hover(function() {jQuery(this).stop().css("backgroundPosition" , "0px -27px");}, function() {jQuery(this).stop().css("backgroundPosition" , "0px 0px");});
		}
	/* 전체메뉴 */
		if(jQuery(".renew_gnb .gnbCont .snav_all").length) {
			jQuery(".renew_gnb").append("<img src=\"/img/gnb/snav/snav_hn"+hn+"_all_btn.gif\" class=\"snav_all_btn\" alt=\"\" />");
			jQuery(".renew_gnb .anav").append(jQuery(".renew_gnb .gnbCont .snav_all"));
			var snavAllHeight = jQuery(".renew_gnb .anav .snav_all").height();
			if(jQuery.browser.msie && jQuery.browser.version=="6.0") {
				jQuery(".renew_gnb .anav .snav_all").append("<img src=\"/img/gnb/cover.gif\" class=\"coverImg\" alt=\"\" usemap=\""+jQuery(".renew_gnb .anav .snav_all").find(".png_bg").attr("usemap")+"\" />").find(".coverImg").height(snavAllHeight+"px");
				jQuery(".renew_gnb .anav .snav_all").find(".png_bg").removeAttr("usemap");
			}
			jQuery(".renew_gnb .anav .snav_all").css("marginTop", -snavAllHeight).append("<img src=\"/img/gnb/btn_close.gif\" class=\"snav_all_btn_close\" alt=\"\" />");
			jQuery(".renew_gnb .snav_all_btn").click(function() {
				if(menuAllDisplay==0) {
					jQuery(".renew_gnb .snav ul li").unbind(".snavOverOut");
					jQuery(".renew_gnb .snav ul li").bind("mouseenter.snavOnlyOverOut", snavOnlyOver);
					jQuery(".renew_gnb .anav").css("display","block").find(".snav_all").css("display","block").animate({"margin-top" : "0px"},{queue:false, duration:200, easing:"sineEaseIn"});
					menuAllDisplay = 1;
				} else {
					jQuery(".renew_gnb .anav .snav_all")
					.animate({"margin-top" : -snavAllHeight},{
						queue:false,
						duration:200,
						easing:"sineEaseIn",
						complete:function() {
							jQuery(".renew_gnb .anav .snav_all").css("display","none");
							jQuery(".renew_gnb .snav ul li").unbind(".snavOnlyOverOut");
							jQuery(".renew_gnb .snav ul li").bind(iEvent_ME, snavOver);
							jQuery(".renew_gnb").bind("mouseleave.snavOverOut", snavOut);
						}
					});
					menuAllDisplay = 0;
				}
			});
			jQuery(".renew_gnb .snav_all_btn_close").click(function() {
				jQuery(".renew_gnb .anav .snav_all")
				.animate({"margin-top" : -snavAllHeight},{
					queue:false,
					duration:200,
					easing:"sineEaseIn",
					complete:function() {
						jQuery(".renew_gnb .anav .snav_all").css("display","none");
						jQuery(".renew_gnb .snav ul li").unbind(".snavOnlyOverOut");
						jQuery(".renew_gnb .snav ul li").bind(iEvent_ME, snavOver);
						jQuery(".renew_gnb").bind("mouseleave.snavOverOut", snavOut);
					}
				});
				menuAllDisplay = 0;
			});
		}
	/* 전체메뉴(메뉴별) */
		if(jQuery(".renew_gnb .gnbCont .cnav_all").length) {
			jQuery(".renew_gnb .anav").append(jQuery(".renew_gnb .gnbCont .cnav_all"));
			jQuery(".renew_gnb .anav .cnav_all").each(function(n) {
				var thisCnavId = this.id;
				var thisCnavHeight = jQuery(this).height();
				if(jQuery.browser.msie && jQuery.browser.version=="6.0") {
					jQuery(this).append("<img src=\"/img/gnb/cover.gif\" class=\"coverImg\" alt=\"\" usemap=\""+jQuery(this).find(".png_bg").attr("usemap")+"\" />").find(".coverImg").height(thisCnavHeight+"px");
					jQuery(this).find(".png_bg").removeAttr("usemap");
				}
				jQuery(this).css("marginTop", -thisCnavHeight).append("<img src=\"/img/gnb/btn_close.gif\" class=\"cnav_all_btn_close\" alt=\"\" />");
				jQuery(".renew_gnb .cnav .cnavCont dl."+thisCnavId.replace("_all","")+" dt a").live("click",function() {
					snavOut();
					jQuery(".renew_gnb .snav ul li").unbind(".snavOverOut");
					jQuery(".renew_gnb .snav ul li").bind("mouseenter.snavOnlyOverOut", snavOnlyOver);
					jQuery(".renew_gnb .anav").css("display","block").find("#"+thisCnavId).css("display","block").animate({"margin-top" : "0px"},{queue:false, duration:200, easing:"sineEaseIn"});
				});
				jQuery(".renew_gnb #"+thisCnavId).find(".cnav_all_btn_close").click(function() {
					jQuery(".renew_gnb .anav #"+thisCnavId)
					.animate({"margin-top" : -thisCnavHeight},{
						queue:false,
						duration:200,
						easing:"sineEaseIn",
						complete:function() {
							jQuery(".renew_gnb .anav .cnav_all").css("display","none");
							jQuery(".renew_gnb .snav ul li").unbind(".snavOnlyOverOut");
							jQuery(".renew_gnb .snav ul li").bind(iEvent_ME, snavOver);
							jQuery(".renew_gnb").bind("mouseleave.snavOverOut", snavOut);
						}
					});
				});
			});
		}
		/* onkeyup */
		var keyFix = new beta.fix("query");
	});
}

/* 간단gnb */
var loadCommonGnb = function(curhn) {
	var commongnb ="";
		commongnb +="<div class=\"renew_gnb\">";
		commongnb +="	<h1 class='gnb_title'><a href=\"http://www.tworld.co.kr\"><img src=\"/img/gnb/tworld_logo.gif\" /></a></h1>";
		commongnb +="	<div class='mnav'>";
		commongnb +="		<ul>";
		commongnb +="			<li class='hn1'><a>my Tworld</a></li>";
		commongnb +="			<li class='hn3'><a>요금제</a></li>";
		commongnb +="			<li class='hn4'><a>부가서비스</a></li>";
		commongnb +="			<li class='hn5'><a>폰꾸미기</a></li>";
		commongnb +="			<li class='hn6'><a>멤버십/이벤트</a></li>";
		commongnb +="			<li class='hn25'><a>휴대폰</a></li>";
		commongnb +="			<li class='hn2'><a>고객센터</a></li>";
		commongnb +="		</ul>";
		commongnb +="	</div>";
		commongnb +="	<div class='mnav_sub'>";
		commongnb +="		<a class='hn24'><img src='/img/gnb/mnav/mnav_sub_01.gif' alt='유선생활 B' /></a>";
		commongnb +="		<a class='hn22'><img src='/img/gnb/mnav/mnav_sub_02.gif' alt='Tsmart shop' /></a>";
		commongnb +="	</div>";
		commongnb +="</div>";
//	jQuery("#Header").append(commongnb);
	document.write(commongnb);
	if (curhn) {
		var hn = curhn;
	} else {
		var hn = 0;
	}
	jQuery(".renew_gnb .mnav li").mouseenter(function() { //1depth on
		var tarHn = jQuery(this).attr("class");
		chgGnbOn("mnav",tarHn);
	});
	jQuery(".renew_gnb .mnav li").mouseleave(function() { //1depth off
		chgGnbOn("mnav","hn"+hn,"none");
	});
	jQuery(".renew_gnb .mnav li a").live("click", function() { //1depth link;
		nlink(jQuery(this).parent().attr("class").replace("hn",""));
	});
	jQuery(".renew_gnb .mnav_sub a").live("click", function() { //1depthsub link;
		nlink(jQuery(this).attr("class").replace("hn",""));
	});
	jQuery(".renew_gnb .mnav_sub a img").css("opacity","0.6").hover(function() {jQuery(this).stop().css("opacity" , "1");}, function() {jQuery(this).stop().css("opacity" , "0.6");});
}

/* 2011-08-23 [s] */
jQuery(window).unload(function() {
	keyFix = null;
	reg_exp = null;
	searchOn = null;
	searchOff = null;
	searchDis = null;
	searchStr = null;
	trim_space_ = null;
	js_makehigh_suf = null;
	js_makehigh_pre = null;
	js_highlight = null;
	recommList = null;
	searchQuery = null;
	chgSearchStatus = null;
	unique_requestid = null;
	is_touch_device = null;
	getHeight = null;
	getLeftPos = null;
	chgGnbOn = null;
	snavOver = null;
	snavOut = null;
	snavOnlyOver = null;
	nlink = null;
	loadCommonGnb = null;
	loadGnb = null;
});
/* 2011-08-23 */