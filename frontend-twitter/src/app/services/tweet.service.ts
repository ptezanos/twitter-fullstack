import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Tweet, TwitterObject } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  constructor(private http: HttpClient) {}

  getRandomTweet(id: string): Observable<Tweet> {
    return this.http.get<Tweet>(
      `http://localhost:8080/randomtweet/?id=${id}`
    );
  }


  getTweets(id: string): Observable<TwitterObject> {
    return this.http.get<TwitterObject>(
      `http://localhost:8080/tweets/?id=${id}`
    );
  }


  getMoreTweets(id: string, until_id: string): Observable<TwitterObject> {
    return this.http.get<TwitterObject>(
      `http://localhost:8080/moretweets/?id=${id}&until_id=${until_id}`
    );
  }

}
