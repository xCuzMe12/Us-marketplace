import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";

// Set up Nodemailer transport (use your email service credentials here)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com", // Your business/system email (sender)
    pass: "your-email-password",   // Your email password (use App Password if using Gmail)
  },
});

// Cloud Function to send an email
export const sendEmail = functions.https.onRequest((req, res) => {
  const { senderEmail, recipientEmail, message } = req.body; // email and message from the request body

  if (!senderEmail || !recipientEmail || !message) {
    res.status(400).send("Sender email, recipient email, and message are required.");
    return;  // Early return to stop further execution
  }

  const mailOptions = {
    from: senderEmail,  // The sender's email (your system or business email)
    to: recipientEmail, // The recipient's email (customer's email)
    subject: "Subject of your email",  // Customize the subject if needed
    text: message,        // The message to send to the customer
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send("Error sending email: " + error.toString());
      return;  // Early return to stop further execution on error
    }
    res.status(200).send("Email sent successfully!");
  });
});
