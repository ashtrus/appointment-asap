import { Component } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";

import { LoginServiceProvider } from "../../providers/login-service/login-service";

import { User } from "../../models/user";
import { Filter } from "../../models/filter";

@Component({
  templateUrl: "modal-filters.html",
})

export class ModalFiltersPage {

  user: User;
  filters: Filter = {
    distance: 1,
    time: { lower: 8, upper: 20 },
    showSold: false
  }

  constructor(
    private loginService: LoginServiceProvider,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {

    this.loginService.user.subscribe(user => {
      this.user = user;
      if (user.filters) {
        this.filters = this.user.filters;
      }
    });
  }

  onChange(ev: any) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.loginService.updateUserFilters(this.filters);
    this.dismiss();
  }
}
