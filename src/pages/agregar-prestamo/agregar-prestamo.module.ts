import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarPrestamoPage } from './agregar-prestamo';

@NgModule({
  declarations: [
    AgregarPrestamoPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarPrestamoPage),
  ],
})
export class AgregarPrestamoPageModule {}
