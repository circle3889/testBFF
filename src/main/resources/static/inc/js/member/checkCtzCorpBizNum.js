
function checkBizNum(para)	// 사업자등록번호 유효성체크
{
	var IDAdd = "137137135";
	var i = 0 ;
	var iDtot = 0 ;
	var tDtot = 0 ;
	
	if(para.length != 10) {
		return (false);
	}
	
	for(i = 0; i < 9; i++) {
		iDtot = iDtot + (para.substr(i,1) * IDAdd.substr(i,1));
	}
	
	iDtot = iDtot + parseInt((para.substr(8,1) * 5) / 10);
	iDtot = (iDtot % 10);
	
	if (iDtot == 0) {
		iDtot = 0;
	} else {
		iDtot = (10 - iDtot);
	}
	
	if(iDtot == para.substr(9,1)) {
		return (true);
	}
	else {
		return (false);
	}
}


function checkFrnCheckSum(para) 		// 외국인등록번호 유효성체크(CheckSum)
{
    var sum = 0;
    var odd = 0;

    buf = new Array(13);
    for(i = 0; i < 13; i++) {
        buf[i] = parseInt(para.charAt(i));
    }

    odd = buf[7]*10 + buf[8];

    if(odd%2 != 0) {
      return (false);
    }

    //if((buf[11] != 6)&&(buf[11] != 7)&&(buf[11] != 8)&&(buf[11] != 9)) {
    //  return (false);
    //}

    multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
    for(i = 0, sum = 0; i < 12; i++) {
        sum += (buf[i] *= multipliers[i]);
    }

    sum=11-(sum%11);

    if(sum>=10) {
        sum-=10;
    }

    sum += 2;

    if(sum>=10) {
        sum-=10;
    }

    if( sum != buf[12]) {
        return (false);
    }
    else {
        return (true);
    }
}


function checkRegisterNum(reg_no)		//주민등록번호 검사
{
	var birthYear;
	var birthMonth;
	var birthDate;
	var birth;
	if ((reg_no.charAt(6) == "1") || (reg_no.charAt(6) == "2"))
		birthYear = "19";
	else if ((reg_no.charAt(6) == "3") || (reg_no.charAt(6) == "4"))
		birthYear = "20";
	else if ((reg_no.charAt(6) == "9") || (reg_no.charAt(6) == "0"))
		birthYear = "18";
	else {
		return false;
	}
	birthYear += reg_no.substr(0, 2);
	birthMonth = reg_no.substr(2, 2) - 1;
	birthDate = reg_no.substr(4, 2);
	birth = new Date(birthYear, birthMonth, birthDate, 23);
	if ( birth.getYear() % 100 != reg_no.substr(0, 2) ||
		 birth.getMonth() != birthMonth ||	birth.getDate() != birthDate) {
		return false;
	}
	var  i = 0;
	var Sum = 0;
	var Mod = 0;
	for( i = 0 ; i < 12 ; i++ ) {
		if( i < 8)
			Sum+=parseInt(reg_no.charAt(i))*(i+2);
		else
			Sum+=parseInt(reg_no.charAt(i))*(i-6);
	} //end for
	Mod=11-(Sum%11);
	if(Mod>=10) Mod-=10;
	if( Mod!=parseInt(reg_no.charAt(12)) ) {
		return false;
	}
	return true;
}


function fgn_no_chksum(reg_no)		// 외국인등록번호 유효성 체크
{
	var birthYear;
	var birthMonth;
	var birthDate;
	var birth;
	var sum = 0;
	var odd = 0;
	if ((reg_no.charAt(6) == "5") || (reg_no.charAt(6) == "6"))
	{
		birthYear = "19";
	}
	else if ((reg_no.charAt(6) == "7") || (reg_no.charAt(6) == "8"))
	{
		birthYear = "20";
	}
	else if ((reg_no.charAt(6) == "9") || (reg_no.charAt(6) == "0"))
	{
		birthYear = "18";
	}
	else
	{
		return false;
	}
	birthYear += reg_no.substr(0, 2);
	birthMonth = reg_no.substr(2, 2) - 1;
	birthDate = reg_no.substr(4, 2);
	birth = new Date(birthYear, birthMonth, birthDate);
	
	if ( birth.getYear() % 100 != reg_no.substr(0, 2) ||
		 birth.getMonth() != birthMonth ||
		 birth.getDate() != birthDate)
	{
		return false;
	}
	
	var sum = 0;
	var odd = 0;
	
	buf = new Array(13);
	for (i = 0; i < 13; i++) buf[i] = parseInt(reg_no.charAt(i));
	odd = buf[7]*10 + buf[8];
	
	if (odd%2 != 0)
	{
		return false;
	}
	//if ((buf[11] != 6)&&(buf[11] != 7)&&(buf[11] != 8)&&(buf[11] != 9))
//	{
	//	return false;
	//}
	
	multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
	for (i = 0, sum = 0; i < 12; i++) sum += (buf[i] *= multipliers[i]);
	sum=11-(sum%11);
	
	if (sum>=10) sum-=10;
	sum += 2;
	if (sum>=10) sum-=10;
	if ( sum != buf[12])
	{
		return false;
	}
	else
	{
		return true;
	}
}


function ageCheck(age,jumin_no)			// 나이 검사
{

	var now,year,month,date, tmp, tmp1,tmp2,tmp3;
	now = new Date();
	year = now.getYear();
	month = (now.getMonth()+1);
	date = now.getDate();
	tmp = jumin_no.substring(6,7);

	if (tmp == "3" || tmp =="4")
	{
		return false;
	} else {
		year = String(year).substring(2,4);
		tmp = eval(year) + 100;
		if (String(month).length == 1)
		{
			tmp1 = "0"+String(month);
		} else{
			tmp1 = month;
		}
		if (String(date).length == 1)
		{
			tmp2 = "0"+String(date);
		} else {
			tmp2 = date;
		}
		tmp = String(tmp) + String(tmp1) + String (tmp2);
		tmp2 = (tmp - eval(jumin_no.substring(0,6)) ) / 10000;
		if (tmp2 < eval(age))
		{
			return false;
		}
	}
	return true;
}
