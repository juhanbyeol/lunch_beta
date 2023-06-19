const urlSch = location.search;
const param = new URLSearchParams(urlSch);
let locationMove = false;
let eventPopup = false;
// let todo = param.get("todo");
// let search = param.get("search");
// let searchType = param.get("searchType");
// let farmNo = param.get("farmNo");
// let xcnts = param.get("xcnts");
// let ydnts = param.get("ydnts");
// let signguCd = param.get("signguCd");
// let name = param.get("name");
// let area = param.get("area");
// let cnt = param.get("cnt");
// let setleNo = param.get("setleNo");
// let coprtn = param.get("coprtn");
// let confmAt = param.get("confmAt");
// let nearbyFarmAt = param.get("nearbyFarmAt");

//엘리먼트 없을경우 밸류값 처리
const setElementValue = (id) => {
	const value = document.getElementById(id) === null ? '' : document.getElementById(id).value;
	return value;
};

let obj = {};
$(function(){
	let todo = setElementValue("cmmTodo");
	let search = setElementValue("cmmSearch");
	let searchType = setElementValue("cmmSearchType");
	let signguCd = setElementValue("cmmSignguCd");
	let xcnts = setElementValue("cmmXcnts");
	let ydnts = setElementValue("cmmYdnts");
	let coprtn = setElementValue("cmmCoprtn");
	let name = setElementValue("cmmName");
	let area = setElementValue("cmmArea");
	let cnt = setElementValue("cmmCnt");
	let nearbyFarmAt = setElementValue("cmmNearbyFarmAt");
	let type = setElementValue("cmmType");
	let farmNo = setElementValue("cmmFarmNo");
	let setleNo = setElementValue("cmmSetleNo");
	let lastFarmNo = setElementValue("cmmLastFarmNo");

	obj = {
		todo: todo
		, search: search
		, searchType: searchType
		, signguCd: signguCd
		, xcnts: xcnts
		, ydnts: ydnts
		, coprtn: coprtn
		, name: name
		, area: area
		, cnt: cnt
		, nearbyFarmAt: nearbyFarmAt
		, type: type
		, farmNo: farmNo
		, setleNo : setleNo
		, lastFarmNo : lastFarmNo
	}
	farmInfoBtn();
	footerBtn();
	isNotRead();
	
	$(document).on("click",".profileFarm, .feedProfileFarm",function(){
		let target = $(this).attr('data-farmno');
		if(target != 0){
			obj.todo = "feed";
			obj.farmNo = target;
			obj.coprtn = $(this).attr('data-coprtn');
			formDataAction("formAction", "post", "/farminfo?farmNo="+target, obj);				
		}
	})
	if(!obj.farmNo == ''){
		selectLeftCmprtCnt(obj.farmNo);
	}
});

