import { Link } from 'react-router-dom';

const metricCards = [
  {
    title: 'Total Revenue',
    value: '₦2,450,000',
    badge: '+12.5%',
    badgeColor: 'green',
    icon: 'dollar',
  },
  {
    title: 'Total Bookings',
    value: '156',
    badge: '+8.2%',
    badgeColor: 'blue',
    icon: 'calendar',
  },
  {
    title: 'Services Offered',
    value: '12',
    badge: '+2',
    badgeColor: 'orange',
    icon: 'chart',
  },
];

const recentBookings = [
  { name: 'John Doe', service: 'Software Development', status: 'Pending' },
  { name: 'Jane Smith', service: 'UI/UX Design', status: 'Confirmed' },
  { name: 'Mike Johnson', service: 'Cyber Security', status: 'Completed' },
];

const recentContacts = [
  { name: 'Alice Cooper', reason: 'Services Information', date: '2026-02-26' },
  { name: 'Bob Wilson', reason: 'Partnership Opportunity', date: '2026-02-25' },
  { name: 'Carol Davis', reason: 'General Inquiry', date: '2026-02-24' },
];

function formatOverviewDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function Overview() {
  return (
    <div className="overview">
      <header className="overview-header">
        <h1 className="overview-title">Overview</h1>
        <time className="overview-date" dateTime={new Date().toISOString().slice(0, 10)}>
          {formatOverviewDate()}
        </time>
      </header>

      <section className="overview-metrics">
        {metricCards.map((card) => (
          <div key={card.title} className="metric-card">
            <div className={`metric-card__icon metric-card__icon--${card.icon}`} aria-hidden />
            <span className={`metric-card__badge metric-card__badge--${card.badgeColor}`}>
              {card.badge}
            </span>
            <p className="metric-card__label">{card.title}</p>
            <p className="metric-card__value">{card.value}</p>
          </div>
        ))}
      </section>

      <section className="overview-activity">
        <div className="activity-card">
          <h2 className="activity-card__title">Recent Bookings</h2>
          <ul className="activity-list">
            {recentBookings.map((item) => (
              <li key={item.name} className="activity-list__item">
                <div className="activity-list__main">
                  <span className="activity-list__name">{item.name}</span>
                  <span className="activity-list__sub">{item.service}</span>
                </div>
                <span className={`activity-list__status activity-list__status--${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
          <Link to="/admin/bookings" className="activity-card__link">
            View All Bookings →
          </Link>
        </div>
        <div className="activity-card">
          <h2 className="activity-card__title">Recent Contacts</h2>
          <ul className="activity-list">
            {recentContacts.map((item) => (
              <li key={item.name} className="activity-list__item">
                <div className="activity-list__main">
                  <span className="activity-list__name">{item.name}</span>
                  <span className="activity-list__sub">{item.reason}</span>
                </div>
                <span className="activity-list__date">{item.date}</span>
              </li>
            ))}
          </ul>
          <Link to="/admin/contacts" className="activity-card__link">
            View All Contacts →
          </Link>
        </div>
      </section>
    </div>
  );
}
