import { Injectable, ɵConsole } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  constructor(private router: Router) {}
  async canActivate() {
    let user: any = await JSON.parse(localStorage.getItem('GURAMI'));

    console.log(user);
    if (user != null) {
      this.router.navigateByUrl('home');

      return false;
    } else {
      return true;
    }
  }
}
