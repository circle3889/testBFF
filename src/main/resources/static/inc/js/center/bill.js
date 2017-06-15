var rec_header="<div class='mb5'><div class='rigtop'></div><div class='rigbg'><div class='rigdotbg'>";
var rec_close="</div></div>";
var rec_middle="<div class='rigmiddle'></div><div class='rigbg'><div class='rigdotbg'>";
var rec_footer="</div></div><div class='rigbtm'></div></div>";
//var type_b="<iframe id='frame_b' src='http://m.tworld.co.kr/global/recommend/type_b.jsp' style='width:98px;' frameborder=0 scrolling=no></iframe>";
//var type_c="<iframe id='frame_c' src='http://m.tworld.co.kr/global/recommend/type_c.jsp' style='width:98px;' frameborder=0 scrolling=no></iframe>";
//var type_basic="<div><iframe id='frame_basic' src='/global/recommend/type_basic.jsp' style='width:126px;' frameborder=0 scrolling=no></iframe></div>";

//********** 요금통화 **********//

// 사용요금조회 use

//hotbill="\
//<li>지정하신 요금이상을 사용하시게 되면 SMS를 통해 알려드리는 특별한 서비스 <span onclick='link(1,1,1,1,1)' style='cursor:hand;'><span class='info_l'></span><span class='info'>지정요금알리미신청</span><span class='info_r'></span></span>을 이용하세요.</li>\
//<li>어제까지 사용요금조회는 당월 1일부터 조회일 전일까지의 이동전화 요금으로, 기본료, 월정액 부가서비스, 국제 수진자부담전화, 세금, 국내/국제통화료, 정보이용료, 무선인터넷 이용료, 할인요금을 확인하실 수 있습니다.</li>\
//<li>어제까지 사용요금은 어제까지 사용한 요금에 고객님의 기본요금이 포함된 요금입니다. 기본요금을 포함한 어제까지 사용요금을 알고 싶으시면 조회 요청 클릭 후 결과 확인을 통해 조회하시면 됩니다.</li>\
//";
hotbill2="\
<li>어제까지 사용요금조회는 당월 1일부터 조회일 전일까지의 이동전화 요금으로, 기본료, 월정액 부가서비스, 국제 수진자부담전화, 세금, 국내/국제통화료, 정보이용료, 무선인터넷 이용료, 할인요금을 확인하실 수 있습니다.</li>\
<li>어제까지 사용요금은 어제까지 사용한 요금에 고객님의 기본요금이 포함된 요금입니다. 기본요금을 포함한 어제까지 사용요금을 알고 싶으시면 조회 요청 클릭 후 결과 확인을 통해 조회하시면 됩니다.</li>\
";

_hotbill="\
<li>타 유/무선 통신사 제공서비스(ex.KT114)의 경우 과금방식 변경으로 금액에 다소 차이가 있을 수 있습니다.</li>\
<li>매월 7일 이전에는 전월 요금과 조회 당월 어제까지 요금을 확인하실 수 있습니다.</li>\
<li>결과 확인을 클릭하시면 어제까지 사용요금정보를 확인하실 수 있습니다.</li>\
<li>실제 청구금액과 다소 차이가 있을 수 있으니 단순 참고용으로 활용하시기 바랍니다.<br>예) ‘NATE 카드상품권’의 경우 ‘데이터 정보료’로 조회되나 월말 기준으로 공제되어 실제 청구 되지 않습니다.</li>\
";
//r_hotbill="<div class='mb5'><a href='javascript:pops(\"http://m.tworld.co.kr/center/bill/use/pop_hotbill.html\",\"\",\"550\",\"425\");'><img src='http://m.tworld.co.kr/center/bill/img/r_hotbill.gif'></a></div>";
//r_hotbill+=rec_header+type_b+rec_close+rec_middle+type_c+rec_footer;

// hotbill banner가 들어가는 공통 우측영역
//r_charge="<div class='mb5'><a href='javascript:pops(\"http://m.tworld.co.kr/center/bill/use/pop_hotbill.html\",\"\",\"550\",\"425\");'><img src='http://m.tworld.co.kr/center/bill/img/r_hotbill.gif'></a></div>"+type_basic;




