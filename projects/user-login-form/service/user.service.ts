import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
  getUserslist() {
    return this.http.get(`http://localhost:3000/users`);
  }
  createUser(data: User) {
    // const httpHeaders=new HttpHeaders();
    // httpHeaders.append('content-type','application/json');
    return this.http.post<User[]>(`http://localhost:3000/users`, data);
  }
  // getUserslist() {
  //   return this.http.get(`http://localhost:3000'/users`);
  //   const httpHeaders=new HttpHeaders();
  //   httpHeaders.append('content-type','application/json');

  // }}
}
