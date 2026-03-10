import { API_BASE } from './config';

export type LoginPayload = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type LoginSuccess = {
  success: true;
  message: string;
  session: { access_token: string; expires_in: string };
  user: { id: string; email: string };
};

export type LoginError = {
  success: false;
  message: string;
  errors?: Array<{ field: string; message: string }>;
};

export type LoginResponse = LoginSuccess | LoginError;

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const url = `${API_BASE}/api/admin/login`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: payload.email.trim(),
      password: payload.password,
      rememberMe: payload.rememberMe ?? false,
    }),
  });

  const data = (await res.json()) as LoginResponse;

  if (!res.ok) {
    return {
      success: false,
      message: data.success === false ? data.message : 'Sign in failed',
      errors: data.success === false ? data.errors : undefined,
    };
  }

  return data;
}
