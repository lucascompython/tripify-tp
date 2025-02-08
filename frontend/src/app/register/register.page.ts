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
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
  AlertController,
} from '@ionic/angular/standalone';
import { API_URL } from '../utils/api_utils';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
  imports: [
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCard,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async register() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      try {
        const response = await fetch(`${API_URL}/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
          const data = await response.text();
          const [id, name] = data.split(',');
          const token = response.headers.get('Authorization')!;
          localStorage.setItem('user_id', id);
          localStorage.setItem('name', name);
          localStorage.setItem('token', token);

          this.router.navigate(['/login']);
        } else if (response.status === 409) {
          this.showAccountExistsAlert();
        } else {
          this.showGenericErrorAlert();
        }
      } catch (error) {
        console.error('API error:', error);
      }
    }
  }

  async showAccountExistsAlert() {
    const alert = await this.alertController.create({
      header: 'Account Exists',
      message: 'An account with this email already exists.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-button-left',
        },
        {
          text: 'Login',
          handler: () => {
            this.navigateToLogin();
          },
        },
      ],
    });

    await alert.present();
  }

  async showGenericErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Registration Failed',
      message: 'An error occurred during registration. Please try again later.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
