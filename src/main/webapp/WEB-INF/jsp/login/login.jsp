<%@ page language="java" contentType="text/html;charset=EUC-KR" session="false" %>
<!doctype html>
<html lang="ko">
<head>
<title>Home | T world</title>
<script type="text/javascript" src="/inc/js/jquery-1.7.2.min.js"></script>
</head>
<script>
$(document).ready(function(){
    
	$('#loginBtn').on('click', function(){
	    
	    if($("#id").val() == ""){
			alert("ID를 입력하세요");
			$("#id").focus();
			return;
	    }
	    
	    if($("#password").val() == ""){
			alert("비밀번호를 입력하세요");
			$("#password").focus();
			return;
	    }
	    
		$.ajax({
			type: "get",
			data : $("#form").serialize(),
			dataType: "json",
			url: "/loginProc",
			success: function(result) {
			    if(result.returnCode == "success"){
			    	alert("로그인 되었습니다.");
				    location.href = "/";
			    }else{
			    	if(result.errorCode == "is login"){
			    		//alert("로그인 상태입니다.");
					    location.href = "/";
			    	}else if(result.errorCode == "no session"){
			    		alert("no session.");
					    //location.href = "/";
			    	}
			    }
			},
			error:function(result){
			    // 서킷브레이커에의해 에러 처리해야하나?
			    console.log("result Error: " + result);
			}
		});
	});
	
});
</script>
<body>
<form name="form" id="form" action="/login/login" method="get">
	<div>
		<span>ID</span>
		<span><input type="text" name="id" id="id" value="1111" /></span>
	</div>
	<div>
		<span>Password</span>
		<span><input type="password" name="password" id="password" value="1111"/></span>
	</div>
	<div>
		<span><input type="button" name="loginBtn" id="loginBtn" value="로그인" /></span>
	</div>
</form>	
</body>
</html>