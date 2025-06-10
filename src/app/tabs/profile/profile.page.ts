import { AfterViewInit, Component, OnInit } from '@angular/core';
import { createAnimation, MenuController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit, AfterViewInit {

  email: string = '';

  constructor(private userService: UserService,private menu: MenuController, private navCtrl: NavController) {}

  openMenu() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  logout() {
    this.menu.close('first');
    this.navCtrl.navigateRoot('/login');
  }

    ngAfterViewInit(): void {
      const element = document.querySelector('.perfil-card');
      if (element) {
        const fadeInAnimation = createAnimation()
          .addElement(element)
          .duration(1000)
          .easing('ease-in-out')
          .fromTo('opacity', '0', '1');
  
        fadeInAnimation.play();
      }
  
    }
  ngOnInit() {
    this.email = this.userService.getEmail();
  }


}
