import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  user!: User;
  @Input() username!: string | null;
  @Output() answer = new EventEmitter<string>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.setUserByUsername(this.username!);
  }

  setUserByUsername(username: string): void {
    this.userService.getUserByUsername(username).subscribe((u) => {
      if (u) {
        localStorage.setItem('user', JSON.stringify(u));
        this.user = u;
      }
    });
  }

  getProfilePicFullRes(): string | undefined{
    return this.user.profile_image_url?.replace("_normal", "");
  }

  formatUsername(): string | undefined{
    return "@" + this.user.username;
  }

  formatID(): string | undefined{
    return "ID: " + this.user.id;
  }

  setAnswer(): void {
    this.answer.emit(this.user.name!);
  }

}
