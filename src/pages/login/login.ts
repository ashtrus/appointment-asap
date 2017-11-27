import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public loginService: LoginServiceProvider) {}

  loginWithFacebook() {
    this.loginService.signInWithFacebook();
  }

  loginWithGoogle() {
    this.loginService.signInWithGoogle();
  }

  loginBusinessAccount() {
    console.log('business login');
  }
}
