package kr.co.tworld.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.google.gson.Gson;

public class FreeBillUtil {
	
	@Autowired
	private GsonUtil gsonUtil;
	
	public Map<String, Object> stringToJson(String json) {
		
		Gson gson = new Gson();
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map = (Map<String, Object>) gson.fromJson(json, map.getClass());
		
		return map;
	}
	
	public Map<String, Object> setDataString(Map<String, Object> map){
		
		List<Map<String, Object>> freeBillEditList = (List<Map<String, Object>>) map.get("freeBillEditList");
		
		List<String> qtyList = new ArrayList<String>();
		List<String> remainGbQtyList = new ArrayList<String>();
		List<String> useMbQtyList = new ArrayList<String>();
		List<String> remainMbQtyList = new ArrayList<String>();
		List<String> useGbQtyList = new ArrayList<String>();
		
		if(freeBillEditList != null){
			for(int i=0; i<freeBillEditList.size(); i++){
				
				// 빈값 put
				qtyList.add(i, "");
				remainGbQtyList.add(i, "");
				useMbQtyList.add(i, "");
				remainMbQtyList.add(i, "");
				useGbQtyList.add(i, "");
				
				Map<String, Object> freeBillEdit = freeBillEditList.get(i);
				
				Map<String, Object> useHMS = null;
				Map<String, Object> remainHMS = null;
				Map<String, Object> totalHMS = null;
				
				useHMS = freeBillEdit.get("editUseQty") == null ? null :gsonUtil.stringToJson(freeBillEdit.get("editUseQty").toString());
				remainHMS = freeBillEdit.get("editRemainQty") == null ? null :gsonUtil.stringToJson(freeBillEdit.get("editRemainQty").toString());
				totalHMS = freeBillEdit.get("editTotalQty") == null ? null :gsonUtil.stringToJson(freeBillEdit.get("editTotalQty").toString());
				
				String codeType = (String) freeBillEdit.get("codeType");
				String skipCode = (String) freeBillEdit.get("skipCode");
				String remaindQty = (String) freeBillEdit.get("remaindQty");
				String useQty = (String) freeBillEdit.get("useQty");
				String unitCode = (String) freeBillEdit.get("unit");
				String totalQty = (String) freeBillEdit.get("baseQty");
				
				
				if(codeType.equals("D")){
					if(skipCode.equals("DDZ25") || skipCode.equals("DDZ23") || skipCode.equals("DD0PB")){
						useGbQtyList.set(i, makeDataString(useQty, useHMS, unitCode, "1"));
						useMbQtyList.set(i, makeDataStringMb(useQty, "1"));
					}else if(!remaindQty.equals("무제한")){
						remainGbQtyList.set(i, makeDataString(remaindQty, remainHMS, unitCode, "2"));
						useGbQtyList.set(i, makeDataString(useQty, useHMS, unitCode, "1"));
						remainMbQtyList.set(i, makeDataStringMb(remaindQty, "2"));
						useMbQtyList.set(i, makeDataStringMb(useQty, "1"));
					}else{
						if (skipCode != null && "PA".equals(skipCode)){
							useGbQtyList.set(i, makeDataString(useQty, useHMS, unitCode, "1"));
							useMbQtyList.set(i, makeDataStringMb(useQty, "1"));
						}
					}
				}else if(codeType.equals("V") || codeType.equals("VP") || codeType.equals("P")){
					if(!remaindQty.equals("무제한")){
						remainGbQtyList.set(i, makeDataString(remaindQty, remainHMS, unitCode, "2"));
						useGbQtyList.set(i, makeDataString(useQty, useHMS, unitCode, "1"));
					}else{
						useGbQtyList.set(i, makeDataString(useQty, useHMS, unitCode, "1"));
					}
				}else if(codeType.equals("S")){
					if(!"무제한".equals(remaindQty)) {
						if (remaindQty.indexOf("기본제공") > -1){
						}else{
							remainGbQtyList.set(i, makeDataString(remaindQty, remainHMS, unitCode, "2"));
							useGbQtyList.set(i, makeDataString(useQty, useHMS, unitCode, "1"));
						}
					}else{
						qtyList.set(i, makeDataString(useQty, useHMS, unitCode, "1"));
					}
					
				}else if(codeType.equals("ETC") || codeType.equals("VSP") || codeType.equals("VSD") || codeType.equals("TING")){
		            if ( !"0".equals(totalQty)) {
			            if(!"무제한".equals(remaindQty)) {
							remainGbQtyList.set(i, makeDataString(remaindQty, remainHMS, unitCode, "2"));
							useGbQtyList.set(i, makeDataString(useQty, useHMS, unitCode, "1"));
			            }
		            }
				}
			}
		}

		map.put("qtyList", qtyList);
		map.put("remainGbQtyList", remainGbQtyList);
		map.put("useMbQtyList", useMbQtyList);
		map.put("remainMbQtyList", remainMbQtyList);
		map.put("useGbQtyList", useGbQtyList);
		
		for(int i=0; i<freeBillEditList.size(); i++){
//			System.out.println(qtyList.get(i).toString());
//			System.out.println(remainGbQtyList.get(i).toString());
//			System.out.println(useMbQtyList.get(i).toString());
//			System.out.println(remainMbQtyList.get(i).toString());
//			System.out.println(useGbQtyList.get(i).toString());
//			System.out.println("======================================");
		}
		
		return map;
	}
	
