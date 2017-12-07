import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { TwitterConnect, TwitterConnectResponse } from '@ionic-native/twitter-connect';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';

import { Usuario } from '../../models/usuario';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isNew: boolean;
  user: Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private storage: Storage, private fb: Facebook, private afAuth: AngularFireAuth, private twitter: TwitterConnect, private googlePlus: GooglePlus, private platform: Platform) {
    this.isNew = navParams.get('newPerson');

    this.user = new Usuario("", "", "", "", "", 0);
  }

  loginFacebook() {
    if (this.platform.is('cordova')) {
      this.fb.login(['public_profile', 'email'])
        .then((res: FacebookLoginResponse) => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          firebase.auth().signInWithCredential(facebookCredential);
          this.afAuth.authState.subscribe((user: firebase.User) => {
            this.user.nombre = user.displayName;
            this.user.email = user.email;
            this.user.uid = user.uid;
            return this.navCtrl.push('SetupLoginPage', { 'user': this.user });
          });
        })
        .catch(e => {
          const alert = this.alertCtrl.create({
            title: 'Error: ' + JSON.stringify(e),
            buttons: [{
              text: 'Error al tratar de validar tu informacion con Facebook, por favor intenta de nuevo',
              handler: () => {
                this.navCtrl.push('WelcomePage');
              }
            }]
          });
          alert.present();
        });

    } else {
      // This is for debugging process only
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          this.user.nombre = res.user.displayName;
          this.user.email = res.user.email;
          this.user.uid = res.user.uid;
          return this.navCtrl.push('SetupLoginPage', { 'user': this.user });
        });
    }
  }

  loginTwitter() {
    this.twitter.login().then((res: TwitterConnectResponse) => {
      const twitterCredential = firebase.auth.TwitterAuthProvider.credential(res.token, res.secret);
      firebase.auth().signInWithCredential(twitterCredential);
      this.afAuth.authState.subscribe((user: firebase.User) => {
        this.user.nombre = user.displayName;
        this.user.email = user.email;
        this.user.uid = user.uid;
        return this.navCtrl.push('SetupLoginPage', { 'user': this.user });
      });
    })
      .catch(e => {
        const alert = this.alertCtrl.create({
          title: 'Error: ' + JSON.stringify(e),
          buttons: [{
            text: 'Error al tratar de validar tu informacion con Twitter, por favor intenta de nuevo',
            handler: () => {
              this.navCtrl.push('WelcomePage');
            }
          }]
        });
        alert.present();
      });
  }

  loginGoogle() {
    this.googlePlus.login({
      'webClientId': '923702613206-0jsdnk0isr20b1g14vrgn9jq0fc8ss6f.apps.googleusercontent.com',
      'offline': true
    }).then((res: any) => {
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
      firebase.auth().signInWithCredential(googleCredential);
      this.afAuth.authState.subscribe((user: firebase.User) => {
        this.user.nombre = user.displayName;
        this.user.email = user.email;
        this.user.uid = user.uid;
        return this.navCtrl.push('SetupLoginPage', { 'user': this.user });
      });
    })
      .catch(e => {
        const alert = this.alertCtrl.create({
          title: 'Error: ' + JSON.stringify(e),
          buttons: [{
            text: 'Error al tratar de validar tu informacion con Google, por favor intenta de nuevo',
            handler: () => {
              this.navCtrl.push('WelcomePage');
            }
          }]
        });
        alert.present();
      });
  }

  toggle() {
    this.isNew = this.isNew ? false : true;
  }
}
