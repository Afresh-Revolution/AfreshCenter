import { useEffect, useState } from 'react';
import { updateBookingStatus, triggerBookingEmail } from '../../api/bookings';

export interface BookingDetail {
  id?: string;
  client: string;
  email: string;
  phone: string;
  service: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  date: string;
  dateTime: string;
  location: string;
  notes: string;
}

interface BookingDetailsModalProps {
  booking: BookingDetail;
  onClose: () => void;
  onStatusChange?: (id: string, newStatus: BookingDetail['status']) => void;
}

const STATUS_OPTIONS: BookingDetail['status'][] = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

export function BookingDetailsModal({ booking, onClose, onStatusChange }: BookingDetailsModalProps) {
  const [currentStatus, setCurrentStatus] = useState<BookingDetail['status']>(booking.status);
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<BookingDetail['status']>(booking.status);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [showSendEmail, setShowSendEmail] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailMessage, setEmailMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Keep status in sync if parent updates the booking prop
  useEffect(() => {
    setCurrentStatus(booking.status);
    setSelectedStatus(booking.status);
  }, [booking.status]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showSendEmail) setShowSendEmail(false);
        else if (showUpdateStatus) setShowUpdateStatus(false);
        else onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose, showUpdateStatus, showSendEmail]);

  const handleUpdateStatusSubmit = async () => {
    if (!booking.id) {
      // No id — just update locally
      setCurrentStatus(selectedStatus);
      setShowUpdateStatus(false);
      return;
    }
    setStatusLoading(true);
    setStatusMessage(null);
    const result = await updateBookingStatus(booking.id, selectedStatus);
    setStatusLoading(false);
    if (result.success) {
      setCurrentStatus(selectedStatus);
      onStatusChange?.(booking.id, selectedStatus);
      setStatusMessage({ type: 'success', text: result.message ?? 'Status updated.' });
      setTimeout(() => { setStatusMessage(null); setShowUpdateStatus(false); }, 1500);
    } else {
      setStatusMessage({ type: 'error', text: result.message ?? 'Failed to update status.' });
    }
  };

  const handleSendEmail = async () => {
    if (!booking.id) {
      setEmailMessage({ type: 'error', text: 'Cannot send email — booking ID is missing.' });
      return;
    }
    setEmailLoading(true);
    setEmailMessage(null);
    const result = await triggerBookingEmail(booking.id);
    setEmailLoading(false);
    if (result.success) {
      setEmailMessage({ type: 'success', text: result.message ?? 'Email sent successfully.' });
      setTimeout(() => { setEmailMessage(null); setShowSendEmail(false); }, 2000);
    } else {
      setEmailMessage({ type: 'error', text: result.message ?? 'Failed to send email.' });
    }
  };

  return (
    <div className="booking-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <header className="booking-modal__header">
          <h2 id="booking-modal-title" className="booking-modal__title">Booking Details</h2>
          <button type="button" className="booking-modal__close" onClick={onClose} aria-label="Close">
            <span className="booking-modal__close-icon" aria-hidden />
          </button>
        </header>

        <div className="booking-modal__body">
          <section className="booking-modal__section">
            <h3 className="booking-modal__section-title">Client Information</h3>
            <dl className="booking-modal__list">
              <div className="booking-modal__row">
                <dt>Name</dt>
                <dd>{booking.client}</dd>
              </div>
              <div className="booking-modal__row">
                <dt><span className="booking-modal__icon booking-modal__icon--envelope" aria-hidden /> Email</dt>
                <dd>{booking.email || '—'}</dd>
              </div>
              <div className="booking-modal__row">
                <dt><span className="booking-modal__icon booking-modal__icon--phone" aria-hidden /> Phone</dt>
                <dd>{booking.phone || '—'}</dd>
              </div>
            </dl>
          </section>

          <section className="booking-modal__section">
            <h3 className="booking-modal__section-title">Booking Information</h3>
            <dl className="booking-modal__list">
              <div className="booking-modal__row">
                <dt>Service</dt>
                <dd>{booking.service || '—'}</dd>
              </div>
              <div className="booking-modal__row">
                <dt>Status</dt>
                <dd>
                  <span className={`booking-modal__status booking-modal__status--${currentStatus.toLowerCase()}`}>
                    {currentStatus}
                  </span>
                </dd>
              </div>
              {booking.dateTime && (
                <div className="booking-modal__row">
                  <dt><span className="booking-modal__icon booking-modal__icon--calendar" aria-hidden /> Date &amp; Time</dt>
                  <dd>{booking.dateTime}</dd>
                </div>
              )}
              {booking.notes && (
                <div className="booking-modal__row">
                  <dt>Project Details</dt>
                  <dd style={{ whiteSpace: 'pre-wrap' }}>{booking.notes}</dd>
                </div>
              )}
            </dl>
          </section>
        </div>

        <footer className="booking-modal__footer">
          <button type="button" className="booking-modal__btn booking-modal__btn--update" onClick={() => { setSelectedStatus(currentStatus); setShowUpdateStatus(true); }}>
            <span className="booking-modal__btn-icon booking-modal__btn-icon--pencil" aria-hidden />
            Update Status
          </button>
          <button type="button" className="booking-modal__btn booking-modal__btn--email" onClick={() => setShowSendEmail(true)}>
            <span className="booking-modal__btn-icon booking-modal__btn-icon--envelope" aria-hidden />
            Send Email
          </button>
        </footer>
      </div>

      {/* ── Update Status Modal ── */}
      {showUpdateStatus && (
        <div className="update-status-backdrop" onClick={() => setShowUpdateStatus(false)}>
          <div className="update-status-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="update-status-title">
            <h2 id="update-status-title" className="update-status-modal__title">Update Booking Status</h2>
            <p className="update-status-modal__sub">Client: <strong>{booking.client}</strong></p>
            <label className="update-status-modal__label" htmlFor="update-status-select">Select New Status</label>
            <select
              id="update-status-select"
              className="update-status-modal__select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as BookingDetail['status'])}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {statusMessage && (
              <div className={`badge badge--${statusMessage.type}`} role="status">{statusMessage.text}</div>
            )}
            <div className="update-status-modal__actions">
              <button type="button" className="update-status-modal__btn update-status-modal__btn--cancel" onClick={() => setShowUpdateStatus(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="update-status-modal__btn update-status-modal__btn--submit"
                onClick={handleUpdateStatusSubmit}
                disabled={statusLoading || selectedStatus === currentStatus}
              >
                {statusLoading ? 'Saving…' : 'Update Status'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Send Email Modal ── */}
      {showSendEmail && (
        <div className="send-email-backdrop" onClick={() => setShowSendEmail(false)}>
          <div className="send-email-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="send-email-title">
            <h2 id="send-email-title" className="send-email-modal__title">Send Booking Email</h2>
            <p className="send-email-modal__sub">
              This will re-send the booking notification email to the admin using the configured email template.
            </p>
            <dl className="send-email-modal__preview">
              <div className="booking-modal__row">
                <dt>To:</dt>
                <dd>{booking.email || '(no email on record)'}</dd>
              </div>
              <div className="booking-modal__row">
                <dt>Client:</dt>
                <dd>{booking.client}</dd>
              </div>
            </dl>
            {emailMessage && (
              <div className={`badge badge--${emailMessage.type}`} role="status">{emailMessage.text}</div>
            )}
            <div className="send-email-modal__actions">
              <button type="button" className="send-email-modal__btn send-email-modal__btn--cancel" onClick={() => setShowSendEmail(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="send-email-modal__btn send-email-modal__btn--submit"
                onClick={handleSendEmail}
                disabled={emailLoading}
              >
                <span className="send-email-modal__btn-icon" aria-hidden />
                {emailLoading ? 'Sending…' : 'Send Email'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
