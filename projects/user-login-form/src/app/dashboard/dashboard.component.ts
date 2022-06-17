import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'projects/user-login-form/interface/user';
import { UserService } from 'projects/user-login-form/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userslist: User[] = [];

  constructor(public userservice: UserService,private router:Router) {}

  ngOnInit(): void {
    this.userservice.getUserslist().subscribe((data: any) => {
      this.userslist = data;
    });
  }
  logout(f:any){
    this.router.navigate(['SignIn']);
  }
  }

