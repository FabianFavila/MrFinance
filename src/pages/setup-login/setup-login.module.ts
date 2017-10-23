import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetupLoginPage } from './setup-login';

@NgModule({
  declarations: [
    SetupLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(SetupLoginPage),
  ],
})
export class SetupLoginPageModule {}
