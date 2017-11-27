import { Component } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";

@Component({
  templateUrl: "modal-filters.html",
})

export class ModalFiltersPage {

  distance = 1;
  time: any = {lower: 8, upper: 20};
  showAvailable = false;
  
  constructor(public navParams: NavParams, public viewCtrl: ViewController) {

  }

  onChange(ev: any) {
    // console.log('Changed', ev);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    console.log('save');
  }
}
