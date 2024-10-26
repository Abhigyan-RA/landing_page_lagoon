const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS 
    }
});


app.post('/send-email', (req, res) => {
    const { email } = req.body;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Welcome to Lagoon's Early Access List!",
        html: `
          <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lagoon Welcome Email</title>
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600&display=swap" rel="stylesheet">
            <style>
                body, h1, h2, p, a {
                    font-family: 'Plus Jakarta Sans', Arial, sans-serif !important;
                }
            </style>
        </head>
        <body style="line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <header style="text-align: center; margin-bottom: 20px;">
                <img src="https://i.imgur.com/RlePCoP.png" alt="Lagoon Logo" style="width: 100%; height: auto; max-height: 300px;">
            </header>
          
            <main>
                <p>Hi there,<br>Yash this side from Lagoon!</p>
               
                <p>Thank you so much for joining Lagoon's waitlist! It genuinely means a lot to have you with us as we kick off this journey. Your support is at the heart of why we're excited to build Lagoon and make hiring simpler and smoother for everyone.</p>
                
                <p>We're rolling out our first feature in just a few days (around 10!)—and you'll be the very first to know when it's live! We can't wait to share what we've been working on with you.</p>
                
                <p>In the meantime, we'd love for you to follow us on <a href="https://www.linkedin.com/company/lagoon-works/about/" style="color: #006400; text-decoration: none;">LinkedIn</a> where we'll be sharing regular updates, insights, and a bit of behind-the-scenes fun as we get closer to launch.</p>
                
                <p>Thanks again for being here from the start. We're thrilled to have you along for the ride!</p>
                
                <p>With warmest regards,<br>Team Lagoon!</p>
            </main>
        </body>
        </html>
        `
    };
    
    
  

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.status(500).send({ status: 'error', message: 'Email not sent' });
        }
        console.log('Email sent:', info.response);
        res.send({ status: 'success', message: 'Welcome email sent!' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
