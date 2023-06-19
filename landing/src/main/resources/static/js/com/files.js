var fileCnt = 0;
var newArr = new Array();
var farmArr = new Array();
var SingleArr = new Array();
var diaryImageArr = new Array();
var bannerImageArr = new Array(10);
var thumbnailImageArr = new Array();
var thisNo = 0;
var admin = false;
var formVO = {};
function readMultipleImage(input, thisId, thisClass, isFeed) {
    const multipleContainer = document.getElementById(thisId);
    //첨부파일 항목 구분코드 저장
    const targetFileCode = input.dataset.code == undefined ? "" : input.dataset.code;
    // 인풋 태그에 파일들이 있는 경우
    if(input.files.length != 0) {
        // 이미지 파일 검사 (생략)
        // 유사배열을 배열로 변환 (forEach문으로 처리하기 위해)
        fileArr = Array.from(input.files);
        let $colDiv1 = null;
        /*if(thisId = "frmFotoList"){
	        $colDiv1 = document.createElement("div");
		}else{*/
	        $colDiv1 = document.createElement("li");
		/*}*/
        $colDiv1.classList.add(thisClass);
        var ext = input.files[0].type.split("/")[1];
        var isImage = true;
        fileArr.forEach((file, index) => {
			if($.inArray(ext, ["gif","jpg","jpeg","png"]) == -1){ 
				alert("이미지 형식의 파일이 아닙니다.");
				isImage = false;
				return;
			}
			//첨부파일 항목별 구분코드 부여
			file['code'] = targetFileCode;
            const reader = new FileReader();
            const $imgDiv = document.createElement("div");
            const $img = document.createElement("img");
            $img.classList.add("image");
            const $colDiv2 = document.createElement("div");
            $colDiv2.classList.add("xBox");
            $colDiv2.classList.add("cancel");
            $colDiv2.classList.add("fileCancel");
            $colDiv1.appendChild($colDiv2);
            var input = document.createElement("input");
	        input.setAttribute('type', 'hidden');
	        input.setAttribute('class', 'thisNo');
	        input.setAttribute('value', thisNo);
            $colDiv1.appendChild(input);
			loadImageOrientation(file, "multi");
            reader.onload = e => {
				$img.src = reader.result;
				EXIF.getData( file, () => {
                const orientation = EXIF.getTag( file, "Orientation" );
                switch( orientation ) {
                    // @details 이미지 회전값이 0인경우 ( 정방향 )
                    case 1 :
                        $img.style.transform = "rotate( 0deg )";
                        break;

                    // @details 이미지 회전값이 180 기운 경우
                    case 3 :
                        $img.style.transform = "rotate( 180deg )";
                        break;

                    // @details 이미지 회전값이 270 기운 경우 ( 왼쪽으로 90 기운 경우 )
                    case 6 :
                        $img.style.transform = "rotate( 90deg )";
                        break;

                    // @details 이미지 회전값이 90 기운 경우
                    case 8 :
                        $img.style.transform = "rotate( 270deg )";
                        break;
	                }	                
	             });
				file['index'] = thisNo;
	            $colDiv1.style = "background : url("+e.target.result+") center / cover no-repeat; background-size: contain;";
                $colDiv1.setAttribute("data-code", e.target.result);
                $imgDiv.style.width = ($img.naturalWidth) * 0.2 + "px";
                $imgDiv.style.height = ($img.naturalHeight) * 0.2 + "px";
                $(".photoArea").css({"background":"url("+e.target.result+") no-repeat center/cover"})
            }
            $colDiv1.appendChild($imgDiv);
            reader.readAsDataURL(file);
            thisNo++;
        })
        if(isImage){
	        multipleContainer.appendChild($colDiv1);
	        fileCnt++;
	        if(isFeed == "Y"){
		        $(".addFotoCnt").text(fileCnt + "/10");
			}else{
		        $(".addFotoCnt").text(fileCnt + "/5");
			}
	        $("#count").text(fileCnt);
		}
    }
};

function readProfileImage(input) {
    if (input.files && input.files[0]) {
	    var ext = input.files[0].type.split("/")[1];
	    if($.inArray(ext, ["gif","jpg","jpeg","png"]) == -1){ 
			alert("이미지 형식의 파일이 아닙니다.");
			document.getElementById('user').style = "background : url(../images/user.png) no-repeat 50%/65px auto";
			SingleArr = [];
			return;
		}
		fileArr = Array.from(input.files);
        fileArr.forEach((file, index) => {
			loadImageOrientation(file, "single");		
		    var reader = new FileReader();
		    reader.onload = function(e) {
		     	document.getElementById('user').style = "background : url("+e.target.result+") center / cover no-repeat";
		    };
	    	reader.readAsDataURL(input.files[0]);
    	});
 	}else{
		document.getElementById('user').style = "background : url(../images/user.png) no-repeat 50%/65px auto";
		SingleArr = [];
	}
};

