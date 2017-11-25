import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginServiceProvider } from "../../providers/login-service/login-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private loginService: LoginServiceProvider) {
  }

  getUser() {
    return this.loginService.getUser();
  }

  logOut() {
    this.loginService.signOut();
  }
}
