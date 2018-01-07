import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { ModalFiltersPage } from './modal-filters';
import { SettingsPage } from './settings/settings';
import { AppointmentDetailsPage } from './appointment-details/appointment-details';

import { LoginServiceProvider } from "../../providers/login-service/login-service";
import { Appointment } from '../../models/appointment';

import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from '../../assets/animations';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('cardAnimator', [
      transition('* => wobble', animate(1000, keyframes(kf.wobble))),
      transition('* => swing', animate(1000, keyframes(kf.swing))),
      transition('* => jello', animate(1000, keyframes(kf.jello))),
      transition('* => zoomOutRight', animate(1000, keyframes(kf.zoomOutRight))),
      transition('* => slideOutLeft', animate(1000, keyframes(kf.slideOutLeft))),
      transition('* => rotateOutUpRight', animate(1000, keyframes(kf.rotateOutUpRight))),
      transition('* => flipOutY', animate(1000, keyframes(kf.flipOutY))),
    ])
  ]
})
export class HomePage {

  appointmentsRef: AngularFireList<any>;
  appointments: Observable<any[]>;
  likes: string[] = [];

  constructor(
    private afDB: AngularFireDatabase,
    private loginService: LoginServiceProvider,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
  ) {

    this.appointmentsRef = afDB.list(`appointments/`);
    // Use snapshotChanges().map() to store the key
    this.appointments = this.appointmentsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.loginService.user.subscribe(user => {
      if (user.likes) { this.likes = user.likes; }
    })
  }

  private startAnimation(appointment, state) {
    if (!appointment.animationState) {
      appointment.animationState = state;
    }
  }

  private resetAnimationState(appointment) {
    appointment.animationState = '';
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

  private isFavorite(companyId: string): boolean {
    return this.likes.indexOf(companyId) > -1;
  }

  private getUser() {
    return this.loginService.getUser();
  }

  private openSettingsPage() {
    this.navCtrl.push(SettingsPage);
  }

  private openDetailsPage(appointment: Appointment) {
    this.navCtrl.push(AppointmentDetailsPage, { appointment });
  }
}
