package th.cu.thesis.fur.web.model.grid;

import java.util.List;

import th.cu.thesis.fur.web.model.RequestNo;
import th.cu.thesis.fur.web.model.URStepDetail;
import th.cu.thesis.fur.web.model.UrDetail;

public class UserRequestDetail {
	private RequestNo requestNo;
	private UrDetail urDetail;
	private List<URStepDetail> urStepList;
	private String authenToken;
	private String currentStep;
	public RequestNo getRequestNo() {
		return requestNo;
	}
	public void setRequestNo(RequestNo requestNo) {
		this.requestNo = requestNo;
	}
	public UrDetail getUrDetail() {
		return urDetail;
	}
	public void setUrDetail(UrDetail urDetail) {
		this.urDetail = urDetail;
	}
	public List<URStepDetail> getUrStepList() {
		return urStepList;
	}
	public void setUrStepList(List<URStepDetail> urStepList) {
		this.urStepList = urStepList;
	}
	public String getAuthenToken() {
		return authenToken;
	}
	public void setAuthenToken(String authenToken) {
		this.authenToken = authenToken;
	}
	public String getCurrentStep() {
		return currentStep;
	}
	public void setCurrentStep(String currentStep) {
		this.currentStep = currentStep;
	}

}
