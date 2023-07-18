import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SiteUsersService } from '../../services/site-users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(public router: Router, public SService: SiteUsersService) {}

  check = true;
  closedValid = false;
  closedAuthed = false;
  registeredUsers: any;
  authedUser: any;
  registered = true;

  validation = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  // returns true if valid email
  validEmail() {
    return this.validation.controls.email.valid;
  }

  // returns true if valid password
  validPass() {
    return this.validation.controls.password.valid;
  }

  ngOnInit(): void {
    localStorage.setItem('authed', 'false');

    // getting all users' data
    this.SService.getRegisteredUsers().subscribe({
      next: (data) => {
        // console.log(data);
        // console.log(this.validation.controls.email.value)
        this.registeredUsers = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // redirects to home page if valid login and user is registered
  login() {
    this.authedUser = this.registeredUsers.filter(
      (authedUser: any) =>
        authedUser.email == this.validation.controls.email.value &&
        authedUser.password == this.validation.controls.password.value
    );

    // valid input and user is registered
    if (this.validation.valid && this.authedUser.length) {
      this.router.navigate(['/users']);
      // for guarded routes
      localStorage.setItem('authed', 'true');
    }
    // not valid inputs
    else if (
      !this.validation.valid ||
      !this.validation.controls.email.value ||
      !this.validation.controls.password.value
    ) {
      this.check = false;
      this.closedValid = false;
      // this.closedAuthed = false;
      localStorage.setItem('authed', 'false');
    }
    // valid inputs but user isn't registered
    else if (this.authedUser.length == 0) {
      this.registered = false;
      // this.closedValid = false;
      this.closedAuthed = false;
      localStorage.setItem('authed', 'false');
    }
  }
}
