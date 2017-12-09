import { Component } from '@angular/core';
import { AlertController, ModalController, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  private createAppointmentForm: FormGroup;

  constructor(
    private afDB: AngularFireDatabase,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private loginService: LoginServiceProvider,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private navParams: NavParams
  ) {

    this.itemsRef = afDB.list(`items/${this.getUser().uid}`);
    console.log(this.itemsRef);
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  public ngOnInit() {
    this.createAppointmentForm = this.formBuilder.group({
      title: ["", Validators.required ],
      description: ["", Validators.required ],
      price: ["", Validators.required ],
    });
  }

  private openFiltersModal() {
    let modal = this.modalCtrl.create(ModalFiltersPage);
    modal.present();
  }

  // private getUsers() {
  //   this.usersRef = this.afDB.list('users').valueChanges();
  // }

  private addAppointment() {
    this.itemsRef.push(this.createAppointmentForm.value);
    this.createAppointmentForm.reset();
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

  private openSettingsPage() {
    this.navCtrl.push(SettingsPage);
  }
}
