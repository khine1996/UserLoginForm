import { Component } from '@angular/core';
import { UserService } from 'projects/user-login-form/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UserLoginForm';
  user: any;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.onGetUsers();
  }
  onGetUsers(): void {
    this.userService.getUserslist().subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done getting users')
    );
  }
  // onCreateUser(): void {
  //   this.userService.createUser(this.user).subscribe(
  //     (response) => console.log(response),
  //     (error: any) => console.log(error),
  //     () => console.log('Done creating user')
  //   );
  // }
}

