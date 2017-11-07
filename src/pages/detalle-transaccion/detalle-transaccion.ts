import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AngularFireDatabase  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Transaccion } from './../../models/transaccion';
import { Cartera } from './../../models/cartera';

@IonicPage()
@Component({
  selector: 'page-detalle-transaccion',
  templateUrl: 'detalle-transaccion.html',
})

export class DetalleTransaccionPage {
  cantidad: number = 0;
  categoria: string;
  categoriaAvatar: string;
  itemRef: any;
  carteras: Observable<any[]>;
  private transaccion : FormGroup;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, db: AngularFireDatabase, private formBuilder: FormBuilder, public modalCtrl: ModalController) {
    this.cantidad = navParams.get('amount');
    this.itemRef = db.list('test/transacciones/');
    this.carteras = db.list('/test/carteras').valueChanges();

    this.transaccion = this.formBuilder.group({
      cantidad: [navParams.get('amount')],
      titulo: [''],
      descripcion: [''],
      tipo: [false],
      icono: [''],
      categoria: [''],
      fecha: ['31/Oct'],
      cartera: ['']
    });
  }

  selectCategory(){
    let categoriesModal = this.modalCtrl.create('CategoriasPage');
    categoriesModal.onDidDismiss((category, avatar) => {
      if (category) {
        this.categoria = category;
        this.categoriaAvatar = "assets/imgs/categories/"+avatar+".png";
      }
    });
    categoriesModal.present();
  }

  done() {
    this.itemRef.push(this.transaccion.value);

    this.navCtrl.push('DashboardPage');
  }

}
