import { useState } from 'react';
import { BookingDetailsModal } from './BookingDetailsModal';
import type { BookingDetail } from './BookingDetailsModal';

const bookingsData: BookingDetail[] = [
  {
    client: 'John Doe',
    email: 'john@example.com',
    phone: '+234 801 234 5678',
    service: 'Software Development',
    status: 'Pending',
    date: '2026-02-25',
    dateTime: '2026-02-25 at 10:00 AM',
    location: 'Virtual Meeting',
    notes: 'Client wants to discuss requirements for a custom CRM system.',
  },
  {
    client: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+234 802 345 6789',
    service: 'UI/UX Design',
    status: 'Confirmed',
    date: '2026-02-24',
    dateTime: '2026-02-24 at 2:00 PM',
    location: 'Virtual Meeting',
    notes: 'Redesign of mobile app dashboard and onboarding flow.',
  },
  {
    client: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+234 803 456 7890',
    service: 'Cyber Security',
    status: 'Completed',
    date: '2026-02-23',
    dateTime: '2026-02-23 at 9:00 AM',
    location: 'On-site',
    notes: 'Security audit and penetration testing completed.',
  },
  {
    client: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+234 804 567 8901',
    service: 'Digital Marketing',
    status: 'Confirmed',
    date: '2026-02-22',
    dateTime: '2026-02-22 at 11:00 AM',
    location: 'Virtual Meeting',
    notes: 'Q1 campaign strategy and social media planning.',
  },
  {
    client: 'David Brown',
    email: 'david@example.com',
    phone: '+234 805 678 9012',
    service: 'Data Analysis',
    status: 'Pending',
    date: '2026-02-21',
    dateTime: '2026-02-21 at 3:00 PM',
    location: 'Virtual Meeting',
    notes: 'Analytics setup and reporting dashboard requirements.',
  },
];

function formatBookingsDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function Bookings() {
  const [selectedBooking, setSelectedBooking] = useState<BookingDetail | null>(null);

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
            {bookingsData.map((row) => (
              <tr key={`${row.client}-${row.date}`}>
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
