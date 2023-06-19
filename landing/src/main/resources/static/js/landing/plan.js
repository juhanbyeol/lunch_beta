function sendEmail(){
    let btnContact = document.querySelector("#btnContact");

    const callback = (e) => {
        e.preventDefault();
        let checkAgr = document.querySelector("#checkAgr");
        let sj = document.querySelector("#sj");
        let telno = document.querySelector("#telno");
        let email = document.querySelector("#email");
        let cn = document.querySelector("#cn");
        let exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
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
        if(cn.value.trim() == ""){
            alert("문의내용을 입력해주세요.");
            return;
        }
        if(!confirm("문의 하시겠습니까?")) return;

        $.ajax({ //jquery ajax
            type:"post",
            url:`/cmm/inqryMail`, 
            data: {
                sj : sj.value,
                cn : cn.value,
                telno : telno.value,
                email : email.value
            },
            dataType:"json", //html, xml, text, script, json, jsonp 등 다양하게 쓸 수 있음
            success: function(data){   //요청 성공시 실행될 메서드
                console.log(data);
                if(data.result == "Y"){
                    alert("발송되었습니다.");
                    location.href="/landing";
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
    btnContact.addEventListener("click", callback);
}