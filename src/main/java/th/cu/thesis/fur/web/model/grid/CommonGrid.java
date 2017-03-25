package th.cu.thesis.fur.web.model.grid;

public class CommonGrid {

	public static final String SORT_ASC = "ASC";
	public static final String SORT_DESC = "DESC";

	private Integer rows;
	private Integer page;
	private String sidx;
	private String sord;
	
	public CommonGrid() {
		this.rows = 20;
		this.page = 1;
		this.sidx = "";
		this.sord = SORT_ASC;
	}

	public Integer getRows() {
		return rows;
	}

	public void setRows(Integer rows) {
		this.rows = rows;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public String getSidx() {
		return sidx;
	}

	public void setSidx(String sidx) {
		this.sidx = sidx;
	}

	public String getSord() {
		return sord;
	}

	public void setSord(String sord) {
		this.sord = sord;
	}

}
