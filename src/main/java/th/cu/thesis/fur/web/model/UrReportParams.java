package th.cu.thesis.fur.web.model;

import java.io.Serializable;
import java.util.Date;

public class UrReportParams implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -771228729761786423L;
	private String requestNo;
	private String urNo;
	private String startDate;
	private String endDate;
	private String requestUrBy;
	private String requestBy;
	private String requestType;
	private String urStatus;
	private String urNode;
	private String urFlow;
	private String userList;
	private String type;
	private String appName;
	private String userType;
	private String authorUser;
	private String period;
	private String startDateUFU;
	private String endDateUFU;
	public String getRequestNo() {
		return requestNo;
	}
	public void setRequestNo(String requestNo) {
		this.requestNo = requestNo;
	}
	public String getUrNo() {
		return urNo;
	}
	public void setUrNo(String urNo) {
		this.urNo = urNo;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getRequestUrBy() {
		return requestUrBy;
	}
	public void setRequestUrBy(String requestUrBy) {
		this.requestUrBy = requestUrBy;
	}
	public String getRequestBy() {
		return requestBy;
	}
	public void setRequestBy(String requestBy) {
		this.requestBy = requestBy;
	}
	public String getRequestType() {
		return requestType;
	}
	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}
	public String getUrStatus() {
		return urStatus;
	}
	public void setUrStatus(String urStatus) {
		this.urStatus = urStatus;
	}
	public String getUrNode() {
		return urNode;
	}
	public void setUrNode(String urNode) {
		this.urNode = urNode;
	}
	public String getUrFlow() {
		return urFlow;
	}
	public void setUrFlow(String urFlow) {
		this.urFlow = urFlow;
	}
	public String getUserList() {
		return userList;
	}
	public void setUserList(String userList) {
		this.userList = userList;
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
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getAuthorUser() {
		return authorUser;
	}
	public void setAuthorUser(String authorUser) {
		this.authorUser = authorUser;
	}
	public String getPeriod() {
		return period;
	}
	public void setPeriod(String period) {
		this.period = period;
	}
	public String getStartDateUFU() {
		return startDateUFU;
	}
	public void setStartDateUFU(String startDateUFU) {
		this.startDateUFU = startDateUFU;
	}
	public String getEndDateUFU() {
		return endDateUFU;
	}
	public void setEndDateUFU(String endDateUFU) {
		this.endDateUFU = endDateUFU;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("UrReportParams [requestNo=");
		builder.append(requestNo);
		builder.append(", urNo=");
		builder.append(urNo);
		builder.append(", startDate=");
		builder.append(startDate);
		builder.append(", endDate=");
		builder.append(endDate);
		builder.append(", requestUrBy=");
		builder.append(requestUrBy);
		builder.append(", requestBy=");
		builder.append(requestBy);
		builder.append(", requestType=");
		builder.append(requestType);
		builder.append(", urStatus=");
		builder.append(urStatus);
		builder.append(", urNode=");
		builder.append(urNode);
		builder.append(", urFlow=");
		builder.append(urFlow);
		builder.append(", userList=");
		builder.append(userList);
		builder.append(", type=");
		builder.append(type);
		builder.append(", appName=");
		builder.append(appName);
		builder.append(", userType=");
		builder.append(userType);
		builder.append(", authorUser=");
		builder.append(authorUser);
		builder.append(", period=");
		builder.append(period);
		builder.append(", startDateUFU=");
		builder.append(startDateUFU);
		builder.append(", endDateUFU=");
		builder.append(endDateUFU);
		builder.append("]");
		return builder.toString();
	}
	
	
}
