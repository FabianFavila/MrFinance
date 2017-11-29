import { Component, ViewChild } from '@angular/core';
import { Config, Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Usuario } from '../models/usuario';
import { UserProvider } from '../providers/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  @ViewChild(Nav) nav: Nav;

  user: Usuario;
  
  pages: any[] = [
    { title: 'Dashboard', component: 'DashboardPage', icon: 'home' },
    { title: 'Planes de ahorro', component: 'PlanesDeAhorroPage', icon: 'calendar' },
    { title: 'Facturas', component: 'FacturasPage', icon: 'bulb' },
    { title: 'Prestamos', component: 'PrestamosPage', icon: 'ios-people' }
  ]

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage, public menuCtrl: MenuController, userProvider: UserProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      this.storage.get('currentuser').then((val) => {
        if(val){
          //User exist
          this.user = new Usuario(val.nombre, val.avatar, val.email, val.uid, val.moneda, val.balance);
          this.rootPage = 'DashboardPage';
        }else{
          //New user
          this.rootPage = 'WelcomePage';
        }
      });
      
      userProvider.init();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

  changeProfile(){
    this.menuCtrl.close();
    this.nav.push('ProfilePage');
  }

  logout(){
    this.storage.clear().then(()=>{
      this.menuCtrl.close();
      this.rootPage = 'WelcomePage';
      this.nav.popToRoot();
    });
  }
}

