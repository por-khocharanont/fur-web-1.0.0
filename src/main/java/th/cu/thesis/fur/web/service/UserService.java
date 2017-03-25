package th.cu.thesis.fur.web.service;

import java.util.List;
import java.util.Map;

import th.cu.thesis.fur.web.model.RolePermission;
import th.cu.thesis.fur.web.model.User;
import th.cu.thesis.fur.web.model.UserMenu;
import th.cu.thesis.fur.web.model.grid.UserApplicationInfoGridResponse;
import th.cu.thesis.fur.web.model.grid.UserTokenInfoGridResponse;
import th.cu.thesis.fur.web.repository.model.UserInfo;
import th.cu.thesis.fur.web.service.exception.ServiceException;

public interface UserService {
	
	public UserInfo authUser(String username, String password,String ipAddress) throws ServiceException;
	
	public User getProfile(String username) throws ServiceException;
	
	public User getProfileByUserId(String userId) throws ServiceException;
	
	public List<User> getUserByUsernameAndFullName(String username) throws ServiceException;
	
	public UserApplicationInfoGridResponse getApplicationByType(String type,Map<String,String> params,String username) throws ServiceException;

	public int countApplicationByType(String type,String username) throws ServiceException;
	
	public int countTokenApplication(String username) throws ServiceException;
	
	public UserTokenInfoGridResponse getApplicationByUserToken(Map<String,String> params,String username) throws ServiceException;
	
	public UserMenu getUserMenu() throws ServiceException;
	
	public List<RolePermission> getRole() throws ServiceException;
	
}
