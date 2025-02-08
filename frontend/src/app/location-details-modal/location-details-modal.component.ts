import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  authFetch,
  API_URL,
  Location as BaseLocation,
  Comment,
  LocationComment,
} from '../utils/api_utils';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Location extends BaseLocation {
  id: number;
  trip_description: string;
}

@Component({
  selector: 'app-location-details-modal',
  templateUrl: './location-details-modal.component.html',
  styleUrls: ['./location-details-modal.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    IonLabel,
    DatePipe,
    IonList,
    IonListHeader,
    CommonModule,
    ReactiveFormsModule,
    IonTextarea,
  ],
  providers: [ModalController],
})
export class LocationDetailsModalComponent implements OnInit {
  @Input() location!: Location;
  comments: LocationComment[] = [];
  commentForm!: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      comment: [''],
    });
  }

  ngOnInit() {
    this.fetchComments();
  }

  async fetchComments() {
    const response = await authFetch(
      `${API_URL}/locations/${this.location.id}/comments`
    );
    if (response.ok) {
      this.comments = await response.json();
    } else {
      console.error('Failed to fetch comments');
    }
  }

  async addComment() {
    const comment = {
      location_id: this.location.id,
      user_id: parseInt(localStorage.getItem('user_id')!),
      comment: this.commentForm.value.comment,
    };
    const response = await authFetch(`${API_URL}/locations/comment`, {
      method: 'POST',
      body: JSON.stringify(comment),
    });
    if (response.ok) {
      this.fetchComments();
      const commentId = await response.text();
      const comment: LocationComment = {
        id: parseInt(commentId),
        location_id: this.location.id,
        user_id: parseInt(localStorage.getItem('user_id')!),
        user_name: localStorage.getItem('user_name')!,
        comment: this.commentForm.value.comment,
      };
      this.comments.push(comment);
      this.commentForm.reset();
    } else {
      console.error('Failed to add comment');
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
