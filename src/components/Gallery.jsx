// src/components/Gallery.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const translations = {
  en: {
    title: "Our Gallery",
    uploadLabel: "Add Image",
    promptTitle: "Enter image title:",
    noImages: "No images yet",
    deleteConfirm: "Do you want to delete this image?",
    deleteBtn: "Delete",
  },
  uz: {
    title: "Bizning Galereya",
    uploadLabel: "Rasm qo‘shish",
    promptTitle: "Rasm sarlavhasini kiriting:",
    noImages: "Hozircha rasm yo‘q",
    deleteConfirm: "Rasmni o‘chirmoqchimisiz?",
    deleteBtn: "O‘chirish",
  },
  ru: {
    title: "Наша Галерея",
    uploadLabel: "Добавить изображение",
    promptTitle: "Введите название изображения:",
    noImages: "Пока нет изображений",
    deleteConfirm: "Вы хотите удалить это изображение?",
    deleteBtn: "Удалить",
  },
  kr: {
    title: "갤러리",
    uploadLabel: "이미지 추가",
    promptTitle: "이미지 제목을 입력하세요:",
    noImages: "아직 이미지가 없습니다",
    deleteConfirm: "이 이미지를 삭제하시겠습니까?",
    deleteBtn: "삭제",
  },
};

export default function Gallery({ darkMode, adminLogged, lang = "en" }) {
  const [images, setImages] = useState([]);
  const t = translations[lang];

  // Rasmlarni localStorage dan yuklash
  useEffect(() => {
    const savedImages = localStorage.getItem("galleryImages");
    if (savedImages) setImages(JSON.parse(savedImages));
  }, []);

  // Rasmlarni localStorage ga saqlash
  const saveImages = (imgs) => {
    setImages(imgs);
    localStorage.setItem("galleryImages", JSON.stringify(imgs));
  };

  // Rasm qo‘shish
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const title = prompt(t.promptTitle);
    if (!title) return;

    const newImage = {
      id: Date.now(),
      url: URL.createObjectURL(file),
      title,
    };
    saveImages([...images, newImage]);
  };

  // Rasm o‘chirish (faqat admin)
  const handleDelete = (id) => {
    if (!adminLogged) return;
    if (window.confirm(t.deleteConfirm)) {
      saveImages(images.filter((img) => img.id !== id));
    }
  };

  return (
    <section
      id="gallery"
      className={`relative py-20 px-6 transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-yellow-50 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-10">
          {t.title}
        </h2>

        {/* Admin upload */}
        {adminLogged && (
          <div className="mb-8 text-center">
            <label className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer transition">
              {t.uploadLabel}
              <input
                type="file"
                onChange={handleUpload}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
        )}

        {/* Rasmlar grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          layout
        >
          {images.length === 0 && (
            <p className="text-center col-span-full text-gray-400">{t.noImages}</p>
          )}

          {images.map((img) => (
            <motion.div
              key={img.id}
              className="relative overflow-hidden rounded-xl shadow-lg group"
              whileHover={{ scale: 1.03 }}
              layout
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white p-2 flex justify-between items-center gap-2">
                <span className="truncate max-w-[75%]" title={img.title}>
                  {img.title}
                </span>
                {adminLogged && (
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="flex-shrink-0 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm transition"
                  >
                    {t.deleteBtn}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
