import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { IntroPage } from '../intro/intro';



/**
 * Generated class for the SetupLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setup-login',
  templateUrl: 'setup-login.html',
})
export class SetupLoginPage {
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.user = navParams.get('user');
  }

  ionViewDidLoad() {
    
  }

  openIntro(){
    this.storage.set('currentuser', this.user);
    
    this.navCtrl.push(IntroPage);
  }

  setAvatar(avatar:string){
    this.user.avatar = "assets/imgs/avatars/" + avatar + ".png";
  }

}
