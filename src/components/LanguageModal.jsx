// src/components/LanguageModal.jsx
import React from "react";

const languages = {
  uz: "Oʻzbekcha",
  en: "English",
  ru: "Русский",
  kr: "한국어",
};

export default function LanguageModal({ lang, setLang, isOpen, setIsOpen }) {
  if (!isOpen) return null; // modal faqat ochilganda ko‘rinadi

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl w-72 md:w-96 text-center shadow-2xl transition-transform transform scale-95 animate-modalShow">
        <h2 className="text-xl md:text-2xl font-bold mb-6">
          Tilni tanlang / Select Language
        </h2>

        <div className="flex flex-col gap-3">
          {Object.keys(languages).map((l) => (
            <button
              key={l}
              onClick={() => {
                setLang(l);
                setIsOpen(false);
              }}
              className={`px-4 py-3 rounded-xl text-lg font-medium transition ${
                lang === l
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-blue-400 hover:text-white"
              }`}
            >
              {languages[l]}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="mt-6 text-red-500 hover:underline font-medium"
        >
          Close
        </button>
      </div>

      <style>
        {`
        @keyframes modalShow {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-modalShow {
          animation: modalShow 0.3s ease-out forwards;
        }
      `}
      </style>
    </div>
  );
}
