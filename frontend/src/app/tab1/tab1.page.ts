import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  AlertController,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  ModalController,
} from '@ionic/angular/standalone';
import { createOutline, trashOutline } from 'ionicons/icons';
import { authFetch, API_URL, getTrips, Trip } from '../utils/api_utils';
import { EditTripModalComponent } from '../edit-trip-modal/edit-trip-modal.component';
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    EditTripModalComponent,
  ],
})
export class Tab1Page implements OnInit {
  trips: Trip[] = [];
  constructor(
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    addIcons({
      'create-outline': createOutline,
      'trash-outline': trashOutline,
    });
  }

  ngOnInit() {
    getTrips().then((trips) => {
      this.trips = trips;
    });
  }

  async editTrip(trip: Trip) {
    const modal = await this.modalController.create({
      component: EditTripModalComponent,
      componentProps: {
        trip,
      },
    });
    modal.onDidDismiss().then(async (res) => {
      if (res.data) {
        for (let i = 0; i < this.trips.length; i++) {
          if (this.trips[i].id === res.data.id) {
            this.trips[i] = res.data;
          }
        }
      }
    });
    await modal.present();
  }

  async removeTrip(tripId: number) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete this trip?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Delete',
          handler: async () => {
            await authFetch(`${API_URL}/trips/${tripId}`, {
              method: 'DELETE',
            });
            this.trips = this.trips.filter((trip) => trip.id !== tripId);
          },
        },
      ],
    });

    await alert.present();
  }
}
