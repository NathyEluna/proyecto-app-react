import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import inglesContacto from './idiomas/en/contacto/contacto.js';
import espanolContacto from './idiomas/es/contacto/contacto.js';

import inglesLogin from './idiomas/en/login/login.js';
import espanolLogin from './idiomas/es/login/login.js';

import inglesCrearCuenta from './idiomas/en/crearCuenta/crearCuenta.js';
import espanolCrearCuenta from './idiomas/es/crearCuenta/crearCuenta.js';

import inglesEditarPerfil from './idiomas/en/editarPerfil/editarPerfil.js';
import espanolEditarPerfil from './idiomas/es/editarPerfil/editarPerfil.js';

import inglesBotonIdioma from './idiomas/en/botonIdioma/botonIdioma.js';
import espanolBotonIdioma from './idiomas/es/botonIdioma/botonIdioma.js';

const resources = {
  en: {
    contacto: inglesContacto,
    login: inglesLogin,
    crearCuenta: inglesCrearCuenta,
    editarPerfil: inglesEditarPerfil,
    botonIdioma: inglesBotonIdioma,
    
  },
  es: {
    contacto: espanolContacto,
    login: espanolLogin,
    crearCuenta: espanolCrearCuenta,
    editarPerfil: espanolEditarPerfil,
    botonIdioma: espanolBotonIdioma,
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
        'editarPerfil',
        'botonIdioma',
    ],
  });

export default i18n;