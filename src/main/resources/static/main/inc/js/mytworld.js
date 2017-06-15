$(document).ready(function(){
	
	/**
	 * t-world Native App로그인 화면요청
	 * 2013.11.13
	 */
    $.fnLogin = function(){
    	location.href='toapp:login';
    }
    
    
	/**
	 * t-world Native App 로그아웃 처리요청
	 * 웹화면과 App화면 session 동기화 처리함
	 * 2013.11.13
	 */
	/*
	$.fnLogout = function(){
        var url = "toapp:logout"
        var ifr=$('<iframe />', {
					              id    : 'logout'
					            , src   : url
					            , async : false
					            , style : 'display:none'
					            , load  : function(){}
        						});
        $('body').append(ifr);   
	}
	*/
		
}); // ready


  /**
    * 값이 한글인지 숫자인제 체크함
    */
   function checkData(remain){
  	 var num_regx=/^[0-9]*$/;
	 var remainTemp = getNumString(remain);
	 var result = 'N';
	 if(!num_regx.test(remainTemp)){
	    return 'Y';
	 }
	 return result;
   }

   /**
    * 숫자에 붙은 [,] 제거함
    */ 
    function getNumString(s) {
	    var rtn = parseFloat(s.replace(/,/gi, ""));
	    if (isNaN(rtn)) {
	        return s;
	    }else {
	        return rtn;
	    }
    }

	/**
	* 숫주에 [,] 추가함
	*/
	function commify(n) {
	  var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
	  n += '';                          // 숫자를 문자열로 변환
	  while (reg.test(n)){
	    n = n.replace(reg, '$1' + ',' + '$2');
	  }
	  return n;
	}
	
	
	/** 
	 * Map Object
	 */
	function Map() {
		this.keys = new Array();
		this.data = new Object();
		
		this.put = function(key, value) {
		    if(this.data[key] == null){
		        this.keys.push(key);
		    }
		    this.data[key] = value;
		};
		
		this.get = function(key) {
		    return this.data[key];
		};
		
		this.remove = function(key) {
		    this.keys.remove(key);
		    this.data[key] = null;
		};
		
		this.each = function(fn){
		    if(typeof fn != 'function'){
		        return;
		    }
		    var len = this.keys.length;
		    for(var i=0;i<len;i++){
		        var k = this.keys[i];
		        fn(k,this.data[k],i);
		    }
		};
		
		this.entrys = function() {
		    var len = this.keys.length;
		    var entrys = new Array(len);
		    for (var i = 0; i < len; i++) {
		        entrys[i] = {
		            key : this.keys[i],
		            value : this.data[i]
		        };
		    }
		    return entrys;
		};
		
		this.isEmpty = function() {
		    return this.keys.length == 0;
		};
		
		this.size = function(){
		    return this.keys.length;
		};
	}