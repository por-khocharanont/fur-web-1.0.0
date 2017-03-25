package th.cu.thesis.fur.web.model;

import java.util.Date;

public class ApplicationAuthentication {
	private String appAuthenId;
	private String appId;
	private String authenTypeName;
	private String updatedBy;
	private String createdBy;
	private Date createdDate;
	private Date updatedDate;
	public String getAppAuthenId() {
		return appAuthenId;
	}
	public void setAppAuthenId(String appAuthenId) {
		this.appAuthenId = appAuthenId;
	}
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public String getAuthenTypeName() {
		return authenTypeName;
	}
	public void setAuthenTypeName(String authenTypeName) {
		this.authenTypeName = authenTypeName;
	}
	public String getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Date getUpdatedDate() {
		return updatedDate;
	}
	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ApplicationAuthentication [appAuthenId=");
		builder.append(appAuthenId);
		builder.append(", appId=");
		builder.append(appId);
		builder.append(", authenTypeName=");
		builder.append(authenTypeName);
		builder.append(", updatedBy=");
		builder.append(updatedBy);
		builder.append(", createdBy=");
		builder.append(createdBy);
		builder.append(", createdDate=");
		builder.append(createdDate);
		builder.append(", updatedDate=");
		builder.append(updatedDate);
		builder.append("]");
		return builder.toString();
	}
	
}
