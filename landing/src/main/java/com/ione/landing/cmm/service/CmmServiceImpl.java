package com.ione.landing.cmm.service;

import java.util.HashMap;
import java.util.List;
import javax.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ione.landing.cmm.mapper.CmmMapper;

@Service("cmmService")
public class CmmServiceImpl implements CmmService{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CmmServiceImpl.class);
	
	@Resource(name = "cmmMapper")
	private CmmMapper cmmMapper;
	//호미 홈페이지 컨텐츠 로그 저장
	@Override
	public int insertContensLog(HashMap<String, Object> map) throws Exception {
		return cmmMapper.insertContensLog(map);
	}
	
	//호미 홈페이지 이메일 문의 기록 삽입
	@Override
	public int insertInqryEmail(HashMap<String, Object> map) throws Exception {
		return cmmMapper.insertInqryEmail(map);
	}
	
	//호비티아이 백분율 조회
	@Override
	public List selectHobitiPercentage() throws Exception {
		return cmmMapper.selectHobitiPercentage();
	}
}
