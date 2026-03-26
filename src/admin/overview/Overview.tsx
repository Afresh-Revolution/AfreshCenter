import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBookings, type BookingDTO } from '../../api/bookings';
import { fetchAdminContacts, type AdminContactDTO } from '../../api/adminContacts';
import { fetchServices, type ServiceItem } from '../../api/services';
import { fetchAdminTeams, type TeamMemberDTO } from '../../api/teams';

function formatOverviewDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatShortDate(raw?: string) {
  if (!raw) return '—';
  const d = new Date(raw);
  return isNaN(d.getTime()) ? raw : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

type LoadState = 'loading' | 'done' | 'error';

export function Overview() {
  const [bookings, setBookings] = useState<BookingDTO[]>([]);
  const [contacts, setContacts] = useState<AdminContactDTO[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [team, setTeam] = useState<TeamMemberDTO[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [b, c, s, t] = await Promise.allSettled([
          fetchBookings(),
          fetchAdminContacts(),
          fetchServices(),
          fetchAdminTeams(),
        ]);
        if (!active) return;
        setBookings(b.status === 'fulfilled' ? b.value : []);
        setContacts(c.status === 'fulfilled' ? c.value : []);
        setServices(s.status === 'fulfilled' ? s.value : []);
        setTeam(t.status === 'fulfilled' ? t.value : []);
        setLoadState('done');
      } catch {
        if (active) setLoadState('error');
      }
    };
    load();
    return () => { active = false; };
  }, []);

  // Derived counts
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => (b.status ?? '').toLowerCase() === 'pending').length;
  const totalContacts = contacts.length;
  const activeServices = services.filter(s => s.status === 'Active').length;
  const totalServices = services.length;
  // Public /api/teams only returns visible members, so count all of them
  const totalTeam = team.length;

  // Recent 5 entries (newest first — reverse the array since they come oldest-first)
  const recentBookings = [...bookings].reverse().slice(0, 5);
  const recentContacts = [...contacts].reverse().slice(0, 5);

  const metricCards = [
    {
      title: 'Total Bookings',
      value: loadState === 'loading' ? '…' : String(totalBookings),
      sub: loadState === 'done' ? `${pendingBookings} pending` : '',
      icon: 'calendar',
      color: 'blue',
      link: '/admin/bookings',
    },
    {
      title: 'Contact Messages',
      value: loadState === 'loading' ? '…' : String(totalContacts),
      sub: loadState === 'done' ? 'total received' : '',
      icon: 'chat',
      color: 'orange',
      link: '/admin/contacts',
    },
    {
      title: 'Active Services',
      value: loadState === 'loading' ? '…' : `${activeServices}/${totalServices}`,
      sub: loadState === 'done' ? 'services enabled' : '',
      icon: 'briefcase',
      color: 'green',
      link: '/admin/services',
    },
    {
      title: 'Team Members',
      value: loadState === 'loading' ? '…' : String(totalTeam),
      sub: loadState === 'done' ? 'active members' : '',
      icon: 'users',
      color: 'purple',
      link: '/admin/team',
    },
  ];

  return (
    <div className="overview">
      <header className="overview-header">
        <h1 className="overview-title">Overview</h1>
        <time className="overview-date" dateTime={new Date().toISOString().slice(0, 10)}>
          {formatOverviewDate()}
        </time>
      </header>

      {/* ── Metric cards ── */}
      <section className="overview-metrics" aria-label="Key metrics">
        {metricCards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className={`metric-card metric-card--${card.color}`}
            aria-label={`${card.title}: ${card.value}`}
          >
            <div className={`metric-card__icon metric-card__icon--${card.icon}`} aria-hidden />
            <p className="metric-card__label">{card.title}</p>
            <p className="metric-card__value">{card.value}</p>
            {card.sub && <p className="metric-card__sub">{card.sub}</p>}
          </Link>
        ))}
      </section>

      {/* ── Recent activity ── */}
      <section className="overview-activity" aria-label="Recent activity">
        {/* Recent Bookings */}
        <div className="activity-card">
          <h2 className="activity-card__title">Recent Bookings</h2>
          {loadState === 'loading' && <p className="activity-card__empty">Loading…</p>}
          {loadState === 'done' && recentBookings.length === 0 && (
            <p className="activity-card__empty">No bookings yet.</p>
          )}
          {loadState === 'done' && recentBookings.length > 0 && (
            <ul className="activity-list">
              {recentBookings.map((b, i) => {
                const name = b.full_name ?? b.company ?? 'Client';
                const service = b.project_details?.split('\n')[0] ?? '—';
                const statusRaw = (b.status ?? 'pending').toLowerCase();
                const status = statusRaw === 'confirmed'
                  ? 'Confirmed'
                  : statusRaw === 'completed'
                  ? 'Completed'
                  : 'Pending';
                return (
                  <li key={`${name}-${i}`} className="activity-list__item">
                    <div className="activity-list__main">
                      <span className="activity-list__name">{name}</span>
                      <span className="activity-list__sub">{service}</span>
                    </div>
                    <span className={`activity-list__status activity-list__status--${status.toLowerCase()}`}>
                      {status}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
          <Link to="/admin/bookings" className="activity-card__link">
            View All Bookings →
          </Link>
        </div>

        {/* Recent Contacts */}
        <div className="activity-card">
          <h2 className="activity-card__title">Recent Contacts</h2>
          {loadState === 'loading' && <p className="activity-card__empty">Loading…</p>}
          {loadState === 'done' && recentContacts.length === 0 && (
            <p className="activity-card__empty">No contacts yet.</p>
          )}
          {loadState === 'done' && recentContacts.length > 0 && (
            <ul className="activity-list">
              {recentContacts.map((c, i) => (
                <li key={`${c.name}-${i}`} className="activity-list__item">
                  <div className="activity-list__main">
                    <span className="activity-list__name">{c.name ?? '—'}</span>
                    <span className="activity-list__sub">{c.subject ?? 'General Inquiry'}</span>
                  </div>
                  <span className="activity-list__date">
                    {formatShortDate(c.created_at ?? c.date)}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Link to="/admin/contacts" className="activity-card__link">
            View All Contacts →
          </Link>
        </div>
      </section>
    </div>
  );
}
