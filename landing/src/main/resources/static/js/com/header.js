$(function(){
    init();
});

function init(){
    var mSearch = $('#mSearch');
    var cencle = $('.cencle');
    var btn_mBtn2 = $('.btn_mBtn2');
    var cmprtBtn = $('#mBtn1');
    var lttotBtn = $('#mBtn2');
    var cvntlBtn = $('#mBtn3');
    var canclBtn = $('#mBtn4');
    var applyBtn = $('#mBtn5');
    var mBar = $('.mBar');
    var filter_area1 = $('.filter_area1');
    var filter_area2 = $('.filter_area2');
    var filter_area3 = $('.filter_area3');
    var mErasor = $('#mErasor');
    var btnBottom = $("#btn_bottom");
    mBar.css({'border' : '0', 'padding' : 0, 'padding-right' : '1vw'})
    $('.mFilter').css({'background-color':'#11ffee00'});
    // $('.cencle').css({'display':'none'});
    /**
     * 검색 버튼
     */
     mSearch.click(function(){
        mSearch.css({'background-color':'#FFFFFF;'});
        btn_mBtn2.css({'background-color':'#FFFFFF;'});
    });

    /**
     * 검색창 끄기
     */
    cencle.click(function(){
        $('.mFilter').css({'background-color':'#11ffee00;'});
        $('.filter_area1, .filter_area2, .filter_area3, #btn_bottom').css({'display':'none'});
        $('.filter_area1, .filter_area2, .filter_area3, #btn_bottom').css({'display':'none'});
        $('#mBtn1, #mBtn2, #mBtn3').css({'background-color':'#FFFFFF', 'color' : '#707070'});
        cencle.css({'visibility' : 'hidden'});
    });

    cmprtBtn.click(function(){
        filter_area1.show();
        filter_area2.hide();
        filter_area3.hide();
        cmprtBtn.css({'background-color':'#74A367', 'color' : '#FFFFFF'});
        $('#mBtn2, #mBtn3').css({'background-color':'#FFFFFF', 'color' : '#707070'});
        $('#btn_bottom').css({'display':'flex'});
        cencle.css({'visibility' : 'visible'});
    })

    lttotBtn.click(function(){
        filter_area2.show();
        filter_area1.hide();
        filter_area3.hide();
        lttotBtn.css({'background-color':'#74A367', 'color' : '#FFFFFF'});
        $('#mBtn1, #mBtn3').css({'background-color':'#FFFFFF', 'color' : '#707070'});
        $('#btn_bottom').css({'display':'flex'});
        cencle.css({'visibility' : 'visible'});
    })

    cvntlBtn.click(function(){
        filter_area3.show();
        filter_area1.hide();
        filter_area2.hide();
        cvntlBtn.css({'background-color':'#74A367', 'color' : '#FFFFFF'});
        $('#mBtn1, #mBtn2').css({'background-color':'#FFFFFF', 'color' : '#707070'});
        $('#btn_bottom').css({'display':'flex'});
        cencle.css({'visibility' : 'visible'});
    })

    // canclBtn.click(function(){
    //     canclBtn.css({'background-color' : '#74A367', 'color' : '#FFFFFF'});
    // })

    // canclBtn.mouseout(function(){
    //     canclBtn.css({'background-color' : '#E3F1DF', 'color' : '#707070'});
    // })

    // applyBtn.click(function(){
    //     applyBtn.css({'background-color' : '#74A367', 'color' : '#FFFFFF'});
    // })

    // applyBtn.mouseout(function(){
    //     applyBtn.css({'background-color' : '#E3F1DF', 'color' : '#707070'});
    // })

    mBar.click(function(){
        filter_area1.show();
        filter_area2.show();
        filter_area3.show();
        btnBottom.show();
        $('#mBtn1, #mBtn2, #mBtn3').css({'background-color':'#FFFFFF', 'color' : '#707070'});
    })

    mErasor.click(function(){
        $('#mInput').val('');
    })
};
