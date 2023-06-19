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
    <meta property="og:image" content="https://landing.hoe.co.kr/images/landing/ogSiteImg.png">
    <meta property="og:url" content="https://landing.hoe.co.kr/">

    <meta property="twitter:card" content="summary">
    <meta property="twitter:site" content="호미">
    <meta property="twitter:title" content="호미 - 주말농장 통합 플랫폼">
    <meta property="twitter:description" content="주말농장 플랫폼, 텃밭 분양부터 농사정보까지! 상세한 주말농장 정보, 농사방법, 모종 키우는 법, 농사방법 영상, 커뮤니티를 제공합니다.">
    <meta property="twitter:image" content="https://www.hoe.co.kr/images/landing/ogSiteImg.png">
    <meta property="twitter:url" content="https://landing.hoe.co.kr/">
    <link rel="canonical" href="https://landing.hoe.co.kr/">
 
    <meta property="al:ios:url" content="applinks://docs" />
    <meta property="al:ios:app_store_id" content="12345" />
    <meta property="al:ios:app_name" content="App Links" />
    <meta property="al:android:url" content="applinks://docs" />
    <meta property="al:android:app_name" content="App Links" />
    <meta property="al:android:package" content="org.applinks" />
    <meta property="al:web:url" content="http://applinks.org/documentation" />
    <link rel="alternate" href="android-app://com.example.android/example/gizmos" />
    
    <link rel="stylesheet" href="<c:url value ='/css/landing/index.css'/>">
<!--     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" async></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" async></script> -->
	<script src="<c:url value ='/js/com/jquery-1.7.2.js'/>"></script>
	<script src="<c:url value ='/js/com/jquery-ui.js'/>"></script>
		
    <script src="<c:url value ='/js/landing/common/common.js?v=${millis}'/>"></script>
    <script src="<c:url value ='/js/landing/index.js?v=${millis}'/>"></script>
    <title>호미 - 주말농장 통합 플랫폼</title>
