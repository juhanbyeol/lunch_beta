package com.ione.landing.api.service;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ione.landing.api.mapper.LunchMapper;
import com.ione.landing.cmm.vo.BoardCommentVO;
import com.ione.landing.cmm.vo.BoardVO;

@Service("lunchService")
public class LunchServiceImpl implements LunchService{
	
	@Resource(name="lunchMapper")
	private LunchMapper mapper;

	@Override
	public List selectBoard(BoardVO vo) throws Exception {
		return mapper.selectBoard(vo);
	}

	@Override
	public List selectBoardComment(BoardCommentVO vo) throws Exception {
		return mapper.selectBoardComment(vo);
	}
	
	@Override
	public int insertBoardComment(HashMap<String, Object> map) throws Exception {
		return mapper.insertBoardComment(map);
	}
	
	@Override
	public int updateBoardState(HashMap<String, Object> map) throws Exception {
		return mapper.updateBoardState(map);
	}
	
	@Override
	public int updateBoardCommentLikeUp(HashMap<String, Object> map) throws Exception {
		return mapper.updateBoardCommentLikeUp(map);
	}
	
	@Override
	public int updateBoardCommentLikeDown(HashMap<String, Object> map) throws Exception {
		return mapper.updateBoardCommentLikeDown(map);
	}
}
