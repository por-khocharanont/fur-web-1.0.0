package th.cu.thesis.fur.web.model;

import java.util.List;

public class UrDetail extends UserRequestInfo {
	private List<UrForUser> urForUserList; 

	public List<UrForUser> getUrForUserList() {
		return urForUserList;
	}

	public void setUrForUserList(List<UrForUser> urForUserList) {
		this.urForUserList = urForUserList;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("URDetail [urForUserList=");
		builder.append(urForUserList);
		builder.append(", getUrForUserList()=");
		builder.append(getUrForUserList());
		builder.append(", getUrId()=");
		builder.append(getUrId());
		builder.append(", getRequestNo()=");
		builder.append(getRequestNo());
		builder.append(", getFlowId()=");
		builder.append(getFlowId());
		builder.append(", getAppRoleName()=");
		builder.append(getAppRoleName());
		builder.append(", getRequestDate()=");
		builder.append(getRequestDate());
		builder.append(", getRequestBy()=");
		builder.append(getRequestBy());
		builder.append(", getUrStep()=");
		builder.append(getUrStep());
		builder.append(", getUrApprove()=");
		builder.append(getUrApprove());
		builder.append(", getUrReject()=");
		builder.append(getUrReject());
		builder.append(", getUrToken()=");
		builder.append(getUrToken());
		builder.append(", getUrDefault()=");
		builder.append(getUrDefault());
		builder.append(", toString()=");
		builder.append(super.toString());
		builder.append(", getClass()=");
		builder.append(getClass());
		builder.append(", hashCode()=");
		builder.append(hashCode());
		builder.append("]");
		return builder.toString();
	}

	
	
}
