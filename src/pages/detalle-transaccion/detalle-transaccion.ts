import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController, LoadingController } from 'ionic-angular';
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
  balanceGeneral: number;
  balanceCartera: number;
  userRef: AngularFireObject<any>;
  balanceRef: AngularFireObject<any>;
  editable: boolean;
  moneda: string = 'MXN';
  currentuser: any;
  cantidadOriginal: number;

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

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public db: AngularFireDatabase, public modalCtrl: ModalController, private datePicker: DatePicker, user: UserProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.editable = navParams.get('flag');
    this.currentuser = user.getUser();

    this.moneda = this.currentuser.moneda;

    if (this.editable) {
      this.transaccion = navParams.get('txn');
      this.cantidadOriginal = this.transaccion.cantidad;
    } else {
      this.transaccion.cantidad = navParams.get('amount');
    }

    this.userRef = db.object('/' + this.currentuser.uid);
    this.balanceRef = db.object('/' + this.currentuser.uid + '/balance');
    this.balanceRef.snapshotChanges().subscribe(data => { this.balanceGeneral = data.payload.val() });

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
    let categoriesModal = this.modalCtrl.create(
      'CategoriasPage',
      { ingreso: this.transaccion.tipo }
    );
    categoriesModal.onDidDismiss((category, avatar) => {
      if (category) {
        this.transaccion.categoria = category;
        this.transaccion.icono = "assets/imgs/categories/" + avatar + ".png";
      }
    });
    categoriesModal.present();
  }

  changeDateFormat(date: Date): string {
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

  selectDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
      titleText: "Fecha de transaccion"
    }).then(
      date => {
        this.transaccion.fecha = this.changeDateFormat(date);
      },
      err => alert('Un error ocurrio al tratar de tomar la fecha: ' + err)
      );
  }

  done() {
    if (this.carteraTemp != null) {
      this.transaccion.cartera = this.carteraTemp.nombre;

      if (!this.editable) {
        // Es nueva transaccion
        this.transaccion.tipo ? this.balanceGeneral += this.transaccion.cantidad : this.balanceGeneral -= this.transaccion.cantidad;

        // Subscripcion a la base de datos para tomar el balance actual de la cartera seleccionada y actualizarla con el valor de la transaccion
        let subs = this.db.object('/' + this.currentuser.uid + '/carteras/' + this.carteraTemp.key + '/balance').snapshotChanges()
          .subscribe(data => {
            //Se toma el valor de la cartera seleccionada y se desubscribe para cortar la conexion a la toma de datos
            this.balanceCartera = data.payload.val();
            subs.unsubscribe();
            //Se define si la transaccion es de tipo ingreso o egreso
            this.transaccion.tipo ? this.balanceCartera += this.transaccion.cantidad : this.balanceCartera -= this.transaccion.cantidad;
            //Aqui se actualiza el balance de la cartera seleccionada
            this.db.object(this.currentuser.uid + '/carteras/' + this.carteraTemp.key).update({ balance: this.balanceCartera });
          });

        this.userRef.update({ balance: this.balanceGeneral });
        this.transaccionesRef.push(this.transaccion);
        this.navCtrl.push('DashboardPage');
      } else {
        // Se esta editando la transaccion
        let diferencia: number = this.transaccion.cantidad - this.cantidadOriginal;
        this.transaccion.tipo ? this.balanceGeneral += diferencia : this.balanceGeneral -= diferencia;

        // Subscripcion a la base de datos para tomar el balance actual de la cartera seleccionada y actualizarla con el valor de la transaccion
        let subs = this.db.object('/' + this.currentuser.uid + '/carteras/' + this.carteraTemp.key + '/balance').snapshotChanges()
          .subscribe(data => {
            //Se toma el valor de la cartera seleccionada y se desubscribe para cortar la conexion a la toma de datos
            this.balanceCartera = data.payload.val();
            subs.unsubscribe();
            //Se define si la transaccion es de tipo ingreso o egreso
            this.transaccion.tipo ? this.balanceCartera += diferencia : this.balanceCartera -= diferencia;
            //Aqui se actualiza el balance de la cartera seleccionada
            this.db.object(this.currentuser.uid + '/carteras/' + this.carteraTemp.key).update({ balance: this.balanceCartera });
          });

        this.userRef.update({ balance: this.balanceGeneral });
        let saveKey = this.transaccion.key;
        delete this.transaccion.key;
        this.transaccionesRef.update(saveKey, this.transaccion);
        this.navCtrl.push('DashboardPage');
      }
    } else {
      let alert = this.alertCtrl.create({
        title: 'Agrega una cartera',
        subTitle: 'Selecciona una cartera para poder continuar con la transacción.',
        buttons: ['Volver']
      });
      alert.present();
    }
  }
}
