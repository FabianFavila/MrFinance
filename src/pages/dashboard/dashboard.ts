import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Usuario } from '../../models/usuario';
import { Transaccion } from '../../models/transaccion';
import { Cartera } from './../../models/cartera';



@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  balance: Observable<any>;
  transacciones: Observable<any[]>;
  carteras: Observable<any[]>;

  user = new Usuario("", "", "", "", "mxn", 0); 

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private storage: Storage, afDB: AngularFireDatabase) {
    this.storage.get('currentuser').then((val) => {
      this.user = new Usuario(val.nombre, val.avatar, val.email, val.uid, val.moneda, val.balance);
    });

    this.balance = afDB.object('/' + this.user.uid + '/balance').valueChanges();;
    
    this.carteras = afDB.list('/'+ this.user.uid +'/carteras').valueChanges();
    this.transacciones = afDB.list('/'+ this.user.uid +'/transacciones').valueChanges();
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
    this.navCtrl.push('AgregarCarteraPage');
  }

  viewTransaction(txn: any){
    this.navCtrl.push('VerTransaccionPage', { transaccion: txn });
  }

  voiceTransactions(){
    this.navCtrl.push('AgregarPorVozPage');
  }

}
