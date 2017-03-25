package th.cu.thesis.fur.web.model;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class ApplicationRequest {

	private ApplicationForm applicationForm;
	private List<FileInfo> files;
	private List<String> deleteFileNameList;

	public ApplicationRequest() {
	}

	public ApplicationForm getApplicationForm() {
		return applicationForm;
	}

	public void setApplicationForm(ApplicationForm applicationForm) {
		this.applicationForm = applicationForm;
	}

	public List<FileInfo> getFiles() {
		return files;
	}

	public void setFiles(List<FileInfo> files) {
		this.files = files;
	}

	public List<String> getDeleteFileNameList() {
		return deleteFileNameList;
	}

	public void setDeleteFileNameList(List<String> deleteFileNameList) {
		this.deleteFileNameList = deleteFileNameList;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ApplicationRequest [applicationForm=");
		builder.append(applicationForm);
		builder.append(", files=");
		builder.append(files);
		builder.append(", deleteFileNameList=");
		builder.append(deleteFileNameList);
		builder.append("]");
		return builder.toString();
	}

}
