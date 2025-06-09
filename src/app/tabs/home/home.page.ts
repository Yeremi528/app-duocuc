import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false, 
})
export class HomePage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private route: ActivatedRoute) { }
  plans(){
    this.navCtrl.navigateForward(['/tabs/plans']);
  }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
      // Aquí puedes manejar los parámetros de la URL si es necesario
      // Por ejemplo, si quieres mostrar el email y la contraseña en la consola:
      this.email = params['email'] || '';
      this.password = params['password'] || '';
      console.log('Email:', this.email);
      
  })
  }
}
