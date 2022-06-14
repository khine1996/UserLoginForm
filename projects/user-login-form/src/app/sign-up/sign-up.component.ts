import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  hide1: boolean = true;
  hide2: boolean = true;
  success = '';
  addUserForm;

  constructor(private formbuilder: FormBuilder) {
    this.addUserForm = this.formbuilder.group({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl(),
      gender: new FormControl(),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,

      ]),
    },
    {
      validator: this.ConfirmedValidator('password', 'confirmPassword'),
    }
    );
  }
  // {
  //   Validators: this.mustMatch('password', 'confirmPassword'),
  // }

  openSnackBar() {
    // this._snackBar.open('Register Successfully', 'OK', {
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    // });
  }

  // Register(x: any) {
  //   console.log(x);
  // }

  submituser() {
    console.log(this.addUserForm.value);
  }
  // get f() {
  //   return this.addUserForm.controls;
  // }
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

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (!control.value || !matchingControl.value) {
        // if the password or confirmation has not been inserted ignore
        return null;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }

}
