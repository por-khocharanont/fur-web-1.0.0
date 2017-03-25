package th.cu.thesis.fur.web.model.grid;

import java.util.List;

import th.cu.thesis.fur.web.model.UR;
import th.cu.thesis.fur.web.model.UrForUser;

public class UrListUrForUser extends UR{
	
	private String statusText;
	private String requestTypeText;
	private String periodTypeText;
	private List<UrForUser> urForUserList;
	public String getStatusText() {
		return statusText;
	}
	public void setStatusText(String statusText) {
		this.statusText = statusText;
	}
	public String getRequestTypeText() {
		return requestTypeText;
	}
	public void setRequestTypeText(String requestTypeText) {
		this.requestTypeText = requestTypeText;
	}
	public String getPeriodTypeText() {
		return periodTypeText;
	}
	public void setPeriodTypeText(String periodTypeText) {
		this.periodTypeText = periodTypeText;
	}
	public List<UrForUser> getUrForUserList() {
		return urForUserList;
	}
	public void setUrForUserList(List<UrForUser> urForUserList) {
		this.urForUserList = urForUserList;
	}
	
	
}

