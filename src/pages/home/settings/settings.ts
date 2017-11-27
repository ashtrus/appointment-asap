import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginServiceProvider } from "../../../providers/login-service/login-service";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  private getUser() {
    return this.loginService.getUser();
  }

  private logOut() {
    this.loginService.signOut();
  }

}
