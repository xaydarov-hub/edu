// src/components/Register.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Register({ darkMode }) {
  const [lang, setLang] = useState("uz");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    age: "",
    comment: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // --- Telegram ---
  const TELEGRAM_TOKEN = "7779012857:AAGlt94fom0ThPjw3yB08FlTtPI6L__pGYo";
  const TELEGRAM_CHAT_ID = "289599299";

  // --- Translations ---
  const translations = {
    uz: {
      title: "Ro‘yxatdan o‘tish",
      description: "Bizning kurslarga yoziling va bilimlaringizni oshiring!",
      benefits: ["Professional ustozlar", "Qulay dars jadvali", "Interaktiv metodlar"],
      formTitle: "Ma'lumotlaringizni kiriting",
      name: "Ism",
      surname: "Familiya",
      phone: "Telefon raqam",
      age: "Yoshingiz",
      comment: "Izoh (ixtiyoriy)",
      submit: "Yuborish",
      sending: "Yuborilmoqda...",
      success: "Muvaffaqiyatli yuborildi ✅",
      error: "Xatolik yuz berdi, iltimos qayta urinib ko‘ring ❌",
    },
    en: {
      title: "Register Now",
      description: "Join our courses and improve your knowledge!",
      benefits: ["Professional teachers", "Flexible schedule", "Interactive methods"],
      formTitle: "Fill in your details",
      name: "First Name",
      surname: "Last Name",
      phone: "Phone Number",
      age: "Age",
      comment: "Comment (optional)",
      submit: "Submit",
      sending: "Sending...",
      success: "Submitted successfully ✅",
      error: "Error occurred, please try again ❌",
    },
    ru: {
      title: "Регистрация",
      description: "Запишитесь на наши курсы и улучшайте свои знания!",
      benefits: ["Профессиональные преподаватели", "Удобное расписание", "Интерактивные методы"],
      formTitle: "Введите ваши данные",
      name: "Имя",
      surname: "Фамилия",
      phone: "Номер телефона",
      age: "Возраст",
      comment: "Комментарий (необязательно)",
      submit: "Отправить",
      sending: "Отправка...",
      success: "Успешно отправлено ✅",
      error: "Произошла ошибка, попробуйте снова ❌",
    },
    ko: {
      title: "회원가입",
      description: "저희 강좌에 참여하여 지식을 향상시키세요!",
      benefits: ["전문 강사", "유연한 일정", "인터랙티브 학습법"],
      formTitle: "정보를 입력하세요",
      name: "이름",
      surname: "성",
      phone: "전화번호",
      age: "나이",
      comment: "코멘트 (선택 사항)",
      submit: "제출하기",
      sending: "전송 중...",
      success: "성공적으로 제출되었습니다 ✅",
      error: "오류가 발생했습니다. 다시 시도하세요 ❌",
    },
  };
  const t = translations[lang];

  const langs = [
    { code: "uz", label: "🇺🇿 O‘zbekcha" },
    { code: "ru", label: "🇷🇺 Русский" },
    { code: "en", label: "🇬🇧 English" },
    { code: "ko", label: "🇰🇷 한국어" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    const message = `
📌 *Yangi Ro‘yxatdan O‘tgan:*
- Ism: ${formData.name}
- Familiya: ${formData.surname}
- Telefon: ${formData.phone}
- Yoshi: ${formData.age}
- Izoh: ${formData.comment || "-"}
`;

    try {
      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setSuccessMsg(t.success);
        setFormData({ name: "", surname: "", phone: "", age: "", comment: "" });
      } else {
        setSuccessMsg(t.error);
      }
    } catch (err) {
      setSuccessMsg(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="register"
      className={`min-h-screen w-full flex items-center justify-center px-6 py-16 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-200"
      }`}
      style={{ paddingTop: "120px" }}
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-start md:items-center">
        {/* Chap panel */}
        <motion.div initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="space-y-6">
          {/* Til tanlash dropdown */}
          <div className="relative w-48 mb-6">
            <button
              onClick={() => setOpen(!open)}
              className={`flex items-center justify-between w-full px-4 py-2 rounded-xl border shadow-md font-medium ${
                darkMode ? "bg-gray-900 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-800"
              }`}
            >
              {langs.find((l) => l.code === lang)?.label}
              <motion.span animate={{ rotate: open ? 180 : 0 }}>
                <ChevronDown size={20} />
              </motion.span>
            </button>

            <AnimatePresence>
              {open && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute top-12 left-0 w-full rounded-xl border shadow-lg overflow-hidden z-50 ${
                    darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                  }`}
                >
                  {langs.map((l) => (
                    <li
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setOpen(false);
                      }}
                      className={`px-4 py-2 cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white transition ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {l.label}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <h2 className={`text-4xl md:text-5xl font-extrabold leading-tight ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
            {t.title.split(" ")[0]} <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{t.title.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{t.description}</p>
          <ul className="space-y-3">
            {t.benefits.map((b, i) => (
              <li key={i} className={`flex items-center gap-3 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${darkMode ? "bg-gray-400" : "bg-gray-600"}`}></span> {b}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* O‘ng panel - forma */}
        <motion.form
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          onSubmit={handleSubmit}
          className={`rounded-3xl p-8 md:p-10 space-y-6 border shadow-2xl backdrop-blur-lg w-full transition-colors duration-500 ${
            darkMode ? "bg-gray-800/90 border-gray-700 text-gray-100" : "bg-white/90 border-gray-300 text-gray-900"
          }`}
        >
          <h3 className={`text-2xl font-bold text-center mb-6 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>{t.formTitle}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" placeholder={t.name} value={formData.name} onChange={handleChange} required
              className={`px-4 py-3 rounded-xl border outline-none transition shadow-sm focus:ring-2 ${
                darkMode ? "bg-gray-900 border-gray-600 text-gray-200 focus:ring-gray-400" : "bg-white border-gray-300 text-gray-800 focus:ring-gray-500"
              }`} />
            <input type="text" name="surname" placeholder={t.surname} value={formData.surname} onChange={handleChange} required
              className={`px-4 py-3 rounded-xl border outline-none transition shadow-sm focus:ring-2 ${
                darkMode ? "bg-gray-900 border-gray-600 text-gray-200 focus:ring-gray-400" : "bg-white border-gray-300 text-gray-800 focus:ring-gray-500"
              }`} />
          </div>

          <input type="tel" name="phone" placeholder={t.phone} value={formData.phone} onChange={handleChange} required
            className={`w-full px-4 py-3 rounded-xl border outline-none transition shadow-sm focus:ring-2 ${
              darkMode ? "bg-gray-900 border-gray-600 text-gray-200 focus:ring-gray-400" : "bg-white border-gray-300 text-gray-800 focus:ring-gray-500"
            }`} />
          <input type="number" name="age" placeholder={t.age} value={formData.age} onChange={handleChange} required
            className={`w-full px-4 py-3 rounded-xl border outline-none transition shadow-sm focus:ring-2 ${
              darkMode ? "bg-gray-900 border-gray-600 text-gray-200 focus:ring-gray-400" : "bg-white border-gray-300 text-gray-800 focus:ring-gray-500"
            }`} />
          <textarea name="comment" rows="4" placeholder={t.comment} value={formData.comment} onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border outline-none transition shadow-sm focus:ring-2 ${
              darkMode ? "bg-gray-900 border-gray-600 text-gray-200 focus:ring-gray-400" : "bg-white border-gray-300 text-gray-800 focus:ring-gray-500"
            }`} />

          <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className={`w-full py-3 rounded-xl text-lg font-semibold shadow-lg transition ${
              darkMode ? "bg-gradient-to-r from-gray-600 to-gray-500 text-white hover:from-gray-500 hover:to-gray-400" : "bg-gradient-to-r from-gray-700 to-gray-600 text-white hover:from-gray-600 hover:to-gray-500"
            }`}
            disabled={loading}>
            {loading ? t.sending : t.submit}
          </motion.button>

          {successMsg && (
            <motion.p
              className="text-center mt-2 font-medium animate-pulse"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {successMsg}
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
