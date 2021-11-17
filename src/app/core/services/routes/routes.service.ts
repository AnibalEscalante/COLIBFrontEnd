import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(
    private router: Router
  ) { }

  redirect(entity: string | null) {
    if (entity) {
      if (entity === 'User') {
        this.router.navigate(['/user/home']);
      }
    } else {
      this.router.navigate(['/visitor/landing']);
    }
  }

  logout() {
    this.router.navigate(['/visitor/landing']);
  }
}
