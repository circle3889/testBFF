LayerPopup = {
	target : ".bnnrLayer",
/*	layerPopup : '<div id="bnnrLayer" style="display:none;">'
				+ '	<div class="bnnrWrap">'
				+ '		<div class="bnnrBox">'
				+ '			<div class="inner">'
				+ '				<div class="lyCont">'
				+ '					<img src="/img/banner/img_oksusu_bnnr01.png" alt="oksusu 팝업 배너 이미지">'
				+ '					<a href="http://goo.gl/txT3t" target="_blank" title="새창 열기" class="gourl">FunFun 즐기러 가기!</a>'
				+ '				</div>'
				+ '				<div class="lyBottom">'
				+ '					<span class="checkWrap"><input type="checkbox" id="chkExpire" name=""><label for="chkExpire">오늘 하루 보지 않기</label></span>'
				+ '					<button type="button" class="lyClose">닫기</button>'
				+ '				</div>'
				+ '			</div>'
				+ '		</div>'
				+ '	</div>'
				+ '</div>',
*/	
	show : function(targetLayer){
//		 var checkDate = toapp.getConfirmDate("com.skt.prod.oksusupop");
//		 alert(checkDate);
		
		 if(!(/ipod|iphone|ipad/.test(navigator.userAgent.toLowerCase()))){
			 var closeOksusuTime = toapp.checkConfirmDate("com.skt.prod.oksusupop","86400000");
			//if( !blnCookie ) {
			 if(closeOksusuTime == "Y"){
				// $("body").append(LayerPopup.layerPopup);
				$(LayerPopup.target).show(150, function(){
					$("html, body").css("overflow", "hidden");
				});
				$(LayerPopup.target).find(".lyBottom .lyClose").unbind('click').bind('click', function(){
					LayerPopup.hide();
				});
			 }
		 }
		//}
	},
	
	hide : function(){
		if($("#chkExpire")[0].checked){
			//LayerPopup.setCookieAt00( LayerPopup.target, "done", 1 );
			location.href = "toapp.settingpackageconfirmdate:com.skt.prod.oksusupop"; //하루동안 기준 시각.
		}
		$(LayerPopup.target).hide(150, function(){
			$("html, body").css("overflow", "auto");
		});
	},
	
	// 쿠키 가져오기  
	getCookie : function( name ) {
		var nameOfCookie = name + "=";
		var x = 0;
		while ( x <= document.cookie.length ) {
			var y = (x+nameOfCookie.length);
			if ( document.cookie.substring( x, y ) == nameOfCookie ) {
				if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ){
					 endOfCookie = document.cookie.length;
				}
				return unescape( document.cookie.substring( y, endOfCookie ) );
			}
			 
			x = document.cookie.indexOf( " ", x ) + 1;
			if ( x == 0 )
				break;
		}
		return "";
	},
	
	// 24시간 기준 쿠키 설정하기  
	// expiredays 후의 클릭한 시간까지 쿠키 설정  
	setCookie : function( name, value, expiredays ) {   
	   var todayDate = new Date();   
	   todayDate.setDate( todayDate.getDate() + expiredays );   
	   document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"   
	},  
	  
	// 00:00시 기준 쿠키 설정하기  
	// expiredays 의 새벽 00:00:00 까지 쿠키 설정  
	setCookieAt00 : function( name, value, expiredays ) {   
	    var todayDate = new Date();   
	    todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);  
	    if ( todayDate > new Date() ) {  
	    	expiredays = expiredays - 1;  
	    }  
	    todayDate.setDate( todayDate.getDate() + expiredays );   
	    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
	}
}