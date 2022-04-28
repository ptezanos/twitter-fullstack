package com.example.demo.controller;

import java.io.File;
import java.util.Random;
import java.util.Scanner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.TwitterApi;
import com.example.demo.model.Tweet;
import com.example.demo.model.TweetsObject;
import com.example.demo.model.User;
import com.example.demo.model.UserObject;

import feign.FeignException;

@RestController
public class Controller {
	
	@Autowired
	TwitterApi twitterApi;
	
	@CrossOrigin
	@GetMapping("/userbyusername")
	public User getUserByUsername(@RequestParam String username) {
		System.out.println(username);
		try {
			UserObject userObject = twitterApi.getUserByUsername(username, getBearerToken());
			User user = userObject.getData();
			return user;
		} catch (FeignException exception) {
			return null;
		}
	}
	
	@CrossOrigin
	@GetMapping("/userbyid")
	public User getUserByID(@RequestParam String id) {
		try {
			UserObject userObject = twitterApi.getUserByID(id, getBearerToken());
			User user = userObject.getData();
			return user;
		} catch (FeignException exception) {
			return null;
		}
	}
	
	
	@CrossOrigin
	@GetMapping("/tweets")
	public TweetsObject getTweets(@RequestParam String id, @RequestParam Boolean retweets) {
		try {
			if(retweets) {
				return twitterApi.getRecentTweets(id, getBearerToken());
			} else {
				return twitterApi.getRecentTweetsNoRetweets(id, getBearerToken());
			}
		} catch (FeignException exception) {
			System.out.println(exception);
			return null;
		}
	}
	

	@CrossOrigin
	@GetMapping("/moretweets")
	public TweetsObject getMoreTweets(@RequestParam String id, @RequestParam String until_id, @RequestParam Boolean retweets) {
		try {
			if(retweets) {
				return twitterApi.getMoreTweets(id, until_id, getBearerToken());
			} else {
				return twitterApi.getMoreTweetsNoRetweets(id, until_id, getBearerToken());
			}
		} catch (FeignException exception) {
			System.out.println(exception);
			return null;
		}
	}
	
	
	@CrossOrigin
	@GetMapping("/randomtweet")
	public Tweet getRandomTweet(@RequestParam String id) {
		try {
			TweetsObject tweetsObject = twitterApi.getRecentTweets(id, getBearerToken());
			Tweet[] tweets = tweetsObject.getData();
			Random random = new Random();
			return tweets[random.nextInt(tweets.length)];
		} catch (FeignException exception) {
			System.out.println(exception);
			return null;
		}
	}
	
	public static String getBearerToken() {
		try {
			File file = new File(String.format("C:/Users/%s/Documents/bearer_token.txt", System.getProperty("user.name")));
			Scanner scanner = new Scanner(file);
			String BEARER_TOKEN = scanner.nextLine();
			scanner.close();
			return BEARER_TOKEN;
		} catch(Exception e) {
			System.out.println(e);
		}
		return "";
	}

}
