import { Component } from '@angular/core';

import { BusinessHomePage } from '../business/home/home';
import { ReceiptsPage } from '../business/receipts/receipts';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsBusinessPage {

  tab1Root = BusinessHomePage;
  tab2Root = ReceiptsPage;

  constructor() {

  }
}
