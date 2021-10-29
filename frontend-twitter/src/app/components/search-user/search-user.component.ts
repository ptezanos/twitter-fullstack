import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Tweet, User, MediaObject } from 'src/app/models';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

  user!: User;
  tweetList: Tweet[] = [];
  mediaList: MediaObject[] = [];

  backTitle: string = "BACK TO MENU";
  backPageName: string = "";

  constructor(private userService: UserService, private tweetService: TweetService) { }

  ngOnInit(): void {
  }

  getProfilePicFullRes(pic: string): string | undefined{
    return pic?.replace("_normal", "");
  }

  getTweetPicFullRes(pic: string): string | undefined{
    return pic + ":orig";
  }

  formatUsername(): string | undefined{
    return "@" + this.user.username;
  }

  formatID(): string | undefined{
    return "ID: " + this.user.id;
  }

  setUserByUsername(username: string): void {
    this.userService.getUserByUsername(username).subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
    this.tweetList = [];
    this.mediaList = [];
  }

  getTweets(id: string): void {
    this.tweetService
      .getTweets(id)
      .subscribe((twitterObject) => {
        this.mediaList = [];
        this.tweetList = twitterObject.data;
      });
  }

  getMoreTweets(id: string, until_id: string): void {
    this.tweetService
      .getMoreTweets(id, until_id)
      .subscribe((twitterObject) => {
        this.tweetList = this.tweetList.concat(twitterObject.data);
      });
  }

  lastTweetID(){
    return this.tweetList[(this.tweetList.length-1)].id;
  }


  getPics(id: string): void {
    this.tweetService
      .getTweets(id)
      .subscribe((twitterObject) => {
        this.tweetList = twitterObject.data;
        this.mediaList = twitterObject.includes.media;
      });
  }

  getMorePics(id: string, until_id: string): void {
    this.tweetService
      .getMoreTweets(id, until_id)
      .subscribe((twitterObject) => {
        this.tweetList = this.tweetList.concat(twitterObject.data);
        this.mediaList = this.mediaList.concat(twitterObject.includes.media);
      });
  }

}
