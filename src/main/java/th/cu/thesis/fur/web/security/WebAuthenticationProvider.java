package th.cu.thesis.fur.web.security;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

import th.cu.thesis.fur.web.repository.model.UserInfo;
import th.cu.thesis.fur.web.service.UserService;
import th.cu.thesis.fur.web.service.exception.ServiceException;


public class WebAuthenticationProvider implements AuthenticationProvider {

	private final Logger logger = LoggerFactory.getLogger(WebAuthenticationProvider.class);
	
	public static final String SESSION_USER_MENU = "SESSION_USER_MENU";
	public static final String SESSION_USER_ROLE = "SESSION_USER_ROLE";
	public static final String BACK_OFFICE = "1";
	
//	private LogUtils logUtils;	
	
	public WebAuthenticationProvider() {
		super();
//		this.logUtils = new LogUtils();
	}
	
	@Autowired
	private UserService userService;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {		
		String username = authentication.getPrincipal().toString();
		String password = authentication.getCredentials().toString();
		
		WebAuthenticationDetails details = (WebAuthenticationDetails) authentication.getDetails();
		String ipAddress = details.getRemoteAddress();	
		
		Authentication auth = null;
		try {
			UserInfo userInfo = userService.authUser(username, password, ipAddress);
			
			if(userInfo == null || !(userInfo.getOrgType().equalsIgnoreCase(BACK_OFFICE))){
				throw new UsernameNotFoundException("10002");
			}
			
			if(userInfo != null){
				List<GrantedAuthority> grantedAuths = new ArrayList<GrantedAuthority>();
				grantedAuths.add(new SimpleGrantedAuthority("ROLE_USER"));
				auth = new UsernamePasswordAuthenticationToken(userInfo, password, grantedAuths);
			}
			
		} catch (ServiceException e) {
			throw new UsernameNotFoundException(e.getMessage());
		}
			

		return auth;

	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

}