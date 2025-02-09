import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { authFetch, API_URL, Location } from '../utils/api_utils';
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AddLocationModalComponent } from '../add-location-modal/add-location-modal.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select-location-modal',
  templateUrl: './select-location-modal.component.html',
  styleUrls: ['./select-location-modal.component.scss'],
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
    IonCheckbox,
    IonFooter,
    CommonModule,
    TranslateModule,
  ],
})
export class SelectLocationModalComponent implements OnInit {
  locations: Location[] = [];
  newLocations: Location[] = [];
  selectedLocations: Set<Location> = new Set();

  constructor(private modalController: ModalController) {}

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

  isSelected(location: Location): boolean {
    return this.selectedLocations.has(location);
  }

  toggleLocationSelection(location: Location) {
    if (this.selectedLocations.has(location)) {
      this.selectedLocations.delete(location);
    } else {
      this.selectedLocations.add(location);
    }
  }

  async openAddLocationModal() {
    const modal = await this.modalController.create({
      component: AddLocationModalComponent,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.locations.push(result.data);
        this.newLocations.push(result.data);
        this.selectedLocations.add(result.data);
      }
    });

    await modal.present();
  }

  confirmSelection() {
    this.modalController.dismiss({
      selectedLocations: Array.from(this.selectedLocations),
      newLocations: this.newLocations,
    });
  }

  selectLocation(location: any) {
    this.modalController.dismiss(location);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
