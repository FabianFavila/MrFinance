import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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

  user = new Usuario("", "", "", "", "mxn");

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private storage: Storage, afDB: AngularFireDatabase, public loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
      content: 'Cargando datos...'
    });
    loading.present();



    this.storage.get('currentuser').then((val) => {

      this.user = new Usuario(val.nombre, val.avatar, val.email, val.uid, val.moneda);

      this.balance = afDB.object('/' + val.uid + '/balance').valueChanges();

      // Use snapshotChanges().map() to store the key
      this.carteras = afDB.list('/' + val.uid + '/carteras').snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });

      this.transacciones = afDB.list('/' + val.uid + '/transacciones').snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
      
    }).then(() => { loading.dismiss(); });
  }


  // Menu
  openMenu() {
    this.menuCtrl.toggle();
  }

  openProfile() {
    this.menuCtrl.toggle('right');
  }
  //////////////

  // Navegation
  newTransaction() {
    this.navCtrl.push('AgregarTransaccionPage', { curr: this.user.moneda });
  }

  newWallet() {
    this.navCtrl.push('AgregarCarteraPage');
  }

  viewWallet(cartera: any){
    this.navCtrl.push('CarterasPage', { cartera })
  }

  viewTransaction(txn: any) {
    this.navCtrl.push('VerTransaccionPage', { transaccion: txn });
  }

  voiceTransactions() {
    this.navCtrl.push('AgregarPorVozPage');
  }
  //////////////

}
