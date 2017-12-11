import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginServiceProvider } from "../../../providers/login-service/login-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class BusinessHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessHomePage');
  }

  logOut() {
    this.loginService.signOut();
  }

}
