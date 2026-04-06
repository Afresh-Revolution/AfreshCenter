import { useState, useRef } from 'react';
import type { CreateTeamPayload, CreateTeamResponse } from '../../api/teams';
import { uploadTeamImage, getTeamImageUrl } from '../../api/teams';

interface AddTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (payload: CreateTeamPayload) => Promise<CreateTeamResponse>;
    onSuccess: () => void;
}

const initialForm = {
    name: '',
    role: '',
    bio: '',
    image_url: '',
    visible: true,
};

const IMAGE_ACCEPT = 'image/jpeg,image/jpg,image/png,image/gif,image/webp,image/avif,image/bmp,image/svg+xml';

export function AddTeamModal({ isOpen, onClose, onSubmit, onSuccess }: AddTeamModalProps) {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const resetState = () => {
        setForm(initialForm);
        setSuccess(null);
        setError(null);
        setFieldErrors({});
        setUploadError(null);
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
                name: form.name,
                role: form.role,
                bio: form.bio || undefined,
                image_url: form.image_url || undefined,
                visible: form.visible,
            });
            if (result.success) {
                setSuccess(result.message);
                setForm(initialForm);
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

    if (!isOpen) return null;

    return (
        <div
            className="service-modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-team-title"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
            <div className="service-modal" onClick={(e) => e.stopPropagation()}>
                <h2 id="add-team-title" className="service-modal__title">Add Team Member</h2>

                {success && <div className="badge badge--success" role="status">{success}</div>}
                {error && <div className="badge badge--error" role="alert">{error}</div>}

                <form className="service-modal__form" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="service-modal__field">
                        <label className="service-modal__label" htmlFor="team-name">Name</label>
                        <input
                            id="team-name"
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
                        <label className="service-modal__label" htmlFor="team-role">Role</label>
                        <input
                            id="team-role"
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
                        <label className="service-modal__label" htmlFor="team-bio">Bio</label>
                        <textarea
                            id="team-bio"
                            className="service-modal__input"
                            rows={3}
                            value={form.bio}
                            onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                            placeholder="Brief description of this team member's role and responsibilities"
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

                    {/* Visibility toggle */}
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
                            {loading ? 'Adding…' : 'Add Member'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
