package th.cu.thesis.fur.acim.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import th.cu.thesis.fur.web.repository.model.UserInfo;
import th.cu.thesis.fur.web.service.UserService;
import th.cu.thesis.fur.web.service.exception.ServiceException;

@Controller
public class SearchURController {

	@Autowired
	UserService userService;

	@RequestMapping(value = "/searchur", method = RequestMethod.GET)
	public String toSearchUR(Authentication authentication, Model model) throws ServiceException {
		return "report/searchur";
	}
}
