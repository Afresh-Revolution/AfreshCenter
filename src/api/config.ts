/**
 * Backend API base URL from environment.
 * Set VITE_API_URL in .env (e.g. https://afreshcenter-logic.onrender.com).
 * In development, defaults to http://localhost:5000 so API and image URLs (e.g. /uploads/...) work.
 */
const DEFAULT_DEV_API = 'http://localhost:5000';

export function getApiBase(): string {
  const env = import.meta.env.VITE_API_URL;
  // In development, use relative paths so Vite's proxy handles CORS.
  // The proxy in vite.config.ts forwards /api and /uploads to VITE_API_URL.
  if (import.meta.env.DEV) {
    return '';
  }
  if (typeof env === 'string' && env.trim().length > 0) {
    return env.trim().replace(/\/$/, '');
  }
  return '';
}

export const API_BASE = getApiBase();
