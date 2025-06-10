import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { createAnimation } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false, 
})
export class HomePage implements  AfterViewInit {

  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private route: ActivatedRoute) { }
  plans(){
    this.navCtrl.navigateForward(['/tabs/plans']);
  }

  ngAfterViewInit(): void {
    const element = document.querySelector('.home-content');
    if (element) {
      const fadeInAnimation = createAnimation()
        .addElement(element)
        .duration(1000)
        .easing('ease-in-out')
        .fromTo('opacity', '0', '1');

      fadeInAnimation.play();
    }

  }


}
