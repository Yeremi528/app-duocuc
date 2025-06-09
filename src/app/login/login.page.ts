import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular'; 

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage   {

  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController,private userService: UserService, private alertController: AlertController ) { }

   // Método para mostrar alerta de error
   async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
// Función para validar el formato del email
   validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular básica para validar email
    return emailRegex.test(email);
  }

  login() {
    // Verificar que el campo de correo no esté vacío
    if (!this.email) {
     this.mostrarAlerta('El campo de correo no puede estar vacío.');
     return;
   }

   // Validar el formato del correo
  if (!this.validarEmail(this.email)) {
    this.mostrarAlerta('El formato del correo es inválido.');
    return;
  }

   // Verificar que la contraseña no esté vacía
   if (!this.password) {
    this.mostrarAlerta('El campo de contraseña no puede estar vacío.');
    return;
  }
    
    // Si todas las validaciones son correctas, navega a la página "home"
  this.userService.setUser(this.email);
  this.navCtrl.navigateForward(['/tabs/home']);
 
}

  registro()
  {
    this.navCtrl.navigateForward(['/register']);
  }

}
 
