//대체이미지 전역변수
var replcImage = '/images/ex05.jpg';
var ajaxBUICnt = 0;
var ctxPath = $("#ctxPath").val() || "/";

//분양상태 구분 코드 공통관리
//const lttotReqst = 17;
const lttotReqst = 17;//신청가능
const lttotNotRcpmny = 18; // 미입금
const lttotRcpmnyCnfirm = 19; //입금확인중
const lttotCompt = 20; // 분양완료

//서버 경로(path)
const SERVER_PATH = 'https://www.hoe.co.kr/';
//const SERVER_PATH = 'https://192.168.7.43:8443/';
//const SERVER_PATH = 'http://192.168.7.43:8080/';
//const SERVER_PATH = 'http://192.168.7.4:14880/';
//const SERVER_PATH = 'http://114.204.218.123:2222/';

let bannerAt = true;//배너창 유지 여부

//html5 좌표조회 (브라우저 권한 승인해야함) 샘플... 동기방식이라서 리턴 받아 사용x (비동기 방식 찾아야함)
function getMyGps() {
  	if (navigator.geolocation) { // GPS를 지원하면
  		return new Promise((resolve, rejected) => {
			navigator.geolocation.getCurrentPosition(resolve, rejected);
		});
	} else {
		alert('GPS를 지원하지 않습니다');
    }
};
const getCoordinate = async () => {
    if (navigator.geolocation) {
		const position = await getMyGps();
		return {
			lat: position.coords.latitude,
			lon: position.coords.longitude
		};
    }else {
        // Geolocation API에 액세스할 수 없으면 서울시청 좌표 리턴
		return {
			lat: 37.566353,
        	lon: 126.977953
		};
    }
};
const fn_getGps = async () => {
    const result = await getCoordinate();
    return result;
};

