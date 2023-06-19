$(function(){
    events();
});


const radioCheck = (e) => {
//	let surveyRadio = $("input:radio[name=survey]:checked").val();
//
//	if(surveyRadio == 'E'){
//		$("#surveyText").show();		
//
//		toggleSurveyBtn('off')
//		
//		$("#surveyText").keyup(function(e) {
//			if($("#surveyText").val()){
//				toggleSurveyBtn('on');
//			}else{
//				toggleSurveyBtn('off');				
//			}
//   	});
//	}else{
//		$("#surveyText").val('');
//		$("#surveyText").hide();
//		toggleSurveyBtn('on');
//	}
	toggleSurveyBtn('on');
};

const events = () => {
	$("input:radio[name=survey]").click(radioCheck);
	$("#surveyBtn").click(creatSurveyCookie);
}

const toggleSurveyBtn = (e) =>{
	if(e == 'on'){
		$("#surveyBtn").removeClass('st1');
		if(!$("#surveyBtn").hasClass('st2')) $("#surveyBtn").addClass('st2');		
	}else{
		$("#surveyBtn").removeClass('st2');
		if(!$("#surveyBtn").hasClass('st1')) $("#surveyBtn").addClass('st1');		
	}
}

const creatSurveyCookie = () => {
	let surveyRadio = $("input:radio[name=survey]:checked").val();
	
	if($("#surveyBtn").hasClass('st2')){
		window.location.href = "/creatSurveyCookie?survey="+surveyRadio;		
	}else{
		return;
	} 
}
     
//    //쿠키삭제
//function deleteCookie(name) {
//	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//}

   //   

//deleteCookie("Reply");
// 쿠키 생성 함수