	public static String makeDataString(String data, Map hm, String unitCode, String type) {
		
		StringBuffer sb = new StringBuffer();
		
		if(hm == null){
			return "";
		}
		if(hm.get("hour") == null || hm.get("minute") == null || hm.get("second") == null){
			return "";
		}
		
		if ("240".equals(unitCode)) {
			sb = makeDataStringByMinUnit(hm, type);
		} else if ("110".equals(unitCode)) {
			if (type.equals("2")) {
				sb.append("<em class='volume'>" + data + "</em>");
			} else {
				sb.append(data);
			}
			sb.append("원");
		} else if ("160".equals(unitCode)) {
			if (type.equals("2")) {
				sb.append("<em class='volume'>" + data + "</em>");
			} else {
				sb.append(data);
			}
			sb.append("팥");
		} else if ("140".equals(unitCode)) {
			
			data = StringUtils.replace(data, ",", "");
			float fData = Float.parseFloat(data);
			//System.out.println("===================== Float.parseFloat(data====" + fData);
			
			// 1KB ~ 1MB 미만
			if (fData < 1024) {
				
				//System.out.println(" 1MB 미만");
				
				data = NumberUtil.format(fData, "###,###,###,##0");
				if (type.equals("2")) {
					sb.append("<em class='volume'>" + data + "</em>");
				} else {
					sb.append(data);
				}
				sb.append("KB");
				
			} else {
				
				// 1MB (1024KB) ~ 1,023MB (1024*1024)
				// 소수점은 버림
				if ((1024 <= fData) && (fData < (1024 * 1024))) {
					
					//System.out.println(" 1024MB 미만");
					
					fData = fData / 1024;
					data = NumberUtil.format(fData, "###,###,###,##0");
					
					//System.out.println("===================== 계산 후 data" + data);
					if (type.equals("2")) {
						sb.append("<em class='volume'>" + data + "</em>");
					} else {
						sb.append(data);
					}
					sb.append("MB");
					
					// 1GB (1024MB) ~ 1,023GB (1024*1024*1024)
					// 숫자 표시를 GB
					// 표시하는 마지막 소수점이 0이면 표시 안함
				} else if ((1024 * 1024 <= fData) && (fData < (1024 * 1024 * 1024))) {
					
					//System.out.println(" 1024GB 미만");
					
					fData = fData / 1024 / 1024;
					//System.out.println(" 1024 gb 미만일 때 GB 로 표시하면: " + fData);
					
					// 1,000 이상은 소수점 표시 안함
					if (fData >= 1000) {
						
						data = NumberUtil.format(fData, "###,###,###,###");
						//System.out.println("===================== fData >= 1000 계산 후 data" + data);
						
						// 100 이상은 소수점 한자리 (두자리 버림)
					} else if ((100 <= fData) && (fData < 1000)) {
						
						data = NumberUtil.format(fData, "###.#");
						//System.out.println("===================== 100 이상은 소수점 한자리  data" + data);
						
						// 1~99 소수점 두자리 표시 (세자리 버림)
					} else if ((1 <= fData) && (fData < 100)) {
						
						data = NumberUtil.format(fData, "##.##");
						//System.out.println("===================== 1~99 소수점 두자리  data" + data);
						
					}
					if (type.equals("2")) {
						sb.append("<em class='volume'>" + data + "</em>");
					} else {
						sb.append(data);
					}
					sb.append("GB");
					
				}
			}
			
		} else if ("310".equals(unitCode) || "320".equals(unitCode)) {
			
			if (type.equals("2")) {
				sb.append("<em class='volume'>" + data + "</em>");
			} else {
				sb.append(data);
			}
			sb.append("건");
		}
		
		//System.out.println("최종 표시" + sb.toString());
		return sb.toString();
	}
	
