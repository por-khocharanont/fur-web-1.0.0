package th.cu.thesis.fur.web.model.grid;

import th.cu.thesis.fur.web.model.ApplicationAuthentication;

public class ApplicationAuthenticationCheckBox {
	private boolean appChecked;
	private ApplicationAuthentication appAuthen;
	private String optionName;
	
	public String getOptionName() {
		return optionName;
	}
	public void setOptionName(String optionName) {
		this.optionName = optionName;
	}
	public boolean getAppChecked() {
		return appChecked;
	}
	public void setAppChecked(boolean appChecked) {
		this.appChecked = appChecked;
	}
	public ApplicationAuthentication getAppAuthen() {
		return appAuthen;
	}
	public void setAppAuthen(ApplicationAuthentication appAuthen) {
		this.appAuthen = appAuthen;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ApplicationAuthenticationCheckBox [appChecked=");
		builder.append(appChecked);
		builder.append(", appAuthen=");
		builder.append(appAuthen);
		builder.append(", optionName=");
		builder.append(optionName);
		builder.append("]");
		return builder.toString();
	}
	
}
