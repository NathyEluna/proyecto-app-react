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

import inglesCardsGame from './idiomas/en/cardsGame/cardsGame.js';
import espanolCardsGame from './idiomas/es/cardsGame/cardsGame.js';

import inglesCambiarPassword from './idiomas/en/cambiarPassword/cambiarPassword.js';
import espanolCambiarPassword from './idiomas/es/cambiarPassword/cambiarPassword.js';

import inglesRestablecerPassword from './idiomas/en/restablecerPassword/restablecerPassword.js';
import espanolRestablecerPassword from './idiomas/es/restablecerPassword/restablecerPassword.js';

import inglesRoomSelection from './idiomas/en/roomSelection/roomSelection.js';
import espanolRoomSelection from './idiomas/es/roomSelection/roomSelection.js';

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
    cardsGame: inglesCardsGame,
    cambiarPassword: inglesCambiarPassword,
    restablecerPassword: inglesRestablecerPassword,
    roomSelection: inglesRoomSelection,
    
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
    cardsGame: espanolCardsGame,
    cambiarPassword: espanolCambiarPassword,
    restablecerPassword: espanolRestablecerPassword,
    roomSelection: espanolRoomSelection,

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
        'cardsGame', 
        'cambiarPassword',
        'restablecerPassword',
        'roomSelection', 
    ],
  });

export default i18n;