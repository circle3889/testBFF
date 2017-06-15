function autoIframe(frameId)
{
	try{
		frame=document.getElementById(frameId);
		innerDoc=(frame.contentDocument) ? frame.contentDocument:frame.contentWindow.document;
		objToResize=(frame.style) ? frame.style : frame;
		objToResize.height=innerDoc.body.scrollHeight+40;
		objToResize.width=innerDoc.body.scrollWidth;
	}catch(err){
		window.status=err.message;
	}
}

function doResizeSearch() {
 var ParentFrame  = ifrmsearch.document.body;
 var ContentFrame = document.all["ifrmsearch"];
 ContentFrame.style.height = ParentFrame.scrollHeight + (ParentFrame.offsetHeight - ParentFrame.clientHeight) +100;
}


var search_promotion = true;
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
	 	return 2; 
	 }
 }

 function chk_rt_(t_) {
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
 var acuse_=1;
 var cc_= new Object() ;

 if ((t_==1||t_==2) && c_==1) {
	function wd_() {
		 var a = top_position_;
		 var b = left_position_;
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
	 
	 function get_req_()
		{
			if(window.ActiveXObject){
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
				return new XMLHttpRequest() ;
			} else {
				return null ;
			}
		
		}
	 
	 function showAC_() {		 
			 try{
				 eval(_req_.responseText) ;
			 }catch(e){
				 var qs_q_=''; var qs_m_='1'; var qs_ac_id_='1'; var qs_ac_list_=new Array(''); 
			 }
			 set_cc_(qs_q_, qs_ac_list_, qs_m_) ;
			 ac_show_(qs_q_, qs_ac_list_, qs_ac_id_, qs_m_) ;
	 }
	 
	 function showResponse(oj) {		 
			 try{
				 eval(oj.responseText) ;
			 }catch(e){
				 var qs_q_=''; var qs_m_='1'; var qs_ac_id_='1'; var qs_ac_list_=new Array(''); 
			 }
			 set_cc_(qs_q_, qs_ac_list_, qs_m_) ;
			 ac_show_(qs_q_, qs_ac_list_, qs_ac_id_, qs_m_) ;
	 }
	 
	 function sendRequest(callback,url,data,method)
	 {
	 	var oj = get_req_();
	 	_req_=oj;
	 	if( oj == null ) return null;
	 	
	 	var ua = navigator.userAgent;
	 	var safari	= ua.indexOf("Safari")!=-1;
	 	var konqueror = ua.indexOf("Konqueror")!=-1;
	 	var opera	= ua.indexOf("Opera")!=-1;
	 	var mozes	 = ((a=navigator.userAgent.split("Gecko/")[1] )
	 			?a.split(" ")[0]:0) >= 20011128 ;
	 	
	 	if(window.opera || safari || mozes||opera){
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
	 	 * IE�� �ƴҰ�� POST�� ����Ѵ�.
	 	 */
	 	if(window.opera || safari || mozes||opera){	 			
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
		 var h = (qs_ac_len_ > 9) ? 10 : qs_ac_len_ ;
		 h = h * 36;

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

		 if (qs_ac_list_[0] != "")
		 	 document.getElementById("ac_body_").style.display = B_;

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
			if(o1){
				if ((i+1) == a_now_) o1.style.backgroundColor = "#DDECCC";
				else o1.style.backgroundColor = "";
			}
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
			if (a_now_ < qs_ac_len_ && document.getElementById("ac1_")) {
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
	 
	 	 if(document.getElementById('iq'))
	 	 	document.getElementById('iq').innerHTML='';
	 	
		 if (qs_ac_list_[0] == "") {
			 document.getElementById("scrol_").innerHTML = "";
			 ac_hide_();
		 }
		 else {
			 document.getElementById("scrol_").innerHTML = get_aclist_() ;
			 document.getElementById("ac_body_").style.display = B_ ;
			 
		 }
		 
		 setTimeout('set_ahl_();', 30) ;
		 
		 
	 }

	 function get_aclist_() {
		 var d="",ds="",l=0,s="" ;
		 var dscnt = 0;
		 if (qs_ac_list_[0] != "") {
			 for (i=0; i<qs_ac_len_; i++) {
				 ds = d = qs_ac_list_[i];
				 l = js_strlen_(d);
				 if (l > 40) ds = js_substring_(d, 0, 40) + "..." ;
         			 ds = js_highlight(ds, qs_q_, qs_q_, 0); 
       			   			
					 s += "<li (i =\"=\"" + (qs_ac_len_-1) + "))=\"\" ?=\"\" class=\"last_list\" :=\"\" \"\"=\"\" id='ac" + (i+1) + "_'  onmouseover=\"javascript:set_acpos_('" + (i+1) + "');\" style=\"\" onmouseout=\"set_acpos_(0); \" onclick=\"set_acinput_('" + d + "')\" >" ;
					 s += "<a href=\"javascript:get_re_search2();set_acinput_('" + d + "');\" onclick=\"ga(\'send\', \'event\', \'MTA_common\', \'검색_자동완성\', \'"+d+"\')\">" + ds +"</a>";
					 s += "</li>" ;
					 s += "<span id='acq" + (i+1) + "_' style='display:none; width:0px; height:0px;'>" + d + "</span>" ;

								 
			 }
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

	function js_makehigh_pre_bak(s, t) { 
			var d=""; 
			var s1=s.replace(/ /g, ""); 
			var t1=t.replace(/ /g, ""); 
			t1=t1.toLowerCase(); 
			if (t1==s1.substring(0, t1.length)) { 
				d=" <em>"; 
				for (var i=0,j=0; j<t1.length; i++) { 
					if (s.substring(i, i+1)!=" ") j++; 
						d+=s.substring(i, i+1); 
				} 
				d+="</em>"+s.substring(i, s.length); 
			 } return d; 
		} 
		
	function js_makehigh_pre(s, t) { 
		var d="";
		var s1=s.replace(/ /g, "");
		var t1=t.replace(/ /g, "");
		var t2=t.replace(/ /g, "");
		var temp = "";
		var len = 0;
		var k1=0, s_offset=0;	// �߰����� ��ġ
		
		s1 = s1.toLowerCase();  // ��ҹ��� ����
		t1=t1.toLowerCase();
		t2 = t2.toUpperCase();
		
		// �˻�� ��Ī�Ǵ� ������ ã�ƺ���. ������ t1�� �ѱ۷� ��ȯ�Ͽ� �ٽ� ã�ƺ���.
        k1 = s1.indexOf(t1);
		if (k1 < 0) {
			t1 = toKorean(t1);
        	k1 = s1.indexOf(t1);
		}

		// �׷��� ��ã���� �׳� ����
		if (k1 < 0) {
			return s;
		}

		for (var i=0, j=0; j < k1; i++) {
			if (s.substring(i, i+1) != " ") j++;
		}
		
		s_offset=i;
		if (s.substring(i, i+1) == ' ') s_offset++;
		               
		d = s.substring(0, s_offset);
		s1 = s1.substring(k1, s1.length);

		d+="<font color='red'>";
		for (var i=s_offset, j=0; j < t1.length; i++) {
			if (s.substring(i, i+1)!=" ") j++;
			d+=s.substring(i, i+1);
		}
		d+="</font>"+s.substring(i, s.length);

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
				d+=s.substring(i, i+1); } 

				d+="<span class=\"red_bold_12\">"; 
					for (var k=i,l=0; l<t1.length; k++) { 
						if (s.substring(k, k+1)!=" ") l++; 
						d+=s.substring(k, k+1); } d+="</span>"; 
					} return d; 
		} 
		
	var en_h = "rRseEfaqQtTdwWczxvg";   

 	var reg_h = "[" + en_h + "]";   

 	var en_b = {   
	 	k:0,o:1,i:2,O:3,j:4,p:5,u:6,P:7,h:8,hk:9,ho:10,hl:11,y:12,n:13,nj:14,np:15,nl:16,b:17,m:18,ml:19,l:20   
 	}   

 	var reg_b = "hk|ho|hl|nj|np|nl|ml|k|o|i|O|j|p|u|P|h|y|n|b|m|l";   

 	var en_f = {   
	 	"":0,r:1,R:2,rt:3,s:4,sw:5,sg:6,e:7,f:8,fr:9,fa:10,fq:11,ft:12,fx:13,fv:14,fg:15,a:16,q:17,qt:18,t:19,T:20,d:21,w:22,c:23,z:24,x:25,v:26,g:27   
 	}   

 	var reg_f = "rt|sw|sg|fr|fa|fq|ft|fx|fv|fg|qt|r|R|s|e|f|a|q|t|T|d|w|c|z|x|v|g|";   

 	var reg_exp = new RegExp("("+reg_h+")("+reg_b+")((?:"+reg_f+")(?=(?:"+reg_h+")(?:"+reg_b+"))|(?:"+reg_f+"))","g");   

	 function toKorean(str) {   
	
		 return str.replace(reg_exp,replace);   
	
	 }   

	 function replace(str,h,b,f) {   
	
		 return String.fromCharCode(en_h.indexOf(h)*21*28 + en_b[b]*28 + en_f[f] + 44032);   
	
	 } 
	 
	function set_acinput_(v) {
			 if (!a_on_) return ;
			 old_ = Ip_.value = v ;
			 Ip_.focus() ;
			 ac_hide_() ;
		 }
		

	 function get_ac0_() {
		 var s="",ment="" ;
		 if (qs_m_==1) ment="�ش� �ܾ�� �����ϴ� �ܾ ����ϴ�.";
		 else if (qs_m_==2) ment="�ش� �ܾ�� ������ �ܾ ����ϴ�.";
		 s += "<table style='width:100%;' border=0 cellspacing=0 cellpadding=0>" ;
		 s += "<tr id=ac1_ onmouseover=\"set_acpos_(1); \" onmouseout=\"set_acpos_(0); \" style=\"backgroundColor=''\">" ;
		 s += "<td height=18 align=left  valign='top'>��<font color=#000000>" + ment + "</td></tr>" ;
		 s += "</table>" ;
		 s += "<span id=acq1_ style='display:none'>" + old_ + "</span>" ;

		 return s ;
	 }

	 function js_strlen_(s) {
		 var i,l=0;
		 for (i=0; i<s.length; i++)
			 if (s.charCodeAt(i) > 127) l+=2;
			 else l++;
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
 }

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
                  nodeName = _event.target.nodeName;
                  break;
          default :
                  nodeName = "None";
                  break;
  }
  key = _event.keyCode;
  if ( keystatus_ == 1 && key != 13) {
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

	var f = document.search;
	var	q = f.query;
	if(check_query_spword(q.value) == -1){
		q.value="";
		q.focus();
		return;
	}

	f.submit();

}

function check_query_spword(search_word){
	var fm = document.search;
	 var index, len;

	 while(true) {
		   index = search_word.indexOf(" ");
		   // ����� ������ �����մϴ�.
		   if (index == -1) break;
		   // ���ڿ� ���̸� ���մϴ�.
		   len = search_word.length;
		   // ����� �߶���ϴ�.
		   search_word = search_word.substring(0, index) + search_word.substring((index+1),len);
	  }

	if(search_word == "")
	{
		alert("   �Էµ� �˻�� ����ϴ�.\n�˻�� �Է��Ͻñ� �ٶ�ϴ�.");
		return -1;
	}
	/*else if(search_word.length <= 1)
	{
		alert("2�� ���� �˻������մϴ�.");
		return -1;
	}*/
	else
	{
		//�ѱ��� 2Byte , ������ 1Byte
		for (var i = 0; i < search_word.length; i++)
		{
			ret = search_word.charCodeAt(i);

			if ((ret > 64 && ret < 91 ) || (ret > 96 && ret < 123 ) || (ret > 47 && ret < 58 ))
			{
				//������,���ڰ� üũ
			}
			else
			{
				if (ret < 0xAC00 || ret > 0xD7A3)
				{
					if ( ret == 37 || ret == 34 || ret == 60 || ret == 62 || ret == 38 || ret == 39  || ret == 43 || ret == 45 )  // %, ", < , >, +, -
					// if ( ret == 37 || ret == 34 || ret == 60 || ret == 62 || ret == 38 || ret == 39  || ret == 43 ) // %, ", < , >, +
					{
						alert("�ش� Ư�����ڴ� �Է��ϽǼ� ����ϴ�.");
						return -1;
					}
				}
			}
		}
	}

	return 0;
}