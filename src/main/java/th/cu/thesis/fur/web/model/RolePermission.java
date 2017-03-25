package th.cu.thesis.fur.web.model;

public class RolePermission {
	
	private String roleCode;
	private String menuCode;
	private String enable;
	private String actionPermission;
	public String getRoleCode() {
		return roleCode;
	}
	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}
	public String getMenuCode() {
		return menuCode;
	}
	public void setMenuCode(String menuCode) {
		this.menuCode = menuCode;
	}
	public String getEnable() {
		return enable;
	}
	public void setEnable(String enable) {
		this.enable = enable;
	}
	public String getActionPermission() {
		return actionPermission;
	}
	public void setActionPermission(String actionPermission) {
		this.actionPermission = actionPermission;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("RolePermission [roleCode=");
		builder.append(roleCode);
		builder.append(", menuCode=");
		builder.append(menuCode);
		builder.append(", enable=");
		builder.append(enable);
		builder.append(", actionPermission=");
		builder.append(actionPermission);
		builder.append("]");
		return builder.toString();
	}
	
	

}
