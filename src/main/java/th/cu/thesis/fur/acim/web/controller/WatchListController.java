package th.cu.thesis.fur.acim.web.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import th.cu.thesis.fur.web.log.LogFormater;
import th.cu.thesis.fur.web.model.grid.WatchListGridResponse;
import th.cu.thesis.fur.web.service.WatchListService;
import th.cu.thesis.fur.web.service.exception.ServiceException;

@Controller
@RequestMapping("/watchlist")
public class WatchListController{
	
	@Autowired
	WatchListService watchListService;

	@RequestMapping(method = RequestMethod.GET)
	public String WatchListPage() throws ServiceException {
		
		return "watchlist/watchlist";
	}
	
	@RequestMapping(value = "/searchWatchLists", method = RequestMethod.POST)
	public String getList(Authentication authentication, Model model) throws ServiceException {
		
		return "watchlists/watchlists";
	}
	
	@RequestMapping(value = "/search/grid", method = RequestMethod.GET)
	@ResponseBody
	public WatchListGridResponse searchGridWatchList(@RequestParam Map<String, String> params) throws ServiceException {
		
		return watchListService.searchGridWatchList(params);
	}
	
	@RequestMapping(value = "/ur/close", method = RequestMethod.POST)
	@ResponseBody
	public void closeUr(@RequestBody List<String> urIdList) throws ServiceException {
		
		watchListService.closeUr(urIdList);
	}
}

	