</head>
<body>
<div itemscope itemtype="http://schema.org/Product" id="page">
        <header class="header">
            <div class="navWrap">
                <div itemprop="brand" itemscope itemtype="http://schema.org/Brand" class="logoBox">
                    <a href="<c:url value ='/'/>" class="logo" name="logo">
                        <meta itemprop="logo" content="<c:url value ='/images/landing/logo.png'/>">
                    </a>
                </div>
                <div class="menuBox">
                    <a href='<c:url value="/"/>' class="menu menu01 active">서비스 소개</a>
                    <a href="<c:url value="/landing/hobti"/>" class="menu menu02">Ho-BTI 검사</a>                  
                </div>
                <a href="#" class="download download01">앱 다운</a> 
            </div>
        <meta itemprop="name" content="호미 - 주말농장 통합 플랫폼">
        </header>
        <div class="contWrap">
            <section class="contBox contBox01">
                <div class="cont_left">
                    <p class="cont_title bold">주말농장 호미와 함께라면<br>농사가 쉬워져요!</p>
                    <p class="cont_info01">나의 주말농사 친구, 호미</p>
                    <a href="#" class="download download02">설치하기</a>
                </div>
                <div class="cont_right">
                    <img itemprop="image" src="<c:url value ='/images/landing/contents01.webp'/>" alt="호미 서비스">
                </div>
            </section>
            <section class="contBox contBox02">
                <p class="cont_info02">누구나 쉽게 <strong>즐길 수 있는<br> 행복한 농사문화 </strong>서비스를 만듭니다. </p>
            </section>
            <section class="contBox contBox03">
                <div class="cont_left">
                    <p class="cont_info03">내 주변<br>둘러보기</p>
                    <p class="cont_info03 green">내 주변 주말농장을 찾아볼 수 있어요.</p>
                </div>
                <div class="cont_right">
                    <img src="<c:url value ='/images/landing/contents02.webp'/>" alt="주말농장 찾기">
                </div>
            </section>

            <!-- 지적도, 구좌 선택이 업어짐 컨텐츠 변경 필요 -->
            <section class="contBox contBox04">
                <div class="cont_left">
                    <p class="cont_info03">농장의 위치, 분양 비용,<br> 편의 시설, 리뷰 등의 정보를<br><span class="green">한 눈에 확인할 수 있어요.</span></p>
                </div>
                <div class="cont_right">
                    <img src="<c:url value ='/images/landing/contents03.webp'/>" alt="텃밭 분양하기">
                </div>
            </section> 
            <section class="contBox contBox05">
                <div class="cont_left">
                    <p class="cont_info03">주말농장 분양신청<br><span class="green">텃밭, 과수원 등<br>다양한 주말농장의 분양을 신청하고,<br>농사를 지을 수 있어요.</span></p>
                </div>
                <div class="cont_right">
                    <img src="<c:url value ='/images/landing/contents04.webp'/>" alt="주말농장 분양신청" >
                </div>
            </section>
            <section class="contBox contBox06">
                <div class="cont_top">
                    <p class="cont_info03">농부소식</p>
                    <p class="cont_info03 green">농사기록, 농사의 추억을 기록할 수 있어요.</p>
                </div>
                <div class="cont_flex">
                    <p class="cont_info04">농사정보 쉽게 공부해봐요</p>
                    <img src="<c:url value ='/images/landing/contents05.webp'/>" alt="농사정보">
                </div>
                <div class="cont_flex">
                    <p class="cont_info04">즐거운 오늘을 공유해요.</p>
                    <img src="<c:url value ='/images/landing/contents06.webp'/>" alt="농부소식">
                </div>
            </section>
            <!-- <section class="contBox contBox07">
                <div class="cont_left">
                    <p class="cont_info03">농장제휴</p>
                    <p class="cont_info03 blue">운영중인 주말농장을 등록하고, <br> 분양관리를 이용할 수 있어요.</p>
                </div>
                <div class="cont_right">
                    <img src="img/contents07.webp" alt="분양관리">
                </div>
            </section> -->

            <section class="contBox contBox08">
                <p class="cont_info03 green">문의하기</p>
                <p class="cont_info03">서비스에 관해 궁금한 사항 및 제휴 문의를 주시면 신속하게 답변 드려요.</p>
                <div class="cont_full">
                    <p class="contact_txt contact_txt2">성함</p>
                    <p class="contact_txt contact_txt2">연락처</p>
                    <input id="sj" type="text" name="sj" placeholder="ex.홍길동">
                    <input id="telno" type="number" name="telno" placeholder="ex.010-0000-0000">
                    <p class="contact_txt contact_txt1">Email</p>
                    <input id="email" type="email" name="email" placeholder="ex.homie@hoe.co.kr">
                    <p class="contact_txt contact_txt1">문의내용</p>
                    <label class="txtLabel"  for="cn">
                        <textarea id="cn" type="text" name="cn"></textarea>
                    </label>

                    <div class="contact_agree">
                        <label for="checkAgr"></label>
                        <input id="checkAgr" type="checkbox"></label><a href="">이용약관 및 개인정보 보호정책을</a> &nbsp; 확인했으며, 이에 동의합니다.
                    </div>
                    
                    <div id="btnContact" class="contact_btn">문의하기</div>
                </div>
            </section>
        </div> 

        <footer class="footerWrap">
            <div class="footerBox">
                <p>회사명 : 주식회사 아이원</p>
                <p>주소 : 경기 안양시 동안구 엘에스로 136, 금정역2차 SK V1타워 601~602호</p>
                <p>연락처 : 070-8822-2223</p>
                <p>대표이사 : 김한수</p>
                <p>사업자등록번호: 843-81-01399</p>
                <p>Copyright(c) 2022 (주)아이원. All Rights Reserved.</p>
            </div>
        </footer>
        
        <meta itemprop="name" content="호미">
        <meta itemprop="description" content="주말농장 플랫폼, 텃밭 분양부터 농사정보까지! 상세한 주말농장 정보, 농사방법, 모종 키우는 법, 농사방법 영상, 커뮤니티를 제공합니다.">
        <meta itemprop="url" content="https://landing.hoe.co.kr/">
    </div>

    <div id="hobtiPopup" class="popupBg">
        <div class="popup popup01">
            <div class="popupBox popupBox01">
                <img src="<c:url value ='/images/landing/icon_close.png'/>" alt="농부 성향테스트" id="popupClose01">
                <p class="pop_txt01">Ho-bti에서 나는 어떤 농부일까?</p>
                <p class="pop_txt02">Ho-bti 검사결과 SNS에 공유하고 <br> <span>스타벅스 아메리카노</span> 쿠폰 받아가세요!</p>
            </div>
            <div class="popupBox popupBox02">
                <img src="<c:url value ='/images/landing/img_hobtiBox.webp'/>" alt="농부 성향테스트" class="pop_img01">
                <img src="/images/landing/img_hobtiRandom.webp" alt="농부 성향테스트" class="pop_img02">
                <div id="btnTest" class="popupBtn">검사하기</div>
                <p id="btnRevert" class="pop_txt03">그냥 볼게요</p>
                <!-- <input id="not24h" type="checkbox" >하루동안 안보기 -->
            </div>
        </div>
    </div>
</body>
</html>