function getCookieValue(cookieName) {
  const cookies = document.cookie.split(";"); // 쿠키 문자열 파싱
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${cookieName}=`)) { // 쿠키 이름으로 쿠키 찾기
      return cookie.substring(cookieName.length + 1); // 쿠키 값 반환
    }
  }
  return null; // 해당하는 쿠키가 없을 경우 null 반환
};


function autoHypenPhone(str){
	if(!str) return str || "";
      str = str.replace(/[^0-9]/g, '');
      var tmp = '';
      if( str.length < 4){
          return str;
      }else if(str.length < 7){
          tmp += str.substr(0, 3);
          tmp += '-';
          tmp += str.substr(3);
          return tmp;
      }else if(str.length < 11){
          tmp += str.substr(0, 3);
          tmp += '-';
          tmp += str.substr(3, 3);
          tmp += '-';
          tmp += str.substr(6);
          return tmp;
      }else{              
          tmp += str.substr(0, 3);
          tmp += '-';
          tmp += str.substr(3, 4);
          tmp += '-';
          tmp += str.substr(7);
          return tmp;
      }
  
      return str;
}

function autoBizrNo(str){
      str = str.replace(/[^0-9]/g, '');
      var tmp = '';
      if( str.length < 4){
          return str;
      }else if(str.length < 6){
          tmp += str.substr(0, 3);
          tmp += '-';
          tmp += str.substr(3,2);
          return tmp;
      }else if(str.length < 11){
          tmp += str.substr(0, 3);
          tmp += '-';
          tmp += str.substr(3, 2);
          tmp += '-';
          tmp += str.substr(5);
          return tmp;
      }else{              
          tmp += str.substr(0, 3);
          tmp += '-';
          tmp += str.substr(3, 2);
          tmp += '-';
          tmp += str.substr(5);
          return tmp;
      }
  
      return str;
}

function phoneFormat(target) {
  // 특수문자 제거
  target = target.replace(/[^0-9]/g, "");

  const value = target.split("");
  
  const textArr = [
    // 첫번째 구간 (00 or 000)
    [0, value.length > 9 ? 3 : 2],
    // 두번째 구간 (000 or 0000)
    [0, value.length > 10 ? 4 : 3],
    // 남은 마지막 모든 숫자
    [0, 4]
  ];

  // 총 3번의 반복 ({2,3}) - ({3,4}) - ({4})
  target = textArr
    .map(function(v)  { 
  	  return value.splice(v[0], v[1]).join("") 
    })
    .filter(function(text) { 
   	  return text 
    })
    .join("-");
    return target;
}


function requestPost(url, type, params, callback, async, error, mthd, afterFnc){

	ajaxBUICnt++;
	if(ajaxBUICnt === 1){
		$.blockUI({
			message : $('#progressImg').html(),
			css : {
				border : 'none',
				padding : '15px',
				backgroundColor : '#000',
				'-webkit-border-radius' : '10px',
				'-moz-border-radius' : '10px',
				opacity : .5,
				color : '#fff'
			}
		});
	}
	if(mthd == null){
		mthd = "post";
	}
	
	var post;
	if (error == null) {
		error = function(data) {
		};
	}
	if(async == null){
		async = true;
	}
	jQuery.ajaxSettings.traditional = true;
	
	post = $.ajax({
		url : url.indexOf("http://") == -1 ? ctxPath + url : url,
		type        : mthd,
        dataType    : type,
        async       : async,
        data		: params
	}).success(callback).error(error).complete(function() {
		ajaxBUICnt--;
		if(ajaxBUICnt === 0){
			$.unblockUI();
		}
		if(afterFnc) afterFnc();
		
	});
	
	return post;
}


function requestPostNoBlockUI(url, type, params, callback, async, error, mthd){
	var post = null;
	
	if (error == null) {
		error = function(data) {
		};
	}
	
	if (mthd == null) {
		mthd = "post";
	}
	
	
	if(async == null){
		async = true;
	}
	jQuery.ajaxSettings.traditional = true;
	
	
	post = $.ajax({
		url : url.indexOf("http://") == -1 ? ctxPath + url : url,
		type        : mthd,
        dataType    : type,
        async       : async,
        data		: params
	}).success(callback).error(error).complete(function() {
	});
	
	return post;
}

function requestPostFileUI(url, params, callback,  async, error, mthd){
	var post = null;
	
	if (error == null) {
		error = function(data) {
		};
	}
	
	if (mthd == null) {
		mthd = "post";
	}
	
	
	if(async == null){
		async = true;
	}
	jQuery.ajaxSettings.traditional = true;
	
	
	post = $.ajax({
		url : url.indexOf("http://") == -1 ? ctxPath + url : url,
		enctype: 'multipart/form-data',  
		type        : mthd,        
        data		: params ,
        processData: false,    
        contentType: false,              
	}).success(callback).error(error).complete(function() {
	});
	
	return post;
}

function fnDateSnECheck(sDayId,eDayId){
	
	var mFrom = sDayId.val();
	var mTo = eDayId.val();
	
	if(mFrom == "" && mTo == "" || mFrom == null && mTo == null){
		return false;
	}else if(mFrom == ""){
		sDayId.val(mTo);
		mFrom = mTo;
	}else if(mTo == ""){
		eDayId.val(mFrom);
		mTo = mFrom;
	}
	
	var arrTo = mTo.split("-");
	var arrFrom = mFrom.split("-");
	
	var toDate = new Date(arrTo[0], arrTo[1]-1, arrTo[2]);
    var fromDate = new Date(arrFrom[0], arrFrom[1]-1, arrFrom[2]);
	var dateCnt =  (toDate - fromDate) /1000/60/60/24;
	
	if(dateCnt < 0){
		return true;
	}
}

//지정한 날짜 만큼 이전의 날짜를 보여 준다.
function getDaysAgo(daysago, date){
	var toDay = new Date();
	if(date){
		toDay = new Date(date);
	}
	
	toDay.setDate(toDay.getDate() - daysago); 
	
    var Year = toDay.getFullYear();
    var Month = toDay.getMonth() + 1;
    if(Month < 10){
    	Month = "0" + Month;
    }
    var Day = toDay.getDate();
    
    if(Day < 10){
    	Day = "0" + Day;
    }
    
    var makeDay = Year +"-"+ Month +"-"+Day;
    
    return makeDay;    
}
//날짜 차이 계산
function getDateDiff(date1, date2){
    var arrDate1 = date1.split("-");
    var getDate1 = new Date(parseInt(arrDate1[0]),parseInt(arrDate1[1])-1,parseInt(arrDate1[2]));
    var arrDate2 = date2.split("-");
    var getDate2 = new Date(parseInt(arrDate2[0]),parseInt(arrDate2[1])-1,parseInt(arrDate2[2]));
    var getDiffTime = getDate1.getTime() - getDate2.getTime();
    
    return Math.floor(getDiffTime / (1000 * 60 * 60 * 24));
}

//날짜/ 기간의 시작일과 종료일을 임의수에따라 분할하여 반환
function getDateSplitList(sDate,eDate,n){//시작일,종료일,분할수
	var result = [];
	
	var dateDiff =  Math.ceil((Math.abs(getDateDiff(sDate,eDate))+1)/n);
	
	
	var tmpStrt = sDate;
	for(var i=0;i<dateDiff;i++){
		var tmpEnd = getDaysAgo(-(n-1),tmpStrt);
		if(new Date(tmpEnd) >= new Date(eDate)){
			tmpEnd = eDate;
		}
		
		result.push([tmpStrt,tmpEnd]); 
		tmpStrt = getDaysAgo(-(n),tmpStrt);
	}
	
	return result;
}



function fn_delay(fnc,sec,obj){
	var timer = setInterval(function () {
        clearInterval(timer);
        fnc(obj);
     }, sec,obj);
}


function fn_fncLoad(name,params){
	var fnc = eval(name);
	fnc(params);
}

function getFuncName(caller) { 
    var pat = /^function\s+([a-zA-Z0-9_]+)\s*\(/i;
    pat.exec(caller.toString());  //메서드가 일치하는 부분을 찾으면 배열변수를 반환하고, 검색 결과를 반영하도록 RegExp 개체가 업데이트된다.
    var func = new Object(); 
    func.name = RegExp.$1; 
    return func; 
}

function addDateHipn(str){
	return str?str.substring(0,4)+"-"+str.substring(4,6)+"-"+str.substring(6,8):"";
}

//셀렉트박스
function setSelectbox(id, data, first, txt, select){
	var tgt = $(id);
	var addData="";
	if(first){
		addData += '<option value="">'+first+'</option>';
	}
	if(data.length > 0){
		for(var i=0; i<data.length; i++){
			addData += '<option value="'+data[i].cd+'" '+(data[i].cd==select?'selected="selected"':'')+'>'+data[i].cdNm+'</option>';
		}
	}else{
		if(txt){
			addData  = '<option value="">'+txt+'</option>';
		}
	}
	tgt.html(addData);
}

function fillzero(n, digits, rvs) { 
	var zero = '';
	n = n.toString();
	if (digits > n.length) {
		for (var i = 0; digits - n.length > i; i++) {
			zero += '0';
		}
	}
	if(rvs){
		return n+zero;
	}else{
		return zero + n;
	}
	
}

function listFinder(list,name,code,cdtn){
	var res = []
	var codes = code instanceof Array ? code : [code];
	var len = list.length;
	for(var i=0; i<len; i++){
		var isPush = cdtn ?  true : false;
		for(var j=0;j<codes.length;j++){
			if(list[i][name] == codes[j]){
				isPush = cdtn ? false : true;
				j = codes.length;
			}
		}
		if(isPush){
			res.push(list[i]);
		}
	}
	return res;
}

function openPopup(url,target,datas,width,height,szLock){
	var form = $('<form method="post">');
	for(var i=0;i<datas.length;i++){
		form.append($('<input type="hidden" name="'+datas[i][0]+'" value="'+ datas[i][1] +'">'));
	}
	var str = "width="+(width||"1280")+"px,height="+(height||"720")+"px, top=0, left=2300, scrollbars=no, resizable="+(szLock?"no":"yes")+", location=nos";
	var popWin =  window.open("", target, str);
	popWin.focus();
	form.attr("method","post");
	form.attr("target",target);
	form.attr("action", ctxPath+url);
	form.appendTo('body').submit().remove();
}

function overlapRm(list, conNm){//중복제거 카운트
	return list.reduce(function(a, b) {
		var prv = a.length == 0 ? '' : a[a.length-1][conNm];
		var nxt = b[conNm];
		if (prv.indexOf(nxt) < 0) a.push(b);
		return a;
	}, []);
}
//숫자콤마

function comma(num){
    var len, point, str;  
       
    num = num + "";  
    point = num.length % 3 ;
    len = num.length;  
   
    str = num.substring(0, point);  
    while (point < len) {  
        if (str != "") str += ",";  
        str += num.substring(point, point + 3);  
        point += 3;  
    }  
    return str;
}

 function commas(str) {
     str = String(str);
     return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
 }


function uncomma(str) {
     str = String(str);
     return str.replace(/[^\d]+/g, '');
 }

function rgb2hex(rgb){
	 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	 return (rgb && rgb.length === 4) ? "#" +
	  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
	  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
	  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function hex2rgb(hex, opacity) {
    var h=hex.replace('#', '');
    h =  h.match(new RegExp('(.{'+h.length/3+'})', 'g'));

    for(var i=0; i<h.length; i++)
        h[i] = parseInt(h[i].length==1? h[i]+h[i]:h[i], 16);

    if (typeof opacity != 'undefined')  h.push(opacity);

    return 'rgba('+h.join(',')+')';
}


var crtTbl = crtTbl || {};
crtTbl.popZidx=100;
crtTbl.contentByCnt = function(data, colCnt){ //데이터,제한컴럼열(0=제한없음)
	var tag = '';
	var i=0;
	var nm;
	for(var key in data){
		tag += '<tr><th>'+key+'</th><td>'+data[key]+'</td></tr>';
		i++;
		
		if(i>=colCnt&&colCnt!=0){
			break;
		}
	}
	
	return tag; 
}

crtTbl.contentByNm = function(data, heads, keys, tbDiv){ //데이터,컬럼명,컬럼키,테이블
	var table = tbDiv || $("<table>");
	var tag = '';
	var len = heads.length;
	table.append('<colgroup><col width="80"><col width="*"></colgroup>');
	
	for(var i=0;i<len;i++){
		tag += '<tr><th>'+heads[i]+'</th><td>'+(!data? "" :data[keys[i]])+'</td></tr>';
	}
	table.append("<tbody>"+tag+"</tbody>");
	return table; 
}

crtTbl.listEvt = function(obj, list, keys ,func, colSets, trEvt){//추가대상객체, 리스트, 컬럼제한수, 클릭이벤트,조건
	var len = list.length;
	var colSets = colSets || [];
	var cdtnF = function(){};
	
	var tr,td;
	if(list.length < 1){
		tr = $("<tr>");
		td = $("<td>");
		td.text("조회된 결과가 없습니다.");
		td.attr("colspan", keys.length);
		td.css("text-align","center");
		tr.append(td);
		obj.append(tr);
	}else{
		for(i=0; i<list.length; i++){
			var data = list[i];
			tr = $('<tr>');
			if(i%2==1) tr.attr("class","t2");
			for(var j=0; j<keys.length; j++){
				td = $("<td>");
				var isText = true;
				for(var k=0;k<colSets.length;k++){
					var cols = colSets[k];
					if(cols[0]==j){
						var tag = cols[1];
						if(tag.indexOf("input")!=-1){
							tag = $(cols[1]);
							tag.val(data[keys[j]]);
						}
						td.html(tag);
						
						isText = false;
						k = colSets.length;
					}
				}
				if(isText) td.text(keys[j] == '' ? data : data[keys[j]]);
				tr.append(td);
			}
			
			if(func){
				func(tr,list[i]);
				tr.css("cursor","pointer");
				var cls = tr.attr("class") || "";
				tr.mouseover(cls,function(params){
					var ctr = params.data.indexOf("center")!=-1 ?"Ctr":"";
					var prfcs = $(this).siblings("tr[class=hover"+ctr+"]");
					prfcs.attr("class",(ctr != "Ctr" ? "" : "center ") + ($(this).siblings("tr[class=hover"+ctr+"]").index() % 2 == 1 ? "t2":""));
					if($(this).attr("class")!="focus"+ctr) $(this).attr("class","hover"+ctr);
				});
				tr.click(cls,function(params){
					var ctr = params.data.indexOf("center")!=-1 ?"Ctr":"";
					var prfcs = $(this).siblings("tr[class=focus"+ctr+"]");
					prfcs.attr("class",(ctr != "Ctr" ? "" : "center ") + ($(this).siblings("tr[class=focus"+ctr+"]").index() % 2 == 1 ? "t2":""));
					$(this).attr("class","focus"+ctr);
				});
			}
			obj.append(tr);
		}
	}
}

crtTbl.listTable = function(obj, list, heads, keys, width, func, colSets, trFncYn){//div, list, 컬럼명,컬럼키, 클릭이벤트, 컬럼스타일, tr접근함수여부
	var table = $('<table>');
	var colgroup1 = $('<colgroup>');
	var colgroup2 = $('<colgroup>');
	var thead =$('<thead>');
	var tr = $("<tr>");
	var th;
	var size = 0;
	for(i=0; i<heads.length; i++){
		size = size + width[i];
		colgroup1.append($('<col width="'+width[i]+'">'));
		colgroup2.append($('<col width="'+width[i]+'">'));
		
		th = $('<th>');
		th.text(heads[i]);
		tr.append(th);
	}
	table.append(colgroup1);
	thead.append(tr);
	table.append(thead);
	
	var scroll = $('<div class="scroll"><table><tbody></tbody></table></div>');
	scroll.find("tbody").before(colgroup2);
	var trFnc = trFncYn ? func : function(tr,data){
		tr.children().click(data,func);
	}
	crtTbl.listEvt(scroll.find("tbody"), list, keys ,trFnc, colSets);

	obj.append(table);
	obj.append(scroll);
	obj.css("width",size);
}

crtTbl.popListByKeys = function(obj, id, title, rtDiv, list, heads, keys, width, func, clsFunc, colSets, trFncYn){
	var div = $('<div id="'+id+'" class="mLayer2">');
	div.append('<h4>'+title+'</h4>');
	
	var divRt;
	var colSets = colSets || [];
	
	if(rtDiv){
		divRt = rtDiv;
		divRt.attr("class","gRt");
	}else{
		divRt = $('<div class="gRt">');
		div.append(divRt);
	}
	
	var input = $('<a href="###" class="iClose">차량상세정보 닫기</a>');
	input.click(function(){
		if(clsFunc){clsFunc();}
		$("#"+id).remove();
	});
	divRt.append(input);
	
	div.append(divRt);
	
	var i,tr,td,th,thead,tbody,colgroup1,colgroup2;
	
	var dvTable = $('<div class="con mTable1">');
	
	
	var tbHead = $('<table>');
	thead = $('<thead>');
	tr = $('<tr>');
	
	colgroup1 = $('<colgroup>');
	colgroup2 = $('<colgroup>');
	for(i=0; i<heads.length; i++){
		colgroup1.append($('<col width="'+width[i]+'">'));
		colgroup2.append($('<col width="'+width[i]+'">'));
		
		th = $('<th>');
		th.html(heads[i]);
		tr.append(th);
	}
	thead.append(tr);
	tbHead.append(colgroup1);
	tbHead.append(thead);
	dvTable.append(tbHead);
	
	
	var dvBody = $('<div class="scroll">');//스크롤
	var tbBody = $('<table>');
	
	tbody = $('<tbody>');
	for(i=0; i<list.length; i++){
		var data = list[i];
		
		if(i%2==0){
			tr = $('<tr class="center">');
		}else{
			tr = $('<tr class="center t2">');
		}
		
		for(var j=0; j<keys.length; j++){
			td = $("<td>");
			var isText = true;
			for(var k=0;k<colSets.length;k++){
				var cols = colSets[k];
				if(cols[0]==j){
					var tag = cols[1];
					if(tag.indexOf("input")!=-1){
						tag = $(cols[1]);
						tag.val(data[keys[j]]);
					}
					td.html(tag);
					
					isText = false;
					k = colSets.length;
				}
			}
			if(isText) td.text(keys[j] == '' ? data : data[keys[j]]);
			tr.append(td);
		}
		if(func){
			if(trFncYn){
				func(tr,list[i]);
			}else{
				tr.click(data,func);
			}
//			tr.click(data,func);
			tr.css("cursor","pointer");
			tr.mouseover(function(){
				var prfcs = $(this).siblings("tr[class=hoverCtr]");
				if(prfcs.index() % 2 ==0){
					prfcs.attr("class","center");
				}else{
					prfcs.attr("class","center t2");
				}
				if($(this).attr("class")!="focusCtr") $(this).attr("class","hoverCtr");
			});
			tr.click(function(){
				var prfcs = $(this).siblings("tr[class=focusCtr]");
				
				if(prfcs.index() % 2 ==0){
					prfcs.attr("class","center");
				}else{
					prfcs.attr("class","center t2");
				}
				
				$(this).attr("class","focusCtr");
			});
		}
		
		
		tbody.append(tr);
	}
	
	if(list.length === 0){
		tbody.append('<td colspan="'+keys.length+'" style="text-align:center;">조회된 결과가 없습니다.</td>');
	}
	
	tbBody.append(colgroup2);
	tbBody.append(tbody);
	dvBody.append(tbBody);
	dvTable.append(dvBody);
	div.append(dvTable);

	div.mousedown(function(){
		$(this).css("z-index",++crtTbl.popZidx);
	});
	
	var position;
	var top,left;
	if($("#"+id).size() > 0){
		position = $("#"+id).offset();
		top = position.top;
		left = position.left;
	}else{
		var top,left;
		if(obj instanceof Array){
			top = obj[1];
			left = obj[0];
		}else{
			position = $(obj).offset()? $(obj).offset():obj.offset();
			top =  position.top;
			left =  position.left+150;
		}
	}
	
	$("#"+id).remove();
	
	div.css({
		"position" : "absolute",
		"top":top+"px",
		"left":left+"px",
		"z-index": ++crtTbl.popZidx,
		"display":"block"
	});
	
	div.draggable({handle: 'h4',containment : $('#popup_pool')});
	
	$("body").append(div);
	
}

crtTbl.popDtlByNm = function(obj, id, title, data, heads, keys, width){ //this,tag id, 제목,데이터, 컬럼명,변경할컬럼명 

	var div = $('<div id="'+id+'" class="mLayer2">');
	if(width){
		div.css("width",width);
	}
	
	div.append('<h3>'+title+'</h3>');
	var divTable = $('<div class="con mTable1">');
	div.append(divTable);
	
	var contents = crtTbl.contentByNm(data, heads, keys);
	
	
	var close = $('<div class="gRt"><a href="###" class="iClose"></a></div>');
	close.find(".iClose").click(function(){
		$("#"+id).remove();
	});
	div.append(close);
	
	divTable.append(contents);
	
	var position;
	var top,left;
	if($("#"+id).size() > 0){
		position = $("#"+id).offset();
		top = position.top;
		left = position.left;
	}else{
		var top,left;
		if(obj instanceof Array){
			top = obj[1];
			left = obj[0];
		}else{
			position = $(obj).offset()? $(obj).offset():obj.offset();
			top =  position.top;
			left =  position.left+150;
		}
	}
	$("#"+id).remove();
	div.css({
		"position" : "absolute",
		"top":top+"px",
		"left":left+"px",
		"z-index": ++crtTbl.popZidx,
		"display":"block"
	});
	
	div.mousedown(function(){
		$(this).css("z-index",++crtTbl.popZidx);
	});
	
	$('body').append(div);
	div.draggable({containment : $('#popup_pool')});
	
}

crtTbl.popVoice = function(id,obj,colNm,list){
	var div = $(
			  '<div id="pVoc_'+id+'" style="width: 200px; height: 300px; display: block; z-index: 100; position: absolute; background-color: white; left: 1015px; padding: 5px; top: 273px;box-shadow: 0px 0px 10px #aaa; border-radius:5px;"	class="ui-draggable pVoc_voicePopup">'
			+ '<div class="mt10"><h3><img src="/images/cmc/tit/tit_voicesend.png" alt="음성 메시지 전송"></h3>'
			+ '<div style="float: left; width: 90%; padding: 10px 10px 10px 10px; font-size: 11px; text-align: center;">'
			+ '<input type="checkbox" name="guide" id="guide_'+id+'" value="1"><label for="guide_'+id+'">음성안내</label>'
			+ ' <input type="checkbox" name="sms" id="sms_'+id+'" value="2"><label for="sms_'+id+'">SMS메시지</label></div>'
			+ '<textarea style="resize: none; width: 90%; height: 150px; margin-left: 10px;"></textarea>'
			+ '<div class="button t_center"><input type="button" class="btnSend" value="전송"></div>'
			+ '<div class="gRt"><a href="###" class="iClose" style="position: absolute; top: 10px; right: 10px;">음성 메시지 전송 닫기</a></div></div></div>'
		);
		var div_byteChk = $('<div id="chkByte'+id+'" class="byteChk" align="right">');
		var span1 = $('<span id="chkByteCnt'+id+'" pop_txtSmsMsgCount" class="count">');
		span1.text('0');
		div_byteChk.append(span1);
		div_byteChk.append(' / ');
		var span2 = $('<span id="chkByteMxCnt'+id+'" class="maxcount">');
		span2.text('191');
		div_byteChk.append(span2);
		div_byteChk.append(' Byte');
		 div.find("textarea").after(div_byteChk);
		
		 div.find('#chkByte'+id).each(function () {
		    // count 정보 및 count 정보와 관련된 textarea/input 요소를 찾아내서 변수에 저장한다.
		    var $maxcount = $('#chkByteMxCnt'+id, this);
		    var $count = $('#chkByteCnt'+id, this);
		    var $input = div.find("textarea");

		    // .text()가 문자열을 반환하기에 이 문자를 숫자로 만들기 위해 1을 곱한다.
		    var maximumByte = $maxcount.text() * 1;
		    var GmaximumByte = $maxcount.text() * 1//mms 추가 시       + 값 ex) + 60 ;
		    // update 함수는 keyup, paste, input 이벤트에서 호출한다.
		    var update = function () {
		       var before = $count.text() * 1;
		       var str_len = $input.val().length;
		       var cbyte = 0;
		       var li_len = 0;
		       for (i = 0; i < str_len; i++) {
		          var ls_one_char = $input.val().charAt(i);
		          if (escape(ls_one_char).length > 4) {
		             cbyte += 2; //한글이면 2를 더한다
		          } else {
		             cbyte++; //한글아니면 1을 다한다
		          }
		          if (cbyte <= GmaximumByte) {
		             li_len = i + 1;
		          }
		       }
		       if(parseInt(cbyte) > parseInt(GmaximumByte)){
		          alert('허용된 글자수가 초과되었습니다.\r\n\n초과된 부분은 자동으로 삭제됩니다.');
		          var str = $input.val();
		          var str2 = $input.val().substr(0, li_len);
		          $input.val(str2);
		          var cbyte = 0;
		          for (var i = 0; i < $input.val().length; i++) {
		             var ls_one_char = $input.val().charAt(i);
		             if (escape(ls_one_char).length > 4) {
		                cbyte += 2; //한글이면 2를 더한다
		             } else {
		                cbyte++; //한글아니면 1을 다한다
		             }
		          }
		       }else if(parseInt(cbyte) <= parseInt(maximumByte)){
		          $('.sms_box, .top_box').css("background-color","#2275ff");
		          $maxcount.text("191");
		       }
		       $count.text(cbyte);
		    };
		    // input, keyup, paste 이벤트와 update 함수를 바인드한다
		    $input.bind('input keyup keydown paste change', function () {
		       setTimeout(update, 0)
		    });
		    update();
		});
		
		div.find(".iClose").click(function(){
			div.remove();
		});
		div.find(".btnSend").click(function(){
			var sms = '#sms_'+id+':checked';
			var guide = '#guide_'+id+':checked';
			var msgType = parseInt($(guide).val()?$(guide).val():0) + parseInt($(sms).val()?$(sms).val():0);
			var msg = div.find("textarea");
			if(msgType < 1){
				alert("전송 유형을 선택해주세요");
				return;
			}
			if($.trim(msg.val()) == ""){
				alert("메시지를 입력해주세요");
				msg.focus();
				return;
			}
			if(list.length < 1){
				alert("전송대상을 선택해주세요");
				return;
			}
			var params = {vhcleNo:list
						, msgType:msgType
						, msg:msg.val()
				};
			params[colNm] = list;
			requestPost("cmc/sittn/insertMessage.do","json", params, function(res) {
				if(res.result=="Y"){
					alert("전송이 완료되었습니다.");
				}else{
					alert("전송이 실패하였습니다.");
				}
				
			});
			$(div).remove();
		});
		
		var position;
		var top,left;
		if($("#"+id).size() > 0){
			position = $("#"+id).offset();
			top = position.top;
			left = position.left;
		}else{
			var top,left;
			if(obj instanceof Array){
				top = obj[1];
				left = obj[0];
			}else{
				position = $(obj).offset()? $(obj).offset():obj.offset();
				top =  position.top-15;
				left =  position.left+65;
			}
		}
		$('#pVoc_'+id).remove();
		div.css({
			"position" : "absolute",
			"top":top+"px",
			"left":left+"px",
			"z-index": ++crtTbl.popZidx,
			"display":"block"
		});
		
		
		$('body').append(div);
		$(div).draggable({containment : $('#popup_pool')});	
}

crtTbl.popSel= function(title, quest, answer, obj){ //선택
	var div = $("<div>");
	for(var key in answer){
		var input = $('<input type="button">');
		input.attr("value",key);
		input.click(answer[key]);
		div.append(input);
	}
	
	$('body').append(div);
	$(obj).draggable({containment : $('#popup_pool')});	
	if(obj){
		div.css({
			"position" : "absolute",
			"top":(obj.top-200)+"px",
			"left":(obj.left+170)+"px",
			"z-index": ++crtTbl.popZidx,
			"display":"block"
		});
	}else{
		div.css({position:'absolute'}).css({
	         left: ($(window).width() - div.outerWidth())/2,
	         top: ($(window).height() - div.outerHeight())/2
	     });
	}
}

//이하 박성민 추가 
//페이지 접속시 공지사항 팝업 불러오기

var indexP = 100;
function noticePopUpLoad() {
	if($('.PopUp').length > 0) {
		$('.PopUp').each(function() {
			$(this).remove();
		});
	}
	requestPost('gps/gmngr/selectNoticePopUpList.do', 'JSON', {'' : ''}, function(res) {
		var list = res.result;
		for(var i = 0; i < list.length; i ++) {
			var data = list[i];
			function randomRange(min, max) {
				return Math.floor( (Math.random() * (max - min + 1)) + min );
			}
//			var top = i * 100 + 150;
//			var left = randomRange(300, 1200);
			
			var top = 165 + (70*i);  
			var left = 258 + (58*i);
			
			crtNtc.noticePopUpDraw(this, 'noticePopUp' + data.noticeNo, data, top, left);
			$('#noticePopUp' + data.noticeNo).css('z-index','100');
			$('#noticePopUp' + data.noticeNo).click(function(){
				$(this).css('z-index',indexP++);
			});
		}
	});
};
var crtNtc = crtNtc || {};
crtNtc.noticePopUpDraw = function(obj, id, data, top, left) { //this, tag id, 제목, 데이터, top, left
	$('#' + id).remove();
	var div;
	div = $('<div id="'+ id +'" class="mLayer2 noticePop PopUp" style="left:390px; width:500px;">');
	var title = $('<h3 class="icoNotice">공지사항</h3>');
	div.append(title);
	var close = $('<div class="gRt"><a href="javascript:void(0)" class="iClose">닫기</a></div>');
	close.click(function() {
		$(this).parent().remove();
	});
	div.append(close);
	var table;
	table = $('<table id="' + data.noticeNo + '" class="mTable2">');
	var tag = '';
	tag += '<colgroup>';
	tag += 		'<col width="90">';
	tag += 		'<col width="*">';
	tag += '</colgroup>';
	tag += '<tr>';
	tag += 		'<th scope="row">제    목</th>';
	tag += 		'<td>' + data.title + '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += 		'<th scope="row">등 록 자</th>';
	tag += 		'<td>' + data.frstCrtrId + '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += 		'<th scope="row">등 록 일</th>';
	tag += 		'<td>' + data.frstCreatDt + '</td>';
	tag += '</tr>';
	tag += '<tr style="height: 200px">';
	var str = data.contents;
	var replacement = replaceAll(str, '\n', '<br/>');
	tag += 		'<td colspan="2" valign="top">' + replacement + '</td>';
	tag += '</tr>';
	table.append(tag);
	
	div.append(table);
	
	div.css({
		'position' : 'absolute',
		'top' : top + 'px',
		'left' : left + 'px',
		'z-index' : ++ crtNtc.popZidx,
		'display' : 'block'
	});
	
	div.mousedown(function(){
		$(this).css('z-index', ++ crtNtc.popZidx);
	});
	
	$('body').append(div);
	div.draggable({handle: 'h3',containment : $('#popup_pool')});
};
//textarea 줄바꿈 처리
function replaceAll(str, target, replacement) {
  return str.split(target).join(replacement);
};
//공지사항 롤러
function notice_rolling() {
	requestPost('gps/gmngr/selectNoticePopUpList.do', 'JSON', {'' : ''}, function(res) {
		var list = res.result;
		var ul = $('#notice_rolling ul');
		    ul.empty();
	    if(list.length < 1) {
	        var li = $('<li>');
	        var a = $('<a>');
	            a.text("공지사항 글이 없습니다.");
	            li.append(a);
	         ul.append(li);
		}else {
			for(var i = 0; i < list.length; i ++) {
				var li = $('<li>');
				var a = $('<a class="noticeRoll">');
				a.text("  [공지사항]  " + list[i].title);
				a.css("color","white");
				a.click(list[i], function(params) {
					var data = params.data;
					function randomRange(min, max) {
						return Math.floor( (Math.random() * (max - min + 1)) + min );
					}
//					var top = i * 100 + 150;
//					var left = randomRange(300, 1200);
					var top = "220"; 
					var left = "770";
					
					crtNtc.noticePopUpDraw(this, 'noticePopUp_main', data, top, left);
				});
				li.append(a);
				ul.append(li);
			}
		}
	});
	//공지사항
	$('#notice_rolling').vTicker({
      speed: 600,// 스크롤 속도(default: 700)
      pause: 2000,// 스크롤 사이의 대기시간(default: 4000)
      animation: 'fade',// 스크롤 애니메이션  
      mousePause: true,// 마우스 over 일때 멈출 설정  
      showItems: 1,// 한번에 보일 리스트수(default: 2)  
      height: 20,// 스크롤 컨테이너 높이(default: 0)  
      direction: 'up',// 아이템이 움직이는 방향, up/down (default: up)
  	startPaused: false
  });
	
	//비권한자 공지사항 목록 - 팝업
	$('#notice_top_pop').click(function() {
		var params = {pageIndex : 1,
					  noticeAt : 'noticeAt'};
		
		requestPost('gps/gmngr/selectNoticeList.do', 'JSON', params, function(res) {
			var list = res.result;
			var paging = res.paging;
			var paginationInfo = res.paginationInfo;
			
			var top = '71';
			var left = '400';
			
				
			crtNtc.noticeListPopUpDraw(this, 'noticeListPopUp', list, paging, paginationInfo, top, left);
		});
	});
}
//공지사항 롤러부분 공지사항 목록 호출 팝업
crtNtc.noticeListPopUpDraw = function(obj, id, data, paging, paginationInfo, top, left) { //this, tag id, 제목, 데이터, 페이징, 페이징정보, top, left
	$('#' + id).remove();
	var div;
	div = $('<div id="'+ id +'" class="mLayer2" style="left:390px; width:500px;">');
	var title = $('<h3 class="icoNotice">공지사항 목록</h3>');
	div.append(title);
	var close = $('<div class="gRt"><a href="javascript:void(0)" class="iClose">닫기</a></div>');
	close.click(function() {
		$(this).parent().remove();
	});
	div.append(close);
	
	var queryDiv;
	queryDiv = $('<div class="query">');
	div.append(queryDiv);
	
	var listDiv;
	listDiv = $('<div id="noticeListPopUp" class="mTable1">');
	queryDiv.append(listDiv);
	
	var list = data;
	var heads = ['No', '제목', '작성자', '작성일'];
	var keys = ['noticeNo', 'title', 'frstCrtrId', 'frstCreatDt'];
	var width = ['30px', '*', '70px', '70px'];
	
	listDiv.html('');
	crtTbl.listTable(listDiv, list, heads, keys, width, function(tr, data) {
		tr.children('td:eq(1)').click(data, function(params) {
			if($('.dtl').length > 0) {
				$('.dtl').each(function() {
					$(this).remove();
				});
			}
			var top = 350;
			var left = 800;
			crtNtc.noticePopUpDraw(this, 'noticeListPopUpDetail', data, top, left);
		});
	}, null, true);
	
	div.css({
		'position' : 'absolute',
		'top' : top + 'px',
		'left' : left + 'px',
		'z-index' : '100',
		'display' : 'block'
	});
	
	div.mousedown(function(){
		$(this).css('z-index', ++ crtNtc.popZidx);
	});
	
	$('body').append(div);
	div.draggable({containment : $('#popup_pool')});
	
	if(list.length >1){
		//글번호 붙이기
		var trLength = $('#noticeListPopUp').find('tr').length - 1;
		for(var i = 0; i < trLength; i ++) {
			$('#noticeListPopUp').find('tr:eq(' + (i + 1) + ')').children('td:eq(0)').text((paginationInfo.totalRecordCount - ((paginationInfo.currentPageNo - 1) * paginationInfo.recordCountPerPage) - i));
		}
	}
	
	
	$('#noticeListPopUpPaging').remove();
	$('#noticeListPopUp').append('<div id="noticeListPopUpPaging" class="mPag">' + paging + '</div>');
};
//공지사항 상세정보 & 미리보기 팝업창
function popUpDraw(obj, id, data) { //this, tag id,  데이터
	$('#' + id).remove();
	var div;
	if(data.noticeNo != null && data.noticeNo != '') {
		div = $('<div id="' + id + '" class="mLayer2 noticePop dtl" style="left:390px; width:500px;">');
	} else if(data.noticeNo == null || data.noticeNo == '') {
		div = $('<div id="' + id + '" class="mLayer2 noticePop prv" style="left:390px; width:500px;">');
	}
	var title;
	if(data.noticeNo != null && data.noticeNo != '') {
		title = $('<h3 class="icoNotice">공지사항 상세정보</h3>');
	} else if(data.noticeNo == null || data.noticeNo == '') {
		title = $('<h3 class="icoNotice">공지사항 미리보기</h3>');
	}
	div.append(title);
	var close = $('<div class="gRt"><a href="javascript:void(0)" class="iClose">닫기</a></div>');
	close.click(function() {
		$('#btn_noticeInsert').show();
		$('#' + id).remove();
	});
	div.append(close);
	var table;
	if(data.noticeNo != null && data.noticeNo != '') {
		table = $('<table id="' + data.noticeNo + '" class="mTable2">');
	} else if(data.noticeNo == null || data.noticeNo == '') {
		table = $('<table id="prv" class="mTable2">');
	}
	
	var tag = '';
	if(data.noticeStDe != null && data.noticeStDe != '') {
		tag += '<caption>공지사항 상세정보</caption>';
	} else {
		tag += '<caption>공지사항 미리보기</caption>';
	}
	tag += '<colgroup>';
	tag += 		'<col width="90">';
	tag += 		'<col width="*">';
	tag += '</colgroup>';
	tag += 		'<tr>';
	tag += 			'<th scope="row">공지기간</th>';
	tag += 			'<td>';
	if(data.noticeStDe != null && data.noticeStDe != '') {
		tag += 			'<input type="text" name="noticeStDe" class="date" style="width: 80px;" readonly="readonly" value="' + (data.noticeStDe).substr(0, 4) + '-' + (data.noticeStDe).substr(4, 2) + '-' + (data.noticeStDe).substr(6, 2) + '"> ~ ';
	} else {
		tag += 			'<input type="text" name="noticeStDe" class="date" style="width: 80px;" readonly="readonly"> ~ ';		
	}
	if(data.noticeEndDe != null && data.noticeEndDe != '') {
		tag += 			'<input type="text" name="noticeEndDe" class="date" style="width: 80px;" readonly="readonly" value="' + (data.noticeEndDe).substr(0, 4) + '-' + (data.noticeEndDe).substr(4, 2) + '-' + (data.noticeEndDe).substr(6, 2) + '">';
	} else {
		tag += 			'<input type="text" name="noticeEndDe" class="date" style="width: 80px;" readonly="readonly"> ';
	}
	tag += 			'</td>';
	tag += 		'</tr>';
	tag += 		'<tr>';
	tag += 			'<th scope="row">제    목</th>';
	tag += 			'<td><input type="text" name="title" value="' + data.title + '" style="width: 350px;"></td>';
	tag += 		'</tr>';
	if(data.frstCrtrId != null && data.frstCrtrId != '') {
		tag +=  '<tr>';
		tag += 		'<th scope="row">등 록 자</th>';
		tag += 		'<td>' + data.frstCrtrId + '</td>';
		tag +=  '</tr>';
	}
	if(data.frstCrtrId != null && data.frstCrtrId != '') {
		tag +=  '<tr>';
		tag += 		'<th scope="row">등 록 일</th>';
		tag += 		'<td>' + data.frstCreatDt + '</td>';
		tag +=  '</tr>';
	}
	tag += 		'<tr>';
	tag += 			'<th scope="row">표시여부</th>';
	if(data.noticeAt == 'Y') {
		tag += 		'<td><input type="checkbox" name="noticeAt" class="noticeAt" value="Y" checked="checked"></td>';
	} else if(data.noticeAt == 'N') {
		tag += 		'<td><input type="checkbox" name="noticeAt" class="noticeAt" value="N"></td>';
	}
	tag += 		'</tr>';
	table.append(tag);
	
	div.append(table);
	
	var textArea = '';
	textArea += '<div class="mt10">';
	textArea += 	'<textarea name="contents" style="resize:none; width:100%; height:200px;">' + data.contents + '</textarea>';
	textArea += '</div>';
	div.append(textArea);
	
	var br = $('<br/>');
	div.append(br);
	
	var divBtn = $('<div class="button t_center">');
	div.append(divBtn);
	
	//상세보기
	if(data.frstCrtrId != null && data.frstCrtrId != '') {
		//수정
		var btnUpdt = $('<input type="button" class="btnModify btn btnUpdt" value="수정">');
			btnUpdt.click(function() {
				var noticeStDe = $(this).parents('.noticePop').find('input[name=noticeStDe]').val();
				noticeStDe = noticeStDe.replace(/[^0-9]/g, '');
				var noticeEndDe = $(this).parents('.noticePop').find('input[name=noticeEndDe]').val();
				noticeEndDe = noticeEndDe.replace(/[^0-9]/g, '');
				var params = {noticeNo : $(this).parents('.noticePop').children('table').attr('id'),
							  title : $(this).parents('.noticePop').find('input[name=title]').val(),
							  contents : $(this).parents('.noticePop').find('textarea[name=contents]').val(),
							  noticeStDe : noticeStDe,
							  noticeEndDe : noticeEndDe,
							  noticeAt : $(this).parents('.noticePop').find('input[name=noticeAt]').val()};
				
				if(Number(noticeStDe) >  Number(noticeEndDe)) {
					alert('공지일자를 다시 확인하세요.');
					return false;
				}
				if($(this).parents('.noticePop').find('input[name=title]').val() == '' || $(this).parents('.noticePop').find('input[name=title]').val() == null) {
					alert('제목이 입력되지 않았습니다.');
					$(this).parent().find('input[name=title]').focus();
					return false;
				}
				if($(this).parents('.noticePop').find('textarea[name=contents]').val() == '' || $(this).parents('.noticePop').find('textarea[name=contents]').val() == null) {
					alert('내용이 입력되지 않았습니다.');
					$(this).parent().find('textarea[name=contents]').focus();
					return false;
				}
				if(confirm('정말 변경하시겠습니까?') == true) {
					requestPost('gps/gmngr/updateNotice.do', 'JSON', params, function(res) {
						if(res == 'Y') {
							alert("변경되었습니다");
							$('#' + id).remove();
							fn_selectNoticeList($('#hdnNtcPgIdx').val());
							notice_rolling();
							noticePopUpLoad();
						}
					});
				} else {
					return false;
				}
			});
		divBtn.append(btnUpdt);
		divBtn.append('&nbsp;');
		//삭제
		var btnDelt = $('<input type="button" class="btnDelete btn btnDelt" value="삭제">');
			btnDelt.click(function() {
				if(confirm('정말 삭제하시겠습니까?') == true) {
					requestPost('gps/gmngr/deleteNotice.do', 'JSON', {noticeNo : $(this).parents('.noticePop').children('table').attr('id')}, function(res) {
						if(res == 'Y') {
							alert("삭제되었습니다");
							$('#' + id).remove();
							fn_selectNoticeList($('#hdnNtcPgIdx').val());
							notice_rolling();
							noticePopUpLoad();
						}
					});
				}
			});
		divBtn.append(btnDelt);
		//미리보기
	} else if(data.frstCrtrId == null || data.frstCrtrId == '') {
		//추가
		var btnInsrt = $('<input type="button" class="btnSave btn btnInsrt" value="저장">');
			btnInsrt.click(function() {
				var noticeStDe = $(this).parents('.noticePop').find('input[name=noticeStDe]').val();
				noticeStDe = noticeStDe.replace(/[^0-9]/g, '');
				var noticeEndDe = $(this).parents('.noticePop').find('input[name=noticeEndDe]').val();
				noticeEndDe = noticeEndDe.replace(/[^0-9]/g, '');
				var params = {noticeNo : $(this).parents('.noticePop').children('table').attr('id'),
							  title : $(this).parents('.noticePop').find('input[name=title]').val(),
							  contents : $(this).parents('.noticePop').find('textarea[name=contents]').val(),
							  noticeStDe : noticeStDe,
							  noticeEndDe : noticeEndDe,
							  noticeAt : $(this).parents('.noticePop').find('input[name=noticeAt]').val()};
				
				if(noticeStDe == '' || noticeStDe == null) {
					alert('공지시작일자가 입력되지 않았습니다.');
					$(this).parent().find('input[name=noticeStDe]').focus();
					return false;
				} 
				if(noticeEndDe == '' || noticeEndDe == null) {
					alert('공지종료일자가 입력되지 않았습니다.');
					$(this).parent().find('input[name=noticeEndDe]').focus();
					return false;
				}
				if( Number(noticeStDe) >  Number(noticeEndDe)) {
					alert('공지일자를 다시 확인하세요.');
					return false;
				}
				if($(this).parents('.noticePop').find('input[name=title]').val() == '' || $(this).parents('.noticePop').find('input[name=title]').val() == null) {
					alert('제목이 입력되지 않았습니다.');
					$(this).parent().find('input[name=title]').focus();
					return false;
				}
				if($(this).parents('.noticePop').find('textarea[name=contents]').val() == '' || $(this).parents('.noticePop').find('textarea[name=contents]').val() == null) {
					alert('내용이 입력되지 않았습니다.');
					$(this).parent().find('textarea[name=contents]').focus();
					return false;
				}
				if(confirm('입력된 사항이 확실합니까?') == true) {
					requestPost('gps/gmngr/insertNotice.do', 'JSON', params, function(res) {
						if(res == 'Y') {
							alert("입력되었습니다");
							if($('#noticeAt_Y').attr('checked', false)) {
								$('#noticeAt_Y').attr('checked', true);
							}
							$('.noticeForms').each(function() {
								$(this).val('');
							});
							$('#noticeDtlPrv').remove();
							fn_selectNoticeList(1);
							notice_rolling();
							noticePopUpLoad();
						}
					});
				} else {
					return false;
				}
			});
		divBtn.append(btnInsrt);
	}
	
	div.css({
		'position' : 'absolute',
		'top' : 100 + 'px',
		'left' : 500 + 'px',
		'z-index' : ++ crtTbl.popZidx,
		'display' : 'block'
	});
	
	div.mousedown(function(){
		$(this).css('z-index', ++ crtTbl.popZidx);
	});
	
	$('body').append(div);
	div.draggable({containment : $('#popup_pool')});
	
	$('input[name=noticeStDe]').datepicker({
		numberOfMonths: 1,
		dateFormat: 'yy-mm-dd',
		showOn: 'both',
		buttonImage: '/images/cmc/icon/calendar.png',
		changeMonth : true, // 월을 바꿀수 있는 셀렉트 박스를 표시한다.
		changeYear : true, // 년을 바꿀 수 있는 셀렉트 박스를 표시한다.
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], 
		monthNamesShort : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		buttonImageOnly: true,
		onClose: function( selectedDate ) { 
	        $('input[name="noticeEndDe"]').datepicker( "option", "minDate", selectedDate );
	    } 
	});
	$('input[name="noticeEndDe"]').datepicker({
		numberOfMonths: 1,
		dateFormat: 'yy-mm-dd',
		showOn: 'both',
		buttonImage: '/images/cmc/icon/calendar.png',
		changeMonth : true, // 월을 바꿀수 있는 셀렉트 박스를 표시한다.
		changeYear : true, // 년을 바꿀 수 있는 셀렉트 박스를 표시한다.
		minDate: 0,
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], 
		monthNamesShort : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		buttonImageOnly: true
	});
};


function isTimeFormat(d) {
    var df = /(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])/;
    return d.match(df);
}


//날짜 포맷
function isDateFormat(d) {
    var df = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    return d.match(df);
}
/* 윤년여부 검사*/
function isLeaf(year) {
    var leaf = false;
    if(year % 4 == 0) {
        leaf = true;
        if(year % 100 == 0) {
            leaf = false;
        }
        if(year % 400 == 0) {
            leaf = true;
        }
    }
    return leaf;
}
// 날짜가 유효한지 검사
function isValidDate(d) {
    // 포맷에 안맞으면 false리턴
    if(!isDateFormat(d)) {
        return false;
    }
    var month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var dateToken = d.split('-');
    var year = Number(dateToken[0]);
    var month = Number(dateToken[1]);
    var day = Number(dateToken[2]);
    
    // 날짜가 0이면 false
    if(day == 0) {
        return false;
    }
    var isValid = false;
    // 윤년일때
    if(isLeaf(year)) {
        if(month == 2) {
            if(day <= month_day[month-1] + 1) {
                isValid = true;
            }
        } else {
            if(day <= month_day[month-1]) {
                isValid = true;
            }
        }
    } else {
        if(day <= month_day[month-1]) {
            isValid = true;
        }
    }
    return isValid;
}

function dateHyphen(num){
    if(!num) return "";
    var formatNum = '';
    num=num.replace(/\s/gi, "");
    try{
         if(num.length == 8) {
              formatNum = num.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
         }

    } catch(e) {
         formatNum = num;
    }
    return formatNum;
}


$.download = function(url, data, method){
    // url과 data를 입력받음
    if( url && data ){
        // data 는  string 또는 array/object 를 파라미터로 받는다.
        data = typeof data == 'string' ? data : $.param(data);
        // 파라미터를 form의  input으로 만든다.
        var inputs = '';
        $.each(data.split('&'), function(){ 
            var pair = this.split('=');
            inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />'; 
        });
        // request를 보낸다.
        $('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>')
        .appendTo('body').submit().remove();
    };
};
//상단메뉴 클릭시 이벤트
function fnAuthCheck(code,url){
	requestPost('gps/cmmn/selectCarInfoAuth.do', 'json', {}, function(res) {
		if(res == "Y"){
			document.location.href = url;
		}else if(res == "N" || res == ""){
			alert("방문기록 열람을 위해서는 열람 요청이 필요합니다.");
			document.location.href = "/gps/cmmn/actionReqVhcleTrace.do";
		}else if(res == "C"){
			alert("승인된 열람기간이 만료되었습니다.");
			document.location.href = "/gps/cmmn/actionReqVhcleTrace.do";
		}else if(res == "E"){
			alert("열람요청이 반려되었습니다.");
			document.location.href = "/gps/cmmn/actionReqVhcleTrace.do";
		}else if(res == "W"){
			alert("열람요청 승인대기중입니다.");
		}
	});
//	if(code == 'N'){
//		alert("방문기록 열람을 위해서는 열람 요청이 필요합니다.");
//	}else if(code == 'C'){
//		alert("승인된 열람기간이 만료되었습니다.");
//	}
}

function navi_click(){
//	$('#header').find('li').click(function(){
//		var name = $(this).attr("class");
////		if(name == "b" || name == "c"){
////		if(name == "b"){
//			requestPost('gps/cmmn/selectCarInfoAuth.do', 'json', {}, function(res) {
//				var carInfo = "";
//				carInfo = res;
//				if(carInfo =="N" || carInfo ==""){//미요청
//					alert("방문기록 열람을 위해서는 열람 요청이 필요합니다.");
//					$(this).children().attr("href","#");
//					document.location.href = "/gps/cmmn/actionReqVhcleTrace.do";
//					return;
//				}else if(carInfo =="C"){//열람기한 만료
//					alert("승인된 열람기간이 만료되었습니다.");
//					$(this).children().attr("href","#");
//					document.location.href = "/gps/cmmn/actionReqVhcleTrace.do";
//					return;
//				}else if(carInfo =="W"){//열람기한 만료
//					alert("열람요청 승인대기중입니다.");
//					$(this).children().attr("href","#");
//					return;
//				}
//			});
////		}
//	});
}
//개인정보 보호정책 알림 및 동의 팝업
var indexP = 200;
function prsnlInfoCnstPopUpLoad(fnExlDown) {
//	if($('.PopUp').length > 0) {
//		$('.PopUp').each(function() {
//			$(this).remove();
//		});
//	}
	
	crtCnst.prsnlInfoCnstPopUpDraw(this, 'prsnlInfoCnstPopUp', 185, 500, fnExlDown);
//	$('#prsnlInfoCnstPopUp').css('z-index', indexP);
	//Javascript 페이지에서 가장 큰 z-index 구하기
	$('#prsnlInfoCnstPopUp').css('z-index', Math.max.apply(null,$.map($('body > *'), function(e,n){if($(e).css('position')=='absolute')return parseInt($(e).css('z-index'))||1;})));
	$('#prsnlInfoCnstPopUp').click(function() {
		$(this).css('z-index', indexP ++);
	});
};
var crtCnst = crtCnst || {};
crtCnst.prsnlInfoCnstPopUpDraw = function(obj, id, top, left, fnExlDown) { //this, tag id, 제목, 데이터, top, left
	$('#' + id).remove();
	var div;
	div = $('<div id="'+ id +'" class="mLayer2 prsnlInfoCnstPop PopUp" style="left:390px; width:720px;">');
	var title = $('<h3 class="icoNotice">개인정보보호정책</h3>');
	div.append(title);
	var close = $('<div class="gRt"><a href="javascript:void(0)" class="iClose">닫기</a></div>');
	close.click(function() {
		$(this).parent().remove();
	});
	div.append(close);
	
	var txtDiv;
	txtDiv = $('<div align="center" id="txtDiv" clas="cnstPopUp" style="overflow-y:scroll; width: 670px; height:500px; padding: 15px; margin: 5px; border: 3px solid #0b548b; text-align: left;">');
	div.append(txtDiv);
	var txt;
	txt = '<div align="center"><h3 style="color: black;">개인정보·위치정보 활용<font style="color: red;">방침</font>에 대한 동의</div></h3>';
	txt += '<br/>';
	txt += '<b>「가축전염예방법」,<font style="color: red;">「개인정보보호법」,「위치정보의 보호 및 이용 등에 관한 법률」</font>';
	txt += '시행으로 개인정보위치정보에 대하여 보호기준<font style="color: red;">(개인정보 및 위치정보의 수집, 개인정보·';
	txt += '위치정보의 제공과 활용 등)으로 관리되는 내용</font>을 인지하고 있으며 국가동물방역통합시스템';
	txt += "(KAHIS, <font style='color: red;'>이하 '시스템'이라 한다</font>)에서 제공되는 정보와 관련하여 아래와 같은 내용을 숙지하고 ";
	txt += '개인정보·<font style="color: red;">위치정보</font> 활용<font style="color: red;">방침</font>에 동의합니다.</b>';
	txt += '<br/><br/>';
	txt += '<div align="center"><b>- 아  래 -</b></div>';
	txt += '<br/>';
	txt += '<b>1. 개인정보·위치정보의 수집 범위 및 방법</b>';
	txt += '<br/>';
	txt += '　시스템은 가축전염병의 예방 및 질병전파의 확산을 방지하기 위해 가축이동정보, 축산관계시설 차량출입정보,';
	txt += '차량이동경로정보를 수집하고 있으며, <font style="color: red;">축산차량등록제 시행에 따라 시군구에 등록한 축산차량이 축산관계시설(가축사육시설, 도축장 등)을 ';
	txt += '방문하는 경우</font> 축산관계시설의 <font style="color: red;">위치정보(GIS좌표) 등, 축산차량 정보 및</font> 운전자의 정보 등의 정보를 수집하고 있습니다.';
	txt += '<br/><br/>';
	txt += '<font style="color: red;">　가. 가축이동정보의 수집범위';
	txt += '<br/>';
	txt += '　　1) 가축이동 일자, 출발지 및 도착지의 축산관계시설 정보, 가축정보 등 가축이동정보';
	txt += '<br/>';
	txt += '　나. 차량출입정보 및 차량이동경로정보의 수집범위</font>';
	txt += '<br/>';
	txt += '　　1) 차량무선인식장치 고유번호, 축산관계시설 출입일시·위경도 좌표 등 차량출입정보';
	txt += '<br/>';
	txt += '　　2) 이동일시, 위경도 좌표 등 이동경로정보';
	txt += '<br/>';
//	txt += '<font style="color: red;">　다. 가축이동정보의 수집방법</font>';
	txt += '<font style="color: red;">';
	txt += '　다. 가축이동정보의 수집방법';
	txt += '<br/>';
	txt += '　　1) 축산물품질평가원의 소이력관리시스템';
	txt += '<br/>';
	txt += '　　2) 한국종축개량협회의 종돈혈통관리시스템';
	txt += '<br/>';
	txt += '　　3) 검역검사본부의 축산물안전관리시스템 등에서 가축이동과 관련된 정보 수집';
	txt += '<br/>';
	txt += '　라. 차량출입정보 및 차량이동경로정보의 수집방법';
	txt += '<br/>';
	txt += '　　1) 차량무선인식장치 : 차량출입정보는 실시간으로 시스템에 전송하며, 이동경로정보는 장치 내에 ';
	txt += '<br/>';
	txt += '　　수집하고 필요할 경우 시스템에서 정보수집';
	txt += '<br/>';
	txt += '　　2) 시스템 : 차량출입정보는 차량무선인식장치에서 실시간으로 수집하며, 차량무선인식장치의 오류 ';
	txt += '<br/>';
	txt += '　　또는 장애가 발생할 경우 운전자의 신고에 따라 정보수집';
	txt += '<br/>';
	txt += '　　3) 운영센터 : 차량무선인식장치의 오류 또는 장애 발생할 경우 운전자의 신고에 따라 정보수집';
	txt += '</font>';
	txt += '<br/><br/>';
	txt += '<b>2. 개인정보·<font style="color: red;">위치정보의</font> 제공과 활용</b>';
	txt += '<br/>';
	txt += '　수집된 개인정보·<font style="color: red;">위치정보</font>는 농림수산식품부, 농림수산검역검사본부 및 시도/시군구, 시도시험소 방역담당자에게 ';
	txt += '제공되며 수집된 개인정보·<font style="color: red;">위치정보</font>는 <font style="color: red;">가축전염병을 예방하고 가축질병 발생시 ';
	txt += '축산관계시설 출입차량의 신속한 파악 및 통제를 통해 가축질병 전파를 차단하는</font> 업무에서 활동합니다.';
	txt += '<br/><br/>';
	txt += '<b>3. 개인정보·<font style="color: red;">위치정보의</font> 열람 방법 및 열람기록</b>';
	txt += '<br/>';
	txt += '　수집된 개인정보·<font style="color: red;">위치정보</font>를 열람하고자 하는 방역관계 공무원 등은 시스템에서 열람청구에 의하여 ';
	txt += '열람이 가능하며, 열람시에는 열람일시, 열람자, 열람내역, 열람자IP 등이 기록됩니다.';
	txt += '<br/><br/>';
	txt += '<b>4. 관련법</b>';
	txt += '<br/>';
	txt += '<b>[가축전염예방법]</b>';
	txt += '<br/>';
	txt += '제17조의4(차량출입정보의 수집 및 열람)';
	txt += '<br/>';
	txt += '　1. 농림수산식품부장관은 차량출입정보를 목적에 필요한 최소한의 범위에서 수집하여야 하며, 차량출';
	txt += '<br/>';
	txt += '　입 정보를 수집, 관리, 운영하는 자는 차량출입정보를 목적 외의 용도로 사용하여서는 아니된다.';
	txt += '<br/>';
	txt += '　2. 농림수산식품장관은 차량출입정보를 수집하고 유지, 관리하기 위한 차량출입정보 관리체계를 구축, ';
	txt += '<br/>';
	txt += '　운영하여야 하며, 이를 효율적으로 수행하기 위한 기관을 지정, 운영할 수 있다.';
	txt += '<br/>';
	txt += '　3. 시도지사 또는 시장, 군수, 구청장은 가축전염병이 퍼지는 것을 방지하기 위하여 필요하다고 인정하';
	txt += '<br/>';
	txt += '　면 농림수산식품부장관에게 차량출입정보의 열람을 청구할 수 있다.';
	txt += '<br/><br/>';
	txt += '제55조의2(벌칙)';
	txt += '<br/>';
	txt += '　제17조4항의1을 위반하여 차량출입정보를 목적 외 용도로 사용한 자는 5년 이하의 징역 또는 5천만원 ';
	txt += '<br/>';
	txt += '　이하의 벌금에 처한다.';
	txt += '<br/><br/>';
	txt += '<font style="color:red;">';
	txt += '<b>※ 이외의 개인정보 및 위치정보에 관한 사항은 「개인정보보호법」  또는 「위치정보의 보호 및 이용 등에 ';
	txt += '<br/>';
	txt += '관한 법률」을 준수합니다.</b>';
	txt += '</font>';
	txt += '<br/>';
	txtDiv.append(txt);			 
	
	var divBtn = $('<div class="button t_center">');
	div.append(divBtn);
	var h3 = $('<h3 color="#3e78a4">');
	divBtn.append(h3);
	var h3Txt = '개인정보보호정책을 확인하고 동의를 해야 열람요청이 가능합니다.';
	h3Txt += '<br/>';
	h3.append(h3Txt);
	
	var btnYes = $('<input type="button" id="btnYes" class="btnAgree">');
	divBtn.append(btnYes);
	divBtn.append('　');
	var btnNo = $('<input type="button" id="btnNo" class="btnDisagree">');
	divBtn.append(btnNo);
	btnYes.click(function() {
		//TODO 개인정보수집 동의내역 insert - 로그인 정보, 동의항목 등
		fnExlDown();
//		requestPost('gps/cmmn/insertPrsnlInfo.do', 'json', {}, function(res) {
//			var carInfo = "";
//			carInfo = res;
//			if(carInfo =="N" || carInfo ==""){//미요청
//				alert("방문기록 열람을 위해서는 열람 요청이 필요합니다.");
//				$(this).children().attr("href","#");
//				return;
//			}else if(carInfo =="C"){//열람기한 만료
//				alert("승인된 열람기간이 만료되었습니다.");
//				$(this).children().attr("href","#");
//				return;
//			}
//		});
		$('#prsnlInfoCnstPopUp').remove();
	});
	btnNo.click(function() {
		if(confirm('"동의안함"을 선택하셨습니다. \t현재창을 닫으시겠습니까?') == true) {
			$('#prsnlInfoCnstPopUp').remove();
		} else {
			return false;
		}
	});
	
	div.css({
		'position' : 'absolute',
		'top' : top + 'px',
		'left' : left + 'px',
		'z-index' : ++ crtCnst.popZidx,
		'display' : 'block'
	});
	
	div.mousedown(function(){
		$(this).css('z-index', ++ crtCnst.popZidx);
	});
	
//	div.draggable({cancel : '.cnstPopUp' , containment : $('#popup_pool')});
	div.draggable({cancel : '#txtDiv'});
	$('body').append(div);
};


Map = function() {
	this.map = new Object();
};
Map.prototype = {
	put : function(key, value) {
		this.map[key] = value;
	},
	get : function(key) {
		return this.map[key];
	},
	containsKey : function(key) {
		return key in this.map;
	},
	containsValue : function(value) {
		for ( var prop in this.map) {
			if (this.map[prop] == value)
				return true;
		}
		return false;
	},
	isEmpty : function(key) {
		return (this.size() == 0);
	},
	clear : function() {
		for ( var prop in this.map) {
			delete this.map[prop];
		}
	},
	remove : function(key) {
		delete this.map[key];
	},
	keys : function() {
		var keys = new Array();
		for ( var prop in this.map) {
			keys.push(prop);
		}
		return keys;
	},
	values : function() {
		var values = new Array();
		for ( var prop in this.map) {
			values.push(this.map[prop]);
		}
		return values;
	},
	size : function() {
		var count = 0;
		for ( var prop in this.map) {
			count++;
		}
		return count;
	}
};

// form 데이터 전송
function formDataAction(id, method, action, obj) {
	const form = document.createElement('form');
	form.setAttribute("id", id);
	form.setAttribute("method", method);
	form.setAttribute("action", action);

	for(key in obj) {
		let field = document.createElement("input");
		field.setAttribute("type", "hidden");
		field.setAttribute("name", key);
		field.setAttribute("value", obj[key]);
		form.appendChild(field);
	}

	document.body.appendChild(form);
	form.submit();
	document.body.removeChild(form);
}