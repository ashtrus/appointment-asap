import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

import { Company } from '../../../../../models/company';

import { LoginServiceProvider } from '../../../../../providers/login-service/login-service';

@Component({
  selector: 'page-business-details',
  templateUrl: 'business-details.html',
})
export class BusinessDetailsPage implements OnInit {

  private companyRef: AngularFireList<any>;
  private updateCompanyDetailsForm: FormGroup;
  private company: Company;

  constructor(
    private afDB: AngularFireDatabase,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private loginService: LoginServiceProvider
  ) {
    this.companyRef = afDB.list(`companies/`);
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

    const companyId = this.getUser().uid;

    this.companyRef.update(companyId, {
      cvr: this.company.cvr,
      title: this.company.title,
      category: this.company.category,
      logoUrl: this.company.logoUrl
    });

    this.navCtrl.pop();
  }

}
