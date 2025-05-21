import "../../css/Inicio.css";
import Slider from "./componentesInicio/slider.jsx";

const Inicio = () => {
  return (
    <>
      <div className="container-slider-inicio">
        <Slider />
      </div>
      <div className="container-inicio">
        <h1>Bienvenidos a MindEscape</h1>
        <p>Esta es la demo de nuestro proyecto, una plataforma web de un juego de escape room. A través de diferentes chatbots con inteligencia artificial, los jugadores podrán interactuar en distintos escenarios, resolviendo pruebas y desafíos con la ayuda de la IA para avanzar en el juego.</p>
      </div>
    </>
  );
};

export default Inicio;