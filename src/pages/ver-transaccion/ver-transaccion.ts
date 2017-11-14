import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Transaccion } from '../../models/transaccion';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-ver-transaccion',
  templateUrl: 'ver-transaccion.html',
})
export class VerTransaccionPage {
  transaccion: Transaccion;
  itemRef: AngularFireObject<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, db: AngularFireDatabase) {
    this.transaccion = navParams.get('transaccion');
    this.itemRef = db.object(this.navParams.get('uid') + '/transacciones/');
  }

  edit(){

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
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}
