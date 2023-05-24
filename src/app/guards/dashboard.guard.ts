import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate() {
    let user: any = await JSON.parse(localStorage.getItem('GURAMI'));

    if (user != null) {
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }
}
