import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  ModalController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonButtons,
  IonFooter,
  IonTextarea,
  IonList,
  IonListHeader,
} from '@ionic/angular/standalone';
import { API_URL, authFetch, Comment, Trip, User } from '../utils/api_utils';
import { ShareTripModalComponent } from '../share-trip-modal/share-trip-modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-trip-details-modal',
  templateUrl: 'trip-details-modal.component.html',
  styleUrls: ['trip-details-modal.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonItem,
    IonLabel,
    IonButtons,
    DatePipe,
    CommonModule,
    IonFooter,
    IonTextarea,
    IonList,
    IonListHeader,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  standalone: true,
})
export class TripDetailsModalComponent implements OnInit {
  @Input()
  trip!: Trip;
  owner: User | null = null;
  commentForm: FormGroup;
  comments: Comment[] = [];

  constructor(
    private modalController: ModalController,
    private datePipe: DatePipe,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      comment: [''],
    });
  }

  ngOnInit() {
    if (this.trip.shared) {
      this.getOwner();
    }
    this.fetchComments();
  }

  async fetchComments() {
    const resp = await authFetch(`${API_URL}/trips/${this.trip.id}/comments`);
    this.comments = await resp.json();
  }

  async addComment() {
    const commentText: string = this.commentForm.get('comment')?.value.trim();
    if (!commentText) {
      return;
    }

    const resp = await authFetch(`${API_URL}/trips/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trip_id: this.trip.id,
        user_id: parseInt(localStorage.getItem('user_id')!),
        comment: commentText,
      }),
    });

    if (resp.ok) {
      const commentId = await resp.text();
      const comment: Comment = {
        id: parseInt(commentId),
        trip_id: this.trip.id,
        user_id: parseInt(localStorage.getItem('user_id')!),
        user_name: localStorage.getItem('name')!,
        comment: commentText,
      };

      this.comments.push(comment);
      this.commentForm.reset();
    }
  }
  async shareTrip() {
    const modal = await this.modalController.create({
      component: ShareTripModalComponent,
      componentProps: { tripId: this.trip.id, ownerId: this.trip.owner_id },
    });
    await modal.present();
  }

  async getOwner() {
    const owner_id = this.trip.owner_id;
    const resp = await authFetch(`${API_URL}/users/${owner_id}`);

    const user: User = await resp.json();
    this.owner = user;
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
