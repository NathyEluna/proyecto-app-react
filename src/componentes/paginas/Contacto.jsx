import "../../css/Contacto.css";

const Contacto = () => {
  return (
    <div className="container-imagen-contacto">
      <div className="container-contacto">
          <h1>Contact Us</h1>

          <form>
              <label htmlFor="name">Username:</label>
              <input type="text" id="username" name="username" required />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="email@example.com" required />

              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required></textarea>

              <button className="btn-contacto">Send Message</button>
          </form>
      </div>
    </div>
  );
};

export default Contacto;