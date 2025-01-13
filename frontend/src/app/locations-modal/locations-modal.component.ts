import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { authFetch, API_URL, Location } from '../utils/api_utils';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-locations-modal',
  templateUrl: './locations-modal.component.html',
  styleUrls: ['./locations-modal.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    DatePipe,
    CommonModule,
  ],
  providers: [ModalController],
})
export class LocationsModalComponent {
  locations: Location[] = [];

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }
}
