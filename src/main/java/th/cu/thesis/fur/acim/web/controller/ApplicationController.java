package th.cu.thesis.fur.acim.web.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import th.cu.thesis.fur.acim.web.controller.model.AbstractWebRestController;
import th.cu.thesis.fur.web.model.Application;
import th.cu.thesis.fur.web.model.ApplicationForm;
import th.cu.thesis.fur.web.model.ApplicationRole;
import th.cu.thesis.fur.web.model.ApplicationRoleResponse;
import th.cu.thesis.fur.web.model.FileInfo;
import th.cu.thesis.fur.web.model.User;
import th.cu.thesis.fur.web.model.grid.AppOwnerTableInfo;
import th.cu.thesis.fur.web.model.grid.ApplicationAuthenticationCheckBox;
import th.cu.thesis.fur.web.model.grid.ApplicationGridResponse;
import th.cu.thesis.fur.web.model.grid.CustodianTableInfo;
import th.cu.thesis.fur.web.model.grid.EligibleTableInfo;
import th.cu.thesis.fur.web.service.ApplicationService;
import th.cu.thesis.fur.web.service.EligibleService;
import th.cu.thesis.fur.web.service.UserService;
import th.cu.thesis.fur.web.service.exception.MessageInfo;
import th.cu.thesis.fur.web.service.exception.ServiceException;
import th.cu.thesis.fur.web.util.Utils;

@Controller
@RequestMapping("/admin/applications")
public class ApplicationController extends AbstractWebRestController{

	@Autowired
	ApplicationService applicationService;

	@Autowired
	EligibleService eligibleService;
	
	@Autowired
	UserService userService;

	@RequestMapping(value = "/search", method = RequestMethod.GET)
	@ResponseBody
	public ApplicationGridResponse getSearchApplications(@RequestParam Map<String, String> params) throws ServiceException {
		ApplicationGridResponse applciationGridResponse = applicationService.getSearchApplications(params);
		return applciationGridResponse;
	}

	@RequestMapping(value = "/edit/{appId}", method = RequestMethod.GET)
	public String editPageApplication(@PathVariable("appId") String appId, Authentication authentication, Model model)
			throws ServiceException {
		Application application = applicationService.getApplicationById(appId);
		List<FileInfo> appFileList =  Utils.getFileInfoByApplicationFile(application.getAppFile());
		List<ApplicationAuthenticationCheckBox> authenCheckBox = applicationService.getAuthenticationByAppId(appId);
		List<ApplicationRole> applicationRole = applicationService.getApplicationRoleByAppId(appId).getApplicationRoleList();
		List<EligibleTableInfo> eligible = eligibleService.getEligibleByAppId(appId);
		AppOwnerTableInfo appOwner = applicationService.getAppOwnerDetailByAppId(appId);
		CustodianTableInfo custodian = applicationService.getCustodianDetailByAppId(appId);
		model.addAttribute("applicationModel", application);
		model.addAttribute("authenticationModel", authenCheckBox);
		model.addAttribute("appFileModel",appFileList);
		model.addAttribute("applicationRoleModel", applicationRole);
		model.addAttribute("eligibleModel", eligible);
		model.addAttribute("appOwnerModel", appOwner);
		model.addAttribute("custodianModel", custodian);
		
		return "admin/application/application.form.edit";
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public void createApplication(@RequestParam Map<String, Object> params, @RequestParam("fileUpload") List<MultipartFile> files) throws ServiceException {
		applicationService.insertApplication(params,files);
	}
	
	@RequestMapping(value="/update",method = RequestMethod.POST)
	@ResponseBody
	public void updateApplication(@RequestParam Map<String, Object> params, @RequestParam(value="fileUpload", required=false) List<MultipartFile> files) throws ServiceException {
		applicationService.updateApplication(params,files);
	}
	
	@RequestMapping(value = "/create", method = RequestMethod.GET)
	public String addPageApplication(Authentication authentication, Model model) throws ServiceException {
		return "admin/application/application.form.insert";
	}
	
	@RequestMapping(value = "/appname", method = RequestMethod.GET)
	public @ResponseBody List<Application> checkApplicationName(@RequestParam("appName") String appName)
			throws ServiceException {

		return applicationService.checkApplicationName(appName);
	}

	@RequestMapping(value = "/autocomplete/appname", method = RequestMethod.GET)
	public @ResponseBody List<Application> getApplicationsByAppName(@RequestParam("appName") String appName)
			throws ServiceException {

		return applicationService.getApplicationByAppName(appName);
	}
	
	@RequestMapping(value = "/autocomplete/username", method = RequestMethod.GET)
	public @ResponseBody List<User> getUserByUsernameAndFullName(@RequestParam("username") String username)
			throws ServiceException {
		return userService.getUserByUsernameAndFullName(username);
	}

	@RequestMapping(value = "/approlelist/appId", method = RequestMethod.GET)
	public @ResponseBody ApplicationRoleResponse getApplicationRoleByAppId(@RequestParam("appId") String appId)
			throws ServiceException {

		return applicationService.getApplicationRoleByAppId(appId);
	}
	
	@RequestMapping(value = "/approle/{appRoleId}", method = RequestMethod.DELETE)
	public @ResponseBody MessageInfo deleteApplicationRoleById(@PathVariable("appRoleId") String appRoleId) throws ServiceException {
		return applicationService.deleteApplicationRole(appRoleId);
	}
	
	@RequestMapping(value = "/approle", method = RequestMethod.POST)
	public @ResponseBody ApplicationRole insertApplicationRole(@RequestBody ApplicationRole appRole) throws ServiceException {
		return applicationService.insertApplicationRole(appRole);
	}
	
	@RequestMapping(value = "/approle", method = RequestMethod.PUT)
	public @ResponseBody void updateApplicationRole(@RequestBody ApplicationRole appRole) throws ServiceException {
		applicationService.updateApplicationRole(appRole);
	}
	
	@RequestMapping(value = "/eligible", method = RequestMethod.POST)
	public @ResponseBody EligibleTableInfo insertEligibleApplication(@RequestBody EligibleTableInfo eligible) throws ServiceException {
		return applicationService.insertEligibleApplication(eligible);
	}
	
	@RequestMapping(value = "/eligible", method = RequestMethod.PUT)
	public @ResponseBody EligibleTableInfo updateEligibleApplication(@RequestBody EligibleTableInfo eligible) throws ServiceException {
		return applicationService.updateEligibleApplication(eligible);
	}
	
	@RequestMapping(value = "/appowner", method = RequestMethod.PUT)
	@ResponseBody
	public void updateAppOwner(@RequestBody ApplicationForm jsonData) throws ServiceException {
		applicationService.updateAppOwner(jsonData);
	}
	
	@RequestMapping(value = "/custodian", method = RequestMethod.PUT)
	@ResponseBody
	public void updateCustodian(@RequestBody ApplicationForm jsonData) throws ServiceException {
		applicationService.updateCustodian(jsonData);
	}
	
	@RequestMapping(value="/eligible/{appId}", method = RequestMethod.GET)
	@ResponseBody 
	public List<EligibleTableInfo> reloadEligible(@PathVariable("appId") String appId) throws ServiceException{
		return eligibleService.getEligibleByAppId(appId);
	}
	
	
}
