import { UserService } from 'projects/user-login-form/service/user.service';
import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'projects/user-login-form/interface/user';
import { Router } from '@angular/router';
;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  userslist:User[]=[];
  hide = true;
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
      ),
    ]),
  });
  constructor(public userservice:UserService,private router:Router) {}
  login(f: any) {
    console.log(this.loginForm.value);
  }
  ngOnInit():void {
    this.userservice.getUserslist().subscribe((data: any)=>{
      this.userslist=data})
  }
  gotoSignUp(){
    this.router.navigate( ['SignUp']);
  }
}
