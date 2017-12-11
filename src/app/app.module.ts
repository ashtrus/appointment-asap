import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { BusinessHomePage } from "../pages/business/home/home";
import { BusinessLoginPage } from '../pages/login/business/business';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsBusinessPage } from "../pages/tabs-business/tabs";
import { TabsPage } from '../pages/tabs/tabs';
import { ReceiptsPage } from "../pages/business/receipts/receipts";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook'

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { LoginServiceProvider } from '../providers/login-service/login-service';

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
    AboutPage,
    BusinessHomePage,
    BusinessLoginPage,
    ContactPage,
    HomePage,
    LoginPage,
    ReceiptsPage,
    TabsBusinessPage,
    TabsPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    BusinessHomePage,
    BusinessLoginPage,
    ContactPage,
    HomePage,
    LoginPage,
    ReceiptsPage,
    TabsBusinessPage,
    TabsPage
  ],
  providers: [
    AngularFireDatabase,
    Facebook,
    LoginServiceProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
