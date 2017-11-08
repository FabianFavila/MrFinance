import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Transaccion } from '../../models/transaccion';

@IonicPage()
@Component({
  selector: 'page-ver-transaccion',
  templateUrl: 'ver-transaccion.html',
})
export class VerTransaccionPage {
  transaccion: Transaccion;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.transaccion = navParams.get('transaccion');
  }
}
