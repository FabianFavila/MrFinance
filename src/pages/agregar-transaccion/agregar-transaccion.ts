import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-agregar-transaccion',
  templateUrl: 'agregar-transaccion.html',
})
export class AgregarTransaccionPage {
  amount: number = 0;
  decimal: boolean = false;
  currency: string = 'MXN';
  modalFlag: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    if (this.navParams.get('amount')) {
      this.amount = this.navParams.get('amount');
    }

    if (this.navParams.get('modal')) {
      this.modalFlag = this.navParams.get('modal');
    }

    this.currency = this.navParams.get('currency');
  }

  addNumber(num: number) {
    if(this.decimal){
      this.amount += +(".".concat((num.toString().concat("0"))));
    } else {
      if (this.amount == 0) {
        this.amount = num;
      } else {
        this.amount = +(this.amount.toString().concat(num.toString()));
      }
    }
  }

  substractNumber() {
    this.amount = this.amount != 0 ? +(this.amount.toString().slice(0, -1)) : 0;
  }

  confirm() {
    if (this.modalFlag) {
      this.viewCtrl.dismiss(this.amount);
    } else {
      this.navCtrl.pop({animate: false}).then(() => {
        this.navCtrl.push('DetalleTransaccionPage', {
          amount: this.amount
        }, { animation: 'md-transition' });
      });
    }
  }

  toggle() {
    this.decimal = this.decimal ? false : true;
  }
}
