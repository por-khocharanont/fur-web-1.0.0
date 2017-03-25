package th.cu.thesis.fur.acim.web.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import th.cu.thesis.fur.web.model.grid.FlowconfigGridResponse;
import th.cu.thesis.fur.web.service.FlowConfigService;
import th.cu.thesis.fur.web.service.exception.ServiceException;

@Controller
public class FlowconfigController {
	
	@Autowired
	FlowConfigService flowconfigservice;
	
	
	@RequestMapping(value = "/flowconfig", method = RequestMethod.GET)
	public String toLogin() {
		return "admin/flowconfig/flowconfig.search";
	}
	
	@RequestMapping(value = "/flowconfig/search", method = RequestMethod.GET)
	@ResponseBody
	public FlowconfigGridResponse getSearchFlowConfig(@RequestParam Map<String, String> params,
			Authentication authentication, Model model) throws ServiceException {
		FlowconfigGridResponse flowconfigGridResponse = flowconfigservice.getSearchFlowconfig(params);
		return flowconfigGridResponse;
	}
	
	@RequestMapping(value = "/flowconfig/addform", method = RequestMethod.GET)
	public String addFormFlowConfig() throws ServiceException {
		return "admin/flowconfig/flowconfig.formadd";
	}
}
