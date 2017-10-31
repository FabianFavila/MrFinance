import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import firebase  from 'firebase';
import { Storage } from '@ionic/storage';

import { SetupLoginPage } from './../setup-login/setup-login';
import { WelcomePage } from '../welcome/welcome';

import { Usuario } from '../../models/usuario';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isNew: boolean;
  user: Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private storage: Storage) {
    this.isNew = navParams.get('newPerson');

    //This is only for debugging purposes
    this.user = {
      nombre : "Fabian Solano",
      avatar : "",
      email : "test@gmail.com",
      token: "",
      balance: 0
    } 
  }

  loginFacebook(){
    let provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithRedirect(provider).then(() =>{
      firebase.auth().getRedirectResult().then((result) =>{
        this.user.nombre = result.user.displayName;
        this.user.email = result.user.email;
        this.user.token = result.user.uid;
        this.storage.set('currentuser', this.user);
        this.navCtrl.push(SetupLoginPage, { 'user':this.user });
      }).catch(function(error){
        const alert = this.alertCtrl.create({
          title: 'Error: ' + error.code,
          buttons: [{
            text: 'Volver al inicio',
            handler: () => {
              this.navCtrl.push(WelcomePage);
            }
          }]
        });
        alert.present();
      });
    });
  }

  loginTwitter(){
    let provider = new firebase.auth.TwitterAuthProvider();
    
    firebase.auth().signInWithRedirect(provider).then(() =>{
      firebase.auth().getRedirectResult().then((result) =>{
        alert(JSON.stringify(result));
        this.navCtrl.push(SetupLoginPage, { 'user':this.user });
      }).catch(function(error){
        const alert = this.alertCtrl.create({
          title: 'Error: ' + error.code,
          buttons: [{
            text: 'Volver al inicio',
            handler: () => {
              this.navCtrl.push(WelcomePage);
            }
          }]
        });
        alert.present();
      });
    });

  }

  loginGoogle(){
    let provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithRedirect(provider).then(() =>{
      firebase.auth().getRedirectResult().then((result) =>{
        alert(JSON.stringify(result));
        this.navCtrl.push(SetupLoginPage, { 'user':this.user });
      }).catch(function(error){
        const alert = this.alertCtrl.create({
          title: 'Error: ' + error.code,
          buttons: [{
            text: 'Volver al inicio',
            handler: () => {
              this.navCtrl.push(WelcomePage);
            }
          }]
        });
        alert.present();
      });
    });
  }

  login(){
    this.storage.set('currentuser', this.user);
    this.navCtrl.push(SetupLoginPage, { 'user':this.user });
  }

  toggle(){
    this.isNew = this.isNew ? false : true;
  }
}
