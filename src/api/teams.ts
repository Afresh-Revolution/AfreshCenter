import { API_BASE } from './config';

export type TeamMemberDTO = {
  id?: string;
  name?: string;
  role?: string;
  bio?: string;
  image_url?: string;
};

export async function fetchTeams(): Promise<TeamMemberDTO[]> {
  const base = API_BASE ? `${API_BASE}/api/teams` : '/api/teams';
  const res = await fetch(base);
  if (!res.ok) {
    throw new Error('Failed to fetch teams');
  }
  const data = (await res.json()) as TeamMemberDTO[];
  return Array.isArray(data) ? data : [];
}
