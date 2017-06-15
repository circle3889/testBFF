    function findCountry() {
        //$('countryCodeEntity.countryCode').value = "";
        //$('countryCodeEntity.countryNameKor').value = "";

        //if ( required( 'keyword', "국가 검색어를 입력하셔야 합니다." ) ) return;
        
        if ( $('keyword').value == "과달루프" || $('keyword').value == "과델로프") $('keyword').value = "과달루프";
        else if ( $('keyword').value == "그라나다") $('keyword').value = "그레나다";
        else if ( $('keyword').value == "그린란드") $('keyword').value = "그린랜드";
        else if ( $('keyword').value == "네델란드") $('keyword').value = "네덜란드";
        else if ( $('keyword').value == "네덜란드안틸레스" || $('keyword').value == "네덜란드 열도" || $('keyword').value == "네덜란드 안틸레스 제도" || $('keyword').value == "네덜란드 앤틸레스 제도") $('keyword').value = "네덜란드 앤틸리스 제도";
        else if ( $('keyword').value == "타이완") $('keyword').value = "대만";
        else if ( $('keyword').value == "도미니카 연방") $('keyword').value = "도미니카(연방)";
        else if ( $('keyword').value == "룩셈부르그") $('keyword').value = "룩셈부르크";
        else if ( $('keyword').value == "리유니온") $('keyword').value = "리유니언";
        else if ( $('keyword').value == "마케도냐") $('keyword').value = "마케도니아";
        else if ( $('keyword').value == "말레이지아") $('keyword').value = "말레이시아";
        else if ( $('keyword').value == "마우리타니아" || $('keyword').value == "모리타니") $('keyword').value = "모리타니아";
        else if ( $('keyword').value == "말타") $('keyword').value = "몰타";
        else if ( $('keyword').value == "몽고") $('keyword').value = "몽골";
        else if ( $('keyword').value == "바바도스" || $('keyword').value == "바베도스") $('keyword').value = "바베이도스";
        else if ( $('keyword').value == "영국령 버진 제도" || $('keyword').value == "영국령 버진 군도") $('keyword').value = "버진 군도(영국)";
        else if ( $('keyword').value == "베네수엘라") $('keyword').value = "베네주엘라";
        else if ( $('keyword').value == "베냉") $('keyword').value = "베닌";
        else if ( $('keyword').value == "벨라루스") $('keyword').value = "벨로루시";
        else if ( $('keyword').value == "싸이판") $('keyword').value = "사이판";
        else if ( $('keyword').value == "시프러스" || $('keyword').value == "싸이프러스") $('keyword').value = "사이프러스";
        else if ( $('keyword').value == "세이셸") $('keyword').value = "세이셀";
        else if ( $('keyword').value == "성루시아") $('keyword').value = "세인트 루시아";
        else if ( $('keyword').value == "세인트빈센트그레나딘" || $('keyword').value == "성빈센트그레나딘") $('keyword').value = "성빈센트";
        else if ( $('keyword').value == "세인트키츠네비스" || $('keyword').value == "성키츠네비스") $('keyword').value = "세인트 키츠 앤 네비스";
        else if ( $('keyword').value == "스발바르 제도 얀 마엔" || $('keyword').value == "스발바르 제도") $('keyword').value = "스발바르 제도 잔 마엔";
        else if ( $('keyword').value == "스와질랜드") $('keyword').value = "스와질란드";
        else if ( $('keyword').value == "시에라 레오네" || $('keyword').value == "시에라 리오네") $('keyword').value = "시에라리온";
        else if ( $('keyword').value == "싱가폴") $('keyword').value = "싱가포르";
        else if ( $('keyword').value == "아랍에미레이트" || $('keyword').value == "아랍에미리트 연합" || $('keyword').value == "아랍에미레이트 연합") $('keyword').value = "아랍에미리트";
        else if ( $('keyword').value == "아메리칸사모아" || $('keyword').value == "미국령사모아제도") $('keyword').value = "아메리카 사모아";
        else if ( $('keyword').value == "아이슬랜드" || $('keyword').value == "아이스란드") $('keyword').value = "아이슬란드";
        else if ( $('keyword').value == "아제르바이잔") $('keyword').value = "아제르바이젠";
        else if ( $('keyword').value == "안귈라" || $('keyword').value == "앙귈라") $('keyword').value = "안길라";
        else if ( $('keyword').value == "안티과 바브다" || $('keyword').value == "안티과") $('keyword').value = "안티구아";
        else if ( $('keyword').value == "에티오피아" || $('keyword').value == "이디오피아") $('keyword').value = "에디오피아";
        else if ( $('keyword').value == "적도 기니" || $('keyword').value == "에콰토리알기니") $('keyword').value = "에콰토리알 기니아";
        else if ( $('keyword').value == "우즈벡") $('keyword').value = "우즈베키스탄";
        else if ( $('keyword').value == "이태리") $('keyword').value = "이탈리아";
        else if ( $('keyword').value == "인디아") $('keyword').value = "인도";
        else if ( $('keyword').value == "자메이카") $('keyword').value = "자마이카";
        else if ( $('keyword').value == "그루지아" || $('keyword').value == "그루지야") $('keyword').value = "조지아";
        else if ( $('keyword').value == "지브롤타" || $('keyword').value == "지브롤터") $('keyword').value = "지브랄타";
        else if ( $('keyword').value == "잠바브웨") $('keyword').value = "짐바브웨";
        else if ( $('keyword').value == "챠드") $('keyword').value = "차드";
        else if ( $('keyword').value == "체코 공화국") $('keyword').value = "체코";
        else if ( $('keyword').value == "카나리제도" || $('keyword').value == "카나리아군도" || $('keyword').value == "카나리아제도") $('keyword').value = "카나리군도";
        else if ( $('keyword').value == "카나다") $('keyword').value = "캐나다";
        else if ( $('keyword').value == "케이먼 군도" || $('keyword').value == "케이먼 제도" || $('keyword').value == "케이맨제도" || $('keyword').value == "케이맨군도" || $('keyword').value == "카이만제도" || $('keyword').value == "카이만군도") $('keyword').value = "캐이맨 제도";
        else if ( $('keyword').value == "코트디봐르" || $('keyword').value == "코트디브와르" || $('keyword').value == "코트디부와르" || $('keyword').value == "코트디브아르") $('keyword').value = "코트디부아르";
        else if ( $('keyword').value == "키르키즈스탄") $('keyword').value = "키르기스스탄";
        else if ( $('keyword').value == "터크스앤케이커스제도" || $('keyword').value == "터크스앤케이커스" || $('keyword').value == "터크스앤케이코스" || $('keyword').value == "터크스앤케이코스제도" || $('keyword').value == "턱스앤케이커스" || $('keyword').value == "터크스앤케이커스제도" || $('keyword').value == "턱스앤케이코스제도") $('keyword').value = "터크스카이코스 제도";
        else if ( $('keyword').value == "투르크멘") $('keyword').value = "투르크메니스탄";
        else if ( $('keyword').value == "파로에 군도" || $('keyword').value == "파로에 제도") $('keyword').value = "파로에";
        else if ( $('keyword').value == "포루투칼") $('keyword').value = "포르투갈";
        else if ( $('keyword').value == "프렌치 폴리네시아" || $('keyword').value == "프랑스령 폴리네시아") $('keyword').value = "폴리네시아";
        else if ( $('keyword').value == "저지섬" || $('keyword').value == "저지") {
        	alert("저지섬(영국령)은 영국과 동일한 요금 및 커버리지가 적용됩니다");
        	$('keyword').value = "영국";
        }
        //ajaxSend( "/24hours/t_roaming/CountryCharge.do?method=findCountryList", "countryCodeEntity.keyword=" +  encodeURIComponent($F('keyword')), onLoadFindCountry );
        //ajaxSend( "/jsp/brand/roaming/charge/FindCountry.jsp", "keyword=" +  encodeURIComponent($F('keyword')), onLoadFindCountry );
        ajaxSend( "/normal.do?viewId=V_ROAM0033&serviceId=S_ROAM0002", "keyword=" +  encodeURIComponent($F('keyword')), onLoadFindCountry );
    }
    
    // 임대로밍 국가 추가건 관련 개발 작업 [2010.06.14][s] 
    function findCountryReserve(inputVal) {
        $('countryCodeEntity.countryCode').value = "";
        $('countryCodeEntity.countryNameKor').value = "";

				var nation = 'nationcode_' + inputVal;
           
        if ( required( nation, "국가 검색어를 입력하셔야 합니다." ) ) return;
      
        if ( $(nation).value == "과달루프" || $(nation).value == "과델로프") $(nation).value = "과달루프";
        else if ( $(nation).value == "그라나다") $(nation).value = "그레나다";
        else if ( $(nation).value == "그린란드") $(nation).value = "그린랜드";
        else if ( $(nation).value == "네델란드") $(nation).value = "네덜란드";
        else if ( $(nation).value == "네덜란드안틸레스" || $(nation).value == "네덜란드 열도" || $(nation).value == "네덜란드 안틸레스 제도" || $(nation).value == "네덜란드 앤틸레스 제도") $(nation).value = "네덜란드 앤틸리스 제도";
        else if ( $(nation).value == "타이완") $(nation).value = "대만";
        else if ( $(nation).value == "도미니카 연방") $(nation).value = "도미니카(연방)";
        else if ( $(nation).value == "룩셈부르그") $(nation).value = "룩셈부르크";
        else if ( $(nation).value == "리유니온") $(nation).value = "리유니언";
        else if ( $(nation).value == "마케도냐") $(nation).value = "마케도니아";
        else if ( $(nation).value == "말레이지아") $(nation).value = "말레이시아";
        else if ( $(nation).value == "마우리타니아" || $(nation).value == "모리타니") $(nation).value = "모리타니아";
        else if ( $(nation).value == "말타") $(nation).value = "몰타";
        else if ( $(nation).value == "몽고") $(nation).value = "몽골";
        else if ( $(nation).value == "바바도스" || $(nation).value == "바베도스") $(nation).value = "바베이도스";
        else if ( $(nation).value == "영국령 버진 제도" || $(nation).value == "영국령 버진 군도") $(nation).value = "버진 군도(영국)";
        else if ( $(nation).value == "베네수엘라") $(nation).value = "베네주엘라";
        else if ( $(nation).value == "베냉") $(nation).value = "베닌";
        else if ( $(nation).value == "벨라루스") $(nation).value = "벨로루시";
        else if ( $(nation).value == "싸이판") $(nation).value = "사이판";
        else if ( $(nation).value == "시프러스" || $(nation).value == "싸이프러스") $(nation).value = "사이프러스";
        else if ( $(nation).value == "세이셸") $(nation).value = "세이셀";
        else if ( $(nation).value == "성루시아") $(nation).value = "세인트 루시아";
        else if ( $(nation).value == "세인트빈센트그레나딘" || $(nation).value == "성빈센트그레나딘") $(nation).value = "성빈센트";
        else if ( $(nation).value == "세인트키츠네비스" || $(nation).value == "성키츠네비스") $(nation).value = "세인트 키츠 앤 네비스";
        else if ( $(nation).value == "스발바르 제도 얀 마엔" || $(nation).value == "스발바르 제도") $(nation).value = "스발바르 제도 잔 마엔";
        else if ( $(nation).value == "스와질랜드") $(nation).value = "스와질란드";
        else if ( $(nation).value == "시에라 레오네" || $(nation).value == "시에라 리오네") $(nation).value = "시에라리온";
        else if ( $(nation).value == "싱가폴") $(nation).value = "싱가포르";
        else if ( $(nation).value == "아랍에미레이트" || $(nation).value == "아랍에미리트 연합" || $(nation).value == "아랍에미레이트 연합") $(nation).value = "아랍에미리트";
        else if ( $(nation).value == "아메리칸사모아" || $(nation).value == "미국령사모아제도") $(nation).value = "아메리카 사모아";
        else if ( $(nation).value == "아이슬랜드" || $(nation).value == "아이스란드") $(nation).value = "아이슬란드";
        else if ( $(nation).value == "아제르바이잔") $(nation).value = "아제르바이젠";
        else if ( $(nation).value == "안귈라" || $(nation).value == "앙귈라") $(nation).value = "안길라";
        else if ( $(nation).value == "안티과 바브다" || $(nation).value == "안티과") $(nation).value = "안티구아";
        else if ( $(nation).value == "에티오피아" || $(nation).value == "이디오피아") $(nation).value = "에디오피아";
        else if ( $(nation).value == "적도 기니" || $(nation).value == "에콰토리알기니") $(nation).value = "에콰토리알 기니아";
        else if ( $(nation).value == "우즈벡") $(nation).value = "우즈베키스탄";
        else if ( $(nation).value == "이태리") $(nation).value = "이탈리아";
        else if ( $(nation).value == "인디아") $(nation).value = "인도";
        else if ( $(nation).value == "자메이카") $(nation).value = "자마이카";
        else if ( $(nation).value == "그루지아" || $(nation).value == "그루지야") $(nation).value = "조지아";
        else if ( $(nation).value == "지브롤타" || $(nation).value == "지브롤터") $(nation).value = "지브랄타";
        else if ( $(nation).value == "잠바브웨") $(nation).value = "짐바브웨";
        else if ( $(nation).value == "챠드") $(nation).value = "차드";
        else if ( $(nation).value == "체코 공화국") $(nation).value = "체코";
        else if ( $(nation).value == "카나리제도" || $(nation).value == "카나리아군도" || $(nation).value == "카나리아제도") $(nation).value = "카나리군도";
        else if ( $(nation).value == "카나다") $(nation).value = "캐나다";
        else if ( $(nation).value == "케이먼 군도" || $(nation).value == "케이먼 제도" || $(nation).value == "케이맨제도" || $(nation).value == "케이맨군도" || $(nation).value == "카이만제도" || $(nation).value == "카이만군도") $(nation).value = "캐이맨 제도";
        else if ( $(nation).value == "코트디봐르" || $(nation).value == "코트디브와르" || $(nation).value == "코트디부와르" || $(nation).value == "코트디브아르") $(nation).value = "코트디부아르";
        else if ( $(nation).value == "키르키즈스탄") $('keyword').value = "키르기스스탄";
        else if ( $(nation).value == "터크스앤케이커스제도" || $(nation).value == "터크스앤케이커스" || $(nation).value == "터크스앤케이코스" || $(nation).value == "터크스앤케이코스제도" || $(nation).value == "턱스앤케이커스" || $(nation).value == "터크스앤케이커스제도" || $(nation).value == "턱스앤케이코스제도") $(nation).value = "터크스카이코스 제도";
        else if ( $(nation).value == "투르크멘") $(nation).value = "투르크메니스탄";
        else if ( $(nation).value == "파로에 군도" || $(nation).value == "파로에 제도") $(nation).value = "파로에";
        else if ( $(nation).value == "포루투칼") $(nation).value = "포르투갈";
        else if ( $(nation).value == "프렌치 폴리네시아" || $(nation).value == "프랑스령 폴리네시아") $(nation).value = "폴리네시아";
        else if ( $(nation).value == "저지섬" || $(nation).value == "저지") {
        	alert("저지섬(영국령)은 영국과 동일한 요금 및 커버리지가 적용됩니다");
        	$(nation).value = "영국";
        }
        	
        ajaxSend( "/normal.do?viewId=V_ROAM0033&serviceId=S_ROAM0002", "keyword=" +  encodeURIComponent($F(nation)), onLoadFindCountry );
    }
    // 임대로밍 국가 추가건 관련 개발 작업 [2010.06.14][e]
