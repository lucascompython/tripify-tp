import { LoadingController } from '@ionic/angular';

const loadingController = new LoadingController();

export const API_URL = 'http://localhost:1234';

export async function authFetch(
  url: Request | string,
  options?: RequestInit
): Promise<Response> {
  const loading = await loadingController.create({
    message: 'Loading...',
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
  }

  return data;
}
