// components/HeroSlider.jsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/images/slide1.jpg",
    title: "¿Podrás romper el código antes de que lo hagan ellos?",
    description: "Sumérgete en una ciudad distópica gobernada por corporaciones. La IA te guiará… si confías en ella.",
    buttonText: "Entrar al ciberlaberinto",
    buttonLink: "/about-us",
    position: "left",
  },
  {
    id: 2,
    image: "/images/slide2.jpg",
    title: "Tus decisiones cambiarán la historia",
    description: "Estás atrapado tras las líneas enemigas. Descifra, infiltra y escapa con la ayuda de la inteligencia artificial.",
    buttonText: "Entrar al ciberlaberinto",
    buttonLink: "/about-us",
    position: "right",
  },
  {
    id: 3,
    image: "/images/slide3.jpg",
    title: "El vapor se alza... y el tiempo corre",
    description: "En un mundo de relojes, humo y secretos, cada pista cuenta. ¿Resolverás el enigma mecánico?",
    buttonText: "Entrar al ciberlaberinto",
    buttonLink: "/about-us",
    position: "center",
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="bg-black bg-opacity-50 w-full h-full flex items-center">
            <div
              className={`
                text-white px-4 max-w-2xl
                ${slide.position === "center" ? "mx-auto text-center" : ""}
                ${slide.position === "left" ? "ml-10 text-left" : ""}
                ${slide.position === "right" ? "ml-auto mr-10 text-right" : ""}
              `}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg md:text-xl mb-6">{slide.description}</p>
              <a
                href={slide.buttonLink}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition"
              >
                {slide.buttonText}
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
