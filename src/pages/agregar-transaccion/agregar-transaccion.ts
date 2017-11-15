import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-agregar-transaccion',
  templateUrl: 'agregar-transaccion.html',
})
export class AgregarTransaccionPage {
  amount: number = 0;
  decimal: boolean = false;
  currency: string = 'MXN';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams.get('amount')){
      this.amount = this.navParams.get('amount');
    }

    this.currency = this.navParams.get('curr');
  }

  addNumber(num: number){
    if(this.amount == 0){
      this.amount = num;
    } else{
      this.amount = +(this.amount.toString().concat(num.toString()));
    }
  }

  substractNumber(){
    this.amount = this.amount!=0 ? +(this.amount.toString().slice(0, -1)) : 0;
  }

  confirm(){
    this.navCtrl.push('DetalleTransaccionPage', {
      amount: this.amount
    })
  }

  toggle(){
    this.decimal = this.decimal ? false : true;
  }
}
