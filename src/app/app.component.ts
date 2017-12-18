import { Component } from '@angular/core';
import { LoadingController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from "../pages/login/login";
import { TabsBusinessPage } from "../pages/tabs-business/tabs";
import { TabsPage } from '../pages/tabs/tabs';
import { LoginServiceProvider } from '../providers/login-service/login-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  loader;

  constructor(
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private loginService: LoginServiceProvider,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.presentLoading();

      this.loginService.isAuth().subscribe((authenticated) => {

        if (authenticated && authenticated.providerData[0].providerId === "password") {
          this.rootPage = TabsBusinessPage;
        } else if (authenticated) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = LoginPage;
        }

        this.loader.dismiss();
      });

    });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Authenticating",
      duration: 3000
    });
    this.loader.present();
  }
}
