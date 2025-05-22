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

import inglesNavegador from './idiomas/en/navegador/navegador.js';
import espanolNavegador from './idiomas/es/navegador/navegador.js';

import inglesMenuLogin from './idiomas/en/menuLogin/menuLogin.js';
import espanolMenuLogin from './idiomas/es/menuLogin/menuLogin.js';

import inglesFooter from './idiomas/en/footer/footer.js';
import espanolFooter from './idiomas/es/footer/footer.js';

import inglesNosotros from './idiomas/en/nosotros/nosotros.js';
import espanolNosotros from './idiomas/es/nosotros/nosotros.js';

import inglesSlider from './idiomas/en/slider/slider.js';
import espanolSlider from './idiomas/es/slider/slider.js';

const resources = {
  en: {
    contacto: inglesContacto,
    login: inglesLogin,
    crearCuenta: inglesCrearCuenta,
    editarPerfil: inglesEditarPerfil,
    botonIdioma: inglesBotonIdioma,
    navegador: inglesNavegador,
    menuLogin: inglesMenuLogin,
    footer: inglesFooter,
    nosotros: inglesNosotros,
    slider: inglesSlider,
    
  },
  es: {
    contacto: espanolContacto,
    login: espanolLogin,
    crearCuenta: espanolCrearCuenta,
    editarPerfil: espanolEditarPerfil,
    botonIdioma: espanolBotonIdioma,
    navegador: espanolNavegador,
    menuLogin: espanolMenuLogin,
    footer: espanolFooter,
    nosotros: espanolNosotros,
    slider: espanolSlider,

  },
};

i18n
  .use(LanguageDetector) // detecta idioma del navegador
  .use(initReactI18next) // conecta con React
  .init({
    resources,
    fallbackLng: 'es',
    ns: [
        'contacto',
        'login',
        'crearCuenta',
        'editarPerfil',
        'botonIdioma',
        'navegador',
        'menuLogin',
        'footer',
        'nosotros',
        'slider',
    ],
  });

export default i18n;