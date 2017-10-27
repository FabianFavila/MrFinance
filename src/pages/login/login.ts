import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase  from 'firebase';
import { SetupLoginPage } from './../setup-login/setup-login';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.isNew = navParams.get('newPerson');
  }

  loginFacebook(){
    let provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithRedirect(provider).then(() =>{
      firebase.auth().getRedirectResult().then((result) =>{
        alert(JSON.stringify(result));
        this.navCtrl.push(SetupLoginPage);
      }).catch(function(error){
        alert(JSON.stringify(error));
      });
    });
  }

  loginTwitter(){
    let provider = new firebase.auth.TwitterAuthProvider();
    
    firebase.auth().signInWithRedirect(provider).then(() =>{
      firebase.auth().getRedirectResult().then((result) =>{
        alert(JSON.stringify(result));
        this.navCtrl.push(SetupLoginPage);
      }).catch(function(error){
        alert(JSON.stringify(error));
      });
    });

  }

  loginGoogle(){
    let provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithRedirect(provider).then(() =>{
      firebase.auth().getRedirectResult().then((result) =>{
        alert(JSON.stringify(result));
        this.navCtrl.push(SetupLoginPage);
      }).catch(function(error){
        alert(JSON.stringify(error));
      });
    });

  }

  toggle(){
    this.isNew = this.isNew ? false : true;
  }
}
