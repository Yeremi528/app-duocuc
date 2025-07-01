import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular'; 

import { DbserviceService } from '../dbservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage   {

  email: string = '';
  password: string = '';

  constructor(
    private readonly navCtrl: NavController,
    private alertController: AlertController,
    private dbService: DbserviceService
    ) { }


  ngOnInit() {
    // Inicializar la base de datos
    this.dbService.getIsDBReady().subscribe((isDBReady: boolean) => {
      if (isDBReady) {
        // Aquí puedes realizar acciones adicionales si es necesario
      }
    });
  }
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

  if (!this.password) {
    this.mostrarAlerta('El campo de contraseña no puede estar vacío.');
    return;
  }

  this.validateUser(this.email, this.password);



  }

  validateUser(email: string, password:string){
    this.dbService.validateUser(email, password).then((isValid: boolean) => {
      if (isValid) {
        localStorage.setItem('token', 'true'); 
        localStorage.setItem('email', email); 
        this.navCtrl.navigateForward(['/tabs/home']);
      } else {
        this.mostrarAlerta('Credenciales inválidas. Por favor, inténtalo de nuevo.');
      }
    }).catch((error: any) => {
      console.error('Error al validar usuario:', error);
      this.mostrarAlerta('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    });
  }




  registro()
  {
    this.navCtrl.navigateForward(['/register']);
  }

}
 
