import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { authFetch, API_URL } from './utils/api_utils';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {
    this.checkUser();
  }

  async checkUser() {
    try {
      const resp = await authFetch(`${API_URL}/users/check`);
      if (!resp.ok) {
        if (
          window.location.pathname !== '/login' &&
          window.location.pathname !== '/register'
        ) {
          this.router.navigate(['/login']);
        }
      }

      if (
        window.location.pathname === '/login' ||
        window.location.pathname === '/register'
      ) {
        this.router.navigate(['/']);
      }
    } catch (e) {
      if (
        window.location.pathname !== '/register' &&
        window.location.pathname !== '/login'
      ) {
        this.router.navigate(['/login']);
      }
    }
  }
}
