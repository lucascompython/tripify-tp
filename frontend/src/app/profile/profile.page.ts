import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL, authFetch, User } from '../utils/api_utils';
import {
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  imports: [IonContent, IonItem, IonLabel, IonInput, IonButton],
  schemas: [],
  standalone: true,
})
export class ProfilePage implements OnInit {
  userId = localStorage.getItem('user_id');
  user!: User;
  constructor(private router: Router) {}

  ngOnInit() {
    this.fetchUser();
  }

  async fetchUser() {
    const resp = await authFetch(`${API_URL}/users/${this.userId}`);
    const data = await resp.json();
    this.user = data;
  }
}
