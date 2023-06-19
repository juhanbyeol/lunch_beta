<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width, user-scalable=no" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <link rel="stylesheet" type="text/css" href="<c:url value ='/css/lunch/style.css'/>">
    <script src="<c:url value ='/js/com/jquery-1.7.2.js'/>"></script>
	<script src="<c:url value ='/js/com/jquery.blockUI.js'/>"></script>
	<script src="<c:url value ='/js/com/jquery-ui.js'/>"></script>
	<script src="<c:url value ='/js/com/usrUtil.js?v=${millis}'/>"></script>
	<script src="<c:url value ='/js/com/common.js?v=${millis}'/>"></script>
	<script src="<c:url value ='/js/lunch/lunch.js?v=${millis}'/>"></script>
    <title>Main</title>
</head>
<body>	
	<div id="wrap">
		<section>
			<div class="topBanner">
				<h1 class="topBannerTxt topBannerTxt1">오늘 점심은 어디서 먹지?</h1>
				<h3 class="topBannerTxt topBannerTxt2">
					인근 구내식당의 <br>
					혼잡도, 메뉴를 보고 방문하세요!
				</h3>
			</div>
		</section>
		<section>
			<p class="lunchData lunchData2">${result[i].registDt}</p>	
			<div class="boardBox">
				<ul id="board" class="menuBoard"></ul>
			</div>
		</section>
		<section>
			<h3>우점소 대나무숲🌿</h3>
			<div class="content content1">
				<div class="input input1">
					<label for="ncnm">닉네임</label>
					<input type="text" name="ncnm" id="ncnm"/>
				</div>
				<div class="textareaBox textareaBox1">
					<label for="cn" class="textareaTit">내용</label>
					<textarea rows="10" cols="50" name="cn" id="cn" class="textarea"></textarea>
					<button type="button" id="commentBtn" class="btn btn2">작성하기</button>
				</div>
			</div>
		</section>
		<section>
			<h3>리스트</h3>
			<div>
				<ul id="comment" class="comment"></ul>
			</div>
		</section>
	</div>
</body>
</html>