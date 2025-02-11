import { Component } from '@angular/core';
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
  IonHeader,
  IonToolbar,
  IonTitle,
  ToastController,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { createOutline, settingsOutline, trashOutline } from 'ionicons/icons';
import { authFetch, API_URL, getTrips, Trip } from '../utils/api_utils';
import { EditTripModalComponent } from '../edit-trip-modal/edit-trip-modal.component';
import { TripDetailsModalComponent } from '../trip-details-modal/trip-details-modal.component';
import { addIcons } from 'ionicons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    TranslateModule,
  ],
})
export class Tab1Page {
  trips: Trip[] = [];
  filteredTrips: Trip[] = [];
  filterOrOrder = 'filter';
  selectedStatus = '';
  orderBy = 'newest';
  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private toastController: ToastController,
    private translateService: TranslateService
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
      this.filteredTrips = trips;
    });
  }

  filterTrips(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    if (query === '') {
      this.filteredTrips = this.trips;
    } else {
      this.filteredTrips = this.trips.filter((trip) =>
        trip.description.toLowerCase().includes(query)
      );
    }
  }

  filterByStatus(event: any) {
    this.selectedStatus = event.detail.value;
    if (this.selectedStatus === '') {
      this.filteredTrips = this.trips;
    } else {
      this.filteredTrips = this.trips.filter(
        (trip) => trip.status.toLowerCase() === this.selectedStatus
      );
    }
  }

  orderTrips(event: any) {
    this.orderBy = event.detail.value;
    if (this.orderBy === 'newest') {
      this.filteredTrips.sort(
        (a, b) =>
          new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
      );
    } else {
      this.filteredTrips.sort(
        (a, b) =>
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
      );
    }
  }

  onFilterOrOrderChange(event: any) {
    this.filterOrOrder = event.detail.value;
    if (this.filterOrOrder === 'filter') {
      this.filterByStatus({ detail: { value: this.selectedStatus } });
    } else {
      this.orderTrips({ detail: { value: this.orderBy } });
    }
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
      header: this.translateService.instant('DELETE_TRIP.CONFIRM'),
      message: this.translateService.instant('DELETE_TRIP.ARE_YOU_SURE'),
      buttons: [
        {
          text: this.translateService.instant('DELETE_TRIP.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: this.translateService.instant('DELETE_TRIP.DELETE'),
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
            const toast = await this.toastController.create({
              message: this.translateService.instant(
                'DELETE_TRIP.TRIP_DELETED',
                { tripName: trip.description }
              ),
              color: 'success',
              duration: 2000,
            });
            await toast.present();
            this.trips = this.trips.filter((trip) => trip.id !== tripId);
          },
        },
      ],
    });

    await alert.present();
  }
}
