import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Transaccion } from '../../models/transaccion';

@IonicPage()
@Component({
  selector: 'page-ver-transaccion',
  templateUrl: 'ver-transaccion.html',
})
export class VerTransaccionPage {
  transaccion: Transaccion;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.transaccion = navParams.get('transaccion');
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
