<%@ page language="java" contentType="text/html; charset=EUC-KR" session="false" %>
<%@ page import="org.springframework.http.ResponseEntity"%>
<%
	ResponseEntity<String> loginProc = request.getAttribute("loginProc") != null ? (ResponseEntity<String>) request.getAttribute("loginProc") : null;
	Boolean isLogin = false;
	
	if(loginProc.getBody().indexOf("\"returnCode\":\"success\"") > 0){
		isLogin = true;
	}
	
%>
<!doctype html>
<html lang="ko">
<head>
<title>Home | T world</title>

<script type="text/javascript">
<% if(isLogin){ %>
location.href = "/";
<% }else{ %>
location.href = "/";
<% } %>
</script>
</head>
<body>
</body>
</html>