function readDiaryImage(input, year, month, color) {
    if (input.files && input.files[0]) {
	    var ext = input.files[0].type.split("/")[1];
	    if($.inArray(ext, ["gif","jpg","jpeg","png"]) == -1){ 
			alert("이미지 형식의 파일이 아닙니다.");
			fileArr.length = 0;
			return;
		}
		fileArr = Array.from(input.files);
		
		if(fileArr.length === 0){
			alert("파일이 없습니다.");
			return;
		}
		
		let formData = new FormData();
		formData.append("year", year);
		formData.append("month", month);
		formData.append("color", color);
		formVO = {formData: formData};
		loadImageOrientation(fileArr[0], "diary");
		}
};

function insertDiaryImage(){
	let formData = formVO.formData
	formData.append("files", diaryImageArr[0]);
	requestPostFileUI("diary/insertDiaryDateThumb", formData , function(res) {
		let msg = res.msg;
		
		if(msg != 'Y'){
			alert("업로드 실패했습니다.");
			return;	
		}
		location.reload();
	});
}

function insertInfoImage(input, txt) {
	//첨부파일 항목 구분코드 저장
    const targetFileCode = input.dataset.code == undefined ? "" : input.dataset.code;
    //첨부파일 항목별 구분코드 부여
    if (input.files && input.files[0]) {
		input.files[0]['code'] = targetFileCode;
	    var reader = new FileReader();
	    var ext = input.files[0].type.split("/")[1];
	    if($.inArray(ext, ["gif","jpg","jpeg","png","pdf"]) == -1){
			alert("올바른 형식의 파일이 아닙니다.");
			return;
		}
	    var sttus = input.files[0].code;
		    reader.onload = function(e) {
			if($.inArray(ext, ["gif","jpg","jpeg","png"]) != -1){
				if(!admin){
			     	 $(".filebox"+txt).attr("style","background: url(\"" +e.target.result+"\") center / cover no-repeat; background-size: contain;");
				}else{
					$("#"+sttus+"P").show();
					$("#"+sttus+"P").siblings(".photoContent").hide();
					$("#"+sttus+"P").attr("style","background: url(\"" +e.target.result+"\") center / cover no-repeat; background-size: contain;");
					
				}
			}else if($.inArray(ext, ["pdf"]) != -1){
				if(!admin){
			     	 $(".filebox"+txt).attr("style","background: url('/images/icon_uploadPdf.png') center /30% no-repeat;");
				}else{
					$("#"+sttus+"P").show();
					$("#"+sttus+"P").siblings(".photoContent").hide();
					$("#"+sttus+"P").attr("style","background: url('/images/icon_uploadPdf.png') center /30% no-repeat;");
				}
			}
	    };
		
		farmArr.push(input.files[0]);
		var ret = farmArr.find( data => {
			return data.code === input.files[0]['code'] ? 1 : 0;
		});
	
		if(ret){
			farmArr = farmArr.filter((e) => e.code !== input.files[0]['code']);
			farmArr.push(input.files[0]);
			loadImageOrientation(input.files[0], "farm");
		}else{
			loadImageOrientation(input.files[0], "farm");
		}
	    $(".frmFile"+txt).val(thisNo);
	    $(".xBox"+txt).attr("style","display:block;");
    	reader.readAsDataURL(input.files[0]);
    	thisNo++;
 	}
};

function insertBannerImage(input,bannerNo) {
	//첨부파일 항목 구분코드 저장
    const targetFileCode = input.dataset.code == undefined ? "" : input.dataset.code;
    //첨부파일 항목별 구분코드 부여
    if (input.files && input.files[0]) {
		input.files[0]['code'] = targetFileCode;
	    var reader = new FileReader();
	    var ext = input.files[0].type.split("/")[1];
	    if($.inArray(ext, ["gif","jpg","jpeg","png","pdf"]) == -1){
			alert("올바른 형식의 파일이 아닙니다.");
			return;
		}
		bannerImageArr[bannerNo-1] = input.files[0];
		$("#bannerImgText_"+bannerNo).text(input.files[0].name);
 	}
};

