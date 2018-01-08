import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MapPage } from '../pages/map/map';
import { AppointmentDetailsPage } from '../pages/home/appointment-details/appointment-details';
import { BusinessHomePage } from "../pages/business/home/home";
import { BusinessLoginPage } from '../pages/login/business/business';
import { UserReceiptsPage } from '../pages/receipts/receipts';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/home/settings/settings';
import { ModalFiltersPage } from '../pages/home/modal-filters';
import { TabsBusinessPage } from "../pages/tabs-business/tabs";
import { TabsPage } from '../pages/tabs/tabs';
import { ReceiptsPage } from "../pages/business/receipts/receipts";
import { ModalAddAppointmentPage } from "../pages/business/home/modal-add-appointment/modal-add-appointment";
import { BusinessDetailsPage } from "../pages/business/home/settings/business-details/business-details";
import { BusinessSettingsPage } from "../pages/business/home/settings/settings";
import { NotificationSettingsPage } from "../pages/business/home/settings/notifications/notifications";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook'

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AgmCoreModule } from '@agm/core';

import { MapServiceProvider } from '../providers/map-service/map-service';
import { LoginServiceProvider } from '../providers/login-service/login-service';

import "hammerjs";
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HammertimeDirective } from '../assets/hammertime';

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      // override hammerjs default configuration
      'swipe': { direction: Hammer.DIRECTION_ALL  }
  }
}

export const firebaseConfig = {
  apiKey: "AIzaSyB34Soo3EZdDsVvP5jtT-YbbYYKIaI1gEQ",
  authDomain: "appointment-asap.firebaseapp.com",
  databaseURL: "https://appointment-asap.firebaseio.com",
  projectId: "appointment-asap",
  storageBucket: "appointment-asap.appspot.com",
  messagingSenderId: "125167948256"
};

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    AppointmentDetailsPage,
    BusinessHomePage,
    BusinessLoginPage,
    BusinessDetailsPage,
    BusinessSettingsPage,
    UserReceiptsPage,
    HammertimeDirective,
    HomePage,
    LoginPage,
    ModalAddAppointmentPage,
    ModalFiltersPage,
    NotificationSettingsPage,
    SettingsPage,
    ReceiptsPage,
    TabsBusinessPage,
    TabsPage
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBcSTiMq_TDkFpVfp1hcp6BfHpMe4AQ4c8'
    }),
    AngularFireModule.initializeApp(firebaseConfig),
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
    UserReceiptsPage,
    HomePage,
    LoginPage,
    ModalAddAppointmentPage,
    ModalFiltersPage,
    NotificationSettingsPage,
    SettingsPage,
    ReceiptsPage,
    TabsBusinessPage,
    TabsPage
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
