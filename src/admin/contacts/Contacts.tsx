import { useEffect, useState } from 'react';
import { ContactMessageModal } from './ContactMessageModal';
import type { ContactSubmission } from './ContactMessageModal';
import { fetchAdminContacts, type AdminContactDTO } from '../../api/adminContacts';

function formatContactsDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function mapContactToSubmission(contact: AdminContactDTO, fallbackIndex: number): ContactSubmission {
  const rawDate = contact.created_at ?? contact.date ?? '';
  const dateObj = rawDate ? new Date(rawDate) : null;
  const date = dateObj ? dateObj.toISOString().slice(0, 10) : '';
  const time = dateObj ? dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '';
  const dateTime = dateObj ? `${date} at ${time}` : '';

  return {
    name: contact.name ?? `Contact ${fallbackIndex + 1}`,
    email: contact.email ?? '',
    phone: contact.phone ?? '',
    subject: contact.subject ?? '',
    date,
    dateTime,
    message: contact.message ?? '',
  };
}

export function Contacts() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [showSendEmail, setShowSendEmail] = useState(false);
  const [emailForm, setEmailForm] = useState({
    to: '',
    clientName: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    let isActive = true;
    const loadContacts = async () => {
      try {
        const data = await fetchAdminContacts();
        if (!isActive) return;
        const mapped = data.map((contact, idx) => mapContactToSubmission(contact, idx));
        setContacts(mapped);
      } catch (err) {
        if (!isActive) return;
        setError(err instanceof Error ? err.message : 'Failed to load contacts');
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };
    loadContacts();
    return () => {
      isActive = false;
    };
  }, []);

  const openReplyEmail = () => {
    if (!selectedContact) return;
    setEmailForm({
      to: selectedContact.email,
      clientName: selectedContact.name,
      subject: `Re: ${selectedContact.subject}`,
      message: '',
    });
    setShowSendEmail(true);
  };

  const handleSendEmailSubmit = () => {
    setShowSendEmail(false);
  };

  return (
    <div className="contacts-page">
      <header className="contacts-header">
        <h1 className="contacts-title">Contacts</h1>
        <time className="contacts-date" dateTime={new Date().toISOString().slice(0, 10)}>
          {formatContactsDate()}
        </time>
      </header>

      <div className="contacts-card">
        <h2 className="contacts-section-title">Contact Submissions</h2>
        <div className="contacts-table-wrap">
          {isLoading && <p>Loading contacts...</p>}
          {error && !isLoading && <p>{error}</p>}
          {!isLoading && !error && contacts.length === 0 && <p>No contact submissions yet.</p>}
          {!isLoading && !error && contacts.length > 0 && (
            <table className="contacts-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>SUBJECT</th>
                  <th>DATE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((row) => (
                  <tr key={`${row.name}-${row.date}`}>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.subject}</td>
                    <td>{row.date}</td>
                    <td>
                      <button
                        type="button"
                        className="contacts-table__action"
                        onClick={() => setSelectedContact(row)}
                      >
                        View Message
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {selectedContact && (
        <ContactMessageModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onReplyViaEmail={openReplyEmail}
        />
      )}

      {showSendEmail && (
        <div className="send-email-backdrop" onClick={() => setShowSendEmail(false)}>
          <div className="send-email-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="send-email-title">
            <h2 id="send-email-title" className="send-email-modal__title">Send Email to Client</h2>
            <div className="send-email-modal__body">
              <label className="send-email-modal__label" htmlFor="contact-send-email-to">To</label>
              <input
                id="contact-send-email-to"
                type="email"
                className="send-email-modal__input"
                value={emailForm.to}
                onChange={(e) => setEmailForm((f) => ({ ...f, to: e.target.value }))}
              />
              <label className="send-email-modal__label" htmlFor="contact-send-email-name">Client Name</label>
              <input
                id="contact-send-email-name"
                type="text"
                className="send-email-modal__input"
                value={emailForm.clientName}
                onChange={(e) => setEmailForm((f) => ({ ...f, clientName: e.target.value }))}
              />
              <label className="send-email-modal__label" htmlFor="contact-send-email-subject">Subject</label>
              <input
                id="contact-send-email-subject"
                type="text"
                className="send-email-modal__input"
                value={emailForm.subject}
                onChange={(e) => setEmailForm((f) => ({ ...f, subject: e.target.value }))}
              />
              <label className="send-email-modal__label" htmlFor="contact-send-email-message">Message</label>
              <textarea
                id="contact-send-email-message"
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
