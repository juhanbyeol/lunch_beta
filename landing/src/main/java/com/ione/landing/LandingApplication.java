package com.ione.landing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class LandingApplication extends SpringBootServletInitializer{
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(LandingApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(LandingApplication.class, args);
	}

}

//@SpringBootApplication
//public class LandingApplication {
//
//	public static void main(String[] args) {
//		SpringApplication.run(LandingApplication.class, args);
//	}
//
//}
