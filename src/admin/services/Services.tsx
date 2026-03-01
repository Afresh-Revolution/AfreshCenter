import { useState, useEffect, useCallback } from 'react';
import { ServiceCard } from './ServiceCard';
import type { ServiceCardData } from './ServiceCard';
import { AddServiceModal } from './AddServiceModal';
import { EditServiceModal } from './EditServiceModal';
import {
  fetchServices,
  createService,
  toggleServiceVisibility,
  updateService,
  deleteService,
  type ServiceItem,
} from '../../api/services';

function formatServicesDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function toCardData(s: ServiceItem): ServiceCardData {
  return {
    id: s.id,
    title: s.title,
    category: s.category,
    priceRange: s.priceRange,
    totalBookings: s.totalBookings,
    status: s.status,
  };
}

export function Services() {
  const [services, setServices] = useState<ServiceCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceCardData | null>(null);
  const [pageMessage, setPageMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadServices = useCallback(async () => {
    setLoading(true);
    setPageMessage(null);
    try {
      const list = await fetchServices();
      setServices(list.map(toCardData));
    } catch {
      setPageMessage({ type: 'error', text: 'Failed to load services.' });
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const handleToggleVisibility = useCallback(
    async (id: string, nextVisible: boolean): Promise<{ success: boolean; message: string }> => {
      const result = await toggleServiceVisibility(id, nextVisible);
      if (result.success) {
        setServices((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: result.service!.status } : s))
        );
        return { success: true, message: result.message };
      }
      return { success: false, message: result.message };
    },
    []
  );

  const handleCreateSuccess = useCallback(() => {
    loadServices();
    setPageMessage({ type: 'success', text: 'Service created successfully.' });
    setTimeout(() => setPageMessage(null), 4000);
  }, [loadServices]);

  const handleEdit = useCallback((service: ServiceCardData) => {
    setEditingService(service);
  }, []);

  const handleEditSuccess = useCallback(() => {
    loadServices();
    setEditingService(null);
    setPageMessage({ type: 'success', text: 'Service updated successfully.' });
    setTimeout(() => setPageMessage(null), 4000);
  }, [loadServices]);

  const handleDelete = useCallback(
    async (service: ServiceCardData): Promise<{ success: boolean; message: string }> => {
      if (!service.id) return { success: false, message: 'No service id' };
      const result = await deleteService(service.id);
      if (result.success) {
        setServices((prev) => prev.filter((s) => s.id !== service.id));
        return { success: true, message: result.message };
      }
      return { success: false, message: result.message };
    },
    []
  );

  return (
    <div className="services-page">
      <header className="services-header">
        <h1 className="services-title">Services</h1>
        <time className="services-date" dateTime={new Date().toISOString().slice(0, 10)}>
          {formatServicesDate()}
        </time>
      </header>

      {pageMessage && (
        <div className={`badge badge--${pageMessage.type}`} role={pageMessage.type === 'error' ? 'alert' : 'status'}>
          {pageMessage.text}
        </div>
      )}

      <div className="services-toolbar">
        <div className="services-search-wrap">
          <span className="services-search-icon" aria-hidden />
          <input
            type="search"
            className="services-search"
            placeholder="Search services..."
            aria-label="Search services"
          />
        </div>
        <button
          type="button"
          className="services-add-btn"
          onClick={() => setModalOpen(true)}
        >
          <span className="services-add-icon" aria-hidden />
          Add New Service
        </button>
      </div>

      {loading ? (
        <p className="services-loading">Loading services…</p>
      ) : (
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard
              key={service.id ?? service.title}
              service={service}
              onToggleVisibility={service.id ? handleToggleVisibility : undefined}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <AddServiceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={createService}
        onSuccess={handleCreateSuccess}
      />
      <EditServiceModal
        isOpen={!!editingService}
        service={editingService}
        onClose={() => setEditingService(null)}
        onSubmit={updateService}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
}
