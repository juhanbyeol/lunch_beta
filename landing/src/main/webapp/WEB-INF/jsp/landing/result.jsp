<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="주말농장, 농사, 작물 키우기, 텃밭 분양, 주말농장 작물 추천, 주말농장 사이트, 주말농장 분양, 주말농장가꾸기">
    <meta name="description" content="주말농장 플랫폼, 텃밭 분양부터 농사정보까지! 상세한 주말농장 정보, 농사방법, 모종 키우는 법, 농사방법 영상, 커뮤니티를 제공합니다.">
    <meta name="robots" content="index,follow"> 

    <meta property="og:locale" content="ko_KR">
    <meta property="og:type" content="website">
    <meta name ="author" content="호미">
    <meta property="og:site_name" content="호미 - 주말농장 통합 플랫폼">
    <meta property="og:title" content="호미 - 주말농장 통합 플랫폼">
    <meta property="og:description" content="주말농장 플랫폼, 텃밭 분양부터 농사정보까지! 상세한 주말농장 정보, 농사방법, 모종 키우는 법, 농사방법 영상, 커뮤니티를 제공합니다.">
    <meta property="og:image" content="https://landing.hoe.co.kr/images/landing/contents01.jpg">
    <meta property="og:url" content="https://landing.hoe.co.kr/">

    <meta property="twitter:card" content="summary">
    <meta property="twitter:site" content="호미">
    <meta property="twitter:title" content="호미 - 주말농장 통합 플랫폼">
    <meta property="twitter:description" content="주말농장 플랫폼, 텃밭 분양부터 농사정보까지! 상세한 주말농장 정보, 농사방법, 모종 키우는 법, 농사방법 영상, 커뮤니티를 제공합니다.">
    <meta property="twitter:image" content="https://www.hoe.co.kr/images/landing/contents01.jpg">
    <meta property="twitter:url" content="https://landing.hoe.co.kr/">
    <link rel="canonical" href="https://landing.hoe.co.kr/">
    
    <link rel="stylesheet" href="<c:url value ='/css/landing/index.css'/>">
<!--     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" async></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" async></script> -->
	<script src="<c:url value ='/js/com/jquery-1.7.2.js'/>"></script>
	<script src="<c:url value ='/js/com/jquery-ui.js'/>"></script>
    <script src="<c:url value ='/js/landing/common/common.js?v=${millis}'/>"></script>
    <script src="<c:url value ='/js/landing/result.js?v=${millis}'/>"></script>
    <title>호미, 농부 성향 테스트 결과</title>
</head>
<body>
    <div id="page">
        <header class="header">
            <div class="navWrap">
                <div class="logoBox">
                    <a href="<c:url value="/"/>" class="logo"></a>
                </div>
                <div class="menuBox">
                    <a href="<c:url value="/"/>" class="menu">서비스 소개</a>
                    <a href="<c:url value="/landing/hobti"/>" class="menu active">Ho-BTI 검사</a>                  
                </div>
                <a href="#" class="download download01">앱 다운</a> 
            </div>
        </header>
        <div class="contWrap bg">
            <div class="result-page">
                <ul class="pageBox">
                    <li id="thisHobti" class="result_mbti"></li>
                    <li id="thisHobtiCn1" class="result_title"></li>
                    <li id="thisImg" class="result_img01"></li>                   
                    <li id="thisHobtiCn2" class="result_info"></li>
                    <li id="thisHobtiCn3" class="result_info"></li>
                    <li id="thisHobtiCn4" class="result_info"></li>
                    <li id="thisHobtiCn5" class="result_info"></li>
                    <li id="thisHobtiCn6" class="result_info"></li>
                </ul>
                <div class="resultBox">
                    <div class="result_member">
                        <p class="good">잘 맞는 주말농장 멤버</p>
                        <p id="matchedType" class="result_mbti"></p>
                        <div id="matchedImg" class="result_img02"></div>
                    </div>
                    <div class="result_member">
                        <p class="bad">안 맞는 주말농장 멤버</p>
                        <p id="unmatchedType" class="result_mbti"></p>
                        <div id="unmatchedImg" class="result_img02"></div>
                    </div>
                </div>
                <button type="button" class="download download03" onclick="location.href='https://landing.hoe.co.kr/hobti?location_type=1'">테스트 하기</button>
                <a href="<c:url value="/landing/type"/>" class="showType">모든 농부유형 보기</a>
                <a id="linkBtn" href="#" class="linkBtn">링크 복사하기</a>
                <!-- <a id="shareBtn" href="#" class="shareBtn">공유하기</a> -->
            </div>
        </div>
    </div>
</body>
</html>