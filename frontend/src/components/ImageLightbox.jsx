import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function ImageLightbox({ image, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = event => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt ? `Image preview: ${image.alt}` : 'Image preview'}
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        className="image-lightbox-close"
        type="button"
        aria-label="Close image preview"
        onClick={onClose}
      >
        <X size={25} />
      </button>
      <img
        className="image-lightbox-image"
        src={image.src}
        alt={image.alt}
        onClick={event => event.stopPropagation()}
      />
    </div>
  );
}
