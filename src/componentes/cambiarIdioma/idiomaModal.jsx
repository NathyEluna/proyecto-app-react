import React from 'react';
import i18n from '../../i18n/i18n.js'; // ajusta la ruta según tu estructura

const idiomaModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950 bg-opacity-30 flex items-center justify-center z-10 !important">
      {/* bg-black bg-opacity-30 es el fondo casi transparente */}

      <div className="bg-blue-950 p-6 rounded-2xl shadow-lg max-w-sm w-full text-white">
        {/* bg-blue-900 es azul oscuro y texto blanco */}

        <h2 className="text-xl font-semibold mb-4 text-center">Select Language</h2>

        <div className="flex flex-col space-y-3">
          <button
            onClick={() => changeLanguage('es')}
            className="py-2 px-4 bg-purple-600 rounded-xl hover:bg-purple-700 transition duration-200"
          >
            Español
          </button>

          <button
            onClick={() => changeLanguage('en')}
            className="py-2 px-4 bg-purple-600 rounded-xl hover:bg-purple-700 transition duration-200"
          >
            English
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-5 block mx-auto text-sm text-purple-300 hover:text-purple-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default idiomaModal;
