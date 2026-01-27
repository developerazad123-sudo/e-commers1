const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      }
    });

    // Verify connection configuration
    await transporter.verify();
    console.log('Server is ready to take our messages');

    // Mail options
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: 'test@example.com', // Replace with a real email for testing
      subject: 'Test Email from Akario Mart',
      html: '<h1>Email Configuration Test</h1><p>If you received this email, your email configuration is working correctly!</p>'
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

testEmail();