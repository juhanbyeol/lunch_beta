package com.ione.landing.cmm.vo;


public class BoardVO extends PagingVO{
	private static final long serialVersionUID = 1L;

	private int boardSn;
	private String title;
	private String cn;
	private String food1;
	private String food2;
	private String food3;
	private String food4;
	private String food5;
	private String food6;
	private String etc;
	private String registDt;
	private String updateDt;
	private String deleteDt;
	private String deleteAt;
	private String foodState;
	private String foodStateNm;
	public int getBoardSn() {
		return boardSn;
	}
	public void setBoardSn(int boardSn) {
		this.boardSn = boardSn;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getCn() {
		return cn;
	}
	public void setCn(String cn) {
		this.cn = cn;
	}
	public String getFood1() {
		return food1;
	}
	public void setFood1(String food1) {
		this.food1 = food1;
	}
	public String getFood2() {
		return food2;
	}
	public void setFood2(String food2) {
		this.food2 = food2;
	}
	public String getFood3() {
		return food3;
	}
	public void setFood3(String food3) {
		this.food3 = food3;
	}
	public String getFood4() {
		return food4;
	}
	public void setFood4(String food4) {
		this.food4 = food4;
	}
	public String getFood5() {
		return food5;
	}
	public void setFood5(String food5) {
		this.food5 = food5;
	}
	public String getFood6() {
		return food6;
	}
	public void setFood6(String food6) {
		this.food6 = food6;
	}
	public String getEtc() {
		return etc;
	}
	public void setEtc(String etc) {
		this.etc = etc;
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
	public String getFoodState() {
		return foodState;
	}
	public void setFoodState(String foodState) {
		this.foodState = foodState;
	}
	public String getFoodStateNm() {
		return foodStateNm;
	}
	public void setFoodStateNm(String foodStateNm) {
		this.foodStateNm = foodStateNm;
	}
	
	
}
