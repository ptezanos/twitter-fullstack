import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TweetService } from 'src/app/services/tweet.service';
import { User } from 'src/app/models';
import { Tweet } from 'src/app/models';
import { GROUP } from 'src/app/group';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  backTitle: string = "BACK TO MENU";
  backPageName: string = "";

  user!: User;
  selected!: User;
  randomTweet!: Tweet;

  subgroup: User[] = new Array;

  answer!: string;
  result!: string;
  rightAnswer! : boolean;

  score!: number;
  counter!: number;
  alreadyChecked!: boolean;
  inGame!: boolean;

  

  constructor(private userService: UserService, private tweetService: TweetService) { 
  }

  ngOnInit(): void {
    this.score = 0;
    this.counter = 0;
  }


  setUserByUsername(username: string): void {
    this.userService.getUserByUsername(username).subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  setSelectedByUsername(username: string): void {
    console.log("setSelectedByUsername: " + username);
    this.userService.getUserByUsername(username).subscribe((user) => {
      if (user) {
        this.selected = user;
        this.setRandomTweetByID(this.selected.id!);
      }
    });
  }

  setUserByID(id: string): void {
    this.userService.getUserByID(id).subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  setSubgroup() {
    this.shuffleArray(GROUP)
    this.subgroup[0] = GROUP[0];
    this.subgroup[1] = GROUP[1];
    this.subgroup[2] = GROUP[2];
    this.subgroup[3] = GROUP[3];
    console.log(this.subgroup);
  }

  shuffleArray(array: User[]) {
    for (let i = array.length-1; i>0; i--){
      const j = Math.floor(Math.random()*(i+1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  getRandomUser(array: User[]): string{
    let randomIndex: number = Math.floor(Math.random() * array.length);
    let randomUsername: string = array[randomIndex].username!;
    return randomUsername;
  }

  startQuiz(): void {
    this.inGame = true;
    this.score = 0;
    this.counter = 0;
    this.randomize();
  }

  randomize(): void{
    this.subgroup = [];
    this.randomTweet = {text:null, id:null};
    this.setSubgroup();
    let randomUsername = this.getRandomUser(this.subgroup);
    this.setSelectedByUsername(randomUsername);
    this.result = "";
    this.alreadyChecked = false;
  }

  setRandomTweetByID(id: string) {
    this.tweetService.getRandomTweet(id).subscribe((tweet) => {
      if (tweet) {
        this.randomTweet = tweet;
      }
    });
  }

  checkAnswer(answerReceived: string){
    this.answer = answerReceived;
    if(this.selected.name==this.answer){
      this.result="Right";
      this.rightAnswer = true;
      if(!this.alreadyChecked){
        this.alreadyChecked = true;
        this.counter++;
        this.score++;
      }
    } else {
      this.result = "Wrong";
      this.rightAnswer = false;
      if(!this.alreadyChecked){
        this.alreadyChecked = true;
        this.counter++;
      }
    }
    if(this.counter>=10){
      this.inGame = false;
    }
  }

}
