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
			alert("ID�� �Է��ϼ���");
			$("#id").focus();
			return;
	    }
	    
	    if($("#password").val() == ""){
			alert("��й�ȣ�� �Է��ϼ���");
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
			    	alert("�α��� �Ǿ����ϴ�.");
				    location.href = "/";
			    }else{
			    	if(result.errorCode == "is login"){
			    		//alert("�α��� �����Դϴ�.");
					    location.href = "/";
			    	}else if(result.errorCode == "no session"){
			    		alert("no session.");
					    //location.href = "/";
			    	}
			    }
			},
			error:function(result){
			    // ��Ŷ�극��Ŀ������ ���� ó���ؾ��ϳ�?
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
		<span><input type="button" name="loginBtn" id="loginBtn" value="�α���" /></span>
	</div>
</form>	
</body>
</html>