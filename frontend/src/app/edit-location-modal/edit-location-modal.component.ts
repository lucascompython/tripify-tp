import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
  authFetch,
  API_URL,
  Location as BaseLocation,
} from '../utils/api_utils';
import { ToastController } from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface Location extends BaseLocation {
  id: number;
}

@Component({
  selector: 'app-edit-location-modal',
  templateUrl: './edit-location-modal.component.html',
  styleUrls: ['./edit-location-modal.component.scss'],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, TranslateModule],
  standalone: true,
})
export class EditLocationModalComponent implements OnInit {
  @Input() location!: Location;
  locationForm: FormGroup;
  locationStatuses = ['Planned', 'Visited'];

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private toastController: ToastController,
    private translateService: TranslateService
  ) {
    this.locationForm = this.fb.group({
      location: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
      start_date: [''],
      end_date: [''],
    });
  }

  ngOnInit() {
    if (this.location) {
      this.locationForm.patchValue(this.location);
    }
  }

  async editLocation() {
    if (this.locationForm.valid) {
      const locationData = this.locationForm.value;
      locationData.start_date = new Date(locationData.end_date)
        .toISOString()
        .slice(0, 10);
      locationData.end_date = new Date(locationData.end_date)
        .toISOString()
        .slice(0, 10);

      locationData.trip_id = this.location.trip_id;

      const response = await authFetch(
        `${API_URL}/locations/${this.location.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(locationData),
        }
      );

      if (response.ok) {
        locationData.id = this.location.id;
        this.modalController.dismiss(locationData);
        const toast = await this.toastController.create({
          message: this.translateService.instant(
            'EDIT_LOCATION.LOCATION_UPDATED',
            {
              locationName: locationData.location,
            }
          ),
          color: 'success',
          duration: 2000,
        });
        await toast.present();
      } else {
        const toast = await this.toastController.create({
          message: this.translateService.instant(
            'EDIT_LOCATION.FAILED_TO_UPDATE_LOCATION'
          ),
          color: 'danger',
          duration: 2000,
        });
        await toast.present();
      }
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
