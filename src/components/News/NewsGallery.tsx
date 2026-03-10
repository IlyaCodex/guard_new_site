"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./NewsGallery.module.css";

interface NewsGalleryProps {
  images: string[];
}

export default function NewsGallery({ images }: NewsGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const goPrev = () => setLightboxIndex(Math.max(0, lightboxIndex - 1));
  const goNext = () =>
    setLightboxIndex(Math.min(images.length - 1, lightboxIndex + 1));

  // Обработка клавиш
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  };

  if (images.length === 1) {
    return (
      <div className={styles.single}>
        <img
          src={images[0]}
          alt=""
          className={styles.singleImage}
          onClick={() => openLightbox(0)}
        />
        {lightboxOpen && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
    );
  }

  return (
    <>
      <div className={styles.gallery}>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          className={styles.swiper}
        >
          {images.map((src, i) => (
            <SwiperSlide key={i}>
              <div className={styles.slide} onClick={() => openLightbox(i)}>
                <img src={src} alt={`Фото ${i + 1}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.galleryCounter}>
          {images.length} фото — нажмите для увеличения
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
          onKeyDown={handleKeyDown}
        />
      )}
    </>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
  onKeyDown,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}) {
  return (
    <div
      className={styles.lightbox}
      onClick={onClose}
      onKeyDown={onKeyDown}
      tabIndex={0}
      ref={(el) => el?.focus()}
    >
      <button className={styles.lbClose} onClick={onClose}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {images.length > 1 && (
        <button
          className={`${styles.lbArrow} ${styles.lbPrev}`}
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          disabled={index === 0}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      <div className={styles.lbContent} onClick={(e) => e.stopPropagation()}>
        <img src={images[index]} alt="" />
      </div>

      {images.length > 1 && (
        <button
          className={`${styles.lbArrow} ${styles.lbNext}`}
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          disabled={index === images.length - 1}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {images.length > 1 && (
        <div className={styles.lbCounter}>
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
