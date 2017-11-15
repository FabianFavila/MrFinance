import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase  } from 'angularfire2/database';

import { Cartera } from '../../models/cartera';
import { Transaccion } from '../../models/transaccion';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-carteras',
  templateUrl: 'carteras.html',
})
export class CarterasPage {
  cartera: Cartera;
  moneda: string = 'MXN';
  uid: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase, user: UserProvider) {
    this.cartera = this.navParams.get('cartera');
    this.uid = user.getUser().uid;
    this.moneda = user.getUser().moneda;
  }

  viewTransaction(txn: any){
    this.navCtrl.push('VerTransaccionPage', { transaccion: txn });
  }
}
