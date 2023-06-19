package com.ione.landing.cmm.util;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.Reader;
import java.lang.reflect.Method;
import java.net.URLEncoder;
import java.sql.Clob;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;



public class UsrUtil {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UsrUtil.class);
	
	//clob�� string���� ��ȯ
	public static String clob2Str(Clob clob){
		String result = "";
		try {
			if(clob != null){
				Reader reader = clob.getCharacterStream();
				StringBuffer out = new StringBuffer();  
				char[] buff = new char[1024];  
				int nchars = 0;  

				while ((nchars = reader.read(buff)) > 0) {  
				    out.append(buff, 0, nchars);  
				}
				
				result = out.toString();
			}
		} catch (SQLException e) {
			System.out.println("?���??��?���?");
		} catch (IOException e) {
			System.out.println("?��?�� IO ?���?");
		}
		
		return result;
	}
	
	// null�� �������� ��ȯ
	public static String null2Str(String str){
		return str == null ? "" : str;
	}
	// null�� �������� ��ȯ
	public static String null2Str(Object str){
		return str == null ? "" : (String)str;
	}
	
	/**
	 * singleSpaceReturn
	 * String util
	 * @param text
	 * 
	 */
	public static String singleSpaceReturn(String text) { 
	    char[] toCharArray = text.toCharArray(); 
	    int index = 1; 
	    int cntChar = toCharArray.length;
	    
	    for (int i = 1; i < cntChar; i++) { 
	    	
	    	//toCharArray[index] = toCharArray[i]; 
	        System.arraycopy(toCharArray, i, toCharArray, index, 1);
	        
	        if (toCharArray[index] != ' ') { 
	            index++; 
	        } else if (toCharArray[index - 1] != ' ') { 
	            index++; 
	        } 
	    } 
	    
	    return new String(toCharArray, 0, index).trim(); 
	} 
	
	public static String getNowData(String format){//"yyyyMMddHHmmss"
		SimpleDateFormat formatter = new SimpleDateFormat ( format, Locale.KOREA );
		Date currentTime = new Date();
		return formatter.format ( currentTime );
	}
	
	public static String getNowData(){
		return getNowData("yyyyMMddHHmmss");
	}
	
	public static String filePathBlackList(String value) {
		String returnValue = value;
		if (returnValue == null || returnValue.trim().equals("")) {
			return "";
		}

		returnValue = returnValue.replaceAll("\\.\\./", ""); // ../
		returnValue = returnValue.replaceAll("\\.\\.\\\\", ""); // ..\

		return returnValue;
	}
	
	public static String getBrowser(HttpServletRequest request) {
		String header = request.getHeader("User-Agent");
		if (header.indexOf("MSIE") > -1) {
			return "MSIE";
		} else if (header.indexOf("Chrome") > -1) {
			return "Chrome";
		} else if (header.indexOf("Opera") > -1) {
			return "Opera";
		} else if (header.indexOf("Trident/7.0") > -1) {
			// IE 11 �̻� //IE ���� �� üũ >> Trident/6.0(IE 10) , Trident/5.0(IE 9) ,
			// Trident/4.0(IE 8)
			return "MSIE";
		}
		return "Firefox";
	}
	
	public static String getDisposition(String filename, String browser)
			throws Exception {
		
		String encodedFilename = null;
		if (browser.equals("MSIE")) {
			encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll(
					"\\+", "%20");
		} else if (browser.equals("Firefox")) {
			encodedFilename = "\""
					+ new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
		} else if (browser.equals("Opera")) {
			encodedFilename = "\""
					+ new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
		} else if (browser.equals("Chrome")) {
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < filename.length(); i++) {
				char c = filename.charAt(i);
				if (c > '~') {
					sb.append(URLEncoder.encode("" + c, "UTF-8"));
				} else {
					sb.append(c);
				}
			}
			encodedFilename = sb.toString();
		} else {
			throw new RuntimeException("Not supported browser");
		}
		return encodedFilename;
	}
	
	public static Object convertMapToObject(Map<String,Object> map,Object obj){
	    String keyAttribute = null;
	    String setMethodString = "set";
	    String methodString = null;
	    Iterator itr = map.keySet().iterator();

	    while(itr.hasNext()){
	        keyAttribute = (String) itr.next();
	        methodString = setMethodString+keyAttribute.substring(0,1).toUpperCase()+keyAttribute.substring(1);
	        Method[] methods = obj.getClass().getDeclaredMethods();
	        for(int i=0;i<methods.length;i++){
	            if(methodString.equals(methods[i].getName())){
	                try{
	                    methods[i].invoke(obj, map.get(keyAttribute));
	                }catch(Exception e){
	                    e.printStackTrace();
	                }
	            }
	        }
	    }
	    return obj;
	}
	
	//메일 인증번호 생성
	public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 6; i++) { // �����ڵ� 6�ڸ�
            key.append((rnd.nextInt(10)));
        }
        return key.toString();
    }
	
	public static String getUserIp() throws Exception {
		
        String ip = null;
        HttpServletRequest request = 
        ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();

        ip = request.getHeader("X-Forwarded-For");
        
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("Proxy-Client-IP"); 
        } 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("WL-Proxy-Client-IP"); 
        } 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("HTTP_CLIENT_IP"); 
        } 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("HTTP_X_FORWARDED_FOR"); 
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("X-Real-IP"); 
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("X-RealIP"); 
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("REMOTE_ADDR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getRemoteAddr(); 
        }
		
		return ip;
	}
	
	public static String getClientOS(String userAgent) {            
	      String os = "";            
	      try {
	    	   if(userAgent == null) {
		   	    	return os;
		   	    }
	    	  userAgent = userAgent.toLowerCase();
	    	  if (userAgent.indexOf("windows nt 10.0") > -1) {
	    		  os = "Windows10";
	    	  }else if (userAgent.indexOf("windows nt 6.1") > -1) {
	    		  os = "Windows7";
	    	  }else if (userAgent.indexOf("windows nt 6.2") > -1 || userAgent.indexOf("windows nt 6.3") > -1 ) {
	    		  os = "Windows8";
	    	  }else if (userAgent.indexOf("windows nt 6.0") > -1) {
	    		  os = "WindowsVista";
	    	  }else if (userAgent.indexOf("windows nt 5.1") > -1) {
	    		  os = "WindowsXP";
	    	  }else if (userAgent.indexOf("windows nt 5.0") > -1) {
	    		  os = "Windows2000";
	    	  }else if (userAgent.indexOf("windows nt 4.0") > -1) {
	    		  os = "WindowsNT";
	    	  }else if (userAgent.indexOf("windows 98") > -1) {
	    		  os = "Windows98";
	    	  }else if (userAgent.indexOf("windows 95") > -1) {
	    		  os = "Windows95";
	    	  }else if (userAgent.indexOf("iphone") > -1) {
	    		  os = "iPhone";
	    	  }else if (userAgent.indexOf("ipad") > -1) {
	    		  os = "iPad";
	    	  }else if (userAgent.indexOf("android") > -1) {
	    		  os = "android";
	    	  }else if (userAgent.indexOf("mac") > -1) {
	    		  os = "mac";
	    	  }else if (userAgent.indexOf("linux") > -1) {
	    		  os = "Linux";
	    	  }else{
	    		  os = "Other";
	    	  }            
		} catch (Exception e) {
			LOGGER.error("getClientOS error :" + e);
		}
	    return os;
	}
	
	public static String getClientBrowser(String userAgent) {
	    String browser = "";
	    
	    if(userAgent == null) {
	    	return browser;
	    }
	    
        if (userAgent.indexOf("Trident/7.0") > -1) { 
	        browser = "ie11";
	    }
	      else if (userAgent.indexOf("MSIE 10") > -1) {
	        browser = "ie10";
	    }
	    else if (userAgent.indexOf("MSIE 9") > -1) {
	        browser = "ie9";
	    }
	    else if (userAgent.indexOf("MSIE 8") > -1) {
	        browser = "ie8";
	    }
	    else if (userAgent.indexOf("Chrome/") > -1) {
	        browser = "Chrome";
	    }
	    else if (userAgent.indexOf("Chrome/") == -1 && userAgent.indexOf("Safari/") >= -1) {
	        browser = "Safari";
	    }
	    else if (userAgent.indexOf("Firefox/") >= -1) {
	        browser = "Firefox";
	    }
	    else {
	        browser ="Other";
	    }
	      return browser;
	}

	
	//전화번호 +82 시작할 경우 치환
	public static String setPhoneNo(String phone) {
		if(phone == null || phone.equals("")) {
			return "";
		}
		if(phone.substring(0, 4).equals("+82 ")) {
			phone = phone.replaceAll("\\+82 ", "0");
		} 
		phone = phone.replaceAll("-", "");
		return phone;
	}

}
