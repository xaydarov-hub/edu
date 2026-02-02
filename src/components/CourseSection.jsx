// src/components/CourseSection.jsx
import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, Clock, Award, Edit2, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const translations = {
  en: {
    heading: "Our Korean Language Course",
    description:
      "Start your Korean learning journey here. Interactive lessons and practical exercises will take you from zero to mastery.",
    features: [
      "Interactive lessons",
      "3 sessions per week",
      "Topic preparation",
      "Practical conversations",
    ],
    button: "🚀 Enroll Now",
    duration: "12-Month Program",
    adminModalTitle: "Manage Course Videos",
    close: "Close",
    addVideo: "Add Video",
  },

  uz: {
    heading: "Bizning Koreys Tili Kursimiz",
    description:
      "Sizning koreys tilini o‘rganish sayohatingiz shu yerdan boshlanadi. Interaktiv darslar va amaliy mashg‘ulotlar bilan 0 dan mukammal darajaga erishing.",
    features: [
      "Interaktiv darslar",
      "Haftasiga 3 marotaba",
      "Topic uchun tayyorlov",
      "Amaliy suhbatlar",
    ],
    button: "🚀 Kursga yozilish",
    duration: "12 oylik dastur",
    adminModalTitle: "Kurs videolarini boshqarish",
    close: "Yopish",
    addVideo: "Video qo‘shish",
  },

  ru: {
    heading: "Наш курс корейского языка",
    description:
      "Начните изучение корейского языка здесь. Интерактивные уроки и практические задания приведут вас от нуля к совершенству.",
    features: [
      "Интерактивные уроки",
      "3 занятия в неделю",
      "Подготовка по темам",
      "Практические диалоги",
    ],
    button: "🚀 Записаться на курс",
    duration: "12-месячная программа",
    adminModalTitle: "Управление видео курса",
    close: "Закрыть",
    addVideo: "Добавить видео",
  },

  kr: {
    heading: "한국어 과정 소개",
    description:
      "이곳에서 한국어 학습을 시작하세요. 인터랙티브 수업과 실습을 통해 초보자부터 완성 단계까지 도와드립니다.",
    features: [
      "인터랙티브 수업",
      "주 3회 수업",
      "주제별 준비",
      "실전 회화 연습",
    ],
    button: "🚀 수강 신청",
    duration: "12개월 과정",
    adminModalTitle: "강의 영상 관리",
    close: "닫기",
    addVideo: "영상 추가",
  },
};

export default function CourseSection({ darkMode = false, lang = "en", adminLogged = false }) {
  const navigate = useNavigate();
  const t = translations[lang] || translations.en;

  const featuresIcons = [
    <BookOpen className="w-6 h-6 text-indigo-400" />,
    <Clock className="w-6 h-6 text-pink-400" />,
    <Award className="w-6 h-6 text-yellow-300" />,
    <CheckCircle2 className="w-6 h-6 text-green-400" />,
  ];

  const defaultVideos = ["/courses.mov"];
  const [videos, setVideos] = useState(() => {
    const stored = localStorage.getItem("courseVideos");
    return stored ? JSON.parse(stored) : defaultVideos;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  const [adminModal, setAdminModal] = useState(false);

  useEffect(() => { localStorage.setItem("courseVideos", JSON.stringify(videos)); }, [videos]);

  useEffect(() => {
    if (videos.length <= 1) return;
    const interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % videos.length), 5000);
    return () => clearInterval(interval);
  }, [videos]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 50 * 1024 * 1024) { alert("Video 50MB dan katta bo‘lmasligi kerak!"); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setVideos((prev) => [...prev, ev.target.result]);
    reader.readAsDataURL(file);
    e.target.value = null;
  };

  const handleVideoDelete = (idx) => {
    setVideos((prev) => prev.filter((_, i) => i !== idx));
    setCurrentIndex(0);
  };

  return (
    <section
      id="courses"
      className={`relative py-20 min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white"
          : "bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-200 text-gray-900"
      }`}
    >
      <div className="relative container mx-auto px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
            {t.heading}
          </h2>

          <p className="mt-4 md:mt-6 text-base md:text-lg max-w-xl">{t.description}</p>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
            {t.features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 p-3 md:p-4 rounded-xl">
                {featuresIcons[i]}
                <span className="text-sm md:text-base">{f}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/register")}
            className="mt-6 md:mt-8 px-8 md:px-10 py-3 md:py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-sm md:text-lg"
          >
            {t.button}
          </button>
        </motion.div>

        {/* VIDEO */}
        <div className="relative flex-1 w-full rounded-3xl overflow-hidden border border-gray-300 dark:border-gray-700">
          <video
            ref={videoRef}
            src={videos[currentIndex]}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-64 sm:h-80 md:h-[420px] object-cover"
          />
          <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-black/50 px-3 py-1 md:px-4 md:py-2 rounded text-xs md:text-sm text-white font-medium">
            {t.duration}
          </div>

          {adminLogged && (
            <button
              onClick={() => setAdminModal(true)}
              className="absolute bottom-3 right-3 md:bottom-4 md:right-4 bg-blue-600 text-white px-2 md:px-3 py-1 md:py-2 rounded flex items-center gap-1 text-xs md:text-sm"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>
      </div>

      {/* ADMIN MODAL */}
      {adminModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 max-w-xl w-full overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg md:text-xl font-bold mb-4">{t.adminModalTitle}</h3>

            <div className="flex flex-wrap gap-4">
              {videos.map((v, i) => (
                <div key={i} className="relative w-28 h-20 md:w-32 md:h-20">
                  <video src={v} className="w-full h-full object-cover rounded" />
                  <button
                    onClick={() => handleVideoDelete(i)}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}

              <label className="w-28 h-20 md:w-32 md:h-20 border-dashed border-2 border-gray-400 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer text-xs md:text-sm text-gray-700 dark:text-gray-200">
                <Plus className="w-5 h-5 mb-1" />
                {t.addVideo}
                <input type="file" accept="video/*" hidden onChange={handleVideoChange} />
              </label>
            </div>

            <button
              onClick={() => setAdminModal(false)}
              className="mt-4 md:mt-6 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded text-sm md:text-base"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
