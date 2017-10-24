import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    this.navCtrl.push(SetupLoginPage);
  }

  loginTwitter(){
    this.navCtrl.push(SetupLoginPage);
  }

  loginGoogle(){
    this.navCtrl.push(SetupLoginPage);
  }

  toggle(){
    this.isNew = this.isNew ? false : true;
  }
}
