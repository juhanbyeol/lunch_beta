package com.ione.landing.cmm.web;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.awt.image.PixelGrabber;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.Clob;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.mail.Address;
import javax.mail.SendFailedException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.swing.ImageIcon;
import javax.websocket.server.PathParam;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ione.landing.cmm.service.CmmService;
import com.ione.landing.cmm.util.MailHandler;
import com.ione.landing.cmm.util.UsrUtil;


@RestController
public class CmmController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CmmController.class);
	
	@Autowired
	private JavaMailSender javamailSender;
	
	@Resource(name = "cmmService")
	private CmmService cmmService;
	
	@RequestMapping("/except/connect")
    public String connect(HttpServletRequest request)throws Exception{
		return "Y";
	}
	
	//호미 홈페이지 컨텐츠 로그 저장(Hobiti 등등)
	//파라미터 cnType : 컨텐츠 종류(HOBITI 등), cnText : "ISTP" 
	@RequestMapping("/cmm/insertContensLog/{cnType}/{cnText}")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public Map<String, Object> insertContensLog(@PathVariable("cnType") String cnType, @PathVariable("cnText") String cnText, HttpServletRequest req) throws Exception{
		Map<String, Object> resMap = new HashMap<String, Object>();
		try {
			HashMap<String, Object> param = new HashMap<String, Object>();
			param.put("cnReqIp", UsrUtil.getUserIp());
			param.put("cnReqBrwsr", UsrUtil.getBrowser(req));
			param.put("cnType", cnType);
			param.put("cnText", cnText);
			int result = cmmService.insertContensLog(param);
			if(result > 0) {				
				resMap.put("msg", "Y");
			}
		} catch (Exception e) {
			LOGGER.info("insertContensLog exception :" + e);
			resMap.put("msg", "N");
		}
		return resMap;
	}
	
	//호미 서비스 문의하기
	@RequestMapping("/cmm/inqryMail") 
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public @ResponseBody Map<String, Object> inqryMail(HttpServletRequest req, HttpServletResponse res,
			@RequestParam HashMap<String, Object> param) throws Exception {
		Map<String, Object> retMap = new HashMap<>();
		try {
			String memberMail = param.get("email") + "";
			MailHandler m = new MailHandler(javamailSender);
			m.setFrom(memberMail, memberMail);
			m.setTo("hoe.developer@gmail.com");
			m.setSubject(param.get("sj")+"");
			String msg = "";
//				msg += "제목 : " + param.get("sj") + "\n";
			msg += "전화번호 : " + param.get("telno") + "<br>";
			msg += "내용 : " + param.get("cn");
			m.setText(msg);
			boolean result = m.send();
			if(result) {
				param.put("inqryReqIp", UsrUtil.getUserIp());
				param.put("inqryReqBrwsr", UsrUtil.getBrowser(req));
				int result2 = cmmService.insertInqryEmail(param);
				if(result2 > 0) {				
					retMap.put("result","Y");
				}else {					
					retMap.put("result","P");
				}
			}else {
				retMap.put("result","N");
			}
		} catch (Exception e) {
			e.printStackTrace();
			retMap.put("msg", "메일발송오류");
			retMap.put("result", "N");
		}

		return retMap;
	}
	
	//호비티아이 백분율 조회
	@RequestMapping("/cmm/selectHobitiPercentage")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public Map<String, Object> selectHobitiPercentage(@RequestParam HashMap<String,Object> param, HttpServletRequest req) throws Exception{
		Map<String, Object> resMap = new HashMap<String, Object>();
		
		try {				
			resMap.put("data", cmmService.selectHobitiPercentage());
			resMap.put("msg", "Y");
		} catch (Exception e) {
			LOGGER.info("selectHobitiPercentage exception :" + e);
			resMap.put("msg", "N");
		}
		return resMap;
	}
	
}
