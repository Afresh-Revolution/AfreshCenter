import { Routes, Route } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { Overview } from './overview/Overview';
import { Services } from './services/Services';
import { Bookings } from './bookings/Bookings';
import { Contacts } from './contacts/Contacts';
import { Settings } from './settings/Settings';

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="*" element={<AdminLayout />}>
        <Route index element={<Overview />} />
        <Route path="services" element={<Services />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
