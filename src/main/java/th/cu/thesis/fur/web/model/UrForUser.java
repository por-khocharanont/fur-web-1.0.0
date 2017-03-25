package th.cu.thesis.fur.web.model;

import java.io.Serializable;

public class UrForUser extends User implements Serializable {

	private static final long serialVersionUID = -2597666541310045993L;
	private String urForUserId;
	private String urId;
	private String tokenSerialNumber;
	private String urStatus;
	private String urStatusText;
	private String urStep;

	private static final String PROCESS_STATUS = "1";
	private static final String COMPLETE_STATUS = "2";
	private static final String REJECT_STATUS = "3";
	
	private static final String PROCESS_TEXT = "Process";
	private static final String COMPLETE_TEXT = "Complete";
	private static final String REJECT_TEXT = "Reject";
	
	public UrForUser(User user) {

		this.setBucode(user.getBucode());
		this.setBudesc(user.getBudesc());
		this.setBuname(user.getBuname());
		this.setBuhcode(user.getBucode());
		this.setBuhdesc(user.getBuhdesc());
		this.setBuhname(user.getBuhname());
		this.setCocode(user.getCocode());
		this.setConame(user.getConame());
		this.setDpcode(user.getDpcode());
		this.setDpdesc(user.getDpdesc());
		this.setDphcode(user.getDphcode());
		this.setDphname(user.getDphname());
		this.setDphdesc(user.getDphdesc());
		this.setDpname(user.getDpname());
		this.setEmail(user.getEmail());
		this.setEnfullname(user.getEnfullname());
		this.setEnname(user.getEnname());
		this.setEnsurname(user.getEnsurname());
		this.setFccode(user.getFccode());
		this.setFcname(user.getFcname());
		this.setFcdesc(user.getFcdesc());
		this.setFchcode(user.getFchcode());
		this.setFchdesc(user.getFchdesc());
		this.setFchname(user.getFchname());
		this.setManagerEmail(user.getManagerEmail());
		this.setManagerEnname(user.getManagerEnname());
		this.setManagerEnsurname(user.getManagerEnname());
		this.setManagerPin(user.getManagerPin());
		this.setManagerUsername(user.getManagerUsername());
		this.setMobile(user.getMobile());
		this.setOrgcode(user.getOrgcode());
		this.setOrgdesc(user.getOrgdesc());
		this.setOrglevel(user.getOrglevel());
		this.setOrgname(user.getOrgname());
		this.setPhone(user.getPhone());
		this.setPincode(user.getPincode());
		this.setPosition(user.getPosition());
		this.setPositionId(user.getPositionId());
		this.setSccode(user.getSccode());
		this.setScdesc(user.getScdesc());
		this.setSchcode(user.getSchcode());
		this.setSchdesc(user.getSchdesc());
		this.setSchname(user.getSchname());
		this.setScname(user.getScname());
		this.setStatus(user.getStatus());
		this.setThname(user.getThname());
		this.setThsurname(user.getThsurname());
		this.setThfullname(user.getThfullname());
		this.setUsername(user.getUsername());
		this.setUserId(user.getUserId());
		// TODO Auto-generated constructor stub
	}
	

	public UrForUser(String urForUserId, String urId, String tokenSerialNumber, String urStatus, String urStatusText,
			String urStep) {
		super();
		this.urForUserId = urForUserId;
		this.urId = urId;
		this.tokenSerialNumber = tokenSerialNumber;
		this.urStatus = urStatus;
		this.urStatusText = urStatusText;
		this.urStep = urStep;
	}


	public UrForUser() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getUrForUserId() {
		return urForUserId;
	}

	public void setUrForUserId(String urForUserId) {
		this.urForUserId = urForUserId;
	}

	public String getUrId() {
		return urId;
	}

	public void setUrId(String urId) {
		this.urId = urId;
	}

	public String getTokenSerialNumber() {
		return tokenSerialNumber;
	}

	public void setTokenSerialNumber(String tokenSerialNumber) {
		this.tokenSerialNumber = tokenSerialNumber;
	}

	public String getUrStatus() {
		return urStatus;
	}

	public void setUrStatus(String urStatus) {
		this.urStatus = urStatus;
	}
	
	public String getUrStep() {
		return urStep;
	}


	public void setUrStep(String urStep) {
		this.urStep = urStep;
	}


	public String getUrStatusText() {
		if(PROCESS_STATUS.equals(this.urStatus)){
			return PROCESS_TEXT;
		}
		
		if(COMPLETE_STATUS.equals(this.urStatus)){
			return COMPLETE_TEXT;
		}
		
		if(REJECT_STATUS.equals(this.urStatus)){
			return REJECT_TEXT;
		}
		return urStatusText;
	}

	public void setUrStatusText(String urStatusText) {
		this.urStatusText = urStatusText;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("UrForUser [urForUserId=");
		builder.append(urForUserId);
		builder.append(", urId=");
		builder.append(urId);
		builder.append(", tokenSerialNumber=");
		builder.append(tokenSerialNumber);
		builder.append(", urStatus=");
		builder.append(urStatus);
		builder.append(", urStatusText=");
		builder.append(urStatusText);
		builder.append(", urStep=");
		builder.append(urStep);
		builder.append("]");
		return builder.toString();
	}

}
