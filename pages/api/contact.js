const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  //Add CORS headers.
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  //Handle preflight requests.
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  };

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  };

  try {
    const { username, email, message } = req.body;

    //Validate input.
    if (!username || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
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
    //Send more specific error message.
    const errorMessage = error.code === 'EAUTH' 
      ? 'Email authentication failed'
      : 'Failed to send email';
    res.status(500).json({ message: errorMessage });
  };
};