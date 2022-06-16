import { ConfirmedValidator } from './../confirmed.validator';
import { User } from 'projects/user-login-form/interface/user';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { UserService } from 'projects/user-login-form/service/user.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  hide1: boolean = true;
  hide2: boolean = true;
  success = '';
  addUserForm: any = FormGroup;
  userslist: User[] = [];

  constructor(
    private formbuilder: FormBuilder,
    public userservice: UserService,
    private router: Router
  ) {
    this.addUserForm = this.formbuilder.group(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
        address: new FormControl(),
        gender: new FormControl(),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validator: ConfirmedValidator.confirmedValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }
  addnewuser(f: any) {
    const newformdata = {
      firstname: f.value.firstName,
      lastname: f.value.lastName,
      address: f.value.address,
      gender: f.value.gender,
      email: f.value.email,
      password: f.value.password,
    };
    // console.log(newformdata);

    this.userservice.createUser(newformdata).subscribe((data) => {
      console.log(data);
    });

    // this.userservice
    //   .getUserExistStatus(newformdata.email)
    //   .pipe(finalize(() => {}))
    //   .subscribe(
    //     (res) => {
    //       if ((newformdata.email = this.userslist)) {
    //         alert('User Already Exist');
    //       }
    //     },
    //     (err) => {}
    //   );
  }

  // mustMatch(form: FormGroup) {
  //   return (formgroup: FormGroup) => {
  //     const password = form.controls['password'].value;
  //     const confirmation = form.controls['confirmPassword'].value;
  //     if (!password || !confirmation) {
  //       // if the password or confirmation has not been inserted ignore
  //       return null;
  //     }

  //     if (confirmation.length > 0 && confirmation !== password) {
  //       confirmation.setErrors({ notMatch: true }); // set the error in the confirmation input/control
  //     }

  //     return null; // always return null here since as you'd want the error displayed on the confirmation input
  //   };
  // }
  ngOnInit(): void {
    this.userservice.getUserslist().subscribe((data: any) => {
      this.userslist = data;
    });
  }
  gotoSignIn() {
    this.router.navigate(['SignIn']);
  }
  // CheckUserExist(f:any) {

  //   this.userservice.getUserExistStatus(f.value.email).pipe(finalize(() => {
  //   })).subscribe(res => {
  //     if(res){
  //        alert("User Already Exist")
  //    }
  //   }, err => {
  //   });
  // }
}
