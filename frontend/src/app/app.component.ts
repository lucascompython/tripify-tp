import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { authFetch, API_URL, setTranslateService } from './utils/api_utils';
import { register } from 'swiper/element/bundle';
import { TranslateService } from '@ngx-translate/core';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
  standalone: true,
})
export class AppComponent implements OnInit {
  hasShownIntro = false;
  constructor(private router: Router, private translate: TranslateService) {
    translate.addLangs(['en', 'pt']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang() || 'en';
    translate.use(browserLang.match(/en|pt/) ? browserLang : 'en');

    setTranslateService(translate);
  }
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
          if (!this.hasShownIntro) {
            this.hasShownIntro = true;
            this.router.navigate(['/intro-sliders']);
          } else {
            this.router.navigate(['/login']);
          }
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
        if (!this.hasShownIntro) {
          this.hasShownIntro = true;
          this.router.navigate(['/intro-sliders']);
        } else {
          this.router.navigate(['/login']);
        }
      }
    }
  }
}
