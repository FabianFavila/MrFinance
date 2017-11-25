import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  ingreso: boolean = false;
  categorias: any = {
    'Egreso': [
      {
        nombre: 'Ropa',
        img: 'assets/imgs/categories/ropa.png'
      },
      {
        nombre: 'Educacion',
        img: 'assets/imgs/categories/books.png'
      },
      {
        nombre: 'Comida y bebida',
        img: 'assets/imgs/categories/comidaybebida.png'
      },
      {
        nombre: 'Salud y cuidado personal',
        img: 'assets/imgs/categories/saludycuidadopersonal.png'
      },
      {
        nombre: 'Casa',
        img: 'assets/imgs/categories/casa.png'
      },
      {
        nombre: 'Renta',
        img: 'assets/imgs/categories/casa.png'
      },
      {
        nombre: 'Compras',
        img: 'assets/imgs/categories/compras.png'
      },
      {
        nombre: 'Transporte',
        img: 'assets/imgs/categories/transporte.png'
      },
      {
        nombre: 'Vehiculos',
        img: 'assets/imgs/categories/vehiculos.png'
      },
      {
        nombre: 'Vida y entretenimiento',
        img: 'assets/imgs/categories/vidayentretenimiento.png'
      },
      {
        nombre: 'Servicios',
        img: 'assets/imgs/categories/servicios.png'
      },
      {
        nombre: 'Otros',
        img: 'assets/imgs/categories/otros.png'
      },
    ],
    'Ingreso': [
      {
        nombre: 'Sueldo',
        img: 'assets/imgs/categories/otros.png'
      }
    ]
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.ingreso = this.navParams.get('ingreso');
  }

  getCategories() {
    return this.ingreso ? this.categorias['Ingreso'] : this.categorias['Egreso'];
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done(category: string, avatar: string) {
    this.viewCtrl.dismiss(category, avatar);
  }

}
