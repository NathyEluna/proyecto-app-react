import React, { useState } from 'react';
import LanguageModal from './idiomaModal.jsx'; // ajusta la ruta si es necesario

const idiomaBoton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="py-1 px-2 bg-purplebg-purple-600 text-white text-sm px-3 py-1 rounded-md hover:bg-purple-700 transition duration-200">
        🌐 Change Language
      </button>
      <LanguageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default idiomaBoton;
