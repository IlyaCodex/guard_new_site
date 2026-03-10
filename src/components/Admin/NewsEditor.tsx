"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  useEditor,
  EditorContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { Node, mergeAttributes } from "@tiptap/core";
import FileUploader from "./FileUploader";
import styles from "./NewsEditor.module.css";

/* ======================== */
/* Кастомные ноды редактора */
/* ======================== */

function ImageNode(props: any) {
  return (
    <NodeViewWrapper className={styles.imageNode}>
      <div className={styles.imageContainer}>
        <img src={props.node.attrs.src} alt="" className={styles.nodeImage} />
        <button
          type="button"
          onClick={() => {
            // Удаляем файл с сервера
            fetch("/api/upload/delete", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ url: props.node.attrs.src }),
            });
            props.deleteNode();
          }}
          className={styles.imageDeleteBtn}
          title="Удалить"
        >
          ✕
        </button>
      </div>
    </NodeViewWrapper>
  );
}

function GalleryNode(props: any) {
  const images: string[] = props.node.attrs.images || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const removeImage = (index: number) => {
    const removedUrl = images[index];
    // Удаляем файл с сервера
    fetch("/api/upload/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: removedUrl }),
    });

    const newImages = images.filter((_: string, i: number) => i !== index);
    if (newImages.length === 0) {
      props.deleteNode();
    } else {
      props.updateAttributes({ images: newImages });
      if (currentIndex >= newImages.length)
        setCurrentIndex(newImages.length - 1);
    }
  };

  const addImagesToGallery = (urls: string[]) => {
    props.updateAttributes({ images: [...images, ...urls] });
  };

  return (
    <NodeViewWrapper className={styles.galleryNode}>
      <div className={styles.galleryEditor}>
        <div className={styles.galleryHeader}>
          <span>📷 Галерея ({images.length} фото)</span>
          <button
            type="button"
            onClick={() => props.deleteNode()}
            className={styles.galleryDeleteBtn}
          >
            Удалить галерею
          </button>
        </div>

        {images.length > 0 && (
          <div className={styles.gallerySlider}>
            <button
              type="button"
              className={styles.galleryArrow}
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
            >
              ‹
            </button>
            <div className={styles.galleryImageWrap}>
              <img src={images[currentIndex]} alt="" />
              <button
                type="button"
                onClick={() => removeImage(currentIndex)}
                className={styles.galleryImgDelete}
              >
                ✕ Удалить это фото
              </button>
              <span className={styles.galleryCounter}>
                {currentIndex + 1} / {images.length}
              </span>
            </div>
            <button
              type="button"
              className={styles.galleryArrow}
              onClick={() =>
                setCurrentIndex(Math.min(images.length - 1, currentIndex + 1))
              }
              disabled={currentIndex === images.length - 1}
            >
              ›
            </button>
          </div>
        )}

        {images.length > 1 && (
          <div className={styles.galleryThumbs}>
            {images.map((img: string, i: number) => (
              <div
                key={i}
                className={`${styles.galleryThumb} ${i === currentIndex ? styles.galleryThumbActive : ""}`}
                onClick={() => setCurrentIndex(i)}
              >
                <img src={img} alt="" />
              </div>
            ))}
          </div>
        )}

        <div className={styles.galleryUpload}>
          <FileUploader
            onUpload={addImagesToGallery}
            multiple
            folder="news/gallery"
            label="Добавить фото в галерею"
            hint="Можно выбрать несколько файлов"
          />
        </div>
      </div>
    </NodeViewWrapper>
  );
}

const CustomImage = TiptapImage.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ImageNode);
  },
});

