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
} from '@ionic/angular/standalone';

const API_URL = 'http://localhost:1234';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  imports: [
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
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController
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
          const token = await response.text();
          localStorage.setItem('token', token);
          this.router.navigate(['/']);
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
