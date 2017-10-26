import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleTransaccionPage } from './detalle-transaccion';

@NgModule({
  declarations: [
    DetalleTransaccionPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleTransaccionPage),
  ],
})
export class DetalleTransaccionPageModule {}
