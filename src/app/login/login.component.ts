import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { AuthResponse } from '../models/authResponse';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  public formError: string = '';

  public credentials = {
    email: '',
    password: ''
  };

  public subscription: Subscription = new Subscription();

  public submitted = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) { }

public onLoginSubmit(): void {
  this.submitted = true;

  if (!this.credentials.email || !this.credentials.password) {
    this.formError = "All fields must be completed"
  }
  else {
    const user = new User(this.credentials.email, this.credentials.password)
    return this.loginUser(user);
  }
}


private loginUser(user: User) {

  const that = this;

  this.subscription = this.authService.loginUser(user).subscribe({
    next(response: AuthResponse) {
      that.authService.saveToken(response.token);
    },
    error(error: any) {
      console.error("Something went wrong", error);
      that.formError = "Invalid Credentials"
    },
    complete() {
      that.router.navigateByUrl('list-home');
    }
  })
}


public createAccount(): void {
  this.router.navigateByUrl('register');
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}

}


