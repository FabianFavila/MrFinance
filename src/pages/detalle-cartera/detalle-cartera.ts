import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { Cartera } from '../../models/cartera';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-detalle-cartera',
  templateUrl: 'detalle-cartera.html',
})
export class DetalleCarteraPage {
  carteraRef: AngularFireObject<any>;;
  cartera: Cartera;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, db: AngularFireDatabase, user: UserProvider) {
    let currentuser = user.getUser();
    this.cartera = this.navParams.get('cartera');

    this.carteraRef = db.object(currentuser.uid + '/carteras/' + this.cartera.key);
  }

  updateWallet(){
    this.carteraRef.update({ 
      nombre: this.cartera.nombre,
      color: this.cartera.color,
      balance: this.cartera.balance 
    });

    this.navCtrl.popToRoot();
  }

  deleteWallet(){
    let confirm = this.alertCtrl.create({
      title: '¿Estas seguro de eliminar esta cartera?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.carteraRef.remove().then(()=>{ this.navCtrl.popToRoot() });
          }
        }
      ]
    });
    confirm.present();
  }

  setColor(event: Event, col:string){
    event.preventDefault();
    this.cartera.color = col;
  }
}
