import { useEffect, useState } from 'react';
import { fetchBookings } from '../../api/bookings';
import { BookingDetailsModal } from './BookingDetailsModal';
import type { BookingDetail } from './BookingDetailsModal';

function formatBookingsDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function Bookings() {
  const [bookings, setBookings] = useState<BookingDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<BookingDetail | null>(null);

  useEffect(() => {
    let isActive = true;
    const loadBookings = async () => {
      try {
        const data = await fetchBookings();
        if (!isActive) return;
        const mapped: BookingDetail[] = data.map((booking, idx) => {
          const dateValue = booking.scheduled_at ?? booking.created_at ?? '';
          const dateObj = dateValue ? new Date(dateValue) : null;
          const date = dateObj ? dateObj.toISOString().slice(0, 10) : '';
          const time = dateObj ? dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '';
          const dateTime = dateObj ? `${date} at ${time}` : '';
          const statusValue = (booking.status ?? 'Pending').toString().toLowerCase();
          const status: BookingDetail['status'] =
            statusValue === 'confirmed' ? 'Confirmed' : statusValue === 'completed' ? 'Completed' : 'Pending';

          return {
            client: booking.full_name ?? booking.company ?? 'Client',
            email: booking.email ?? '',
            phone: booking.phone_number ?? '',
            service: booking.service ?? booking.company ?? 'Booking',
            status,
            date,
            dateTime,
            location: booking.location ?? 'Virtual Meeting',
            notes: booking.project_details ?? '',
          };
        });
        setBookings(mapped);
      } catch (err) {
        if (!isActive) return;
        setError(err instanceof Error ? err.message : 'Failed to load bookings');
      } finally {
        if (!isActive) return;
        setIsLoading(false);
      }
    };
    loadBookings();
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="bookings-page">
      <header className="bookings-header">
        <h1 className="bookings-title">Bookings</h1>
        <time className="bookings-date" dateTime={new Date().toISOString().slice(0, 10)}>
          {formatBookingsDate()}
        </time>
      </header>

      <h2 className="bookings-section-title">All Bookings</h2>

      <div className="bookings-table-wrap">
        {isLoading && <p>Loading bookings...</p>}
        {error && !isLoading && <p>{error}</p>}
        {!isLoading && !error && (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>CLIENT</th>
                <th>SERVICE</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((row, idx) => (
                <tr key={`${row.client}-${row.date}-${idx}`}>
                  <td>{row.client}</td>
                  <td>{row.service}</td>
                  <td>{row.date}</td>
                  <td>
                    <span className={`bookings-table__status bookings-table__status--${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="bookings-table__action"
                      onClick={() => setSelectedBooking(row)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
}
