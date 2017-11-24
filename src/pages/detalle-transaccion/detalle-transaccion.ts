import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DatePicker } from '@ionic-native/date-picker';

import { Transaccion } from './../../models/transaccion';
import { Cartera } from './../../models/cartera';
import { Categoria } from '../../models/categoria';

import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-detalle-transaccion',
  templateUrl: 'detalle-transaccion.html',
})

export class DetalleTransaccionPage {
  transaccionesRef: AngularFireList<any>;
  carteras: Observable<any[]>;
  carteraTemp: Cartera;
  balance: number;
  balanceCartera: number;
  userRef: AngularFireObject<any>;
  balanceRef: AngularFireObject<any>;
  editable: boolean;
  moneda: string = 'MXN';
  currentuser: any;

  transaccion: Transaccion = {
    cantidad: 0,
    titulo: '',
    descripcion: '',
    tipo: false,
    icono: '',
    categoria: '',
    fecha: '',
    cartera: ''
  };

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public db: AngularFireDatabase, public modalCtrl: ModalController, private datePicker: DatePicker, user: UserProvider) {
    this.editable = navParams.get('flag');
    this.currentuser = user.getUser();

    this.moneda = this.currentuser.moneda;

    if (this.editable) {
      this.transaccion = navParams.get('txn');
    } else {
      this.transaccion.cantidad = navParams.get('amount');
    }

    this.balanceRef = db.object('/' + this.currentuser.uid + '/balance');
    this.userRef = db.object('/' + this.currentuser.uid);
    this.balanceRef.snapshotChanges().subscribe(data => { this.balance = data.payload.val() });

    this.transaccionesRef = db.list(this.currentuser.uid + '/transacciones/');
    this.carteras = db.list(this.currentuser.uid + '/carteras').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  changeAmount(amount: number) {
    let amountModal = this.modalCtrl.create('AgregarTransaccionPage', { amount, currency: this.moneda, modal: true });
    amountModal.onDidDismiss(amount => {
      if (amount) {
        this.transaccion.cantidad = amount;
      }
    });
    amountModal.present();
  }

  selectCategory() {
    let categoriesModal = this.modalCtrl.create('CategoriasPage');
    categoriesModal.onDidDismiss((category, avatar) => {
      if (category) {
        this.transaccion.categoria = category;
        this.transaccion.icono = "assets/imgs/categories/" + avatar + ".png";
      }
    });
    categoriesModal.present();
  }

  selectDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    if (dd < 10) {
      dd = +('0' + dd)
    }

    if (mm < 10) {
      mm = +('0' + mm)
    }

    this.transaccion.fecha = dd + ' / ' + mm;
    alert(this.transaccion.fecha);

    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      titleText: "Fecha de transaccion"
    }).then(
      date => {
        alert('Got date: ' + date);
        //this.transaccion.fecha = date;
      },
      err => alert('Error occurred while getting date: ' + err)
      );
  }

  done() {
    this.transaccion.cartera = this.carteraTemp.nombre;

    this.db.object('/' + this.currentuser.uid + '/carteras/' + this.carteraTemp.key + '/balance').snapshotChanges().subscribe(data => {
      this.balanceCartera = data.payload.val();
    }).unsubscribe();

    this.transaccion.tipo ? this.balance += this.transaccion.cantidad : this.balance -= this.transaccion.cantidad;
    this.transaccion.tipo ? this.balanceCartera += this.transaccion.cantidad : this.balanceCartera -= this.transaccion.cantidad;
    
    if (!this.editable) {
      this.db.object(this.currentuser.uid + '/carteras/' + this.carteraTemp.key).update({ balance: this.balanceCartera });
      this.userRef.update({ balance: this.balance });
      this.transaccionesRef.push(this.transaccion);
      this.navCtrl.push('DashboardPage');
    } else {
      this.db.object(this.currentuser.uid + '/carteras/' + this.carteraTemp.key).update({ balance: this.balanceCartera });
      this.userRef.update({ balance: this.balance });
      let saveKey = this.transaccion.key;
      delete this.transaccion.key;
      this.transaccionesRef.update(saveKey, this.transaccion);
      this.navCtrl.push('DashboardPage');
    }
  }
}
