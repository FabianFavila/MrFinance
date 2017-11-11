import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlanDeAhorro } from '../../models/plan-de-ahorro';

@IonicPage()
@Component({
  selector: 'page-planes-de-ahorro',
  templateUrl: 'planes-de-ahorro.html',
})
export class PlanesDeAhorroPage {
  dummyplan : PlanDeAhorro = {
    titulo: "Mazatlan 2018",
    objetivo: 5500,
    fecha_inicio: "17/12/2017",
    fecha_termino: "17/03/2018",
    ahorro_diario: 90
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  newPlan(){
    this.navCtrl.push('AgregarPlanPage');
  }

}