function insertThumbnailImgImage(input) {
	//첨부파일 항목 구분코드 저장
    const targetFileCode = input.dataset.code == undefined ? "" : input.dataset.code;
    //첨부파일 항목별 구분코드 부여
    if (input.files && input.files[0]) {
		input.files[0]['code'] = targetFileCode;
	    var reader = new FileReader();
	    var ext = input.files[0].type.split("/")[1];
	    if($.inArray(ext, ["gif","jpg","jpeg","png","pdf"]) == -1){
			alert("올바른 형식의 파일이 아닙니다.");
			return;
		}
		thumbnailImageArr.pop();
		thumbnailImageArr.push(input.files[0]);
		
		/*formData.append("files", bannerImageArr[0]);
		requestPostFileUI("mngr/insertBanner", formData , function(res) {
			let msg = res.msg;
			
			if(msg != 'Y'){
				alert("업로드 실패했습니다.");
				return;	
			}
			location.reload();
		});*/
 	}
};

function loadImageOrientation(file, type){
	loadImage(file, function (img, data) {
		if(!data) return;
		if (data.imageHead && data.exif) {
			loadImage.writeExifData(data.imageHead, data, 'Orientation', 1);
			img.toBlob(function (blob) {
				loadImage.replaceHead(blob, data.imageHead, function (newBlob) {
					newBlob.name = file.name;
					const myFile = new File([newBlob], file.name);
					myFile.code = file.code;
					if(type == "multi") newArr.push(myFile);
					if(type == "single") {
						SingleArr.pop();
						SingleArr.push(myFile);	
					}
					if(type == "farm") {
						farmArr.pop();
						farmArr.push(myFile);
					}
					if(type == "diary") {
						diaryImageArr.push(myFile);
						insertDiaryImage();
					}
					
				});
	  		}, 'image/jpeg');
		} else {
			if(type == "multi") newArr.push(file);
			if(type == "single") {
				SingleArr.pop();
				SingleArr.push(file);
			}
			if(type == "farm") {
				farmArr.pop();
				farmArr.push(file);
			}
			if(type == "diary") {
				diaryImageArr.push(file);
				insertDiaryImage();
			}
		}
	}, { meta: true, orientation: true, canvas: true },);
}

$(function(){
	/*for(var i=0; bannerImageArr.length; i++){
		bannerImageArr[i] = "";
	}*/
	//문의등록 사진 , 대표 이미지
	$("#file").on("change", function(e){
		if(fileCnt == 5){
			alert("사진은 5개까지 등록할수 있습니다");
			return;
		}
		readMultipleImage(e.target,"multiple-container","reviewFoto","N");
	});
	
	//피드
	$("#feedFile").on("change", function(e){
		if(fileCnt == 10){
			alert("사진은 10개까지 등록할수 있습니다");
			return;
		}
		readMultipleImage(e.target,"modify-container","reviewFoto","Y");
	});
	
	//문의수정 사진
	$("#modifyFile").on("change", function(e){
		if(fileCnt == 5){
			alert("사진은 5개까지 등록할수 있습니다");
			return;
		}
		readMultipleImage(e.target,"modify-container","reviewFoto","N");
	});
	
	//사진관리 수정
	$("#mngrFile").on("change", function(e){
		readMultipleImage(e.target,"frmFotoList","frmFoto");
	});

	//기본정보 사진수정
	$("#profilePhoto").on("change", function(e){
		readProfileImage(e.target);
	});
	
	//농장관련자료 - 농지취득자격
	$("#frmFile1").on("change", function(e){
		insertInfoImage(e.target,"1");
	});
	
	//농장관련자료 - 신분증
	$("#frmFile2").on("change", function(e){
		insertInfoImage(e.target,"2");
	});
	
	//농장관련자료 - 지적도사진
	$("#frmFile3").on("change", function(e){
		insertInfoImage(e.target,"3");
	});
	
	//농장관련자료 - 사업자등록증
	$("#frmFile4").on("change", function(e){
		insertInfoImage(e.target,"4");
	});
	
	//농장관련자료 - 농지취득자격
	$("#regfrmFile1").on("change", function(e){
		insertInfoImage(e.target,"1");
	});
	
	//농장관련자료 - 신분증
	$("#regfrmFile2").on("change", function(e){
		insertInfoImage(e.target,"2");
	});
	
	//농장관련자료 - 지적도사진
	$("#regfrmFile3").on("change", function(e){
		insertInfoImage(e.target,"3");
	});
	
	//농장관련자료 - 사업자등록증
	$("#regfrmFile4").on("change", function(e){
		insertInfoImage(e.target,"4");
	});
	
	$(".bannerImg").on("change", function(e){
		var thisNo = $(this).attr("id").split("_")[1];
		insertBannerImage(e.target,thisNo);
	});
	
	$("#thumbnailImg").on("change", function(e){
		insertThumbnailImgImage(e.target);
	});
	
	//호미일지 - 대표이미지
	for(var i=1; i <= 12; i++) {
		$(document).on("change", `#diaryUp${i}`, function(e){
			readDiaryImage(e.target, $(this).attr("data-year"), $(this).attr("data-month"), "");
		});		
	}
})
