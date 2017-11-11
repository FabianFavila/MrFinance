import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import firebase  from 'firebase';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private storage: Storage) {
    this.isNew = navParams.get('newPerson');

    //This is only for debugging purposes
    this.user = new Usuario("Fabian Solano", "assets/imgs/avatars/boy4.png", "test@gmail.com", "uiddeprueba123", "MXN", 0); 
  }

  loginFacebook(){
    let provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithRedirect(provider).then(() =>{
      firebase.auth().getRedirectResult().then((result) =>{
        this.user.nombre = result.user.displayName;
        this.user.email = result.user.email;
        this.user.uid = result.user.uid;
        this.navCtrl.push('SetupLoginPage', { 'user': this.user });
      }).catch(function(error){
        const alert = this.alertCtrl.create({
          title: 'Error: ' + error.code,
          buttons: [{
            text: 'Volver al inicio',
            handler: () => {
              this.navCtrl.push('WelcomePage');
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
        this.navCtrl.push('SetupLoginPage', { 'user':this.user });
      }).catch(function(error){
        const alert = this.alertCtrl.create({
          title: 'Error: ' + error.code,
          buttons: [{
            text: 'Volver al inicio',
            handler: () => {
              this.navCtrl.push('WelcomePage');
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
        this.navCtrl.push('SetupLoginPage', { 'user':this.user });
      }).catch(function(error){
        const alert = this.alertCtrl.create({
          title: 'Error: ' + error.code,
          buttons: [{
            text: 'Volver al inicio',
            handler: () => {
              this.navCtrl.push('WelcomePage');
            }
          }]
        });
        alert.present();
      });
    });
  }

  loginInvited(){
    this.storage.set('currentuser', this.user);
    this.navCtrl.push('SetupLoginPage', { 'user':this.user });
  }

  toggle(){
    this.isNew = this.isNew ? false : true;
  }
}
