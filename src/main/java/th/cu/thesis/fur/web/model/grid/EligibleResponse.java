package th.cu.thesis.fur.web.model.grid;

import java.io.Serializable;
import java.util.List;

import th.cu.thesis.fur.web.model.EligibleOrgAppRoleApp;

public class EligibleResponse implements Serializable{


	
	/**
	 * 
	 */
	private static final long serialVersionUID = 6309406061530130174L;
	private int total;
	private int page;
	private int records;
	
	private List<EligibleOrgAppRoleApp> rows;

	public EligibleResponse() {}
	


	public EligibleResponse(int total, int page, int records,
			List<EligibleOrgAppRoleApp> rows) {
		super();
		this.total = total;
		this.page = page;
		this.records = records;
		this.rows = rows;
	}
	



	public int getTotal() {
		return total;
	}



	public void setTotal(int total) {
		this.total = total;
	}



	public int getPage() {
		return page;
	}



	public void setPage(int page) {
		this.page = page;
	}



	public int getRecords() {
		return records;
	}



	public void setRecords(int records) {
		this.records = records;
	}



	public List<EligibleOrgAppRoleApp> getRows() {
		return rows;
	}



	public void setRows(List<EligibleOrgAppRoleApp> rows) {
		this.rows = rows;
	}



	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("EligibleResponse [total=");
		builder.append(total);
		builder.append(", page=");
		builder.append(page);
		builder.append(", records=");
		builder.append(records);
		builder.append(", rows=");
		builder.append(rows);
		builder.append("]");
		return builder.toString();
	}


	
	
	

}
