/**
 * Backend API base URL from environment.
 * Set VITE_API_URL in .env (e.g. https://afreshcenter-logic.onrender.com).
 * Used by client, services, and any other API modules.
 */
export function getApiBase(): string {
  const env = import.meta.env.VITE_API_URL;
  if (typeof env === 'string' && env.length > 0) {
    return env.replace(/\/$/, '');
  }
  return ''; // dev: same origin; Vite can proxy /api to backend
}

export const API_BASE = getApiBase();
