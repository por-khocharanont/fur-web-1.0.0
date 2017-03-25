package th.cu.thesis.fur.web.model;

import java.util.List;
import java.util.Map;

public class DataUserRequestValidate {
	private List<String> lsuser;
	private List<String> lsapp;
	private List<Map<String, String>> errorListQueueduser;
	private List<Map<String, String>> errorListalreadyApp;
	private List<Map<String, Object>> oplsbothAlreadyQueued;
	private List<Map<String, Object>> errorsbothAlreadyQueued;
	private String statusQueued;
	private String statusAlready;

	public DataUserRequestValidate() {

	}

	public List<String> getLsuser() {
		return lsuser;
	}

	public void setLsuser(List<String> lsuser) {
		this.lsuser = lsuser;
	}

	public List<String> getLsapp() {
		return lsapp;
	}

	public void setLsapp(List<String> lsapp) {
		this.lsapp = lsapp;
	}

	public List<Map<String, String>> getErrorListQueueduser() {
		return errorListQueueduser;
	}

	public void setErrorListQueueduser(List<Map<String, String>> errorListQueueduser) {
		this.errorListQueueduser = errorListQueueduser;
	}



	public List<Map<String, Object>> getOplsbothAlreadyQueued() {
		return oplsbothAlreadyQueued;
	}

	public void setOplsbothAlreadyQueued(
			List<Map<String, Object>> oplsbothAlreadyQueued) {
		this.oplsbothAlreadyQueued = oplsbothAlreadyQueued;
	}

	public String getStatusQueued() {
		return statusQueued;
	}

	public void setStatusQueued(String statusQueued) {
		this.statusQueued = statusQueued;
	}

	public String getStatusAlready() {
		return statusAlready;
	}

	public void setStatusAlready(String statusAlready) {
		this.statusAlready = statusAlready;
	}
	
	public List<Map<String, Object>> getErrorsbothAlreadyQueued() {
		return errorsbothAlreadyQueued;
	}

	public void setErrorsbothAlreadyQueued(
			List<Map<String, Object>> errorsbothAlreadyQueued) {
		this.errorsbothAlreadyQueued = errorsbothAlreadyQueued;
	}
	
	
	public List<Map<String, String>> getErrorListalreadyApp() {
		return errorListalreadyApp;
	}

	public void setErrorListalreadyApp(List<Map<String, String>> errorListalreadyApp) {
		this.errorListalreadyApp = errorListalreadyApp;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("DataUserRequestValidate [lsuser=");
		builder.append(lsuser);
		builder.append(", lsapp=");
		builder.append(lsapp);
		builder.append(", errorListQueueduser=");
		builder.append(errorListQueueduser);
		builder.append(", errorListalreadyApp=");
		builder.append(errorListalreadyApp);
		builder.append(", oplsbothAlreadyQueued=");
		builder.append(oplsbothAlreadyQueued);
		builder.append(", errorsbothAlreadyQueued=");
		builder.append(errorsbothAlreadyQueued);
		builder.append(", statusQueued=");
		builder.append(statusQueued);
		builder.append(", statusAlready=");
		builder.append(statusAlready);
		builder.append("]");
		return builder.toString();
	}

	
	

	

}
