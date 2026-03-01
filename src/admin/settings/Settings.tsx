import { useState } from 'react';

type SettingsTab = 'profile' | 'company' | 'notifications' | 'security';

const TABS: { id: SettingsTab; label: string; icon: string }[] = [
  { id: 'profile', label: 'Profile', icon: 'person' },
  { id: 'company', label: 'Company', icon: 'building' },
  { id: 'notifications', label: 'Notifications', icon: 'bell' },
  { id: 'security', label: 'Security', icon: 'lock' },
];

function formatSettingsDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [profile, setProfile] = useState({
    fullName: 'Christy Ishaku',
    email: 'bchris1161@gmail.com',
    phone: '+234 800 000 0000',
    role: 'Admin',
  });
  const [company, setCompany] = useState({
    companyName: 'Afresh',
    industry: 'Technology & Creative Services',
    email: 'info@afresh.com',
    phone: '+234 800 123 4567',
    address: '',
    about: '',
  });
  const [notifications, setNotifications] = useState({
    emailNewBookings: true,
    emailContactMessages: true,
    emailAcademyEnrollments: false,
    pushNotifications: true,
    weeklyReports: true,
  });
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
  });

  return (
    <div className="settings-page">
      <header className="settings-header">
        <h1 className="settings-title">Settings</h1>
        <time className="settings-date" dateTime={new Date().toISOString().slice(0, 10)}>
          {formatSettingsDate()}
        </time>
      </header>

      <div className="settings-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`settings-tab ${activeTab === tab.id ? 'settings-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className={`settings-tab__icon settings-tab__icon--${tab.icon}`} aria-hidden />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="settings-content">
        {activeTab === 'profile' && (
          <div className="settings-panel settings-panel--profile">
            <div className="settings-profile-photo">
              <div className="settings-profile-avatar">C</div>
              <div className="settings-profile-photo-actions">
                <button type="button" className="settings-profile-change-btn">Change Photo</button>
                <p className="settings-profile-hint">JPG, PNG or GIF (max. 2MB)</p>
              </div>
            </div>
            <div className="settings-form">
              <div className="settings-form__row">
                <div className="settings-field">
                  <label className="settings-field__label" htmlFor="settings-full-name">Full Name</label>
                  <input
                    id="settings-full-name"
                    type="text"
                    className="settings-field__input"
                    value={profile.fullName}
                    onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))}
                  />
                </div>
                <div className="settings-field">
                  <label className="settings-field__label" htmlFor="settings-email">Email</label>
                  <input
                    id="settings-email"
                    type="email"
                    className="settings-field__input settings-field__input--disabled"
                    value={profile.email}
                    readOnly
                    disabled
                  />
                </div>
              </div>
              <div className="settings-form__row">
                <div className="settings-field">
                  <label className="settings-field__label" htmlFor="settings-phone">Phone</label>
                  <input
                    id="settings-phone"
                    type="tel"
                    className="settings-field__input"
                    value={profile.phone}
                    onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                  />
                </div>
                <div className="settings-field">
                  <label className="settings-field__label" htmlFor="settings-role">Role</label>
                  <input
                    id="settings-role"
                    type="text"
                    className="settings-field__input settings-field__input--disabled"
                    value={profile.role}
                    readOnly
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="settings-actions">
              <button type="button" className="settings-btn settings-btn--cancel">Cancel</button>
              <button type="button" className="settings-btn settings-btn--save">
                <span className="settings-btn__icon settings-btn__icon--save" aria-hidden />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'company' && (
          <div className="settings-panel settings-panel--company">
            <div className="settings-form">
              <div className="settings-form__row">
                <div className="settings-field">
                  <label className="settings-field__label" htmlFor="settings-company-name">Company Name</label>
                  <input
                    id="settings-company-name"
                    type="text"
                    className="settings-field__input"
                    value={company.companyName}
                    onChange={(e) => setCompany((c) => ({ ...c, companyName: e.target.value }))}
                  />
                </div>
                <div className="settings-field">
                  <label className="settings-field__label" htmlFor="settings-industry">Industry</label>
                  <input
                    id="settings-industry"
                    type="text"
                    className="settings-field__input"
                    value={company.industry}
                    onChange={(e) => setCompany((c) => ({ ...c, industry: e.target.value }))}
                  />
                </div>
              </div>
              <div className="settings-form__row">
                <div className="settings-field">
                  <label className="settings-field__label" htmlFor="settings-company-email">Email</label>
                  <input
                    id="settings-company-email"
                    type="email"
                    className="settings-field__input"
                    value={company.email}
                    onChange={(e) => setCompany((c) => ({ ...c, email: e.target.value }))}
                  />
                </div>
                <div className="settings-field">
                  <label className="settings-field__label" htmlFor="settings-company-phone">Phone</label>
                  <input
                    id="settings-company-phone"
                    type="tel"
                    className="settings-field__input"
                    value={company.phone}
                    onChange={(e) => setCompany((c) => ({ ...c, phone: e.target.value }))}
                  />
                </div>
              </div>
              <div className="settings-field">
                <label className="settings-field__label" htmlFor="settings-address">Address</label>
                <textarea
                  id="settings-address"
                  className="settings-field__textarea"
                  value={company.address}
                  onChange={(e) => setCompany((c) => ({ ...c, address: e.target.value }))}
                  rows={3}
                />
              </div>
              <div className="settings-field">
                <label className="settings-field__label" htmlFor="settings-about">About</label>
                <textarea
                  id="settings-about"
                  className="settings-field__textarea"
                  value={company.about}
                  onChange={(e) => setCompany((c) => ({ ...c, about: e.target.value }))}
                  rows={4}
                />
              </div>
            </div>
            <div className="settings-actions">
              <button type="button" className="settings-btn settings-btn--cancel">Cancel</button>
              <button type="button" className="settings-btn settings-btn--save">
                <span className="settings-btn__icon settings-btn__icon--save" aria-hidden />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="settings-panel settings-panel--notifications">
            <ul className="settings-notifications-list">
              <li className="settings-notification-item">
                <div className="settings-notification-text">
                  <span className="settings-notification-label">Email - New Bookings</span>
                  <span className="settings-notification-desc">Receive emails when new bookings are made</span>
                </div>
                <button
                  type="button"
                  className={`settings-notification-toggle ${notifications.emailNewBookings ? 'is-on' : ''}`}
                  onClick={() => setNotifications((n) => ({ ...n, emailNewBookings: !n.emailNewBookings }))}
                  aria-pressed={notifications.emailNewBookings}
                  aria-label="Toggle email new bookings"
                >
                  <span className="settings-notification-toggle-thumb" />
                </button>
              </li>
              <li className="settings-notification-item">
                <div className="settings-notification-text">
                  <span className="settings-notification-label">Email - Contact Messages</span>
                  <span className="settings-notification-desc">Receive emails for new contact form submissions</span>
                </div>
                <button
                  type="button"
                  className={`settings-notification-toggle ${notifications.emailContactMessages ? 'is-on' : ''}`}
                  onClick={() => setNotifications((n) => ({ ...n, emailContactMessages: !n.emailContactMessages }))}
                  aria-pressed={notifications.emailContactMessages}
                  aria-label="Toggle email contact messages"
                >
                  <span className="settings-notification-toggle-thumb" />
                </button>
              </li>
              <li className="settings-notification-item">
                <div className="settings-notification-text">
                  <span className="settings-notification-label">Email - Academy Enrollments</span>
                  <span className="settings-notification-desc">Receive emails for new academy enrollments</span>
                </div>
                <button
                  type="button"
                  className={`settings-notification-toggle ${notifications.emailAcademyEnrollments ? 'is-on' : ''}`}
                  onClick={() => setNotifications((n) => ({ ...n, emailAcademyEnrollments: !n.emailAcademyEnrollments }))}
                  aria-pressed={notifications.emailAcademyEnrollments}
                  aria-label="Toggle email academy enrollments"
                >
                  <span className="settings-notification-toggle-thumb" />
                </button>
              </li>
              <li className="settings-notification-item">
                <div className="settings-notification-text">
                  <span className="settings-notification-label">Push Notifications</span>
                  <span className="settings-notification-desc">Receive push notifications in your browser</span>
                </div>
                <button
                  type="button"
                  className={`settings-notification-toggle ${notifications.pushNotifications ? 'is-on' : ''}`}
                  onClick={() => setNotifications((n) => ({ ...n, pushNotifications: !n.pushNotifications }))}
                  aria-pressed={notifications.pushNotifications}
                  aria-label="Toggle push notifications"
                >
                  <span className="settings-notification-toggle-thumb" />
                </button>
              </li>
              <li className="settings-notification-item">
                <div className="settings-notification-text">
                  <span className="settings-notification-label">Weekly Reports</span>
                  <span className="settings-notification-desc">Receive weekly summary reports via email</span>
                </div>
                <button
                  type="button"
                  className={`settings-notification-toggle ${notifications.weeklyReports ? 'is-on' : ''}`}
                  onClick={() => setNotifications((n) => ({ ...n, weeklyReports: !n.weeklyReports }))}
                  aria-pressed={notifications.weeklyReports}
                  aria-label="Toggle weekly reports"
                >
                  <span className="settings-notification-toggle-thumb" />
                </button>
              </li>
            </ul>
            <div className="settings-actions">
              <button type="button" className="settings-btn settings-btn--save">
                <span className="settings-btn__icon settings-btn__icon--save" aria-hidden />
                Save Preferences
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="settings-panel settings-panel--security">
            <section className="settings-security-section">
              <h3 className="settings-security-section__title">Change Password</h3>
              <div className="settings-form">
                <div className="settings-field">
                  <label className="settings-field__label" htmlFor="settings-current-password">Current Password</label>
                  <input
                    id="settings-current-password"
                    type="password"
                    className="settings-field__input"
                    placeholder="Enter current password"
                    value={security.currentPassword}
                    onChange={(e) => setSecurity((s) => ({ ...s, currentPassword: e.target.value }))}
                  />
                </div>
                <div className="settings-field">
                  <label className="settings-field__label" htmlFor="settings-new-password">New Password</label>
                  <input
                    id="settings-new-password"
                    type="password"
                    className="settings-field__input"
                    placeholder="Enter new password"
                    value={security.newPassword}
                    onChange={(e) => setSecurity((s) => ({ ...s, newPassword: e.target.value }))}
                  />
                </div>
                <div className="settings-field">
                  <label className="settings-field__label" htmlFor="settings-confirm-password">Confirm New Password</label>
                  <input
                    id="settings-confirm-password"
                    type="password"
                    className="settings-field__input"
                    placeholder="Confirm new password"
                    value={security.confirmPassword}
                    onChange={(e) => setSecurity((s) => ({ ...s, confirmPassword: e.target.value }))}
                  />
                </div>
              </div>
              <div className="settings-security-section__actions">
                <button type="button" className="settings-btn settings-btn--save">
                  <span className="settings-btn__icon settings-btn__icon--lock" aria-hidden />
                  Update Password
                </button>
              </div>
            </section>

            <section className="settings-security-section">
              <h3 className="settings-security-section__title">Two-Factor Authentication</h3>
              <div className="settings-security-2fa">
                <p className="settings-security-2fa__desc">Enable 2FA. Add an extra layer of security to your account.</p>
                <button
                  type="button"
                  className={`settings-notification-toggle ${security.twoFactorEnabled ? 'is-on' : ''}`}
                  onClick={() => setSecurity((s) => ({ ...s, twoFactorEnabled: !s.twoFactorEnabled }))}
                  aria-pressed={security.twoFactorEnabled}
                  aria-label="Toggle two-factor authentication"
                >
                  <span className="settings-notification-toggle-thumb" />
                </button>
              </div>
            </section>

            <section className="settings-security-section">
              <h3 className="settings-security-section__title">Active Sessions</h3>
              <div className="settings-security-sessions">
                <div className="settings-security-session">
                  <span className="settings-security-session__info">Chrome on Windows Lagos, Nigeria • Current session</span>
                  <span className="settings-security-session__icon settings-security-session__icon--shield" aria-hidden />
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
