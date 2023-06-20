//git test

$(function(){
	fn_selectBoard();
	fn_selectBoardComment();
});

$(document).ready(function(){
	//하고싶은말 등록
	$("#commentBtn").click(function(){
		fn_insertBoardComment();
	});
	
	//식당 상태 변경
	$(document).on("click","#foodStateBtn", function() {
		var boardSn = $(this).data("sn");
		var selectedVal = $(`#foodState${boardSn} option:selected`).val();
		var params = {
			foodState : selectedVal,
			boardSn :boardSn
		}
		
		if(confirm("변경하시겠습니까?")) {			
			fn_updateBoardState(params);
		}
	});
	
	//좋아요
	$(document).on("click","#likeBtn", function() {
		var commentSn = $(this).data("sn");
		var likeAt = readlocalStorage(`commentLike-${commentSn}`);
		var params = {
			commentSn :commentSn,
			likeAt : likeAt
		}
		fn_updateBoardCommentLike(params);
	});
})

function fn_selectBoard () {
	requestPostNoBlockUI("selectBoard", "json", null, function(res) {
		var msg = res.msg;
		var result = res.result;
		$("#board").html("");
		if(msg == 'Y') {
			var li = "";
			for (var i = 0; i < result.length; i++) {
				//구내식당 상태 
				var foodStateTag = `<select id="foodState${result[i].boardSn}" class="aSelect Select1">
                        <option value="1" ${result[i].foodState == 1 ? 'selected' : ''}>쾌적함</option>
                        <option value="2" ${result[i].foodState == 2 ? 'selected' : ''}>적당함</option>
                        <option value="3" ${result[i].foodState == 3 ? 'selected' : ''}>복잡함</option>
                    </select>`;
                    
				li += `<li class="menuLunch">
					   		<div class="lunchTit">
								<h2>${result[i].title}</h2>
							</div>
							<div class="lunchDataBox lunchDataBox1">
								<p class="lunchData lunchData4">${result[i].registDt}</p>
							</div>
							<div class="lunchFood">
								<div class="lunchImg"></div>
								<div class="lunchRight">
									<div class="lunchDataBox">
										<h3 class="lunchStateTit">현재 상태는 어떤가요?</h3>
										<h2 class="lunchData lunchData2 bold">${result[i].foodStateNm}</h2>
										<p class="lunchData3">${result[i].updateDt}</p>
									</div>
									<div class="lunchDataBox lunchDataBox2">
										
										${foodStateTag}
										<button type="button" class="btn btn1" id="foodStateBtn" data-sn="${result[i].boardSn}">식당상황 알려주기</button>
									</div>
									<div class="lunchDataBox lunchDataBox3">		
										<p class="lunchDataTit">${result[i].cn}</p>		
										<p class="lunchData lunchData1">${result[i].food1}</p>		
										<p class="lunchData lunchData1">${result[i].food2}</p>		
										<p class="lunchData lunchData1">${result[i].food3}</p>		
										<p class="lunchData lunchData1">${result[i].food4}</p>		
										<p class="lunchData lunchData1">${result[i].food5}</p>		
										<p class="lunchData lunchData1">${result[i].food6}</p>
									</div>
								</div>							
							</div>
				       </li>`;
			}
			$("#board").append(li); 
		}
	});
};

function fn_selectBoardComment () {
	requestPostNoBlockUI("selectBoardComment", "json", null, function(res) {
		var msg = res.msg;
		var result = res.result;
		var total = res.total;
		$("#comment").html("");
		if(msg == 'Y') {
			if(!total) {
				$(".commentTotal").hide();
			} else {			
				$("#commentTotal").text(total || 0);
			}
			var li = "";
			for (var i = 0; i < result.length; i++) {
				var likeBtnColor = "";
				var likeAt = readlocalStorage(`commentLike-${result[i].commentSn}`);
				if(likeAt == "Y") {
					likeBtnColor = "red";
				}
			
				li += `<li>
					   		<div>	
								<p class="comt comt1">
									${result[i].ncnm}
									<span class="comt comt3">
										${result[i].registDt}
									</span>
								</p>		
								<p class="comt comt2">${result[i].cn}</p>		
							</div>
							<div class="comt comt4">
								<div class="btn btn3">
									<button type="button" style="color:${likeBtnColor};" class="likeIco" id="likeBtn" data-sn="${result[i].commentSn}">♥</button>
									<span> ${result[i].likeCnt}</span>
								</div>
							</div>
				       </li>`;
			}
			$("#comment").append(li); 
		}
	});
};

//댓글 등록
function fn_insertBoardComment() {
	var ncnm = $("#ncnm").val();
	var cn = $("#cn").val();
	
	if(!ncnm) {
		alert("닉네임을 작성해주세요.");
		return false;
	}
	if(!cn) {
		alert("내용을 입력해주세요.");
		return false;
	}
	
	var params = {
			ncnm : ncnm,
			cn :cn
	};
		
	requestPostNoBlockUI("insertBoardComment", "json", params, function(res) {
		var msg = res.msg;
		if(msg == 'Y') {
			alert("등록되었습니다.");
			fn_selectBoardComment();
		} else if(msg == 'N') {
			alert("등록실패하였습니다. 다시 시도해주세요.");
		} else {
			alert("등록중 문제가 발생하였습니다.");
		}
	});
}

//상태변경
function fn_updateBoardState(params) {
	requestPostNoBlockUI("updateBoardState", "json", params, function(res) {
		var msg = res.msg;
		if(msg == 'Y') {
			alert("변경되었습니다.");
			fn_selectBoard();
		} else if(msg == 'N') {
			alert("변경에 실패하였습니다. 다시 시도해주세요.");
		} else {
			alert("변경중 문제가 발생하였습니다.");
		}
	});
}

//좋아요
function fn_updateBoardCommentLike(params) {
	
	if(params.likeAt == null) {
		params.likeAt = 'N';
	}
		
	requestPostNoBlockUI("updateBoardCommentLike", "json", params, function(res) {
		var msg = res.msg;
		if(msg == 'Y') {
			//좋아요 아이콘 변경 
			//사용자 브라우저마다 좋아요 정보 저장(로컬스토리지)
			if(params.likeAt == null || params.likeAt == 'N') {
				savelocalStorage(`commentLike-${params.commentSn}`, 'Y');
			} else {
				savelocalStorage(`commentLike-${params.commentSn}`, 'N');
			}
			
			fn_selectBoardComment();
		} else if(msg == 'N') {
			alert("변경에 실패하였습니다. 다시 시도해주세요.");
		} else {
			alert("좋아요 문제가 발생하였습니다.");
		}
	});	
	
}