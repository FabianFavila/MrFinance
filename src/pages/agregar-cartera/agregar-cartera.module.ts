import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarCarteraPage } from './agregar-cartera';

@NgModule({
  declarations: [
    AgregarCarteraPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarCarteraPage),
  ],
})
export class AgregarCarteraPageModule {}
