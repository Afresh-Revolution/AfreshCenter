const TOKEN_KEY = 'afresh_admin_token';
const USER_KEY = 'afresh_admin_user';

export type StoredUser = { id: string; email: string };

export function getStoredToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY) ?? localStorage.getItem(TOKEN_KEY);
}

export function getAuthHeaders(extraHeaders?: HeadersInit): HeadersInit {
  const token = getStoredToken();
  const headers = new Headers(extraHeaders);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
}

export function setStoredToken(token: string, remember: boolean): void {
  if (remember) {
    localStorage.setItem(TOKEN_KEY, token);
    sessionStorage.removeItem(TOKEN_KEY);
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function getStoredUser(): StoredUser | null {
  const raw = sessionStorage.getItem(USER_KEY) ?? localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

export function setStoredUser(user: StoredUser, remember: boolean): void {
  const json = JSON.stringify(user);
  if (remember) {
    localStorage.setItem(USER_KEY, json);
    sessionStorage.removeItem(USER_KEY);
  } else {
    sessionStorage.setItem(USER_KEY, json);
    localStorage.removeItem(USER_KEY);
  }
}

export function clearStoredToken(): void {
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export function clearStoredUser(): void {
  sessionStorage.removeItem(USER_KEY);
  localStorage.removeItem(USER_KEY);
}

/** Clear token and user (call on logout). */
export function clearAuth(): void {
  clearStoredToken();
  clearStoredUser();
}

export async function parseApiPayload<T = unknown>(res: Response): Promise<T | null> {
  const contentType = res.headers.get('content-type') ?? '';

  try {
    if (contentType.includes('application/json')) {
      return (await res.json()) as T;
    }

    const text = await res.text();
    if (!text.trim()) return null;

    try {
      return JSON.parse(text) as T;
    } catch {
      return { message: text } as T;
    }
  } catch {
    return null;
  }
}

export function getApiErrorMessage(
  payload: unknown,
  fallbackMessage: string,
): string {
  if (!payload || typeof payload !== 'object') return fallbackMessage;

  const p = payload as Record<string, unknown>;

  const message =
    typeof p['message'] === 'string' ? p['message'].trim() : '';
  const reason =
    typeof p['reason'] === 'string' ? p['reason'].trim() : '';
  const details =
    typeof p['details'] === 'string' ? p['details'].trim() : '';

  // Log the enriched backend diagnostic info to the browser console.
  if (reason || details) {
    console.warn(
      '[AfreshCenter API] Diagnostic info from server:',
      { message, reason, details },
    );
  }

  // Build a human-readable error string.
  const base = message || fallbackMessage;
  if (reason && reason !== message) return `${base} — ${reason}`;
  return base;
}
