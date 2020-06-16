import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log("canActivate")
    return this.checkLogin();
  }

  checkLogin(): boolean {
    console.log("checkLogin")
    if (this.authService.isLoggedIn()) { return true; }
    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
