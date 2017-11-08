import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Usuario } from '../../models/usuario';
import { Transaccion } from '../../models/transaccion';
import { Cartera } from './../../models/cartera';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  transacciones: Observable<any[]>;
  carteras: Observable<any[]>;
  user = new Usuario("", "", "", "", "mxn"); 

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private storage: Storage, afDB: AngularFireDatabase) {
    this.storage.get('currentuser').then((val) => {
      this.user = new Usuario(val.nombre, val.avatar, val.email, val.uid, val.moneda);
    });
    this.carteras = afDB.list('/test/carteras').valueChanges();
    this.transacciones = afDB.list('/test/transacciones').valueChanges();
  }

  ionViewDidLoad() {
  }

  openMenu(){
    this.menuCtrl.toggle();
  }

  openProfile(){
    this.menuCtrl.toggle('right');
  }

  newTransaction(){
    this.navCtrl.push('AgregarTransaccionPage');
  }

  newWallet(){
    this.navCtrl.push('CarterasPage');
  }

  viewTransaction(txn: any){
    this.navCtrl.push('VerTransaccionPage', { transaccion: txn });
  }

}
