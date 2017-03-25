package th.cu.thesis.fur.web.model;

import java.util.Map;

public class UserMenu {
	
	private static final String ENABLE = "1";
	private static final String DISABLE = "2";
	
	Map<String , RolePermission> userMenu;

	public Map<String, RolePermission> getUserMenu() {
		return userMenu;
	}

	public void setUserMenu(Map<String, RolePermission> userMenu) {
		this.userMenu = userMenu;
	}
	
	public Boolean hasMenu(String menu) {
		
		RolePermission role = userMenu.get(menu);
		
		if(role.getEnable().equals(ENABLE)){
			
			return true;
		}else{
			return false;
		}
		
		
	}
	
	public String getRoleCode(){
		
		String roleCode = "";
		for (Map.Entry<String , RolePermission> entry : userMenu.entrySet())
		{
			roleCode = entry.getValue().getRoleCode();
			break;
		}
		
		
		return roleCode;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("UserMenu [userMenu=");
		builder.append(userMenu);
		builder.append("]");
		return builder.toString();
	}
	
	

}
