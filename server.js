const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // Import Nodemailer

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

// Store received names in an array for notifications
const notifications = [];

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create a Nodemailer transporter using your email service (e.g., Gmail)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'arjunreddyseeram87@gmail.com', // Replace with your email address
    pass: 'jqkbynjkazoltcho'
  },
});

// Route to receive and store names and send email notifications
app.post('/send-notification', (req, res) => {
  const { yourName, partnerName } = req.body;

  // Check if this notification has already been sent
  if (notifications.some((notification) => notification.yourName === yourName && notification.partnerName === partnerName)) {
    res.status(200).send('Notification already sent.');
  } else {
    notifications.push({ yourName, partnerName });

    // Send an email notification to the admin
    const mailOptions = {
      from: 'arjunreddyseeram87@gmail.com', // Replace with your email address
      to: 'arjunreddyseeram87@gmail.com', // Replace with the admin's email address
      subject: `🎉 Flames Alert! from ${yourName} 🎉🔥💘`,
      text: `🌟 Greetings, Sandeep 🌟\n\n
      Hold onto your seats, because we've got some sizzling news! ${yourName} and ${partnerName} just collided in the world of Flames. Things are heating up, and we thought you should know! 🚀💥
      \n\nCheers,
      \nThe Flames Whisperer 💥`

    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Success');
      }
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});