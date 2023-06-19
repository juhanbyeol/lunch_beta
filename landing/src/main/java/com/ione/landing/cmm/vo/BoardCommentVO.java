package com.ione.landing.cmm.vo;

public class BoardCommentVO extends PagingVO{
	private static final long serialVersionUID = 1L;

	private int commentSn;
	private String ncnm;
	private String cn;
	private String registDt;
	private String updateDt;
	private String deleteDt;
	private String deleteAt;
	private int likeCnt;
	
	public int getCommentSn() {
		return commentSn;
	}
	public void setCommentSn(int commentSn) {
		this.commentSn = commentSn;
	}
	public String getNcnm() {
		return ncnm;
	}
	public void setNcnm(String ncnm) {
		this.ncnm = ncnm;
	}
	public String getCn() {
		return cn;
	}
	public void setCn(String cn) {
		this.cn = cn;
	}
	public String getRegistDt() {
		return registDt;
	}
	public void setRegistDt(String registDt) {
		this.registDt = registDt;
	}
	public String getUpdateDt() {
		return updateDt;
	}
	public void setUpdateDt(String updateDt) {
		this.updateDt = updateDt;
	}
	public String getDeleteDt() {
		return deleteDt;
	}
	public void setDeleteDt(String deleteDt) {
		this.deleteDt = deleteDt;
	}
	public String getDeleteAt() {
		return deleteAt;
	}
	public void setDeleteAt(String deleteAt) {
		this.deleteAt = deleteAt;
	}
	public int getLikeCnt() {
		return likeCnt;
	}
	public void setLikeCnt(int likeCnt) {
		this.likeCnt = likeCnt;
	}
	
	
}
