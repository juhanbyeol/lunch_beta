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
    <meta property="twitter:image" content="https://landing.hoe.co.kr/images/landing/contents01.jpg">
    <meta property="twitter:url" content="https://landing.hoe.co.kr/">
    <link rel="canonical" href="https://landing.hoe.co.kr/">
    
    <link rel="stylesheet" href="<c:url value ='/css/landing/index.css'/>">
<!--     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" async></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" async></script> -->
	<script src="<c:url value ='/js/com/jquery-1.7.2.js'/>"></script>
	<script src="<c:url value ='/js/com/jquery-ui.js'/>"></script>
    <script src="<c:url value ='/js/landing/common/common.js?v=${millis}'/>"></script>
    <script src="<c:url value ='/js/landing/type.js?v=${millis}'/>"></script>
    <title>호미, 농부 성향 테스트 종류</title>
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
            <div class="type-page">
                <div class="typeBox">
                    <div class="iconGroup">
                        <a href="<c:url value='/landing/result?mbti_type=ISTJ'/>" class="type"><div class="ISTJ"></div><p>ISTJ</p></a>
                        <a href="<c:url value='/landing/result?mbti_type=ISFJ'/>" class="type"><div class="ISFJ"></div><p>ISFJ</p></a>
                        <a href="<c:url value='/landing/result?mbti_type=ISTP'/>" class="type"><div class="ISTP"></div><p>ISTP</p></a>
                        <a href="<c:url value='/landing/result?mbti_type=ISFP'/>" class="type"><div class="ISFP"></div><p>ISFP</p></a>
                        <a href="<c:url value='/landing/result?mbti_type=ESTP'/>" class="type"><div class="ESTP"></div><p>ESTP</p></a>
                        <a href="<c:url value='/landing/result?mbti_type=ESFP'/>" class="type"><div class="ESFP"></div><p>ESFP</p></a>
                        <a href="<c:url value='/landing/result?mbti_type=ESTJ'/>" class="type"><div class="ESTJ"></div><p>ESTJ</p></a>
                        <a href="<c:url value='/landing/result?mbti_type=ESFJ'/>" class="type"><div class="ESFJ"></div><p>ESFJ</p></a>
                        <a href="<c:url value='/landing/result?mbti_type=INFJ'/>" class="type"><div class="INFJ"></div><p>INFJ</p></a>
                        <a href="<c:url value='/landing/result?mbti_type=INTJ'/>" class="type"><div class="INTJ"></div><p>INTJ</p></a>
                        <a href="<c:url value='/landing/result?mbti_type=INFP'/>" class="type"><div class="INFP"></div><p>INFP</p></a>
                        <a href="<c:url value='/landing/result?mbti_type=INTP'/>" class="type"><div class="INTP"></div><p>INTP</p></a>
                        <a href="<c:url value='/landing/result?mbti_type=ENFP'/>" class="type"><div class="ENFP"></div><p>ENFP</p></a>
                        <a href="<c:url value='/landing/result?mbti_type=ENTP'/>" class="type"><div class="ENTP"></div><p>ENTP</p></a>
                        <a href="<c:url value='/landing/result?mbti_type=ENFJ'/>" class="type"><div class="ENFJ"></div><p>ENFJ</p></a>
                        <a href="<c:url value='/landing/result?mbti_type=ENTJ'/>" class="type"><div class="ENTJ"></div><p>ENTJ</p></a>
                    </div>
                </div>
                <button type="button" class="download download03" onclick="location.href='https://landing.hoe.co.kr/hobti?location_type=1'">테스트 하기</button>
            </div>
        </div>
    </div>
</body>
</html>