//free="\
//<li>일부요금제(일반요금제 포함)의 경우 무료통화 조회에서 제외됩니다. 무료통화조회대상이궁금하시면 우측의 바로가기를 참고하시기 바랍니다</li>\
//<li>실제 청구금액과 다소 차이가 있을 수 있으니 단순 참고용으로 활용하시기 바랍니다</li>\
//<li>무료제공내역에 대한 자세한 내용은 <span onclick='link(1,5,4)' style='cursor:hand;'><span class='info_l'></span><span class='info'>요금안내</span><span class='info_r'></span></span>에서 확인하시기 바랍니다</li>\
//<li>월중에 요금제 변경이력이 있거나 사용내역이 없는 경우에는 무료통화 사용시간 조회가 불가합니다</li>\
//";
_free="\
<li>월중 정지이력이 있는 경우 무료통화 혜택에 대한 일할 계산이 되지 않으니 주의하시기 바랍니다.</li>\
<li>'200분 무료통화 이벤트'의 경우 팅 고객은 무료통화조회가 불가능합니다.</li>\
";
//r_free="<div class='mb5'><a href='javascript:pops(\"http://m.tworld.co.kr/center/bill/use/pop_free.html\",\"\",\"550\",\"445\");' ><img src='http://m.tworld.co.kr/center/bill/img/r_free.gif'></a></div>"+type_basic;

usebill="\
<li>납부요금 정보는 <납부요금조회> 메뉴에서 사용요금 정보는 <사용요금조회> 메뉴에서 확인하실 수 있습니다.</li>\
<li>아래 사용요금 외 한국통신(KT) 국제전화 이용시 사업자에서 별도 청구됩니다.</li>\
<li>월 중 번호이동하신 고객님의 경우 번호이동 전 사용요금을 납부하셨더라도 시스템 사정상 사용기간이 1일~말일까지로 표시됨을 양해하여 주시기 바랍니다.(번호이동후~말일까지 사용요금입니다.)</li>\
";

usebill_req="\
<li>납부요금 정보는 <납부요금> 메뉴에서, 사용요금 정보는 <사용요금> 메뉴에서 확인하실 수 있습니다.</li>\
<li>자동납부로 납부하는 경우에는 인출일로부터 3~4일 이후 확인 가능합니다.</li>\
<li><자세히보기>버튼을 클릭하시면 청구월별 상세 납부정보를 확인하실 수 있습니다.</li>\
<li>월중 번호이동하신 고객님의 경우 번호이동전 사용요금을 납부하셨더라도 시스템 사정상 사용기간이 1일~말일까지로 표시됨을 양해하여 주시기 바랍니다.(번호이동후~말일까지 사용요금입니다.)</li>\
";
//기본
_usebill_req="\
<li>상기 사용요금 외 한국통신(KT) 국제전화 이용시 사업자에서 별도 청구됩니다.</li>\
<li>청구월의 사용기간은 전월1일~말일까지입니다.</li>\
";
//paper 청구서 & 자동납부 아닌경우
_usebill_req2="\
<li>상기 사용요금 외 한국통신(KT) 국제전화 이용시 사업자에서 별도 청구됩니다.</li>\
<li>청구월의 사용기간은 전월1일~말일까지입니다.</li>\
<li>고객님께서는 이메일 청구서를 신청할 수 있으며, 자동납부도 신청이 가능합니다.</li>\
<li>자동납부를 신청하시면 매월 1%의 청구요금을 할인하여 드립니다.</li>\
";
//e-Mial 청구서 & 자동납부 아닌경우
_usebill_req3="\
<li>상기 사용요금 외 한국통신(KT) 국제전화 이용시 사업자에서 별도 청구됩니다.</li>\
<li>청구월의 사용기간은 전월1일~말일까지입니다.</li>\
<li>고객님께서는 자동납부를 신청할 수있습니다.</li>\
<li>자동납부를 신청하시면 매월 1%의 청구요금을 할인하여 드립니다.</li>\
";
//paper 청구서 & 자동납부 인경우
_usebill_req4="\
<li>상기 사용요금 외 한국통신(KT) 국제전화 이용시 사업자에서 별도 청구됩니다.</li>\
<li>청구월의 사용기간은 전월1일~말일까지입니다.</li>\
<li>고객님께서는 이메일 청구서를 신청할 수 있습니다.</li>\
";
//r_usebill_use="<div class='mb5'><a href='javascript:pops(\"http://m.tworld.co.kr/center/bill/use/pop_usebill.html\",\"\",\"550\",\"475\");'><img src='http://m.tworld.co.kr/center/bill/img/r_usebill.gif'></a></div>";
//r_usebill_use+=rec_header+type_b+rec_close+rec_middle+type_c+rec_footer;

