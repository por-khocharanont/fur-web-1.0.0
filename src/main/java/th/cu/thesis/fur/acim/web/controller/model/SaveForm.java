package th.cu.thesis.fur.acim.web.controller.model;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public class SaveForm {
	String username;
	Map<String, MultipartFile> fileUploads;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Map<String, MultipartFile> getFileUploads() {
		return fileUploads;
	}

	public void setFileUploads(Map<String, MultipartFile> fileUploads) {
		this.fileUploads = fileUploads;
	}

}
