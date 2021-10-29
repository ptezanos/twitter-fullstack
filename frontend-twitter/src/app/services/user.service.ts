import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(
      `http://localhost:8080/userbyusername/?username=${username}`
    );
  }

  getUserByID(id: string): Observable<User> {
    return this.http.get<User>(
      `http://localhost:8080/userbyid/?id=${id}`
    );
  }
}
