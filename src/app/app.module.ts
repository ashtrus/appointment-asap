import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Configurations
import { FIREBASE_CONFIG, GOOGLE_MAPS_API_KEY, MyHammerConfig } from '../configs';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Modules
import { AgmCoreModule } from '@agm/core';
import * as Hammer from 'hammerjs';

// Pages: for Business
import { BusinessHomePage } from "../pages/business/home/home";
import { ModalAddAppointmentPage } from "../pages/business/home/modal-add-appointment/modal-add-appointment";
import { BusinessDetailsPage } from "../pages/business/home/settings/business-details/business-details";
import { BusinessSettingsPage } from "../pages/business/home/settings/settings";
import { NotificationSettingsPage } from "../pages/business/home/settings/notifications/notifications";
// * Tab
import { ReceiptsPage } from "../pages/business/receipts/receipts";


// Pages: for Customers
import { HomePage } from '../pages/home/home';
import { AppointmentDetailsPage } from '../pages/home/appointment-details/appointment-details';
import { SettingsPage } from '../pages/home/settings/settings';
import { ModalFiltersPage } from '../pages/home/modal-filters';
// * Tab
import { MapPage } from '../pages/map/map';
// * Tab
import { UserReceiptsPage } from '../pages/receipts/receipts';

// Pages: Shared
import { LoginPage } from '../pages/login/login';
import { BusinessLoginPage } from '../pages/login/business/business';
import { TabsPage } from '../pages/tabs/tabs';
import { TabsBusinessPage } from "../pages/tabs-business/tabs";

// Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook'

// Services
import { MapServiceProvider } from '../providers/map-service/map-service';
import { LoginServiceProvider } from '../providers/login-service/login-service';

// Directives
import { HammertimeDirective } from '../assets/hammertime';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    AppointmentDetailsPage,
    BusinessDetailsPage,
    BusinessHomePage,
    BusinessLoginPage,
    BusinessSettingsPage,
    HammertimeDirective,
    HomePage,
    LoginPage,
    ModalAddAppointmentPage,
    ModalFiltersPage,
    NotificationSettingsPage,
    ReceiptsPage,
    SettingsPage,
    TabsBusinessPage,
    TabsPage,
    UserReceiptsPage,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_MAPS_API_KEY
    }),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    AppointmentDetailsPage,
    BusinessDetailsPage,
    BusinessHomePage,
    BusinessLoginPage,
    BusinessSettingsPage,
    HomePage,
    LoginPage,
    ModalAddAppointmentPage,
    ModalFiltersPage,
    NotificationSettingsPage,
    ReceiptsPage,
    SettingsPage,
    TabsBusinessPage,
    TabsPage,
    UserReceiptsPage,
  ],
  providers: [
    AngularFireDatabase,
    Facebook,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    MapServiceProvider,
    LoginServiceProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
