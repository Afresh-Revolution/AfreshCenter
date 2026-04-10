import { useEffect, useState, useCallback } from 'react';
import { fetchBookings, type BookingDTO } from '../../api/bookings';
import { BookingDetailsModal } from './BookingDetailsModal';
import type { BookingDetail } from './BookingDetailsModal';

function formatBookingsDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

function mapToDetail(booking: BookingDTO): BookingDetail {
  const dateValue = (booking as { scheduled_at?: string; created_at?: string }).scheduled_at
    ?? (booking as { created_at?: string }).created_at ?? '';
  const dateObj = dateValue ? new Date(dateValue) : null;
  const date = dateObj ? dateObj.toISOString().slice(0, 10) : '';
  const time = dateObj ? dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '';
  const dateTime = dateObj ? `${date} at ${time}` : '';
  const statusValue = ((booking as { status?: string }).status ?? 'Pending').toString().toLowerCase();
  const status: BookingDetail['status'] =
    statusValue === 'confirmed' ? 'Confirmed'
    : statusValue === 'completed' ? 'Completed'
    : statusValue === 'cancelled' ? 'Cancelled'
    : 'Pending';
  return {
    id: String((booking as { id?: string | number }).id ?? ''),
    client: (booking as { full_name?: string; company?: string }).full_name
      ?? (booking as { company?: string }).company ?? 'Client',
    email: (booking as { email?: string }).email ?? '',
    phone: (booking as { phone_number?: string }).phone_number ?? '',
    service: (booking as { service?: string; company?: string }).service
      ?? (booking as { company?: string }).company ?? 'Booking',
    status,
    date,
    dateTime,
    location: (booking as { location?: string }).location ?? 'Virtual Meeting',
    notes: (booking as { project_details?: string }).project_details ?? '',
  };
}

export function Bookings() {
  const [bookings, setBookings] = useState<BookingDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<BookingDetail | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | BookingDetail['status']>('All');

  const loadBookings = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchBookings();
      setBookings(data.map((b) => mapToDetail(b)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadBookings(); }, [loadBookings]);

  const handleStatusChange = useCallback((id: string, newStatus: BookingDetail['status']) => {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: newStatus } : b));
    setSelectedBooking((prev) => prev && prev.id === id ? { ...prev, status: newStatus } : prev);
  }, []);

  const filtered = bookings.filter((b) => {
    const matchesSearch = !search
      || b.client.toLowerCase().includes(search.toLowerCase())
      || b.email.toLowerCase().includes(search.toLowerCase())
      || b.service.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bookings-page">
      <header className="bookings-header">
        <h1 className="bookings-title">Bookings</h1>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <time className="bookings-date" dateTime={new Date().toISOString().slice(0, 10)}>
            {formatBookingsDate()}
          </time>
          <button
            type="button"
            className="service-modal__btn service-modal__btn--cancel"
            onClick={loadBookings}
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
            aria-label="Refresh bookings"
          >
            ↻ Refresh
          </button>
        </div>
      </header>

      {/* Search + filter toolbar */}
      <div className="services-toolbar" style={{ marginBottom: '1rem' }}>
        <div className="services-search-wrap">
          <span className="services-search-icon" aria-hidden />
          <input
            id="bookings-search"
            type="search"
            className="services-search"
            placeholder="Search by name, email or service…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search bookings"
          />
        </div>
        <select
          id="bookings-status-filter"
          className="service-modal__input"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          style={{ maxWidth: 160, padding: '0.4rem 0.75rem' }}
          aria-label="Filter by status"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <h2 className="bookings-section-title">
        {filtered.length} booking{filtered.length !== 1 ? 's' : ''}
        {statusFilter !== 'All' || search ? ' (filtered)' : ''}
      </h2>

      <div className="bookings-table-wrap">
        {isLoading && <p>Loading bookings…</p>}
        {error && !isLoading && <p style={{ color: 'var(--color-error, #e55)' }}>{error}</p>}
        {!isLoading && !error && filtered.length === 0 && (
          <p>{bookings.length === 0 ? 'No bookings yet.' : 'No bookings match your search.'}</p>
        )}
        {!isLoading && !error && filtered.length > 0 && (
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
              {filtered.map((row, idx) => (
                <tr key={`${row.id ?? row.client}-${idx}`}>
                  <td>
                    <div>{row.client}</div>
                    {row.email && <div style={{ fontSize: '0.78rem', opacity: 0.6 }}>{row.email}</div>}
                  </td>
                  <td>{row.service}</td>
                  <td>{row.date || '—'}</td>
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
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
