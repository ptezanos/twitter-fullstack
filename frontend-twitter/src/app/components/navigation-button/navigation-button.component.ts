import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-button',
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./navigation-button.component.css']
})
export class NavigationButtonComponent implements OnInit {

  @Input() title!: string;
  @Input() pageName!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPage(){
    this.router.navigate([`${this.pageName}`]);
  }

}
