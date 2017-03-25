package th.cu.thesis.fur.web.model;

import java.util.Date;
public class Application {

	private String appId;
	private String appName;
	private String appInfo;
	private String status;
	private String statusText;
	private String type;
	private String approveTypeAppowner;
	private String minimumAppowner;
	private String approveTypeCustodian;
	private String minimumCustodian;
	private String appFile;
	private Date createdDate;
	private String createdBy;
	private Date updatedDate;
	private String updatedBy;

	public Application() {
	}

	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}

	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public String getAppInfo() {
		return appInfo;
	}

	public void setAppInfo(String appInfo) {
		this.appInfo = appInfo;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public String getStatusText() {
		return statusText;
	}

	public void setStatusText(String statusText) {
		this.statusText = statusText;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public String getApproveTypeAppowner() {
		return approveTypeAppowner;
	}

	public void setApproveTypeAppowner(String approveTypeAppowner) {
		this.approveTypeAppowner = approveTypeAppowner;
	}

	public String getMinimumAppowner() {
		return minimumAppowner;
	}

	public void setMinimumAppowner(String minimumAppowner) {
		this.minimumAppowner = minimumAppowner;
	}

	public String getApproveTypeCustodian() {
		return approveTypeCustodian;
	}

	public void setApproveTypeCustodian(String approveTypeCustodian) {
		this.approveTypeCustodian = approveTypeCustodian;
	}

	public String getMinimumCustodian() {
		return minimumCustodian;
	}

	public void setMinimumCustodian(String minimumCustodian) {
		this.minimumCustodian = minimumCustodian;
	}

	public String getAppFile() {
		return appFile;
	}

	public void setAppFile(String appFile) {
		this.appFile = appFile;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Application [appId=");
		builder.append(appId);
		builder.append(", appName=");
		builder.append(appName);
		builder.append(", appInfo=");
		builder.append(appInfo);
		builder.append(", status=");
		builder.append(status);
		builder.append(", type=");
		builder.append(type);
		builder.append(", approveTypeAppowner=");
		builder.append(approveTypeAppowner);
		builder.append(", minimumAppowner=");
		builder.append(minimumAppowner);
		builder.append(", approveTypeCustodian=");
		builder.append(approveTypeCustodian);
		builder.append(", minimumCustodian=");
		builder.append(minimumCustodian);
		builder.append(", appFile=");
		builder.append(appFile);
		builder.append(", createdDate=");
		builder.append(createdDate);
		builder.append(", createdBy=");
		builder.append(createdBy);
		builder.append(", updatedDate=");
		builder.append(updatedDate);
		builder.append(", updatedBy=");
		builder.append(updatedBy);
		builder.append("]");
		return builder.toString();
	}

}
