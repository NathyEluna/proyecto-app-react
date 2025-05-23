import IAImage from "../../../assets/img/iaimage.png";
import PuzzleImage from "../../../assets/img/puzzle.png";
import CyberpunkImage from "../../../assets/img/cyberpunk.png";
import BackpackImage from "../../../assets/img/backpack.png";

const cards = [
  {
    title: "Interactúa con la IA del Juego",
    text: `No estarás solo en este viaje. Un sistema de inteligencia artificial se comunicará contigo mediante un chat en tiempo real. 
Puedes hacer preguntas, pedir pistas o simplemente conversar... pero cuidado: la IA no siempre dice todo lo que sabe. Algunas respuestas dependerán de tus decisiones, tu progreso y de cuán bien hayas explorado el entorno.
¿Será tu guía... o parte del misterio?`,
    gradient: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.3) 20%, rgba(109, 201, 247, 0.85) 100%)",
    image: IAImage,
    imageSize: "w-[275px]",
    imageTransform: "scale-x-[-1]",
    imagePosition: "left",
  },
  {
    title: "Resuelve Puzzles Únicos",
    text: `Cada sala te pondrá a prueba con acertijos diseñados para desafiar tu lógica, tu intuición y tu capacidad de observación. No hay soluciones obvias: tendrás que pensar fuera de la caja y conectar pistas que, a simple vista, no parecen tener relación.
Prepárate para romper tus propios esquemas... porque en MindEscape, nada es lo que parece.`,
    gradient: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.3) 20%, rgba(129, 26, 219, 0.8) 100%)",
    image: PuzzleImage,
    imageSize: "w-[300px]",
    imageTransform: "rotate-[50deg]",
    imagePosition: "right",
  },
  {
    title: "Elige Tu Aventura",
    text: `No es solo un juego, es un universo de opciones. ¿Prefieres la estética futurista del Cyberpunk? ¿O te intrigan los secretos de la Segunda Guerra Mundial? ¿Tal vez un mundo retrofuturista Steampunk es lo tuyo?
Tú eliges dónde empezar. Pero recuerda: cada elección abre caminos... y cierra otros.`,
    gradient: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.3) 20%, rgba(109, 201, 247, 0.85) 100%)",
    image: CyberpunkImage,
    imageSize: "w-[280px]",
    imageTransform: "scale-x-[-1]",
    imagePosition: "left",
  },
  {
    title: "Recolecta Objetos Clave",
    text: `Explorar es tan importante como resolver. A medida que avances por los escenarios, deberás estar atento a detalles, rincones ocultos y objetos aparentemente insignificantes que pueden marcar la diferencia.
Tu inventario será tu mejor aliado, si sabes cómo usarlo.`,
    gradient: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.3) 20%, rgba(129, 26, 219, 0.8) 100%)",
    image: BackpackImage,
    imageSize: "w-[350px]",
    imageTransform: "rotate-[-6deg]",
    imagePosition: "right",
  },
];



export default function cardsGame() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] p-10 flex flex-col gap-16">
      {cards.map((card, idx) => (
        <div key={idx} className="w-[70%] mx-auto">
          {/* Card layout: imagen + texto */}
          <div
            className={`rounded-3xl text-left px-0 shadow-2xl w-full relative z-20 flex items-center ${
              card.imagePosition === "left" ? "flex-row" : "flex-row-reverse"
            }`}
            style={{
              background: card.gradient,
            }}
          >
            {/* Imagen en flujo, NO absolute */}
            <img
              src={card.image}
              alt={card.title}
              className={`${card.imageSize} ${card.imageTransform} z-30 drop-shadow-xl`}
            />

            {/* Texto */}
            <div className="flex-1 px-15 py-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{card.title}</h2>
              <p className="text-white/90 whitespace-pre-line font-semibold text-base leading-relaxed">
                {card.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


