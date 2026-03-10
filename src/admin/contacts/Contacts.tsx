import { useState } from 'react';
import { ContactMessageModal } from './ContactMessageModal';
import type { ContactSubmission } from './ContactMessageModal';

const contactsData: ContactSubmission[] = [
  {
    name: 'Alice Cooper',
    email: 'alice@example.com',
    phone: '+234 803 111 2222',
    subject: 'Services Information',
    date: '2026-02-26',
    dateTime: '2026-02-26 at 10:30 AM',
    message: 'I would like to inquire about your software development services. We are looking to build a custom ERP system for our company. Can you provide more details about our pricing and timeline?',
  },
  {
    name: 'Bob Wilson',
    email: 'bob@example.com',
    phone: '+234 804 222 3333',
    subject: 'Partnership Opportunity',
    date: '2026-02-25',
    dateTime: '2026-02-25 at 2:00 PM',
    message: 'We are interested in exploring a partnership with your company for joint projects. Could we schedule a call to discuss potential collaboration?',
  },
  {
    name: 'Carol Davis',
    email: 'carol@example.com',
    phone: '+234 805 333 4444',
    subject: 'General Inquiry',
    date: '2026-02-24',
    dateTime: '2026-02-24 at 9:15 AM',
    message: 'I came across your website and would like to learn more about the range of services you offer. Please send me your brochure or schedule a brief introductory call.',
  },
];

function formatContactsDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function Contacts() {
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [showSendEmail, setShowSendEmail] = useState(false);
  const [emailForm, setEmailForm] = useState({
    to: '',
    clientName: '',
    subject: '',
    message: '',
  });

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
              {contactsData.map((row) => (
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
