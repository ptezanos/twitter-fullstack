import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  quizTitle: string = "PLAY TWITTER QUIZ";
  quizPageName: string = "game";

  searchTitle: string = "SEARCH TWITTER USER";
  searchPageName: string = "search-user";

  constructor(private router: Router) { 
  }

  ngOnInit(): void {}

  
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }


}
