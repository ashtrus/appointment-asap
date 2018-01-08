import { Component } from '@angular/core';

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { LoginServiceProvider } from '../../providers/login-service/login-service';

@Component({
  selector: 'page-receipts',
  templateUrl: 'receipts.html'
})
export class UserReceiptsPage {

  receiptsRef: AngularFireList<any>;
  receipts: Observable<any[]>;

  constructor(private afDB: AngularFireDatabase, private loginService: LoginServiceProvider) {

    const userId = this.loginService.getUser().uid;
    this.receiptsRef = afDB.list(`receipts/`, ref => ref.orderByChild('/user/uid').equalTo(`${userId}`));

    this.receipts = this.receiptsRef.valueChanges();

    // Use snapshotChanges().map() to store the key
    this.receipts = this.receiptsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

}
