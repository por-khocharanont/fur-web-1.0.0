package th.cu.thesis.fur.web.model;

import java.io.Serializable;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class UserRequest<T> implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6146300385060887719L;
	private String usertype;
	private String usertypeValue;
	private String requestBy;
	private String requestByValue;
	private String requestType;
	private String requestTypeValue;
	private String subject;
	private String detail;
	private String name;
	private String userId;
	private String periodtype;
	private String period;
	private String dteStart;
	private String dteTo;
	private String CH1P1;
	private String CH1R1;
	private List<GridUser> rowsUser;
	private List<T> rowsData;
	
	public String getUsertype() {
		return usertype;
	}
	public void setUsertype(String usertype) {
		this.usertype = usertype;
	}
	public String getUsertypeValue() {
		return usertypeValue;
	}
	public void setUsertypeValue(String usertypeValue) {
		this.usertypeValue = usertypeValue;
	}
	public String getRequestBy() {
		return requestBy;
	}
	public void setRequestBy(String requestBy) {
		this.requestBy = requestBy;
	}
	public String getRequestByValue() {
		return requestByValue;
	}
	public void setRequestByValue(String requestByValue) {
		this.requestByValue = requestByValue;
	}
	public String getRequestType() {
		return requestType;
	}
	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}
	public String getRequestTypeValue() {
		return requestTypeValue;
	}
	public void setRequestTypeValue(String requestTypeValue) {
		this.requestTypeValue = requestTypeValue;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getPeriodtype() {
		return periodtype;
	}
	public void setPeriodtype(String periodtype) {
		this.periodtype = periodtype;
	}
	public String getPeriod() {
		return period;
	}
	public void setPeriod(String period) {
		this.period = period;
	}
	public String getDteStart() {
		return dteStart;
	}
	public void setDteStart(String dteStart) {
		this.dteStart = dteStart;
	}
	public String getDteTo() {
		return dteTo;
	}
	public void setDteTo(String dteTo) {
		this.dteTo = dteTo;
	}
	public String getCH1P1() {
		return CH1P1;
	}
	public void setCH1P1(String cH1P1) {
		CH1P1 = cH1P1;
	}
	public String getCH1R1() {
		return CH1R1;
	}
	public void setCH1R1(String cH1R1) {
		CH1R1 = cH1R1;
	}
	public List<GridUser> getRowsUser() {
		return rowsUser;
	}
	public void setRowsUser(List<GridUser> rowsUser) {
		this.rowsUser = rowsUser;
	}
	public List<T> getRowsData() {
		return rowsData;
	}
	public void setRowsData(List<T> rowsData) {
		this.rowsData = rowsData;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("UserRequest [usertype=");
		builder.append(usertype);
		builder.append(", usertypeValue=");
		builder.append(usertypeValue);
		builder.append(", requestBy=");
		builder.append(requestBy);
		builder.append(", requestByValue=");
		builder.append(requestByValue);
		builder.append(", requestType=");
		builder.append(requestType);
		builder.append(", requestTypeValue=");
		builder.append(requestTypeValue);
		builder.append(", subject=");
		builder.append(subject);
		builder.append(", detail=");
		builder.append(detail);
		builder.append(", name=");
		builder.append(name);
		builder.append(", userId=");
		builder.append(userId);
		builder.append(", periodtype=");
		builder.append(periodtype);
		builder.append(", period=");
		builder.append(period);
		builder.append(", dteStart=");
		builder.append(dteStart);
		builder.append(", dteTo=");
		builder.append(dteTo);
		builder.append(", CH1P1=");
		builder.append(CH1P1);
		builder.append(", CH1R1=");
		builder.append(CH1R1);
		builder.append(", rowsUser=");
		builder.append(rowsUser);
		builder.append(", rowsData=");
		builder.append(rowsData);
		builder.append("]");
		return builder.toString();
	}
	
}
class GridUser implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4514255603262596215L;
	String userId;
	String name;
	public GridUser() {
		super();
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("User [userId=");
		builder.append(userId);
		builder.append(", name=");
		builder.append(name);
		builder.append("]");
		return builder.toString();
	}
}

