package com.ione.landing.ui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class LandingController {
	//랜딩 홈
	@RequestMapping("/")
	public ModelAndView landingIndex() {
		ModelAndView model = new ModelAndView();
		long millis = System.currentTimeMillis();
		model.addObject("millis", millis);
		model.setViewName("landing/landing");
		return model;
	}
	
	//플랜
	@RequestMapping("/landing/plan")
	public ModelAndView landingPlan() {
		ModelAndView model = new ModelAndView();
		long millis = System.currentTimeMillis();
		model.addObject("millis", millis);
		model.setViewName("landing/plan");
		return model;
	}
	
	//플랜1 - 2023.06.15 추가(옵티마이저에서 설정 가능[GA])
	@RequestMapping("/landing/plan1")
	public ModelAndView landingPlan1() {
		ModelAndView model = new ModelAndView();
		long millis = System.currentTimeMillis();
		model.addObject("millis", millis);
		model.setViewName("landing/plan1");
		return model;
	}
	
	//hobti
	@RequestMapping("/landing/hobti")
	public ModelAndView landingHobti() {
		ModelAndView model = new ModelAndView();
		long millis = System.currentTimeMillis();
		model.addObject("millis", millis);
		model.setViewName("landing/hobti");
		return model;
	}
	
	//result
	@RequestMapping("/landing/result")
	public ModelAndView landingResult() {
		ModelAndView model = new ModelAndView();
		long millis = System.currentTimeMillis();
		model.addObject("millis", millis);
		model.setViewName("landing/result");
		return model;
	}
	
	//type
	@RequestMapping("/landing/type")
	public ModelAndView landingType() {
		ModelAndView model = new ModelAndView();
		long millis = System.currentTimeMillis();
		model.addObject("millis", millis);
		model.setViewName("landing/type");
		return model;
	}
}
