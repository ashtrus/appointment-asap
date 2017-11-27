import { Component } from '@angular/core';
import { AlertController, ModalController, NavController, NavParams } from 'ionic-angular';

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { LoginServiceProvider } from "../../providers/login-service/login-service";
import { ModalFiltersPage } from './modal-filters';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(
    private afDB: AngularFireDatabase,
    private alertCtrl: AlertController,
    private loginService: LoginServiceProvider,
    public modalCtrl: ModalController,
    private navParams: NavParams
  ) {

    this.itemsRef = afDB.list(`items/${this.getUser().uid}`);
    console.log(this.itemsRef);
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  private openFiltersModal() {
    let modal = this.modalCtrl.create(ModalFiltersPage);
    modal.present();
  }

  // private getUsers() {
  //   this.usersRef = this.afDB.list('users').valueChanges();
  // }

  private addItem(newName: string) {
    this.itemsRef.push({ text: newName });
  }

  private updateItem(key: string, newText: string) {
    this.itemsRef.update(key, { text: newText });
  }

  private deleteItem(key: string) {
    this.itemsRef.remove(key);
  }

  private deleteEverything() {
    this.itemsRef.remove();
  }

  private getUser() {
    return this.loginService.getUser();
  }

  private logOut() {
    this.loginService.signOut();
  }
}
