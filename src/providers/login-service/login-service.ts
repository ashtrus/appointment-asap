import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { User } from '../../models/user';
import { Filter } from '../../models/filter';

@Injectable()
export class LoginServiceProvider {

  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase,
    private fb: Facebook,
    private platform: Platform
  ) {
    // get Auth data, then get firebase user document || null
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afDB.object<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null)
        }
      })
  }

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
          this.updateUserData(res.user);
        });
    }
  }

  signInBusiness(email, password) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        this.updateUserData(res.user);
      })
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState;
  }

  getUser() {
    return this.afAuth.auth.currentUser;
  }

  updateUserData(userData) {
    // Sets user data to firebase on login
    const userRef: AngularFireObject<User> = this.afDB.object(`users/${userData.uid}`);

    const data: User = {
      uid: userData.uid,
      email: userData.email,
      displayName: userData.displayName,
      photoURL: userData.photoURL,
      filters: null,
    }
    return userRef.set(data);
  }

  updateUserFilters(newFilters: Filter) {
    const userRef: AngularFireObject<User> = this.afDB.object(`users/${this.getUser().uid}`);
    userRef.update({ filters: newFilters });
  }

}
