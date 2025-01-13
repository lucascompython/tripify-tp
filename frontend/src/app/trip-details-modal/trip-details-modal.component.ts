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
} from '@ionic/angular/standalone';
import { API_URL, authFetch, Trip, User } from '../utils/api_utils';

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
