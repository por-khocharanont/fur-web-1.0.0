package th.cu.thesis.fur.web.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import th.cu.thesis.fur.web.model.Application;
import th.cu.thesis.fur.web.model.ApplicationForm;
import th.cu.thesis.fur.web.model.ApplicationRole;
import th.cu.thesis.fur.web.model.ApplicationRoleResponse;
import th.cu.thesis.fur.web.model.grid.AppOwnerTableInfo;
import th.cu.thesis.fur.web.model.grid.ApplicationAuthenticationCheckBox;
import th.cu.thesis.fur.web.model.grid.ApplicationGridResponse;
import th.cu.thesis.fur.web.model.grid.CustodianTableInfo;
import th.cu.thesis.fur.web.model.grid.EligibleTableInfo;
import th.cu.thesis.fur.web.service.exception.MessageInfo;
import th.cu.thesis.fur.web.service.exception.ServiceException;


public interface ApplicationService {

	public ApplicationGridResponse getSearchApplications(Map<String,String> params) throws ServiceException;
	
	public Application getApplicationById(String appId) throws ServiceException;
	
	public void insertApplication(Map<String,Object> params,List<MultipartFile> files) throws ServiceException;
	
	public void updateApplication(Map<String,Object> params,List<MultipartFile> files) throws ServiceException;
	
	public List<Application> getApplicationByAppName(String appName) throws ServiceException;
	
	public List<Application> checkApplicationName(String appName) throws ServiceException;
	
	public ApplicationRoleResponse getApplicationRoleByAppId(String appId) throws ServiceException;
	
	public List<ApplicationAuthenticationCheckBox> getAuthenticationByAppId(String appId) throws ServiceException;

	public AppOwnerTableInfo getAppOwnerDetailByAppId(String appId) throws ServiceException;
	
	public CustodianTableInfo getCustodianDetailByAppId(String appId) throws ServiceException;
	
	public MessageInfo deleteApplicationRole(String appRoleId) throws ServiceException;
	
	public ApplicationRole insertApplicationRole(ApplicationRole appRole) throws ServiceException;
	
	public void updateApplicationRole(ApplicationRole appRole) throws ServiceException;
	
	public EligibleTableInfo insertEligibleApplication(EligibleTableInfo eligible) throws ServiceException;
	
	public EligibleTableInfo updateEligibleApplication(EligibleTableInfo eligible) throws ServiceException;

//	public Integer deleteApplication(String appRoleId) throws ServiceException;
	
	public void updateAppOwner(ApplicationForm jsonData) throws ServiceException;
	
	public void updateCustodian(ApplicationForm jsonData) throws ServiceException;
}
