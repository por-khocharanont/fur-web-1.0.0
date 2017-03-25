package th.cu.thesis.fur.web.repository.model;

import java.util.Date;

public class UserApplicationInfo {
	private String appName;
	private String appRoleId;
	private String appRoleName;
	private String type;
	private String authorization;
	private String token;
	private String urId;
	private String periodType;
	private Date startTime;
	private Date endTime;

	public UserApplicationInfo() {
	}

	public UserApplicationInfo(String appName, String appRoleId, String appRoleName, String type, String authorization,
			String token, String urId, String periodType, Date startTime, Date endTime) {
		this.appName = appName;
		this.appRoleId = appRoleId;
		this.appRoleName = appRoleName;
		this.type = type;
		this.authorization = authorization;
		this.token = token;
		this.urId = urId;
		this.periodType = periodType;
		this.startTime = startTime;
		this.endTime = endTime;
	}

	public String getPeriodType() {
		return periodType;
	}

	public void setPeriodType(String periodType) {
		this.periodType = periodType;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public String getAppRoleId() {
		return appRoleId;
	}

	public void setAppRoleId(String appRoleId) {
		this.appRoleId = appRoleId;
	}

	public String getAppRoleName() {
		return appRoleName;
	}

	public void setAppRoleName(String appRoleName) {
		this.appRoleName = appRoleName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getAuthorization() {
		return authorization;
	}

	public void setAuthorization(String authorization) {
		this.authorization = authorization;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getUrId() {
		return urId;
	}

	public void setUrId(String urId) {
		this.urId = urId;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("UserApplicationInfo [appName=");
		builder.append(appName);
		builder.append(", appRoleId=");
		builder.append(appRoleId);
		builder.append(", appRoleName=");
		builder.append(appRoleName);
		builder.append(", type=");
		builder.append(type);
		builder.append(", authorization=");
		builder.append(authorization);
		builder.append(", token=");
		builder.append(token);
		builder.append(", urId=");
		builder.append(urId);
		builder.append(", periodType=");
		builder.append(periodType);
		builder.append(", startTime=");
		builder.append(startTime);
		builder.append(", endTime=");
		builder.append(endTime);
		builder.append("]");
		return builder.toString();
	}

}
