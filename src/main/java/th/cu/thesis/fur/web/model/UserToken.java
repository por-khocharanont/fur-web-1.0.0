package th.cu.thesis.fur.web.model;

import java.util.Date;

public class UserToken {

	private String userTokenId;
	private String userId;
	private String serialNumber;
	private String urId;
	private Date createdDate;
	private String createdBy;
	private Date updatedDate;
	private String updatedBy;
	public String getUserTokenId() {
		return userTokenId;
	}
	public void setUserTokenId(String userTokenId) {
		this.userTokenId = userTokenId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getSerialNumber() {
		return serialNumber;
	}
	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}
	public String getUrId() {
		return urId;
	}
	public void setUrId(String urId) {
		this.urId = urId;
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
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("UserToken [userTokenId=");
		builder.append(userTokenId);
		builder.append(", userId=");
		builder.append(userId);
		builder.append(", serialNumber=");
		builder.append(serialNumber);
		builder.append(", urId=");
		builder.append(urId);
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
