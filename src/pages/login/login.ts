import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { Observable } from 'rxjs/Observable';

import { BusinessLoginPage } from './business/business';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public loginService: LoginServiceProvider, private navCtrl: NavController) {}

  loginWithFacebook() {
    this.loginService.signInWithFacebook();
  }

  loginWithGoogle() {
    this.loginService.signInWithGoogle();
  }

  loginBusinessAccount() {
    this.navCtrl.push(BusinessLoginPage);
  }
}
