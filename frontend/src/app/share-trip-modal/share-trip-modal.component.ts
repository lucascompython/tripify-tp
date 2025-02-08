import { Component, Input, OnInit } from '@angular/core';
import {
  ModalController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonList,
  IonButtons,
  IonFooter,
  ToastController,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { authFetch, API_URL, User } from '../utils/api_utils';

@Component({
  selector: 'app-share-trip-modal',
  templateUrl: 'share-trip-modal.component.html',
  styleUrls: ['share-trip-modal.component.scss'],
  imports: [
    IonFooter,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonList,
    IonButtons,
    CommonModule,
  ],
  standalone: true,
})
export class ShareTripModalComponent implements OnInit {
  @Input()
  tripId!: number;
  ownerId!: number;
  users: User[] = [];
  selectedUserIds: Set<number> = new Set();

  constructor(
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const response = await authFetch(
        `${API_URL}/trips/${this.tripId}/${this.ownerId}/valid_users`
      );
      if (response.ok) {
        this.users = await response.json();
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('API error:', error);
    }
  }

  toggleUserSelection(userId: number) {
    if (this.selectedUserIds.has(userId)) {
      this.selectedUserIds.delete(userId);
    } else {
      this.selectedUserIds.add(userId);
    }
  }

  async shareTrip() {
    try {
      const response = await authFetch(`${API_URL}/trips/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trip_id: this.tripId,
          user_ids: Array.from(this.selectedUserIds),
        }),
      });
      if (response.ok) {
        const users = this.users.filter((user) =>
          this.selectedUserIds.has(user.id)
        );
        const userNames = users.map((user) => user.name).join(', ');
        const toast = await this.toastController.create({
          message: `Trip shared successfully with ${userNames}!`,
          color: 'success',
          duration: 2000,
        });
        await toast.present();

        this.modalController.dismiss();
      } else {
        const toast = await this.toastController.create({
          message: 'Failed to share trip',
          color: 'danger',
          duration: 2000,
        });
        await toast.present();
      }
    } catch (error) {
      console.error('API error:', error);
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
