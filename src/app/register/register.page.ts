import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular'; 
import { DbserviceService } from '../dbservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage  {
  nombre: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private readonly dbService: DbserviceService,private readonly navCtrl: NavController,private readonly alertController: AlertController) { }

  ngOnInit() {
    // Inicializar la base de datos

    this.dbService.getIsDBReady().subscribe((isDBReady: boolean) => {
      if (isDBReady) {
      }
    })
  }
  async mostrarAlerta(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    })

    await alert.present();
  }


  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular básica para validar email
    return emailRegex.test(email);
  }
  validateName(name: string): boolean {
    if (name.length == 0) {
      return false
    }
    return true
  }

  validatePassword(password: string): boolean {
    if (password.length < 3) {
      return false
    }
    return true
  }


  validateConfirmPassword(password: string, confirmPassword: string): boolean {
    if (password !== confirmPassword) {
      return false
    }
    return true
  }
  register() {
    // Validar nombre
    if (!this.validateName(this.nombre)) {
      this.mostrarAlerta('El nombre no puede estar vacío.');
      return;
    }

    // Validar email
    if (!this.validateEmail(this.email)) {
      this.mostrarAlerta('El formato del correo es inválido.');
      return;
    }

    // Validar contraseña
    if (!this.validatePassword(this.password)) {
      this.mostrarAlerta('La contraseña debe tener al menos 3 caracteres.');
      return;
    }

    // Validar confirmación de contraseña
    if (!this.validateConfirmPassword(this.password, this.confirmPassword)) {
      this.mostrarAlerta('Las contraseñas no coinciden.');
      return;
    }


    localStorage.setItem('token', 'true'); 
    localStorage.setItem('email', this.email);
    this.guardarDatos();
    this.navCtrl.navigateForward(['/tabs/home'])}


  login() {
    this.navCtrl.navigateForward(['/login']);
  }

  async presentAlert(message: string){
    const alert  = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
  })
  return alert.present();
}

  guardarDatos(){
    this.dbService.insertUser(this.nombre, this.email, this.password)
      .then(() => {
        this.presentAlert('Usuario registrado correctamente');

  }).catch(e => {
        this.presentAlert('Error al registrar el usuario: ' + e.message);
      }
      );
    }


}
