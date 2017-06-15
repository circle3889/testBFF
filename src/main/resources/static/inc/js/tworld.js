// <![CDATA[

// 모바일 주소창 감추기
try {
    window.addEventListener('load', function(){
        setTimeout(scrollTo, 0, 0, 1); 
    }, false);
} catch(e) {}

var lastEvent = null;
var slide  = ".acdn > li > ul";
var alink  = ".acdn > li > a";

// 요금상세 slideup, down, downall
$(document).ready(function(){
    $('#ulall').toggle(function(){
        $('ul.acdn li ul').slideDown('normal');
        $('ul.acdn li a').addClass('active');
        $('#ulall').html("<span>전체상세닫기</span>");
    },function(){
        $('ul.acdn li ul').slideUp('normal');
        $('ul.acdn li a').removeClass('active');
        $('#ulall').html("<span>전체상세조회</span>");
    });

    //약정할부정보 말풍선 추가
    $('#infopopb1').click(popctl);
    $('#infopopb2').click(popctl);
    $('#infopopb3').click(popctl);
    $('#infopopb1').next('div').click(popctl2);
    $('#infopopb2').next('div').click(popctl2);
    $('#infopopb3').next('div').click(popctl2);

    $('ul.acdn li ul').css('display','none');
    $(alink).click(accordion).focus(accordion);
    $(alink).click(popctl);

    //커플번호조회    
    $('#couplepopb').click(popctl_couple);
    $('#couplepopb').prev('div').click(popctl_couple2);
    $('#zonepercentb').click(popctl_couple);
    $('#zonepercentb').prev('div').click(popctl_couple2);

    // 검색 > 입력창 지우기
    searchBoxKeyEvent();

});

function accordion(){

    if (this == lastEvent) return false;
    lastEvent = this;

    setTimeout(function() {lastEvent = null}, 200);
    if ($(this).attr('class') != 'active') {
        $(slide).css('display','none');
        $(this).next(slide).css('display','block');
        $(alink).removeClass('active');
        $(this).addClass('active');
    } else if ($(this).next(slide).is(':hidden')) {
        $(slide).css('display','none');
        $(alink).removeClass('active');
        $(this).next(slide).css('display','block');
        $(this).addClass('active');
    } else {
        $(this).next(slide).css('display','none');
        $(this).removeClass('active');
    }
    $('#infopopb1').next('div').css('display','none');
    $('#infopopb2').next('div').css('display','none');
    $('#infopopb3').next('div').css('display','none');
}

function popctl(){
    if($(this).next('div').css('display') == 'none'){
        $('#infopopb1').next('div').css('display','none');
        $('#infopopb2').next('div').css('display','none');
        $('#infopopb3').next('div').css('display','none');
        $(this).next('div').css('display','block');
    }else{
        $(this).next('div').css('display','none');
    }
}

function popctl2(){
    $(this).css('display','none');
}

function popctl_couple(){
    if($(this).prev('div').css('display') == 'none'){
        $(this).prev('div').css('display','block');
    }else{
        $(this).prev('div').css('display','none');
    }
}

function popctl_couple2(){
    if($(this).css('display') == 'none'){
        $(this).css('display','block');
    }else{
        $(this).css('display','none');
    }
}

// 검색 > 입력창 지우기
function searchBoxKeyEvent() {

    if ($("#searchbox").length > 0) {

        $('#searchbox').after('<div class="btnxwrap"><button type="button" class="btnx"><span class="bttxt">입력 내용 삭제</span></button></div>');
        // #uid 인풋에서 onkeyup 이벤트가 발생하면
        function keyupevent(){
            var s = $(this).next('div');
            if ($(this).val().length == 0) {
                s.css('display','none');
            } else { 
                s.css('display','block');
                $('.btnx').click( function() {
                    $('#searchbox').val('');
                    s.css('display','none');
                    $('#searchbox').focus().select();
                });
            }
        };
        $('#searchbox').keyup(keyupevent).focus(keyupevent);
    }
}

// pc버전 tworld 가기
function goTworld() {
    if(confirm("일부 화면은 모바일에서 정상적으로\n이용하실 수 없습니다.\n※ 3G에서는 데이터 통화료가\n발생합니다.")) {
        window.open('http://www.tworld.co.kr?goPc=Y');
        //location.href = 'http://www.tworld.co.kr?goPc=Y';
    }
}

function telConfirm(val, type){
    if(type!='I' && type!='B') {
        if(confirm(val + "번으로 바로 연결하시겠습니까?")) {
            location.href = 'tel:' + val;
        }
    } else {
        location.href = 'tel:' + val;
    }
}    

//]]>

