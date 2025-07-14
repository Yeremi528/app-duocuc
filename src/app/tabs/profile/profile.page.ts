import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlertController, createAnimation, MenuController, NavController } from '@ionic/angular';

import { Camera, CameraResultType, CameraSource} from '@capacitor/camera';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit, AfterViewInit {

  name: string = '';
  email: string = '';

  capturedImage: string | undefined;

  constructor(
    private readonly menu: MenuController,
    private readonly navCtrl: NavController,
    private readonly alertController: AlertController
    ) {}

  openMenu() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  logout() {
    this.menu.close('first');
    localStorage.removeItem('token'); 
    localStorage.removeItem('email');
    this.navCtrl.navigateForward(['/login']);
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
    this.email = localStorage.getItem('email') || '';
   
  }

  async captureImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera, 
      })

      this.capturedImage = image.dataUrl;
    }catch(e) {
      console.log(e)
      alert("Error al momento de capturar la imagen, por favor intente de nuevo más tarde");
    }

  }

  async presentAlert(message: string){
    const alert  = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
  })
  return alert.present();
}

}

  


