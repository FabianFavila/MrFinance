import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarPlanPage } from './agregar-plan';

@NgModule({
  declarations: [
    AgregarPlanPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarPlanPage),
  ],
})
export class AgregarPlanPageModule {}
