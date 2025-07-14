import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { NavController } from '@ionic/angular';
import { WeatherService } from 'src/app/weather.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  let navCtrl: jasmine.SpyObj<NavController>
  let weather: jasmine.SpyObj<WeatherService>

  beforeEach(async () => {
    navCtrl = jasmine.createSpyObj('navCtrl', ['navigateForward'])
    weather = jasmine.createSpyObj('WeatherService', ['getWeatherByCity'])

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        {provide:NavController, useValue: navCtrl},
        {provide: WeatherService, useValue: weather}
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
