import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

const API_URL = 'http://localhost:1234';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor() {}
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
          window.location.href = '/login';
        }
      }

      if (
        window.location.pathname === '/login' ||
        window.location.pathname === '/register'
      ) {
        window.location.href = '/';
      }
    } catch (e) {
      if (
        window.location.pathname !== '/register' &&
        window.location.pathname !== '/login'
      ) {
        window.location.href = '/login';
      }
    }
  }
}
