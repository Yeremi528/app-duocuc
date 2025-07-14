import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { AlertController, NavController } from '@ionic/angular';

describe('LoginPage a', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let navCtrlSpy:jasmine.SpyObj<AlertController>
  let alertControllerSpy: jasmine.SpyObj<AlertController>

  beforeEach(async() => {
    navCtrlSpy = jasmine.createSpyObj('navCtrl', ['navigateForward'])
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create'])

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        {provide: NavController, useValue: navCtrlSpy},
        {provide: AlertController, useValue: alertControllerSpy},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage)
    component = fixture.componentInstance;
    fixture.detectChanges()

    })


    it('debería crear el componente', ()=> {
      expect(component).toBeTruthy();
    })

    it('Muestra una alerta si el formato del correo no es valido', async () => {
      component.email = "test.com"
      component.password = "123456"

      alertControllerSpy.create.and.returnValue(Promise.resolve({
        present: jasmine.createSpy('present'),
      }as any
    ))

      await component.login()
      
      expect(alertControllerSpy.create).toHaveBeenCalledWith({
        header: 'Error',
        message: 'El formato del correo es inválido.',
        buttons: ['OK']
      })

  });


});
