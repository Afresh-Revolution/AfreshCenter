/**
 * Backend API base URL from environment.
 * Set VITE_API_URL in .env (e.g. https://afreshcenter-logic.onrender.com).
 * In development, defaults to http://localhost:5000 so API and image URLs (e.g. /uploads/...) work.
 */
const DEFAULT_DEV_API = 'http://localhost:5000';

export function getApiBase(): string {
  const env = import.meta.env.VITE_API_URL;
  if (typeof env === 'string' && env.trim().length > 0) {
    return env.trim().replace(/\/$/, '');
  }
  if (import.meta.env.DEV) {
    return DEFAULT_DEV_API;
  }
  return '';
}

export const API_BASE = getApiBase();
