package th.cu.thesis.fur.web.model;

import java.io.Serializable;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class UserRequestFromGrid implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4669260649968250800L;
	private String appId;
	private String appRoleId;
	private String application;
	private String remark;
	private String roleapplication;
	private String status;
	private List<String> temfile;
	private List<MultipartFile> upload;
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public String getAppRoleId() {
		return appRoleId;
	}
	public void setAppRoleId(String appRoleId) {
		this.appRoleId = appRoleId;
	}
	public String getApplication() {
		return application;
	}
	public void setApplication(String application) {
		this.application = application;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getRoleapplication() {
		return roleapplication;
	}
	public void setRoleapplication(String roleapplication) {
		this.roleapplication = roleapplication;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public List<String> getTemfile() {
		return temfile;
	}
	public void setTemfile(List<String> temfile) {
		this.temfile = temfile;
	}
	public List<MultipartFile> getUpload() {
		return upload;
	}
	public void setUpload(List<MultipartFile> upload) {
		this.upload = upload;
	}
	public UserRequestFromGrid(String appId, String appRoleId,
			String application, String remark, String roleapplication,
			String status, List<String> temfile, List<MultipartFile> upload) {
		super();
		this.appId = appId;
		this.appRoleId = appRoleId;
		this.application = application;
		this.remark = remark;
		this.roleapplication = roleapplication;
		this.status = status;
		this.temfile = temfile;
		this.upload = upload;
	}
	
}
