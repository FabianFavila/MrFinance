import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AgregarTransaccionPage } from '../agregar-transaccion/agregar-transaccion';
import { CarterasPage } from '../carteras/carteras';

import { Usuario } from '../../models/usuario';
import { Transaccion } from '../../models/transaccion';
import { Cartera } from './../../models/cartera';

import { Storage } from '@ionic/storage';

import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

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

  user: Usuario = {
    nombre: "",
    balance: 0,
    avatar: 'hola',
    email: '',
    token: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private storage: Storage, afDB: AngularFireDatabase) {
    storage.get('currentuser').then((val) => {
      this.user = val;
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
    this.navCtrl.push(AgregarTransaccionPage);
  }

  newWallet(){
    this.navCtrl.push(CarterasPage);
  }

}
