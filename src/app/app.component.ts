import { Component, ViewChild } from '@angular/core';
import { Config, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirstRunPage } from '../pages/pages';
import { SetupLoginPage } from './../pages/setup-login/setup-login';
import { IntroPage } from './../pages/intro/intro';
import { LoginPage } from './../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = FirstRunPage;

  @ViewChild(Nav) nav: Nav;
  
  pages: any[] = [
    { title: 'Login', component: LoginPage },
    { title: 'SetupLogin', component: SetupLoginPage },
    { title: 'Intro', component: IntroPage },
  ]

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private config: Config) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

