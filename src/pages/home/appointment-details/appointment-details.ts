import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Appointment } from '../../../models/appointment';
import { Company } from '../../../models/company';
import { Receipt } from '../../../models/receipt';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { LoginServiceProvider } from '../../../providers/login-service/login-service';
import { Observable } from 'rxjs/Observable';

import { UserReceiptsPage } from '../../receipts/receipts';

@Component({
  selector: 'page-appointment-details',
  templateUrl: 'appointment-details.html',
})
export class AppointmentDetailsPage {

  appointment: Appointment;
  company: Company;
  receipt: Receipt;

  constructor(
    private afDB: AngularFireDatabase,
    private loginService: LoginServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.appointment = this.navParams.get('appointment');
    this.company = this.appointment.companyDetails;
  }

  private book(appointment: Appointment) {
    this.receipt = appointment;

    this.loginService.user.subscribe((user) => {

      // FIXME: not all data necessary only contacts and photo, phone as well
      this.receipt.user = user;

      this.afDB.list('/receipts').push(this.receipt).then(() => {
        // FIXME: remove when booking system entirely fixed
        // this.afDB.list('/appointments').remove(appointment.key);
        this.navCtrl.setRoot(UserReceiptsPage);
      })
    });
  }

}
