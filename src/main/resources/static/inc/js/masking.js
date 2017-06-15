var strUnlockMaskingButton = '<div id="unlock_masking" class="masking_animate">' +
		'<button class="btn_open">가려진 정보보기 열기/닫기</button>' +
		'<button class="btn_txt">가려진 정보보기</button>' +
		'</div>';

var maskingDisabled;

function fnInitUnlockMasking() {
	
	var getMasking = getCookie('masking');
	var lastX;

	if ($('#unlock_masking').length) $('#unlock_masking').show();
	else {
		// 마스킹 영역 append
		$('body').append(strUnlockMaskingButton);
		
		// 가려진 정보보기 클릭
		$('#unlock_masking .btn_txt').on('touchend click', function() {
			fnMaskCert();   // 인증수단공통페이지 호출
		});
			
		if( getMasking ) {
			// 쿠키가 있을 경우 disabled 상태
			$('#unlock_masking').addClass('disabled');
		} else {
			// 쿠키가 없을 경우 쿠키를 생성하고 2초후 들어감
			setCookie('masking', 'maskingCookie', 1);
			fnInitUnlockMaskingDisabled();
		}
		
		// 마스킹 슬라이드 이벤트, 안드로이드 4.0 버전에서 touchstart 다중터치 오류가 발생하여
		// 안드로이드에서는 click 이벤트만 사용하도록 수정
		var flag = false;
		var ua = navigator.userAgent.toLowerCase();
		var isAndroid = ua.indexOf('android') > -1;
		
		if( isAndroid ) {
			var clickHandler = 'click'
		} else {
			var clickHandler = 'touchstart click';
		}
		
		// 자물쇠 클릭
		$('#unlock_masking .btn_open').on(clickHandler, function(e){
			e.preventDefault();
			if( isAndroid ) {
				fnInitUnlockMaskingEnabled();
			} else {
				if (!flag) {
					flag = true;
					setTimeout(function(){  
						flag = false; 
						fnInitUnlockMaskingEnabled();
					}, 100);
				}
				return false;
			}
		});	
	}
}

function fnInitUnlockMaskingEnabled(){
	$('#unlock_masking').toggleClass('disabled');
}

function fnInitUnlockMaskingDisabled(){
	maskingDisabled = setTimeout(function(){
		$('#unlock_masking').addClass('disabled');
	}, 9000);
}

function fnInitUnlockMaskingHide() {
	if ($('#unlock_masking').length) $('#unlock_masking').hide();
}

// 쿠키 생성
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = 'expires='+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
 }

//쿠키 가져오기
function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');

    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return '';
}