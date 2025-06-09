import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {

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
  ngOnInit() {
    this.email = this.userService.getEmail();
  }


}
