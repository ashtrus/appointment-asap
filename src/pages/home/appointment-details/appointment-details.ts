import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Appointment } from '../../../models/appointment';
import { Company } from '../../../models/company';
import { Receipt } from '../../../models/receipt';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { LoginServiceProvider } from '../../../providers/login-service/login-service';
import { Observable } from 'rxjs/Observable';

import { ContactPage } from '../../contact/contact';

@Component({
  selector: 'page-appointment-details',
  templateUrl: 'appointment-details.html',
})
export class AppointmentDetailsPage {

  appointment: Appointment;
  receipt: Receipt;

  constructor(
    private afDB: AngularFireDatabase,
    private loginService: LoginServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.appointment = this.navParams.get('appointment');
  }

  private book(appointment: Appointment) {
    this.receipt = appointment;

    this.loginService.user.subscribe((user) => {

      this.receipt.user = user;

      this.afDB.list('/receipts').push(this.receipt).then(() => {
        // this.afDB.list('/appointments').remove(appointment.key);
        this.navCtrl.setRoot(ContactPage);
      })
    });
  }

}
