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

export type CreateBookingPayload = {
  full_name: string;
  email: string;
  phone_number: string;
  company?: string;
  project_details?: string;
};

export type BookingResponse = {
  success: boolean;
  message?: string;
  booking?: BookingDTO;
};

export async function fetchBookings(): Promise<BookingDTO[]> {
  const base = API_BASE ? `${API_BASE}/api/bookings` : '/api/bookings';
  const res = await fetch(base);
  if (!res.ok) throw new Error('Failed to fetch bookings');
  const data = (await res.json()) as BookingDTO[];
  return Array.isArray(data) ? data : [];
}

export async function createBooking(payload: CreateBookingPayload): Promise<BookingResponse> {
  const base = API_BASE ? `${API_BASE}/api/bookings` : '/api/bookings';
  try {
    const res = await fetch(base, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as BookingResponse;
    if (!res.ok) return { success: false, message: data?.message ?? 'Failed to submit booking' };
    return { success: true, message: data?.message ?? 'Booking submitted successfully' };
  } catch {
    return { success: false, message: 'Network error. Please try again.' };
  }
}

export async function updateBookingStatus(
  id: string,
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled',
): Promise<BookingResponse> {
  const base = API_BASE ? `${API_BASE}/api/bookings` : '/api/bookings';
  try {
    const res = await fetch(`${base}/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = (await res.json()) as BookingResponse;
    if (!res.ok) return { success: false, message: data?.message ?? 'Failed to update status' };
    return { success: true, message: data?.message ?? `Status updated to ${status}`, booking: data.booking };
  } catch {
    return { success: false, message: 'Network error. Please try again.' };
  }
}

export async function triggerBookingEmail(id: string): Promise<BookingResponse> {
  const base = API_BASE ? `${API_BASE}/api/bookings` : '/api/bookings';
  try {
    const res = await fetch(`${base}/${id}/trigger-email`, { method: 'POST' });
    const data = (await res.json()) as BookingResponse;
    if (!res.ok) return { success: false, message: data?.message ?? 'Failed to send email' };
    return { success: true, message: data?.message ?? 'Email sent successfully' };
  } catch {
    return { success: false, message: 'Network error. Please try again.' };
  }
}
