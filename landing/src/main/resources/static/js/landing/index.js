const checkMobile = () => {
    const mobileType = navigator.userAgent.toLowerCase();
   
    if (mobileType.indexOf('android') > -1) {
      return window.open("https://play.google.com/store/apps/details?id=com.ione.homie&hl=ko", "_blank");
    }
    else if (mobileType.indexOf('iphone') > -1 || mobileType.indexOf('ipad') > -1 || mobileType.indexOf('ipod') > -1) {
      return window.open("https://apps.apple.com/kr/app/id1662973539", "_blank");
    }
    else {

      return window.open("https://play.google.com/store/apps/details?id=com.ione.homie&hl=ko", "_blank");
    }
  };

//let checkAgr = document.getElementById("checkAgr");
document.addEventListener("DOMContentLoaded", () => {
    sendEmail();

    const btnTest = document.querySelector("#btnTest");
    const popupClose01 = document.querySelector("#popupClose01");
    const btnRevert = document.querySelector("#btnRevert");
    const hobtiPopup = document.querySelector("#hobtiPopup");
    if(popupClose01) {	
	    popupClose01.addEventListener("click",()=>{
	        hobtiPopup.style.display = "none";
	    });
	}
	if(btnRevert) {		
	    btnRevert.addEventListener("click",()=>{
	        hobtiPopup.style.display = "none";
	    });
	}
	if(btnTest) {		
	    btnTest.addEventListener("click",()=>{
	        location.href = "/landing/hobti";
	    });
	}
	if(btnRevert) {		
	    btnRevert.addEventListener("click",()=>{
	        
	    });
	}

    $(".download01").on("click", checkMobile);
    $(".download02").on("click", checkMobile);
});

function sendEmail(){
    let btnContact = document.querySelector("#btnContact");
	let params = {};
    const callback = (e) => {
        e.preventDefault();
        let checkAgr = document.querySelector("#checkAgr");
        let sj = document.querySelector("#sj");
        let telno = document.querySelector("#telno");
        let email = document.querySelector("#email");
        let cn = document.querySelector("#cn");
        let exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        
        //plan 페이지일 경우 이메일만 체크하기 
        if(location.href.indexOf("/plan") != -1) {
	        if(email.value.trim() == ""){
	            alert("이메일을 입력해주세요.");
	            return;
	        }else if(!exptext.test(email.value)){
	            alert("이메일 형식이 올바르지 않습니다.");
	            return;
	        }
	        
            if(checkAgr.checked == false) {
	            alert("이용약관에 동의해주세요.");
	            return;
	        }
 		 		params = {
	                telno : telno.value,
	                email : email.value
				}
	        if(!confirm("사전 예약을 신청하시겠습니까?")) return;
		} else {
	        if(checkAgr.checked == false) {
	            alert("이용약관에 동의해주세요.");
	            return;
	        }
	        if(sj.value.trim() == ""){
	            alert("성함을 입력해주세요.");
	            return;
	        }
	        if(telno.value.trim() == ""){
	            alert("연락처를 입력해주세요.");
	            return;
	        }else if(!regPhone.test(telno.value)){
	            alert("연락처 형식이 올바르지 않습니다.");
	            return;
	        }
	        if(email.value.trim() == ""){
	            alert("이메일을 입력해주세요.");
	            return;
	        }else if(!exptext.test(email.value)){
	            alert("이메일 형식이 올바르지 않습니다.");
	            return;
	        }
	        if(cn) {	
		        if(cn.value.trim() == ""){
		            alert("문의내용을 입력해주세요.");
		            return;
		        }
		        params = {
					sj : sj.value,
	                cn : cn.value,
	                telno : telno.value,
	                email : email.value
				}
			} else {
				  params = {
					sj : sj.value,
	                telno : telno.value,
	                email : email.value
				}
			}
	        if(!confirm("문의 하시겠습니까?")) return;
		}

        $.ajax({ //jquery ajax
            type:"post",
            url:`/cmm/inqryMail`, 
            data: params,
            dataType:"json", //html, xml, text, script, json, jsonp 등 다양하게 쓸 수 있음
            success: function(data){   //요청 성공시 실행될 메서드
                if(data.result == "Y"){
                    alert("발송되었습니다.");
                    if(location.href.indexOf("/plan") != -1) {
						location.href="/landing/plan";
					} else {
						location.href="/";
					}
                }else if(data.result == "P"){
                    alert("DB 삽입 오류");
                }else{
                    alert("발송실패.");
                }
            },
            error:function(){		 //요청 실패시 에러 확인을 위함
                console.log("통신에러");
            }
        })
    };
    if(btnContact) {
	    btnContact.addEventListener("click", callback);	
	}
}

function start(){
    $('.start-page').hide();
    $('.main-page').show();
}

const sendShare = async () => {
    const image = await fetch("https://www.hoe.co.kr/images/landing/Logo.png");//공유할 이미지 경로 추가
    const blob = await image.blob();
    const file = new File([blob], 'Logo.png', { type: 'image/jpeg' });
    fn_sendNavigatorShare('호미 플랫폼', 'Hobiti 테스트해보세요.', `https://www.hoe.co.kr/landing`, [file]);//공유 제목, 내용, url, 파일 
};

function fn_sendNavigatorShare(title, text, url, files) {
	if (navigator.share) {  
		navigator.share({      
			title: title,      
			text: text,      
			url: url,  
			files : files
		})   
		.then(() => console.log('Successful share'))    
		.catch((error) => console.log('Error sharing', error));
	} else {
		//alert("공유기능을 지원하지 않는 환경입니다.");
        copy();
	}
};

//url 복사하기
const copy = () => {
    // 임시의 textarea 생성
    const $textarea = document.createElement("textarea");
  
    // body 요소에 존재해야 복사가 진행됨
    document.body.appendChild($textarea);
    
    // 복사할 특정 텍스트를 임시의 textarea에 넣어주고 모두 셀렉션 상태
    $textarea.value = location.href;
    $textarea.select();
    
    // 복사 후 textarea 지우기
    document.execCommand('copy');
    document.body.removeChild($textarea);
    alert("호미 홈페이지 주소가 복사되었습니다.");
}





