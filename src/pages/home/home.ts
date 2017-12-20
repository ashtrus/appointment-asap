import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

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
  likes: string[] = [];

  constructor(
    private afDB: AngularFireDatabase,
    private loginService: LoginServiceProvider,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
  ) {

    this.appointmensRef = afDB.list(`appointments/`);
    // Use snapshotChanges().map() to store the key
    this.appointments = this.appointmensRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.loginService.user.subscribe(user => {
      if (user.likes) { this.likes = user.likes; }
    })
  }

  private openFiltersModal() {
    let modal = this.modalCtrl.create(ModalFiltersPage);
    modal.present();
  }

  private like(ev, companyId) {

    ev.stopPropagation();
    const index = this.likes.indexOf(companyId);

    (index > -1)
      ? this.likes.splice(index, 1)
      : this.likes.push(companyId)

    this.loginService.updateUserLikes(this.likes);
  }

  isFavorite(companyId: string): boolean {
    return this.likes.indexOf(companyId) > -1;
  }

  private getUser() {
    return this.loginService.getUser();
  }

  private openSettingsPage() {
    this.navCtrl.push(SettingsPage);
  }
}
