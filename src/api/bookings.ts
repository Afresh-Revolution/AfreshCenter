import { API_BASE } from './config';

export type BookingDTO = {
  id?: string;
  full_name?: string;
  email?: string;
  phone_number?: string;
  company?: string;
  project_details?: string;
  status?: string;
  created_at?: string;
  scheduled_at?: string;
  location?: string;
  service?: string;
};

export async function fetchBookings(): Promise<BookingDTO[]> {
  const base = API_BASE ? `${API_BASE}/api/bookings` : '/api/bookings';
  const res = await fetch(base);
  if (!res.ok) {
    throw new Error('Failed to fetch bookings');
  }
  const data = (await res.json()) as BookingDTO[];
  return Array.isArray(data) ? data : [];
}
