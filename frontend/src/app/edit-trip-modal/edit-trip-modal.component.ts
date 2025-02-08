import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ModalController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonButtons,
  IonSelectOption,
  IonSelect,
  ToastController,
} from '@ionic/angular/standalone';
import { authFetch, API_URL, TripType, TripStatus } from '../utils/api_utils';

@Component({
  selector: 'app-edit-trip-modal',
  templateUrl: 'edit-trip-modal.component.html',
  styleUrls: ['edit-trip-modal.component.scss'],
  imports: [
    CommonModule,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    ReactiveFormsModule,
    IonSelect,
    IonSelectOption,
  ],
  standalone: true,
})
export class EditTripModalComponent implements OnInit {
  @Input() trip: any;
  editTripForm: FormGroup;
  tripTypes = Object.keys(TripType);
  tripStatuses = Object.keys(TripStatus);

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private toastController: ToastController
  ) {
    this.editTripForm = this.fb.group({
      description: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
      destination: ['', Validators.required],
      departure: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.trip) {
      this.editTripForm.patchValue(this.trip);
    }
  }

  async saveTrip() {
    if (this.editTripForm.valid) {
      const updatedTrip = this.editTripForm.value;
      updatedTrip.start_date = new Date(updatedTrip.start_date)
        .toISOString()
        .slice(0, 10);
      updatedTrip.end_date = new Date(updatedTrip.end_date)
        .toISOString()
        .slice(0, 10);
      updatedTrip.owner_id = this.trip.owner_id;

      try {
        const response = await authFetch(`${API_URL}/trips/${this.trip.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTrip),
        });

        if (response.ok) {
          updatedTrip.id = this.trip.id;
          this.modalController.dismiss(updatedTrip);
          const toast = await this.toastController.create({
            message: 'Trip updated',
            color: 'success',
            duration: 2000,
          });
          await toast.present();
        } else {
          const toast = await this.toastController.create({
            message: 'Failed to update trip',
            color: 'danger',
            duration: 2000,
          });
          await toast.present();
        }
      } catch (error) {
        console.error('API error:', error);
      }
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
