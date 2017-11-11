import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase  } from 'angularfire2/database';

import { Cartera } from '../../models/cartera';

@IonicPage()
@Component({
  selector: 'page-detalle-cartera',
  templateUrl: 'detalle-cartera.html',
})
export class DetalleCarteraPage {
  itemRef: any;
  
  cartera: Cartera = {
    nombre: "",
    color: "",
    balance: 0
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {
    this.itemRef = db.list('test/carteras/');
  }

  saveWallet(){
    this.itemRef.push({ 
      nombre: this.cartera.nombre,
      color: this.cartera.color,
      balance: this.cartera.balance 
    });

    this.navCtrl.push('DashboardPage');
  }

  setColor(event: Event, col:string){
    event.preventDefault();
    this.cartera.color = col;
  }
}
