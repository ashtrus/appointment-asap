import { Component } from '@angular/core';
import { NavParams, ViewController } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AngularFireObject, AngularFireList,  AngularFireDatabase} from 'angularfire2/database';

import { Appointment } from "../../../../models/appointment";

import { LoginServiceProvider } from "../../../../providers/login-service/login-service";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-modal-add-appointment',
  templateUrl: 'modal-add-appointment.html',
})
export class ModalAddAppointmentPage {

  appointmentsRef: AngularFireList<any>;
  editMode = false;
  selectedAppointment: Appointment = null;
  companyRef: AngularFireObject<any>;
  companyDetails: Observable<any>;
  private createAppointmentForm: FormGroup;

  constructor(
    private afDB: AngularFireDatabase,
    private formBuilder: FormBuilder,
    private loginService: LoginServiceProvider,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.appointmentsRef = afDB.list(`appointments/`);
    this.companyRef = afDB.object(`companies/${this.getUser().uid}`);
    this.companyDetails = this.companyRef.valueChanges();
  }

  public ngOnInit() {
    this.createAppointmentForm = this.formBuilder.group({
      title: ["", Validators.required ],
      description: ["", Validators.required ],
      price: ["", Validators.required ],
    });
  }

  public ionViewWillLoad() {
    this.selectedAppointment = this.navParams.get("appointment");
    // this.companyDetails = this.navParams.get("company");
    console.log(this.companyDetails);
    if (this.selectedAppointment !== undefined) {
      this.editMode = true;
    } else {
      this.editMode = false;
      this.selectedAppointment = new Appointment("", "", "", "", "", "");
    }
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

  private getUser() {
    return this.loginService.getUser();
  }

  private saveAppointment() {

    this.selectedAppointment.title = this.createAppointmentForm.controls.title.value;
    this.selectedAppointment.description = this.createAppointmentForm.controls.description.value;
    this.selectedAppointment.price = this.createAppointmentForm.controls.price.value;

    if (!this.editMode) {

      this.appointmentsRef.push({
        companyId: this.getUser().uid,
        companyTitle: this.companyDetails.subscribe(),
        title: this.selectedAppointment.title,
        description: this.selectedAppointment.description,
        price: this.selectedAppointment.price
      });

    } else {

      this.appointmentsRef.update(this.selectedAppointment.key, {
        title:        this.selectedAppointment.title,
        description:  this.selectedAppointment.description,
        price:        this.selectedAppointment.price
      });

    }

    this.createAppointmentForm.reset();
    this.dismiss();
  }
}