// const tabParam = `?farmNo=${farmNo}&todo=${todo}&coprtn=${coprtn}&search=${search}&searchType=${searchType}&signguCd=${signguCd}&xcnts=${xcnts}&ydnts=${ydnts}&name=${name}&area=${area}&cnt=${cnt}&setleNo=${setleNo}&confmAt=${confmAt}`;
// 농장 정보 버튼
function farmInfoBtn(){
	/* 농장정보 - 닫기 버튼 */
	$(document).on('click', '.topImg > .btnClose, .mTop4 > .btnClose', function() {
		obj.cmprtArr = $("#cmmCmprtArr").val();
		if (obj.todo == "mypage") { // 결제내역 정보
			obj.todo = "mypage";
			//obj.setleNo = $("#cmmSetleNo").val();
			//formDataAction("formAction", "post", "/payinfo/detail", obj);
			formDataAction("formAction", "post", "/mypage", obj);
		} else if (obj.todo == "cart") { // 장바구니 (마이페이지)
			obj.todo = "mypage";
			formDataAction("formAction", "post", "/pay/cart", obj);
		} else if (obj.todo == "paylist") { // 결제내역
			if (obj.type == '') {
				obj.type = "0";
			}
			formDataAction("formAction", "post", "/mypage/paylist", obj);
		} else if (obj.todo == "farmmypage") { // 마이페이지
			formDataAction("formAction", "post", "/mypage", obj);
		} else if (obj.todo == "paycart") { // 장바구니 (검색통해서 들어올때)
			obj.todo = "farmList";
			obj.farmNo = obj.lastFarmNo;
			obj.lastFarmNo = "";
			formDataAction("formAction", "post", "/pay/cart", obj);
		} else if (obj.todo == "alarm") { // 알람에서 이동할 때
			formDataAction("formAction", "post", "/com/alarm", obj);
		} else if (obj.todo == "feed") { // 피드에서 이동할 때
			formDataAction("formAction", "post", "/feed", obj);
		} else if(obj.todo == "nearFarm"){ // 내주변 농장
			obj.todo = "";
			obj.farmNo = obj.lastFarmNo;
			obj.lastFarmNo = "";
			formDataAction("formAction", "post", "/pay/cart", obj);
		} else{ // 홈화면
				if(obj.nearbyFarmAt != 'Y'){
					formDataAction("formAction", "post", "/", obj);
					//뒤로가기? 일 경우 배너 유지 끄기
					bannerAt = false;
				}else{
					location.href = "/";
				}
			
		}
		// todo == "mypage" ? window.location.href = `/payinfo/detail?todo=mypage&farmNo=${farmNo}&setleNo=${setleNo}&coprtn=Y&confmAt=${confmAt}`
		// : todo == "cart" ? window.location.href = `/pay/cart?todo=mypage`
		// : todo == "paylist" ? window.location.href = `/mypage/paylist?type=0`
		// : todo == "paycart" ? window.location.href = `/pay/cart?farmNo=${farmNo}`
		// : todo == "farmmypage" ? window.location.href = `/mypage`
		// : window.location.href = `/?todo=${todo}&coprtn=${coprtn}&search=${search}&searchType=${searchType}&signguCd=${signguCd}&xcnts=${xcnts}&ydnts=${ydnts}&name=${name}&area=${area}&cnt=${cnt}&setleNo=${setleNo}&nearbyFarmAt=${nearbyFarmAt}`;
	});

	/* 뒤로가기 버튼 */
	$('.btnBacks').click(function(){
		// window.location.href = `/farminfo${tabParam}&`;
		formDataAction("formAction", "post", "/farminfo?farmNo="+obj.farmNo, obj);
	});

	$('#myBtn').click(function(){
		// window.location.href = `/mypage`;
		formDataAction("formAction", "post", "/mypage", obj);
	});

	/**
	 * 탭 메뉴
	 */

	$('.tabHome').click(function(){
	//	obj.setleNo = $("#cmmSetleNo").val();
		formDataAction("formAction", "post", "/farminfo?farmNo="+obj.farmNo, obj);
	});

	$('.tabNotice').click(function(){
		obj.tel = $("#tel").val();
	//	obj.setleNo = $("#cmmSetleNo").val();
		formDataAction("formAction", "post", "/farminfo/detail?farmNo="+obj.farmNo, obj);
	});

	$('.tabReview').click(function(){
		obj.tel = $("#tel").val();
	//	obj.setleNo = $("#cmmSetleNo").val();
		// window.location.href = `/farminfo/review${tabParam}&tel=${$("#tel").val()}`;
		formDataAction("formAction", "post", "/farminfo/review?farmNo="+obj.farmNo, obj);
	});

	$('.tabPicture').click(function(){
		obj.tel = $("#tel").val();
	//	obj.setleNo = $("#cmmSetleNo").val();
		// window.location.href = `/farminfo/photo${tabParam}&tel=${$("#tel").val()}`;
		formDataAction("formAction", "post", "/farminfo/photo?farmNo="+obj.farmNo, obj);
	});

	$('.tabDiary').click(function(){
		obj.tel = $("#tel").val();
	//	obj.setleNo = $("#cmmSetleNo").val();
		// window.location.href = `/farminfo/diary${tabParam}&tel=${$("#tel").val()}`;
		formDataAction("formAction", "post", "/farminfo/diary?farmNo="+obj.farmNo, obj);
	});
};



