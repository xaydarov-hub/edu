// src/components/Gallery.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* 🌍 TRANSLATIONS */
const translations = {
  en: { title: "Gallery", more: "Show More", less: "Show Less" },
  uz: { title: "Galereya", more: "Yana ko‘rsatish", less: "Kamroq" },
  ru: { title: "Галерея", more: "Показать ещё", less: "Скрыть" },
  kr: { title: "갤러리", more: "더 보기", less: "접기" },
};

/* 📂 AUTO LOAD */
const imageModules = import.meta.glob("/public/gallery/*.{jpg,jpeg,png,webp}", {
  eager: true,
});

const allImages = Object.values(imageModules)
  .map((img, i) => ({ id: i, src: img.default }))
  .reverse();

export default function Gallery({ darkMode, lang = "en" }) {
  const t = translations[lang];
  const [showAll, setShowAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const images = showAll ? allImages : allImages.slice(0, 8);

  /* ⌨️ KEYBOARD */
  useEffect(() => {
    const handleKey = (e) => {
      if (activeIndex === null) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  const next = () =>
    setActiveIndex((i) => (i + 1) % allImages.length);
  const prev = () =>
    setActiveIndex((i) =>
      i === 0 ? allImages.length - 1 : i - 1
    );

  return (
    <>
      {/* 🖼️ GALLERY */}
      <section
        id="gallery"
        className={`relative py-32 px-6 overflow-hidden ${
          darkMode
            ? "bg-gradient-to-b from-black via-gray-900 to-black text-white"
            : "bg-gradient-to-b from-white via-pink-50 to-white text-gray-900"
        }`}
      >
        {/* 🌌 BACKGROUND SHAPES */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-5xl md:text-6xl font-black mb-24"
          >
            {t.title}
          </motion.h2>

          {/* GRID */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-8 space-y-8">
            {images.map((img, i) => (
              <motion.div
                key={img.id}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={() => setActiveIndex(i)}
                className="cursor-pointer break-inside-avoid rounded-3xl overflow-hidden
                shadow-xl bg-white"
              >
                <img
                  src={img.src}
                  alt="Gallery"
                  className="w-full object-cover"
                />
              </motion.div>
            ))}
          </div>

          {/* LOAD MORE */}
          {allImages.length > 8 && (
            <div className="mt-24 flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-12 py-4 rounded-full text-lg font-semibold
                bg-gradient-to-r from-pink-500 to-purple-500
                text-white hover:scale-105 transition"
              >
                {showAll ? t.less : t.more}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 🎬 MODAL */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center
            bg-black/80"
          >
            {/* PREV */}
            <button
              onClick={prev}
              className="absolute left-6 text-white text-5xl select-none"
            >
              ‹
            </button>

            {/* IMAGE */}
            <motion.img
              key={activeIndex}
              src={allImages[activeIndex].src}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -100) next();
                if (info.offset.x > 100) prev();
              }}
              className="max-w-[90%] max-h-[90%] rounded-3xl"
            />

            {/* NEXT */}
            <button
              onClick={next}
              className="absolute right-6 text-white text-5xl select-none"
            >
              ›
            </button>

            {/* CLOSE */}
            <button
              onClick={() => setActiveIndex(null)}
              className="absolute top-6 right-6 text-white text-3xl"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
