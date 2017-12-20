import { Component } from '@angular/core';
import { NavParams, ViewController } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AngularFireList,  AngularFireDatabase} from 'angularfire2/database';

import { LoginServiceProvider } from "../../../../providers/login-service/login-service";

import { Appointment } from "../../../../models/appointment";
import { Company } from '../../../../models/company';

@Component({
  selector: 'page-modal-add-appointment',
  templateUrl: 'modal-add-appointment.html',
})
export class ModalAddAppointmentPage {

  appointmentsRef: AngularFireList<any>;
  editMode = false;
  selectedAppointment: Appointment = null;
  company: Company;
  private createAppointmentForm: FormGroup;

  constructor(
    private afDB: AngularFireDatabase,
    private formBuilder: FormBuilder,
    private loginService: LoginServiceProvider,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.appointmentsRef = afDB.list(`appointments/`);
    this.loginService.company.subscribe(company => {
      this.company = company;
      console.log(company);
    });
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
        companyTitle: this.company.title,
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