usebill_pay="\
<li> 자동납부로 납부하는 경우에는 인출일로부터 3~4일 이후 확인 가능합니다.</li>\
";
_usebill_pay="\
<li>최근 10일이내에 발생된 과납금액을 조회 및 환불신청하실 수 있습니다.</li>\
<li>은행자동납부 고객의 경우에는 과납금액 발생처리일로부터 영업일기준 5일이내에 등록된 자동납부 계좌로 매일 자동송금 처리해드리고 있습니다.</li>\
<li>카드/지로납부 고객의 경우에는 본인명의의 환불계좌를 입력하시면 등록시점부터 영업일기준 3일~ 5일이내에 자동송금 처리해드리고 있습니다.</li>\
<li>고객센터내에서 환불신청 후 송금처리결과가 송금오류인 경우에는 고객센터에서는 처리하실 수 없사오니, 당사 고객센터 <국번없이 1599-0011(유료) / 휴대폰 114>로 연락주시기 바랍니다.</li>\
";
//r_usebill="<div class='mb5'><a href='javascript:pops(\"http://m.tworld.co.kr/center/bill/use/pop_usebill.html\",\"\",\"550\",\"475\");'><img src='http://m.tworld.co.kr/center/bill/img/r_usebill.gif'></a></div>"+type_basic;
usebill_pay_cashreceipt="\
<li>현금영수증은 단말기할부금 및 단말기 악세사리 대금만 해당됩니다.</li>\
<li>현금영수증보기는 국세청에 결제완료 된 이력만 조회됩니다.</li>\
";



// 통화내역조회 call

calllist="\
<li>고객센터 통화내역은 요금확인용으로 발신번호의 일부가 표시되지 않습니다.</li>\
<li>고객센터 이용신청서를 제출한 인증 회원으로 등록된 경우 당일 바로 조회가  가능합니다. 단, 전월 통화내역은 매월 6일 이후에 조회 가능합니다.</li>\
<li>명의변경 이후 인증 회원으로 등록한 경우에는 명의변경 익일부터 사용한 통화내역이 조회되므로 월 사용요금 조회시와 다소의 차이가 있을 수 있습니다.</li>\
";
//r_calllist="<div class='mb5'><a href='http://m.tworld.co.kr/center/info/i_phone/join.html#14'><img src='http://m.tworld.co.kr/center/bill/img/r_calllist.gif'></a></div>";
//r_calllist+=rec_header+type_b+rec_close+rec_middle+type_c+rec_footer;


// 휴대폰소액결제 micro

_micro="\
<li>이용제한 및 익일 SMS 추가 통보 신청에 대하여 변경하실 수 있습니다. </li>\
<li>이용금액 한도 조정을 원하실 경우, 고객센터에 문의하시기 바랍니다.</li>\
";
//r_micro="<div class='mb5'><a href='javascript:;'><img src='http://m.tworld.co.kr/center/bill/img/r_micro.gif'></a></div>"+type_basic;



// 요금충전/납부 charge

charge_certify="\
<li>공인인증서란?<br>공인인증기관이 발행하는 사이버 전자상거래용 인감증명서를 말합니다. </li>\
";

online="\
<li>청구서에 안내된 납기일 이후에 납부하시면 <span class='info2'>연체가산금(2%)</span>이 부과되오니 항상 기일 이전까지 납부하시기 바랍니다. </li>\
";
online_pay="\
<li>청구세부내역은 청구내역에서 확인하실 수 있습니다.</li>\
<li>이용정지 고객의 경우 납부기한이 경과한 미납액을 모두 납부하시면 이용정지가 즉시 해제됩니다.</li>\
<li>대표인 경우만 미납내역이 조회되며, 대표회선이 아닌 경우 대표회선으로 로그인해주십시오.</li>\
<li>3XX, 4XX로 시작하는 서비스번호는 위성 DMB 요금입니다.</li>\
";
online_pay_card="\
<li>청구세부내역은 청구내역에서 확인하실 수 있습니다.</li>\
<li>이용정지 고객의 경우 납부기한이 경과한 미납액을 모두 납부하시면 이용정지가 즉시 해제됩니다.</li>\
";
online_pay_bank=online_pay_card;
online_settle=online_pay_card;
//r_online="<div class='mb5'><a href='javascript:link(\"1_5_4_1_7\");'><img src='http://m.tworld.co.kr/center/bill/img/r_online.gif'></a></div>"+type_basic;

