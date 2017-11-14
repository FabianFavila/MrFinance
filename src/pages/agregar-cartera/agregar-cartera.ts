import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase  } from 'angularfire2/database';

import { Cartera } from '../../models/cartera';

@IonicPage()
@Component({
  selector: 'page-agregar-cartera',
  templateUrl: 'agregar-cartera.html',
})
export class AgregarCarteraPage {
  itemRef: any;
  uid: string;
    
  cartera: Cartera = {
    nombre: "",
    color: "",
    balance: 0
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public alertCtrl: AlertController) {
    this.uid = this.navParams.get('uid');
  }
  
  saveWallet(){
    if(this.cartera.nombre != ""){
      this.itemRef = this.db.list(this.uid + '/carteras/');
  
      this.itemRef.push({ 
        nombre: this.cartera.nombre,
        color: this.cartera.color,
        balance: this.cartera.balance 
      });
  
      this.navCtrl.push('DashboardPage');
    } else{
      let alert = this.alertCtrl.create({
        title: 'Error :(',
        subTitle: 'Para poder guardar tu nueva cartera, necesitamos que ingreses al menos el nombre de la cartera.',
        buttons: ['Regresar']
      });

      alert.present();
    }
  }

  setColor(event: Event, col:string){
    event.preventDefault();
    this.cartera.color = col;
  }
}
