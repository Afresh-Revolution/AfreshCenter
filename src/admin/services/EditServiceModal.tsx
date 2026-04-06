import { useState, useEffect, useRef } from "react";
import type { ServiceItem } from "../../api/services";
import type {
  UpdateServicePayload,
  UpdateServiceResponse,
} from "../../api/services";
import { adminImageUpload, getServiceImageUrl } from "../../api/services";

interface EditServiceModalProps {
  isOpen: boolean;
  service: ServiceItem | null;
  onClose: () => void;
  onSubmit: (
    id: string,
    payload: UpdateServicePayload,
  ) => Promise<UpdateServiceResponse>;
  onSuccess: () => void;
}

export function EditServiceModal({
  isOpen,
  service,
  onClose,
  onSubmit,
  onSuccess,
}: EditServiceModalProps) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    priceRange: "",
    visible: true,
    image: "",
    description: "",
    shortDescription: "",
    overview: "",
    keyFeaturesText: "",
    benefitsText: "",
    whatYouGetText: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const IMAGE_ACCEPT =
    "image/jpeg,image/jpg,image/png,image/gif,image/webp,image/avif,image/bmp,image/svg+xml";

  useEffect(() => {
    if (service) {
      setForm({
        title: service.title,
        category: service.category,
        priceRange: service.priceRange,
        visible: service.status === "Active",
        image: service.image ?? "",
        description: service.description ?? "",
        shortDescription: service.shortDescription ?? "",
        overview: service.overview ?? "",
        keyFeaturesText: (service.keyFeatures ?? []).join("\n"),
        benefitsText: (service.benefits ?? []).join("\n"),
        whatYouGetText: (service.whatYouGet ?? []).join("\n"),
      });
      setSuccess(null);
      setError(null);
      setUploadError(null);
      setFieldErrors({});
    }
  }, [service]);

  const handleClose = () => {
    setSuccess(null);
    setError(null);
    setFieldErrors({});
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service?.id) return;
    setSuccess(null);
    setError(null);
    setFieldErrors({});
    setLoading(true);
    try {
      const keyFeatures = form.keyFeaturesText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      const benefits = form.benefitsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      const whatYouGet = form.whatYouGetText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      const result = await onSubmit(service.id, {
        title: form.title,
        category: form.category,
        priceRange: form.priceRange,
        visible: form.visible,
        image: form.image || undefined,
        description: form.description || undefined,
        shortDescription: form.shortDescription || undefined,
        overview: form.overview || undefined,
        keyFeatures: keyFeatures.length ? keyFeatures : undefined,
        benefits: benefits.length ? benefits : undefined,
        whatYouGet: whatYouGet.length ? whatYouGet : undefined,
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
      setError("Unable to reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !service) return null;

  return (
    <div
      className="service-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-service-title"
      onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="service-modal" onClick={(e) => e.stopPropagation()}>
        <h2 id="edit-service-title" className="service-modal__title">
          Edit Service
        </h2>
        {success && (
          <div className="badge badge--success" role="status">
            {success}
          </div>
        )}
        {error && (
          <div className="badge badge--error" role="alert">
            {error}
          </div>
        )}
        <form className="service-modal__form" onSubmit={handleSubmit}>
          <div className="service-modal__field">
            <label
              className="service-modal__label"
              htmlFor="edit-service-title">
              Title
            </label>
            <input
              id="edit-service-title"
              type="text"
              className="service-modal__input"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="e.g. Software Development"
              autoFocus
              aria-invalid={!!fieldErrors.title}
              aria-describedby={
                fieldErrors.title ? "edit-service-title-err" : undefined
              }
            />
            {fieldErrors.title && (
              <span
                id="edit-service-title-err"
                className="service-modal__field-error">
                {fieldErrors.title}
              </span>
            )}
          </div>
          <div className="service-modal__field">
            <label
              className="service-modal__label"
              htmlFor="edit-service-category">
              Category
            </label>
            <input
              id="edit-service-category"
              type="text"
              className="service-modal__input"
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
              }
              placeholder="e.g. Technology"
            />
          </div>
          <div className="service-modal__field">
            <label
              className="service-modal__label"
              htmlFor="edit-service-price">
              Price Range
            </label>
            <input
              id="edit-service-price"
              type="text"
              className="service-modal__input"
              value={form.priceRange}
              onChange={(e) =>
                setForm((f) => ({ ...f, priceRange: e.target.value }))
              }
              placeholder="e.g. ₦500,000+"
            />
          </div>
          <div className="service-modal__field">
            <label className="service-modal__label">Image</label>
            <input
              ref={fileInputRef}
              type="file"
              accept={IMAGE_ACCEPT}
              className="service-modal__file-input"
              aria-label="Upload image"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setUploadError(null);
                setUploading(true);
                const result = await adminImageUpload(file);
                setUploading(false);
                if (result.success)
                  setForm((f) => ({ ...f, image: result.url }));
                else setUploadError(result.message);
                e.target.value = "";
              }}
            />
            <div
              className="service-modal__upload-zone"
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) =>
                e.key === "Enter" && fileInputRef.current?.click()
              }
              role="button"
              tabIndex={0}
              aria-label="Click to upload image">
              {form.image ? (
                <>
                  <img
                    src={getServiceImageUrl(form.image) ?? ""}
                    alt="Uploaded"
                    className="service-modal__upload-preview"
                  />
                  <span className="service-modal__upload-replace">
                    Replace image
                  </span>
                </>
              ) : (
                <span className="service-modal__upload-placeholder">
                  {uploading
                    ? "Uploading…"
                    : "Click or drop image (JPEG, PNG, GIF, WebP, etc.)"}
                </span>
              )}
            </div>
            {uploadError && (
              <span className="service-modal__field-error">{uploadError}</span>
            )}
          </div>
          <div className="service-modal__field">
            <label
              className="service-modal__label"
              htmlFor="edit-service-description">
              Short description (card)
            </label>
            <input
              id="edit-service-description"
              type="text"
              className="service-modal__input"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Brief text for the service card"
            />
          </div>
          <div className="service-modal__field">
            <label
              className="service-modal__label"
              htmlFor="edit-service-short-desc">
              Hero short description
            </label>
            <input
              id="edit-service-short-desc"
              type="text"
              className="service-modal__input"
              value={form.shortDescription}
              onChange={(e) =>
                setForm((f) => ({ ...f, shortDescription: e.target.value }))
              }
              placeholder="One line under the title on detail page"
            />
          </div>
          <div className="service-modal__field">
            <label
              className="service-modal__label"
              htmlFor="edit-service-overview">
              Overview (detail page)
            </label>
            <textarea
              id="edit-service-overview"
              className="service-modal__input"
              rows={3}
              value={form.overview}
              onChange={(e) =>
                setForm((f) => ({ ...f, overview: e.target.value }))
              }
              placeholder="Full overview text"
            />
          </div>
          <div className="service-modal__field">
            <label
              className="service-modal__label"
              htmlFor="edit-service-key-features">
              Key features (one per line)
            </label>
            <textarea
              id="edit-service-key-features"
              className="service-modal__input"
              rows={3}
              value={form.keyFeaturesText}
              onChange={(e) =>
                setForm((f) => ({ ...f, keyFeaturesText: e.target.value }))
              }
              placeholder="Feature one per line"
            />
          </div>
          <div className="service-modal__field">
            <label
              className="service-modal__label"
              htmlFor="edit-service-benefits">
              Benefits (one per line)
            </label>
            <textarea
              id="edit-service-benefits"
              className="service-modal__input"
              rows={3}
              value={form.benefitsText}
              onChange={(e) =>
                setForm((f) => ({ ...f, benefitsText: e.target.value }))
              }
              placeholder="Benefit one per line"
            />
          </div>
          <div className="service-modal__field">
            <label
              className="service-modal__label"
              htmlFor="edit-service-what-you-get">
              What you'll get (one per line)
            </label>
            <textarea
              id="edit-service-what-you-get"
              className="service-modal__input"
              rows={3}
              value={form.whatYouGetText}
              onChange={(e) =>
                setForm((f) => ({ ...f, whatYouGetText: e.target.value }))
              }
              placeholder="Deliverable one per line"
            />
          </div>
          <div className="service-modal__field service-modal__field--row">
            <span className="service-modal__label">Visible on main page</span>
            <button
              type="button"
              className={`service-modal__toggle ${form.visible ? "is-on" : ""}`}
              onClick={() => setForm((f) => ({ ...f, visible: !f.visible }))}
              aria-pressed={form.visible}
              aria-label={
                form.visible ? "Hide from main page" : "Show on main page"
              }>
              <span className="service-modal__toggle-thumb" />
            </button>
          </div>
          <div className="service-modal__actions">
            <button
              type="button"
              className="service-modal__btn service-modal__btn--cancel"
              onClick={handleClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="service-modal__btn service-modal__btn--create"
              disabled={loading}>
              {loading ? "Saving…" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
