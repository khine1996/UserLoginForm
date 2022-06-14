import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'projects/user-login-form/interface/user';
import { UserService } from 'projects/user-login-form/service/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  users: User[] = [];
  hide = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router, private userservice: UserService) {}
  login(f: any) {
    console.log(this.loginForm.value);

    // localStorage.setItem('user', this.loginForm.value);
    // this.router.navigate(['/home']);
  }
  ngOnInit() {
    // this.userservice.getUserslist().subscribe((users)=>(this.users=users));
  }
}

