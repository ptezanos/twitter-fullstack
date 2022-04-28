import { Component, OnInit, HostListener } from '@angular/core';
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

  noMoreTweets: boolean = false;

  requested: string = "";

  backTitle: string = "BACK TO MENU";
  backPageName: string = "";

  gridToggle: boolean = false;
  tweetpicHeight: number = 200;

  retweetsToggle: boolean = true;

  constructor(private userService: UserService, private tweetService: TweetService) { }

  ngOnInit(): void {
  }

  getProfilePicFullRes(pic: string): string | undefined{
    return pic?.replace("_normal", "");
  }

  getTweetPicFullRes(pic: string): string | undefined{
    return pic?.replace(".jpg", "?format=jpg&name=orig");
  }

  formatUsername(): string | undefined{
    return "@" + this.user.username;
  }

  formatID(): string | undefined{
    return "ID: " + this.user.id;
  }

  setUserByUsername(username: string): void {
    this.requested = "";
    this.tweetList = [];
    this.mediaList = [];
    this.noMoreTweets = false;
    this.userService.getUserByUsername(username).subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  getData(id: string, requested: string, retweets: boolean): void {
    this.requested = requested;
    this.noMoreTweets = false;
    this.tweetService
      .getTweets(id, retweets)
      .subscribe((twitterObject) => {
        if(twitterObject.data){
          this.tweetList = twitterObject.data;
        }
        if (requested === "pics"){
          if(twitterObject.includes?.media){
            this.mediaList = twitterObject.includes.media;
            for(let media of this.mediaList){
              const img = new Image();
              img.addEventListener("load", function() {
                media.resolution = this.naturalWidth + 'x' + this.naturalHeight;
              });
              img.src = this.getTweetPicFullRes(media.url!)!;
            }
          }
        }
      });
  }

  getMoreData(id: string, until_id: string, requested: string, retweets: boolean): void {
    this.tweetService
      .getMoreTweets(id, until_id, retweets)
      .subscribe((twitterObject) => {
        if(twitterObject.data){
          this.tweetList = this.tweetList.concat(twitterObject.data);
        } else {
          this.noMoreTweets = true;
        }
        if(requested === "pics"){
          if(twitterObject.includes?.media){
            this.mediaList = this.mediaList.concat(twitterObject.includes.media);
            for(let media of this.mediaList){
              const img = new Image();
              img.addEventListener("load", function() {
                media.resolution = this.naturalWidth + 'x' + this.naturalHeight;
              });
              img.src = this.getTweetPicFullRes(media.url!)!;
            }
          }
        }
      });
  }


  lastTweetID(){
    return this.tweetList[(this.tweetList.length-1)].id;
  }



  // getTweets(id: string): void {
  //   this.requested = "tweets";
  //   this.noMoreTweets = false;
  //   this.tweetService
  //     .getTweets(id)
  //     .subscribe((twitterObject) => {
  //       if(twitterObject.data){
  //         this.tweetList = twitterObject.data;
  //       }
  //     });
  // }

  // getMoreTweets(id: string, until_id: string): void {
  //   this.tweetService
  //     .getMoreTweets(id, until_id)
  //     .subscribe((twitterObject) => {
  //       if(twitterObject.data){
  //         this.tweetList = this.tweetList.concat(twitterObject.data);
  //       } else {
  //         this.noMoreTweets = true;
  //       }
  //     });
  // }



  // getPics(id: string): void {
  //   this.requested = "pics";
  //   this.noMoreTweets = false;
  //   this.tweetService
  //     .getTweets(id)
  //     .subscribe((twitterObject) => {
  //       if(twitterObject.data){
  //         this.tweetList = twitterObject.data;
  //       }
  //       if(twitterObject.includes?.media){
  //         this.mediaList = twitterObject.includes.media;
  //       }
  //     });
  // }

  // getMorePics(id: string, until_id: string): void {
  //   this.tweetService
  //     .getMoreTweets(id, until_id)
  //     .subscribe((twitterObject) => {
  //       if(twitterObject.data){
  //         this.tweetList = this.tweetList.concat(twitterObject.data);
  //       } else {
  //         this.noMoreTweets = true;
  //       }
  //       if(twitterObject.includes?.media){
  //         this.mediaList = this.mediaList.concat(twitterObject.includes.media);
  //       }
  //     });
  // }

  toggleGrid(): void {
    this.gridToggle = !this.gridToggle;
  }

  toggleRetweets(): void {
    this.requested = "";
    this.tweetList = [];
    this.mediaList = [];
    this.noMoreTweets = false;
    this.retweetsToggle = !this.retweetsToggle;
  }

  decreaseHeight(): void {
    if (this.tweetpicHeight >= 200){
      this.tweetpicHeight = this.tweetpicHeight - 100;
    } 
  }

  increaseHeight(): void {
    if (this.tweetpicHeight <= 900){
      this.tweetpicHeight = this.tweetpicHeight + 100;
    } 
  }

  @HostListener("window:scroll", ["$event"])
  onScroll() {
  //In chrome and some browser scroll is given to body tag
  let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
  let max = document.documentElement.scrollHeight;
  // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
   if(pos == max )   {
   //Do your action here
    if (this.requested=="tweets"){
      this.getMoreData(this.user.id!, this.lastTweetID()!, "tweets", this.retweetsToggle);
    } else if (this.requested=="pics"){
      this.getMoreData(this.user.id!, this.lastTweetID()!, "pics", this.retweetsToggle);
    }
   }
  }

}