// 농장 하단 버튼
function footerBtn(){

	// 텃밭일지 이동
	$('#diary').click(function(){
		location.href=`/diary`;
	});
	
	//피드 이동
	$('#feed').click(function(){
		location.href=`/feed`;
	});

	// 홈으로 이동
	$('#home').click(function(){
		location.href=`https://www.hoe.co.kr`;
	});

	// My페이지 이동
	$('#myHommie').click(function(){
		// location.href=`/mypage`;
		obj.todo = "mypage";
		formDataAction("formAction", "post", "/mypage", obj);
	});

	// 알림
	$('.i2').click(function(){
		location.href=`/com/alarm`;
	});

	$(".i4").click(function(){
		if($("#confmAt").val() == "P"){
			alert("농장 등록 심사가 완료되지 않았습니다.");
			return;
		}
		if($("#confmAt").val() == "N"){
			alert("농장 등록 심사 중입니다.");
			return;
		}
		location.href="/manage";
	});
};

//사용자 id 별 장바구니 등록 수 조회
//파라미터 : 장바구니 아이콘 태그 id
//최대 장바구니 수는 99개 이상일 경우 + 표시 추가
function fn_getBasketUserId(basketId) {
	let id = $("#id").val();
	if(id) {
		requestPostNoBlockUI(`farm/basket/select/${id}`,"json", {} , function(res) {
			let result = res.result;
			let data = res.data;
			$(`#${basketId}`).find('.cartNum').empty();
			if(result == 'Y') {
				if(data > 0) {
					let count = data;
					if(data > 99) count = '99+';
					$(`#${basketId}`).find('.cartNum').show();
					$(`#${basketId}`).find('.cartNum').append(`${count}`);
				}else{
					$(`#${basketId}`).find('.cartNum').hide();
				}
			}
		});
	}
}

//알람 읽었는지 여부
function isNotRead() {
	let id = "";
	requestPostNoBlockUI("isLogin", "json", null, function(res) {
		id = res.id;
		if(id) {
			requestPostNoBlockUI("cmm/isNotRead","json", {id : id} , function(res) {
				let msg = res.msg;
				let data = res.data;
				if(msg == 'Y'){
					if(data == 'N'){
						$(".iAlert").show();
					}else{
						$(".iAlert").hide();
					}
				}
			});
		}else{
			$(".iAlert").hide();
		}
	});
	
}

//농장 임대기간 종료여부 조회
function fn_selectFarmRentAt(farmNo) {
	requestPostNoBlockUI("farm/select/rentAt", "json", {farmNo: farmNo}, function(res) {
		let result = res.result;
		if(result == 'Y') {
			/*if(res.rentAt == 'Y') {
				alert("분양 임대기간이 끝나 분양신청이 불가능합니다.");
				return;
			} else {
				location.href=`/farm/select${tabParam}`;
			}*/
		}
	});
}

//농장별 지적도 이미지 조회
function fn_selectFarmLgstrAtchmnFl(farmNo) {
	requestPostNoBlockUI("cmm/file/selectFarmLgstrAtchmnFl", "json", {farmNo: farmNo}, function(res) {
		let result = res.result;
		let zommer = document.querySelector('#zoomImg');
		if(result == 'Y') {
			if(zommer) {
				zommer.src = `/file/select/image/${res.atchmnflNo}`;
			}
		} else {
			zommer.src = `/images/farm_lgstr_img.jpg`;
		}
		$('.viewer').zoomer();
	});
}

//현재날짜 마지막시간 조회
function fn_getNowTmlmtDate() {
	var today = new Date();
	today.setDate(today.getDate() + 1);// 하루 연장 추가 - 2023.03.16
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);
	var dateString = year + '-' + month  + '-' + day;
	return dateString + " 23:59";
}

