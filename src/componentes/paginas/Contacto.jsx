
const Contacto = () => {
  return (
    <div className="container">
        <h2>Contact Us</h2>

        <form>
            <label htmlFor="name">Username:</label>
            <input type="text" id="username" name="username" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="email@example.com" required />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" required></textarea>

            <button className="">Send Message</button>
        </form>
    </div>
  );
};

export default Contacto;