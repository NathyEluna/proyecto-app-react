import React, { useState } from 'react';
import LanguageModal from './idiomaModal.jsx'; 
import { useTranslation } from "react-i18next";
import { IoEarth } from "react-icons/io5";


const idiomaBoton = () => {
  const { t } = useTranslation("botonIdioma");

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="py-1 px-2 bg-purplebg-purple-600 text-white text-sm px-3 py-1 rounded-md hover:bg-purple-700 transition duration-200">
        <IoEarth className="inline text-xl mr-2 text-white" /> {t("language")}
      </button>
      <LanguageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default idiomaBoton;
