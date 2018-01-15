import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

import { Company } from '../../../../../models/company';

import { LoginServiceProvider } from '../../../../../providers/login-service/login-service';
import { MapServiceProvider } from '../../../../../providers/map-service/map-service';

@Component({
  selector: 'page-business-details',
  templateUrl: 'business-details.html',
})
export class BusinessDetailsPage implements OnInit {

  private companyRef: AngularFireList<any>;
  private branchesRef: AngularFireList<any>;
  private updateCompanyDetailsForm: FormGroup;
  private company: Company;
  private branches;

  constructor(
    private afDB: AngularFireDatabase,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private loginService: LoginServiceProvider,
    private mapService: MapServiceProvider
  ) {
    this.companyRef = afDB.list(`companies/`);
    this.branchesRef = this.afDB.list(`/companies/${loginService.getUser().uid}/locations`);
    this.branchesRef.valueChanges().subscribe((branches) => {
      this.branches = branches;
    })
  }

  public ngOnInit() {
    this.loginService.company.subscribe((company) => {
      this.company = company;
    })
    this.updateCompanyDetailsForm = this.formBuilder.group({
      cvr: ["", [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      title: ["", Validators.required],
      category: ["", Validators.required],
      logoUrl: [""],
      address: [""],
      email: [""],
      phone: [""]
    });
  }

  private getUser() {
    return this.loginService.getUser();
  }

  private updateCompanyDetails() {

    this.company.cvr = this.updateCompanyDetailsForm.controls.cvr.value;
    this.company.title = this.updateCompanyDetailsForm.controls.title.value;
    this.company.category = this.updateCompanyDetailsForm.controls.category.value;
    this.company.logoUrl = this.updateCompanyDetailsForm.controls.logoUrl.value;
    this.company.address = this.updateCompanyDetailsForm.controls.address.value;
    this.company.email = this.updateCompanyDetailsForm.controls.email.value;
    this.company.phone = this.updateCompanyDetailsForm.controls.phone.value;

    const companyId = this.getUser().uid;

    this.mapService.getCoordinates(this.company.address, this.company).subscribe((location) => {

      this.companyRef.update(companyId, {
        cvr: this.company.cvr,
        title: this.company.title,
        category: this.company.category,
        logoUrl: this.company.logoUrl,
        address: this.company.address,
        email: this.company.email,
        phone: this.company.phone,
      });

      this.branches.forEach(location => {
        this.loginService.deleteLocation(location);
      });

    })


    this.navCtrl.pop();
  }

}
