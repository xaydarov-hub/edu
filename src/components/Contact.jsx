import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Bug, Youtube } from "lucide-react";

// Tarjima JSON
const translations = {
  en: {
    header: "Contact Us",
    description: "The Korean Center team is always ready to help you. If you have any questions about courses, class schedules, or registration, feel free to contact us.⚡",
    namePlaceholder: "Full Name",
    messagePlaceholder: "What issue did you notice?",
    submit: "Send",
    phone: "+998 90 855 00 88",
    address: "GWPR+GRX, Turkiston St, Kokand, Fergana Region",
    bugReport: "Report a bug",
    success: "✅ Your message has been sent!",
    error: "❌ Something went wrong. Try again.",
  },
  uz: {
    header: "Aloqa uchun",
    description: "Korean Center jamoasi sizga yordam berishga doimo tayyor Kurslar, dars jadvali yoki ro‘yxatdan o‘tish bo‘yicha savollaringiz bo‘lsa, biz bilan bog‘laning.",
    namePlaceholder: "Ism va familiya",
    messagePlaceholder: "Qaysi xatoni ko‘rdingiz?",
    submit: "Yuborish",
    phone: "+998 90 855 00 88",
    address: "GWPR+GRX, Turkiston St, Kokand, Farg‘ona viloyati",
    bugReport: "Xato haqida xabar berish",
    success: "✅ Xabaringiz yuborildi!",
    error: "❌ Xatolik yuz berdi. Qaytadan urinib ko‘ring.",
  },
  ru: {
    header: "Свяжитесь с нами",
    description: "Команда Korean Center всегда готова помочь вам. Если у вас есть вопросы о курсах, расписании занятий или регистрации, свяжитесь с нами. ⚡",
    namePlaceholder: "Имя и фамилия",
    messagePlaceholder: "Какую ошибку вы заметили?",
    submit: "Отправить",
    phone: "+998 90 855 00 88",
    address: "GWPR+GRX, Turkiston St, Kokand, Ферганская область",
    bugReport: "Сообщить об ошибке",
    success: "✅ Ваше сообщение отправлено!",
    error: "❌ Произошла ошибка. Попробуйте снова.",
  },
  kr: {
    header: "문의하기",
    description: "팀은 언제나 여러분을 도울 준비가 되어 있습니다. 강의, 수업 일정 또는 등록과 관련된 문의가 있으시면 언제든지 연락해 주세요. ⚡",
    namePlaceholder: "이름과 성",
    messagePlaceholder: "어떤 오류를 발견했나요?",
    submit: "보내기",
    phone: "+998 90 855 00 88",
    address: "GWPR+GRX, Turkiston St, Kokand, Fergana Region",
    bugReport: "버그 신고",
    success: "✅ 메시지가 전송되었습니다!",
    error: "❌ 오류가 발생했습니다. 다시 시도해주세요.",
  },
};

export default function Contact({ lang = "uz" }) {
  const t = translations[lang];

  const [formData, setFormData] = useState({ name: "", message: "" });
  const [status, setStatus] = useState("");
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const botToken = "8470096894:AAGPR-J5wlZwuj9BlzKq-xKVZKh0j2EXZ1I";
    const chatId = "7755428335";
    const text = `🚨 New message (From site):\n👤 Name: ${formData.name}\n🐞 Message: ${formData.message}`;

    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
      setStatus(t.success);
      setFormData({ name: "", message: "" });
    } catch (err) {
      setStatus(t.error);
    }
  };

  return (
    <section
      id="contact"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-16 transition-colors duration-700 ${
        isDark
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-100 via-white to-pink-100 text-gray-900"
      }`}
    >
      {/* Orqa fon animatsiyalari */}
      <motion.div
        className={`absolute top-10 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 ${
          isDark ? "bg-indigo-800/40" : "bg-pink-300"
        }`}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className={`absolute bottom-10 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 ${
          isDark ? "bg-purple-900/30" : "bg-blue-300"
        }`}
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ repeat: Infinity, duration: 7 }}
      />

      <div className="relative max-w-7xl w-full grid md:grid-cols-2 gap-12 items-start z-10">
        {/* Chap panel */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <motion.h2
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className={`text-4xl md:text-5xl font-extrabold leading-tight ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            {t.header}
          </motion.h2>

          <p className={isDark ? "text-gray-300 text-lg" : "text-gray-600 text-lg"}>
            {t.description}
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-blue-500 animate-pulse" />
              <span className={isDark ? "text-gray-300" : "text-gray-700"}>{t.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-blue-500 animate-bounce" />
              <span className={isDark ? "text-gray-300" : "text-gray-700"}>{t.address}</span>
            </div>
          </div>

          {/* Social */}
          <div className="flex gap-4 pt-4">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <motion.a
                key={i}
                href="https://t.me/koreancenter_kc , https://youtube.com/channel/UC9cy9D5-ONTaFVikmGwdSJQ"
                whileHover={{ scale: 1.2, rotate: 5 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                className={`p-3 rounded-full shadow transition ${
                  isDark ? "bg-white/10 hover:bg-white/20" : "bg-white hover:bg-gray-100"
                }`}
              >
                <Icon className={`w-6 h-6 ${isDark ? "text-white" : "text-blue-600"}`} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Forma */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`relative p-8 md:p-10 rounded-2xl shadow-2xl border backdrop-blur-xl overflow-hidden transition-colors duration-700 ${
            isDark ? "bg-gray-800/70 border-gray-700" : "bg-white/80 border-white/30"
          }`}
        >
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: isDark
                ? "linear-gradient(90deg, rgba(79,70,229,0.2), rgba(236,72,153,0.1), rgba(248,113,113,0.2))"
                : "linear-gradient(90deg, #bfdbfe, rgba(255,255,255,0), #fbbfbc)",
            }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          />

          <h3
            className={`text-2xl font-bold text-center mb-4 flex items-center justify-center gap-2 relative z-10 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            <Bug className="w-6 h-6 text-red-500" /> {t.bugReport}
          </h3>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={t.namePlaceholder}
            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none transition relative z-10 ${
              isDark
                ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
            }`}
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows="4"
            placeholder={t.messagePlaceholder}
            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none transition relative z-10 ${
              isDark
                ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
            }`}
            required
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 25px rgba(59,130,246,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 text-white font-semibold text-lg transition relative z-10"
          >
            {t.submit}
          </motion.button>

          {status && (
            <p className="text-center text-sm font-medium text-green-500 relative z-10">{status}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
