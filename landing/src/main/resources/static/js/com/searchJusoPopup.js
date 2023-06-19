$(document).ready(function(){
	event();
});
  
function event(){
	
/*	$("#btnMove1").click(function(){
		$(".srhJuso").show();
		$(".chooseJuso").hide();
		$(".regJuso").hide();
	});
	
	$("#btnMove2").click(function(){		
		$(".srhJuso").hide();
		$(".chooseJuso").show();
		$(".regJuso").hide();
	});*/

	$(".btnClose").click(function(){
		//window.close();
		$("#jsAddress1").hide();
	});
	
	$("#btnReg").click(function(){
		
		if(!$("#addrDetail").val()){
			alert("상세주소를 입력해주세요.");
			return;
		}		
//		var addr = $("#addr").val();
//		var addrDetail = $("#addrDetail").val();
		var expText =  /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|/\s/g|]*$/;
		var reg_hpno = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}/;
		if(expText.test($("#fcltyNm").val()) == false){
			alert("시설명에는 특수문자를 입력 할수 없습니다.") ;
			$("#fcltyNm").val('')
			return false;
		}
		
		if($("#check").val() == "1" && fcltyMbtl != ''){
			if(!reg_hpno.test(fcltyMbtl)){
				alert('전화번호를 확인해주세요');
				return;
			}
		}
		
		if($("#check").val() == "2"){
			if(!fcltyNm){
				alert("시설명 또는 시설주명을 입력해주세요.");
				return;
			}
			
			if(fcltyMbtl != ''){
				if(!reg_hpno.test(fcltyMbtl)){
					alert('전화번호를 확인해주세요');
					return;
				}
			}
			
			
		}
		
		/*var params = {
			addr : addr,
			addrDetail : addrDetail,
			admCd : $("#admCd").val(),
			siNm : $("#siNm").val(),
			sggNm : $("#sggNm").val(),
			entX : $("#entX").val(),
			entY : $("#entY").val()
		}
		
			opener.jusoCallBack(params);
			window.close();*/
			
			$("#adres").val($("#addr").val());
			$("#detailAdres").val($("#addrDetail").val());
			$("#ctprvn").val($("#siNm").val());
			$("#signgu").val($("#sggNm").val());
			$("#ctprvnCd").val($("#admCd").val().substring(0,2));
			$("#signguCd").val($("#admCd").val().substring(0,5));
			$("#entX").val($("#entX").val());
			$("#entY").val($("#entY").val());
			$("#jsAddress1").hide();
	});
	
	
	$("#keyword").keyup(function(e){	
		if(e.keyCode == 13){
			searchJusoList(1); 
		}
	});
	
	$(".btnSrh").click(function(){
		searchJusoList(1);
	});
	
	$("input[name=firstSort]").click(function(){
		searchJusoList(1);
	});

};

function checkSearchedWord(str){
	if(str.length >0){
		//특수문자 제거
		var expText =  /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|/\s-/g|]*$/;
		if(expText.test(str) == false){
			alert("주소검색에 특수문자를 입력 할수 없습니다.") ;
			$("input[name=keyword]").val('');
			$("#keyword").val('')
			return false;
		}
		
		//특정문자열(sql예약어의 앞뒤공백포함) 제거
		var sqlArray = new Array(
			//sql 예약어
			"OR", "SELECT", "INSERT", "DELETE", "UPDATE", "CREATE", "DROP", "EXEC",
             		 "UNION",  "FETCH", "DECLARE", "TRUNCATE" 
		);
		
		var regex;
		for(var i=0; i<sqlArray.length; i++){
			regex = new RegExp( sqlArray[i] ,"gi") ;
			
			if (regex.test(str) ) {
			    alert("\"" + sqlArray[i]+"\"와(과) 같은 특정문자로 검색할 수 없습니다.");
				$("input[name=keyword]").val('');
				$("#keyword").val('')
				return false;
			}
		}
	}
	return true ;
}

function searchJusoList(pageIndex){
	
	if (!checkSearchedWord($("#keyword").val())) {
		return ;
	}
	
	$(".srhJuso").hide();
	$(".regJuso").hide();
	$(".chooseJuso").show();
	
	var hstryYn = 'N'
	
	if($("#ckHstryYn1").is(':checked')) hstryYn = 'Y';
	if($("#ckHstryYn2").is(':checked')) hstryYn = 'Y';
	if($("#ckHstryYn3").is(':checked')) hstryYn = 'Y';
		
	$("input[name=keyword]").val($("#keyword").val());
	
	
	var data = {
		/*currentPage : pageIndex,
		countPerPage : $("#countPerPage").val(),
		resultType	: $("#resultType").val(),
		confmKey : $("#confmKey").val(),*/
		keyword : $("#keyword").val(),
		hstryYn : hstryYn,
		firstSort : $("input[name=firstSort]:checked").val(),
		pageIndex : pageIndex
	}

	requestPost("juso/search",'json', data , function(res) {
		var data = res.result;
		var li, div, ti, rt;
		var ul = $("#ulResult")
		
		ul.html("");
		$('.mPag').html("");

		if(data.length < 1){
			$(".srhJuso").show();
			$(".chooseJuso").hide();
			$(".regJuso").hide();
			return;
		}
		
		for(var i=0; i<data.length; i++){
			li = $("<li>");
			
			var roadAddr = data[i].roadAddrPart1
			var jibunAddr = data[i].jibunAddr
			var keyword = $("#keyword").val();
			
			var roadIdx = roadAddr.indexOf(keyword);
			var jibunIdx = jibunAddr.indexOf(keyword);
			
			div= $("<div class='txt'>");	
			var roadObj = ''; 
				roadObj	+=		'<em class="ti">도로명</em>'
				roadObj	+= 		'<div class="rt">'+data[i].zipNo+'</div>';
				roadObj +=			data[i].roadAddrPart1;
			div.append(roadObj);
			div.css('cursor', 'pointer');
			div.click(data[i], function(item){
				var result = item.data;
				$("#addr").val(result.roadAddrPart1);
				$("#admCd").val(result.admCd);
				$("#siNm").val(result.siNm);
				$("#sggNm").val(result.sggNm);
				$("#rnMgtSn").val(result.rnMgtSn);
				$("#udrtYn").val(result.udrtYn);
				$("#buldMnnm").val(result.buldMnnm);
				$("#buldSlno").val(result.buldSlno);
				$(".chooseJuso").hide();
				$(".regJuso").show();
				
				//주소 좌표 조회
				fn_jusoCoordSearch(result);
			});
			li.append(div);
			ul.append(li);
		}
		$("#totCount").text('(' + res.tot + '건)');
		$(".first").remove();
		$(".end").remove();
	});
}

proj4.defs("EPSG:5179","+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"); // UTM-K

//주소 좌표조회
function fn_jusoCoordSearch(params) {
	requestPost("juso/coordSearch",'json', params , function(res) {
		var data = res.result;
		
		if(data) {
			var target = proj4.transform(proj4.Proj(proj4.defs["EPSG:5179"]),proj4.Proj(proj4.defs["EPSG:4326"]),proj4.Point( data[0].entX , data[0].entY ));
			$("#entX").val(target.x);
			$("#entY").val(target.y);
		}
	});
};

