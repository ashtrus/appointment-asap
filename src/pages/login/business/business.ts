import { Component } from '@angular/core';

import { LoginServiceProvider } from "../../../providers/login-service/login-service";

@Component({
  selector: 'page-business',
  templateUrl: 'business.html',
})
export class BusinessLoginPage {

  email;
  password;

  constructor(private loginService: LoginServiceProvider) {
  }

  private loginBusiness() {
    this.loginService.signInBusiness(this.email, this.password);
  }
}
