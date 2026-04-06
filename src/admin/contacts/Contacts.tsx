import { useEffect, useState, useCallback } from 'react';
import { ContactMessageModal } from './ContactMessageModal';
import type { ContactSubmission } from './ContactMessageModal';
import { fetchAdminContacts, type AdminContactDTO } from '../../api/adminContacts';

function formatContactsDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

function mapContactToSubmission(contact: AdminContactDTO & { id?: string }, fallbackIndex: number): ContactSubmission & { id?: string; read?: boolean } {
  const rawDate = contact.created_at ?? contact.date ?? '';
  const dateObj = rawDate ? new Date(rawDate) : null;
  const date = dateObj ? dateObj.toISOString().slice(0, 10) : '';
  const time = dateObj ? dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '';
  const dateTime = dateObj ? `${date} at ${time}` : '';
  return {
    id: contact.id ? String(contact.id) : undefined,
    name: contact.name ?? `Contact ${fallbackIndex + 1}`,
    email: contact.email ?? '',
    phone: contact.phone ?? '',
    subject: contact.subject ?? '',
    date,
    dateTime,
    message: contact.message ?? '',
    read: false,
  };
}

type ContactRow = ContactSubmission & { id?: string; read?: boolean };

export function Contacts() {
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContact, setSelectedContact] = useState<ContactRow | null>(null);
  const [search, setSearch] = useState('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const [showSendEmail, setShowSendEmail] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailMessage, setEmailMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [emailForm, setEmailForm] = useState({ to: '', clientName: '', subject: '', message: '' });

  const loadContacts = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchAdminContacts();
      setContacts((prev) => {
        // Preserve existing read state when refreshing
        const readSet = new Set(prev.filter(c => c.read).map(c => c.id ?? c.name + c.date));
        return data.map((contact, idx) => {
          const row = mapContactToSubmission(contact as AdminContactDTO & { id?: string }, idx);
          const key = row.id ?? row.name + row.date;
          return { ...row, read: readSet.has(key) };
        });
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load contacts');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadContacts(); }, [loadContacts]);

  const markAsRead = useCallback((contact: ContactRow) => {
    setContacts((prev) => prev.map((c) =>
      (c.id ? c.id === contact.id : c.name === contact.name && c.date === contact.date)
        ? { ...c, read: true }
        : c
    ));
  }, []);

  const openContact = (contact: ContactRow) => {
    setSelectedContact(contact);
    markAsRead(contact);
  };

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

  const handleSendEmailSubmit = async () => {
    // Placeholder — wires to real email API once backend email-to-client endpoint exists
    setEmailLoading(true);
    setEmailMessage(null);
    await new Promise((r) => setTimeout(r, 800)); // simulate
    setEmailLoading(false);
    setEmailMessage({ type: 'success', text: 'Email queued (configure reply endpoint in backend to send).' });
    setTimeout(() => { setEmailMessage(null); setShowSendEmail(false); }, 2500);
  };

  const unreadCount = contacts.filter(c => !c.read).length;

  const filtered = contacts.filter((c) => {
    const matchesSearch = !search
      || c.name.toLowerCase().includes(search.toLowerCase())
      || c.email.toLowerCase().includes(search.toLowerCase())
      || (c.subject ?? '').toLowerCase().includes(search.toLowerCase());
    const matchesUnread = !showUnreadOnly || !c.read;
    return matchesSearch && matchesUnread;
  });

  return (
    <div className="contacts-page">
      <header className="contacts-header">
        <div>
          <h1 className="contacts-title">Contacts</h1>
          <time className="contacts-date" dateTime={new Date().toISOString().slice(0, 10)}>
            {formatContactsDate()}
          </time>
        </div>
        <button
          type="button"
          className="service-modal__btn service-modal__btn--cancel"
          onClick={loadContacts}
          disabled={isLoading}
          aria-label="Refresh contacts"
          style={{ padding: '0.45rem 1rem', fontSize: '0.82rem', alignSelf: 'center' }}
        >
          {isLoading ? '⟳ Loading…' : '↻ Refresh'}
        </button>
      </header>

      <div className="contacts-card">
        {/* Toolbar */}
        <div className="services-toolbar" style={{ marginBottom: '1rem' }}>
          <div className="services-search-wrap">
            <span className="services-search-icon" aria-hidden />
            <input
              id="contacts-search"
              type="search"
              className="services-search"
              placeholder="Search by name, email or subject…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search contacts"
            />
          </div>
          <button
            type="button"
            className={`service-modal__btn ${showUnreadOnly ? 'service-modal__btn--submit' : 'service-modal__btn--cancel'}`}
            onClick={() => setShowUnreadOnly((v) => !v)}
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
          >
            {showUnreadOnly ? '● Unread only' : '○ Show unread only'}
            {unreadCount > 0 && !showUnreadOnly && (
              <span style={{ marginLeft: '0.4rem', background: 'var(--color-accent, #f59e0b)', color: '#000', borderRadius: '999px', padding: '0 0.4rem', fontSize: '0.7rem' }}>
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        <h2 className="contacts-section-title">
          {filtered.length} message{filtered.length !== 1 ? 's' : ''}
          {unreadCount > 0 && <span style={{ marginLeft: '0.5rem', fontSize: '0.78rem', opacity: 0.65 }}>({unreadCount} unread)</span>}
        </h2>

        <div className="contacts-table-wrap">
          {isLoading && <p>Loading contacts…</p>}
          {error && !isLoading && <p style={{ color: 'var(--color-error, #e55)' }}>{error}</p>}
          {!isLoading && !error && filtered.length === 0 && (
            <p>{contacts.length === 0 ? 'No contact submissions yet.' : 'No contacts match your search.'}</p>
          )}
          {!isLoading && !error && filtered.length > 0 && (
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
                {filtered.map((row) => (
                  <tr
                    key={`${row.name}-${row.date}`}
                    style={{ opacity: row.read ? 0.65 : 1, fontWeight: row.read ? 400 : 600 }}
                  >
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        {!row.read && (
                          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--color-accent, #f59e0b)', display: 'inline-block', flexShrink: 0 }} aria-label="Unread" />
                        )}
                        {row.name}
                      </span>
                    </td>
                    <td>{row.email}</td>
                    <td>{row.subject}</td>
                    <td>{row.date}</td>
                    <td>
                      <button
                        type="button"
                        className="contacts-table__action"
                        onClick={() => openContact(row)}
                      >
                        {row.read ? 'View' : 'Read'}
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
            <h2 id="send-email-title" className="send-email-modal__title">Reply to {emailForm.clientName}</h2>
            <div className="send-email-modal__body">
              <label className="send-email-modal__label" htmlFor="contact-send-email-to">To</label>
              <input id="contact-send-email-to" type="email" className="send-email-modal__input" value={emailForm.to} onChange={(e) => setEmailForm((f) => ({ ...f, to: e.target.value }))} />
              <label className="send-email-modal__label" htmlFor="contact-send-email-subject">Subject</label>
              <input id="contact-send-email-subject" type="text" className="send-email-modal__input" value={emailForm.subject} onChange={(e) => setEmailForm((f) => ({ ...f, subject: e.target.value }))} />
              <label className="send-email-modal__label" htmlFor="contact-send-email-message">Message</label>
              <textarea id="contact-send-email-message" className="send-email-modal__textarea" value={emailForm.message} onChange={(e) => setEmailForm((f) => ({ ...f, message: e.target.value }))} placeholder="Enter your message here…" rows={4} />
            </div>
            {emailMessage && (
              <div className={`badge badge--${emailMessage.type}`} role="status">{emailMessage.text}</div>
            )}
            <div className="send-email-modal__actions">
              <button type="button" className="send-email-modal__btn send-email-modal__btn--cancel" onClick={() => setShowSendEmail(false)}>Cancel</button>
              <button type="button" className="send-email-modal__btn send-email-modal__btn--submit" onClick={handleSendEmailSubmit} disabled={emailLoading}>
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
