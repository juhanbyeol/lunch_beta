var qNum = 1;
var width = 0;
let mbti_type = "";

//Hobiti 결과값 로그 저장 - 20230106 추가 jhb
const sendHobitiCount = async  (contentsType, mbti_type) => {
    fetch(`${HOMIE_SERVER_API_URL}/cmm/insertContensLog/${contentsType}/${mbti_type}`,{
        method  : "POST",
        headers : {
            "Content-Type": "application/json",
        }
    }).then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
    })
	.catch((error) => {
        console.log(error);
    });
};

$(function(){
	let query = window.location.search;
	let urlParams = new URLSearchParams(query);
	var location_type = urlParams.get("location_type");
	if(location_type == 1){
		$('.start-page').hide();
		$('.main-page').show();
	}else{
		$('.main-page').hide();
		$('.start-page').show();
	}
	$(".answer_info").click(function(){
		var containerFlag = false;
		var container = document.querySelector("#qna_"+qNum);
		container.querySelectorAll(".answer_info").forEach((data)=>{
			data.classList.remove("selected");
		});
		$(this).addClass("selected");
		$("#answer_"+qNum).val($(this).attr("data-cn"));
		
		if(qNum < 11 || (qNum < 12 && !$("#answer_12").val())){
			//마지막문항 제외
			$("#qna_"+qNum).hide();
			qNum++;
			width = 8.333 * (qNum-1);
			$("#statusBar").css({width : width+"%"});
			$("#qna_"+qNum).show();
		}else if(qNum < 12 && $("#answer_12").val()){
			//뒤로가기 눌렀다가 마지막문항에 도달할때
			$("#qna_"+qNum).hide();
			qNum++;
			$("#statusBar").css({width : "100%"});
			$("#qna_"+qNum).show();
			$("#doneBtn").show();
		}else{
			//처음으로 마지막문항의 답을 클릭할때
			$("#statusBar").css({width : "100%"});
			$("#doneBtn").show();
		}
		//이전, 다음버튼 클래스 변경
		if($("#preBtn").hasClass("cannotPre")){
			$("#preBtn").removeClass("cannotPre")
		}
		if(qNum == 12){
			$("#nextBtn").addClass("cannotNext")
		}

		var container2 = document.querySelector("#qna_"+qNum);
		container2.querySelectorAll(".answer_info").forEach((data)=>{
			var index = data.className.indexOf("selected");
			if(index != -1) containerFlag = true;
		});

		if(!containerFlag){
			$("#nextBtn").addClass("cannotNext");
		}else{
			if(qNum != 12){
				$("#nextBtn").removeClass("cannotNext");
			}
		}
	});
	
	$("#preBtn").click(function(){
		var containerFlag = false;
		if(qNum == 1) return;
		if(qNum == 12) $("#doneBtn").hide();
		$("#qna_"+qNum).hide();
		qNum--;
		width = 8.333 * (qNum-1);
		$("#statusBar").css({width : width+"%"});
		$("#qna_"+qNum).show();
		if(qNum == 1){
			$("#preBtn").addClass("cannotPre");
		}
		var container = document.querySelector("#qna_"+qNum);
		container.querySelectorAll(".answer_info").forEach((data)=>{
			var index = data.className.indexOf("selected");
			if(index != -1) containerFlag = true;
		});
		if(containerFlag) {
			$("#nextBtn").removeClass("cannotNext");
		}else{
			$("#nextBtn").addClass("cannotNext");
		}
	});
	
	$("#nextBtn").click(function(){
		if(qNum == 12) return;
		var containerFlag = false;
		var container = document.querySelector("#qna_"+qNum);
		container.querySelectorAll(".answer_info").forEach((data)=>{
			var index = data.className.indexOf("selected");
			if(index != -1) containerFlag = true;
		});
		if(containerFlag){
			if($("#preBtn").hasClass("cannotPre")){
				$("#preBtn").removeClass("cannotPre")
			}
			$("#qna_"+qNum).hide();
			qNum++;
			if(qNum == 12 && $("#answer_12").val()){
				//마지막문항에 답을 누르고 뒤로가기 눌렀다가 다음버튼
				$("#statusBar").css({width : "100%"});
				$("#doneBtn").show();
			}else{
				//마지막문항에 답을 안누른 경우
				width = 8.333 * (qNum-1);
				$("#statusBar").css({width : width+"%"});
			}
			$("#qna_"+qNum).show();
			var containerFlag2 = false;
			var container2 = document.querySelector("#qna_"+qNum);
			container2.querySelectorAll(".answer_info").forEach((data)=>{
				var index = data.className.indexOf("selected");
				if(index != -1) containerFlag2 = true;
			});
			if(!containerFlag2 || qNum == 12) $("#nextBtn").addClass("cannotNext");
		}else{
			$("#nextBtn").addClass("cannotNext");
		}
	});
	
	$("#doneBtn").click(function(){
		$("#waitAmin").show();
		var swiper = new Swiper('.swiper-container', {
			spaceBetween: 10,
			centeredSlides: true,
			autoplay: {
			  delay: 10,
			  disableOnInteraction: false,
			},
		  });
		setTimeout(()=>{
			$("#waitAmin").hide();
			init();
		},2000);
	});
});

