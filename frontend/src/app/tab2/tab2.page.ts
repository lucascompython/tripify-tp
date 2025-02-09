import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {
  API_URL,
  authFetch,
  Location,
  Trip,
  TripStatus,
  TripType,
} from '../utils/api_utils';
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { SelectLocationModalComponent } from '../select-location-modal/select-location-modal.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule, TranslateModule],
  providers: [ModalController],
  standalone: true,
})
export class Tab2Page {
  tripForm: FormGroup;
  tripTypes = Object.keys(TripType);
  tripStatuses = Object.keys(TripStatus);
  selectedLocations: Location[] = [];
  newLocations: Location[] = [];

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private modalController: ModalController,
    private translateService: TranslateService
  ) {
    this.tripForm = this.fb.group({
      description: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
      destination: ['', Validators.required],
      departure: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
  }

  async createTrip() {
    if (this.tripForm.valid) {
      const tripData = this.tripForm.value;
      tripData.start_date = new Date(tripData.start_date)
        .toISOString()
        .slice(0, 10);
      tripData.end_date = new Date(tripData.end_date)
        .toISOString()
        .slice(0, 10);

      const trip: Trip = {
        owner_id: parseInt(localStorage.getItem('user_id')!),
        ...tripData,
      };

      const respTrip = await authFetch(`${API_URL}/trips/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trip),
      });
      const tripId = parseInt(await respTrip.text());

      if (this.newLocations.length > 0) {
        for (let i = 0; i < this.newLocations.length; i++) {
          this.newLocations[i].trip_id = tripId;
        }
        await authFetch(`${API_URL}/locations/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newLocations),
        });
      }

      if (respTrip.ok) {
        this.tripForm.reset();
        const toast = await this.toastController.create({
          message: this.translateService.instant('ADD_TRIP.TRIP_CREATED', {
            tripName: trip.description,
          }),
          color: 'success',
          duration: 2000,
        });
        await toast.present();
      } else {
        const toast = await this.toastController.create({
          message: this.translateService.instant(
            'ADD_TRIP.FAILED_TO_CREATE_TRIP'
          ),
          color: 'danger',
          duration: 2000,
        });
        await toast.present();
      }
    }
  }

  async openSelectLocationModal() {
    const modal = await this.modalController.create({
      component: SelectLocationModalComponent,
    });

    await modal.present();

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.selectedLocations = data.data.selectedLocations;
        this.newLocations = data.data.newLocations;
      }
    });
  }
}
