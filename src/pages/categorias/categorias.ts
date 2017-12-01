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
        tag: 'ropa',
        img: 'assets/imgs/categories/ropa.png'
      },
      {
        nombre: 'Educacion',
        tag: 'books',
        img: 'assets/imgs/categories/books.png'
      },
      {
        nombre: 'Comida y bebida',
        tag: 'comidaybebida',
        img: 'assets/imgs/categories/comidaybebida.png'
      },
      {
        nombre: 'Salud y cuidado personal',
        tag: 'saludycuidadopersonal',
        img: 'assets/imgs/categories/saludycuidadopersonal.png'
      },
      {
        nombre: 'Casa',
        tag: 'casa',
        img: 'assets/imgs/categories/casa.png'
      },
      {
        nombre: 'Renta',
        tag: 'casa',
        img: 'assets/imgs/categories/casa.png'
      },
      {
        nombre: 'Compras',
        tag: 'compras',
        img: 'assets/imgs/categories/compras.png'
      },
      {
        nombre: 'Transporte',
        tag: 'transporte',
        img: 'assets/imgs/categories/transporte.png'
      },
      {
        nombre: 'Vehiculos',
        tag: 'vehiculos',
        img: 'assets/imgs/categories/vehiculos.png'
      },
      {
        nombre: 'Vida y entretenimiento',
        tag: 'vidayentretenimiento',
        img: 'assets/imgs/categories/vidayentretenimiento.png'
      },
      {
        nombre: 'Servicios',
        tag: 'servicios',
        img: 'assets/imgs/categories/servicios.png'
      },
      {
        nombre: 'Otros',
        tag: 'otros',
        img: 'assets/imgs/categories/otros.png'
      },
    ],
    'Ingreso': [
      {
        nombre: 'Sueldo',
        tag: 'otros',
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
