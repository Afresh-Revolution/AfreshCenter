import { API_BASE } from './config';

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type ContactSuccess = {
  success: true;
  message?: string;
};

export type ContactError = {
  success: false;
  message?: string;
};

export type ContactResponse = ContactSuccess | ContactError;

export async function sendContact(payload: ContactPayload): Promise<ContactResponse> {
  const base = API_BASE ? `${API_BASE}/api/contact` : '/api/contact';
  const res = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = (await res.json()) as ContactResponse;
  if (!res.ok) {
    return {
      success: false,
      message: data?.message ?? 'Failed to send message',
    };
  }
  return data;
}
