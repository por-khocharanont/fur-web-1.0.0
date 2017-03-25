package th.cu.thesis.fur.web.util;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import jcifs.smb.NtlmPasswordAuthentication;
import jcifs.smb.SmbFile;
import jcifs.smb.SmbFileOutputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;


@Component
public class FlieUtils {
	
	@Value("${nas.host}")
	private String nasHost;
	
	@Value("${nas.user}")
	private String nasUser;
	
	@Value("${nas.pass}")
	private String nasPass;	
	
	@Value("${nas.domain}")
	private String nasDomain;
	
	@Value("${nas.upload.path}")
	private String nasUploadPath;
	
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
	
	@Autowired
	private Utils utils;
	
	public static String NAS_UPLOAD_TEMPLATE_PATH = null;
	
	@PostConstruct
	public void init() {
		this.NAS_UPLOAD_TEMPLATE_PATH = nasHost + nasUploadPath;
	}

	public boolean saveFileToNas(String pathFile, MultipartFile file) {
		List<MultipartFile> files = new ArrayList<MultipartFile>();
		files.add(file);
		return this.saveFileToNas(pathFile, files);
	}
	
	public boolean saveFileToNas(String pathFile, List<MultipartFile> files) {
		boolean status = false;
		SmbFile dir = connectNas(pathFile);
		SmbFileOutputStream stream;
		
		try {
			if(!dir.exists()) {
				dir.mkdirs();
			}
			
			for(MultipartFile file : files) {
				if(file.getSize() > 0){
					byte[] bytes = file.getBytes();
					SmbFile serverFile = connectNas(pathFile + file.getOriginalFilename().replace(" ","_"));
					stream = new SmbFileOutputStream(serverFile);
	                stream.write(bytes);
	                stream.close();
				}
			}
			
			status = true;
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return status;	
	}
	
	public SmbFile connectNas(String pathFile) {
		jcifs.Config.setProperty("jcifs.smb.lmCompatibility", jcifsLmCompatibility);
		jcifs.Config.setProperty("jcifs.util.loglevel", jcifsLoglevel);
//		jcifs.Config.setProperty("jcifs.encoding", jcifsEncoding);
		jcifs.Config.setProperty("jcifs.smb.client.useExtendedSecurity", jcifsUseExtendedSecurity);
		jcifs.Config.setProperty("jcifs.resolveOrder", jcifsResolveOrder);
		jcifs.Config.setProperty("jcifs.smb.client.dfs.disabled", jcifsDisabled);
		
		String url = "smb://" + pathFile;
		
		NtlmPasswordAuthentication auth = new NtlmPasswordAuthentication(nasDomain, nasUser, nasPass);
		SmbFile dir = null;
		
		try {
			dir = new SmbFile(url, auth);	
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return dir;
	}
}
