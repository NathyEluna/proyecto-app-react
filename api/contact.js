const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: import.meta.env.VITE_EMAIL_USER || process.env.EMAIL_USER,
        pass: import.meta.env.VITE_EMAIL_PASS || process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: 'nathaliamichalowski.alu@iespacomolla.es',
      subject: 'New Contact Form Submission',
      html: `
        <h3>New message from ${username}</h3>
        <p>From: ${email}</p>
        <p>Message: ${message}</p>
      `
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};