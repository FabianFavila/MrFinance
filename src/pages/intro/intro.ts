import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  @ViewChild(Slides) slides: Slides;
  showSkip = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  finishIntro(){
    this.slides.slideTo(6, 500);
  }

  makeTransaction(){
    this.navCtrl.push('AgregarTransaccionPage');
  }

  gotoDashboard(){
    this.navCtrl.push('DashboardPage');
  }

}
