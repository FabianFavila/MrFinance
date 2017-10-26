import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { SetupLoginPage } from './../pages/setup-login/setup-login';
import { IntroPage } from './../pages/intro/intro';
import { LoginPage } from './../pages/login/login';
import { DashboardPage } from './../pages/dashboard/dashboard';
import { AgregarTransaccionPage } from './../pages/agregar-transaccion/agregar-transaccion';



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    IntroPage,
    SetupLoginPage,
    DashboardPage,
    AgregarTransaccionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    IntroPage,
    SetupLoginPage,
    DashboardPage,
    AgregarTransaccionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
