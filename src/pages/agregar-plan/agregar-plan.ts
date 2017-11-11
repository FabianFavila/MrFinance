import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DatePicker } from '@ionic-native/date-picker';
import { PlanDeAhorro } from '../../models/plan-de-ahorro';

/**
 * Generated class for the AgregarPlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregar-plan',
  templateUrl: 'agregar-plan.html',
})
export class AgregarPlanPage {
  planDeAhorro: PlanDeAhorro = {
    titulo: "",
    objetivo: null,
    fecha_inicio: "",
    fecha_termino: "",
    ahorro_diario: 0
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private datePicker: DatePicker) {
  }

  selectDate(tipo: string){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    
    if(dd<10) {
        dd = +('0'+dd)
    } 
    
    if(mm<10) {
        mm = +('0'+mm)
    } 
    
    if (tipo == 'inicio') {
      this.planDeAhorro.fecha_inicio = dd + ' / ' + mm;
      alert(this.planDeAhorro.fecha_inicio);
    } else {
      this.planDeAhorro.fecha_termino = dd + ' / ' + mm;
      alert(this.planDeAhorro.fecha_termino);
    }
    
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

  done(){
    alert(this.planDeAhorro);
  }
}
