function autoIframe(frameId)
{
	try{
		frame=document.getElementById(frameId);
		innerDoc=(frame.contentDocument) ? frame.contentDocument:frame.contentWindow.document;
		objToResize=(frame.style) ? frame.style : frame;
		objToResize.height=innerDoc.body.scrollHeight+40;
		objToResize.width=innerDoc.body.scrollWidth;
		alert(objToResize.height)
		alert(objToResize.width)
	}catch(err){
		window.status=err.message;
	}
}

function doResizeSearch() {
 var ParentFrame  = ifrmsearch.document.body;
 var ContentFrame = document.all["ifrmsearch"];
 ContentFrame.style.height = ParentFrame.scrollHeight + (ParentFrame.offsetHeight - ParentFrame.clientHeight) +100;
}


function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

function MM_showHideLayers() { //v6.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
var search_promotion = true;
//var RcmdServer = "http://211.218.209.42/suggest/rcmdWeb.cgi?wordCount=20&rcmdWord=";
var RcmdServer = "/jsp/search/suggest.jsp";
var RcmdServer_ff = "/jsp/search/suggest.jsp";
var Td_;
var Ip_;
var top_position_;
var left_position_;
var wi_int_;
var bak_="",old_="" ;
var table_width_;
var ke;

function setDefaultAutoComplete_ (objTextBox, valTopPosition, valLeftPosition, valTimeout) {
	Ip_ = objTextBox;
	table_width_ = 200;
	wi_int_ = valTimeout;
	bak_=old_=Ip_.value;
}

 var g_ie5_=0;
 function get_nav_() {
	var ver=navigator.appVersion ;
	 if (navigator.appName.indexOf("Microsoft")!=-1 && ver.indexOf("MSIE 4")==-1 && ver.indexOf("MSIE 3")==-1) {
		if (ver.indexOf("MSIE 5.0")!=-1)
			g_ie5_=1;
		return 1;
	 } else if (navigator.appName.indexOf("Netscape")!=-1) { 
		 return 2; 
	 } else { 
	 	return 0; 
	 }
 }

 function chk_rt_(t_) {
		//if (t_!=1) return 0;
		try {
			Td_=document;
		} catch (e) {
			return 0;
		}
		return 1;
 }

 var t_=get_nav_();
 var c_=chk_rt_(t_);
 var m_on_=0,m_now_=0,s_now_=0,shl_=0,a_now_=0,a_on_=0,arr_on_=0,frm_on_=0 ;
 var cn_use_="use_ac" ;
 var B_="block",I_="inline",N_="none",UD_="undefined" ;
 var qs_ac_list_="",qs_ac_id_="",qs_q_="",qs_m_=0,qs_ac_len_=0, qs_ac_cnt_list_ = "";
 //var acuse_=getCookie_ (cn_use_);
 //if (acuse_=="") 
 var acuse_=1;
 var cc_= new Object() ;
 
 if ((t_==1||t_==2) && c_==1) {
	function wd_() {
		 var a = top_position_;
		 var b = left_position_;
		 //document.getElementById("ac_body_").style.top = a+"px";
		 //document.getElementById("ac_body_").style.left = b + "px";
		 //document.getElementById("ac_table_").style.width = table_width_ +"px";

		if (acuse_==1) Ip_.autocomplete = "off" ;
		else if (acuse_==0) Ip_.autocomplete = "on" ;
		Ip_.onclick = req_ipc_ ;
		Ip_.onblur = dis_p_ ;
		Td_.onclick = dis_p_;
	}

	 var dnc_=0;
	 function req_ipc_() {
		dnc_=1;
		frm_on_=0;
		req_ac2_(1) ;
	 }

	 function dis_p_() {
		if (dnc_) {
			 dnc_=0;
			return ;
		}
		if (arr_on_) {
			return ;
		}
		if (frm_on_) {
			return ;
		}
		alw=0 ;
		ac_hide_() ;
	 }

	function req_ac2_(me) {
		if (Ip_.value == "" || acuse_==0 ) return ;
		if (a_on_ && dnc_) {
			ac_hide_() ;
			return ;
		}
		var o = get_cc_(me) ;
		if (o && o[1][0] != "" ) ac_show_(o[0], o[1], o[2], me) ;
		else reqAC_(me) ;
	}

	 var _req_ = null;
	 /* function get_req_() {
		 if(_req_ && _req_.readyState!=0) {
			 _req_.abort() ;
		 }
		 try {
			 _req_ = new ActiveXObject("Msxml2.XMLHTTP.3.0") ;
		 } catch (e) {
			 try {
				 _req_ = new ActiveXObject("Microsoft.XMLHTTP") ;
			 } catch (e) {
				 _req_ = false ;
			 }
		}
		 try{
		 _req_ = new ActiveXObject("Microsoft.XMLHTTP") ;
		 }catch(e){
			 _req_ = new XMLHttpRequest() ;
		 }
		//_req_ = new XMLHttpRequest() ;
		//if (!_req_ && typeof XMLHttpRequest!=UD_)
		return _req_ ;
	 }*/
	 
	function get_req_()
	{
		if(window.ActiveXObject) {
			try {
					return new ActiveXObject("Msxml2.XMLHTTP") ;
			} catch (e) {
				try {
					return new ActiveXObject("Microsoft.XMLHTTP") ;
				} catch (e2) {
					return null ;
				}
			}
		} else if(window.XMLHttpRequest){
			 //Win Mac Linux m1,f1,o8 Mac s1 Linux k3占쏙옙
			return new XMLHttpRequest() ;
		} else {
			return null ;
		}

	}
	 
	 function showAC_() {		 
		 //if (_req_.readyState==4 && _req_.responseText && _req_.status==200) {
			 //alert(_req_.responseText);
			 try{
				 eval(_req_.responseText) ;
			 }catch(e){
				 var qs_q_=''; var qs_m_='1'; var qs_ac_id_='1'; var qs_ac_list_=new Array(''); 
			 }
			 alert(_req_.responseText);
			 //alert(_req_.responseText);
			 set_cc_(qs_q_, qs_ac_list_, qs_m_) ;
			 ac_show_(qs_q_, qs_ac_list_, qs_ac_id_, qs_m_) ;
		// }
	 }
	 
	 function showResponse(oj) {		 
		 //if (_req_.readyState==4 && _req_.responseText && _req_.status==200) {
			 //alert(_req_.responseText);
			 try{
				 eval(oj.responseText) ;
			 }catch(e){
				 var qs_q_=''; var qs_m_='1'; var qs_ac_id_='1'; var qs_ac_list_=new Array(''); 
			 }
			 set_cc_(qs_q_, qs_ac_list_, qs_m_) ;
			 ac_show_(qs_q_, qs_ac_list_, qs_ac_id_, qs_m_) ;
		// }
	 }
	 
	 function sendRequest(callback,url,data,method)
	 {
	 	var oj = get_req_();
	 	_req_=oj;
	 	if( oj == null ) return null;
	 	
	 	var ua = navigator.userAgent;
	 	var safari	= ua.indexOf("Safari")!=-1;
	 	var konqueror = ua.indexOf("Konqueror")!=-1;
	 	var mozes	 = ((a=navigator.userAgent.split("Gecko/")[1] )
	 			?a.split(" ")[0]:0) >= 20011128 ;
	 	
	 	if(window.opera || safari || mozes){
	 		oj.onload = function () { callback(oj) };
	 	} else {	 	
	 		oj.onreadystatechange =function () 
	 		{
	 			if ( oj.readyState == 4 ){
	 				callback(oj);
	 			}
	 		}	 		
	 	}	
	 	
	 	/*
	 	 * IE가 아닐경우 POST로 사용한다. 
	 	 */
	 	if(window.opera || safari || mozes){	 			
	 		method="POST";
			oj.open("POST",RcmdServer_ff);
			oj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
			oj.send(data);
 		}	 	
	 	else
	 	{
	 		url = url +"?"+data;
	 		oj.open(method,url);
	 		oj.send(null);
	 	}	 	 	 	
	 }
	 
	 function reqAC_(me) {
		 var sv ;
		 var stripped = "";

		 ke=trim_space_(Ip_.value, me) ;
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

		 if ((ke == "")||(ke == "or")||(ke == "and")||(ke=="not")) {
			 ac_hide_() ;
			 return ;
		 }
       var lastChar = ke.charAt (ke.length - 1);
       //
       //sv = RcmdServer + ke;
       sv = RcmdServer + ke;
       ke="query="+ke;
       sendRequest(showResponse,RcmdServer,ke,"GET");
	 }

	 function ac_show_(aq, al, ai, am) {
		 if (aq && aq!="" && aq!=trim_space_(Ip_.value, am)) return ;
		 qs_q_ = aq ;
		 qs_m_ = am ;
		 qs_ac_list_ = al ;
		 qs_ac_id_ = ai ;
		 qs_ac_len_ = qs_ac_list_.length;
		 var h = (qs_ac_len_ > 9) ? 9 : qs_ac_len_ ;
		 h = h * 20 ;

		 print_ac_() ;

		 if (qs_ac_list_[0] == "" && (qs_m_==1 || qs_m_==2)) {
			 qs_ac_len_=1;
			 h=20;
			 if (qs_ac_list_[0] == "") h = h+20;
		 }
		 document.getElementById("scrol_").style.height = h;

		 if (qs_ac_len_) {
			 h+=41;
			 a_on_=1;
		 } else {
			 a_on_=0;
		 }
		 document.getElementById("ac_body_").width = 255;
		 document.getElementById("ac_body_").height = h ;
		 //document.getElementById("ac_table_").style.width = table_width_;

		 document.getElementById("ac_body_").style.display = B_;
		//var IfrRef = document.getElementById('DivShim');
		//IfrRef.style.display = B_;

		 if (a_on_) {
			 set_acpos_(0);
			 document.getElementById("scrol_").scrollTop=0;
			 Ip_.onkeydown = ackhl_;
		 }
	 }

	 function set_acpos_(v) {
		a_now_ = v;
		setTimeout('set_ahl_();', 10);
	 }

	 function set_ahl_() {
		 if (!a_on_) return;
		 var o1, o2;
		 for (i=0;  i< qs_ac_len_ ; i++) {
			o1 = eval("document.getElementById('ac" + (i+1) + "_')");
			if ((i+1) == a_now_) o1.style.backgroundColor = "#DDECCC";
			else o1.style.backgroundColor = "";
		}
	 }

	 var max_row_=4;
	 function ackhl_() {
		 var e=window.event ;
		 var o1, o2 ;
		 if (e.keyCode==39) {
			 req_ac2_(1) ;
		 }
		 if (e.keyCode==40 || (e.keyCode==9 && !e.shiftKey)) {
			 if (m_on_) return ;
			 if (!a_on_) {
				 req_ac2_(1) ;
				 return ;
			}
			if (a_now_ < qs_ac_len_) {
				if (a_now_ == 0) bak_ = Ip_.value ;
				a_now_++ ;
				if (a_now_ > max_row_) document.getElementById("scrol_").scrollTop = parseInt((a_now_-1)/max_row_)*max_row_*20 ;
				 o1 = eval('ac' + a_now_ + '_') ;
				 o2 = eval('acq' + a_now_ + '_') ;
				 old_ = Ip_.value = o2.outerText ;
				 Ip_.focus() ;
				 set_ahl_() ;
				 e.returnValue = false;
			 }
		 }
		 if (a_on_ && (e.keyCode==38 || (e.keyCode==9 && e.shiftKey))) {
			 if (!a_on_) return ;
			 if (a_now_ <= 1) {
				 ac_hide_() ;
				 old_ = Ip_.value = bak_ ;
			 }
			 else {
				 a_now_-- ;
				 if ((qs_ac_len_-a_now_)+1 > max_row_) document.getElementById("scrol_").scrollTop = (qs_ac_len_-(parseInt((qs_ac_len_-a_now_)/max_row_)+1)*4)*20 ;
				 o1 = eval('ac'+ a_now_ + '_') ;
				 o2 = eval('acq' + a_now_ + '_') ;
				 old_ = Ip_.value = o2.outerText ;
				 Ip_.focus() ;
				 set_ahl_() ;
				 e.returnValue = false ;
			 }
		 }
	 }

	 function print_ac_() {
		 if (qs_ac_list_[0] == "") {
			 document.getElementById("scrol_").innerHTML = get_ac0_() ;
		 }
		 else {
			 document.getElementById("scrol_").innerHTML = get_aclist_() ;
		 }
		 document.getElementById("ac_body_").style.display = B_ ;
		//var IfrRef = document.getElementById('DivShim');
		//IfrRef.style.display = B_;
		 //setTimeout('set_ahl_();', 10) ;
		 setTimeout('set_ahl_();', 30) ;
	 }

	 function get_aclist_() {
		 var d="",ds="",l=0,s="" ;
		 var dscnt = 0;
		 if (qs_ac_list_[0] != "") {
			 //s += "<table style='width:253px;' border=0 cellspacing=0 cellpadding=0>" ;
			 for (i=0; i<qs_ac_len_; i++) {
				 ds = d = qs_ac_list_[i];
				 //dscnt = qs_ac_cnt_list_[i];
				 l = js_strlen_(d);
				 if (l > 40) ds = js_substring_(d, 0, 40) + "..." ;
         			 ds = js_highlight(ds, qs_q_, qs_q_, 0);         			
				 //s += "<a href='javascript:get_re_search2();'>" ;
				 //s += "<tr height=20 id='ac" + (i+1) + "_' onmouseover=\"set_acpos_('" + (i+1) + "')\" onmouseout=\"set_acpos_(0); \" onclick=\"set_acinput_('" + (i+1) + "')\" style=\"this.style.backgroundColor=''\">" ;
				 //s += "<li  id='ac" + (i+1) + "_' onmouseover=\"set_acpos_('" + (i+1) + "')\" onmouseout=\"set_acpos_(0); \" onclick=\"set_acinput_('" + d + "')\" style=\"this.style.backgroundColor=''\">" ;
				 s += "<li  id='ac" + (i+1) + "_'  onmouseover=\"javascript:set_acpos_('" + (i+1) + "');\" style=\"cursor:'hand';\" onmouseout=\"set_acpos_(0); \" onclick=\"set_acinput_('" + d + "')\" style=\"this.style.backgroundColor=''\">" ;
				 s += "<a href=\"javascript:get_re_search2();set_acinput_('" + d + "');\">" + ds +"</a>";
				 s += "</li>" ;
				 //s += "</a>";
				 s += "<span id='acq" + (i+1) + "_' style='display:none; width:0px; height:0px;'>" + d + "</span>" ;
			 }
			// s += "</table>" ;
		 }
		 return s ;
	 }


	function js_highlight(s, d, eq, is_suf) { 
		var ret=""; 
		if (!is_suf) { 
			ret=js_makehigh_pre(s, d); 
			if (ret=="") ret=js_makehigh_pre(s, eq); 
		} else { 
			 ret=js_makehigh_suf(s, d); 
			 if (ret=="") ret=js_makehigh_suf(s, eq); 
		} 
		 if (ret=="") return s; else return ret; 
	} 

	function js_makehigh_pre(s, t) { 
		var d=""; 
		var s1=s.replace(/ /g, ""); 
		var t1=t.replace(/ /g, ""); 
		t1=t1.toLowerCase(); 
		if (t1==s1.substring(0, t1.length)) { 
			d=" <span class=\"red_bold_12\"><font color=red>"; 
			for (var i=0,j=0; j<t1.length; i++) { 
				if (s.substring(i, i+1)!=" ") j++; 
					d+=s.substring(i, i+1); 
			} 
			d+="</font></span>"+s.substring(i, s.length); 
		 } 
		 return d; 
	} 

	function js_makehigh_suf(s, t) { 
		var d=""; 
		var s1=s.replace(/ /g, ""); 
		var t1=t.replace(/ /g, ""); 
		t1=t1.toLowerCase(); 
		if (t1==s1.substring(s1.length-t1.length)) { 
		for (var i=0,j=0; j<s1.length-t1.length; i++) { 
			if (s.substring(i, i+1)!=" ") j++; 
			d+=s.substring(i, i+1); 
		} 

		d+="<span class=\"red_bold_12\">"; 
		for (var k=i,l=0; l<t1.length; k++) { 
			if (s.substring(k, k+1)!=" ") l++; 
			d+=s.substring(k, k+1); } d+="</span>"; 
		} 
		return d; 
	} 
		
		/*
	 function set_acinput_(v) {
		 if (!a_on_) return ;
		 var o = eval("document.getElementById('acq" + v + "_');") ;
		 //alert(o.outerText);
		 //old_ = Ip_.value = o.outerText ;
		 old_ = Ip_.value = o.innerText ;
		 Ip_.focus() ;
		 ac_hide_() ;
	 }*/
	 
	function set_acinput_(v) {
		if (!a_on_) return ;
		//var o = eval("document.getElementById('ac" + a_now_ + "_');") ;
		//alert(o.outerText);
		old_ = Ip_.value = v ;
		Ip_.focus() ;
		ac_hide_() ;
	}
		

	 function get_ac0_() {
		 var s="",ment="" ;
		 if (qs_m_==1) ment="해당 단어로 시작하는 단어가 없습니다";
		 else if (qs_m_==2) ment="해당 단어로 끝나는 단어가 없습니다";
		 s += "<li><table style='width:253px;' border=0 cellspacing=0 cellpadding=0>" ; //2013-11-18 : li 열기태그 추가
		 s += "<tr id=ac1_ onmouseover=\"set_acpos_(1); \" onmouseout=\"set_acpos_(0); \" style=\"backgroundColor=''\">" ;
		 s += "<td height=18 align=left  valign='top'>ㆍ<font color=#000000>" + ment + "</td></tr>" ;
		 s += "</table>" ;
		 s += "<span id=acq1_ style='display:none'>" + old_ + "</span></li>" ; //2013-11-18 : li 닫기태그 추가
		 return s ;
	 }

	 function js_strlen_(s) {
		 var i,l=0;
		 for (i=0; i<s.length; i++) {
			 if (s.charCodeAt(i) > 127) l+=2;
			 else l++;
		}
		return l;
	 }

	 function js_substring_(s, start, len) {
		 var i,l=0;d="" ;
		 for (i=start; i<s.length && l<len; i++) {
			 if (s.charCodeAt(i) > 127) l+=2 ;
			 else l++ ;
			 d+=s.substr(i, 1) ;
		 }
		 return d ;
	 }

	function trim_space_(ke, me) {
		if (me!=2) {
			ke = ke.replace(/^ +/g, "") ;
			ke = ke.replace(/ +$/g, " ") ;
		} else {
			ke = ke.replace(/^ +/g, " ") ;
			ke = ke.replace(/ +$/g, "") ;
		}
		ke = ke.replace(/ +$/g, " ") ;
		return ke ;
	 }

	 function get_cc_(me) {
		 var ke=trim_space_(Ip_.value, me) + me ;
		 return typeof(cc_[ke])==UD_ ? null : cc_[ke] ;
	 }

	 function set_cc_(aq,al,ai,me) {
		 cc_[aq+me] = new Array(aq, al, ai) ;
	 }

	 function ac_hide_() {
		if (document.getElementById("ac_body_").style.display == N_) return ;
		document.getElementById("ac_body_").style.display = N_ ;
		//var IfrRef = document.getElementById('DivShim');
		//IfrRef.style.display = N_;
		a_on_ = a_now_ = 0 ;
	}

	 function wi_() {
		 if (acuse_==0) return ;
		 if (m_on_) {
			 setTimeout("wi_()", wi_int_) ;
			return ;
		}
		var now = Ip_.value ;
		if (now == "" && now != old_) ac_hide_() ;
		if (now != "" && now != old_ && keystatus_!=1) {
			var o=null, me=1 ;
			o = get_cc_(me) ;
			if (o && o[1][0] != "") ac_show_(o[0], o[1], o[2], me) ;
			else reqAC_(me) ;
		}
		old_ = now ;
		setTimeout("wi_()", wi_int_) ;
	 }

	 function set_mouseon_(f) {
		 if (f==1) arr_on_ = 1 ;
		 else if (f==2) frm_on_ = 1 ;
	 }

	 function set_mouseoff_(f) {
		 if (f==1) arr_on_ = 0 ;
		 else if (f==2) frm_on_ = 0 ;
	 }

	 function req_pf_() {
		 frm_on_=1;
		 req_ac2_(1);
		 Ip_.focus();
		 cursor_end_();
	 }

	 function req_sf_() {
		 frm_on_=1;
		 req_ac2_(2);
		 Ip_.focus();
		 cursor_end_();
	 }

	 function cursor_end_() {
		 if (t_==1 && c_==1) {
			 var rng=Ip_.createTextRange();
			 if (rng!=null) {
				 rng.move("textedit");
				 rng.select();
			 }
		 }
	 }
 }//end if

var keystatus_ = 1;

function setTextBox_(evt) {

  var textbox = Ip_;
  var _event;
  switch ( getNavigatorType_() ) {
          case 1 : // IE
                  _event = window.event;
                  nodeName = _event.srcElement.nodeName;
                  break;
          case 2 : // Netscape
                  _event = evt;
                  //nodeName = _event.target.nodeName;
                  nodeName = _event.target.nodeName;
                  break;
          default :
                  nodeName = "None";
                  break;
  }
  key = _event.keyCode;
  if ( keystatus_ == 1 && key != 13) {
	  //textbox.value = "";
	  keystatus_ = 2;
  }
}

	function getNavigatorType_() {
		if ( navigator.appName == "Microsoft Internet Explorer" )
			return 1;
		else if ( navigator.appName == "Netscape" )
			return 2;
		else
			return 0;
	}

function search_promo_off() {
	search_promotion = false;
}

function get_re_search2 () {
	//searchTop ();
	//sechfrmsubmit();
}
