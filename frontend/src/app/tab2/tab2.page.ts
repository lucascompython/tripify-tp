import { Component, OnInit } from '@angular/core';
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
  Trip,
  TripStatus,
  TripType,
} from '../utils/api_utils';
import { ToastController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class Tab2Page implements OnInit {
  tripForm: FormGroup;
  tripTypes = Object.keys(TripType);
  tripStatuses = Object.keys(TripStatus);

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController
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

  ngOnInit() {}

  async goToProfile() {}
  async signOut() {}

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

      const resp = await authFetch(`${API_URL}/trips/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trip),
      });

      if (resp.ok) {
        this.tripForm.reset();
        const toast = await this.toastController.create({
          message: 'Trip created successfully',
          duration: 2000,
        });
        toast.present();
      }
    }
  }
}
