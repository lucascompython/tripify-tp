import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  ModalController,
  IonIcon,
  IonSearchbar,
  AlertController,
  ToastController,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import {
  API_URL,
  authFetch,
  Location as BaseLocation,
} from '../utils/api_utils';
import { EditLocationModalComponent } from '../edit-location-modal/edit-location-modal.component';
import { LocationDetailsModalComponent } from '../location-details-modal/location-details-modal.component';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface Location extends BaseLocation {
  id: number;
}

// Add id to the Location interface

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    CommonModule,
    IonIcon,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    TranslateModule,
  ],
})
export class Tab3Page {
  locations: Location[] = [];
  filteredLocations: Location[] = [];
  filterOrOrder = 'filter';
  selectedStatus = '';
  orderBy = 'newest';

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private translateService: TranslateService
  ) {
    addIcons({
      'create-outline': createOutline,
      'trash-outline': trashOutline,
    });
  }

  ionViewWillEnter() {
    this.fetchLocations();
  }

  filterLocations(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    if (query === '') {
      this.filteredLocations = this.locations;
    } else {
      this.filteredLocations = this.locations.filter((location) =>
        location.location.toLowerCase().includes(query)
      );
    }
  }

  filterByStatus(event: any) {
    this.selectedStatus = event.detail.value;
    if (this.selectedStatus === '') {
      this.filteredLocations = this.locations;
    } else {
      this.filteredLocations = this.locations.filter(
        (location) => location.status.toLowerCase() === this.selectedStatus
      );
    }
  }

  orderLocations(event: any) {
    this.orderBy = event.detail.value;
    if (this.orderBy === 'newest') {
      this.filteredLocations = this.filteredLocations.sort(
        (a, b) =>
          new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
      );
    } else if (this.orderBy === 'oldest') {
      this.filteredLocations = this.filteredLocations.sort(
        (a, b) =>
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
      );
    }
  }

  onFilterOrOrderChange(event: any) {
    this.filterOrOrder = event.detail.value;
  }

  async fetchLocations() {
    const response = await authFetch(`${API_URL}/locations/get`);
    if (response.ok) {
      this.locations = await response.json();
      this.filteredLocations = this.locations;
    } else {
      console.error('Failed to fetch locations');
    }
  }

  async openEditLocationModal(location: any) {
    const modal = await this.modalController.create({
      component: EditLocationModalComponent,
      componentProps: { location },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        for (let i = 0; i < this.locations.length; i++) {
          if (this.locations[i].id === result.data.id) {
            this.locations[i] = result.data;
            break;
          }
        }
      }
    });

    await modal.present();
  }

  async openLocationDetailsModal(location: any) {
    const modal = await this.modalController.create({
      component: LocationDetailsModalComponent,
      componentProps: { location },
    });

    await modal.present();
  }

  async deleteLocation(locationId: number) {
    const alert = await this.alertController.create({
      header: this.translateService.instant('DELETE_TRIP.CONFIRM'),
      message: this.translateService.instant('DELETE_LOCATION.ARE_YOU_SURE'),
      buttons: [
        {
          text: this.translateService.instant('DELETE_TRIP.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: this.translateService.instant('DELETE_TRIP.DELETE'),
          handler: async () => {
            const response = await authFetch(
              `${API_URL}/locations/${locationId}`,
              {
                method: 'DELETE',
              }
            );

            if (response.ok) {
              this.locations = this.locations.filter(
                (loc) => loc.id !== locationId
              );
              this.filteredLocations = this.locations;
              const toast = await this.toastController.create({
                message: this.translateService.instant(
                  'DELETE_LOCATION.LOCATION_DELETED'
                ),
                color: 'success',
                duration: 2000,
              });
              await toast.present();
            } else {
              const toast = await this.toastController.create({
                message: this.translateService.instant(
                  'DELETE_LOCATION.FAILED_TO_DELETE'
                ),
                color: 'danger',
                duration: 2000,
              });
              await toast.present();
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
