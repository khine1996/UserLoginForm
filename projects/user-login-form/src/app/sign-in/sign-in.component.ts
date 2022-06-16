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
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  userslist: User[] = [];
  hide = true;
  loginForm: any = FormGroup;
  constructor(
    public userservice: UserService,
    private router: Router,
    private formbuilder: FormBuilder
  ) {
    this.loginForm = this.formbuilder.group({
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
  }
  login(data: any) {
    // console.log(this.loginForm.value);

    if (data.email) {
      this.userslist.forEach((item) => {
        if (item.email == data.email && item.password == data.password) {
          console.log('User is Valid');
        } else  {
          console.log('User is Invalid');
        }
      });
    }
  }
  ngOnInit(): void {
    this.userservice.getUserslist().subscribe((data: any) => {
      this.userslist = data;
    });
  }
  gotoSignUp() {
    this.router.navigate(['SignUp']);
  }
}
