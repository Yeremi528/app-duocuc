import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController,createAnimation } from '@ionic/angular';
import { WeatherService } from 'src/app/weather.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements  AfterViewInit {

  email: string = '';
  password: string = '';

  temp: number = 0;


  constructor(
    private readonly navCtrl: NavController,
    private readonly route: ActivatedRoute,
    private weather: WeatherService
  ) { }
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

  ngOnInit(){
    this.obtenerClima();
  }

   async obtenerClima(){
     try {
       this.weather.getWeatherByCity("santiago").subscribe(data => {
       this.temp = data.main.temp;
       });

     } catch (err) { 
       this.temp = 0;
     }
   }


}
