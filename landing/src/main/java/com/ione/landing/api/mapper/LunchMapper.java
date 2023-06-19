package com.ione.landing.api.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ione.landing.cmm.vo.BoardCommentVO;
import com.ione.landing.cmm.vo.BoardVO;

@Mapper
public interface LunchMapper {
	public List selectBoard(BoardVO vo) throws Exception;
	
	public List selectBoardComment(BoardCommentVO vo) throws Exception;
	
	public int insertBoardComment(HashMap<String, Object> map) throws Exception;
	
	public int updateBoardState(HashMap<String, Object> map) throws Exception;
	
	public int updateBoardCommentLikeUp(HashMap<String, Object> map) throws Exception;
	
	public int updateBoardCommentLikeDown(HashMap<String, Object> map) throws Exception;
}
