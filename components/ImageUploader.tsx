'use client';

// components/ImageUploader.tsx
// Reusable drag-and-drop / click-to-upload image component.
// Pass `onUpload(url)` to receive the uploaded image URL.

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  currentImage?: string;
  onUpload: (url: string) => void;
  onRemove?: () => void;
  aspectRatio?: string;          // CSS aspect-ratio value, e.g. '3/4', '16/10', '4/3'
  placeholder?: React.ReactNode; // Custom placeholder content
  className?: string;
  alt?: string;
  disabled?: boolean;
}

export default function ImageUploader({
  currentImage,
  onUpload,
  onRemove,
  aspectRatio = '4/3',
  placeholder,
  className = '',
  alt = 'Uploaded image',
  disabled = false,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    async (file: File) => {
      if (disabled) return;
      setError('');
      setUploading(true);
      try {
        const form = new FormData();
        form.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: form });
        const data = await res.json();
        if (!data.success) throw new Error(data.error ?? 'Upload failed');
        onUpload(data.url as string);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Upload failed');
      } finally {
        setUploading(false);
      }
    },
    [onUpload, disabled]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
    // reset so same file can be re-selected
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  };

  return (
    <div
      className={`img-uploader ${className} ${dragging && !disabled ? 'img-uploader--drag' : ''}`}
      style={{ aspectRatio, position: 'relative', overflow: 'hidden', cursor: disabled ? 'default' : 'pointer' }}
      onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      {/* Existing image */}
      {currentImage && (
        <Image
          src={currentImage}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw"
        />
      )}

      {/* Remove image overlay button */}
      {currentImage && onRemove && !disabled && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            zIndex: 10,
            background: 'rgba(239, 68, 68, 0.85)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            padding: '4px 8px',
            fontSize: '0.65rem',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Remove Image
        </button>
      )}

      {/* Placeholder if no image */}
      {!currentImage && (
        <div className="img-uploader__placeholder">
          {placeholder ?? (
            <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
              <circle cx="17" cy="20" r="4" stroke="currentColor" strokeWidth="2" />
              <path d="M4 32l10-8 8 6 8-10 14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      )}

      {/* Upload overlay — always available on hover/focus */}
      {!disabled && (
        <div className="img-uploader__overlay" aria-hidden="true">
          {uploading ? (
            <div className="img-uploader__spinner" />
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{currentImage ? 'Change photo' : 'Upload photo'}</span>
              <small>Click or drag & drop · JPG, PNG, WebP · Max 10MB</small>
            </>
          )}
        </div>
      )}

      {/* Hidden file input */}
      {!disabled && (
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/avif"
          className="img-uploader__input"
          aria-label="Upload image"
          onChange={handleFileChange}
          tabIndex={0}
        />
      )}

      {/* Error toast */}
      {error && (
        <div className="img-uploader__error" role="alert">
          {error}
          <button onClick={() => setError('')} aria-label="Dismiss error">×</button>
        </div>
      )}
    </div>
  );
}
