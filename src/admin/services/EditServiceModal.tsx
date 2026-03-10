import { useState, useEffect } from 'react';
import type { ServiceCardData } from './ServiceCard';
import type { UpdateServicePayload, UpdateServiceResponse } from '../../api/services';

interface EditServiceModalProps {
  isOpen: boolean;
  service: ServiceCardData | null;
  onClose: () => void;
  onSubmit: (id: string, payload: UpdateServicePayload) => Promise<UpdateServiceResponse>;
  onSuccess: () => void;
}

export function EditServiceModal({
  isOpen,
  service,
  onClose,
  onSubmit,
  onSuccess,
}: EditServiceModalProps) {
  const [form, setForm] = useState({ title: '', category: '', priceRange: '', visible: true });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (service) {
      setForm({
        title: service.title,
        category: service.category,
        priceRange: service.priceRange,
        visible: service.status === 'Active',
      });
      setSuccess(null);
      setError(null);
      setFieldErrors({});
    }
  }, [service]);

  const handleClose = () => {
    setSuccess(null);
    setError(null);
    setFieldErrors({});
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service?.id) return;
    setSuccess(null);
    setError(null);
    setFieldErrors({});
    setLoading(true);
    try {
      const result = await onSubmit(service.id, {
        title: form.title,
        category: form.category,
        priceRange: form.priceRange,
        visible: form.visible,
      });
      if (result.success) {
        setSuccess(result.message);
        onSuccess();
        setTimeout(() => handleClose(), 1200);
      } else {
        setError(result.message);
        if (result.errors?.length) {
          const byField: Record<string, string> = {};
          for (const { field, message } of result.errors) {
            byField[field] = message;
          }
          setFieldErrors(byField);
        }
      }
    } catch {
      setError('Unable to reach the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !service) return null;

  return (
    <div
      className="service-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-service-title"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="service-modal" onClick={(e) => e.stopPropagation()}>
        <h2 id="edit-service-title" className="service-modal__title">
          Edit Service
        </h2>
        {success && (
          <div className="badge badge--success" role="status">
            {success}
          </div>
        )}
        {error && (
          <div className="badge badge--error" role="alert">
            {error}
          </div>
        )}
        <form className="service-modal__form" onSubmit={handleSubmit}>
          <div className="service-modal__field">
            <label className="service-modal__label" htmlFor="edit-service-title">
              Title
            </label>
            <input
              id="edit-service-title"
              type="text"
              className="service-modal__input"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Software Development"
              autoFocus
              aria-invalid={!!fieldErrors.title}
              aria-describedby={fieldErrors.title ? 'edit-service-title-err' : undefined}
            />
            {fieldErrors.title && (
              <span id="edit-service-title-err" className="service-modal__field-error">
                {fieldErrors.title}
              </span>
            )}
          </div>
          <div className="service-modal__field">
            <label className="service-modal__label" htmlFor="edit-service-category">
              Category
            </label>
            <input
              id="edit-service-category"
              type="text"
              className="service-modal__input"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              placeholder="e.g. Technology"
            />
          </div>
          <div className="service-modal__field">
            <label className="service-modal__label" htmlFor="edit-service-price">
              Price Range
            </label>
            <input
              id="edit-service-price"
              type="text"
              className="service-modal__input"
              value={form.priceRange}
              onChange={(e) => setForm((f) => ({ ...f, priceRange: e.target.value }))}
              placeholder="e.g. ₦500,000+"
            />
          </div>
          <div className="service-modal__field service-modal__field--row">
            <span className="service-modal__label">Visible on main page</span>
            <button
              type="button"
              className={`service-modal__toggle ${form.visible ? 'is-on' : ''}`}
              onClick={() => setForm((f) => ({ ...f, visible: !f.visible }))}
              aria-pressed={form.visible}
              aria-label={form.visible ? 'Hide from main page' : 'Show on main page'}
            >
              <span className="service-modal__toggle-thumb" />
            </button>
          </div>
          <div className="service-modal__actions">
            <button type="button" className="service-modal__btn service-modal__btn--cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="service-modal__btn service-modal__btn--create" disabled={loading}>
              {loading ? 'Saving…' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