ting="\
<li>충전신청 직후 음성통화 및 폰메일 이용이 모두 가능합니다.</li>\
<li>상한금액은 음성통화, 폰메일(무료제공건수 초과 이용금액 해당)이 적용되며 무선인터넷 등 일부 서비스는 적용되지 않습니다.</li>\
<li>월상한금액이 초과되면 발신정지되고 수신만 가능하며, 발신정지 후 마이벨 무료서비스 이용이 불가합니다.</li>\
";
//r_ting="<div class='mb5'><a href='javascript:link(\"1_5_4_1_4\");'><img src='http://m.tworld.co.kr/center/bill/img/r_ting.gif'></a></div>"+type_basic;

pps="\
<li>카드사용시간이 만료되면 0원이 되며 발신할 수 없습니다.</li>\
<li>선불이동전화 부가서비스 신청은 상단 부가서비스에서 가능합니다.</li>\
<li>자동알람설정 중 기간기준으로 알람은 설정한 조건에 따라 해당날짜에 1번만 알려드립니다.</li>\
<li>자동알람설정 중 ‘잔액기준으로 알람’은 실제 카드의 잔액이 설정한 잔액의 근사치에 접근하면 알려드립니다.</li>\
";
pps_once_pay="\
<li>선불이동전화카드로 충전하는 경우에는 선불이동전화카드리필을 선택하세요.</li>\
<li>카드상품권을 가지고 계씬 분은 카드 상품권을 선택하세요.</li>\
<li>기존 선불이동전화카드를 그대로 사용하는 경우에는 은행 또는 신용카드 이체를 선택하세요.</li>\
";
pps_auto_pay="\
<li>은행계좌 이체 선택시 주의사항<br>\
1. 매월 1회씩 자동충전 : 자동충전일이 공휴일이면 익일 오전 9시에 자동충전됩니다.<br>\
2. 일정잔액이 되면 자동충전 : 일정잔액에 도달하는 시점이 은행계좌이체 서비스 이외의 시간 (오후10시부터 오전<br>&nbsp;&nbsp; 8시)인 경우에는 오전 9시에, 공휴일인 경우에는 익일 오전 9시에 자동충전됩니다.<br></li>\
";
pps_auto_pay2="\
<li>계좌번호는 ‘-’ 없이 입력하세요.</li>\
<li>반드시 현재 기재된 주민번호로 개설된 계좌이어야 합니다.</li>\
<li>15일 또는 26일을 선택하시면 다음달부터 자동충전이 됩니다.</li>\
<li>자동충전일이 공휴일이면 익일 오전 9시에 자동충전이 됩니다.</li>\
";
pps_auto_pay3="\
<li>카드번호는 ‘-’ 없이 입력하세요.</li>\
<li>반드시 현재 기재된 주민번호로 개설된 카드이어야 합니다.</li>\
<li>자동충전일이 공휴일이면 익일 오전 9시에 자동충전이 됩니다.</li>\
";
pps_result="\
<li>각각의 충전방법을 클릭하시면 상세내역을 보실 수 있습니다.</li>\
<li>당일 고객센터에서 신용카드로 충전 한 것은 충전 취소가 가능합니다. 충전취소를 선택하시고 주민번호와 신용카드번호를 입력하시면 됩니다.</li>\
";
pps_add="\
<li>자동연결, 착신전환 서비스를 동시에 사용하시면 1일 43원씩 차감됩니다.(매일 06:00시에 공제)</li>\
";
//r_pps="<div class='mb5'><a href='javascript:link(\"1_5_3_2_4\");'><img src='http://m.tworld.co.kr/center/bill/img/r_pps.gif'></a></div>"+type_basic;

