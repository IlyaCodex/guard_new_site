"use client";

import { useState, useRef, useCallback } from "react";
import styles from "./FileUploader.module.css";

interface FileUploaderProps {
  onUpload: (urls: string[]) => void;
  multiple?: boolean;
  accept?: string;
  folder?: string;
  maxFiles?: number;
  label?: string;
  hint?: string;
}

export default function FileUploader({
  onUpload,
  multiple = false,
  accept = "image/*",
  folder = "uploads",
  maxFiles = 10,
  label = "Загрузить файл",
  hint = "JPG, PNG, WebP, GIF до 10MB",
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).slice(0, maxFiles);
    if (fileArray.length === 0) return;

    setUploading(true);
    setError("");
    setProgress(0);

    try {
      const formData = new FormData();
      fileArray.forEach((file) => formData.append("files", file));
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ошибка загрузки");
        return;
      }

      setProgress(100);
      onUpload(data.urls);
    } catch (err) {
      setError("Ошибка соединения с сервером");
    } finally {
      setTimeout(() => {
        setUploading(false);
        setProgress(0);
      }, 500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadFiles(e.target.files);
      e.target.value = "";
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      uploadFiles(e.dataTransfer.files);
    }
  }, []);

  return (
    <div className={styles.uploader}>
      <div
        className={`${styles.dropzone} ${dragActive ? styles.dropzoneActive : ""} ${uploading ? styles.dropzoneUploading : ""}`}
        onClick={() => !uploading && inputRef.current?.click()}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className={styles.hiddenInput}
          disabled={uploading}
        />

        {uploading ? (
          <div className={styles.uploading}>
            <div className={styles.spinner}></div>
            <span>Загрузка...</span>
            {progress > 0 && (
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.dropContent}>
            <div className={styles.dropIcon}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <span className={styles.dropLabel}>{label}</span>
            <span className={styles.dropHint}>
              Перетащите или нажмите для выбора
            </span>
            <span className={styles.dropFormat}>{hint}</span>
          </div>
        )}
      </div>

      {error && (
        <div className={styles.error}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}
