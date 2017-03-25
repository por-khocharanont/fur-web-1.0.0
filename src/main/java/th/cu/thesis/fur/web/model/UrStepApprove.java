package th.cu.thesis.fur.web.model;

public class UrStepApprove extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6912755313478912054L;
	private String urstepapproveId;
	private String urStepId;
	private String pincode;
	private String enname;
	private String ensurname;
	private String username;
	private String email;
	private String phone;
	private String mobile;
	private String sequence;
	private String teamName;
	private String teamSequence;

	public String getUrstepapproveId() {
		return urstepapproveId;
	}

	public void setUrstepapproveId(String urstepapproveId) {
		this.urstepapproveId = urstepapproveId;
	}

	public String getUrStepId() {
		return urStepId;
	}

	public void setUrStepId(String urStepId) {
		this.urStepId = urStepId;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getEnname() {
		return enname;
	}

	public void setEnname(String enname) {
		this.enname = enname;
	}

	public String getEnsurname() {
		return ensurname;
	}

	public void setEnsurname(String ensurname) {
		this.ensurname = ensurname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getSequence() {
		return sequence;
	}

	public void setSequence(String sequence) {
		this.sequence = sequence;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public String getTeamSequence() {
		return teamSequence;
	}

	public void setTeamSequence(String teamSequence) {
		this.teamSequence = teamSequence;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("UrStepApprove [urstepapproveId=");
		builder.append(urstepapproveId);
		builder.append(", urStepId=");
		builder.append(urStepId);
		builder.append(", pincode=");
		builder.append(pincode);
		builder.append(", enname=");
		builder.append(enname);
		builder.append(", ensurname=");
		builder.append(ensurname);
		builder.append(", username=");
		builder.append(username);
		builder.append(", email=");
		builder.append(email);
		builder.append(", phone=");
		builder.append(phone);
		builder.append(", mobile=");
		builder.append(mobile);
		builder.append(", sequence=");
		builder.append(sequence);
		builder.append(", teamName=");
		builder.append(teamName);
		builder.append(", teamSequence=");
		builder.append(teamSequence);
		builder.append("]");
		return builder.toString();
	}

}
