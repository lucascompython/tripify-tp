import { Component, OnInit } from '@angular/core';
import { API_URL, authFetch, User } from '../utils/api_utils';
import {
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonToolbar,
  IonHeader,
  IonTitle,
  ToastController,
  IonButtons,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToolbarWithLanguageSelect } from '../toolbar-with-language-select/toolbar-with-language-select.component';

@Component({
  selector: 'app-register',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  imports: [
    IonHeader,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    ToolbarWithLanguageSelect,
    ReactiveFormsModule,
    TranslateModule,
  ],
  schemas: [],
  standalone: true,
})
export class ProfilePage implements OnInit {
  userId = localStorage.getItem('user_id');
  user!: User;
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    public translateService: TranslateService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      newPassword: [''],
      currentPassword: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchUser();
  }

  switchLanguage(event: Event) {}

  async fetchUser() {
    const resp = await authFetch(`${API_URL}/users/${this.userId}`);
    const data = await resp.json();
    this.user = data;

    this.profileForm.setValue({
      name: this.user.name,
      email: this.user.email,
      newPassword: '',
      currentPassword: '',
    });
  }

  async onSubmit() {
    if (this.profileForm.valid) {
      const response = await authFetch(`${API_URL}/users/${this.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.profileForm.value.name,
          email: this.profileForm.value.email,
          new_password: this.profileForm.value.newPassword,
          current_password: this.profileForm.value.currentPassword,
        }),
      });
      if (response.ok) {
        const toast = await this.toastController.create({
          message: 'Profile updated successfully',
          color: 'success',
          duration: 2000,
        });
        await toast.present();
      } else {
        const toast = await this.toastController.create({
          message: 'Failed to update profile',
          color: 'danger',
          duration: 2000,
        });
        await toast.present();
      }
    }
  }
}
