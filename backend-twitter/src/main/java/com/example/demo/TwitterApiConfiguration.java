package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//import com.google.gson.FieldNamingPolicy;
//import com.google.gson.Gson;
//import com.google.gson.GsonBuilder;


import feign.Feign;
import feign.gson.GsonDecoder;
import feign.gson.GsonEncoder;

@Configuration
public class TwitterApiConfiguration {
	
	@Bean
	public TwitterApi setTwitterApi() {
		TwitterApi twitterApi = Feign.builder()
				.decoder(new GsonDecoder())
				.encoder(new GsonEncoder())
				.target(TwitterApi.class, "https://api.twitter.com");
		
		return twitterApi;
	}

}
