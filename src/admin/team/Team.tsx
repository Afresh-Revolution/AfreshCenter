import { useState, useEffect, useCallback } from 'react';
import { TeamCard } from './TeamCard';
import type { TeamCardData } from './TeamCard';
import { AddTeamModal } from './AddTeamModal';
import { EditTeamModal } from './EditTeamModal';
import {
    fetchAdminTeams,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
    toggleTeamMemberVisibility,
    type TeamMemberDTO,
} from '../../api/teams';

function formatDate() {
    return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function toCardData(m: TeamMemberDTO): TeamCardData {
    return {
        id: m.id,
        name: m.name ?? 'Team Member',
        role: m.role ?? '',
        bio: m.bio ?? '',
        image_url: m.image_url ?? '',
        status: m.visible === false ? 'Inactive' : 'Active',
    };
}

export function Team() {
    const [members, setMembers] = useState<TeamMemberDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMemberDTO | null>(null);
    const [pageMessage, setPageMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const loadMembers = useCallback(async () => {
        setLoading(true);
        setPageMessage(null);
        try {
            const list = await fetchAdminTeams();
            // Sort oldest-first (ascending by id)
            const sorted = [...list].sort((a, b) => {
                const aId = isNaN(Number(a.id)) ? (a.id ?? '') : Number(a.id);
                const bId = isNaN(Number(b.id)) ? (b.id ?? '') : Number(b.id);
                if (aId < bId) return -1;
                if (aId > bId) return 1;
                return 0;
            });
            setMembers(sorted);
        } catch {
            setPageMessage({ type: 'error', text: 'Failed to load team members.' });
            setMembers([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadMembers();
    }, [loadMembers]);

    const handleToggleVisibility = useCallback(
        async (id: string, nextVisible: boolean): Promise<{ success: boolean; message: string }> => {
            const result = await toggleTeamMemberVisibility(id, nextVisible);
            if (result.success) {
                setMembers((prev) =>
                    prev.map((m) =>
                        m.id === id && result.member
                            ? { ...m, status: result.member.status, visible: result.member.visible }
                            : m
                    )
                );
                return { success: true, message: result.message };
            }
            return { success: false, message: result.message };
        },
        []
    );

    const handleCreateSuccess = useCallback(() => {
        loadMembers();
        setPageMessage({ type: 'success', text: 'Team member added successfully.' });
        setTimeout(() => setPageMessage(null), 4000);
    }, [loadMembers]);

    const handleEdit = useCallback((member: TeamMemberDTO) => {
        setEditingMember(member);
    }, []);

    const handleEditSuccess = useCallback(() => {
        loadMembers();
        setEditingMember(null);
        setPageMessage({ type: 'success', text: 'Team member updated successfully.' });
        setTimeout(() => setPageMessage(null), 4000);
    }, [loadMembers]);

    const handleDelete = useCallback(
        async (card: TeamCardData): Promise<{ success: boolean; message: string }> => {
            if (!card.id) return { success: false, message: 'No member id' };
            const result = await deleteTeamMember(card.id);
            if (result.success) {
                setMembers((prev) => prev.filter((m) => m.id !== card.id));
                return { success: true, message: result.message };
            }
            return { success: false, message: result.message };
        },
        []
    );

    return (
        <div className="services-page">
            <header className="services-header">
                <h1 className="services-title">Team</h1>
                <time className="services-date" dateTime={new Date().toISOString().slice(0, 10)}>
                    {formatDate()}
                </time>
            </header>

            {pageMessage && (
                <div
                    className={`badge badge--${pageMessage.type}`}
                    role={pageMessage.type === 'error' ? 'alert' : 'status'}
                >
                    {pageMessage.text}
                </div>
            )}

            <div className="services-toolbar">
                <div className="services-search-wrap">
                    <span className="services-search-icon" aria-hidden />
                    <input
                        type="search"
                        className="services-search"
                        placeholder="Search team members..."
                        aria-label="Search team members"
                    />
                </div>
                <button
                    type="button"
                    className="services-add-btn"
                    onClick={() => setAddModalOpen(true)}
                >
                    <span className="services-add-icon" aria-hidden />
                    Add New Member
                </button>
            </div>

            {loading ? (
                <p className="services-loading">Loading team members…</p>
            ) : members.length === 0 ? (
                <p className="services-loading">No team members yet. Add your first member above.</p>
            ) : (
                <div className="services-grid">
                    {members.map((member) => (
                        <TeamCard
                            key={member.id ?? member.name}
                            member={toCardData(member)}
                            onToggleVisibility={member.id ? handleToggleVisibility : undefined}
                            onEdit={() => handleEdit(member)}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            <AddTeamModal
                isOpen={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                onSubmit={createTeamMember}
                onSuccess={handleCreateSuccess}
            />
            <EditTeamModal
                isOpen={!!editingMember}
                member={editingMember}
                onClose={() => setEditingMember(null)}
                onSubmit={updateTeamMember}
                onSuccess={handleEditSuccess}
            />
        </div>
    );
}
