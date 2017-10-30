import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Transaccion } from './../../models/transaccion';


@IonicPage()
@Component({
  selector: 'page-detalle-transaccion',
  templateUrl: 'detalle-transaccion.html',
})

export class DetalleTransaccionPage {
  transaccion: Transaccion;

  amount: number;

  isReadyToSave: boolean;

  form: FormGroup;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, formBuilder: FormBuilder) {
    this.amount = navParams.get('amount');

    this.form = formBuilder.group({
      titulo: [''],
      cantidad: [this.amount],
      descripcion: [''],
      tipo: [''],
      icono: [''],
      categoria: [''],
      fecha: [''],
      cartera: [''],
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

  }

  done() {
    if (!this.form.valid) { return; }
    //this.databasetest.push(this.form.value);
    this.navCtrl.goToRoot;
  }

}