autopay="\
<li>인출/승인일이 금융기관의 비영업일(토/일/공휴일)인 경우 익 영업일로 날짜가 변경될 수 있으니 청구서에 안내해드리는 인출/승인일을 반드시 확인하시기 바랍니다. </li>\
<li>당월 초에 신청하시는 경우 일정에 따라 당월부터 자동납부 인출/승인이 될 수 있사오니, 항상 신청/변경 처리 후 최초 인출 예정일을 확인하시기 바랍니다. </li>\
";
autopay_detail="\
<li>자동이체를 변경하신 당월에는 변경 전 카드로 승인 요청 됩니다. 만약 변경 전 카드 분실 등으로 인하여 승인될 수 없는 사유가 있으신 고객께서는 온라인 요금납부를 이용하시면 편리하게 납부하실 수 있습니다.</li>\
<li>신용카드사에서 발행하는 대금명세서에 당사의 승인 요청 금액이 포함되는 시기는 고객님의 카드사 신청결제일에 따라, 당사가 승인 요청한 당월 또는 익월에 포함되어 청구됩니다.</li>\
<li>다른 은행계좌이체로 변경시 자동납부 신청결과가 금융기관으로부터 3일(은행 영업일 기준)후에 당사에 반영되오니, 정상적으로 신청되었는지 추후에 반드시 확인하시기 바랍니다.</li>\
<li>신용카드로 자동납부를 변경하신 경우에는 자동납부 신청결과가 약 10분 후에 반영되오니, 잠시 후 정상적으로 신청되었는지 반드시 확인하시기 바랍니다.</li>\
<div class='8 info2 mt3'>* 일부 특수카드(직불카드,체크카드 등)의 경우 처리되지 않을 수 있습니다.</div>\
";
autopay_detail_bank="\
<li>자동이체를 변경하신 당월에는 변경 전 카드로 승인 요청 됩니다. 만약 변경 전 카드 분실 등으로 인하여 승인될 수 없는 사유가 있으신 고객께서는 T WORLD의 온라인 요금납부를 이용하시면 편리하게 납부하실 수 있습니다.</li>\
<li>다른 은행계좌이체로 변경 시 자동납부 신청결과가 금융기관으로부터 3일(은행 영업일 기준)후에 당사에 반영되오니, 정상적으로 신청되었는지 추후에 반드시 확인하시기 바랍니다.</li>\
<li>신용카드로 자동납부를 변경하신 경우에는 자동납부 신청결과가 약 10분 후에 반영되오니, 잠시 후 정상적으로 신청되었는지 반드시 확인하시기 바랍니다.</li>\
<div class='8 info2 mt3'>* 일부 특수카드(직불카드,체크카드 등)의 경우 처리되지 않을 수 있습니다.</div>\
";
autopay_detail_bank2="\
<li>자동이체를 변경하신 당월에는 변경 전 카드로 승인요청 됩니다. 만약 변경 전 카드 분실 등으로 인하여 승인될 수 없는 사유가 있으신 고객께서는 온라인 요금납부를 이용하시면 편리하게 납부하실 수 있습니다.</li>\
";
autopay_detail_card="\
<li>자동이체를 변경하신 당월에는 변경 전 카드로 승인 요청 됩니다. 만약 변경 전 카드 분실 등으로 인하여 승인될 수 없는 사유가 있으신 고객께서는 T WORLD의 온라인 요금납부를 이용하시면 편리하게 납부하실 수 있습니다.</li>\
<li>다른 은행계좌이체로 변경 시 자동납부 신청결과가 금융기관으로부터 3일(은행 영업일 기준)후에 당사에 반영되오니, 정상적으로 신청되었는지 추후에 반드시 확인하시기 바랍니다.</li>\
<li>신용카드로 자동납부를 변경하신 경우에는 자동납부 신청결과가 약 10분 후에 반영되오니, 잠시 후 정상적으로 신청되었는지 반드시 확인하시기 바랍니다.</li>\
<div class='8 info2 mt3'>* 일부 특수카드(직불카드,체크카드 등)의 경우 처리되지 않을 수 있습니다.</div>\
";
//r_autopay=r_online;

