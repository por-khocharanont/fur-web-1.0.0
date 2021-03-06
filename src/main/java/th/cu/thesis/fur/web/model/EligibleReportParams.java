package th.cu.thesis.fur.web.model;

import java.io.Serializable;

public class EligibleReportParams implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -226600776776879440L;
	String orgCode;
	String orgDesc;
	String type;
	String appName;
	String requestBy;
	public String getOrgCode() {
		return orgCode;
	}
	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}
	public String getOrgDesc() {
		return orgDesc;
	}
	public void setOrgDesc(String orgDesc) {
		this.orgDesc = orgDesc;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getAppName() {
		return appName;
	}
	public void setAppName(String appName) {
		this.appName = appName;
	}
	public String getRequestBy() {
		return requestBy;
	}
	public void setRequestBy(String requestBy) {
		this.requestBy = requestBy;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("EligibleReportParams [orgCode=");
		builder.append(orgCode);
		builder.append(", orgDesc=");
		builder.append(orgDesc);
		builder.append(", type=");
		builder.append(type);
		builder.append(", appName=");
		builder.append(appName);
		builder.append(", requestBy=");
		builder.append(requestBy);
		builder.append("]");
		return builder.toString();
	}
	
}
