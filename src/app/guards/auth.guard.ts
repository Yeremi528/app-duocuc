import {Injectable} from "@angular/core"
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(): boolean {
    // Check if token exists in localStorage
    const isAuthenticated = !!localStorage.getItem('token'); 

    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      this.router.navigate(['/login']); 
      return false;
    }

    return true; 
  }
}