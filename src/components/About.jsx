// src/components/About.jsx
import React from "react";
import { motion } from "framer-motion";

const translations = {
  uz: {
    title: "Biz haqimizda",
    text: `Korean Center o‘quv markazi — bu Farg‘ona viloyatining Qo‘qon shahrida joylashgan xorijiy tillarni o‘qitishga ixtisoslashgan ta’lim muassasasi. Markaz koreys tilini o‘rgatish, koreys madaniyatini tanitish va xalqaro ta’lim almashinuviga ko‘maklashish maqsadida faoliyat yuritadi.

Faoliyat sohasi
Markazda koreys tili asosiy o‘quv yo‘nalish bo‘lib, bu yerda turli yoshdagi tinglovchilar uchun boshlang‘ichdan yuqori darajagacha bo‘lgan kurslar taklif etiladi. Shuningdek, koreys tili o‘qituvchilari malakasini oshirish hamda madaniy tadbirlar, film namoyishlari, seminarlar o‘tkazish orqali Koreya va O‘zbekiston o‘rtasidagi madaniy aloqalarni rivojlantirishga xizmat qiladi.

Joylashuvi va muhit
Korean Center o‘quv markazi Qo‘qon shahrining Turkiston ko‘chasida, markaziy va oson topiladigan joyda joylashgan. Yaqin atrofda boshqa o‘quv markazlari, savdo do‘konlari va jamoat transporti to‘xtash joylari mavjud bo‘lib, bu markazga keluvchilar uchun qulay sharoit yaratadi.

Ahamiyati
Ushbu markaz Qo‘qon shahrida koreys tili va madaniyatini o‘rganish uchun asosiy manbalardan biri hisoblanadi. Markazning faoliyati yoshlar orasida xorijiy tillarni o‘rganish va xalqaro hamkorlik imkoniyatlarini kengaytirishga sezilarli hissa qo‘shmoqda.

Umumiy taassurotlar
Yandex xaritasidagi ma’lumotlarga ko‘ra, markaz 4,3 reytingga ega bo‘lib, bu ta’lim sifatining yuqoriligini va o‘quvchilar tomonidan ijobiy baholanishini ko‘rsatadi.`
  },
  en: {
    title: "About Us",
    text: `Korean Center is a specialized foreign language learning institution located in Kokand, Fergana region. It teaches Korean language, introduces Korean culture, and supports international educational exchange.

Scope of Activity
The center offers Korean language courses for learners of all ages, from beginner to advanced levels. It also trains Korean language teachers and organizes cultural events, film screenings, and seminars to strengthen Korea-Uzbekistan cultural ties.

Location & Environment
Korean Center is centrally located on Turkiston Street in Kokand, near other learning centers, shops, and public transport stops, providing easy access for visitors.

Importance
It is one of the main resources for learning Korean language and culture in Kokand, promoting foreign language learning and international cooperation among youth.

Overall Impressions
According to Yandex Maps, the center has a rating of 4.3, reflecting the high quality of education and positive feedback from students.`
  },
  ru: {
    title: "О нас",
    text: `Учебный центр Korean Center — это специализированное учреждение в городе Коканд, Ферганская область. Центр обучает корейскому языку, знакомит с культурой Кореи и поддерживает международный образовательный обмен.

Сфера деятельности
Центр предлагает курсы корейского языка для учеников всех возрастов, от начального до продвинутого уровня. Также центр повышает квалификацию преподавателей и проводит культурные мероприятия, показы фильмов и семинары для развития культурных связей между Кореей и Узбекистаном.

Расположение и среда
Korean Center находится на улице Туркистон в центре Коканда, рядом с другими учебными заведениями, магазинами и остановками общественного транспорта.

Значимость
Центр является одним из основных источников изучения корейского языка и культуры в Коканде и способствует развитию международного сотрудничества среди молодежи.

Общие впечатления
Согласно данным Яндекс.Карты, центр имеет рейтинг 4,3, что отражает высокий уровень образования и положительные отзывы учеников.`
  },
  kr: {
    title: "회사 소개",
    text: `Korean Center는 페르가나 지역 코칸드에 위치한 외국어 교육 기관입니다. 한국어 교육, 한국 문화 소개 및 국제 교육 교류를 지원합니다.

활동 분야
센터는 모든 연령대의 학습자를 위한 초급에서 고급 수준까지의 한국어 과정을 제공합니다. 또한 한국어 교사 교육과 문화 행사, 영화 상영, 세미나를 통해 한국과 우즈베키스탄 간의 문화 교류를 촉진합니다.

위치 및 환경
Korean Center는 코칸드의 투르키스탄 거리 중심에 위치해 있으며, 다른 교육 기관, 상점 및 대중교통 정류장 근처에 있어 방문객에게 편리합니다.

중요성
센터는 코칸드에서 한국어와 문화를 배우기 위한 주요 자원 중 하나이며, 젊은 층의 외국어 학습과 국제 협력 기회를 촉진합니다.`
  },
};

export default function About({ darkMode, lang }) {
  const { title, text } = translations[lang] || translations["uz"];

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{
        padding: "100px 20px",
        background: darkMode
          ? "linear-gradient(135deg, #0a0a0f, #1a1a2c)"
          : "linear-gradient(135deg, #f8f8fc, #ffffff)",
        color: darkMode ? "#f0f0f0" : "#111",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          fontSize: "3rem",
          textAlign: "center",
          marginBottom: "40px",
          fontWeight: "900",
          textShadow: darkMode ? "0 0 15px #0ff" : "0 0 5px #333",
        }}
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          maxWidth: "950px",
          margin: "0 auto",
          background: darkMode ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.85)",
          padding: "40px",
          borderRadius: "25px",
          boxShadow: darkMode
            ? "0 15px 40px rgba(0,255,255,0.1)"
            : "0 15px 40px rgba(0,0,0,0.1)",
          lineHeight: "1.9",
          fontSize: "1.1rem",
          textAlign: "justify",
          backdropFilter: "blur(5px)",
        }}
      >
        {text.split("\n\n").map((para, i) => (
          <p key={i} style={{ marginBottom: "20px" }}>
            {para}
          </p>
        ))}
      </motion.div>

      {/* Orqa fon animatsiya naqsh */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          left: "-50px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: darkMode
            ? "rgba(0,255,255,0.05)"
            : "rgba(0,150,255,0.08)",
          filter: "blur(80px)",
          zIndex: 0,
          animation: "float 6s ease-in-out infinite alternate",
        }}
      ></div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(20px) translateX(20px); }
          100% { transform: translateY(0) translateX(0); }
        }

        @media (max-width: 768px) {
          h2 { font-size: 2.2rem; }
          div { padding: 25px; font-size: 1rem; }
        }
      `}</style>
    </motion.section>
  );
}