//공유하기에 첨부할 이미지 url
//let file = await fn_setShareFiles("https://i.picsum.photos/id/646/600/600.jpg?hmac=rjTMB0gBvXbU3beXvcE9rr3FVhUEtRJFMCqngWgA7-8");
const fn_setShareFiles = async (url) => {
	const image = await fetch(url);
	const blob = await image.blob();
	const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
	return file;
};

//공유하기
//title, text, url = string
//files = []
//sample : fn_sendNavigatorShare('share TEST', 'Hello Share Function~', 'https://map.naver.com', []);
function fn_sendNavigatorShare(title, text, url, files) {
	if (navigator.share) {
		navigator.share({
			title: title,
			text: text,
			url: url,
			files : files
		})
			.then(() => console.log('Successful share'))
			.catch((error) => console.log('Error sharing', error));
	} else {
		alert("공유기능을 지원하지 않는 환경입니다.");
	}
};

//text 복사하기
const copy = (txt) => {
	// 임시의 textarea 생성
	const $textarea = document.createElement("textarea");

	// body 요소에 존재해야 복사가 진행됨
	document.body.appendChild($textarea);

	// 복사할 특정 텍스트를 임시의 textarea에 넣어주고 모두 셀렉션 상태
	$textarea.value = txt;
	$textarea.select();

	// 복사 후 textarea 지우기
	document.execCommand('copy');
	document.body.removeChild($textarea);
}

//알림창 실행
function fn_customAlert(msg) {
	action_popup.alert(msg);
	$(".type-alert button.modal_close").click(function() {
		action_popup.close(".type-alert");
	});
};

//커스텀 알림창
var action_popup = {
	timer : 500,
	confirm : function(txt, callback){
		if(txt == null || txt.trim() == ""){
			console.warn("confirm message is empty.");
			return;
		}else if(callback == null || typeof callback != 'function'){
			console.warn("callback is null or not function.");
			return;
		}else{
			$(".type-confirm .btn_ok").on("click", function(){
				$(this).unbind("click");
				callback(true);
				action_popup.close(this);
			});
			this.open("type-confirm", txt);
		}
	},

	alert : function(txt){
		if(txt == null || txt.trim() == ""){
			console.warn("confirm message is empty.");
			return;
		}else{
			this.open("type-alert", txt);
		}
	},

	open : function(type, txt){
		var popup = $("."+type);
		popup.find(".menu_msg").text(txt);
		$("body").append("<div class='dimLayer'></div>");
		$(".dimLayer").css('height', $(document).height()).attr("target", type);
		popup.fadeIn(this.timer);
	},

	close : function(target){
		var modal = $(target).closest(".modal-section");
		var dimLayer;
		if(modal.hasClass("type-confirm")){
			dimLayer = $(".dimLayer[target=type-confirm]");
			$(".type-confirm .btn_ok").unbind("click");
		}else if(modal.hasClass("type-alert")){
			dimLayer = $(".dimLayer[target=type-alert]")
		}else{
			console.warn("close unknown target.")
			return;
		}
		modal.fadeOut(this.timer);
		setTimeout(function(){
			dimLayer != null ? dimLayer.remove() : "";
		}, this.timer);
	}
}

