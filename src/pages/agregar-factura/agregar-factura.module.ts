import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarFacturaPage } from './agregar-factura';

@NgModule({
  declarations: [
    AgregarFacturaPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarFacturaPage),
  ],
})
export class AgregarFacturaPageModule {}
