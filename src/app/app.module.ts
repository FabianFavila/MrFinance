import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { LoginPage } from './../pages/login/login';
import { SetupLoginPage } from './../pages/setup-login/setup-login';
import { IntroPage } from './../pages/intro/intro';
import { DashboardPage } from './../pages/dashboard/dashboard';
import { AgregarTransaccionPage } from './../pages/agregar-transaccion/agregar-transaccion';
import { DetalleTransaccionPage } from './../pages/detalle-transaccion/detalle-transaccion';

import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyBm-2qg-yU82EuDXhK5bGpTWC0wo4zVKLk",
  authDomain: "mr-finance.firebaseapp.com",
  databaseURL: "https://mr-finance.firebaseio.com",
  projectId: "mr-finance",
  storageBucket: "mr-finance.appspot.com",
  messagingSenderId: "923702613206"
});

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    IntroPage,
    SetupLoginPage,
    DashboardPage,
    AgregarTransaccionPage,
    DetalleTransaccionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    IntroPage,
    SetupLoginPage,
    DashboardPage,
    AgregarTransaccionPage,
    DetalleTransaccionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
