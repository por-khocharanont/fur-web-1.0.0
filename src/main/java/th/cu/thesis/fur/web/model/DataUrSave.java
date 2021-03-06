package th.cu.thesis.fur.web.model;

import java.util.List;
import java.util.Map;

public class DataUrSave {

	private DataUserRequestValidate dataUserRequestValidate ;
	private Map<String,String> dataFormApp;
	private List<UserRequestFromGrid> requestFromGrids;
	public DataUserRequestValidate getDataUserRequestValidate() {
		return dataUserRequestValidate;
	}
	public void setDataUserRequestValidate(
			DataUserRequestValidate dataUserRequestValidate) {
		this.dataUserRequestValidate = dataUserRequestValidate;
	}
	public Map<String, String> getDataFormApp() {
		return dataFormApp;
	}
	public void setDataFormApp(Map<String, String> dataFormApp) {
		this.dataFormApp = dataFormApp;
	}
	public List<UserRequestFromGrid> getRequestFromGrids() {
		return requestFromGrids;
	}
	public void setRequestFromGrids(List<UserRequestFromGrid> requestFromGrids) {
		this.requestFromGrids = requestFromGrids;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("DataUrSave [dataUserRequestValidate=");
		builder.append(dataUserRequestValidate);
		builder.append(", dataFormApp=");
		builder.append(dataFormApp);
		builder.append(", requestFromGrids=");
		builder.append(requestFromGrids);
		builder.append("]");
		return builder.toString();
	}
	public DataUrSave(DataUserRequestValidate dataUserRequestValidate,
			Map<String, String> dataFormApp,
			List<UserRequestFromGrid> requestFromGrids) {
		super();
		this.dataUserRequestValidate = dataUserRequestValidate;
		this.dataFormApp = dataFormApp;
		this.requestFromGrids = requestFromGrids;
	}

	
}
