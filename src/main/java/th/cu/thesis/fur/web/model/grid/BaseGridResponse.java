package th.cu.thesis.fur.web.model.grid;

import java.util.List;
import java.util.Map;

public class BaseGridResponse {
	private int total;
	private int page;
	private int records;
	private List<Map<String,Object>> rows;
	public BaseGridResponse(){
		
	}
	public BaseGridResponse(int total, int page, int records,
			List<Map<String, Object>> rows) {
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
	public List<Map<String, Object>> getRows() {
		return rows;
	}
	public void setRows(List<Map<String, Object>> rows) {
		this.rows = rows;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("BaseGridResponse [total=");
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
