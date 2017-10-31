import { Component, ViewChild } from '@angular/core';
import { Config, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Push, PushObject, PushOptions} from '@ionic-native/push';

import { FirstRunPage } from '../pages/pages';
import { DashboardPage } from './../pages/dashboard/dashboard';
import { AgregarTransaccionPage } from './../pages/agregar-transaccion/agregar-transaccion';
import { CarterasPage } from './../pages/carteras/carteras';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = FirstRunPage;

  @ViewChild(Nav) nav: Nav;
  
  pages: any[] = [
    { title: 'Dashboard', component: DashboardPage },
    { title: 'Agregar transaccion', component: AgregarTransaccionPage },
    { title: 'Agregar cartera', component: CarterasPage }
  ]

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private config: Config) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //this.pushsetup();
    });
  }

  /* pushsetup() {
    const options: PushOptions = {
      android: {},
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      },
      windows: {},
      browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
  }; */
 
  //const pushObject: PushObject = this.push.init(options);
 
  /* pushObject.on('notification').subscribe((notification: any) => {
    if (notification.additionalData.foreground) {
      let youralert = this.alertCtrl.create({
        title: notification.title,
        message: notification.message
      });
      youralert.present();
    }
  });
 
  pushObject.on('registration').subscribe((registration: any) => {
     //do whatever you want with the registration ID
  });
 
  pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  } */

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

