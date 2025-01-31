import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonList,
  AlertController,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  ModalController,
  PopoverController,
} from '@ionic/angular/standalone';
import { createOutline, settingsOutline, trashOutline } from 'ionicons/icons';
import { authFetch, API_URL, getTrips, Trip } from '../utils/api_utils';
import { EditTripModalComponent } from '../edit-trip-modal/edit-trip-modal.component';
import { TripDetailsModalComponent } from '../trip-details-modal/trip-details-modal.component';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
  ],
})
export class Tab1Page {
  trips: Trip[] = [];
  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private router: Router
  ) {
    addIcons({
      'create-outline': createOutline,
      'trash-outline': trashOutline,
      'settings-outline': settingsOutline,
    });
  }

  ionViewWillEnter() {
    getTrips().then((trips) => {
      this.trips = trips;
    });
  }

  async showTripDetails(trip: Trip) {
    const modal = await this.modalController.create({
      component: TripDetailsModalComponent,
      componentProps: {
        trip,
      },
    });
    await modal.present();
  }

  async editTrip(event: Event, trip: Trip) {
    event.stopPropagation();
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

  async removeTrip(event: Event, trip: Trip) {
    event.stopPropagation();

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
            if (trip.shared) {
              await authFetch(`${API_URL}/trips/delete_shared`, {
                method: 'DELETE',
                body: JSON.stringify({
                  trip_id: trip.id,
                  user_id: parseInt(localStorage.getItem('user_id')!),
                }),
              });
            } else {
              await authFetch(`${API_URL}/trips/${trip.id}`, {
                method: 'DELETE',
              });
            }
            const tripId = trip.id;
            this.trips = this.trips.filter((trip) => trip.id !== tripId);
          },
        },
      ],
    });

    await alert.present();
  }
}