//커스텀 알림창(컨펌창) 생성 - 파라미터 : alert, confirm 중 택1
const fn_createCustomAlert = (type) => {
	const cutAlert = document.createElement('div');
	cutAlert.classList.add('cutAlert');

	const wrap = document.createElement('div');
	wrap.classList.add('wrap');

	const section = document.createElement('section');
	if(type === 'alert') {
		section.setAttribute('class', 'modal modal-section type-confirm');
	} else if(type === 'confirm') {
		section.setAttribute('class', 'modal modal-section type-alert');
	}

	const enroll_box = document.createElement('div');
	enroll_box.classList.add('enroll_box');

	const menu_msg = document.createElement('p');
	menu_msg.classList.add('menu_msg');

	const enroll_btn = document.createElement('div');
	enroll_btn.classList.add('enroll_btn');

	const btn_ok = document.createElement('button');
	btn_ok.setAttribute('class', 'btn pink_btn btn_ok');

	const modal_close = document.createElement('button');
	modal_close.setAttribute('class', 'btn gray_btn modal_close');

	if(type === 'alert') {
		enroll_btn.appendChild(btn_ok);
		enroll_btn.appendChild(modal_close);
	} else if(type === 'confirm') {
		enroll_btn.appendChild(modal_close);
	}

	enroll_btn.appendChild(btn_ok);
	enroll_btn.appendChild(modal_close);

	enroll_box.appendChild(menu_msg);

	section.appendChild(enroll_box);
	section.appendChild(enroll_btn);

	wrap.appendChild(section);
	cutAlert.appendChild(wrap);

	document.getElementsByTagName('body')[0].appendChild(cutAlert);
};


// 로컬 스토리지 저장
function savelocalStorage(name, data) {
	localStorage.setItem(name, JSON.stringify(data));
};

function deletelocalStorage(name) {
	localStorage.removeItem(name);
};

function readlocalStorage(name) {
	return JSON.parse(localStorage.getItem(name));
}

//native callback 함수
function getLocation(coord) {
	localStorage.removeItem("location");
	let obj = {
			la : coord.latitude,
			lo : coord.longitude
	}
	localStorage.setItem("location", JSON.stringify(obj));
	if(locationMove){
		fn_findMyLocation(obj, true);
		locationMove = false; 
	}
}

//native location 콜백함수 호출
function getNativeLocationCallback() {
	window.android?.getLocation?.() // android
	window.webkit?.messageHandlers?.location?.postMessage?.("") // ios
};

//oneSignal 링크 
function postOneSignalLinkId(yourUserId) {
	window.android?.setExternalUserId?.(yourUserId);
	window.webkit?.messageHandlers?.setExternalUserId?.postMessage?.(yourUserId);
};