function start(){
    $('.start-page').hide();
    $('.main-page').show();
}

function init(){
	var hobti = "";
	var q1 = [];
	var q2 = [];
	var q3 = [];
	var q4 = [];
	
	//E or I
	q1.push($("#answer_1").val());
	q1.push($("#answer_3").val());
	q1.push($("#answer_9").val());

	//S or N
	q2.push($("#answer_2").val());
	q2.push($("#answer_6").val());
	q2.push($("#answer_11").val());
	
	//F or T
	q3.push($("#answer_4").val());
	q3.push($("#answer_7").val());
	q3.push($("#answer_12").val());
	
	//P or J
	q4.push($("#answer_5").val());
	q4.push($("#answer_8").val());
	q4.push($("#answer_10").val());
	hobti = revertHoBTI(q1,q2,q3,q4);
	mbti_type = hobti;
	//결과값 서버 로그 저장(비율조회시 사용)
	let contentsType = 'HOBITI';
	sendHobitiCount(contentsType, mbti_type);
	location.href ="/landing/result?mbti_type="+mbti_type;
}


function revertHoBTI(q1,q2,q3,q4){
	var result = {};
	var a1 = 0;
	var a2 = 0;
	var a3 = 0;
	var a4 = 0;
	result.q1 = q1;
	result.q2 = q2;
	result.q3 = q3;
	result.q4 = q4;
	
	for(var i=0; i<result.q1.length; i++){
	 var thisNum = 0;
	 if(result.q1[i] == 'E'){
		 thisNum = 1;
	 }else{
	 	 thisNum = -1;
	 }
	 a1 += thisNum;
	}
	
	for(var i=0; i<result.q2.length; i++){
	 var thisNum = 0;
	 if(result.q2[i] == 'S'){
		 thisNum = 1;
	 }else{
		 thisNum = -1;
	 }
	 a2 += thisNum;
	}
	
	for(var i=0; i<result.q3.length; i++){
	 var thisNum = 0;
	 if(result.q3[i] == 'F'){
	 	 thisNum = 1;
	 }else{
	 	 thisNum = -1;
	 }
	 a3 += thisNum;
	}
	
	for(var i=0; i<result.q4.length; i++){
	 var thisNum = 0;
	 if(result.q4[i] == 'J'){
	  	thisNum = 1;
	 }else{
	 	thisNum = -1;
	 }
	 a4 += thisNum;
	}
	
	if(a1 > 0){
	 	a1 = 'E'
	}else{
	 	a1 = 'I'
	}
	
	if(a2 > 0){
	 	a2 = 'S'
	}else{
	 	a2 = 'N'
	}
	
	if(a3 > 0){
	 	a3 = 'F'
	}else{
	 	a3 = 'T'
	}
	
	if(a4 > 0){
		 a4 = 'J'
	}else{
		 a4 = 'P'
	}
	
	var hobti = a1+a2+a3+a4;
	
	return hobti;
}

