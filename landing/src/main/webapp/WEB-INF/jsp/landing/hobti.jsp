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
    <script src="<c:url value ='/js/landing/prefixfree.min.js'/>"></script>
	<script src="<c:url value ='/js/landing/swiper.min.js'/>"></script>
    <script src="<c:url value ='/js/landing/common/common.js?v=${millis}'/>"></script>
    <script src="<c:url value ='/js/landing/index.js?v=${millis}'/>"></script>
    <script src="<c:url value ='/js/landing/homie_hobti.js?v=${millis}'/>"></script>
    <title>호미, 농부성향테스트</title>
</head>
<body>
 <div itemscope itemtype="http://schema.org/Product" id="page">
        <header class="header">
            <div class="navWrap">
                <div itemprop="brand" itemscope itemtype="http://schema.org/Brand" class="logoBox">
                    <a href="<c:url value="/"/>" class="logo">
                        <meta itemprop="logo" content="<c:url value ='/images/landing/logo.png'/>">
                    </a>
                </div>
                <div class="menuBox">
                    <a href="<c:url value="/"/>" class="menu">서비스 소개</a>
                    <a href="<c:url value="/landing/hobti"/>" class="menu active">Ho-BTI 검사</a>                  
                </div>
                <a href="#" class="download download01">앱 다운</a> 
            </div>
        </header>
        <div class="contWrap bg">
            <div class="start-page">
                <div class="pageBox">
                    <p itemprop="name" class="start_title">농부성향 테스트</p>
                    <p class="start_info">
                        <span itemprop="description">
                        MBTI성격 성향만큼 사람마다 뚜렷한 제2의 인격,<br> 
                        농부성향! 내 농부성향을 알아보고 친구들에게<br> 
                        나의 농부성향을 공유해봐요!
                        </span>
                    </p>
                    <div class="iconGroup">
                        <div class="ESFJ"></div>
                        <div class="ISFJ"></div>
                        <div class="ENFJ"></div>
                        <div class="INFJ"></div>
                        <div class="INTJ"></div>
                        <div class="INTP"></div>
                        <div class="ESTJ"></div>
                        <div class="ESTP"></div>                        
                        <div class="ISTJ"></div>
                        <div class="ISTP"></div>
                        <div class="INFP">
                            <meta itemprop="image" content="<c:url value ='/images/landing/infp.png'/>">
                        </div>
                        <div class="ENFP"></div>
                        <div class="ENTJ"></div>
                        <div class="ISFP"></div>
                        <div class="ENTP"></div>
                        <div class="ESFP"></div> 
                    </div>
                </div>
                <button type="button" class="download download03" onclick="start();">테스트 하기</button>
                <a href='<c:url value="/landing/type"/>' class="showType">모든 농부성향 보기</a>  
            </div>
            <div class="main-page">
                <div class="moveBox">
                    <div id="preBtn" class="pre moveBtn cannotPre"></div>
                    <div id="nextBtn" class="next moveBtn cannotNext"></div>
                </div>
                <div class="statusBar">
                	<div id="statusBar" class="progress"></div>
                </div>
                <div id="qna_1" class="qnaBox qnaBox01">
                    <input type="hidden" id="answer_1" value="">
                    <div class="question">
                        <p class="question_info">주말농장 멤버들과의 첫날!!<br>나는 쌈채소를 키우고 싶은데<br> 다른 멤버들은 감자, 고구마를 심자고 한다면?</p>
                    </div>
                    <ul class="answer">
                        <a><li class="answer_info" data-cn="E">멤버들에게 쌈채소를 키우자고 어필한다.</li></a>
                        <a><li class="answer_info" data-cn="I">멤버들 몰래 구석에 쌈채소 씨앗을 뿌린다.</li></a>
                        <a><li class="answer_info" data-cn="I">멤버들이 원하니 감자, 고구마를 심고 나는 다른 주말농장을 분양받아 쌈채소를 심는다.</li></a>
                        <a><li class="answer_info" data-cn="E">모임에서 나와 쌈채소를 심는 모임을 찾는다.</li></a>
                    </ul>
                </div>
                <div id="qna_2" class="qnaBox">
                    <input type="hidden" id="answer_2" value="">
                    <div class="question">
                        <p class="question_info">텃밭에 심을 작물을 선택하는 스타일은?</p>
                    </div>
                    <ul class="answer">
                        <a><li class="answer_info" data-cn="S">실용적인게 최고야! 쉽고 빠르게 자라는 쌈채소!</li></a>
                        <a><li class="answer_info" data-cn="N">남들과는 다르게, 멋있어보이는 허브!</li></a>
                        <a><li class="answer_info" data-cn="S">지금은 존버하고 가을에 크게 수확할 수 있는 구황작물!</li></a>
                        <a><li class="answer_info" data-cn="N">오늘 느낌은 고추, 방울토마토!</li></a>
                    </ul>
                </div>
                <div id="qna_3" class="qnaBox">
                    <input type="hidden" id="answer_3" value="">
                    <div class="question">
                        <p class="question_info">나의 주말 농장 방문 형태는 주로</p>
                    </div>
                    <ul class="answer">
                        <a><li class="answer_info" data-cn="I">혼자라도 매주 방문하려고 한다.</li></a>
                        <a><li class="answer_info" data-cn="E">멤버들이 방문할때만 방문한다.</li></a>
                        <a><li class="answer_info" data-cn="E">멤버들에게 전날부터 연락해서 가자고 조른다.</li></a>
                        <a><li class="answer_info" data-cn="I">내가 싫어하는 멤버가 온다고? 이번주는 쉬자.</li></a>
                    </ul>
                </div>
                <div id="qna_4" class="qnaBox">
                    <input type="hidden" id="answer_4" value="">
                    <div class="question">
                        <p class="question_info">주말농장 멤버가 우울해 한다. <br> 위로해 주기 위해 멤버들이 모이기로했다. 내가 식사장소를 정해야 한다면?</p>
                    </div>
                    <ul class="answer">
                        <a><li class="answer_info" data-cn="T">모두 쉽게 올 수 있는 중간지점을 찾고, 그 주변 맛집을 검색해본다.</li></a>
                        <a><li class="answer_info" data-cn="F">우울할 때 가면 힐링될 만한 곳들을 검색해본다.</li></a>
                    </ul>
                </div>
                <div id="qna_5" class="qnaBox">
                    <input type="hidden" id="answer_5" value="">
                    <div class="question">
                        <p class="question_info">나의 주말 농장 준비가방 안에는?</p>
                    </div>
                    <ul class="answer">
                        <a><li class="answer_info" data-cn="J">간단한 장비가 정리되어 있다.</li></a>
                        <a><li class="answer_info" data-cn="J">안봐도 뭐가 있는지 파악할수 있고 깔끔하게 정돈돼있다.</li></a>
                        <a><li class="answer_info" data-cn="P">그때그때 가방에 필요한 장비들을 준비한다.</li></a>
                        <a><li class="answer_info" data-cn="P">더러워진 장갑들, 망가진 장비들이 가득하다.</li></a>
                    </ul>
                </div>
                <div id="qna_6" class="qnaBox">
                    <input type="hidden" id="answer_6" value="">
                    <div class="question">
                        <p class="question_info">삼시세끼같은 프로를 보며 하는 생각은?</p>
                    </div>
                    <ul class="answer">
                        <a><li class="answer_info" data-cn="S">맛있겠다. 레시피 검색해봐야지</li></a>
                        <a><li class="answer_info" data-cn="S">내가 저기 산다면 나는 어떤 작물을 키워서 끼니를 때울까? </li></a>
                        <a><li class="answer_info" data-cn="N">저 동네는 어디지? 저런 장소섭외는 어떻게 하는거지?</li></a>
                        <a><li class="answer_info" data-cn="N">자연 속에서의 여유로운 삶을 보며 힐링하는 현대인들이 많은 이유가 뭘까?</li></a>
                    </ul>
                </div>
                <div id="qna_7" class="qnaBox">
                    <input type="hidden" id="answer_7" value="">
                    <div class="question">
                        <p class="question_info">멤버들과 주말농장에서 쌈채소를 수확하고,<br>즐거운 바비큐 파티를 하고 인스타에 올린다면?</p>
                    </div>
                    <ul class="answer">
                        <a><li class="answer_info" data-cn="F">언제 만나도 즐거운 친구들 #모임</li></a>
                        <a><li class="answer_info" data-cn="T">간만에 신나는 파티 #바베큐</li></a>
                    </ul>
                </div>
                <div id="qna_8" class="qnaBox">
                    <input type="hidden" id="answer_8" value="">
                    <div class="question">
                        <p class="question_info">나의 농사 스타일은?</p>
                    </div>
                    <ul class="answer">
                        <a><li class="answer_info" data-cn="J">씨앗을 미리 구매하고 언제, 어떻게 심는지 검색한다.</li></a>
                        <a><li class="answer_info" data-cn="J">씨앗을 미리 구매정도만 하고, 남들 따라 심고 관리한다.</li></a>
                        <a><li class="answer_info" data-cn="P">씨앗을 심고, 잘 안자라면 그때 검색해본다.</li></a>
                        <a><li class="answer_info" data-cn="P">어? 내가 상추를 심었구나! 꺂잎인줄 알았는데..</li></a>
                    </ul>
                </div>
                <div id="qna_9" class="qnaBox">
                    <input type="hidden" id="answer_9" value="">
                    <div class="question">
                        <p class="question_info">주말농장 활동을 마무리하면서 나는?</p>
                    </div>
                    <ul class="answer">
                        <a><li class="answer_info" data-cn="E">나는 집돌이! 집에서 혼자 자축한다.</li></a>
                        <a><li class="answer_info" data-cn="I">혼자서도 잘놀아요! 노래방에서 신나게 즐긴다.</li></a>
                        <a><li class="answer_info" data-cn="E">멤버들 모두 모여! 오늘은 파티다!</li></a>
                        <a><li class="answer_info" data-cn="I">친한 멤버에게 파티하자고 물어본다.</li></a>
                    </ul>
                </div>
                <div id="qna_10" class="qnaBox">
                    <input type="hidden" id="answer_10" value="">
                    <div class="question">
                        <p class="question_info">호미앱 농장 리뷰에서 엄청 핫한 주말농장이 있다.<br> 분양받고 싶어하는 사람들이 엄청나다고 한다.</p>
                    </div>
                    <ul class="answer">
                        <a><li class="answer_info" data-cn="J">신청기간을 확인한 뒤 신청 성공률을 높일 꿀팁을 찾아본다.</li></a>
                        <a><li class="answer_info" data-cn="P">내가 분양신청할때는 사람이 별로 없을 지도 몰라, 일단 신청해보지뭐</li></a>
                        <a><li class="answer_info" data-cn="J">비슷한 스타일의 다른 주말농장이 있는지 찾아본다.</li></a>
                        <a><li class="answer_info" data-cn="P">언젠가 인기가 식겠지? 좀 더 기다렸다가 신청해보자</li></a>
                    </ul>
                </div>
                <div id="qna_11" class="qnaBox">
                    <input type="hidden" id="answer_11" value="">
                    <div class="question">
                        <p class="question_info">새로운 주말농장을 분양받고 싶어.<br> 나는 어떤 곳을 분양받을까?</p>
                    </div>
                    <ul class="answer">
                        <a><li class="answer_info" data-cn="N">호미앱에 새로 등록된 주말농장 위주로!</li></a>
                        <a><li class="answer_info" data-cn="S">리뷰에서 사람들의 반응이 가장 좋은 주말농장</li></a>
                        <a><li class="answer_info" data-cn="S">평소 내가 원하던 스타일의 주말농장</li></a>
                        <a><li class="answer_info" data-cn="N">주말농장 리스트를 확인하다가 느낌이 오는곳!</li></a>
                    </ul>
                </div>
                <div id="qna_12" class="qnaBox">
                    <input type="hidden" id="answer_12" value="">
                    <div class="question">
                        <p class="question_info">친구가 주말농장하고 싶다고 한다. <br> 지금 농사짓고 있는 주말농장이 어떤지 설명해달라고 하면?</p>
                    </div>
                    <ul class="answer">
                        <a><li class="answer_info" data-cn="F">주변에 산책로도 있고, 바베큐장도 있어서 가족들이랑 주말마다 와서 놀기도 좋아! 너도 꼭 해봐.</li></a>
                        <a><li class="answer_info" data-cn="T">작물들에게 물 주기가 편해! 그리고 흙도 좋은지 작물들이 되게 잘자라.</li></a>
                    </ul>
                </div>
                <button id="doneBtn" type="button" class="download download03" style="display:none;">결과보기</button>
                <div class="totalHobti" style="display:none;">
                    <div class="question">
                        <p id="totalHobti" class="question_info">
                        	
                        </p>
                    </div>
                </div>
            </div>
            <div id="waitAmin" class="modal" style="display:none;">
                <div class="modal_info">
                    <p>성향검사중...</p>
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                          <div class="swiper-slide ENFP"></div>
                          <div class="swiper-slide ISTJ"></div>
                          <div class="swiper-slide INTP"></div>
                          <div class="swiper-slide ENTJ"></div>
                          <div class="swiper-slide ENFP"></div>
                          <div class="swiper-slide ENFP"></div>
                          <div class="swiper-slide ENFP"></div>
                        </div>
                    </div>
                </div>        
            </div>
        </div>
    </div>
    <meta itemprop="url" content="<c:url value="/landing/hobti"/>">
</body>
</html>