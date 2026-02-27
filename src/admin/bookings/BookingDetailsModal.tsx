import { useEffect, useState } from 'react';

export interface BookingDetail {
  client: string;
  email: string;
  phone: string;
  service: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  date: string;
  dateTime: string;
  location: string;
  notes: string;
}

interface BookingDetailsModalProps {
  booking: BookingDetail;
  onClose: () => void;
}

const STATUS_OPTIONS: BookingDetail['status'][] = ['Pending', 'Confirmed', 'Completed'];

export function BookingDetailsModal({ booking, onClose }: BookingDetailsModalProps) {
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<BookingDetail['status']>(booking.status);
  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleForm, setRescheduleForm] = useState({
    newDate: '',
    newTime: '',
    location: booking.location,
    reason: '',
  });
  const [showSendEmail, setShowSendEmail] = useState(false);
  const [emailForm, setEmailForm] = useState({
    to: booking.email,
    clientName: booking.client,
    subject: `Regarding your ${booking.service} booking.`,
    message: '',
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showSendEmail) setShowSendEmail(false);
        else if (showReschedule) setShowReschedule(false);
        else if (showUpdateStatus) setShowUpdateStatus(false);
        else onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose, showUpdateStatus, showReschedule, showSendEmail]);

  const openUpdateStatus = () => {
    setSelectedStatus(booking.status);
    setShowUpdateStatus(true);
  };

  const handleUpdateStatusSubmit = () => {
    setShowUpdateStatus(false);
  };

  const openReschedule = () => {
    setRescheduleForm({
      newDate: '',
      newTime: '',
      location: booking.location,
      reason: '',
    });
    setShowReschedule(true);
  };

  const handleRescheduleSubmit = () => {
    setShowReschedule(false);
  };

  const openSendEmail = () => {
    setEmailForm({
      to: booking.email,
      clientName: booking.client,
      subject: `Regarding your ${booking.service} booking.`,
      message: '',
    });
    setShowSendEmail(true);
  };

  const handleSendEmailSubmit = () => {
    setShowSendEmail(false);
    // Could send email via API here
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
                <dd>{booking.email}</dd>
              </div>
              <div className="booking-modal__row">
                <dt><span className="booking-modal__icon booking-modal__icon--phone" aria-hidden /> Phone</dt>
                <dd>{booking.phone}</dd>
              </div>
            </dl>
          </section>

          <section className="booking-modal__section">
            <h3 className="booking-modal__section-title">Booking Information</h3>
            <dl className="booking-modal__list">
              <div className="booking-modal__row">
                <dt>Service</dt>
                <dd>{booking.service}</dd>
              </div>
              <div className="booking-modal__row">
                <dt>Status</dt>
                <dd>
                  <span className={`booking-modal__status booking-modal__status--${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </dd>
              </div>
              <div className="booking-modal__row">
                <dt><span className="booking-modal__icon booking-modal__icon--calendar" aria-hidden /> Date & Time</dt>
                <dd>{booking.dateTime}</dd>
              </div>
              <div className="booking-modal__row">
                <dt><span className="booking-modal__icon booking-modal__icon--pin" aria-hidden /> Location</dt>
                <dd>{booking.location}</dd>
              </div>
              <div className="booking-modal__row">
                <dt>Notes</dt>
                <dd>{booking.notes}</dd>
              </div>
            </dl>
          </section>
        </div>

        <footer className="booking-modal__footer">
          <button type="button" className="booking-modal__btn booking-modal__btn--update" onClick={openUpdateStatus}>
            <span className="booking-modal__btn-icon booking-modal__btn-icon--pencil" aria-hidden />
            Update Status
          </button>
          <button type="button" className="booking-modal__btn booking-modal__btn--reschedule" onClick={openReschedule}>
            <span className="booking-modal__btn-icon booking-modal__btn-icon--clock" aria-hidden />
            Reschedule
          </button>
          <button type="button" className="booking-modal__btn booking-modal__btn--email" onClick={openSendEmail}>
            <span className="booking-modal__btn-icon booking-modal__btn-icon--envelope" aria-hidden />
            Send Email
          </button>
        </footer>
      </div>

      {showUpdateStatus && (
        <div className="update-status-backdrop" onClick={() => setShowUpdateStatus(false)}>
          <div className="update-status-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="update-status-title">
            <h2 id="update-status-title" className="update-status-modal__title">Update Booking Status</h2>
            <label className="update-status-modal__label" htmlFor="update-status-select">Select Status</label>
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
            <div className="update-status-modal__actions">
              <button type="button" className="update-status-modal__btn update-status-modal__btn--cancel" onClick={() => setShowUpdateStatus(false)}>
                Cancel
              </button>
              <button type="button" className="update-status-modal__btn update-status-modal__btn--submit" onClick={handleUpdateStatusSubmit}>
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {showReschedule && (
        <div className="reschedule-backdrop" onClick={() => setShowReschedule(false)}>
          <div className="reschedule-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="reschedule-title">
            <h2 id="reschedule-title" className="reschedule-modal__title">Reschedule Booking</h2>
            <div className="reschedule-modal__body">
              <label className="reschedule-modal__label" htmlFor="reschedule-new-date">New Date</label>
              <input
                id="reschedule-new-date"
                type="date"
                className="reschedule-modal__input"
                value={rescheduleForm.newDate}
                onChange={(e) => setRescheduleForm((f) => ({ ...f, newDate: e.target.value }))}
              />
              <label className="reschedule-modal__label" htmlFor="reschedule-new-time">New Time</label>
              <input
                id="reschedule-new-time"
                type="time"
                className="reschedule-modal__input"
                value={rescheduleForm.newTime}
                onChange={(e) => setRescheduleForm((f) => ({ ...f, newTime: e.target.value }))}
              />
              <label className="reschedule-modal__label" htmlFor="reschedule-location">Location</label>
              <input
                id="reschedule-location"
                type="text"
                className="reschedule-modal__input"
                value={rescheduleForm.location}
                onChange={(e) => setRescheduleForm((f) => ({ ...f, location: e.target.value }))}
                placeholder="e.g. Virtual Meeting"
              />
              <label className="reschedule-modal__label" htmlFor="reschedule-reason">Reason (Optional)</label>
              <textarea
                id="reschedule-reason"
                className="reschedule-modal__textarea"
                value={rescheduleForm.reason}
                onChange={(e) => setRescheduleForm((f) => ({ ...f, reason: e.target.value }))}
                placeholder="Enter reason for rescheduling"
                rows={3}
              />
            </div>
            <div className="reschedule-modal__actions">
              <button type="button" className="reschedule-modal__btn reschedule-modal__btn--cancel" onClick={() => setShowReschedule(false)}>
                Cancel
              </button>
              <button type="button" className="reschedule-modal__btn reschedule-modal__btn--submit" onClick={handleRescheduleSubmit}>
                Reschedule & Notify
              </button>
            </div>
          </div>
        </div>
      )}

      {showSendEmail && (
        <div className="send-email-backdrop" onClick={() => setShowSendEmail(false)}>
          <div className="send-email-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="send-email-title">
            <h2 id="send-email-title" className="send-email-modal__title">Send Email to Client</h2>
            <div className="send-email-modal__body">
              <label className="send-email-modal__label" htmlFor="send-email-to">To</label>
              <input
                id="send-email-to"
                type="email"
                className="send-email-modal__input"
                value={emailForm.to}
                onChange={(e) => setEmailForm((f) => ({ ...f, to: e.target.value }))}
              />
              <label className="send-email-modal__label" htmlFor="send-email-name">Client Name</label>
              <input
                id="send-email-name"
                type="text"
                className="send-email-modal__input"
                value={emailForm.clientName}
                onChange={(e) => setEmailForm((f) => ({ ...f, clientName: e.target.value }))}
              />
              <label className="send-email-modal__label" htmlFor="send-email-subject">Subject</label>
              <input
                id="send-email-subject"
                type="text"
                className="send-email-modal__input"
                value={emailForm.subject}
                onChange={(e) => setEmailForm((f) => ({ ...f, subject: e.target.value }))}
              />
              <label className="send-email-modal__label" htmlFor="send-email-message">Message</label>
              <textarea
                id="send-email-message"
                className="send-email-modal__textarea"
                value={emailForm.message}
                onChange={(e) => setEmailForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Enter your message here..."
                rows={4}
              />
            </div>
            <div className="send-email-modal__actions">
              <button type="button" className="send-email-modal__btn send-email-modal__btn--cancel" onClick={() => setShowSendEmail(false)}>
                Cancel
              </button>
              <button type="button" className="send-email-modal__btn send-email-modal__btn--submit" onClick={handleSendEmailSubmit}>
                <span className="send-email-modal__btn-icon" aria-hidden />
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
