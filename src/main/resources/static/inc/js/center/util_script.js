//********************************************************************
// * 작 성 일 자 : 2002.5.16
// * 작   성  자 : 정철원
// * 처 리 내 역 : 주민 등록번호 검사
//********************************************************************/
function checkRegisterNum(reg_no) {

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
	birth = new Date(birthYear, birthMonth, birthDate);

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



//********************************************************************
// * 작 성 일 자 : 2002.5.16
// * 작   성  자 : 정철원
// * 처 리 내 역 : 외국인 등록번호 검사
//********************************************************************/
function fgn_no_chksum(reg_no) {
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
       birthYear = "19";
    }
    birthYear += reg_no.substr(0, 2);
    birthMonth = reg_no.substr(2, 2) - 1;
    birthDate = reg_no.substr(4, 2);
    birth = new Date(birthYear, birthMonth, birthDate);

    if ( birth.getYear() % 100 != reg_no.substr(0, 2) ||
         birth.getMonth() != birthMonth ||
         birth.getDate() != birthDate) {
      return false;
    }

    buf = new Array(13);
    for (i = 0; i < 13; i++) buf[i] = parseInt(reg_no.charAt(i));

	/* 8, 9번째 자리 확인 */
    odd = buf[7]*10 + buf[8];
    if (odd%2 != 0) {
      return false;
    }
	/* 12번째 자리 확인 */
    if ((buf[11] != 6)&&(buf[11] != 7)&&(buf[11] != 8)&&(buf[11] != 9)) {
      return false;
    }

	/* 숫자 조합 확인 */
    multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
    for (i = 0, sum = 0; i < 12; i++) sum += (buf[i] *= multipliers[i]);
    sum=11-(sum%11);
    if (sum>=10) sum-=10;
    sum += 2;
    if (sum>=10) sum-=10;
    if ( sum != buf[12]) return false;
	return true;

}

//********************************************************************
// * 작 성 일 자 : 2002.5.16
// * 작   성  자 : 정철원
// * 처 리 내 역 : 이전 외국인 등록번호 검사
//********************************************************************/
function fgn_no_chksumBef(reg_no) {
    var tmp910 = reg_no.substring(9,11);
    var tmp1012 = reg_no.substring(11);

	if( tmp910 =='10' || tmp910 =='12' || tmp910 =='14' ||
	    tmp910 =='16' || tmp910 =='18' || tmp910 =='20' ||
	    tmp910 =='22' || tmp910 =='24' || tmp910 =='26' ||
	    tmp910 =='28' || tmp910 =='30' || tmp910 =='32'  )
		;
	else  return  false ;

	if( tmp1012 == '00') return  false;
	return true;
}

// function 1 : E-MAIL 형태 CHECK
// RETURN : E-mail형식에 맞으면 true 틀리면 false

function isEmailValid(mail)
{
    function containsCharsChk(input) {
    	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@.-_";
    	var len = input.length;
    	var chk = true;
    	for (var inx = 0; inx < len; inx++)
    		if (chars.indexOf(input.charAt(inx)) == -1) chk = false;
    	return chk;
    }
    if (containsCharsChk(mail) == false) return false;
    if (mail.search(/(\S+)@(\S+)\.(\S+)/)) return false;
    else return true;
}



// function 1 : E-MAIL 형태 CHECK
// RETURN : E-mail형식에 맞으면 true 틀리면 false

function isEmailValid2(mail)
{
  return mail.search(/^\s*[\w\~\-\.]+\@[\w\~\-]+(\.[\w\~\-]+)+\s*$/g)>=0;
}

// function 1 : 이동전화번호 형태 CHECK
// RETURN : 이동전화번호 형식에 맞으면 true 틀리면 false
function isPhoneNumValid(number) {
	var temp;
	var nnumber1, nnumner2, nnumber3;
	var checkFlag = 0;
	if(number.length < 10 || number.length > 13)
	{
		return false;
	}
	else
	{
		for(var i = 0; i < number.length ; i++)
		{
			if(number.charAt(i) == '-')
			{
				if( ( i == 3 || i == (number.length - 5)) == false )
				{
					 return false;
				}
			}
		}

		nnumber3 = number.substring( number.length - 4 );
		nnumber1 = number.substring( 0 , 3 );
		nnumber2 = number.substring( 3 , number.length - 4 );

		switch(nnumber2.length)
		{
			case 3:
			for(var i = 0; i < nnumber2.length; i++)
			{
				if(nnumber2.charAt(i) == '-'){
				 return false;
			     }
			}
                        checkFlag = 1;
			break;

			case 4:
				for(var i = 0; i < nnumber2.length; i++ )
				{
					if(nnumber2.charAt(i) == '-')
					{
						if(i == 0)
						{
							temp = nnumber2.substring(1);
							if(temp.charAt(temp.length - 1) == '-') {
								return false;
							} else {
							   nnumber2 = temp;
	                           checkFlag = 1;

							}
						}
						else if(i == nnumber2.length - 1)
						{
							temp = nnumber2.substring(0, nnumber2.length - 1);
							nnumber2 = temp;
                            checkFlag = 1;
						}
						else {
							return false;
				        }
					}
				} // for
                checkFlag=1;
				break;

			case 5:

				for(var i = 0; i < nnumber2.length; i++ )
				{
					if(nnumber2.charAt(i) == '-')
					{
						if(i == 0)
						{
							temp = nnumber2.substring(1);
							if(temp.charAt(temp.length - 1) == '-')
							{
								nnumber2 = temp.substring(0, temp.length - 1);
								checkFlag = 1;
							}
							else {
								nnumber2 = temp;
								checkFlag = 1;
							}
						}
						else if(i == nnumber2.length - 1)
						{
							temp = nnumber2.substring(0, nnumber2.length - 1);
							nnumber2 = temp;
							checkFlag = 1;
						}
						else
						{
						        checkFlag =0;
						}

					}
				}
				if(checkFlag ==1) {
				    break;
				} else {
				   return false;
                }
			case 6:
				temp = number.substring(4, number.length - 5);
				nnumber2 = temp;
                checkFlag=1;
				break;

			default:
				break;

		} // end of switch


	} // end of if(number.length < 10 || number.length > 13)

	if(checkFlag != 1)
		return false;
	return true;
}

// function 3 : 공백제거
// RETURN : 주어진 String의 공백을 제거한 후 리턴 - 내용이 없으면 "" 리턴
function ignoreSpaces(string)
{
	var temp = "";
	string = '' + string;
	splitstring = string.split(" ");
	for(i = 0; i < splitstring.length; i++)
		temp += splitstring[i];
	return temp;
}