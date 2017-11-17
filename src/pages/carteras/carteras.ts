import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Cartera } from '../../models/cartera';
import { Transaccion } from '../../models/transaccion';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-carteras',
  templateUrl: 'carteras.html',
})
export class CarterasPage {
  transaccionesRef: AngularFireList<any>;
  transacciones: Observable<any[]>;

  cartera: Cartera;
  moneda: string = 'MXN';
  uid: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase, user: UserProvider) {
    this.cartera = this.navParams.get('cartera');
    this.uid = user.getUser().uid;
    this.moneda = user.getUser().moneda;

    this.transaccionesRef = db.list('/' + this.uid + '/transacciones', ref => ref.orderByChild('cartera').equalTo(this.cartera.nombre));
    this.transacciones = this.transaccionesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  viewTransaction(txn: any) {
    this.navCtrl.push('VerTransaccionPage', { transaccion: txn });
  }

  searchColor(hex: string) {
    switch (hex) {
      case "#DF2C2C": { return "color1"; }
      case "#EFC75E": { return "color2"; }
      case "#3D6DEB": { return "color3"; }
      case "#8BC34A": { return "color4"; }
      case "#F7B4B4": { return "color5"; }
      case "#868686": { return "color6"; }
      case "#D07C40": { return "color7"; }
      case "#00D1C3": { return "color8"; }
      default: { return "primary"; }
    }
  }

  editWallet(){
    this.navCtrl.push('DetalleCarteraPage', { cartera: this.cartera })
  }
}
