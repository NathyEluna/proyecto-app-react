import IAImage from "../../../assets/img/iaimage.png";
import PuzzleImage from "../../../assets/img/puzzle.png";
import CyberpunkImage from "../../../assets/img/cyberpunk.png";
import BackpackImage from "../../../assets/img/backpack.png";
import { useTranslation } from "react-i18next";

export default function CardsGame() {
  const { t } = useTranslation("cardsGame");

  const cards = [
    {
      key: "card1",
      gradient: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.3) 20%, rgba(109, 201, 247, 0.85) 100%)",
      image: IAImage,
      imageSize: "w-[275px]",
      imageTransform: "scale-x-[-1]",
      imagePosition: "left",
    },
    {
      key: "card2",
      gradient: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.3) 20%, rgba(129, 26, 219, 0.8) 100%)",
      image: PuzzleImage,
      imageSize: "w-[300px]",
      imageTransform: "rotate-[50deg]",
      imagePosition: "right",
    },
    {
      key: "card3",
      gradient: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.3) 20%, rgba(109, 201, 247, 0.85) 100%)",
      image: CyberpunkImage,
      imageSize: "w-[280px]",
      imageTransform: "scale-x-[-1]",
      imagePosition: "left",
    },
    {
      key: "card4",
      gradient: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.3) 20%, rgba(129, 26, 219, 0.8) 100%)",
      image: BackpackImage,
      imageSize: "w-[350px]",
      imageTransform: "rotate-[-6deg]",
      imagePosition: "right",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a1a] p-4 md:p-10 flex flex-col gap-16">
      {cards.map((card, idx) => {
        const content = t(card.key, { returnObjects: true });

        return (
          <div key={idx} className="w-full md:w-[70%] mx-auto">
            <div
              className={`rounded-3xl text-left shadow-2xl w-full relative z-20 flex flex-col md:flex-row ${
                card.imagePosition === "left" ? "md:flex-row" : "md:flex-row-reverse"
              } items-center`}
              style={{ background: card.gradient }}
            >
              <img
                src={card.image}
                alt={content.title}
                className={`${card.imageSize} ${card.imageTransform} z-30 drop-shadow-xl max-w-full ${card.key === "card2" ? "mb-6 md:mb-0" : ""}`}
              />

              <div className="flex-1 px-6 md:px-15 py-6 md:py-10 text-white">
                <h2 className="text-xl md:text-3xl font-bold mb-4">{content.title}</h2>
                <p className="text-white/90 whitespace-pre-line font-semibold text-base leading-relaxed">
                  {content.text}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
