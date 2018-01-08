import { Component } from '@angular/core';
import { AlertController, ModalController, NavController, NavParams } from "ionic-angular";

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { ModalAddAppointmentPage } from './modal-add-appointment/modal-add-appointment';

import { LoginServiceProvider } from "../../../providers/login-service/login-service";
import { Appointment } from '../../../models/appointment';

import { BusinessSettingsPage } from './settings/settings';

@Component({
  selector: 'page-business-home',
  templateUrl: 'home.html',
})
export class BusinessHomePage {

  appointmentsRef: AngularFireList<Appointment>;
  companyRef: AngularFireObject<any>;
  appointments: Observable<Appointment[]>;
  companyDetails: Observable<any>;

  constructor(
    private afDB: AngularFireDatabase,
    public alertCtrl: AlertController,
    private loginService: LoginServiceProvider,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {

    this.appointmentsRef = afDB.list(`appointments/`, ref =>
      ref.orderByChild('companyId').equalTo(this.getUser().uid));

    this.companyRef = afDB.object(`companies/${this.getUser().uid}`);
    // Use snapshotChanges().map() to store the key
    this.appointments = this.appointmentsRef.snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }));
    });
    this.companyDetails = this.companyRef.valueChanges();

  }

  ionViewWillLoad() {}

  private getUser() {
    return this.loginService.getUser();
  }

  private addAppointment() {
    let profileModal = this.modalCtrl.create(ModalAddAppointmentPage);
    profileModal.present();
  }

  private update(appointment) {
    let profileModal = this.modalCtrl.create(ModalAddAppointmentPage, { appointment });
    profileModal.present();
  }

  private delete(key: string) {

    let confirm = this.alertCtrl.create({
      title: 'Delete?',
      message: 'Are you sure you want to delete this appointment?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.appointmentsRef.remove(key);
          }
        }
      ]
    });
    confirm.present();

  }

  private openSettingsPage() {
    this.navCtrl.push(BusinessSettingsPage);
  }

}
