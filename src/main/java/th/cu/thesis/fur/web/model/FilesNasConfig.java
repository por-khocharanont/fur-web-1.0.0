package th.cu.thesis.fur.web.model;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class FilesNasConfig implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4358321370391388272L;
	//Path Secondary
	public static final String UR_USER_PATH = "ur/user";
	public static final String UR_APPPROVER = "ur/approver";
	public static final String APP_TEMPLATE_APPNAME = "app/template/app_name";

	@Value("${nas.user}")
	private String userNas;
	
	@Value("${nas.pass}")
	private String passNas;	
	
	@Value("${nas.host}")
	private String hostNas;
	
	@Value("${nas.domain}")
	private String domainNas;
	
	@Value("${nas.upload.path}")
	private String pathPrimary;
	
	@Value("${jcifs.smb.lmCompatibility}")
	private String jcifsLmCompatibility;
	
	@Value("${jcifs.util.loglevel}")
	private String jcifsLoglevel;
	
	@Value("${jcifs.encoding}")
	private String jcifsEncoding;
	
	@Value("${jcifs.smb.client.useExtendedSecurity}")
	private String jcifsUseExtendedSecurity;
	
	@Value("${jcifs.resolveOrder}")
	private String jcifsResolveOrder;
	
	@Value("${jcifs.smb.client.dfs.disabled}")
	private String jcifsDisabled;
	
	
	public String getUserNas() {
		return userNas;
	}

	public void setUserNas(String userNas) {
		this.userNas = userNas;
	}

	public String getPassNas() {
		return passNas;
	}

	public void setPassNas(String passNas) {
		this.passNas = passNas;
	}

	public String getHostNas() {
		return hostNas;
	}

	public void setHostNas(String hostNas) {
		this.hostNas = hostNas;
	}

	public String getJcifsLmCompatibility() {
		return jcifsLmCompatibility;
	}

	public void setJcifsLmCompatibility(String jcifsLmCompatibility) {
		this.jcifsLmCompatibility = jcifsLmCompatibility;
	}

	public String getJcifsLoglevel() {
		return jcifsLoglevel;
	}

	public void setJcifsLoglevel(String jcifsLoglevel) {
		this.jcifsLoglevel = jcifsLoglevel;
	}

	public String getJcifsEncoding() {
		return jcifsEncoding;
	}

	public void setJcifsEncoding(String jcifsEncoding) {
		this.jcifsEncoding = jcifsEncoding;
	}

	public String getJcifsUseExtendedSecurity() {
		return jcifsUseExtendedSecurity;
	}

	public void setJcifsUseExtendedSecurity(String jcifsUseExtendedSecurity) {
		this.jcifsUseExtendedSecurity = jcifsUseExtendedSecurity;
	}

	public String getJcifsResolveOrder() {
		return jcifsResolveOrder;
	}

	public void setJcifsResolveOrder(String jcifsResolveOrder) {
		this.jcifsResolveOrder = jcifsResolveOrder;
	}

	public String getJcifsDisabled() {
		return jcifsDisabled;
	}

	public void setJcifsDisabled(String jcifsDisabled) {
		this.jcifsDisabled = jcifsDisabled;
	}

	public String getPathPrimary() {
		return pathPrimary;
	}

	public void setPathPrimary(String pathPrimary) {
		this.pathPrimary = pathPrimary;
	}

	public String getDomainNas() {
		return domainNas;
	}

	public void setDomainNas(String domainNas) {
		this.domainNas = domainNas;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("FilesNasConfig [userNas=");
		builder.append(userNas);
		builder.append(", passNas=");
		builder.append(passNas);
		builder.append(", hostNas=");
		builder.append(hostNas);
		builder.append(", domainNas=");
		builder.append(domainNas);
		builder.append(", pathPrimary=");
		builder.append(pathPrimary);
		builder.append(", jcifsLmCompatibility=");
		builder.append(jcifsLmCompatibility);
		builder.append(", jcifsLoglevel=");
		builder.append(jcifsLoglevel);
		builder.append(", jcifsEncoding=");
		builder.append(jcifsEncoding);
		builder.append(", jcifsUseExtendedSecurity=");
		builder.append(jcifsUseExtendedSecurity);
		builder.append(", jcifsResolveOrder=");
		builder.append(jcifsResolveOrder);
		builder.append(", jcifsDisabled=");
		builder.append(jcifsDisabled);
		builder.append("]");
		return builder.toString();
	}


}
