/*                                                  */
/*   요금항목 상세설명 팝업창용 fuction ( 메시지 )  */
/*   요금항목명은 비교를 위해 명칭에 존재하는       */
/*   모든 공백을 제거하였음에 주의                  */
/*                                                  */
/* job_type : '0' - 사용요금조회상세, '1' - 계정별청구요금조회상세, '2' - 서비스별청구요금조회상세, '3' - 어제까지사용요금조회상세*/
function  bill_item_pop(bill_item, job_type, svc_mgmt_number, term) {

    //사용요금안내
    var paid_serv= new Array("popup_useChargeInfo.html",
                             "국제통화료",         
                             "그룹폰통화료",     
                             "기본료",             
                             "기부금/후원금",      
                             "단말기할부금",       
                             "로밍수신국제통화료", //"로밍국제호연결통화"
                             "로밍수수료",         
                             "로밍요금",           
                             "모바일코인서비스",   
                             "복권구매대금",       
                             "분납가입비",         
                             "연체가산금",         
                             "단말기AS료",         //"유지보수료"  
                             "일반전화수신자부담", 
                             "국내통화료",         //"일반통화료"
                             "자동로밍통화요금",   
                             "지역추가비",         
                             "BIZSMS요금",        
                             "SK국제통화료" );       

    //부가사용료안내
    var paid_add = new Array("popup_addService.html",
                             "부가사용료",            
                             "080기본료",             
                             "080통화료",            
                             "개별통화수신거부",     
                             "관제센터수수료",        
                             "그룹메시지",            
                             "넘버플러스",            
                             "데이타통신료",       //"데이터통신료"         
                             "메시징20",           //"메시징 정액제 2,000"
                             "메시징50",           //"메시징 정액제 5,000"
                             "메시지콜월정액",        
                             "번호변경안내",          
                             "법인데이터정액료",      
                             "법인메시지서비스",      
                             "수신전비밀번호",        
                             "수신전확인",            
                             "스타모닝콜",            
                             "위치정보서비스",        
                             "착신(P)/자동연결",      
                             "정보샘서비스",        
                             "착신전환서비스",        
                             "캐릭터문자",           
                             "컬러메일 프리",         
                             "컬러링",                
                             "컬러링플러스",          
                             "콜키퍼",                
                             "통화가능통보서비스",    
                             "통화가능통보플러스",    
                             "팅별장",                
                             "프리미엄SMS",          
                             "프리나이트",            
                             "프리일레븐",            
                             "프리할리데이",          
                             "우리아이안심이",    //"i-Kids 서비스"       
                             "JUNE50",             //"JUNE 50"           
                             "JUNE95",             //"JUNE 95"          
                             "JUNE(준)150",           
                             "JUNE(준)250",          
                             "JUNE(준)500",           
                             "MYSTOCK서비스",        
                             "M-Bank정액료",          
                             "NATEVoice정보료" );     


    //할인요금안내
    var paid_disc= new Array("popup_dis_charge_guide.html",
                             "국제전화할인",       //"국제통화할인"   
                             "그룹폰할인",       
                             "무료통화할인",      
                             "SKT간통화할인",      //"망내할인"       
                             "복지할인",          
                             "비즈니스할인(DATA)", //"비즈니스할인(Data)" 
                             "비지니스할인",       //"비즈니스할인"  
                             "생활보호할인",      
                             "아동복지할인",      
                             "예치요금할인",      
                             "자동납부할인",      
                             "장기가입할인",      
                             "장시간통화할인",     //"장기통화할인"   
                             "지역내할인",      
                             "지정번호할인",      
                             "문자메세지할인",     //"폰메일할인"   
                             "프리미엄할인",      
                             "프리할인",          
                             "마이벨할인",         //"MYBELL할인"     
                             "NATE공제",           //"NATE할인"      
                             "PointBox할인" );      

    //정보이용료안내
    var paid_info= new Array("popup_info_charge_guide.html",
                             "이동전화700",
                             "정보이용료"   );

    //부가세안내
    var paid_tax = new Array("popup_tax_guide.html",
                             "부가세", 
                             "전화세" );

    //무선인터넷안내
	var paid_mobi= new Array("popup_wireless_internet_guide.html",
                             "무선LAN이용료",      //"무선인터넷" 
                             "데이터정보료",    
                             "데이터정액료",    
                             "데이터통화료",    
                             "문자메시지이용료",   //"폰메일이용료"  
                             "사이버넷요금",   
                             "네이트폰메일채팅" );

    var msg_htm = '';
    var open_htm = "http://m.tworld.co.kr/common/popup/center/";

    if (bill_item == ''){
        return;
    }

    if (bill_item == '네이트쇼핑'){
        if (job_type == '1') {
            alert('\n네이트쇼핑 상세내역조회는 서비스별 청구요금 상세조회시에 가능합니다!\t');
            return;
        }

        if (job_type == '0' || job_type == '2' || job_type == '3'){
            msg_htm = "/jsp/center/bill/use/cm7_nate_shopping_detail.jsp?job_type=" + job_type + "&svc_mgmt_number=" + svc_mgmt_number + "&term=" + term;
        }
        else {
            alert('\n네이트쇼핑 상세내역조회 권한이 없습니다!\t');
            return;
        }
        window.open( msg_htm, "WIN_SUB", "menubar=0, toolbar=0,location=0,status=0,directory=0,border=0,scrollbars=1,resizable=0,width=615,height=517,top=0,left=0" )
        return;   
    }

    //각 안내별 항목의 건수
    paid_serv_cnt = 21;
    paid_add_cnt  = 45;
    paid_disc_cnt = 22;
    paid_info_cnt = 3;
    paid_tax_cnt  = 3;
    paid_mobi_cnt = 8;
    paid_smal_cnt = 7;

    //사용요금안내 항목인지 확인
    for (i=1; i<paid_serv_cnt; i++) {
        if (bill_item==paid_serv[i]){
            if (i<10) {
                msg_htm = open_htm + paid_serv[0] + '#0' + i;
            }
            else {
                msg_htm = open_htm + paid_serv[0] + '#' + i;
            }
        }
    }

    if (msg_htm == ''){
        //부가사용료안내 항목인지 확인
        for (i=1; i<paid_add_cnt; i++) {
            if (bill_item==paid_add[i]){
                if (i<10) {
                    msg_htm = open_htm + paid_add[0] + '#0' + i;
                }
                else {
                    msg_htm = open_htm + paid_add[0] + '#' + i;
                }
            }
        }
    }

    if (msg_htm == ''){
        //할인요금안내 항목인지 확인
        for (i=1; i<paid_disc_cnt; i++) {
            if (bill_item==paid_disc[i]){
                if (i<10) {
                    msg_htm = open_htm + paid_disc[0] + '#0' + i;
                }
                else {
                    msg_htm = open_htm + paid_disc[0] + '#' + i;
                }
            }
        }
    }

    if (msg_htm == ''){
        //부가세안내 항목인지 확인
        for (i=1; i<paid_tax_cnt; i++) {
            if (bill_item==paid_tax[i]){
                if (i<10) {
                    msg_htm = open_htm + paid_tax[0] + '#0' + i;
                }
                else {
                    msg_htm = open_htm + paid_tax[0] + '#' + i;
                }
            }
        }
    }

    if (msg_htm == ''){
        //무선인터넷안내 항목인지 확인
        for (i=1; i<paid_mobi_cnt; i++) {
            if (bill_item==paid_mobi[i]){
                if (i<10) {
                    msg_htm = open_htm + paid_mobi[0] + '#0' + i;
                }
                else {
                    msg_htm = open_htm + paid_mobi[0] + '#' + i;
                }
            }
        }
    }

    if (msg_htm == ''){
        //정보이용료안내 항목인지 확인
        for (i=1; i<paid_info_cnt; i++) {
            if (bill_item==paid_info[i]){
                if (i<10) {
                    msg_htm = open_htm + paid_info[0] + '#0' + i;
                }
                else {
                    msg_htm = open_htm + paid_info[0] + '#' + i;
                }
            }
        }
    }

    if (msg_htm != ''){
        window.open( msg_htm, "WIN_SUB", "menubar=0, toolbar=0,location=0,status=0,directory=0,border=0,scrollbars=1,resizable=0,width=665,height=570,top=0,left=0" )
        return;
    }

    if (msg_htm == ''){
        msg_htm = open_htm + "popup_charge_none.html";
        window.open( msg_htm, "WIN_SUB", "menubar=0, toolbar=0,location=0,status=0,directory=0,border=0,scrollbars=1,resizable=0,width=665,height=570,top=0,left=0" )
        return;
    }

    return;
}