	public static String makeDataString(String data, String unitCode, String type) {
		
		StringBuffer sb = new StringBuffer();
		
		data = StringUtils.replace(data, ",", "");
		float fData = Float.parseFloat(data);
		//System.out.println("===================== Float.parseFloat(data====" + fData);
		
		// 1KB ~ 1MB 미만
		if (fData < 1024) {
			
			//System.out.println(" 1MB 미만");
			
			data = NumberUtil.format(fData, "###,###,###,##0");
			sb.append("<strong>" + data + "</strong>");
			sb.append("KB");
			
		} else {
			
			// 1MB (1024KB) ~ 1,023MB (1024*1024)
			// 소수점은 버림
			if ((1024 <= fData) && (fData < (1024 * 1024))) {
				
				//System.out.println(" 1024MB 미만");
				
				fData = fData / 1024;
				data = NumberUtil.format(fData, "###,###,###,##0");
				
				//System.out.println("===================== 계산 후 data" + data);
				sb.append("<strong>" + data + "</strong>");
				sb.append("MB");
				
				// 1GB (1024MB) ~ 1,023GB (1024*1024*1024)
				// 숫자 표시를 GB
				// 표시하는 마지막 소수점이 0이면 표시 안함
			} else if ((1024 * 1024 <= fData) && (fData < (1024 * 1024 * 1024))) {
				
				//System.out.println(" 1024GB 미만");
				
				fData = fData / 1024 / 1024;
				//System.out.println(" 1024 gb 미만일 때 GB 로 표시하면: " + fData);
				
				// 1,000 이상은 소수점 표시 안함
				if (fData >= 1000) {
					
					data = NumberUtil.format(fData, "###,###,###,###");
					//System.out.println("===================== fData >= 1000 계산 후 data" + data);
					
					// 100 이상은 소수점 한자리 (두자리 버림)
				} else if ((100 <= fData) && (fData < 1000)) {
					
					data = NumberUtil.format(fData, "###.#");
					//System.out.println("===================== 100 이상은 소수점 한자리  data" + data);
					
					// 1~99 소수점 두자리 표시 (세자리 버림)
				} else if ((1 <= fData) && (fData < 100)) {
					
					data = NumberUtil.format(fData, "##.##");
					//System.out.println("===================== 1~99 소수점 두자리  data" + data);
					
				}
				
				sb.append("<strong>" + data + "</strong>");
				sb.append("GB");
				
			}
		}
		
		return sb.toString();
	}
	
