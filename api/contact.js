// filepath: api/contact.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Handle CORS preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  };

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  };

  try {
    const { username, email, message } = req.body;

    if (!username || !email || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    };

    const transporter = nodemailer.createTransporter({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: "nathaliamichalowski.alu@iespacomolla.es",
      subject: `New Contact Form Submission from ${username}`,
      html: `
        <h3>New message from ${username}</h3>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ 
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  };
};