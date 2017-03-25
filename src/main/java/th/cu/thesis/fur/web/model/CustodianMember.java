package th.cu.thesis.fur.web.model;

import java.util.Date;

public class CustodianMember {
	private String custodianMemberId;
	private String custodianTeamId;
	private String userId;
	private String username;
	private String enfullname;
	private Date createdDate;
	private String createdBy;
	private Date updatedDate;
	private String updatedBy;

	public String getCustodianMemberId() {
		return custodianMemberId;
	}

	public void setCustodianMemberId(String custodianMemberId) {
		this.custodianMemberId = custodianMemberId;
	}

	public String getCustodianTeamId() {
		return custodianTeamId;
	}

	public void setCustodianTeamId(String custodianTeamId) {
		this.custodianTeamId = custodianTeamId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
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
		builder.append("CustodianMember [custodianMemberId=");
		builder.append(custodianMemberId);
		builder.append(", custodianTeamId=");
		builder.append(custodianTeamId);
		builder.append(", userId=");
		builder.append(userId);
		builder.append(", username=");
		builder.append(username);
		builder.append(", enfullname=");
		builder.append(enfullname);
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
