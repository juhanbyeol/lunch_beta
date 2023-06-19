package com.ione.landing.ui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LunchUiController {
	
	@RequestMapping("/lunch")
	public ModelAndView landingPlan() {
		ModelAndView model = new ModelAndView();
		long millis = System.currentTimeMillis();
		model.addObject("millis", millis);
		model.setViewName("lunch/lunch");
		return model;
	}

}
