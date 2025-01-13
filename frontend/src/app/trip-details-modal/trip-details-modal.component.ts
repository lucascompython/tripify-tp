import { DatePipe } from '@angular/common';
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
import { Trip } from '../utils/api_utils';

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
  ],
  providers: [DatePipe],
  standalone: true,
})
export class TripDetailsModalComponent implements OnInit {
  @Input()
  trip!: Trip;

  constructor(
    private modalController: ModalController,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }
}
