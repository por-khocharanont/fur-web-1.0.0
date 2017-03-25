package th.cu.thesis.fur.web.service;

import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;

import th.cu.thesis.fur.web.model.ApplicationRole;
import th.cu.thesis.fur.web.model.Eligible;
import th.cu.thesis.fur.web.model.Organize;
import th.cu.thesis.fur.web.model.grid.EligibleGridResponse;
import th.cu.thesis.fur.web.model.grid.EligibleTableInfo;
import th.cu.thesis.fur.web.service.exception.ServiceException;

public interface EligibleService {
	
	public List<Organize> getOrganizeByOrgCode(String orgCode) throws ServiceException;
	
	public List<Organize> getOrganizeByOrgName(String orgName) throws ServiceException; 
	
	public List<Organize> getOrganizeByOrgDesc(String orgDesc) throws ServiceException; 
	
	public EligibleGridResponse getGridEligibleList(Map<String, String> params) throws ServiceException;
	
	public void createEligible(List<Eligible> eligibleList) throws ServiceException;
	
	public void deleteEligibleByIdList(List<String> eligibleIdList) throws ServiceException;
	
	public List<Eligible> getEligibleByAppRoleList(List<ApplicationRole> appRoleList) throws ServiceException;

	public List<EligibleTableInfo> getEligibleByAppId(String appId) throws ServiceException;
}
