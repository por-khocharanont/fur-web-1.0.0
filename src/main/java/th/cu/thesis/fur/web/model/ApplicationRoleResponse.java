package th.cu.thesis.fur.web.model;

import java.util.List;

public class ApplicationRoleResponse {
	
	private List<ApplicationRole> applicationRoleList;

	public List<ApplicationRole> getApplicationRoleList() {
		return applicationRoleList;
	}

	public void setApplicationRoleList(List<ApplicationRole> applicationRoleList) {
		this.applicationRoleList = applicationRoleList;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ApplicationRoleResponse [applicationRoleList=");
		builder.append(applicationRoleList);
		builder.append("]");
		return builder.toString();
	}
	
	
	

}
