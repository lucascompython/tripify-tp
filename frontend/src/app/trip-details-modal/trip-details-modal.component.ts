import { CommonModule, DatePipe } from '@angular/common';
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
  IonButtons,
  IonFooter,
} from '@ionic/angular/standalone';
import { API_URL, authFetch, Trip, User } from '../utils/api_utils';
import { ShareTripModalComponent } from '../share-trip-modal/share-trip-modal.component';

@Component({
  selector: 'app-trip-details-modal',
  templateUrl: 'trip-details-modal.component.html',
  styleUrls: ['trip-details-modal.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonItem,
    IonLabel,
    IonButtons,
    DatePipe,
    CommonModule,
    IonFooter,
  ],
  providers: [DatePipe],
  standalone: true,
})
export class TripDetailsModalComponent implements OnInit {
  @Input()
  trip!: Trip;
  owner: User | null = null;

  constructor(
    private modalController: ModalController,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    if (this.trip.shared) {
      this.getOwner();
    }
  }

  async addComment() {
    console.log('addComment');
  }
  async shareTrip() {
    const modal = await this.modalController.create({
      component: ShareTripModalComponent,
      componentProps: { tripId: this.trip.id, ownerId: this.trip.owner_id },
    });
    await modal.present();
  }

  async getOwner() {
    const owner_id = this.trip.owner_id;
    const resp = await authFetch(`${API_URL}/users/${owner_id}`);

    const user: User = await resp.json();
    this.owner = user;
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
