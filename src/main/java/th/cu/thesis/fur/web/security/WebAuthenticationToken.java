package th.cu.thesis.fur.web.security;

import java.util.Collection;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import th.cu.thesis.fur.web.repository.model.UserInfo;

public class WebAuthenticationToken extends UsernamePasswordAuthenticationToken {

	private static final long serialVersionUID = 1L;
	
	private UserInfo userInfo = null;

	public WebAuthenticationToken(Object principal, Object credentials) {
		super(principal, credentials);
	}
	
	
	public WebAuthenticationToken(Object principal, Object credentials,
			Collection<? extends GrantedAuthority> authorities) {
		super(principal, credentials, authorities);
	}

	public WebAuthenticationToken(Object principal, Object credentials, UserInfo userInfo, Collection<? extends GrantedAuthority> authorities) {
		super(principal, credentials, authorities);
		this.userInfo = userInfo;
		//setDetails(userInfo);
	}

}
