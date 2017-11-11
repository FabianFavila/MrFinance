import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-agregar-por-voz',
  templateUrl: 'agregar-por-voz.html',
})
export class AgregarPorVozPage {
  class: string = 'secondary';
  tag: string = 'Escuchar';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  escuchar() {
    if (this.class == "secondary") {
      this.class = 'danger';
      this.tag = 'Detener';
    } else {
      this.navCtrl.push('ConfirmarPorVozPage');
    }
  }
}
