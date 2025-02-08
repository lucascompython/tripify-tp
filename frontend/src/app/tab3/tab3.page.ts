import { Component, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
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
  ],
})
export class Tab3Page implements OnInit {
  locations: Location[] = [];

  constructor(private modalController: ModalController) {
    addIcons({
      'create-outline': createOutline,
      'trash-outline': trashOutline,
    });
  }

  ngOnInit() {
    this.fetchLocations();
  }

  async fetchLocations() {
    const response = await authFetch(`${API_URL}/locations/get`);
    if (response.ok) {
      this.locations = await response.json();
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
    const response = await authFetch(`${API_URL}/locations/${locationId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      this.locations = this.locations.filter((loc) => loc.id !== locationId);
    } else {
      console.error('Failed to delete location');
    }
  }
}
