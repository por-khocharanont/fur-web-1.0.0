package th.cu.thesis.fur.web.service.exception;

public class MessageInfo {

	String code;
	String message;
	
	public MessageInfo() {
	}

	public MessageInfo(String code, String message) {
		super();
		this.code = code;
		this.message = message;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "MessageService [code=" + code + ", message=" + message + "]";
	}

}
