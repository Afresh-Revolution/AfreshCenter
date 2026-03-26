import { Navigate, useLocation } from 'react-router-dom';
import { getStoredToken } from '../api/auth';

/**
 * Wraps admin routes — redirects to /login if no auth token is found.
 * Preserves the attempted URL so Login can redirect back after sign-in.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = getStoredToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
