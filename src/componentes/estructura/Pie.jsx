import "../../css/pie.css";
import { useTranslation } from "react-i18next";


const Pie = () => {
  const { t } = useTranslation("footer");

  return (
    <footer>
        <p>{t("copyright")}</p>
    </footer>
  );
};

export default Pie;