import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';

import { Cartera } from '../../models/cartera';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-detalle-cartera',
  templateUrl: 'detalle-cartera.html',
})
export class DetalleCarteraPage {
  cartera: Cartera;
  balanceOriginal: number;
  balanceRemoto: number;
  userRef: AngularFireObject<any>;
  carteraRef: AngularFireObject<any>;
  transaccionesRef: AngularFireList<any>;
  currentuser: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, db: AngularFireDatabase, user: UserProvider) {
    this.currentuser = user.getUser();
    this.cartera = this.navParams.get('cartera');
    this.balanceOriginal = this.cartera.balance;

    this.userRef = db.object('/' + this.currentuser.uid);

    this.carteraRef = db.object(this.currentuser.uid + '/carteras/' + this.cartera.key);

    this.transaccionesRef = db.list(this.currentuser.uid + '/transacciones/');

    db.object('/' + this.currentuser.uid + '/balance').snapshotChanges().subscribe(data => { this.balanceRemoto = data.payload.val() });
  }

  changeDateFormat(date: Date):string {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    if (dd < 10) {
      dd = +('0' + dd)
    }

    if (mm < 10) {
      mm = +('0' + mm)
    }

    return dd + ' / ' + mm;
  }

  updateWallet(){
    if(this.balanceOriginal == this.cartera.balance){
      //There was no changes in the wallet balance
      this.carteraRef.update({ 
        nombre: this.cartera.nombre,
        color: this.cartera.color,
        balance: this.cartera.balance 
      });
    } else{
      //The balance was changed
      let diferencia: number = this.cartera.balance - this.balanceOriginal;
      this.balanceRemoto = Number(this.balanceRemoto) + Number(diferencia);
      let ingreso = diferencia > 0 ? true : false;

      this.transaccionesRef.push({
        cantidad: this.cartera.balance - this.balanceOriginal,
        titulo: "Ajuste de balance",
        descripcion: "Esta transacción representa un ajuste que se hizo al balance de la cartera y afectó al balance global",
        tipo: ingreso,
        icono: "assets/imgs/categories/otros.png",
        categoria: "Otros",
        fecha: this.changeDateFormat(new Date()),
        cartera: this.cartera.nombre
      });

      this.userRef.update({ balance: this.balanceRemoto });

      this.carteraRef.update({ 
        nombre: this.cartera.nombre,
        color: this.cartera.color,
        balance: this.cartera.balance 
      });
    }

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
