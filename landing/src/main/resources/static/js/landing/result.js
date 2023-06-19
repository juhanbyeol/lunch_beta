$(function(){
	let query = window.location.search;
	let urlParams = new URLSearchParams(query);
	var mbti_type = urlParams.get("mbti_type");
    $.ajax({ //jquery ajax
		type:"get", //get방식으로 가져오기
		url:"/js/landing/mbti.json", //값을 가져올 경로
		dataType:"json", //html, xml, text, script, json, jsonp 등 다양하게 쓸 수 있음
		success: function(data){   //요청 성공시 실행될 메서드
			const result = data.filter((v) => v.id === mbti_type);
			$("#thisHobti").text(result[0].id);
			$("#thisImg").addClass(result[0].id);
			$("#thisHobtiCn1").text(result[0].cn1);
			$("#thisHobtiCn2").text(result[0].cn2);
			$("#thisHobtiCn3").text(result[0].cn3);
			$("#thisHobtiCn4").text(result[0].cn4);
			$("#thisHobtiCn5").text(result[0].cn5);
			$("#thisHobtiCn6").text(result[0].cn6);
			$("#matchedType").text(result[0].matchedType);
			$("#matchedImg").addClass(result[0].matchedType);
			$("#unmatchedType").text(result[0].unmatchedType == '' ? '없음' : result[0].unmatchedType);
			$("#unmatchedImg").addClass(result[0].unmatchedType);
		},
		error:function(){		 //요청 실패시 에러 확인을 위함
			console.log("통신에러");
		}
	})

	const linkBtn = document.getElementById("linkBtn");
	linkBtn.addEventListener("click",()=>{
		var url = '';
		var textarea = document.createElement("textarea");
		document.body.appendChild(textarea);
		url = window.location;
		textarea.value = url;
		textarea.select();
		document.execCommand("copy");
		document.body.removeChild(textarea);
		alert("링크가 복사되었습니다. 필요하신 곳에 붙여넣기 하세요!")
	});

});

