import { useState, useRef, useEffect } from 'react';
import type { TeamMemberDTO, UpdateTeamPayload, UpdateTeamResponse } from '../../api/teams';
import { uploadTeamImage, getTeamImageUrl } from '../../api/teams';

interface EditTeamModalProps {
    isOpen: boolean;
    member: TeamMemberDTO | null;
    onClose: () => void;
    onSubmit: (id: string, payload: UpdateTeamPayload) => Promise<UpdateTeamResponse>;
    onSuccess: () => void;
}

const IMAGE_ACCEPT = 'image/jpeg,image/jpg,image/png,image/gif,image/webp,image/avif,image/bmp,image/svg+xml';

export function EditTeamModal({ isOpen, member, onClose, onSubmit, onSuccess }: EditTeamModalProps) {
    const [form, setForm] = useState({
        name: '',
        role: '',
        bio: '',
        image_url: '',
        visible: true,
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Pre-fill form when member changes
    useEffect(() => {
        if (member) {
            setForm({
                name: member.name ?? '',
                role: member.role ?? '',
                bio: member.bio ?? '',
                image_url: member.image_url ?? '',
                visible: member.visible !== false,
            });
            setSuccess(null);
            setError(null);
            setFieldErrors({});
            setUploadError(null);
        }
    }, [member]);

    const handleClose = () => {
        setSuccess(null);
        setError(null);
        setFieldErrors({});
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!member?.id) return;
        setSuccess(null);
        setError(null);
        setFieldErrors({});
        setLoading(true);
        try {
            const result = await onSubmit(member.id, {
                name: form.name,
                role: form.role,
                bio: form.bio || undefined,
                image_url: form.image_url || undefined,
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

    if (!isOpen || !member) return null;

    return (
        <div
            className="service-modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-team-title"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
            <div className="service-modal" onClick={(e) => e.stopPropagation()}>
                <h2 id="edit-team-title" className="service-modal__title">Edit Team Member</h2>

                {success && <div className="badge badge--success" role="status">{success}</div>}
                {error && <div className="badge badge--error" role="alert">{error}</div>}

                <form className="service-modal__form" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="service-modal__field">
                        <label className="service-modal__label" htmlFor="edit-team-name">Name</label>
                        <input
                            id="edit-team-name"
                            type="text"
                            className="service-modal__input"
                            value={form.name}
                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                            placeholder="e.g. Jethro Mark Da'ar"
                            autoFocus
                            aria-invalid={!!fieldErrors.name}
                        />
                        {fieldErrors.name && <span className="service-modal__field-error">{fieldErrors.name}</span>}
                    </div>

                    {/* Role */}
                    <div className="service-modal__field">
                        <label className="service-modal__label" htmlFor="edit-team-role">Role</label>
                        <input
                            id="edit-team-role"
                            type="text"
                            className="service-modal__input"
                            value={form.role}
                            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                            placeholder="e.g. Chief Executive Officer"
                            aria-invalid={!!fieldErrors.role}
                        />
                        {fieldErrors.role && <span className="service-modal__field-error">{fieldErrors.role}</span>}
                    </div>

                    {/* Bio */}
                    <div className="service-modal__field">
                        <label className="service-modal__label" htmlFor="edit-team-bio">Bio</label>
                        <textarea
                            id="edit-team-bio"
                            className="service-modal__input"
                            rows={3}
                            value={form.bio}
                            onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                            placeholder="Brief description of this team member"
                        />
                    </div>

                    {/* Image upload */}
                    <div className="service-modal__field">
                        <label className="service-modal__label">Photo</label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept={IMAGE_ACCEPT}
                            className="service-modal__file-input"
                            aria-label="Upload photo"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setUploadError(null);
                                setUploading(true);
                                const result = await uploadTeamImage(file);
                                setUploading(false);
                                if (result.success) setForm((f) => ({ ...f, image_url: result.url }));
                                else setUploadError(result.message);
                                e.target.value = '';
                            }}
                        />
                        <div
                            className="service-modal__upload-zone"
                            onClick={() => fileInputRef.current?.click()}
                            onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                            role="button"
                            tabIndex={0}
                            aria-label="Click to upload photo"
                        >
                            {form.image_url ? (
                                <>
                                    <img
                                        src={getTeamImageUrl(form.image_url) ?? ''}
                                        alt="Uploaded"
                                        className="service-modal__upload-preview"
                                        style={{ borderRadius: '50%' }}
                                    />
                                    <span className="service-modal__upload-replace">Replace photo</span>
                                </>
                            ) : (
                                <span className="service-modal__upload-placeholder">
                                    {uploading ? 'Uploading…' : 'Click or drop photo (JPEG, PNG, WebP, etc.)'}
                                </span>
                            )}
                        </div>
                        {uploadError && <span className="service-modal__field-error">{uploadError}</span>}
                    </div>

                    {/* Visibility */}
                    <div className="service-modal__field service-modal__field--row">
                        <span className="service-modal__label">Visible on About page</span>
                        <button
                            type="button"
                            className={`service-modal__toggle ${form.visible ? 'is-on' : ''}`}
                            onClick={() => setForm((f) => ({ ...f, visible: !f.visible }))}
                            aria-pressed={form.visible}
                            aria-label={form.visible ? 'Hide from About page' : 'Show on About page'}
                        >
                            <span className="service-modal__toggle-thumb" />
                        </button>
                    </div>

                    <div className="service-modal__actions">
                        <button type="button" className="service-modal__btn service-modal__btn--cancel" onClick={handleClose}>
                            Cancel
                        </button>
                        <button type="submit" className="service-modal__btn service-modal__btn--create" disabled={loading}>
                            {loading ? 'Saving…' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
