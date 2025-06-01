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

      if (!response.ok) throw new Error('Failed to send email');

      alert('Message sent successfully!');
      setFormData({ username: "", email: "", message: "" });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
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
