import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Transaccion } from '../../models/transaccion';
import { Cartera } from '../../models/cartera';

import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-ver-transaccion',
  templateUrl: 'ver-transaccion.html',
})
export class VerTransaccionPage {
  transaccion: Transaccion;
  cartera: Cartera = { nombre: "", color: "", balance: 0, key: "" };
  carteras: Observable<Cartera[]>;
  balanceRemoto: number;
  balanceCartera: number;
  transaccionesRef: AngularFireList<any>;
  userRef: AngularFireObject<any>;
  carteraRef: AngularFireObject<any>;
  currency: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, db: AngularFireDatabase, user: UserProvider) {
    let currentuser = user.getUser();
    this.currency = currentuser.moneda;

    this.transaccion = navParams.get('transaccion');
    this.userRef = db.object('/' + currentuser.uid);
    this.transaccionesRef = db.list(currentuser.uid + '/transacciones/');

    this.carteras = db.list('/' + currentuser.uid + '/carteras', ref => ref.orderByChild('nombre').equalTo(this.transaccion.cartera)).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    db.object('/' + currentuser.uid + '/balance').snapshotChanges().subscribe(data => { this.balanceRemoto = data.payload.val() });

    this.carteras.forEach((cartera) => {
      this.cartera = cartera[0];

      db.object('/' + currentuser.uid + '/carteras/' + this.cartera.key + '/balance').snapshotChanges().subscribe(data => { this.balanceCartera = data.payload.val() });

      this.carteraRef = db.object(currentuser.uid + '/carteras/' + this.cartera.key);
    });
  }

  edit() {
    this.navCtrl.push('DetalleTransaccionPage', { txn: this.transaccion, flag: true });
  }

  delete() {
    let confirm = this.alertCtrl.create({
      title: '¿Estas seguro de eliminar este registro?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            if (this.transaccion.tipo) {
              this.balanceCartera -= this.transaccion.cantidad;
              this.balanceRemoto -= this.transaccion.cantidad;
            } else {
              this.balanceCartera += this.transaccion.cantidad;
              this.balanceRemoto += this.transaccion.cantidad;
            }

            this.userRef.update({ balance: this.balanceRemoto });
            this.carteraRef.update({ balance: this.balanceCartera });

            this.transaccionesRef.remove(this.transaccion.key);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }
}
