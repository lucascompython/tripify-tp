import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  AlertController,
  IonButtons,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { API_URL } from '../utils/api_utils';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToolbarWithLanguageSelect } from '../toolbar-with-language-select/toolbar-with-language-select.component';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  imports: [
    IonHeader,
    IonContent,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    ToolbarWithLanguageSelect,
    ReactiveFormsModule,
    TranslateModule,
  ],
  standalone: true,
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    public translateService: TranslateService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const response = await fetch(`${API_URL}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.text();
          const [id, name] = data.split(',');
          const token = response.headers.get('Authorization')!;
          localStorage.setItem('user_id', id);
          localStorage.setItem('name', name);
          localStorage.setItem('token', token);

          window.location.pathname = '/';
        } else {
          this.showLoginErrorAlert();
        }
      } catch (error) {
        this.showLoginErrorAlert();
      }
    }
  }

  async showLoginErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Login Failed',
      message: 'Invalid email or password. Please try again.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
