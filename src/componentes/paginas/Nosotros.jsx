import "../../css/Nosotros.css";
import { useTranslation } from "react-i18next";

const Nosotros = () => {
  const { t } = useTranslation("nosotros");

  return (
    <div className="container-bg-nosotros">
      <div className="container-nosotros">
          <h1>{t("title")}</h1>
          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
          <p>{t("paragraph3")}</p>
      </div>
    </div>
  );
};

export default Nosotros;