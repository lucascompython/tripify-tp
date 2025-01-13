import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  authFetch,
  API_URL,
  Location as BaseLocation,
  Comment,
} from '../utils/api_utils';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CommonModule, DatePipe } from '@angular/common';

interface Location extends BaseLocation {
  id: number;
  trip_description: string;
}

@Component({
  selector: 'app-location-details-modal',
  templateUrl: './location-details-modal.component.html',
  styleUrls: ['./location-details-modal.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    IonLabel,
    DatePipe,
    IonList,
    IonListHeader,
    CommonModule,
  ],
  providers: [ModalController],
})
export class LocationDetailsModalComponent implements OnInit {
  @Input() location!: Location;
  comments: Comment[] = [];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.fetchComments();
  }

  async fetchComments() {
    const response = await authFetch(
      `${API_URL}/locations/${this.location.id}/comments`
    );
    if (response.ok) {
      this.comments = await response.json();
    } else {
      console.error('Failed to fetch comments');
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
