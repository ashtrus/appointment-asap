import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController, ViewController } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AngularFireList,  AngularFireDatabase} from 'angularfire2/database';

import { LoginServiceProvider } from "../../../../providers/login-service/login-service";

import { Appointment } from "../../../../models/appointment";
import { Company } from '../../../../models/company';

@Component({
  selector: 'page-modal-add-appointment',
  templateUrl: 'modal-add-appointment.html',
})
export class ModalAddAppointmentPage implements OnInit {

  appointmentsRef: AngularFireList<any>;
  editMode = false;
  selectedAppointment: Appointment = null;
  company: Company;
  private createAppointmentForm: FormGroup;
  startTime: string;
  endTime: string;

  constructor(
    private afDB: AngularFireDatabase,
    private formBuilder: FormBuilder,
    private loginService: LoginServiceProvider,
    public navParams: NavParams,
    public toastCtrl: ToastController,
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
      discount: [""],
    });
  }

  public ionViewWillLoad() {
    this.selectedAppointment = this.navParams.get("appointment");

    if (this.selectedAppointment !== undefined) {
      this.editMode = true;
      this.startTime = this.selectedAppointment.startTime;
      this.endTime = this.selectedAppointment.endTime;
    } else {
      this.editMode = false;
      this.startTime = new Date().toISOString()
      this.endTime = new Date(new Date().getTime() + (1 * 60 * 60 * 1000)).toISOString();
      this.selectedAppointment = new Appointment("", this.company, "", "", "", "", this.startTime, this.endTime);
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
    this.selectedAppointment.discount = this.createAppointmentForm.controls.discount.value;

    const companyDetails: any = this.company;
    companyDetails.companyId = this.getUser().uid;

    if (!this.editMode) {

      this.appointmentsRef.push({
        companyDetails: companyDetails,
        title: this.selectedAppointment.title,
        description: this.selectedAppointment.description,
        price: this.selectedAppointment.price,
        discount: this.selectedAppointment.discount,
        startTime: this.startTime,
        endTime: this.endTime,
      });

      let toast = this.toastCtrl.create({
        message: 'Appointment was added successfully',
        duration: 2000
      });
      toast.present();

    } else {

      this.appointmentsRef.update(this.selectedAppointment.key, {
        title:        this.selectedAppointment.title,
        description:  this.selectedAppointment.description,
        price: this.selectedAppointment.price,
        discount: this.selectedAppointment.discount,
        startTime: this.startTime,
        endTime: this.endTime,
      });

      let toast = this.toastCtrl.create({
        message: 'Appointment was updated successfully',
        duration: 2000
      });
      toast.present();

    }

    this.createAppointmentForm.reset();
    this.dismiss();
  }
}