	/**
	 * 그래프의 사용량,잔여량을 표기 (단위가 '분'일 경우 표현)
	 * 
	 * @param hm
	 *            '시간','분','초' 값
	 * @param type
	 *            사용량(1), 잔여량(2)
	 * @return String
	 */
	public static StringBuffer makeDataStringByMinUnit(Map hm, String type) {
		
		StringBuffer sb = new StringBuffer();
		
		if(hm == null){
			return sb;
		}
		if(hm.get("hour") == null || hm.get("minute") == null || hm.get("second") == null){
			return sb;
		}
		
		////System.out.println("makeDataStringByMinUnit" + (String) hm.get("hour") + (String) hm.get("minute") + (String) hm.get("second") + "type=" + type);

		//System.out.println(hm.get("hour"));
		//System.out.println(hm.get("minute"));
		//System.out.println(hm.get("second"));
		
		String hour = hm.get("hour").toString();
		String minute = hm.get("minute").toString();
		String second = hm.get("second").toString();

		if(hour.equals("0.0")) hour = "0";
		if(minute.equals("0.0")) minute = "0";
		if(second.equals("0.0")) second = "0";
		
		int iHour = Integer.parseInt(hour);
		int iMinute = Integer.parseInt(minute);
		int iSecond = Integer.parseInt(second);
		
		hour = NumberUtil.format(iHour, "#,##0");
		minute = NumberUtil.format(iMinute, "#0");
		second = NumberUtil.format(iSecond, "#0");
		
		// 00시간00분00초->0
		if ("0".equals(hour) && "0".equals(minute) && "0".equals(second)) {
			if (type.equals("2")) {
				sb.append("<em class='volume'>0</em>");
			} else {
				sb.append("0");
			}
			sb.append("초");
			return sb;
		}
		
		if (!"0".equals(hour)) {
			
			hour = changeTime(hour);
			if (type.equals("2")) {
				sb.append("<em class='volume'>" + hour + "</em>");
			} else {
				sb.append(hour);
			}
			sb.append("시간");
		}
		if (!"0".equals(minute)) {
			
			minute = changeTime(minute);
			if (type.equals("2")) {
				sb.append("<em class='volume'>" + minute + "</em>");
			} else {
				sb.append(minute);
			}
			sb.append("분");
		}
		if ((!"0".equals(second)) && "0".equals(minute) && "0".equals(hour)) { // 초 표기
			
			second = changeTime(second);
			if (type.equals("2")) {
				sb.append("<em class='volume'>" + second + "</em>");
			} else {
				sb.append(second);
			}
			sb.append("초");
		}
		return sb;
	}
 	
 	
 	/**
 	 * 그래프의 사용량,잔여량을 표기 
 	 * @param data 원본데이타
 	 * @param hm '시간','분','초' 값
 	 * @param unitCode 단위
 	 * @param type 사용량(1), 잔여량(2)
 	 * @return String
 	 */	
 	 public static String makeDataStringMb(String data, String type ){
 	    
 	     StringBuffer sb = new StringBuffer();
 	         
		data = StringUtils.replace(data, ",", "");
		float fData = Float.parseFloat(data);
		//System.out.println ("===================== Float.parseFloat(data====" + fData);
            
             
		// 1KB ~ 1MB 미만
		if(fData < 1024){
                 
			//System.out.println (" 1MB 미만");
                 
			data = NumberUtil.format(fData, "###,###,###,##0");
			if(type.equals("2")){
				sb.append("<em class='volume'>"+data+"</em>"); 
			}else{
				sb.append(data);
			}
			sb.append("KB");
    	         
		}else{
			fData = fData /1024;
			data = NumberUtil.format(fData, "###,###,###,##0");
                 
			//System.out.println ("===================== 계산 후 data" + data);
			if(type.equals("2")){
				sb.append("<em class='volume'>"+data+"</em>"); 
			}else{
				sb.append(data);
			}
			sb.append("MB");
        }	         
	         
 	     
 	     //System.out.println ("최종 표시" + sb.toString());
 	     return sb.toString();
 	 } 
	
	// 시간 앞에 '0' 은 표시 안함
	// 09시간 -> 9시간, 05분 -> 5분
	public static String changeTime(String time) {
		
		for (int i = 0; i < time.length(); i++) {
			
			//System.out.println(" before time ===" + time.substring(0, 1));
			if (time.substring(0) != null && "0".equals(time.substring(0, 1))) {
				time = time.substring(1, time.length());
				//System.out.println("after hour ===" + time);
			}
		}
		return time;
	}
	
}
