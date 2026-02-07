// src/components/Gallery.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* 🌍 TRANSLATIONS */
const translations = {
  en: { title: "Gallery", more: "Show More", less: "Show Less" },
  uz: { title: "Galereya", more: "Yana ko‘rsatish", less: "Kamroq" },
  ru: { title: "Галерея", more: "Показать ещё", less: "Скрыть" },
  kr: { title: "갤러리", more: "더 보기", less: "접기" },
};

/* 📂 AUTO LOAD (new images appear FIRST) */
const imageModules = import.meta.glob("/public/gallery/*.{jpg,jpeg,png,webp}", {
  eager: true,
});

const allImages = Object.values(imageModules)
  .map((img, i) => ({ id: i, src: img.default }))
  .reverse(); // 🔥 newest first

export default function Gallery({ darkMode, lang = "en" }) {
  const t = translations[lang];
  const [showAll, setShowAll] = useState(false);
  const [activeImg, setActiveImg] = useState(null);

  const images = showAll ? allImages : allImages.slice(0, 8);

  return (
    <>
      {/* 🖼️ GALLERY */}
      <section
        id="gallery"
        className={`relative py-32 px-6 overflow-hidden ${
          darkMode
            ? "bg-gradient-to-b from-black via-gray-900 to-black text-white"
            : "bg-gradient-to-b from-yellow-50 via-white to-pink-50 text-gray-900"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-5xl md:text-6xl font-black mb-24"
          >
            {t.title}
          </motion.h2>

          {/* GRID */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-10 space-y-10">
            {images.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.06 }}
                onClick={() => setActiveImg(img.src)}
                className="relative cursor-pointer break-inside-avoid rounded-[2.5rem]
                overflow-hidden group
                backdrop-blur-xl
                bg-white/10
                shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
              >
                {/* Glow Frame */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition
                  ${
                    darkMode
                      ? "bg-gradient-to-tr from-purple-500/40 via-pink-500/30 to-cyan-400/30"
                      : "bg-gradient-to-tr from-yellow-300/40 via-pink-300/30 to-purple-300/30"
                  }`}
                />

                <img
                  src={img.src}
                  alt="Gallery"
                  className="relative z-10 w-full object-cover transition duration-700 group-hover:scale-110"
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
                bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                text-white shadow-2xl hover:scale-105 transition"
              >
                {showAll ? t.less : t.more}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 🎬 MODAL */}
      <AnimatePresence>
        {activeImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImg(null)}
            className="fixed inset-0 z-[999] flex items-center justify-center
            bg-black/70 backdrop-blur-xl"
          >
            <motion.img
              src={activeImg}
              initial={{ scale: 0.7, rotate: -4 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              className={`max-w-[90%] max-h-[90%] rounded-[3rem]
              shadow-[0_0_120px_rgba(255,255,255,0.25)]
              ${
                darkMode
                  ? "ring-4 ring-purple-500/40"
                  : "ring-4 ring-pink-400/40"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
