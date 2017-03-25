package th.cu.thesis.fur.web.enums;

import java.util.HashMap;
import java.util.Map;

import th.cu.thesis.fur.web.uri.FurRestURI;

public enum URLService {

	LOGIN(FurRestURI.REST_FUR_WEB + "/login","LOGIN"),
	USERPROFILE(FurRestURI.REST_FUR_WEB + "/profile","USERPROFILE"), 
	USERREQUEST(FurRestURI.REST_FUR_WEB + "/userrequest/individual", "USERREQUEST"),
	URDETAIL(FurRestURI.REST_FUR_WEB + "/userrequest/ur/detail", "USERREQUEST"),
	REQUESTNODETAIL(FurRestURI.REST_FUR_WEB + "/userrequest/requestno/detail", "USERREQUEST"),
	TODOLISTS(FurRestURI.REST_FUR_WEB + "/todolist", "TODOLIST"),
	WATCHLISTS(FurRestURI.REST_FUR_WEB + "/watchlist", "WATCHLIST"),
	SEARCHUR(FurRestURI.REST_FUR_WEB + "/searchur", "searchur"),
	REPORT(FurRestURI.REST_FUR_WEB + "/report", "REPORT"),
	FLOWCONFIG(FurRestURI.REST_FUR_WEB + "/flowconfig","ADMIN"), 
	FLOWCONFIGFORMADD(FurRestURI.REST_FUR_WEB + "/flowconfig/addform","ADMIN"), 
	ADMINPANEL(FurRestURI.REST_FUR_WEB + "/admin/applications","ADMIN"),
	ELIGIBLE(FurRestURI.REST_FUR_WEB + "/admin/eligible","ADMIN");


	
	private URLService(String uri, String page) {
		this.uri = uri;
		this.page = page;
	}

	private static Map<String, URLService> map = new HashMap<String, URLService>();
	static {
		for (URLService e : values()) {
			map.put(e.uri, e);
		}
	}

	public static final URLService getUri(String uri) {
		return map.get(uri);
	}

	public static Map<String, URLService> getMap() {
		return map;
	}

	public static URLService getPageByUri(String uri){
		System.out.println("uuuuuuuuuuuuuu");
		for (URLService URLService : URLService.values()) {
			if (uri.contains(URLService.getUri()))
				return URLService;
		}
		return null;
	}

	private final String uri;
	private final String page;

	public String getUri() {
		return uri;
	}

	public String getPage() {
		return page;
	}

}
