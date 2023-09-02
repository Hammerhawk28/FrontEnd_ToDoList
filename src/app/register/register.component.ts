import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AuthResponse } from '../models/authResponse';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {

public formError = '';

public credentials = {
  email: '',
  username: '',
  password: '',
};

public subscription: Subscription = new Subscription();

constructor(
  private authService: AuthenticationService,
  private router: Router,
  ) { }

  public createAccount() {
   const that = this;

    if (!this.credentials.email || !this.credentials.username || !this.credentials.password) {
      this.formError = "All fields are required!!"
    } else if (this.credentials.password.length < 6 || this.credentials.email.length < 4) {
      this.formError = "Email and Password must be 4 and 6 characters respectively";
    } else if (this.credentials.email.indexOf("@") === -1){
      this.formError = "Email address must contain '@' symbol";
    }
    else {
      this.subscription = this.authService.registerUser(this.credentials).subscribe({
        next(response: AuthResponse) {
        that.authService.saveToken(response.token);
      },
      error(error: any) {
        console.error("Something went wrong", error);
        that.formError = "Unable to create account"
      },
      complete() {
        console.log('success');
        that.router.navigateByUrl('list-home');
      }
      });

  }
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}

}
