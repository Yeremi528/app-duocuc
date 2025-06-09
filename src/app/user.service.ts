import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private email: string = '';
  private password: string = '';

  setUser(email: string) {
    this.email = email;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  clearUser() {
    this.email = '';
    this.password = '';
  }
}
