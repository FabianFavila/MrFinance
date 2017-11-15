import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Transaccion } from '../../models/transaccion';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-ver-transaccion',
  templateUrl: 'ver-transaccion.html',
})
export class VerTransaccionPage {
  transaccion: Transaccion;
  itemRef: AngularFireList<any>;
  currency: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, db: AngularFireDatabase, user: UserProvider) {
    let currentuser = user.getUser();
    this.currency = currentuser.moneda;

    this.transaccion = navParams.get('transaccion');
    this.itemRef = db.list(currentuser.uid + '/transacciones/');
  }

  edit(){
    this.navCtrl.push('DetalleTransaccionPage', { txn: this.transaccion, flag: true });
  }

  delete(){
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
            this.itemRef.remove(this.transaccion.key);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }
}
