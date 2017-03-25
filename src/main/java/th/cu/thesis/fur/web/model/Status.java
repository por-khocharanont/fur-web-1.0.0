package th.cu.thesis.fur.web.model;


public class Status {
	
	public static final String STATUS_SUCCESS = "0";
	public static final String STATUS_FAIL = "-2";	
	
	private String statusCode;
	private String statusMessage;	

	
	public String getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}
	public String getStatusMessage() {
		return statusMessage;
	}
	public void setStatusMessage(String statusMessage) {
		this.statusMessage = statusMessage;
	}
	
	@Override
	public String toString() {
		StringBuilder strBuilder = new StringBuilder();
		strBuilder.append("Status [statusCode=");
		strBuilder.append(statusCode);
		strBuilder.append(", statusMessage=");
		strBuilder.append(statusMessage);
		strBuilder.append("]");
		
		return strBuilder.toString();	
	}
}
