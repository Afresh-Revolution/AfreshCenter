import { API_BASE } from "./config";

export type TeamMemberDTO = {
  id?: string;
  name?: string;
  role?: string;
  bio?: string;
  image_url?: string;
  status?: "Active" | "Inactive";
  visible?: boolean;
};

type TeamCollectionResponse =
  | TeamMemberDTO[]
  | { value?: TeamMemberDTO[]; data?: TeamMemberDTO[]; items?: TeamMemberDTO[] };

function parseTeamCollection(data: TeamCollectionResponse): TeamMemberDTO[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.value)) return data.value;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.items)) return data.items;
  return [];
}

export async function fetchTeams(): Promise<TeamMemberDTO[]> {
  const base = API_BASE ? `${API_BASE}/api/teams` : "/api/teams";
  const res = await fetch(base);
  if (!res.ok) {
    throw new Error("Failed to fetch teams");
  }
  const data = (await res.json()) as TeamCollectionResponse;
  console.log("Fetched teams:", data);
  
  return parseTeamCollection(data);
}

/** Fetch all team members for admin (includes inactive). */
export async function fetchAdminTeams(): Promise<TeamMemberDTO[]> {
  const adminUrl = API_BASE ? `${API_BASE}/api/admin/teams` : '/api/admin/teams';
  let res = await fetch(adminUrl);
  if (!res.ok && res.status === 404) {
    const fallbackUrl = API_BASE ? `${API_BASE}/api/teams` : '/api/teams';
    res = await fetch(fallbackUrl);
  }
  if (!res.ok) throw new Error('Failed to fetch teams');
  const data = (await res.json()) as TeamCollectionResponse;
  return parseTeamCollection(data);
}



// meet our team card are duplicates, fix the duplicates issues, while maintaining the cards at the middle of the section in the landing page. and let the featured card stay at the middle of the section as well.

/** Resolve a team member image to a full URL. */
export function getTeamImageUrl(
  image: string | null | undefined,
): string | null {
  if (!image || typeof image !== "string") return null;
  const trimmed = image.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://"))
    return trimmed;
  const base = API_BASE.replace(/\/$/, "");
  const path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return base ? `${base}${path}` : path;
}

/** Upload an image for a team member. Returns the stored path. */
export async function uploadTeamImage(
  file: File,
): Promise<
  { success: true; url: string } | { success: false; message: string }
> {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`${API_BASE}/api/admin/upload`, {
    method: "POST",
    body: form,
  });
  const data = await res.json();
  if (!res.ok)
    return { success: false, message: data.message || "Upload failed" };
  if (data.success && data.url) return { success: true, url: data.url };
  return { success: false, message: data.message || "Upload failed" };
}

// ── CREATE ──────────────────────────────────────────────────────────────────

export type CreateTeamPayload = {
  name: string;
  role: string;
  bio?: string;
  image_url?: string;
  visible?: boolean;
};

export type CreateTeamSuccess = {
  success: true;
  message: string;
  member: TeamMemberDTO;
};
export type CreateTeamError = {
  success: false;
  message: string;
  errors?: Array<{ field: string; message: string }>;
};
export type CreateTeamResponse = CreateTeamSuccess | CreateTeamError;

export async function createTeamMember(
  payload: CreateTeamPayload,
): Promise<CreateTeamResponse> {
  const res = await fetch(`${API_BASE}/api/teams`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name.trim(),
      role: payload.role.trim(),
      bio: payload.bio?.trim() || "",
      image_url: payload.image_url || "",
      visible: payload.visible !== false,
    }),
  });
  const data = (await res.json()) as CreateTeamResponse;
  console.log(data);
  
  if (!res.ok) {
    return {
      success: false,
      message:
        data.success === false ? data.message : "Failed to create team member",
      errors: data.success === false ? data.errors : undefined,
    };
  }
  return data;
}

// ── UPDATE ──────────────────────────────────────────────────────────────────

export type UpdateTeamPayload = {
  name?: string;
  role?: string;
  bio?: string;
  image_url?: string;
  visible?: boolean;
};

export type UpdateTeamSuccess = {
  success: true;
  message: string;
  member: TeamMemberDTO;
};
export type UpdateTeamError = {
  success: false;
  message: string;
  errors?: Array<{ field: string; message: string }>;
};
export type UpdateTeamResponse = UpdateTeamSuccess | UpdateTeamError;

export async function updateTeamMember(
  id: string,
  payload: UpdateTeamPayload,
): Promise<UpdateTeamResponse> {
  const res = await fetch(`${API_BASE}/api/teams/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name?.trim(),
      role: payload.role?.trim(),
      bio: payload.bio?.trim(),
      image_url: payload.image_url,
      visible: payload.visible,
    }),
  });
  const data = (await res.json()) as UpdateTeamResponse;
  if (!res.ok) {
    return {
      success: false,
      message:
        data.success === false ? data.message : "Failed to update team member",
      errors: data.success === false ? data.errors : undefined,
    };
  }
  return data;
}

// ── TOGGLE VISIBILITY ────────────────────────────────────────────────────────

export type ToggleTeamVisibilitySuccess = {
  success: true;
  message: string;
  member: TeamMemberDTO;
};
export type ToggleTeamVisibilityError = { success: false; message: string };
export type ToggleTeamVisibilityResponse =
  | ToggleTeamVisibilitySuccess
  | ToggleTeamVisibilityError;

export async function toggleTeamMemberVisibility(
  id: string,
  visible: boolean,
): Promise<ToggleTeamVisibilityResponse> {
  const res = await fetch(`${API_BASE}/api/teams/${id}/visibility`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visible }),
  });
  const data = (await res.json()) as ToggleTeamVisibilityResponse;
  if (!res.ok) {
    return {
      success: false,
      message:
        data.success === false ? data.message : "Failed to update visibility",
    };
  }
  return data;
}

// ── DELETE ───────────────────────────────────────────────────────────────────

export type DeleteTeamSuccess = { success: true; message: string };
export type DeleteTeamError = { success: false; message: string };
export type DeleteTeamResponse = DeleteTeamSuccess | DeleteTeamError;

export async function deleteTeamMember(
  id: string,
): Promise<DeleteTeamResponse> {
  const res = await fetch(`${API_BASE}/api/teams/${id}`, {
    method: "DELETE",
  });
  const data = (await res.json()) as DeleteTeamResponse;
  if (!res.ok) {
    return {
      success: false,
      message:
        data.success === false ? data.message : "Failed to delete team member",
    };
  }
  return data;
}
