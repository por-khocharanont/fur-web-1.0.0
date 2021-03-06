package th.cu.thesis.fur.web.model.grid;

import java.io.Serializable;

public class EligibleRequest extends CommonGrid implements Serializable{

	
	private static final long serialVersionUID = 1L;
	
	private String orgCode;
	private String orgName;
	private String applicationId;
	private String applicationName;
	private String applicationRoleId;
	private String applicationRoleName;
	private String applicationType;
	private String orderBy;
	private String neName;
	
	public EligibleRequest() {}

	public EligibleRequest(String orgCode, String orgName, String applicationId, String applicationName,
			String applicationRoleId, String applicationRoleName, String applicationType, String orderBy,
			String neName) {
		super();
		this.orgCode = orgCode;
		this.orgName = orgName;
		this.applicationId = applicationId;
		this.applicationName = applicationName;
		this.applicationRoleId = applicationRoleId;
		this.applicationRoleName = applicationRoleName;
		this.applicationType = applicationType;
		this.orderBy = orderBy;
		this.neName = neName;
	}

	public String getOrgCode() {
		return orgCode;
	}

	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getApplicationId() {
		return applicationId;
	}

	public void setApplicationId(String applicationId) {
		this.applicationId = applicationId;
	}

	public String getApplicationName() {
		return applicationName;
	}

	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
	}

	public String getApplicationRoleId() {
		return applicationRoleId;
	}

	public void setApplicationRoleId(String applicationRoleId) {
		this.applicationRoleId = applicationRoleId;
	}

	public String getApplicationRoleName() {
		return applicationRoleName;
	}

	public void setApplicationRoleName(String applicationRoleName) {
		this.applicationRoleName = applicationRoleName;
	}

	public String getApplicationType() {
		return applicationType;
	}

	public void setApplicationType(String applicationType) {
		this.applicationType = applicationType;
	}

	public String getOrderBy() {
		return orderBy;
	}

	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}

	public String getNeName() {
		return neName;
	}

	public void setNeName(String neName) {
		this.neName = neName;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("EligibleRequest [orgCode=");
		builder.append(orgCode);
		builder.append(", orgName=");
		builder.append(orgName);
		builder.append(", applicationId=");
		builder.append(applicationId);
		builder.append(", applicationName=");
		builder.append(applicationName);
		builder.append(", applicationRoleId=");
		builder.append(applicationRoleId);
		builder.append(", applicationRoleName=");
		builder.append(applicationRoleName);
		builder.append(", applicationType=");
		builder.append(applicationType);
		builder.append(", orderBy=");
		builder.append(orderBy);
		builder.append(", neName=");
		builder.append(neName);
		builder.append("]");
		return builder.toString();
	}
	
	
	
	

}
