import { environment } from './../src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}
  getUserslist() {
    const httpHeader=new HttpHeaders();
    httpHeader.append('content-type','application/json')
    return this.http.get<User[]>(`http://localhost:3000/users`);
  }
  createUser(data: User) {
    const httpHeaders=new HttpHeaders();
    httpHeaders.append('content-type','application/json');
    return this.http.post<User>(`http://localhost:3000/users`, data);
  }
  // getUserExistStatus(email:User) {
  //   const url = "http://localhost:3000/users"+email;
  //   return this.http.get<User[]>(`http://localhost:3000/users`);
  // }

}
