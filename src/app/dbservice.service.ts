import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {


  public db!: SQLiteObject;

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private toastController: ToastController) {
    this.initDatabase();
   }

  private initDatabase(){
    this.sqlite.create({
      name: 'mechanical_bikes.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.db = db;
      this.createTables();
      this.isDBReady.next(true);
      this.presentToast('Base de datos creada correctamente');

    }).catch(e => {
      this.presentToast('Error al crear la base de datos: ' + e.message);
    });
  }

  private createTables(){
    this.db.executeSql(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
        )`,[])
        .then(() => {
          this.presentToast('Tabla usuarios creada correctamente');
        })
        .catch(e => {
          this.presentToast('Error al crear la tabla usuarios: ' + e.message);
        });
  }

  insertUser(nombre: string, email: string, password: string) {
    return this.db.executeSql(`
      INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)
    `, [nombre, email, password])
    .then(() => {
      this.presentToast('Usuario registrado correctamente');
    })
    .catch(e => {
      this.presentToast('Error al registrar el usuario: ' + e.message);
    });
  }

  getUserByEmail(email: string) {
    return this.db.executeSql(`
      SELECT nombre FROM usuarios WHERE email = ?
    `, [email])
    .then(res => {
      if (res.rows.length > 0) {
        return res.rows.item(0);
      } else {
        return null;
      }
    })
    .catch(e => {
      this.presentToast('Error al obtener el usuario: ' + e.message);
      return null;
    });
  }

  validateUser(email: string, password: string) {
    return this.db.executeSql(`
      SELECT * FROM usuarios WHERE email = ? AND password = ?
    `, [email, password])
    .then(res => {
      if (res.rows.length > 0) {
        this.presentToast('Usuario validado correctamente');
        return true;
      } else {
        this.presentToast('Email o contraseña incorrectos');
        return false;
      }
    })
    .catch(e => {
      this.presentToast('Error al validar el usuario: ' + e.message);
      return false;
    });
  }

  getIsDBReady() {
    return this.isDBReady.asObservable();
  }


  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message, duration: 2000
    })

    toast.present();
  }
}
