package com.ione.landing.api.controller;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ione.landing.api.service.LunchService;
import com.ione.landing.cmm.vo.BoardCommentVO;
import com.ione.landing.cmm.vo.BoardVO;
import com.ione.landing.cmm.web.Paging;


@RestController
public class LunchController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(LunchController.class);
	
	@Resource(name = "lunchService")
	private LunchService service;

	//게시판 조회
	@RequestMapping("/selectBoard")//@ModelAttribute FarmVO vo,
	public Map<String, Object> selectBoard(@ModelAttribute BoardVO vo,
			@RequestParam HashMap<String, Object> param) throws Exception {
		Map<String, Object> resMap = new HashMap<String, Object>();
		
		Paging paging = new Paging();

		try {
			paging.setPageIndex(vo.getPageIndex());
			paging.setRecordCountPerPage(vo.getPageUnit());
			paging.setPageSize(vo.getPageSize());

			paging.queryPaging(vo.getPageIndex(), vo.getPageUnit());

			vo.setFirstIndex(paging.getFirstRecordIndex());
			vo.setLastIndex(paging.getLastRecordIndex());
			vo.setRecordCountPerPage(paging.getRecordCountPerPage());
			
			List list = service.selectBoard(vo);
			
			int totCnt = 0;
			if (list.size() > 0) {
				BigDecimal dcm = (BigDecimal)(((Map<String, Object>)list.get(0)).get("totRowcount"));
				totCnt = dcm.intValue();
			}

			paging.setTotalRecordCount(totCnt);
			paging.makePaging(vo.getPageIndex(), vo.getPageSize(), vo.getPageUnit(), totCnt);

			resMap.put("result", list);
			resMap.put("paging", paging);
			resMap.put("msg", "Y");
		} catch (Exception e) {
			resMap.put("msg", "E");
			LOGGER.debug("selectBoard error :" + e);
		}
		return resMap;
	}
	
	//댓글조회
	@RequestMapping("/selectBoardComment")
	public Map<String, Object> selectBoardComment(@ModelAttribute BoardCommentVO vo,
			@RequestParam HashMap<String, Object> param) throws Exception {
		Map<String, Object> resMap = new HashMap<String, Object>();

		Paging paging = new Paging();

		try {
			paging.setPageIndex(vo.getPageIndex());
			paging.setRecordCountPerPage(vo.getPageUnit());
			paging.setPageSize(vo.getPageSize());

			paging.queryPaging(vo.getPageIndex(), vo.getPageUnit());

			vo.setFirstIndex(paging.getFirstRecordIndex());
			vo.setLastIndex(paging.getLastRecordIndex());
			vo.setRecordCountPerPage(paging.getRecordCountPerPage());
			
			List list = service.selectBoardComment(vo);
			
			int totCnt = 0;
			if (list.size() > 0) {
				BigDecimal dcm = (BigDecimal)(((Map<String, Object>)list.get(0)).get("totRowcount"));
				totCnt = dcm.intValue();
			}

			paging.setTotalRecordCount(totCnt);
			paging.makePaging(vo.getPageIndex(), vo.getPageSize(), vo.getPageUnit(), totCnt);

			resMap.put("result", list);
			resMap.put("paging", paging);
			resMap.put("total", totCnt);
			resMap.put("msg", "Y");
		} catch (Exception e) {
			resMap.put("msg", "E");
			LOGGER.debug("insertBoardComment error :" + e);
		}
		return resMap;
	}
	
	//게시판 등록
	@RequestMapping("/insertBoard")
	public Map<String, Object> insertBoard(
			@RequestParam HashMap<String, Object> param) throws Exception {
		Map<String, Object> resMap = new HashMap<String, Object>();

		try {
			resMap.put("msg", "Y");
		} catch (Exception e) {
			resMap.put("msg", "E");
			LOGGER.debug("insertBoard error :" + e);
		}
		return resMap;
	}
	
	//댓글등록
	@RequestMapping("/insertBoardComment")
	public Map<String, Object> insertBoardComment(
			@RequestParam HashMap<String, Object> param) throws Exception {
		Map<String, Object> resMap = new HashMap<String, Object>();

		try {
			int result = service.insertBoardComment(param);
			if(result > 0) {				
				resMap.put("msg", "Y");
			} else {
				resMap.put("msg", "N");
			}
		} catch (Exception e) {
			resMap.put("msg", "E");
			LOGGER.debug("insertBoardComment error :" + e);
		}
		return resMap;
	}
	
	//식당 상태변경
	@RequestMapping("/updateBoardState")
	public Map<String, Object> updateBoardState(
			@RequestParam HashMap<String, Object> param) throws Exception {
		Map<String, Object> resMap = new HashMap<String, Object>();

		try {
			int result = service.updateBoardState(param);
			if(result > 0) {				
				resMap.put("msg", "Y");
			} else {
				resMap.put("msg", "N");
			}
		} catch (Exception e) {
			resMap.put("msg", "E");
			LOGGER.debug("updateBoardState error :" + e);
		}
		return resMap;
	}
	
	//좋아요 업데이트
	@RequestMapping("/updateBoardCommentLike")
	public Map<String, Object> updateBoardCommentLike(
			@RequestParam HashMap<String, Object> param) throws Exception {
		Map<String, Object> resMap = new HashMap<String, Object>();
		int result = 0;
		try {
			if(param.get("likeAt").equals("N")) {
				result = service.updateBoardCommentLikeUp(param);
			} else if(param.get("likeAt").equals("Y")) {
				result = service.updateBoardCommentLikeDown(param);
			}
			if(result > 0) {				
				resMap.put("msg", "Y");
			} else {
				resMap.put("msg", "N");
			}
		} catch (Exception e) {
			resMap.put("msg", "E");
			e.printStackTrace();
			LOGGER.debug("updateBoardCommentLike error :" + e);
		}
		return resMap;
	}
}
