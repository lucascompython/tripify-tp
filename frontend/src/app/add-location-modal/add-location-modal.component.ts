import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { authFetch, API_URL, LocationStatus } from '../utils/api_utils';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-location-modal',
  templateUrl: './add-location-modal.component.html',
  styleUrls: ['./add-location-modal.component.scss'],
  imports: [
    ReactiveFormsModule,
    IonContent,
    IonItem,
    IonLabel,
    IonSelectOption,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    CommonModule,
    IonInput,
    IonSelect,
  ],
})
export class AddLocationModalComponent implements OnInit {
  locationForm: FormGroup;
  locationStatuses = Object.values(LocationStatus);

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder
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

  ngOnInit() {}

  async addLocation() {
    if (this.locationForm.valid) {
      const locationData = this.locationForm.value;
      locationData.start_date = new Date(locationData.start_date)
        .toISOString()
        .slice(0, 10);
      locationData.end_date = new Date(locationData.end_date)
        .toISOString()
        .slice(0, 10);

      this.modalController.dismiss(locationData);
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
