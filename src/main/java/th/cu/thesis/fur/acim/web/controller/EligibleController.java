package th.cu.thesis.fur.acim.web.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import th.cu.thesis.fur.web.model.Eligible;
import th.cu.thesis.fur.web.model.Organize;
import th.cu.thesis.fur.web.model.grid.EligibleGridResponse;
import th.cu.thesis.fur.web.service.EligibleService;
import th.cu.thesis.fur.web.service.exception.ServiceException;


@Controller
@RequestMapping("/admin/eligible")
public class EligibleController {
	
	@Autowired
	EligibleService eligibleService;
	
	@RequestMapping(value = "createpage", method = RequestMethod.GET)
	public String eligibleCreatePage() throws ServiceException {
		
		return "admin/eligible/eligible.create";
	}
	
	@RequestMapping(value = "/search/grid", method = RequestMethod.GET)
	@ResponseBody
	public EligibleGridResponse getGridEligibleList(@RequestParam Map<String, String> params) throws ServiceException {
		
		return eligibleService.getGridEligibleList(params);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public void createEligible(@RequestBody List<Eligible> eligibleList) throws ServiceException {
		
		eligibleService.createEligible(eligibleList);
	}

	@RequestMapping(value = "/id/list", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteEligibleByIdList(@RequestBody List<String> eligibleIdList) throws ServiceException {
		
		eligibleService.deleteEligibleByIdList(eligibleIdList);
	}
	
	@RequestMapping(value = "/autocomplete/orgcode", method = RequestMethod.GET)
	@ResponseBody
	public List<Organize> getOrganizeByOrgCode(@RequestParam("orgCode") String orgCode) throws ServiceException{
		
		return eligibleService.getOrganizeByOrgCode(orgCode);
	}
	
	@RequestMapping(value = "/autocomplete/orgname", method = RequestMethod.GET)
	@ResponseBody
	public List<Organize> getOrganizeByOrgName(@RequestParam("orgName") String orgName) throws ServiceException{
		
		return eligibleService.getOrganizeByOrgName(orgName);
	}
	
	@RequestMapping(value = "/autocomplete/orgdesc", method = RequestMethod.GET)
	@ResponseBody
	public List<Organize> getOrganizeByOrgDesc(@RequestParam("orgDesc") String orgDesc) throws ServiceException{
		
		return eligibleService.getOrganizeByOrgDesc(orgDesc);
	}
}