billtype="\
<li>ⓜ청구서(모바일청구서)는 고객님의 이동전화로 청구서를 보내주는 서비스이며 이용에 따른 비용은 발생하지 않습니다.</li>\
<li>ⓜ청구서를 이용하시는 고객님은 이메일로 청구 상세 내역 및 뉴스레터를 함께 보내드립니다.</li>\
<li>ⓜ청구서 이용시 우편청구서는 발행되지 않습니다.</li>\
<li>매월 7일까지 신청분에 한해 당월 발송되며 8일 이후 신청시 익월에 발송되오니 유의하시기 바랍니다.</li>\
";
_billtype="\
<li>통합청구고객의 경우, 대표번호만 신청이 가능하며 전체 요금이 합산되어 발송됩니다.(통합청구고객 : 한장의 청구서로 여러개의 회선에 대한 요금내역을 받으시는 고객)</li>\
<li>ⓜ청구서 신청은 휴대폰의 기종, 지역 및 이용상태에 따라 일부 제한되실 수 있습니다.</li>\
<li>(구) 모바일청구서 사용고객이 ⓜ청구서를 신청할 경우 기존 모바일 청구서는 해지됩니다.</li>\
";
billtype2="\
<li>이메일 청구서는 납부방법에 상관없이 신청 가능합니다. 지로납부 고객은 지로 이메일 청구서가 발송되오니, 이메일 청구서에 기재된 지로번호와 전자납부번호를 이용하여 납부해 주시기 바랍니다.</li>\
<li>이메일 청구서 신청 및 해지에 따른 변경 내용은 익월부터 반영됩니다.(단, 매월 4일 이전에 변경하시면 당월부터 반영됨)</li>\
<li>이메일 청구서를 신청하시면 우편청구서는 발송되지 않습니다. 단, 이메일 청구서 부달시 우편청구서 수령을 원하시면 하단의 '부달시 우편청구서 재발행'에서 '발행'을 선택해 주시기 바랍니다.</li>\
<li>일반우편 청구서를 받지 않고 이메일 청구서만 받을 경우 포인트박스 200점이 제공됩니다.</li>\
";
billtype3="\
<li>청구서는 ⓜ 청구서, 이메일청구서 또는 우편청구서 중 하나만 받으실 수 있습니다.</li>\
<li>우편청구서 신청시 ⓜ 청구서 및 이메일청구서는 자동 해지됩니다.</li>\
";
_billtype="\
<li>통합청구고객의 경우, 대표번호만 신청이 가능하며 전체 요금이 합산되어 발송됩니다.<br>(통합청구고객 : 한장의 청구서로 여러개의 회선에 대한 요금내역을 받으시는 고객)</li>\
<li>ⓜ청구서 신청은 휴대폰의 기종, 지역 및 이용상태에 따라 일부 제한되실 수 있습니다.</li>\
<li>(구) 모바일청구서 사용고객이 ⓜ청구서를 신청할 경우 기존 모바일 청구서는 해지됩니다.</li>\
";
billtype_detail="\
<li>ⓜ 청구서는 모바일청구서외에 이메일로 청구내역을 보내드립니다.</li>\
";
billtype_detail_graph="\
<li>그래프상 표시되는 요금항목은 국내/국제통화료,폰메일 이용료,소액결제 및 정보이용료 등입니다. </li>\
<li>프리(Free)상품,지정번호/지역할인 등 각종 공제 및 할인금액은 반영되지 않습니다.</li>\
";
billtype_mbillreissue="\
<li>ⓜ 청구서는 모바일청구서외에 이메일로 청구내역을 보내드립니다.</li>\
";
billtype_ebillreissue="\
<li>이메일청구서 재발행은 당월분을 포함하여 최대 4개월,통합/전국통합은 최대 2개월까지 가능합니다.</li>\
<li>이메일청구서는 신청분에 한하여 발송하며, 재발행 시점에서 기존 이메일청구서를 이용하는 고객님의 경우에만 신청이 가능합니다.</li>\
<li>매일 12시부터 22시까지 1시간 단위로 총 11회 재발행 작업을 하며, 재발행 요청량이 많을 경우 다소 지연될 수 있습니다.<br>(예 : 오전 9시에 신청하시면 12시 40분, 14시 5분에 신청하시면 15시 40분에 받으실 수 있습니다.)</li>\
<li>이메일청구서 재발행을 요청하시는 시점에서 고객별로 재발행이 가능한 조건월이 표시됩니다.</li>\
";
billtype_pbillreissue="\
<li>재발행 요청전 주소가 정확한지 다시 한번 확인하시고,청구지 주소변경은 원하시면 ‘청구지 주소 변경’ 버튼을 누른 후 변경하시기 바랍니다.</li>\
<li>일반(종이)청구서 재발행은 당월분을 포함하여 최대 3개월,통합/전국통합은 최대 2개월까지 가능 합니다.</li>\
<li>일반(종이)청구서 재발행을 요청하시는 시점에서 고객별로 재발행이 가능한 조건월이 표시됩니다.</li>\
<li>재발송 요청 후 5~6일 이내 도착합니다.<br>(단, 발송일은 영업일 기준이며 발송지역 및 우체국의 사정에 따라 변경될 수 있습니다.)</li>\
";
_billtype_pbillreissue="\
<li>서비스 해지 후나 납부금액이 없을 경우 등 고객의 사정에 따라 재발급 신청이 불가할 수 있습니다.</li>\
<li>자동납부를 신청하시면 편리하게 요금을 납부하실 수 있으며,1%의 할인혜택을 드립니다.<br>※ 당월에 인출된 사용요금의 1%를 다음달 요금청구에 할인 반영합니다. (단, 10,000원 이내에서 할인)</li>\
";
//r_billtype="<div class='mb5'><a href='javascript:pops(\"http://m.tworld.co.kr/center/bill/charge/pop_billprocess.html\",\"\",\"660\",\"620\");'><img src='http://m.tworld.co.kr/center/bill/img/r_billtype.gif'></a></div>"+type_basic;