/****************************************************
    tbl      : 병합할 대상 table object
    startRow : 병합 시작 row, title 한 줄일 경우 1
    cNum     : 병합 실시할 컬럼번호, 0부터 시작
    length   : 병합할 row의 길이, 보통 1
    add      : 비교할 기준에 추가할 컬럼번호
              A | 1
              B | 1
             을 서로 구분하고 싶다면, add에 0번째
             컬럼을 추가
*****************************************************/
function mergeCell(tbl, startRow, cNum, length, add)
{
    var isAdd = false;
    if(tbl == null) return;
    if(startRow == null || startRow.length == 0) startRow = 1;
    if(cNum == null || cNum.length == 0) return ;
    if(add  == null || add.length == 0) {
        isAdd = false;
    }else {
        isAdd = true;
        add   = parseInt(add);
    }
    cNum   = parseInt(cNum);
    length = parseInt(length);

    rows   = tbl.rows;
    rowNum = rows.length;

    tempVal  = '';
    cnt      = 0;
    startRow = parseInt(startRow);

    for( i = startRow; i < rowNum; i++ ) { 
        curVal = rows[i].cells[cNum].innerHTML;
        if(isAdd) curVal += rows[i].cells[add].innerHTML;
        if( curVal == tempVal ) {
            if(cnt == 0) {
                cnt++;
                startRow = i - 1;
            }
            cnt++;
        }else if(cnt > 0) {
            merge(tbl, startRow, cnt, cNum, length);
            startRow = endRow = 0;
            cnt = 0;
        }else {
        }
        tempVal = curVal;
    }

    if(cnt > 0) {
        merge(tbl, startRow, cnt, cNum, length);
    }
}

/*******************************************
    mergeCell에서 사용하는 함수
********************************************/
function merge(tbl, startRow, cnt, cellNum, length)
{
    rows = tbl.rows;
    row  = rows[startRow];

    for( i = startRow + 1; i < startRow + cnt; i++ ) {
        for( j = 0; j < length; j++) {
            rows[i].deleteCell(cellNum);
        }
    }
    for( j = 0; j < length; j++) {
        row.cells[cellNum + j].rowSpan = cnt;
    }
}


