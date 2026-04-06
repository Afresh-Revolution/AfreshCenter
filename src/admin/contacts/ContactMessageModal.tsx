import { useEffect } from 'react';

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  subject: string;
  date: string;
  dateTime: string;
  message: string;
}

interface ContactMessageModalProps {
  contact: ContactSubmission;
  onClose: () => void;
  onReplyViaEmail: () => void;
}

export function ContactMessageModal({ contact, onClose, onReplyViaEmail }: ContactMessageModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="contact-message-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="contact-message-title">
      <div className="contact-message-modal" onClick={(e) => e.stopPropagation()}>
        <header className="contact-message-modal__header">
          <h2 id="contact-message-title" className="contact-message-modal__title">Contact Message</h2>
          <button type="button" className="contact-message-modal__close" onClick={onClose} aria-label="Close">
            <span className="contact-message-modal__close-icon" aria-hidden />
          </button>
        </header>
        <div className="contact-message-modal__body">
          <dl className="contact-message-modal__list">
            <div className="contact-message-modal__row">
              <dt>Name</dt>
              <dd>{contact.name}</dd>
            </div>
            <div className="contact-message-modal__row">
              <dt>Email</dt>
              <dd>{contact.email}</dd>
            </div>
            <div className="contact-message-modal__row">
              <dt>Phone</dt>
              <dd>{contact.phone}</dd>
            </div>
            <div className="contact-message-modal__row">
              <dt>Date & Time</dt>
              <dd>{contact.dateTime}</dd>
            </div>
            <div className="contact-message-modal__row">
              <dt>Subject</dt>
              <dd>{contact.subject}</dd>
            </div>
            <div className="contact-message-modal__row">
              <dt>Message</dt>
              <dd className="contact-message-modal__message">{contact.message}</dd>
            </div>
          </dl>
        </div>
        <footer className="contact-message-modal__footer">
          <button type="button" className="contact-message-modal__btn contact-message-modal__btn--close" onClick={onClose}>
            Close
          </button>
          <button type="button" className="contact-message-modal__btn contact-message-modal__btn--reply" onClick={onReplyViaEmail}>
            Reply via Email
          </button>
        </footer>
      </div>
    </div>
  );
}