// 요금제 변경/조회 price

//price_base="\
//<li><span onclick='pops(\"http://m.tworld.co.kr/center/bill/price/pop_017bill.html\",\"\",\"566\",\"650\");' style='cursor:hand;'><span class='info_l'></span><span class='info'>017요금제</span><span class='info_r'></span></span> 중 일반요금 4종(표준,로얄,비즈니스,레져)만 통합요금제로 변경이 가능합니다. 기존 017 부가서비스의 등록 제약으로 부가서비스가 제공되는 017 요금제(조이패밀리,아이 레이디요금, 패밀리요금 등)의 경우 통합요금제로의 변경이 불가하며, 변경 또는 해제시 지점 이나 고객센터<국번없이 1599-0011(유료) / 휴대폰 114>로 문의해 주시기 바랍니다.</li>\
//<li>일부 요금제의 경우 T-고객센터상에서 변경이 불가할 수 있습니다.</li>\
//";
price_plan="\
<li>약정할인 가입대상은 상기 약정할인 요금가입자만 가능합니다.</li>\
<li>약정요금제 등록후 약정기간을 신청하셔야 약정할인프로그램을 이용하실 수 있습니다. </li>\
<li>약정할인 요금 대상은 기본료 + 국내음성통화료(할인후)입니다.</li>\
<li>약정기간은 약정할인 가입 익월 1일 + 18개월/24개월 후 약정할인 가입 해당월 말일까지 해당 됩니다.</li>\
";
price_free="\
<li>프리(Free)요금 해지 후 30일 이내 동일한 프리 요금제로의 재가입이 불가합니다.</li>\
<!--li>요금제 해지는 해지하려는 요금제를 선택,사용에 Check 표시를 지우고 변경하세요.</li-->\
<li>신청은 ‘사용가능한 서비스’에서 check 표시하고 서비스 변경하세요.</li>\
<li>해지는 ‘사용중인 서비스’에서 check 표시를 지우고 서비스 변경하세요.</li>\
";
//price_data="\
//<li>신청은 ‘사용가능한 서비스’에서 check 표시하고 ‘서비스 변경’하세요.</li>\
//<li>해지는 ‘사용중인 서비스’에서 check 표시를 지우고 ‘서비스 변경’하세요.</li>\
//<li>아래 서비스에 관한 기타 자세한 사항은 T고객센터 > 상담/안내 > 요금안내 > <span onclick='link(1,5,4,2);' style='cursor:hand;'><span class='info_l'></span><span class='info'>데이터요금안내</span><span class='info_r'></span></span>에서 확인하시기 바랍니다.</li>\
//<li><span onclick='link(1,1,1,2);' style='cursor:hand;'><span class='info_l'></span><span class='info'>무료통화 조회</span><span class='info_r'></span></span>에서는 당월 1일부터 전일까지 Data무료통화 잔여량을 금액기준으로 조회하실 수 있습니다.<br>(단, 실제값과는 다소 차이가 있을 수 있으니 참고용으로 활용하시길 바랍니다)</li>\
//";
price_add_drive="\
<li>NATE Drive 가입 및 요금제 변경 후 30일 이후 변경 가능합니다.</li>\
<li>2005. 7. 1 이후 프리미엄, 레귤러, 세이브 요금의 경우 안전운전도우미가 무료 제공됩니다.</li>\
<li>2005. 7. 1 이후 프리미엄, 레귤러, 세이브 요금의 경우 길안내 관련 데이터통화료가 무료 제공됩니다.</li>\
<li>안전운전도우미 서비스 신청시 'Kit 업그레이드' 안내가 될 경우 삼성 A/S 센터에서 Kit업그레이드를 받으셔야 하며, 기존 업그레이드 받으신 고객은 별도의 업그레이드 없이 사용 가능합니다.</li>\
";
price_add_safedrive="\
<li><span class='em'>안심 드라이브</span>는 월정액 3,000원(정보이용료)에 이용 가능하며 Data 통화료는 무료입니다.</li>\
<li><span class='em'>안심 드라이브</span>는 일부 휴대폰에서만 사용 가능 합니다.<br>(사용 가능 휴대폰 : S4, PH-S7000V, PH-S6500, SCH-S350, PH-S310, SCH-V650)</li>\
<li> 해지는 ‘사용중인 부가서비스’에서 Check 표시를 지우고 ‘변경’ 하세요.</li>\
";
price_add_roming="\
<li>단말기 임대료 및 임대로밍 통화료, 수신시 국제구간 요금, 정보이용료는 요금 할인이 적용되지 않습니다.</li>\
<li>상한요금제, PPS 고객은 가입이 불가합니다.</li>\
<li>단말기 임대료 및 임대로밍 통화료, 수신시 국제구간 요금, 정보이용료는 요금 할인이 적용되지 않습니다.</li>\
<li>Global 로밍 자동 할인 요금제는 한시적으로 2006년 6월1일 ~ 2006년 12월 31일까지 가입할 수 있으며, 요금제에 가입한 고객은 2007년 12월 31일까지 할인 혜택을 적용받습니다.</li>\
";
price_add_voicephone="\
<li>선물전화(PPS,HDN), 팅(100/500/별/문자무제한), 아이니(플러스), 영상커플 요금제 고객 가입 불가합니다.<br>단, 팅 버디(세이브)요금제 고객은 가입이 가능합니다.</li>\
<li>영상통화 단말기만 가입이 가능합니다.</li>\
";
price_pda="\
<li>PDA 요금제는 변경일부터 적용, 일할계산되며 월 1회(30일 기준)만 변경가능합니다.</li>\
<li>별도의 음성요금제 가입없이 이동전화 서비스 이용이 가능하며,프리(Free)요금제 신청도 가능합니다.</li>\
<li>PDA요금제 선택시 맴버십 중에 리더스 클럽이 가능합니다.</li>\
";
//r_price="<div class='mb5'><a href='javascript:link(1,5,4);'><img src='http://m.tworld.co.kr/center/bill/img/r_price.gif'></a></div>";
//r_price+=rec_header+type_b+rec_footer;

