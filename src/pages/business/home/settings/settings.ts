import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BusinessDetailsPage } from './business-details/business-details';
import { NotificationSettingsPage } from './notifications/notifications';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class BusinessSettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  private pageToOpen(pageNme: string) {

    switch (pageNme) {

      case 'settings':
        return BusinessDetailsPage;

      case 'notifications':
        return NotificationSettingsPage;

      default:
        console.log('default', pageNme);
        return;
    }
  }

  private openPage(pageName: string) {
    const page = this.pageToOpen(pageName);
    this.navCtrl.push(page);
  }

}
