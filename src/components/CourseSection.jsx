import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BookOpen, Clock, Award, CheckCircle2, X } from "lucide-react";

const translations = {
  en: {
    heading: "Our Korean Language Course",
    description:
      "Start your Korean learning journey here. Interactive lessons and practical exercises will take you from zero to mastery.",
    features: [
      {
        title: "Interactive lessons",
        desc: "Learn Korean through quizzes, exercises, and interactive dialogues.",
        icon: <BookOpen className="w-6 h-6 text-indigo-400" />,
      },
      {
        title: "3 sessions per week",
        desc: "Classes scheduled 3 times a week, convenient and consistent for progress.",
        icon: <Clock className="w-6 h-6 text-pink-400" />,
      },
      {
        title: "Topic preparation",
        desc: "Structured topic materials with practice exercises for mastery.",
        icon: <Award className="w-6 h-6 text-yellow-400" />,
      },
      {
        title: "Practical conversations",
        desc: "Real-life dialogues to build confidence in speaking Korean.",
        icon: <CheckCircle2 className="w-6 h-6 text-green-400" />,
      },
    ],
    button: "🚀 Enroll Now",
    duration: "12-Month Program",
    modalClose: "Close",
  },
  uz: {
    heading: "Bizning Koreys Tili Kursimiz",
    description:
      "Sizning koreys tilini o‘rganish sayohatingiz shu yerdan boshlanadi. Interaktiv darslar va amaliy mashg‘ulotlar bilan 0 dan mukammal darajaga erishing.",
    features: [
      {
        title: "Interaktiv darslar",
        desc: "Quiz va mashqlar orqali koreys tilini o‘rganing.",
        icon: <BookOpen className="w-6 h-6 text-indigo-400" />,
      },
      {
        title: "Haftasiga 3 marotaba",
        desc: "Darslar haftasiga 3 marta, sizga qulay va barqaror.",
        icon: <Clock className="w-6 h-6 text-pink-400" />,
      },
      {
        title: "Topic uchun tayyorlov",
        desc: "Mavzular uchun tayyorlov materiallari va mashqlar.",
        icon: <Award className="w-6 h-6 text-yellow-400" />,
      },
      {
        title: "Amaliy suhbatlar",
        desc: "Real suhbatlar orqali muloqot qobiliyatingizni oshiring.",
        icon: <CheckCircle2 className="w-6 h-6 text-green-400" />,
      },
    ],
    button: "🚀 Kursga yozilish",
    duration: "12 oylik dastur",
    modalClose: "Yopish",
  },
  ru: {
    heading: "Наш курс корейского языка",
    description:
      "Начните изучение корейского языка здесь. Интерактивные уроки и практические задания приведут вас от нуля к совершенству.",
    features: [
      {
        title: "Интерактивные уроки",
        desc: "Учите корейский через упражнения, викторины и диалоги.",
        icon: <BookOpen className="w-6 h-6 text-indigo-400" />,
      },
      {
        title: "3 занятия в неделю",
        desc: "Три занятия в неделю, удобно и стабильно для прогресса.",
        icon: <Clock className="w-6 h-6 text-pink-400" />,
      },
      {
        title: "Подготовка по темам",
        desc: "Структурированные материалы и практика по темам.",
        icon: <Award className="w-6 h-6 text-yellow-400" />,
      },
      {
        title: "Практические диалоги",
        desc: "Практика реальных диалогов для уверенности.",
        icon: <CheckCircle2 className="w-6 h-6 text-green-400" />,
      },
    ],
    button: "🚀 Записаться на курс",
    duration: "12-месячная программа",
    modalClose: "Закрыть",
  },
  kr: {
    heading: "한국어 과정 소개",
    description:
      "이곳에서 한국어 학습을 시작하세요. 인터랙티브 수업과 실습을 통해 초보자부터 완성 단계까지 도와드립니다.",
    features: [
      {
        title: "인터랙티브 수업",
        desc: "퀴즈, 연습, 실습 대화를 통해 한국어를 배웁니다.",
        icon: <BookOpen className="w-6 h-6 text-indigo-400" />,
      },
      {
        title: "주 3회 수업",
        desc: "주 3회 수업, 편리하고 꾸준한 학습 진행.",
        icon: <Clock className="w-6 h-6 text-pink-400" />,
      },
      {
        title: "주제별 준비",
        desc: "각 주제별 자료와 연습 포함.",
        icon: <Award className="w-6 h-6 text-yellow-400" />,
      },
      {
        title: "실전 회화 연습",
        desc: "실제 대화를 통한 자신감 향상.",
        icon: <CheckCircle2 className="w-6 h-6 text-green-400" />,
      },
    ],
    button: "🚀 수강 신청",
    duration: "12개월 과정",
    modalClose: "닫기",
  },
};

export default function CourseSection({ darkMode = false, lang = "en" }) {
  const t = translations[lang] || translations.en;
  const [modalContent, setModalContent] = useState(null);

  return (
    <section
      id="courses"
      className={`relative py-24 px-6 lg:px-20 min-h-screen flex flex-col lg:flex-row items-center gap-12 ${
        darkMode
          ? "bg-gradient-to-br from-[#0f0f1a] via-black to-[#050510] text-white"
          : "bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-200 text-gray-900"
      }`}
    >
      {/* VIDEO */}
      <div className="relative flex-1 w-full max-w-lg rounded-xl overflow-hidden shadow-2xl">
        <video
          src="/courses.mov"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-96 object-cover rounded-xl border-4 border-white/20"
        />
        <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded text-sm">
          {t.duration}
        </div>
      </div>

      {/* TEXT */}
      <div className="flex-1 max-w-xl flex flex-col gap-8">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-pink-500 to-yellow-400">
          {t.heading}
        </h2>
        <p className="text-lg">{t.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {t.features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              onClick={() => setModalContent(f)}
              className="p-5 bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg cursor-pointer flex flex-col gap-2 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition"
            >
              <div className="flex items-center gap-3">{f.icon}</div>
              <h3 className="font-bold text-lg">{f.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setModalContent(null)}
                className="absolute top-3 right-3 text-gray-700 dark:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-bold text-xl mb-3">{modalContent.title}</h3>
              <p>{modalContent.desc}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
