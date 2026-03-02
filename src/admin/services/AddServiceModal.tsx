import { useState } from 'react';
import type { CreateServicePayload, CreateServiceResponse } from '../../api/services';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateServicePayload) => Promise<CreateServiceResponse>;
  onSuccess: () => void;
}

const initialForm = {
  title: '',
  category: '',
  priceRange: '',
  visible: true,
};

export function AddServiceModal({
  isOpen,
  onClose,
  onSubmit,
  onSuccess,
}: AddServiceModalProps) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const resetState = () => {
    setForm(initialForm);
    setSuccess(null);
    setError(null);
    setFieldErrors({});
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setFieldErrors({});
    setLoading(true);
    try {
      const result = await onSubmit({
        title: form.title,
        category: form.category,
        priceRange: form.priceRange,
        visible: form.visible,
      });
      if (result.success) {
        setSuccess(result.message);
        setForm(initialForm);
        onSuccess();
        setTimeout(() => {
          handleClose();
        }, 1200);
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

  if (!isOpen) return null;

  return (
    <div
      className="service-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-service-title"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="service-modal" onClick={(e) => e.stopPropagation()}>
        <h2 id="add-service-title" className="service-modal__title">Add New Service</h2>
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
            <label className="service-modal__label" htmlFor="service-title">
              Title
            </label>
            <input
              id="service-title"
              type="text"
              className="service-modal__input"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Software Development"
              autoFocus
              aria-invalid={!!fieldErrors.title}
              aria-describedby={fieldErrors.title ? 'service-title-err' : undefined}
            />
            {fieldErrors.title && (
              <span id="service-title-err" className="service-modal__field-error">
                {fieldErrors.title}
              </span>
            )}
          </div>
          <div className="service-modal__field">
            <label className="service-modal__label" htmlFor="service-category">
              Category
            </label>
            <input
              id="service-category"
              type="text"
              className="service-modal__input"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              placeholder="e.g. Technology"
            />
          </div>
          <div className="service-modal__field">
            <label className="service-modal__label" htmlFor="service-price">
              Price Range
            </label>
            <input
              id="service-price"
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
              {loading ? 'Creating…' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
