import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AngularFireDatabase  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DatePicker } from '@ionic-native/date-picker';

import { Transaccion } from './../../models/transaccion';
import { Cartera } from './../../models/cartera';
import { Categoria } from '../../models/categoria';

@IonicPage()
@Component({
  selector: 'page-detalle-transaccion',
  templateUrl: 'detalle-transaccion.html',
})

export class DetalleTransaccionPage {
  itemRef: any;
  carteras: Observable<any[]>;

  transaccion : Transaccion = {
    cantidad: 0,
    titulo: '',
    descripcion: '',
    tipo: false,
    icono: '',
    categoria: '',
    fecha: '',
    cartera: '' 
  };

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, db: AngularFireDatabase, public modalCtrl: ModalController, private datePicker: DatePicker) {
    let uid = this.navParams.get('uid');
    this.transaccion.cantidad = navParams.get('amount');
    this.itemRef = db.list(uid + '/transacciones/');
    this.carteras = db.list(uid + '/carteras').valueChanges();
  }

  selectCategory(){
    let categoriesModal = this.modalCtrl.create('CategoriasPage');
    categoriesModal.onDidDismiss((category, avatar) => {
      if (category) {
        this.transaccion.categoria = category;
        this.transaccion.icono = "assets/imgs/categories/"+avatar+".png";
      }
    });
    categoriesModal.present();
  }

  selectDate(){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    
    if(dd<10) {
        dd = +('0'+dd)
    } 
    
    if(mm<10) {
        mm = +('0'+mm)
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
    console.log(this.transaccion);
    this.itemRef.push(this.transaccion);

    this.navCtrl.push('DashboardPage');
  }
}
