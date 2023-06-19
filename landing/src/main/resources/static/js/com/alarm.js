$(function(){
	fn_createAlarmCmmCode();
	$(".btnBack").click(function() {
		// history.back();
		location.href = '/';
	});
	
	if($("#userType").val() !=''){
		selectAlarmList();
	}
	
	//단일 읽음처리
	$(document).on('click','.infoList',function(){
		if($(this).hasClass("readInfo")) return;
		var ntcnNo = $(this).attr("id").split("_")[1];
		var params = {
			ntcnNoArr : ntcnNo
		}
		requestPostNoBlockUI("cmm/updateAlarmRead", "json", params, function(res) {
			var msg = res.msg;
			if(msg == "Y"){
				selectAlarmList();
			}
		});
	});
	
	//알림타입 변경
	$("#pushType, #readType").on("change", function() {
		selectAlarmList();
	});
	
	//전체읽음처리
	$("#pushAllRead").on("click", function() {
		if(confirm("전체읽음 처리하시겠습니까?")) {
			fn_updateAllRead();
		}
	});
	
	//목록 링크 이동
	$(document).on("click", ".alramBox .infoUrl", function() {
		let thisFarmFlag = $(this).data("url").toString().split("?")[1];
		let thisUrl = $(this).data("url").toString().split("?")[0];
		if($(this).data("url")) {
			if(thisFarmFlag != undefined){ // 농장일 경우 농장정보 조회 후 PARAM 전송
				if(thisUrl != '/feed') {//2023.04.14
					let farmNo = thisFarmFlag.replace('farmNo=', '');
					requestPostNoBlockUI("farm/selectFarmParmDataList", "json", {farmNo: farmNo}, function(res) {
						let data = res.data;
						data.todo = 'alarm';
						formDataAction('formAction', 'post', thisUrl, data);
					});					
				} else {
					location.href = $(this).data("url");
				}
			}else{
				location.href = $(this).data("url");
			}
		}
	});
});

//공통코드 조회
function fn_createAlarmCmmCode () {
	requestPostNoBlockUI("cmm/select/code", "json", { cmmnGroup: 8 }, function(res) {
		var data = res.msg;
		var result = res.result;
		$("#pushType").html("");
		var html = "";
		if (data == "Y") {
			html += '<option value="" selected>전체</option>';
			for (var i = 0; i < result.length; i++) {
				if($("#userType").val() == '1') {
					if(result[i].cmmnCode == 56 || result[i].cmmnCode == 62 || result[i].cmmnCode == 63 || result[i].cmmnCode == 57 || result[i].cmmnCode == 58  || result[i].cmmnCode == 72) {
						html += "<option value='" + result[i].cmmnCode + "'>" + result[i].cmmnValue + "</option>"					
					}
				} else if($("#userType").val() == '2') {
					if(result[i].cmmnCode == 72 || result[i].cmmnCode == 59 || result[i].cmmnCode == 60 || result[i].cmmnCode == 61){					
						html += "<option value='" + result[i].cmmnCode + "'>" + result[i].cmmnValue + "</option>"
					}
				}
			}
			$("#pushType").append(html); 
		}
	});
};

//전체읽음(아직 안읽은 번호만 조회)
function fn_updateAllRead() {
	let arr = new Array();
	$(".mList6 .infoList").each(function(){
		if($(this).data("at") === 'N') {
			arr.push($(this).attr("id").split("_")[1]);
		}
	});
	let params = {ntcnNoArr : arr.join()};
	if(params.ntcnNoArr) {
		requestPostNoBlockUI("cmm/updateAllRead", "json", params, function(res) {
			let msg = res.msg;
			if(msg == 'Y') {
				selectAlarmList(1);
			}
		});		
	}
};

//알림목록 조회
function selectAlarmList(pageIndex){
	var params = {
		id : $("#id").val(),
		pushType : $("#pushType option:selected").val() == null ? '' : $("#pushType").val(),
		readAt : $("#readType option:selected").val(),
		pageIndex : pageIndex
	}
	requestPostNoBlockUI("cmm/selectAlarmList", "json", params, function(res) {
		//let msg = res.msg;
		let result = res.data;
		let paging = res.paging;
		$(".alramBox").html("");
		if(result.length < 1){
			$(".alramBox").append("<div class='noDate'>새로운 소식이 없습니다.</div>");
			return;
		}
		var html = "";
		for(var i=0; i<result.length; i++){
			if(result[i].readAt == "N"){
				if(result[i].pushUrl == ''){
					html += '<div class="info infoList" data-url="'+result[i].pushUrl+'" id="ntcnNo_'+result[i].ntcnNo+'" data-at='+result[i].readAt+'>';
				}else{
					html += '<div class="infoUrl infoList" data-url="'+result[i].pushUrl+'" id="ntcnNo_'+result[i].ntcnNo+'" data-at='+result[i].readAt+'>';
				}
				html += '<div class="pic"></div>';
			}else{
				if(result[i].pushUrl == ''){
					html += '		<div class="info infoList readInfo" data-url="'+result[i].pushUrl+'" id="ntcnNo_'+result[i].ntcnNo+'" data-at='+result[i].readAt+'>';
				}else{
					html += '		<div class="infoUrl infoList readInfo" data-url="'+result[i].pushUrl+'" id="ntcnNo_'+result[i].ntcnNo+'" data-at='+result[i].readAt+'>';
				}
				html += '	<div class="pic"></div>';
			}
			html += '		<div class="sub">';
			html += '			<span>'+result[i].sj+'</span>';
			html += '			<div class="sub">';
			html += '				<p>'+result[i].cn+'</p>';
			html += '				<span>'+result[i].registDt+'</span>';
			html += '			</div>';
			html += '		</div>';
			html += '	</div>';
			html += '</div>';
		}
		$(".alramBox").append(html);
	});
}