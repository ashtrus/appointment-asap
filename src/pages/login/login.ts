import { Component } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public afDB: AngularFireDatabase,
    public loginService: LoginServiceProvider,
  ) {}

  ionViewDidLoad() {
  }

  loginWithFacebook() {
    this.loginService.signInWithFacebook();
  }

  loginWithGoogle() {
    this.loginService.signInWithGoogle();
  }
}
