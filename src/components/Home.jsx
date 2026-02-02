// src/components/Home.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const translations = {
  en: { title: "Korean Center", quote: "Language is the most beautiful door to the human heart ✨", button: "Get Started 🚀" },
  uz: { title: "Korean Center", quote: "Til — inson qalbiga ochiladigan eng go‘zal eshikdir ✨", button: "Boshlash 🚀" },
  ru: { title: "Korean Center", quote: "Язык — это самый красивый ключ к человеческому сердцу ✨", button: "Начать 🚀" },
  kr: { title: "Korean Center", quote: "언어는 인간의 마음에 열리는 가장 아름다운 문입니다 ✨", button: "시작 🚀" },
};

export default function Home({ darkMode = false, lang = "en", adminLogged = false }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [adminModal, setAdminModal] = useState(false);

  const defaultImages = ["/photo_1.png", "/photo_2.png", "/photo_3.png", "/photo_4.png"];
  const [images, setImages] = useState(defaultImages);

  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % images.length), 4500);
    return () => clearInterval(t);
  }, [images.length]);

  const goRegister = () => navigate("/register");

  return (
    <section
      id="home"
      className={`relative w-full min-h-screen overflow-hidden ${
        darkMode
          ? "bg-black text-white"
          : "bg-gradient-to-tr from-gray-100 via-gray-200 to-gray-300 text-gray-900"
      }`}
    >
      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* TEXT */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {translations[lang].title}
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-2xl font-semibold max-w-md mx-auto md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {translations[lang].quote}
          </motion.p>

          <motion.button
            onClick={goRegister}
            className="mt-4 px-6 sm:px-8 py-3 text-base sm:text-lg font-bold rounded-full text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:scale-105 transition"
            whileHover={{ scale: 1.05 }}
          >
            {translations[lang].button}
          </motion.button>
        </div>

        {/* CAROUSEL */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="w-[260px] sm:w-[300px] md:w-[360px] h-[200px] sm:h-[240px] md:h-[300px] relative overflow-hidden rounded-2xl shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={images[index]}
                alt="slide"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            </AnimatePresence>
          </div>

          {adminLogged && (
            <button
              onClick={() => setAdminModal(true)}
              className="absolute -bottom-10 px-3 py-1 bg-blue-600 text-white rounded"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* ADMIN MODAL */}
      {adminModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4" onClick={() => setAdminModal(false)}>
          <div
            className="bg-white dark:bg-slate-900 w-full max-w-lg p-4 rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-3">Carousel Images</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {images.map((img, i) => (
                <img key={i} src={img} alt="" className="w-full h-24 object-cover rounded" />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
