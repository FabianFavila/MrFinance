import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarTransaccionPage } from './agregar-transaccion';

@NgModule({
  declarations: [
    AgregarTransaccionPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarTransaccionPage),
  ],
})
export class AgregarTransaccionPageModule {}
