import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConfirmarPorVozPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmar-por-voz',
  templateUrl: 'confirmar-por-voz.html',
})
export class ConfirmarPorVozPage {
  transaccion: any = {
    cantidad: 250,
    cartera: "Tarjeta banamex",
    fecha: "15/07",
    tipo: false
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
