import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import inglesContacto from './idiomas/en/contacto/contacto.js';
import espanolContacto from './idiomas/es/contacto/contacto.js';

import inglesLogin from './idiomas/en/login/login.js';
import espanolLogin from './idiomas/es/login/login.js';

import inglesCrearCuenta from './idiomas/en/crearCuenta/crearCuenta.js';
import espanolCrearCuenta from './idiomas/es/crearCuenta/crearCuenta.js';

const resources = {
  en: {
    contacto: inglesContacto,
    login: inglesLogin,
    crearCuenta: inglesCrearCuenta,
    
  },
  es: {
    contacto: espanolContacto,
    login: espanolLogin,
    crearCuenta: espanolCrearCuenta,
  },
};

i18n
  .use(LanguageDetector) // detecta idioma del navegador
  .use(initReactI18next) // conecta con React
  .init({
    resources,
    fallbackLng: 'es',
    ns: [
        "contacto",
        "login",
        'crearCuenta',
    ],
  });

export default i18n;