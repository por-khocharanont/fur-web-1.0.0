package th.cu.thesis.fur.web.model;


public class AppFile {

	private String fileName;
	private String filePath;
	private String authenType;
	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public String getAuthenType() {
		return authenType;
	}

	public void setAuthenType(String authenType) {
		this.authenType = authenType;
	}
	
	public AppFile(String fileName, String filePath, String authenType) {
		super();
		this.fileName = fileName;
		this.filePath = filePath;
		this.authenType = authenType;
	}

	
}
