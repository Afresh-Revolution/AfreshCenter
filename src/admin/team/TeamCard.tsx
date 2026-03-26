import { useState, useEffect } from 'react';
import { getTeamImageUrl } from '../../api/teams';

export interface TeamCardData {
    id?: string;
    name: string;
    role: string;
    bio?: string;
    image_url?: string;
    status?: 'Active' | 'Inactive';
}

interface TeamCardProps {
    member: TeamCardData;
    onToggleVisibility?: (id: string, nextVisible: boolean) => Promise<{ success: boolean; message: string }>;
    onEdit?: (member: TeamCardData) => void;
    onDelete?: (member: TeamCardData) => Promise<{ success: boolean; message: string }>;
}

export function TeamCard({ member, onToggleVisibility, onEdit, onDelete }: TeamCardProps) {
    const [isOn, setIsOn] = useState(member.status !== 'Inactive');
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        setIsOn(member.status !== 'Inactive');
    }, [member.status]);

    const handleToggle = async () => {
        if (!member.id || !onToggleVisibility) {
            setIsOn((v) => !v);
            return;
        }
        const nextVisible = !isOn;
        setUpdating(true);
        setActionMessage(null);
        try {
            const result = await onToggleVisibility(member.id, nextVisible);
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
        if (member.id && onEdit) onEdit(member);
    };

    const handleDelete = async () => {
        if (!member.id || !onDelete) return;
        if (!window.confirm(`Delete "${member.name}"? This cannot be undone.`)) return;
        setActionMessage(null);
        setDeleting(true);
        try {
            const result = await onDelete(member);
            setActionMessage({ type: result.success ? 'success' : 'error', text: result.message });
            if (result.success) setTimeout(() => setActionMessage(null), 4000);
        } catch {
            setActionMessage({ type: 'error', text: 'Failed to delete team member' });
            setTimeout(() => setActionMessage(null), 4000);
        } finally {
            setDeleting(false);
        }
    };

    const imgUrl = getTeamImageUrl(member.image_url);

    return (
        <article className="service-card">
            <div className="service-card__head">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                    {imgUrl && (
                        <img
                            src={imgUrl}
                            alt={member.name}
                            style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                        />
                    )}
                    <h3 className="service-card__title">{member.name}</h3>
                </div>
                <button
                    type="button"
                    className={`service-card__toggle ${isOn ? 'is-on' : ''}`}
                    onClick={handleToggle}
                    disabled={updating}
                    aria-pressed={isOn}
                    aria-label={isOn ? 'Hide from team section' : 'Show in team section'}
                >
                    <span className="service-card__toggle-thumb" />
                </button>
            </div>

            {actionMessage && (
                <div className={`badge badge--${actionMessage.type}`} role="status">
                    {actionMessage.text}
                </div>
            )}

            <p className="service-card__category">{member.role}</p>

            {member.bio && (
                <p style={{ fontSize: '0.82rem', color: 'var(--color-muted, #888)', margin: '0.25rem 0 0.5rem', lineHeight: 1.4 }}>
                    {member.bio.length > 100 ? member.bio.slice(0, 100) + '…' : member.bio}
                </p>
            )}

            <dl className="service-card__meta">
                <div className="service-card__row">
                    <dt>Status:</dt>
                    <dd>
                        <span className={`service-card__status ${member.status === 'Inactive' ? 'service-card__status--inactive' : ''}`}>
                            {member.status ?? (isOn ? 'Active' : 'Inactive')}
                        </span>
                    </dd>
                </div>
            </dl>

            <div className="service-card__actions">
                <button
                    type="button"
                    className="service-card__btn service-card__btn--edit"
                    onClick={handleEdit}
                    disabled={!member.id || !onEdit}
                >
                    <span className="service-card__btn-icon service-card__btn-icon--pencil" aria-hidden />
                    Edit
                </button>
                <button
                    type="button"
                    className="service-card__btn service-card__btn--delete"
                    onClick={handleDelete}
                    disabled={!member.id || !onDelete || deleting}
                >
                    <span className="service-card__btn-icon service-card__btn-icon--trash" aria-hidden />
                    {deleting ? 'Deleting…' : 'Delete'}
                </button>
            </div>
        </article>
    );
}
