package th.cu.thesis.fur.acim.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import th.cu.thesis.fur.web.service.exception.ServiceException;


@Controller
@RequestMapping("/admin")
public class AdminController {
	
	private final Logger logger = LoggerFactory.getLogger(AdminController.class);

	@RequestMapping(value = "applications", method = RequestMethod.GET)
	public String toAdminPage(Authentication authentication, Model model) throws ServiceException {
		return "admin/application/application.search";
	}
	
	@RequestMapping(value = "eligible", method = RequestMethod.GET)
	public String eligiblePage() throws ServiceException {
		logger.info("Eligible Controller");
		return "admin/eligible/eligible.search";
	}
	
}
