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
    this.addUserForm = this.formbuilder.group(
      {
        firstName: new FormControl('',[Validators.required]),
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
        validator: this.ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }
  submituser() {
    console.log(this.addUserForm.value);
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
