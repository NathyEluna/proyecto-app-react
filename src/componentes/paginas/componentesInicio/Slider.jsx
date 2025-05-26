import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
//imagenes
import cyberpunk from "../../../assets/img/imagen_cyberpunk.png";
import espia from "../../../assets/img/espia.png";
import steampunk from "../../../assets/img/steampunk.webp";


export default function Slider() {
  const { t } = useTranslation("slider");

  const slides = [
    { id: 1, image: cyberpunk, key: "slide1", position: "left", buttonLink: "/escape-rooms" , gradient: "linear-gradient(to left, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.3) 40%, rgba(129, 26, 219, 0.8) 100%)"},
    { id: 2, image: espia, key: "slide2", position: "right", buttonLink: "/escape-rooms", gradient: "linear-gradient(to right, rgba(0,0,0,0.0) 0%, rgba(6, 16, 35, 0.5) 40%, rgba(6, 16, 35, 1) 100%)" },
    { id: 3, image: steampunk, key: "slide3", position: "center", buttonLink: "/escape-rooms", gradient: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.3) 40%, rgba(109, 201, 247, 0.85) 100%)" }
  ];
  
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];
  const content = t(slide.key, { returnObjects: true });

  return (
    <>
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
          {/* Gradiente encima de la imagen */}
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-40"
            style={{
              background: slide.gradient,
            }}
          />

          {/* Contenido por encima del gradiente */}
          <div className="absolute top-0 left-0 w-full h-full flex items-center z-50">
            <div
              className={`text-white px-4 max-w-2xl
                ${slide.position === "center" ? "mx-auto text-center" : ""}
                ${slide.position === "left" ? "ml-10 text-left" : ""}
                ${slide.position === "right" ? "ml-auto mr-10 text-right" : ""}
              `}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h2>
              <p className="text-lg md:text-xl mb-6">{content.description}</p>
              <a
                href={slide.buttonLink}
                style={{
                  backgroundColor: "var(--color-rosa)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "var(--color-fondo)";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "var(--color-rosa)";
                  e.target.style.color = "black";
                }}
                className="inline-block text-lg font-medium py-3 px-6 rounded-2xl shadow-lg transition-colors"
              >
                {content.buttonText}
              </a>
            </div>
          </div>
        </motion.div>

        </AnimatePresence>
      </div>
    
    </>
  );
}
