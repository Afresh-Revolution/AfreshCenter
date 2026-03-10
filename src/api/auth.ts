const TOKEN_KEY = 'afresh_admin_token';
const USER_KEY = 'afresh_admin_user';

export type StoredUser = { id: string; email: string };

export function getStoredToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY) ?? localStorage.getItem(TOKEN_KEY);
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