class GridAppNew implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8014782898157843312L;
	private String appId;
	private String application;
	private String appRoleId;
	private String roleapplication;
	private String upload;
	private String status;
	private String remark;
	private MultipartFile[] files;
	
	public GridAppNew() {
		super();
	}
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public String getApplication() {
		return application;
	}
	public void setApplication(String application) {
		this.application = application;
	}
	public String getAppRoleId() {
		return appRoleId;
	}
	public void setAppRoleId(String appRoleId) {
		this.appRoleId = appRoleId;
	}
	public String getRoleapplication() {
		return roleapplication;
	}
	public void setRoleapplication(String roleapplication) {
		this.roleapplication = roleapplication;
	}
	public String getUpload() {
		return upload;
	}
	public void setUpload(String upload) {
		this.upload = upload;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public MultipartFile[] getFiles() {
		return files;
	}
	public void setFiles(MultipartFile[] files) {
		this.files = files;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("GridAppNew [appId=");
		builder.append(appId);
		builder.append(", application=");
		builder.append(application);
		builder.append(", appRoleId=");
		builder.append(appRoleId);
		builder.append(", roleapplication=");
		builder.append(roleapplication);
		builder.append(", upload=");
		builder.append(upload);
		builder.append(", status=");
		builder.append(status);
		builder.append(", remark=");
		builder.append(remark);
		builder.append("]");
		return builder.toString();
	}
	
}
class GridTerminate implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3036913716080603526L;
	private String appId;
	private String application;
	private String appRoleId;
	private String roleapplication;
	private String remark;
	
	public GridTerminate() {
		super();
	}
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public String getApplication() {
		return application;
	}
	public void setApplication(String application) {
		this.application = application;
	}
	public String getAppRoleId() {
		return appRoleId;
	}
	public void setAppRoleId(String appRoleId) {
		this.appRoleId = appRoleId;
	}
	public String getRoleapplication() {
		return roleapplication;
	}
	public void setRoleapplication(String roleapplication) {
		this.roleapplication = roleapplication;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("GridTerminate [appId=");
		builder.append(appId);
		builder.append(", application=");
		builder.append(application);
		builder.append(", appRoleId=");
		builder.append(appRoleId);
		builder.append(", roleapplication=");
		builder.append(roleapplication);
		builder.append(", remark=");
		builder.append(remark);
		builder.append("]");
		return builder.toString();
	}
	
}

class GridChange  implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 6607490505453478654L;
	private String appId;
	private String chgRole;
	private String appRoleIdNew;
	private String appRoleIdOld;
	private String application;
	private String roleNewapplication;
	private String roleOldapplication;
	private String remark;
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("GridChange [appId=");
		builder.append(appId);
		builder.append(", chgRole=");
		builder.append(chgRole);
		builder.append(", appRoleIdNew=");
		builder.append(appRoleIdNew);
		builder.append(", appRoleIdOld=");
		builder.append(appRoleIdOld);
		builder.append(", application=");
		builder.append(application);
		builder.append(", roleNewapplication=");
		builder.append(roleNewapplication);
		builder.append(", roleOldapplication=");
		builder.append(roleOldapplication);
		builder.append(", remark=");
		builder.append(remark);
		builder.append("]");
		return builder.toString();
	}
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public String getChgRole() {
		return chgRole;
	}
	public void setChgRole(String chgRole) {
		this.chgRole = chgRole;
	}
	public String getAppRoleIdNew() {
		return appRoleIdNew;
	}
	public void setAppRoleIdNew(String appRoleIdNew) {
		this.appRoleIdNew = appRoleIdNew;
	}
	public String getAppRoleIdOld() {
		return appRoleIdOld;
	}
	public void setAppRoleIdOld(String appRoleIdOld) {
		this.appRoleIdOld = appRoleIdOld;
	}
	public String getApplication() {
		return application;
	}
	public void setApplication(String application) {
		this.application = application;
	}
	public String getRoleNewapplication() {
		return roleNewapplication;
	}
	public void setRoleNewapplication(String roleNewapplication) {
		this.roleNewapplication = roleNewapplication;
	}
	public String getRoleOldapplication() {
		return roleOldapplication;
	}
	public void setRoleOldapplication(String roleOldapplication) {
		this.roleOldapplication = roleOldapplication;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public GridChange() {
		super();
	}
	

}