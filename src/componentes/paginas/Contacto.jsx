import "../../css/Contacto.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Contacto = () => {
  const { t } = useTranslation("contacto");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send email');
      }

      // Clear form
      setFormData({ username: "", email: "", message: "" });
      // You might want to add a success message here
    } catch (error) {
      console.error('Error:', error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
};

  return (
    <div className="container-imagen-contacto">
      <div className="container-contacto">
        <h1>{t("title")}</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">{t("usernameLabel")}</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={formData.username}
            onChange={handleChange}
            required 
          />

          <label htmlFor="email">{t("emailLabel")}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("emailPlaceholder")}
            required
          />

          <label htmlFor="message">{t("messageLabel")}</label>
          <textarea 
            id="message" 
            name="message" 
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button 
            type="submit" 
            className="btn-contacto" 
            disabled={loading}
          >
            {loading ? 'Sending...' : t("buttonText")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contacto;
