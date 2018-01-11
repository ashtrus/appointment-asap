import { Component } from '@angular/core';

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { LoginServiceProvider } from '../../../providers/login-service/login-service';

@Component({
  selector: 'page-receipts',
  templateUrl: 'receipts.html',
})
export class ReceiptsPage {

  receiptsRef: AngularFireList<any>;
  receipts: Observable<any[]>;

  constructor(private afDB: AngularFireDatabase, private loginService: LoginServiceProvider) {

    const companyId = this.loginService.getUser().uid;
    this.receiptsRef = afDB.list(`receipts/`, ref => ref.orderByChild('companyDetails/companyId').equalTo(`${companyId}`));

    this.receipts = this.receiptsRef.valueChanges();

  }


}
