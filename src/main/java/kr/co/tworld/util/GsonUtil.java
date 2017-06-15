package kr.co.tworld.util;

import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;

public class GsonUtil {

	@SuppressWarnings("unchecked")
	public HashMap<String,Object> stringToJson(String json){
		
		Gson gson = new Gson(); 
		
		HashMap<String,Object> map = new HashMap<String,Object>();
		
		map = (HashMap<String,Object>) gson.fromJson(json, map.getClass());
		
		return map;
	}
	
}
