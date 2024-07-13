const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mernapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Transaction = mongoose.model('Transaction', new mongoose.Schema({
  amount: Number,
  method: String,
  recipient: String,
  email: String,
  date: { type: Date, default: Date.now },
}));



const Recipient = mongoose.model('Recipient', new mongoose.Schema({
  name: String,
  accountNumber: String,
}));

const sendEmailNotification = async (email, amount, method) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  let mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Transaction Notification',
    text: `A transaction of ${amount} using ${method} was successful.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

app.post('/api/send', async (req, res) => {
  const { amount, recipient, method, email } = req.body;
  const transaction = new Transaction({ amount, recipient, method, email });
  await transaction.save();

  await sendEmailNotification(email, amount, method);

  res.send(transaction);
});

app.get('/api/transactions/:recipientId', async (req, res) => {
  const { recipientId } = req.params;
  const transactions = await Transaction.find({ recipient: recipientId });
  res.send(transactions);
});

app.get('/api/recipients', async (req, res) => {
  const recipients = await Recipient.find();
  res.send(recipients);
});

app.post('/api/recipients', async (req, res) => {
  const { name, accountNumber } = req.body;
  const recipient = new Recipient({ name, accountNumber });
  await recipient.save();
  res.send(recipient);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


const User = mongoose.model('User', new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  }));

  app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
  
      const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
      res.send({ message: 'Signup successful', token });
    } catch (error) {
      res.status(500).send({ message: 'Signup failed', error });
    }
  });
  
  // Login Endpoint
  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
      res.send({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).send({ message: 'Login failed', error });
    }
  });