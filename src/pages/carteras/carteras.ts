import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase  } from 'angularfire2/database';

import { Cartera } from '../../models/cartera';
import { Transaccion } from '../../models/transaccion';

@IonicPage()
@Component({
  selector: 'page-carteras',
  templateUrl: 'carteras.html',
})
export class CarterasPage {
  transaccion : Transaccion = {
    cantidad: 0,
    titulo: '',
    descripcion: '',
    tipo: false,
    icono: '',
    categoria: '',
    fecha: '',
    cartera: '' 
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {
    
  }

  viewTransaction(txn: any){
    this.navCtrl.push('VerTransaccionPage', { transaccion: txn });
  }
}
