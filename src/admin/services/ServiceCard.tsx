import { useState, useEffect } from 'react';

export interface ServiceCardData {
  id?: string;
  title: string;
  category: string;
  priceRange: string;
  totalBookings: number;
  status: 'Active' | 'Inactive';
}

interface ServiceCardProps {
  service: ServiceCardData;
  onToggleVisibility?: (id: string, nextVisible: boolean) => Promise<{ success: boolean; message: string }>;
  onEdit?: (service: ServiceCardData) => void;
  onDelete?: (service: ServiceCardData) => Promise<{ success: boolean; message: string }>;
}

export function ServiceCard({ service, onToggleVisibility, onEdit, onDelete }: ServiceCardProps) {
  const [isOn, setIsOn] = useState(service.status === 'Active');
  const [updating, setUpdating] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setIsOn(service.status === 'Active');
  }, [service.status]);

  const handleToggle = async () => {
    if (!service.id || !onToggleVisibility) {
      setIsOn((v) => !v);
      return;
    }
    const nextVisible = !isOn;
    setUpdating(true);
    setActionMessage(null);
    try {
      const result = await onToggleVisibility(service.id, nextVisible);
      if (result.success) {
        setIsOn(nextVisible);
        setActionMessage({ type: 'success', text: result.message });
      } else {
        setActionMessage({ type: 'error', text: result.message });
      }
    } catch {
      setActionMessage({ type: 'error', text: 'Failed to update visibility' });
    } finally {
      setUpdating(false);
    }
    setTimeout(() => setActionMessage(null), 4000);
  };

  const handleEdit = () => {
    if (service.id && onEdit) onEdit(service);
  };

  const handleDelete = async () => {
    if (!service.id || !onDelete) return;
    if (!window.confirm(`Delete "${service.title}"? This cannot be undone.`)) return;
    setActionMessage(null);
    setDeleting(true);
    try {
      const result = await onDelete(service);
      setActionMessage({ type: result.success ? 'success' : 'error', text: result.message });
      if (result.success) setTimeout(() => setActionMessage(null), 4000);
    } catch {
      setActionMessage({ type: 'error', text: 'Failed to delete service' });
      setTimeout(() => setActionMessage(null), 4000);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <article className="service-card">
      <div className="service-card__head">
        <h3 className="service-card__title">{service.title}</h3>
        <button
          type="button"
          className={`service-card__toggle ${isOn ? 'is-on' : ''}`}
          onClick={handleToggle}
          disabled={updating}
          aria-pressed={isOn}
          aria-label={isOn ? 'Turn off service' : 'Turn on service'}
        >
          <span className="service-card__toggle-thumb" />
        </button>
      </div>
      {actionMessage && (
        <div className={`badge badge--${actionMessage.type}`} role="status">
          {actionMessage.text}
        </div>
      )}
      <p className="service-card__category">{service.category}</p>
      <dl className="service-card__meta">
        <div className="service-card__row">
          <dt>Price Range:</dt>
          <dd>{service.priceRange}</dd>
        </div>
        <div className="service-card__row">
          <dt>Total Bookings:</dt>
          <dd>{service.totalBookings}</dd>
        </div>
        <div className="service-card__row">
          <dt>Status:</dt>
          <dd>
            <span className={`service-card__status ${service.status === 'Inactive' ? 'service-card__status--inactive' : ''}`}>{service.status}</span>
          </dd>
        </div>
      </dl>
      <div className="service-card__actions">
        <button
          type="button"
          className="service-card__btn service-card__btn--edit"
          onClick={handleEdit}
          disabled={!service.id || !onEdit}
        >
          <span className="service-card__btn-icon service-card__btn-icon--pencil" aria-hidden />
          Edit
        </button>
        <button
          type="button"
          className="service-card__btn service-card__btn--delete"
          onClick={handleDelete}
          disabled={!service.id || !onDelete || deleting}
        >
          <span className="service-card__btn-icon service-card__btn-icon--trash" aria-hidden />
          {deleting ? 'Deleting…' : 'Delete'}
        </button>
      </div>
    </article>
  );
}
