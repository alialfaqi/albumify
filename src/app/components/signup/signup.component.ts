import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SiteUsersService } from '../../services/site-users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(public SService: SiteUsersService, public router: Router) {
    localStorage.setItem('authed', 'false');
  }

  validation = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'),
    ]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  check = true;
  closed = false;
  user: any;

  // returns true if valid email
  validEmail() {
    return this.validation.controls.email.valid;
  }

  // returns true if valid password
  validPass() {
    return this.validation.controls.password.valid;
  }

  // registers new users to redirect them to home page
  signup() {
    if (this.validation.valid) {
      this.user = this.validation.value;
      this.user.id = new Date().valueOf();
      this.SService.addUser(this.user).subscribe();
      this.router.navigate(['/users']);
      // console.log(this.user);
      localStorage.setItem('authed', 'true');
    } else {
      this.check = false;
      this.closed = false;
      localStorage.setItem('authed', 'false');
    }
  }
}