//배너 목록 생성 - 2023.03.15
function fn_bannerResult(data, type) {
	document.getElementById("bannerSwiper").innerHTML = "";
	let html = "";
	$("#bannerSwiper").html("");
	data.forEach((item)=>{
		//배너 이미지 없을 경우에는 일단 안보이도록 조치
		if(item.atchmnflNo != 0) {
			//console.log(item);
			let backgroundImage = `${item.atchmnflNo != 0 ? '/file/select/imagebanner/' + item.atchmnflNo : replcImage}`;
			let style = `width: 100%; height: 100%;`;
			if(type == "main"){
				/*if(item.cn != '' || !item.cn){
					style = `width: 100%; height: 100%;`;
					spanStyle = `line-height: 180px; margin-left: 10px; position:absolute; top: ${top ? top : 50}%; left:${left ? left : 50}%; transform: translate(-${top ? top : 50}%, -${left ? left : 50}%);`
					html += `<div class="swiper-slide">
								<img class="banner_link" data-param=${item.targetParam} data-url=${item.url} data-coprtn=${item.coprtn} src="${backgroundImage}" style="${style}"></img>
								<span style="${spanStyle}">${item.cn}</span>
							</div>`;			
				}else{*/
					html += `<div class="swiper-slide">
								<img class="banner_link" data-type=${item.bannerType} data-param=${item.targetParam} data-url=${item.url} data-coprtn=${item.coprtn} src="${backgroundImage}" style="${style}"></img>
							</div>`;	
			//	}
			}else{
					html += `	<li class="swiper-slide">
									<img class="banner_link" data-param=${item.targetParam} data-url=${item.url} data-coprtn=${item.coprtn} src="${backgroundImage}" style="${style}"></img>
								</li>`;
			}
		}
	});
    if(type == "feed"){
		$("#bannerSwiper").append(html);
	}else{
		let result = document.getElementById("bannerSwiper");
		result.innerHTML = html;
	}
	var swiper = new Swiper(".mySwiper", {
    	autoplay: {
    		   delay: 5000,
  		 },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
	
	$('.banner_link').click(function(){
		let target = $(this).attr('data-param');
		let dataUrl = $(this).attr('data-url');
		let dataType = $(this).attr('data-type');
		if(target){
			if(dataType == 0){
				obj.todo = "banner";
			}else{
				obj.todo = "mypage";
			}
			obj.coprtn = $(this).attr('data-coprtn');
			formDataAction("formAction", "post", dataUrl+target, obj);				
		}else{
			location.href = $(this).attr('data-url');
		}
	});
	
};

//하단 배너 목록 조회 - 2023.03.15
function fn_selectBannerCoprtnFarmList (type) {
	var bannerType;
	if(type == "main"){
		bannerType = 0;
	}else{
		bannerType = 1;
	}

	if(bannerAt) {
		//메인 헤더 체크
		var thisArea = location.href.split("/");
		thisArea = thisArea[thisArea.length - 1];
		if($("#resTop").css("display") == 'none') {			
			let params = new Object();
			params.pointX = locationInfo ? locationInfo.lo : '';
			params.pointY = locationInfo ? locationInfo.la : '';
			params.bannerType = bannerType;
			requestPostNoBlockUI("farm/selectBannerCoprtnFarmList", "json", params, function(res) {
				let result = res.result;
				let data = res.data;
				if(result == 'Y') {
					if(data == null) {
						$(".bannerBox").hide();
						return;	
					}
					fn_bannerResult(data,type);
					$(".bannerBox").show();
				}else{
					$(".bannerBox").hide();
					return;
				}
			});
		} else if(thisArea == "feed"){
			let params = new Object();
			params.bannerType = bannerType;
			requestPostNoBlockUI("farm/selectBannerCoprtnFarmList", "json", params, function(res) {
				let result = res.result;
				let data = res.data;
				if(result == 'Y') {	
					if(data == null) {
						$(".banner_list").hide();
						return;	
					}
					fn_bannerResult(data,type);
					$(".banner_list").show();
				}else{
					$(".banner_list").hide();
					return;	
				}
			});
		} else {
			bannerAt = false;
		}
	} else {
		$(".bannerBox").hide();
		$(".feedBannerBox").hide();
	}
};

//google analytics user_id 값 조회
function fn_getLoginUserId () {		
	let result = new Object();
	requestPostNoBlockUI("getLoginUserId", "json", null, function(res) {
		let msg = res.msg;
		let data = res.data;
		if(msg == 'Y') {
			result.result = true;
			result.user_id = {'user_id' : data};
		} else {
			result.result = false;
		}
	}, false);
	return result;
};

function selectLeftCmprtCnt(farmNo){
	requestPostNoBlockUI("farm/farminfo", "json", { farmNo: farmNo}, function(res) {
		var data = res.data;
		var leftCmprtCnt = data[0].leftCmprtCnt;
		if(leftCmprtCnt == 0){
			$('#applyBtn').attr('class', 'Lbtn st1');
		}
	});
};

//이미지 확대
function enlargeImage(atchmnflNo) {
  var imageUrl = `/file/select/image/${atchmnflNo}`;
  var image = new Image();
  image.src = imageUrl;
  var overlay = document.createElement("div");
  overlay.id = "enlargeImage";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = "9999";
  var overlayImage = new Image();
  overlayImage.src = imageUrl;
  overlayImage.style.display = "block";
  overlayImage.style.position = "absolute";
  overlayImage.style.top = "50%";
  overlayImage.style.left = "50%";
  overlayImage.style.transform = "translate(-50%, -50%)";
  overlayImage.style.maxWidth = "100%";
  overlayImage.classList.add("overlay-image");
  overlay.appendChild(overlayImage);
  document.body.appendChild(overlay);

  overlay.addEventListener("click", function() {
    document.body.removeChild(overlay);
  });
}

//슬라이드 적용필요시
/*function enlargeImage___(imageUrls) {
  var overlay = document.createElement("div");
  overlay.id = "enlargeImage";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = "9999";

  var sliderContainer = document.createElement("div");
  sliderContainer.classList.add("slider-container");

  imageUrls.forEach(function(imageUrl) {
    var sliderImage = new Image();
    sliderImage.src = imageUrl;
    sliderImage.classList.add("slider-image");
    sliderContainer.appendChild(sliderImage);
  });

  overlay.appendChild(sliderContainer);
  document.body.appendChild(overlay);

  $(".slider-container").slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "linear"
  });

  overlay.addEventListener("click", function() {
    document.body.removeChild(overlay);
  });
}

enlargeImage([
  "/file/select/image/1.jpg",
  "/file/select/image/2.jpg",
  "/file/select/image/3.jpg"
]);

*/


//이미지 팝업 닫기
function removeEnlargeImage() {
	var enlargeImage = $("#enlargeImage");
	if(enlargeImage) {
	    if(enlargeImage.children()[0]?.style.display == 'block') {
	    	if(enlargeImage[0].style.display != 'none') {//이미 none 처리 되있을경우 제외	        		
	    		var layImgPup = document.getElementById("enlargeImage");
	    		layImgPup.remove();
	    	}
	    }		
	}
};


//좌표별 위치이동
function setMapPointInFarm(la,lo) {
	if(!la || !lo) {
		alert("농장 위치가 정확하지 않습니다.");
		return false;
	}
	let farmLocation = {
			la : la,
			lo : lo
	};
	localStorage.setItem("location", JSON.stringify(farmLocation));

	//메인페이지일 경우에만 위치이동
	if(location.href.split("/")[location.href.split("/").length -1] == '') {	
		fn_findMyLocation(farmLocation, false);
	}
	
}

//이벤트 팝업 활성화 
function mainEventPopup() {
	if(eventPopup) {
		$("#modal").show();
		$(".popup5").show();
	}
}
//이벤트 팝업 닫기
function mainEventPopupClose() {
	$("#modal").hide();
	$(".popup5").hide();
	$(".popup6").hide();
}
//이벤트 팝업 이미지 클릭
function mainEventPopupchk() {
	$("#modal").hide();
	$(".popup5").hide();
	//$(".popup6").show();
	location.replace("/mypage/notice?noticeNo=11");
}
//이벤트 팝업 참여하기
function mainEventPopupAccept() {
	$("#modal").hide();
	$(".popup5").hide();
	//클릭이벤트 로그 저장
	jsClickEventUserReqeustInsert('/eventPopup');
	location.replace("/feed");
}

//js click event 요청 로그 저장
//jsClickEventUserReqeustInsert('/eventPopup');
function jsClickEventUserReqeustInsert(customUrl){
	requestPostNoBlockUI("jsClickEventUserReqeustInsert", "json", {customUrl: customUrl}, function(res) {
		var data = res.msg;
		console.log("클릭이벤트 로그 저장 완료 customUrl : "+ customUrl);
	});
};

//http접근시 강제 이동
function redirectToHTTPSIfNotIPhone() {
  	// 현재 URL 가져오기
  	var currentURL = window.location.href;

  	// 요청 브라우저가 아이폰인지 확인
  	var isIPhone = /iPhone/.test(navigator.userAgent);
  	var isAndroid = /Android/.test(navigator.userAgent);
  	
  	var appAt = /Homie/.test(navigator.userAgent);
  	//var isIPhone = true;
  	//var isAndroid = true;

  	// HTTPS가 아니고, 아이폰인 경우에만 동작
	if (isIPhone || isAndroid) {
		if(appAt) {
			if (!currentURL.startsWith('https://')) {
				//alert("http 모바일 앱으로 접근");
				window.location.href = 'https://www.hoe.co.kr';
			}
		} else {
			//alert("모바일 웹브라우저로 접근");
			window.location.href = 'https://www.hoe.co.kr/landing';
		}
	} else {
		//PC인 경우
    	window.location.href = 'https://www.hoe.co.kr/landing';
	}
}