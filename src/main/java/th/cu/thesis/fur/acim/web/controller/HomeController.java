package th.cu.thesis.fur.acim.web.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import th.cu.thesis.fur.web.model.RolePermission;
import th.cu.thesis.fur.web.model.UserMenu;
import th.cu.thesis.fur.web.security.WebAuthenticationProvider;
import th.cu.thesis.fur.web.service.UserService;
import th.cu.thesis.fur.web.service.exception.ServiceException;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	UserService userService;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Authentication authentication, Model model, HttpSession session) throws ServiceException {
		
		UserMenu userMenu = userService.getUserMenu();
		List<RolePermission> rolePermission = userService.getRole();
		String userRole = null;
		if(rolePermission!=null){
			userRole = rolePermission.get(0).getRoleCode();
		}
		session.setAttribute(WebAuthenticationProvider.SESSION_USER_ROLE, userRole);
		session.setAttribute(WebAuthenticationProvider.SESSION_USER_MENU, userMenu);
		
		return "redirect:/watchlist";
	}
	
}
