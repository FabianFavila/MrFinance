import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AgregarTransaccionPage } from '../agregar-transaccion/agregar-transaccion';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
  }

  openMenu(){
    this.menuCtrl.toggle();
  }

  openProfile(){
    this.menuCtrl.toggle('right');
  }

  newTransaction(){
    this.navCtrl.push(AgregarTransaccionPage);
  }

}
