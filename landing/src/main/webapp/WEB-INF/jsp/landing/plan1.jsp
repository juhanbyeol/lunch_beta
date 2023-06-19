<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
    <script src="https://www.googleoptimize.com/optimize.js?id=OPT-WRG48RL"></script>
<head>
	<!-- Google Tag Manager -->
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-M2345HQ');</script>
	<!-- End Google Tag Manager -->

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta property="og:title" content="텃밭배치도">
    <meta property="og:description" content="주말농장 텃밭 배치도, 이제는 스마트하고 간단하게 그려보자!">
    <!-- <meat property="og:image" content="{{ url_for('static', filename='ogSiteImg.png') }}" /> -->
    <meat property="og:image" content="https://www.hoe.co.kr/images/landing/ogSiteImgT.png">
    <meta property="twitter:image" content="https://www.hoe.co.kr/images/landing/ogSiteImgT.png">
    
    
    <link rel="stylesheet" href="<c:url value ='/css/landing/plan.css?v=${millis}'/>">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" async></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" async></script>
    <script src="<c:url value ='/js/landing/common/common.js?v=${millis}'/>"></script>
    <script src="<c:url value ='/js/landing/index.js?v=${millis}'/>"></script>
    <title>호미, 텃밭배치도</title>
</head>
<body>
	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M2345HQ"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->
    <div id="page">
        <header class="header">
            <section>
                <img src="<c:url value ='/images/landing/logo_white.png'/>" alt="logo" class="logo">
                <div class="headerTit">
                    텃밭을 <br> 
                    가꾸는 가장 스마트한 방법!
                </div>
                <div class="headerSubTit">
                    텃밭 배치도 작성부터 재배 방법까지 한번에 알려드릴게요.
                </div>
                <div class="download download03" data-type="plan" onclick="popup">
                    <a href="#price">구독하기</a>
                </div>
            </section>
        </header>
        <div class="contWrap">
            <div class="contBox01">
                <section>
                    <img src="<c:url value ='/images/landing/img_cropDrawEX2.webp'/>" alt="">
                    <p class="cont_title bold">
                        터치 몇 번으로 수확하고 심을 때마다 <br>
                        작물 배치부터 어울리는 조합까지 추천해 드려요.
                    </p>
                    <p class="cont_info01">
                        작물을 심고 수확할 때 마다 바뀌는 ‘텃밭 배치도’ 작성, <br>
                        한번에 해결해 드립니다!
                    </p>
                </section>
            </div>
            <section class="contBox contBox02">
                <div class="cont_left">
                    <p class="cont_tit01">
                        어디서부터 그려야할지 모르겠어요.
                    </p>
                    <p class="cont_info02">
                        구획 평수만 대강 알고.. <br>
                        어디서부터 어떻게 그려야하죠? 
                        너무 막막해요😔
                    </p>
                </div>
                <div class="cont_right">
                    <img src="<c:url value ='/images/landing/img_cropSeatMap.png'/>" alt="img">
                </div>
            </section>
            <section class="contBox contBox03">
                <div class="cont_left">
                    <p class="cont_tit02">
                        내 텃밭 평수에 맞춰 그릴 수 있어요
                    </p>
                    <p class="cont_info03">
                        너비, 길이를 입력하고 배치 간격까지 <br> 
                        조정 가능해요
                    </p>
                </div>
                <div class="cont_right">
                    <img src="<c:url value ='/images/landing/img_cropSeatMapEX.png'/>" alt="img">
                </div>
            </section> 
            <section class="contBox contBox04">
                <div class="cont_left">
                    <p class="cont_tit01">
                        작물의 크기, 심는 간격이 예상이 안돼요.
                    </p>
                    <p class="cont_info02">
                        이번에 새롭게 다른 작물을 심고싶은데<br>
                        이 작물의 크기, 심는 간격이 예상이 안돼요.🙄
                    </p>
                </div>
                <div class="cont_right">
                    <img src="<c:url value ='/images/landing/img_cropSpace.png'/>" alt="img">
                </div>
            </section>
            <section class="contBox contBox05">
                <div class="cont_left">
                    <p class="cont_tit02">
                        작물을 미리 배치해 보고 <br> 
                        씨앗, 모종을 구매하세요.
                    </p>
                    <p class="cont_info03">
                        실제 크기가 반영된 배치도로 <br> 몇 개까지 심을 수 있는지 확인해 보세요.<br>
                    </p>
                </div>
                <div class="cont_right">
                    <img src="<c:url value ='/images/landing/img_cropSpaceEX.png'/>" alt="텃밭 분양하기">
                </div>
            </section> 
            <section class="contBox contBox02">
                <div class="cont_left">
                    <p class="cont_tit01">
                        텃밭 배치하면서 여기저기 찾기 힘드네요.
                    </p>
                    <p class="cont_info02">
                        같이 심은 작물에 따라, <br> 작물끼리 영향을 준다고 들었어요. <br>
                        여러 사이트를 돌아다니니 너무 피곤해요. 😥
                    </p>
                </div>
                <div class="cont_right">
                    <img src="<c:url value ='/images/landing/img_cropSynastry.png'/>" alt="img">
                </div>
            </section>
            <section class="contBox contBox03">
                <div class="cont_left">
                    <p class="cont_tit02">
                        심고 싶은 작물만 배치하면 <br> 
                        궁합까지 알 수 있어요.
                    </p>
                    <p class="cont_info03">
                        작물만 배치하면 궁합도 <br> 검색 없이 한번에 확인 할 수 있어요.                   
                    </p>
                </div>
                <div class="cont_right">
                    <img src="<c:url value ='/images/landing/img_cropSynastryEX.png'/>" alt="img">
                </div>
            </section> 
            <section class="contBox contBox04">
                <div class="cont_left">
                    <p class="cont_tit01">
                        작물 하나하나 그리고 지우고 복잡해요.
                    </p>
                    <p class="cont_info02">
                        수확을 했으니 지우고, 새로 그리고... <br>
                        작물이 늘어나면서 뭐가 뭔지 복잡해요...😵‍💫
                    </p>
                </div>
                <div class="cont_right">
                    <img src="<c:url value ='/images/landing/img_cropDraw.png'/>" alt="img">
                </div>
            </section>
            <section class="contBox contBox05">
                <div class="cont_left">
                    <p class="cont_tit02">
                        간편하게 작물을 배치 할 수 있어요.
                    </p>
                    <p class="cont_info03">
                        이제 종이와 펜을 내려두세요! <br> 몇 번의 터치면 배치부터 기록까지 가능해요.
                    </p>
                </div>
                <div class="cont_right">
                    <img src="<c:url value ='/images/landing/img_cropDrawEX1.png'/>" alt="텃밭 분양하기">
                </div>
            </section> 
            <section class="contBox contBox02">
                <div class="cont_left">
                    <p class="cont_tit01">
                        작물 종류가 다양한데 <br> 며칠에 한번 가야 할지 고민이에요.
                    </p>
                    <p class="cont_info02">
                        작물마다 시기 별로 확인해야 할 게 너무 많아요. <br>
                        병해충, 물주기, 온도 등 신경쓰이는 게 많아요.🤔
                    </p>
                </div>
                <div class="cont_right">
                    <img src="<c:url value ='/images/landing/img_quickinfo.png'/>" alt="img">
                </div>
            </section>
            <section class="contBox contBox03">
                <div class="cont_left">
                    <p class="cont_tit02">
                        ‘한눈에 보기’를 참고해보세요
                    </p>
                    <p class="cont_info03">
                        배치만 하면 조합에 맞춰 농장 방문 주기, <br> 체크리스트를 알려줘요.
                    </p>
                </div>
                <div class="cont_right">
                    <img src="<c:url value ='/images/landing/img_quickinfoEX.png'/>" alt="img">
                </div>
            </section> 

            <section class="contBox06">
                <div class="cont_title bold">
                    다른 주말 농부들의 리뷰를 확인하세요!
                </div>
                <div class="reviewBoxes">
                    <div class="reBox">
                        <div class="rePhoto">
                            <img src="<c:url value ='/images/landing/img_reviewer1.png'/>" alt="img">
                        </div>
                        <div class="reName">정OO</div>
                        <div class="reTxt">저만 알기 아까운 어플,,,🥹<br>
                            아무것도 모르던 첫 농사부터<br>
                            저에게 많은 도움을 줘서 
                            너무 좋았어요! 
                            다른 분들도 꼭 써보세요!
                        </div>
                    </div>
                    <div class="reBox">
                        <div class="rePhoto">
                            <img src="<c:url value ='/images/landing/img_reviewer2.png'/>" alt="img">
                        </div>
                        <div class="reName">허OO</div>
                        <div class="reTxt">
                            정보량이 엄청납니다!
                            특히 배치도에서 각 식물 상성 매치정보와 매년 식물을 작물 파종 시기를 
                            쉽게 볼 수 있어서 유용하게 잘 쓰고있습니다. 
                        </div>
                    </div>
                    <div class="reBox">
                        <div class="rePhoto">
                            <img src="<c:url value ='/images/landing/img_reviewer3.png'/>" alt="img">
                        </div>
                        <div class="reName">김OO</div>
                        <div class="reTxt">
                            주말농사는 이 어플을 만나기 전과 후로 나뉩니다.  
                            종이에 텃밭을 그리며 여러 사이트 돌아다니면서 
                            정보 찾던 때에서 벗어나게 해줘요!😆 
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="contBox06" id="price">
                <div class="cont_title bold">
                    커피 한 잔 가격으로 <br>
                    다양한 서비스를 즐겨보세요!
                </div>
                <div class="priceBoxes">
                    <div class="priceBox">
                        <div class="cont_title green bold">
                            PREMIUM
                        </div>
                        <div class="chkBox">
                            <img src="<c:url value ='/images/landing/img_check.png'/>" alt="img">
                            텃밭 무한 생성 가능
                        </div>
                        <div class="chkBox">
                            <img src="<c:url value ='/images/landing/img_check.png'/>" alt="img">
                            작물 배치 제한 없음
                        </div>
                        <div class="chkBox">
                            <img src="<c:url value ='/images/landing/img_check.png'/>" alt="img">
                            '한눈에 보기' 서비스 전체
                        </div>
                        <div class="chkBox">
                            <img src="<c:url value ='/images/landing/img_check.png'/>" alt="img">
                            작물 배치 간격 예상
                        </div>
                        <div class="chkBox">
                            <img src="<c:url value ='/images/landing/img_check.png'/>" alt="img">
                            작물 배치 별 궁합 확인
                        </div>
                        <div class="price">
                            <p class="bold">월 200원</p>
                        </div>
                        <div class="pricebtn gradientGBtn" onclick="popup()">지금 구독하기</div>
                    </div>
                </div>
            </section>

            <div class="popupBg" style="display: none;" id="applyPopup">
                <div class="popup">
                    <section class="contBox contBox08">
                        <p class="pop_title green bold">
                            저희 서비스에 관심 가져주셔서 감사합니다!  <img src="<c:url value ='/images/landing/img_close.png'/>" alt="img" onclick="popup()">
                        </p>
                        <div class="cont_full">
                            <p class="contact_txt1">
                                아직 서비스는 준비중으로 10월 오픈 예정이에요.<br>
                                응모하신 분들께는 추첨을 통해 사전테스트 참여권을 드립니다!
                            </p>
                            <p class="contact_txt2">Email<span class="red">(필수)</span></p>
                            <input id="email" type="email" name="email" placeholder="ex.homie@hoe.co.kr">
                            <p class="contact_txt2">연락처(선택)</p>
                            <input id="telno" type="tel" name="telno" placeholder="ex.010-0000-0000">
                            <p class="contact_txt3">
                                1. 수집 목적: 제품 출시 관련 메일 발송
                                2. 수집 항목: 핸드폰 번호, 이메일 주소
                                3. 보유 및 이용 기간: 입력일로부터 6개월까지
                            </p>
                            <div class="contact_agree">
                                <label for="checkAgr"></label>
                                <input id="checkAgr" type="checkbox"> 
                                <p> 이용약관 및 개인정보 보호정책을 확인했으며, 이에 동의합니다.</p>
                            </div>
                            
                            <div id="btnContact" class="contact_btn greenBtn">응모하기</div>
                        </div>
                    </section>
                </div>
            </div>
        </div> 
        <footer class="footerWrap">
            <div class="footerBox">
            	<p>회사명:주식회사 아이원</p>
                <p>주소:경기 안양시 동안구 엘에스로 136, 금정역2차 SK V1타워 601~602호</p>
                <p>연락처:070-8822-2223</p>
                <p>대표이사:김한수</p>
                <p>사업자등록번호: 843-81-01399</p>
                <p>Copyright(c) 2023 (주)호미. All Rights Reserved.</p>
            </div>
        </footer>
    </div>
</body>
<script>
    function popup() {
        if ($('#applyPopup').css('display') == 'block') {
            $('#applyPopup').css('display', 'none');
        } else {
            $('#applyPopup').css('display', 'block');
        }
    }
</script>
</html>