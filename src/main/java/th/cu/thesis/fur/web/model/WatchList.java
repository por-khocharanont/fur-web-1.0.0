package th.cu.thesis.fur.web.model;

import java.util.Date;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

public class WatchList {

	private String requestNo;
	private String urId;
	private String subject;
	private Date requestDate;
	private String requestBy;
	private String urStep;
	private String urStepText;
	private String username;
	private String appName;
	private String appRoleName;
	private String urApprove;

	public String getUrApprove() {
		return urApprove;
	}

	public void setUrApprove(String urApprove) {
		this.urApprove = urApprove;
	}

	public String getRequestNo() {
		return requestNo;
	}

	public void setRequestNo(String requestNo) {
		this.requestNo = requestNo;
	}

	public String getUrId() {
		return urId;
	}

	public void setUrId(String urId) {
		this.urId = urId;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public Date getRequestDate() {
		return requestDate;
	}

	public void setRequestDate(Date requestDate) {
		this.requestDate = requestDate;
	}

	public String getRequestBy() {
		return requestBy;
	}

	public void setRequestBy(String requestBy) {
		this.requestBy = requestBy;
	}

	public String getUrStep() {
		return urStep;
	}

	public void setUrStep(String urStep) {
		this.urStep = urStep;
	}

	public String getUrStepText() {
		return urStepText;
	}

	public void setUrStepText(String urStepText) {
		this.urStepText = urStepText;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public String getAppRoleName() {
		return appRoleName;
	}

	public void setAppRoleName(String appRoleName) {
		this.appRoleName = appRoleName;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("WatchList [requestNo=");
		builder.append(requestNo);
		builder.append(", urId=");
		builder.append(urId);
		builder.append(", subject=");
		builder.append(subject);
		builder.append(", requestDate=");
		builder.append(requestDate);
		builder.append(", requestBy=");
		builder.append(requestBy);
		builder.append(", urStep=");
		builder.append(urStep);
		builder.append(", urStepText=");
		builder.append(urStepText);
		builder.append(", username=");
		builder.append(username);
		builder.append(", appName=");
		builder.append(appName);
		builder.append(", appRoleName=");
		builder.append(appRoleName);
		builder.append(", urApprove=");
		builder.append(urApprove);
		builder.append("]");
		return builder.toString();
	}

}
