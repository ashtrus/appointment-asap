import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { ModalFiltersPage } from './modal-filters';
import { SettingsPage } from './settings/settings';

import { LoginServiceProvider } from "../../providers/login-service/login-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  appointmensRef: AngularFireList<any>;
  appointments: Observable<any[]>;

  constructor(
    private afDB: AngularFireDatabase,
    private loginService: LoginServiceProvider,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private navParams: NavParams
  ) {

    this.appointmensRef = afDB.list(`appointments/`);
    // Use snapshotChanges().map() to store the key
    this.appointments = this.appointmensRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  private openFiltersModal() {
    let modal = this.modalCtrl.create(ModalFiltersPage);
    modal.present();
  }

  private getUser() {
    return this.loginService.getUser();
  }

  private openSettingsPage() {
    this.navCtrl.push(SettingsPage);
  }
}
