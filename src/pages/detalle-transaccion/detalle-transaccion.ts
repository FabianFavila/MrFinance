import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Transaccion } from './../../models/transaccion';
import { Cartera } from './../../models/cartera';
import { DashboardPage } from './../dashboard/dashboard';


@IonicPage()
@Component({
  selector: 'page-detalle-transaccion',
  templateUrl: 'detalle-transaccion.html',
})

export class DetalleTransaccionPage {
  itemRef: any;
  carteras: Observable<any[]>;

  transaccion: Transaccion = {
    titulo: '',
    cantidad: 0,
    descripcion: '',
    tipo: false,
    icono: '',
    categoria: '',
    fecha: '31/Oct',
    cartera: ''
  };

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, db: AngularFireDatabase) {
    this.transaccion.cantidad = navParams.get('amount');
    this.itemRef = db.list('test/transacciones/');
    this.carteras = db.list('/test/carteras').valueChanges();
  }

  done() {
    this.itemRef.push({ 
      titulo: this.transaccion.titulo,
      cantidad: this.transaccion.cantidad,
      descripcion: this.transaccion.descripcion,
      tipo: this.transaccion.tipo,
      icono: this.transaccion.icono,
      categoria: this.transaccion.categoria,
      fecha: this.transaccion.fecha,
      cartera: this.transaccion.cartera
    });

    this.navCtrl.push(DashboardPage);
  }

}
