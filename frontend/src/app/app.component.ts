import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

const API_URL = 'http://localhost:1234';

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
      const resp = await fetch(`${API_URL}/users/check`, {
        headers: {
          Authorization: localStorage.getItem('token') ?? '',
        },
      });
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
