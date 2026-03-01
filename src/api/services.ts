import { API_BASE } from './config';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  priceRange: string;
  totalBookings: number;
  status: 'Active' | 'Inactive';
  visible?: boolean;
}

export async function fetchServices(): Promise<ServiceItem[]> {
  const res = await fetch(`${API_BASE}/api/admin/services`);
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
}

export type CreateServicePayload = {
  title: string;
  category: string;
  priceRange: string;
  visible?: boolean;
};

export type CreateServiceSuccess = {
  success: true;
  message: string;
  service: ServiceItem;
};

export type CreateServiceError = {
  success: false;
  message: string;
  errors?: Array<{ field: string; message: string }>;
};

export type CreateServiceResponse = CreateServiceSuccess | CreateServiceError;

export async function createService(payload: CreateServicePayload): Promise<CreateServiceResponse> {
  const res = await fetch(`${API_BASE}/api/admin/services`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: payload.title.trim(),
      category: payload.category.trim() || 'General',
      priceRange: payload.priceRange.trim() || '',
      visible: payload.visible !== false,
    }),
  });
  const data = (await res.json()) as CreateServiceResponse;
  if (!res.ok) {
    return {
      success: false,
      message: data.success === false ? data.message : 'Failed to create service',
      errors: data.success === false ? data.errors : undefined,
    };
  }
  return data;
}

export type ToggleVisibilitySuccess = {
  success: true;
  message: string;
  service: ServiceItem;
};

export type ToggleVisibilityError = {
  success: false;
  message: string;
};

export type ToggleVisibilityResponse = ToggleVisibilitySuccess | ToggleVisibilityError;

export async function toggleServiceVisibility(
  id: string,
  visible: boolean
): Promise<ToggleVisibilityResponse> {
  const res = await fetch(`${API_BASE}/api/admin/services/${id}/visibility`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ visible }),
  });
  const data = (await res.json()) as ToggleVisibilityResponse;
  if (!res.ok) {
    return {
      success: false,
      message: data.success === false ? data.message : 'Failed to update visibility',
    };
  }
  return data;
}

export type UpdateServicePayload = {
  title?: string;
  category?: string;
  priceRange?: string;
  visible?: boolean;
};

export type UpdateServiceSuccess = {
  success: true;
  message: string;
  service: ServiceItem;
};

export type UpdateServiceError = {
  success: false;
  message: string;
  errors?: Array<{ field: string; message: string }>;
};

export type UpdateServiceResponse = UpdateServiceSuccess | UpdateServiceError;

export async function updateService(
  id: string,
  payload: UpdateServicePayload
): Promise<UpdateServiceResponse> {
  const res = await fetch(`${API_BASE}/api/admin/services/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: payload.title?.trim(),
      category: payload.category?.trim(),
      priceRange: payload.priceRange?.trim(),
      visible: payload.visible,
    }),
  });
  const data = (await res.json()) as UpdateServiceResponse;
  if (!res.ok) {
    return {
      success: false,
      message: data.success === false ? data.message : 'Failed to update service',
      errors: data.success === false ? data.errors : undefined,
    };
  }
  return data;
}

export type DeleteServiceSuccess = {
  success: true;
  message: string;
};

export type DeleteServiceError = {
  success: false;
  message: string;
};

export type DeleteServiceResponse = DeleteServiceSuccess | DeleteServiceError;

export async function deleteService(id: string): Promise<DeleteServiceResponse> {
  const res = await fetch(`${API_BASE}/api/admin/services/${id}`, {
    method: 'DELETE',
  });
  const data = (await res.json()) as DeleteServiceResponse;
  if (!res.ok) {
    return {
      success: false,
      message: data.success === false ? data.message : 'Failed to delete service',
    };
  }
  return data;
}
