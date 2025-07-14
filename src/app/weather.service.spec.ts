import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { HttpClient } from '@angular/common/http';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpClient: jasmine.SpyObj<HttpClient>

  beforeEach(async () => {
    httpClient = jasmine.createSpyObj('HttpClient',['get'])

    await TestBed.configureTestingModule({
        providers: [
          {provide: HttpClient, useValue: httpClient},
        ]
    }).compileComponents();
    service = TestBed.inject(WeatherService);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