const Gallery = Node.create({
  name: "gallery",
  group: "block",
  atom: true,
  addAttributes() {
    return { images: { default: [] } };
  },
  parseHTML() {
    return [{ tag: "div[data-gallery]" }];
  },
  renderHTML({ HTMLAttributes }) {
    const images = HTMLAttributes.images || [];
    return [
      "div",
      mergeAttributes({ "data-gallery": "", class: "article-gallery" }),
      ...images.map((src: string) => ["img", { src, class: "gallery-img" }]),
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(GalleryNode);
  },
});

/* ======================== */
/* Основной компонент       */
/* ======================== */

interface NewsEditorProps {
  news?: any;
  onClose: () => void;
  onSave?: () => void;
}

export default function NewsEditor({ news, onClose, onSave }: NewsEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Диалоги
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showGalleryUpload, setShowGalleryUpload] = useState(false);

  // SEO
  const [seo, setSeo] = useState({
    metaTitle: news?.metaTitle || "",
    metaDescription: news?.metaDescription || "",
    slug: news?.slug || "",
  });

  // Контент
  const [content, setContent] = useState({
    title: news?.title || "",
    excerpt: news?.excerpt || "",
    image: news?.image || "",
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Placeholder.configure({ placeholder: "Введите текст новости..." }),
      Underline,
      TiptapLink.configure({
        openOnClick: false,
        HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" },
      }),
      CustomImage,
      Gallery,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: news?.content || "",
    editorProps: { attributes: { class: styles.editorArea } },
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[а-яё]/g, (m) => {
        const ru = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
        const en = [
          "a",
          "b",
          "v",
          "g",
          "d",
          "e",
          "yo",
          "zh",
          "z",
          "i",
          "y",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "r",
          "s",
          "t",
          "u",
          "f",
          "h",
          "ts",
          "ch",
          "sh",
          "sch",
          "",
          "y",
          "",
          "e",
          "yu",
          "ya",
        ];
        return en[ru.indexOf(m)] || m;
      })
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handlePublish = async () => {
    if (!editor) return;
    if (!content.title.trim()) {
      alert("Введите заголовок новости");
      return;
    }

    setLoading(true);
    try {
      const url = news ? `/api/admin/news/${news.id}` : "/api/admin/news";
      const method = news ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: content.title,
          slug: seo.slug || generateSlug(content.title),
          excerpt: content.excerpt || content.title,
          image: content.image || null,
          metaTitle: seo.metaTitle || content.title,
          metaDescription:
            seo.metaDescription || content.excerpt || content.title,
          content: editor.getHTML(),
          published: true,
          publishedAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        if (onSave) onSave();
        router.refresh();
        onClose();
      } else {
        const error = await res.json();
        alert("Ошибка: " + (error.error || "Не удалось сохранить"));
      }
    } catch {
      alert("Ошибка при сохранении");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!news) {
      onClose();
      return;
    }
    if (!confirm("Удалить эту новость?")) return;
    try {
      // Удаляем обложку с сервера
      if (news.image) {
        await fetch("/api/upload/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: news.image }),
        });
      }
      const res = await fetch(`/api/admin/news/${news.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (onSave) onSave();
        router.refresh();
        onClose();
      }
    } catch {
      alert("Ошибка при удалении");
    }
  };

  const addLink = () => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href;
    const url = window.prompt("URL ссылки:", prev);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  // Вставка изображения из загрузчика
  const handleImageUploaded = (urls: string[]) => {
    if (urls[0] && editor) {
      editor.chain().focus().setImage({ src: urls[0] }).run();
      setShowImageUpload(false);
    }
  };

  // Вставка галереи из загрузчика
  const handleGalleryUploaded = (urls: string[]) => {
    if (urls.length > 0 && editor) {
      editor
        .chain()
        .focus()
        .insertContent({ type: "gallery", attrs: { images: urls } })
        .run();
      setShowGalleryUpload(false);
    }
  };

  // Обложка загружена
  const handleCoverUploaded = (urls: string[]) => {
    if (urls[0]) {
      setContent({ ...content, image: urls[0] });
    }
  };

  // Удалить обложку
  const handleCoverRemove = async () => {
    if (content.image) {
      await fetch("/api/upload/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: content.image }),
      });
    }
    setContent({ ...content, image: "" });
  };

  if (!editor) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.loadingText}>Загрузка редактора...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button onClick={onClose} className={styles.backBtn}>
          ← Назад к списку
        </button>

        {/* =============== */}
        {/* 1. SEO БЛОК     */}
        {/* =============== */}
        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <h2 className={styles.blockTitle}>🔍 Настройка SEO</h2>
            <span className={styles.blockHint}>Для поисковых систем</span>
          </div>

          <div className={styles.field}>
            <label>Meta Title</label>
            <input
              type="text"
              value={seo.metaTitle}
              onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
              placeholder="Заголовок для поисковиков"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label>Meta Description</label>
            <textarea
              value={seo.metaDescription}
              onChange={(e) =>
                setSeo({ ...seo, metaDescription: e.target.value })
              }
              placeholder="Описание для поисковиков"
              className={styles.input}
              rows={3}
            />
          </div>

          <div className={styles.field}>
            <label>Slug (URL)</label>
            <div className={styles.slugRow}>
              <span className={styles.slugPrefix}>/news/</span>
              <input
                type="text"
                value={seo.slug}
                onChange={(e) => setSeo({ ...seo, slug: e.target.value })}
                placeholder="auto-generate"
                className={styles.slugInput}
              />
            </div>
          </div>

          <div className={styles.seoPreview}>
            <p className={styles.seoPreviewTitle}>
              {seo.metaTitle || content.title || "Заголовок"} | Guard Tunnel VPN
            </p>
            <p className={styles.seoPreviewUrl}>
              guardtunnel.com/news/
              {seo.slug || generateSlug(content.title || "slug")}
            </p>
            <p className={styles.seoPreviewDesc}>
              {seo.metaDescription || content.excerpt || "Описание страницы..."}
            </p>
          </div>
        </div>

        {/* =============== */}
        {/* 2. КОНТЕНТ БЛОК */}
        {/* =============== */}
        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <h2 className={styles.blockTitle}>📝 Контент новости</h2>
            <span className={styles.blockHint}>Отображается на сайте</span>
          </div>

          <div className={styles.field}>
            <label>Заголовок новости *</label>
            <input
              type="text"
              value={content.title}
              onChange={(e) =>
                setContent({ ...content, title: e.target.value })
              }
              placeholder="Заголовок который увидят пользователи"
              className={`${styles.input} ${styles.inputTitle}`}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Описание для карточки</label>
            <textarea
              value={content.excerpt}
              onChange={(e) =>
                setContent({ ...content, excerpt: e.target.value })
              }
              placeholder="Краткое описание (2-3 предложения)"
              className={styles.input}
              rows={3}
            />
          </div>

          {/* Обложка через загрузку */}
          <div className={styles.field}>
            <label>Обложка новости</label>
            {content.image ? (
              <div className={styles.coverPreview}>
                <img src={content.image} alt="Обложка" />
                <div className={styles.coverActions}>
                  <button
                    type="button"
                    onClick={() => setContent({ ...content, image: "" })}
                    className={styles.coverChangeBtn}
                  >
                    Заменить
                  </button>
                  <button
                    type="button"
                    onClick={handleCoverRemove}
                    className={styles.coverRemoveBtn}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ) : (
              <FileUploader
                onUpload={handleCoverUploaded}
                folder="news/covers"
                label="Загрузить обложку"
                hint="Рекомендуемый размер: 1200×600, JPG или PNG до 10MB"
              />
            )}
          </div>

          {/* Тулбар */}
          <div className={styles.field}>
            <label>Текст статьи</label>
            <div className={styles.toolbar}>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`${styles.toolBtn} ${editor.isActive("bold") ? styles.toolActive : ""}`}
                title="Жирный"
              >
                <strong>B</strong>
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`${styles.toolBtn} ${editor.isActive("italic") ? styles.toolActive : ""}`}
                title="Курсив"
              >
                <em>I</em>
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`${styles.toolBtn} ${editor.isActive("underline") ? styles.toolActive : ""}`}
                title="Подчеркнутый"
              >
                <u>U</u>
              </button>
              <div className={styles.sep}></div>
              <button
                type="button"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={`${styles.toolBtn} ${editor.isActive("heading", { level: 2 }) ? styles.toolActive : ""}`}
              >
                H2
              </button>
              <button
                type="button"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={`${styles.toolBtn} ${editor.isActive("heading", { level: 3 }) ? styles.toolActive : ""}`}
              >
                H3
              </button>
              <div className={styles.sep}></div>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`${styles.toolBtn} ${editor.isActive("bulletList") ? styles.toolActive : ""}`}
                title="Маркированный список"
              >
                •
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`${styles.toolBtn} ${editor.isActive("orderedList") ? styles.toolActive : ""}`}
                title="Нумерованный список"
              >
                1.
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`${styles.toolBtn} ${editor.isActive("blockquote") ? styles.toolActive : ""}`}
                title="Цитата"
              >
                ❝
              </button>
              <div className={styles.sep}></div>
              <button
                type="button"
                onClick={addLink}
                className={`${styles.toolBtn} ${editor.isActive("link") ? styles.toolActive : ""}`}
                title="Ссылка"
              >
                🔗
              </button>
              <button
                type="button"
                onClick={() => setShowImageUpload(true)}
                className={styles.toolBtn}
                title="Вставить фото"
              >
                🖼
              </button>
              <button
                type="button"
                onClick={() => setShowGalleryUpload(true)}
                className={styles.toolBtn}
                title="Вставить галерею"
              >
                🎞
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className={styles.toolBtn}
                title="Разделитель"
              >
                ―
              </button>
              <div className={styles.sep}></div>
              <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className={styles.toolBtn}
              >
                ↶
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className={styles.toolBtn}
              >
                ↷
              </button>
            </div>

            <div className={styles.editorWrapper}>
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>

        {/* =============== */}
        {/* 3. КНОПКИ       */}
        {/* =============== */}
        <div className={styles.actions}>
          <button
            onClick={handlePublish}
            disabled={loading}
            className={styles.publishBtn}
          >
            {loading ? "Сохранение..." : news ? "Обновить" : "Опубликовать"}
          </button>
          <button onClick={handleDelete} className={styles.deleteBtn}>
            {news ? "Удалить" : "Отмена"}
          </button>
        </div>
      </div>

      {/* Диалог загрузки одного изображения */}
      {showImageUpload && (
        <div
          className={styles.overlay}
          onClick={() => setShowImageUpload(false)}
        >
          <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <h3>Вставить изображение</h3>
            <FileUploader
              onUpload={handleImageUploaded}
              folder="news/content"
              label="Загрузить фото"
              hint="JPG, PNG, WebP, GIF до 10MB"
            />
            <div className={styles.dialogBtns}>
              <button
                onClick={() => setShowImageUpload(false)}
                className={styles.dialogCancel}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Диалог загрузки галереи */}
      {showGalleryUpload && (
        <div
          className={styles.overlay}
          onClick={() => setShowGalleryUpload(false)}
        >
          <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <h3>Создать галерею</h3>
            <p className={styles.dialogHint}>
              Выберите несколько фотографий для слайдера
            </p>
            <FileUploader
              onUpload={handleGalleryUploaded}
              multiple
              maxFiles={20}
              folder="news/gallery"
              label="Загрузить фото для галереи"
              hint="Можно выбрать до 20 файлов"
            />
            <div className={styles.dialogBtns}>
              <button
                onClick={() => setShowGalleryUpload(false)}
                className={styles.dialogCancel}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
