package com.ione.landing.cmm.web;

public class Paging {
	
	int pageIndex;
	int pageSize;
	int firstRecordIndex;
	int lastRecordIndex;
	int recordCountPerPage;
	int totalRecordCount;
	int infin;
	int totalPageCount;
	int resultPage;
	int firstPageNoOnPageList;
	int lastPageNoOnPageList;
	
	
	public int getFirstPageNoOnPageList() {
		return firstPageNoOnPageList;
	}

	public void setFirstPageNoOnPageList(int firstPageNoOnPageList) {
		this.firstPageNoOnPageList = firstPageNoOnPageList;
	}

	public int getLastPageNoOnPageList() {
		return lastPageNoOnPageList;
	}

	public void setLastPageNoOnPageList(int lastPageNoOnPageList) {
		this.lastPageNoOnPageList = lastPageNoOnPageList;
	}

	public int getResultPage() {
		return resultPage;
	}

	public void setResultPage(int resultPage) {
		this.resultPage = resultPage;
	}

	public int getTotalPageCount() {
		return totalPageCount;
	}

	public void setTotalPageCount(int totalPageCount) {
		this.totalPageCount = totalPageCount;
	}

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getRecordCountPerPage() {
		return recordCountPerPage;
	}

	public void setRecordCountPerPage(int recordCountPerPage) {
		this.recordCountPerPage = recordCountPerPage;
	}

	public int getTotalRecordCount() {
		return totalRecordCount;
	}

	public void setTotalRecordCount(int totalRecordCount) {
		this.totalRecordCount = totalRecordCount;
	}
	
	public int getFirstRecordIndex() {
		return firstRecordIndex;
	}

	public void setFirstRecordIndex(int firstRecordIndex) {
		this.firstRecordIndex = firstRecordIndex;
	}

	public int getLastRecordIndex() {
		return lastRecordIndex;
	}

	public void setLastRecordIndex(int lastRecordIndex) {
		this.lastRecordIndex = lastRecordIndex;
	}
	
	public int getInfin() {
		return infin;
	}

	public void setInfin(int infin) {
		this.infin = infin;
	}

	/* 전체 리스트 */
	public void makePaging(int pageIndex, int pageSize, int recordCountPerPage, int totalRecordCount) {
		// pageIndex = 	현재 페이지 번호
		// pageSize = 페이지 리스트에 게시되는 페이지 건수
		// recordCountPerPage = 한 페이지당 게시되는 게시물 건 수
		// totalRecordCount = 전체 게시물 건 수
		
		Boolean next;
		
		
		
		// 전체 페이지 개수 계산
		int totalPageCount = ((totalRecordCount-1)/recordCountPerPage) + 1;
		setTotalPageCount(totalPageCount);
		
		// 페이지 리스트의 첫 페이지 번호 계산
		int firstPageNoOnPageList = ((pageIndex-1)/pageSize)*pageSize + 1;
		
		// 페이지 리스트의 마지막 페이지 번호 계산
		int lastPageNoOnPageList = firstPageNoOnPageList+pageSize-1;
		setFirstPageNoOnPageList(firstPageNoOnPageList);

		if(lastPageNoOnPageList>totalPageCount)
		{
			lastPageNoOnPageList=totalPageCount;
			next = false;
		}else {
			next = true;
		}
		
		setLastPageNoOnPageList(lastPageNoOnPageList);
		
		
		int infin = (pageIndex - 1) * recordCountPerPage + 10;
		setInfin(infin);
		
		// 마지막 페이지 계산
		int resultPage = (totalRecordCount / recordCountPerPage)+1;
		setResultPage(resultPage);
	}
	
	public void queryPaging(int pageIndex, int recordCountPerPage) {
		
		// 페이징 SQL의 조건절에 사용되는 시작 rownum
		int firstRecordIndex = (pageIndex - 1) * recordCountPerPage;
		// 음수인지 체크
		if(firstRecordIndex < 0) firstRecordIndex = 0;
		
		setFirstRecordIndex(firstRecordIndex);
		
		// 페이징 SQL의 조건절에 사용되는 마지막 rownum
		int lastRecordIndex = pageIndex * recordCountPerPage;
		setLastRecordIndex(lastRecordIndex);
	}
	
}