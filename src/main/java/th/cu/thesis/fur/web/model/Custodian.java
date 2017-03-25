package th.cu.thesis.fur.web.model;

import java.util.Date;

public class Custodian {
	private String custodianId;
	private String appId;
	private String userId;
	private String username;
	private String enfullname;
	private String sequenceUser;
	private String userType;
	private Date createdDate;
	private String createdBy;
	private Date updatedDate;
	private String updatedBy;

	public String getCustodianId() {
		return custodianId;
	}

	public void setCustodianId(String custodianId) {
		this.custodianId = custodianId;
	}

	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getSequenceUser() {
		return sequenceUser;
	}

	public void setSequenceUser(String sequenceUser) {
		this.sequenceUser = sequenceUser;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEnfullname() {
		return enfullname;
	}

	public void setEnfullname(String enfullname) {
		this.enfullname = enfullname;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Custodian [custodianId=");
		builder.append(custodianId);
		builder.append(", appId=");
		builder.append(appId);
		builder.append(", userId=");
		builder.append(userId);
		builder.append(", username=");
		builder.append(username);
		builder.append(", enfullname=");
		builder.append(enfullname);
		builder.append(", sequenceUser=");
		builder.append(sequenceUser);
		builder.append(", userType=");
		builder.append(userType);
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
