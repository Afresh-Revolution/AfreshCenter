import { API_BASE } from './config';

export type AdminContactDTO = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  created_at?: string;
  date?: string;
};

export async function fetchAdminContacts(): Promise<AdminContactDTO[]> {
  const adminUrl = `${API_BASE}/api/admin/contacts`;
  let res = await fetch(adminUrl);
  if (!res.ok && res.status === 404) {
    const fallbackUrl = `${API_BASE}/api/contact`;
    res = await fetch(fallbackUrl);
  }
  if (!res.ok) throw new Error('Failed to fetch contacts');
  const data = (await res.json()) as AdminContactDTO[];
  return Array.isArray(data) ? data : [];
}
