import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Appointment } from '../../../models/appointment';
import { Company } from '../../../models/company';

import { LoginServiceProvider } from '../../../providers/login-service/login-service';

@Component({
  selector: 'page-appointment-details',
  templateUrl: 'appointment-details.html',
})
export class AppointmentDetailsPage {

  appointment: Appointment;

  constructor(
    private loginService: LoginServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.appointment = this.navParams.get('appointment');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmentDetailsPage');
  }

  private book() {
    console.log('Boooked! :)');
  }

}
