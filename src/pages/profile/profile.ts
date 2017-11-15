import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { Usuario } from '../../models/usuario';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  itemRef: AngularFireObject<any>;

  user = new Usuario("", "", "", "", "mxn");

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, db: AngularFireDatabase) {

    this.storage.get('currentuser').then((val) => {

      this.user = new Usuario(val.nombre, val.avatar, val.email, val.uid, val.moneda, val.balance);

      this.itemRef = db.object('/' + val.uid + '/preferencias');
    });
  }

  setAvatar(avatar:string){
    this.user.avatar = "assets/imgs/avatars/" + avatar + ".png";
  }

  done(){
    this.storage.set('currentuser', this.user);

    this.itemRef.update({
      nombre: this.user.nombre,
      avatar: this.user.avatar,
      email: this.user.email,
      moneda: this.user.moneda
    });
    
    this.navCtrl.push('DashboardPage');
  }
}
