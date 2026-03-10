import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import primaryLogo from '../assets/primary-logo.png';
import { login } from '../api/client';
import { setStoredToken, setStoredUser } from '../api/auth';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setLoading(true);

    try {
      const result = await login({ email, password, rememberMe });

      if (result.success) {
        setStoredToken(result.session.access_token, rememberMe);
        setStoredUser(result.user, rememberMe);
        navigate('/admin', { replace: true });
        return;
      }

      setError(result.message);
      if (result.errors?.length) {
        const byField: Record<string, string> = {};
        for (const { field, message } of result.errors) {
          byField[field] = message;
        }
        setFieldErrors(byField);
      }
    } catch {
      setError('Unable to reach the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <div className="login-brand">
          <img src={primaryLogo} alt="AfrESH" className="login-brand__logo" />
        </div>
        <h1 className="login-title">Admin Sign In</h1>
        <p className="login-subtitle">Access your dashboard</p>
      </header>

      <div className="login-card">
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <div className={`login-field ${fieldErrors.email ? 'login-field--error' : ''}`}>
            <label className="login-field__label" htmlFor="login-email">
              Email Address
            </label>
            <div className="login-input-wrap login-input-wrap--email">
              <span className="login-input-wrap__icon login-input-wrap__icon--envelope" aria-hidden />
              <input
                id="login-email"
                type="email"
                className="login-field__input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: '' }));
                }}
                autoComplete="email"
                disabled={loading}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? 'login-email-err' : undefined}
              />
            </div>
            {fieldErrors.email && (
              <span id="login-email-err" className="login-field__error">
                {fieldErrors.email}
              </span>
            )}
          </div>

          <div className={`login-field ${fieldErrors.password ? 'login-field--error' : ''}`}>
            <label className="login-field__label" htmlFor="login-password">
              Password
            </label>
            <div className="login-input-wrap login-input-wrap--password">
              <span className="login-input-wrap__icon login-input-wrap__icon--lock" aria-hidden />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="login-field__input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: '' }));
                }}
                autoComplete="current-password"
                disabled={loading}
                aria-invalid={!!fieldErrors.password}
                aria-describedby={fieldErrors.password ? 'login-password-err' : undefined}
              />
              <button
                type="button"
                className="login-input-wrap__toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                <span className={`login-input-wrap__icon login-input-wrap__icon--eye ${showPassword ? 'is-visible' : ''}`} aria-hidden />
              </button>
            </div>
            {fieldErrors.password && (
              <span id="login-password-err" className="login-field__error">
                {fieldErrors.password}
              </span>
            )}
          </div>

          <div className="login-options">
            <label className="login-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="login-remember__input"
              />
              <span className="login-remember__text">Remember me</span>
            </label>
            <Link to="/login" className="login-forgot">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>

      <footer className="login-footer">
        <Link to="/" className="login-back">
          ← Back to Home
        </Link>
      </footer>
    </div>
  );
}
