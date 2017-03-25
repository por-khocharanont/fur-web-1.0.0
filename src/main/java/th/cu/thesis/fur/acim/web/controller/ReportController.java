package th.cu.thesis.fur.acim.web.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import th.cu.thesis.fur.web.model.Application;
import th.cu.thesis.fur.web.model.ApplicationReportParams;
import th.cu.thesis.fur.web.model.EligibleReportParams;
import th.cu.thesis.fur.web.model.Organize;
import th.cu.thesis.fur.web.model.UrReportParams;
import th.cu.thesis.fur.web.model.grid.BaseGridResponse;
import th.cu.thesis.fur.web.repository.model.UserInfo;
import th.cu.thesis.fur.web.service.ApplicationService;
import th.cu.thesis.fur.web.service.EligibleService;
import th.cu.thesis.fur.web.service.ReportService;
import th.cu.thesis.fur.web.service.exception.ServiceException;
import th.cu.thesis.fur.web.util.Utils;

import com.google.gson.GsonBuilder;

@Controller
@RequestMapping(value="/report")
public class ReportController {
	
	@Autowired
	ReportService reportService;
	@Autowired
	EligibleService eligibleService;
	@Autowired
	ApplicationService applicationService;
	// Application
	@RequestMapping(method = RequestMethod.GET)
	public String application(Authentication authentication, Model model) throws ServiceException {
		return "report/application";
	}
	
	@RequestMapping(value = "/serach/applist", method = RequestMethod.GET)
	public @ResponseBody BaseGridResponse searchApp(Authentication authentication,@RequestParam Map<String,String> param) throws ServiceException {
		param.put("requestBy", ((UserInfo) authentication.getPrincipal()).getUsername());
		return reportService.searchReport(param);
	}
	
	// SearchUR
	@RequestMapping(value = "/ur" ,method = RequestMethod.GET)
	public String reportUr(Authentication authentication, Model model) throws ServiceException {
		List<Map<String,String>> listFlow = reportService.getflowAll();
		model.addAttribute("flows", listFlow);
		return "report/ur";
	}
	
	@RequestMapping(value = "/serach/urlist", method = RequestMethod.GET)
	public @ResponseBody BaseGridResponse searchUr(Authentication authentication,@RequestParam Map<String,String> param) throws ServiceException {
		param.put("requestBy", ((UserInfo) authentication.getPrincipal()).getUsername());
		return reportService.searchUr(param);
	}
	
	// Eligible
	@RequestMapping(value = "/eligible" ,method = RequestMethod.GET)
	public String reportEligible(Authentication authentication, Model model) throws ServiceException {
		return "report/eligible";
	}
	
	@RequestMapping(value = "/serach/eligiblelist", method = RequestMethod.GET)
	public @ResponseBody BaseGridResponse searchEligible(Authentication authentication,@RequestParam Map<String,String> param) throws ServiceException {
		param.put("requestBy", ((UserInfo) authentication.getPrincipal()).getUsername());
		return reportService.searchEligible(param);
	}
	
	//Auto Complete
	@RequestMapping(value = "/eligible/autocomplete/orgcode", method = RequestMethod.GET)
	public @ResponseBody List<Organize> autoCompleteOrgcode(@RequestParam("orgCode") String orgCode) throws ServiceException {
		return eligibleService.getOrganizeByOrgCode(orgCode);
	}
	@RequestMapping(value = "/eligible/autocomplete/orgdesc", method = RequestMethod.GET)
	public @ResponseBody List<Organize> autoCompleteOrgdesc(@RequestParam("orgDesc") String orgDesc) throws ServiceException {
		return eligibleService.getOrganizeByOrgDesc(orgDesc);
	}
	@RequestMapping(value = "/applications/autocomplete/appname", method = RequestMethod.GET)
	public @ResponseBody List<Application> autoCompleteAppname(@RequestParam("appName") String appName) throws ServiceException {
		return applicationService.getApplicationByAppName(appName);
	}
	
	//Export Report
	@RequestMapping(value = "/export/applicationDefault", method = RequestMethod.POST)
	@ResponseBody
	public void exportExcelApplicationDefault(HttpServletResponse response,Authentication authentication,@RequestParam(name="jsonData",required=true) String jsonData) throws ServiceException {
		ApplicationReportParams paramsApp = new GsonBuilder().create().fromJson(jsonData, ApplicationReportParams.class);
		paramsApp.setRequestBy(((UserInfo) authentication.getPrincipal()).getUsername());
		reportService.exportExcelApplicationDefault(response,paramsApp);
	}
	
	@RequestMapping(value = "/export/UrDefault", method = RequestMethod.POST)
	@ResponseBody
	public void exportExcelUrDefault(HttpServletResponse response,Authentication authentication,@RequestParam(name="jsonData",required=true) String jsonData) throws ServiceException {
		UrReportParams paramsUr = Utils.getGsonDate().fromJson(jsonData, UrReportParams.class);
		paramsUr.setRequestBy(((UserInfo) authentication.getPrincipal()).getUsername());
		reportService.exportExcelUrDefault(response,paramsUr);
	}
	@RequestMapping(value = "/export/eligibleDefault", method = RequestMethod.POST)
	@ResponseBody
	public void exportExcelEligibleDefault(HttpServletResponse response,Authentication authentication,@RequestParam(name="jsonData",required=true) String jsonData) throws ServiceException {
		EligibleReportParams paramsUr = new GsonBuilder().create().fromJson(jsonData, EligibleReportParams.class);
		paramsUr.setRequestBy(((UserInfo) authentication.getPrincipal()).getUsername());
		reportService.exportExcelEligibleDefault(response,paramsUr);
	}
}
