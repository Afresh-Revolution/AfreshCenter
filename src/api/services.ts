import { API_BASE } from './config';
import { clearAuth, getApiErrorMessage, getAuthHeaders, parseApiPayload } from './auth';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  priceRange: string;
  totalBookings: number;
  status: 'Active' | 'Inactive';
  visible?: boolean;
  /** Single image URL/path for card, overview, and hero (uploaded via admin). */
  image?: string | null;
  description?: string | null;
  shortDescription?: string | null;
  overview?: string | null;
  keyFeatures?: string[];
  benefits?: string[];
  whatYouGet?: string[];
}

type ServiceCollectionResponse =
  | ServiceItem[]
  | {
      value?: ServiceItem[];
      data?: ServiceItem[];
      items?: ServiceItem[];
    };

function parseServiceCollection(payload: ServiceCollectionResponse): ServiceItem[] {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.value)) return payload.value;
  if (payload && Array.isArray(payload.data)) return payload.data;
  if (payload && Array.isArray(payload.items)) return payload.items;
  return [];
}

export async function fetchServices(): Promise<ServiceItem[]> {
  const res = await fetch(`${API_BASE}/api/admin/services`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    if (res.status === 401) {
      clearAuth();
      throw new Error('SESSION_EXPIRED');
    }
    throw new Error('Failed to fetch services');
  }
  const data = (await res.json()) as ServiceCollectionResponse;
  return parseServiceCollection(data);
}

/** Fetch visible services for the landing page (public). */
export async function fetchPublicServices(): Promise<ServiceItem[]> {
  const res = await fetch(`${API_BASE}/api/services`);
  if (!res.ok) throw new Error('Failed to fetch services');
  const data = (await res.json()) as ServiceCollectionResponse;
  return parseServiceCollection(data);
}

/** Resolve service image to full URL (for display). */
export function getServiceImageUrl(image: string | null | undefined): string | null {
  if (!image || typeof image !== 'string') return null;
  const trimmed = image.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  const base = API_BASE.replace(/\/$/, '');
  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return base ? `${base}${path}` : path;
}

/** Upload an image for a service. Returns the path to store (e.g. /uploads/xxx). */
export async function adminImageUpload(file: File): Promise<{ success: true; url: string } | { success: false; message: string }> {
  const form = new FormData();
  form.append('image', file);
  const res = await fetch(`${API_BASE}/api/admin/upload`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: form,
  });
  const data = await parseApiPayload<{ success?: boolean; url?: string; secure_url?: string; message?: string; reason?: string; details?: string }>(res);
  if (!res.ok) {
    console.error('[adminImageUpload] Upload failed — full server response:', {
      status: res.status,
      payload: data,
    });
    const message = getApiErrorMessage(
      data,
      res.status === 401
        ? 'Your admin session expired. Please sign in again.'
        : 'Upload failed'
    );
    if (res.status === 401) clearAuth();
    return { success: false, message };
  }
  // Backend returns `secure_url` (Cloudinary) — fall back to `url` for compatibility.
  const imageUrl = data?.secure_url || data?.url;
  if (data?.success && imageUrl) return { success: true, url: imageUrl };
  console.error('[adminImageUpload] Unexpected response (no url/secure_url):', data);
  return { success: false, message: getApiErrorMessage(data, 'Upload failed') };
}

export type CreateServicePayload = {
  title: string;
  category: string;
  priceRange: string;
  visible?: boolean;
  image?: string;
  description?: string;
  shortDescription?: string;
  overview?: string;
  keyFeatures?: string[];
  benefits?: string[];
  whatYouGet?: string[];
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
    headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      title: payload.title.trim(),
      category: payload.category.trim() || 'General',
      priceRange: payload.priceRange.trim() || '',
      visible: payload.visible !== false,
      image: payload.image?.trim() || null,
      description: payload.description?.trim() || null,
      shortDescription: payload.shortDescription?.trim() || null,
      overview: payload.overview?.trim() || null,
      keyFeatures: payload.keyFeatures ?? [],
      benefits: payload.benefits ?? [],
      whatYouGet: payload.whatYouGet ?? [],
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
    headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
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
  image?: string;
  description?: string;
  shortDescription?: string;
  overview?: string;
  keyFeatures?: string[];
  benefits?: string[];
  whatYouGet?: string[];
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
    headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      title: payload.title?.trim(),
      category: payload.category?.trim(),
      priceRange: payload.priceRange?.trim(),
      visible: payload.visible,
      image: payload.image !== undefined ? (payload.image?.trim() || null) : undefined,
      description: payload.description !== undefined ? (payload.description?.trim() || null) : undefined,
      shortDescription: payload.shortDescription !== undefined ? (payload.shortDescription?.trim() || null) : undefined,
      overview: payload.overview !== undefined ? (payload.overview?.trim() || null) : undefined,
      keyFeatures: payload.keyFeatures,
      benefits: payload.benefits,
      whatYouGet: payload.whatYouGet,
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
    headers: getAuthHeaders(),
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
