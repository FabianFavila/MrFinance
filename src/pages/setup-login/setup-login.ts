import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { Usuario } from '../../models/usuario';


@IonicPage()
@Component({
  selector: 'page-setup-login',
  templateUrl: 'setup-login.html',
})
export class SetupLoginPage {
  itemRef: AngularFireObject<any>;
  balanceRef: AngularFireObject<any>;
  user: Usuario;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, db: AngularFireDatabase) {
    this.user = navParams.get('user');

    this.itemRef = db.object('/' + this.user.uid + '/preferencias');
    this.balanceRef = db.object('/' + this.user.uid);
  }

  openIntro(){
    this.user.balance = 0;

    this.storage.set('currentuser', this.user);

    this.balanceRef.set({ balance: this.user.balance });

    this.itemRef.set({
      nombre: this.user.nombre,
      avatar: this.user.avatar,
      email: this.user.email,
      moneda: this.user.moneda,
      uid: this.user.uid
    });
    
    this.navCtrl.push('IntroPage');
  }

  setAvatar(avatar:string){
    this.user.avatar = "assets/imgs/avatars/" + avatar + ".png";
  }

}
