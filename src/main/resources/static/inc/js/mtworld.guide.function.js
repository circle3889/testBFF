function goOutURL(url){
	if(confirm("3G 또는 LTE망 사용 시 데이터 요금이 발생됩니다.")){
		if(MobileUA.ANDROID){
			toapp.webbrowserouter(url);
		}else if(MobileUA.IOS){
			location.href = "toapp:webbrowserouter:"+url;
		}
	}
}

function goAppDown(Aurl, Iurl){
	if(Iurl == '' && MobileUA.IOS){
		alert("해당 App.은 IOS를 지원하지 않습니다.");
	} else if(Aurl == '' && MobileUA.ANDROID) {
		alert("해당 App.은 안드로이드를 지원하지 않습니다.");
	} else {
		if(confirm("3G 또는 LTE망 사용 시 데이터 요금이 발생됩니다.")){
			if(MobileUA.ANDROID) {   // OS 체크
				toapp.webbrowserouter(Aurl);
			}else if(MobileUA.IOS) {
				location.href = "toapp:webbrowserouter:"+Iurl;
			}
		}
	}
}

function tel(){
	if (confirm("02-6343-9000(무료) 으로 전화를 연결하시겠습니까?")){
		location.href = "tel:02-6343-9000";
	}
}

function sendMail(addr){
	if(/ipod|iphone|ipad/.test(navigator.userAgent.toLowerCase())){
		location.href = addr;
	} else {
		toapp.webbrowserouter("m2.tworld.co.kr/html/sendMail.html?m="+addr);
	}
}