//r_price_plan="<div class='mb5'><a href='javascript:link(1,5,4,1,2);'><img src='http://m.tworld.co.kr/center/bill/img/r_price_plan.gif'></a></div>";
//r_price_plan+=rec_header+type_b+rec_footer;

//r_price_free="<div class='mb5'><a href='javascript:link(1,5,4,3);'><img src='http://m.tworld.co.kr/center/bill/img/r_price_free.gif'></a></div>";
//r_price_free+=rec_header+type_b+rec_footer;

//r_price_data="<div class='mb5'><a href='javascript:link(1,5,4,4);'><img src='http://m.tworld.co.kr/center/bill/img/r_price_data.gif'></a></div>";
//r_price_data+=rec_header+type_b+rec_footer;

//r_price_add_drive="<div class='mb5'><a href='javascript:link(1,5,4,6);'><img src='http://m.tworld.co.kr/center/bill/img/r_price_add_drive.gif'></a></div>";
//r_price_add_drive+=rec_header+type_b+rec_footer;

//r_price_add_safedrive="<div class='mb5'><a href='javascript:link(1,5,4,6,2);'><img src='http://m.tworld.co.kr/center/bill/img/r_price_add_drive.gif'></a></div>";
//r_price_add_safedrive+=rec_header+type_b+rec_footer;

//r_price_add_voicephone="<div class='mb5'><a href='javascript:link(1,5,4,5);'><img src='http://m.tworld.co.kr/center/bill/img/r_price_add_voicephone.gif'></a></div>";
//r_price_add_voicephone+=rec_header+type_b+rec_footer;

//r_price_add_roming="<div class='mb5'><a href='javascript:link(1,5,5,4);'><img src='http://m.tworld.co.kr/center/bill/img/r_price_add_roming.gif'></a></div>";
//r_price_add_roming+=rec_header+type_b+rec_footer;

//r_price_patten="<div class='mb5'><a href='javascript:link(1,5,5,4);'><img src='http://m.tworld.co.kr/center/bill/img/r_price_add_roming.gif'></a></div>";
//r_price_patten+=rec_header+type_b+rec_footer;

//r_pattern=rec_header+type_b+rec_close+rec_middle+type_c+rec_footer;



function info(id){
	id=eval(id);
	document.write("<ul>");
	document.write(id);
	document.write("</ul>");
}

function check(id){
	id=eval("_"+id);
	document.write("<ul>");
	document.write(id);
	document.write("</ul>");
}

function right(id){
	document.write("<div id='cright'>");
	if(id){
	id=eval("r_"+id);
		document.write("<div class='mb5'>"+id+"</div>");
	}else{
	//document.write(type_basic);
	}
	document.write("</div>");
}
