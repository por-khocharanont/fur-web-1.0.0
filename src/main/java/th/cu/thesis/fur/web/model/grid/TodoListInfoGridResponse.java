package th.cu.thesis.fur.web.model.grid;

import java.util.List;

import th.cu.thesis.fur.web.model.UserRequestInfo;

public class TodoListInfoGridResponse {
	private int total;
	private int page;
	private int records;
	private List<UserRequestInfo> rows;

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

	public List<UserRequestInfo> getRows() {
		return rows;
	}

	public void setRows(List<UserRequestInfo> rows) {
		this.rows = rows;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("TodoListInfoGridResponse [total=");
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
