import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Cartera } from '../../models/cartera';

/**
 * Generated class for the CarterasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carteras',
  templateUrl: 'carteras.html',
})
export class CarterasPage {
  cartera: Cartera = {
    nombre: "",
    color: 1
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  saveWallet(){
    console.log(this.cartera);
  }
}
