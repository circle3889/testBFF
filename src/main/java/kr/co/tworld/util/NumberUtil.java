package kr.co.tworld.util;

import java.text.DecimalFormat;
import java.text.NumberFormat;

public class NumberUtil {

	private NumberUtil() {
		
	}
	
	public static String format(int i) {
		return format( new Integer(i) );
	}
	
	public static String format(int i, String pattern) {
		return format( new Integer(i), pattern );
	}
	
	public static String format(long l) {
		return format( new Long(l) );
	}
	
	public static String format(long l, String pattern) {
		return format( new Long(l), pattern );
	}
	
	public static String format(float f) {
		return format( new Float(f) );
	}
	
	public static String format(float f, String pattern) {
		return format( new Float(f), pattern );
	}
	
	public static String format(double d) {
		return format( new Double(d) );
	}
	
	public static String format(double d, String pattern) {
		return format( new Double(d), pattern );
	}
	
	public static String format(Number number) {
		return format(number, null);
	}
	
	public static String format(Number number, String pattern) {
		NumberFormat nf = getNumberFormat(pattern);
		return nf.format( number );
	}
	private static NumberFormat getNumberFormat(String pattern) {
		DecimalFormat df = new DecimalFormat();
		df.applyPattern(pattern);
		return df;
	}

}
