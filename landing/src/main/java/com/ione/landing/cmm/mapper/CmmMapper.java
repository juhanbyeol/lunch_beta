package com.ione.landing.cmm.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
@Mapper
public interface CmmMapper {
	//호미 홈페이지 컨텐츠 로그 저장
	public int insertContensLog(HashMap<String, Object> map) throws Exception;
	
	//호미 홈페이지 이메일 문의 기록 삽입
	public int insertInqryEmail(HashMap<String, Object> map) throws Exception;
	
	//호비티아이 백분율 조회
	public List selectHobitiPercentage() throws Exception;
}
