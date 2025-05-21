import "../../css/Contacto.css";
import { useTranslation } from "react-i18next";

const Contacto = () => {
  const { t } = useTranslation("contacto");

  return (
    <div className="container-imagen-contacto">
      <div className="container-contacto">
        <h1>{t("title")}</h1>

        <form>
          <label htmlFor="name">{t("usernameLabel")}</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="email">{t("emailLabel")}</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={t("emailPlaceholder")}
            required
          />

          <label htmlFor="message">{t("messageLabel")}</label>
          <textarea id="message" name="message" required></textarea>

          <button className="btn-contacto">{t("buttonText")}</button>
        </form>
      </div>
    </div>
  );
};

export default Contacto;
