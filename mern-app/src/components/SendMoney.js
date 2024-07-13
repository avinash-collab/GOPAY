import React, { useState } from 'react';
import axios from 'axios';
import './SendMoney.css';

const SendMoney = () => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [method, setMethod] = useState('bank');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/send', {
        amount,
        recipient,
        method,
        email
      });
      setMessage(`Transaction successful: ${response.data._id}`);
    } catch (error) {
      setMessage('Transaction failed.');
    }
  };

  return (
    <div className="send-money-container">
      <h1>Send Money</h1>
      <form onSubmit={handleSend} className="send-money-form">
        <div>
          <label>Amount:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div>
          <label>Method:</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="bank">Bank Account</option>
            <option value="mobile">Mobile Number</option>
            <option value="upi">UPI</option>
            <option value="qr">QR Scanner</option>
          </select>
        </div>
        {method === 'bank' && (
          <div>
            <label>Bank Account Number:</label>
            <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
          </div>
        )}
        {method === 'mobile' && (
          <div>
            <label>Mobile Number:</label>
            <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
          </div>
        )}
        {method === 'upi' && (
          <div>
            <label>UPI ID:</label>
            <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
          </div>
        )}
        {method === 'qr' && (
          <div>
            <label>QR Code (URL):</label>
            <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
          </div>
        )}
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Send</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SendMoney;
