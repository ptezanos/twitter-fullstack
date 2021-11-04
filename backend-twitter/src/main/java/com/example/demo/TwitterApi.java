package com.example.demo;

import com.example.demo.model.TweetsObject;
import com.example.demo.model.UserObject;

import feign.Headers;
import feign.Param;
import feign.RequestLine;

public interface TwitterApi {
		
	@RequestLine("GET /2/users/by/username/{username}?user.fields=profile_image_url")
	@Headers("Authorization: Bearer {BEARER_TOKEN}")
	UserObject getUserByUsername(@Param("username") String username, @Param("BEARER_TOKEN") String BEARER_TOKEN);
	
	@RequestLine("GET /2/users/{id}?user.fields=profile_image_url")
	@Headers("Authorization: Bearer {BEARER_TOKEN}")
	UserObject getUserByID(@Param("id") String id, @Param("BEARER_TOKEN") String BEARER_TOKEN);
	
	@RequestLine("GET /2/users/{id}/tweets?expansions=attachments.media_keys&media.fields=url&max_results=100")
	@Headers("Authorization: Bearer {BEARER_TOKEN}")
	TweetsObject getRecentTweets(@Param("id") String id, @Param("BEARER_TOKEN") String BEARER_TOKEN);
	
	@RequestLine("GET /2/users/{id}/tweets?expansions=attachments.media_keys&media.fields=url&until_id={until_id}&max_results=100")
	@Headers("Authorization: Bearer {BEARER_TOKEN}")
	TweetsObject getMoreTweets(@Param("id") String id, @Param("until_id") String until_id, @Param("BEARER_TOKEN") String BEARER_TOKEN);
	
}
