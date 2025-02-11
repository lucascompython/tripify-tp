import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

let loadingController: LoadingController;

export const setLoadingController = (lc: LoadingController) => {
  loadingController = lc;
};

let translateService: TranslateService;

export const setTranslateService = (ts: TranslateService) => {
  translateService = ts;
};

export const API_URL = 'http://localhost:1234';

export async function authFetch(
  url: Request | string,
  options?: RequestInit
): Promise<Response> {
  const loading = await loadingController.create({
    message: translateService.instant('LOADING'),
  });
  await loading.present();
  const token = localStorage.getItem('token')!;
  try {
    return await fetch(url, {
      ...options,
      headers: {
        ...(options?.headers || {}),
        Authorization: token,
      },
    });
  } finally {
    await loading.dismiss();
  }
}

export enum TripType {
  Business = 'Business',
  Personal = 'Personal',
}
export enum TripStatus {
  Planned = 'Planned',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export interface Trip {
  id: number;
  owner_id: number;
  description: string;
  type: TripType;
  status: TripStatus;
  destination: string;
  departure: string;
  start_date: Date;
  end_date: Date;
  shared: boolean;
}

/**
 * Get all trips for the current user
 * @returns Promise<Trip[]>
 */
export async function getTrips(): Promise<Trip[]> {
  const user_id = localStorage.getItem('user_id');
  const resp = await authFetch(`${API_URL}/trips/${user_id}`);
  const data = await resp.json();

  for (let i = 0; i < data.length; i++) {
    data[i].start_date = new Date(data[i].start_date);
    data[i].end_date = new Date(data[i].end_date);
    data[i].type = TripType[data[i].type as keyof typeof TripType];
    data[i].status = TripStatus[data[i].status as keyof typeof TripStatus];
    data[i].shared = data[i].owner_id !== parseInt(user_id!);
  }

  return data;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Comment {
  id: number;
  trip_id: number;
  user_id: number;
  user_name: string;
  comment: string;
}

export enum LocationStatus {
  Visited = 'Visited',
  Planned = 'Planned',
}

export interface Location {
  trip_id: number;
  description: string;
  type: string;
  status: LocationStatus;
  location: string;
  start_date: Date;
  end_date: Date;
}

export interface LocationComment {
  id: number;
  location_id: number;
  user_id: number;
  user_name: string;
  comment: string;
}
