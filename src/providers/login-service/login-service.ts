import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginServiceProvider {

  constructor(
    private afAuth: AngularFireAuth,
    private fb: Facebook,
    private platform: Platform
  ) {}

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          console.log(res);
        });
    }
  }

  signInWithGoogle() {
    if (this.platform.is('cordova')) {
      // FIXME: change to google and install plugin
      return this.fb.login(['email', 'public_profile']).then(res => {
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(googleCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((res) => {
          console.log(res);
        });
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  getUser() {
    return this.afAuth.authState;
  }

}
