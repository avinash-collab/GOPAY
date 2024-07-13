import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';
import './ReceiveMoney.css';

const ReceiveMoney = () => {
  const [method, setMethod] = useState('bank');
  const [details, setDetails] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [message, setMessage] = useState('');

  const handleGenerateQR = async () => {
    if (method && details) {
      const qrData = {
        method,
        details
      };
      setQrValue(JSON.stringify(qrData));
      setMessage('QR code generated successfully.');
    } else {
      setMessage('Please enter the required details.');
    }
  };

  const handleReceive = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/receive', {
        method,
        details
      });
      setMessage('Ready to receive money.');
    } catch (error) {
      setMessage('Failed to set up receiving.');
    }
  };

  return (
    <div className="receive-money-container">
      <h1>Receive Money</h1>
      <form onSubmit={handleReceive} className="receive-money-form">
        <div>
          <label>Method:</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="bank">Bank Account</option>
            <option value="mobile">Mobile Number</option>
            <option value="upi">UPI</option>
            <option value="qr">QR Code</option>
          </select>
        </div>
        {(method === 'bank' || method === 'mobile' || method === 'upi') && (
          <div>
            <label>{method === 'bank' ? 'Bank Account Number' : method === 'mobile' ? 'Mobile Number' : 'UPI ID'}:</label>
            <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} required />
          </div>
        )}
        {method === 'qr' && (
          <div>
            <button type="button" onClick={handleGenerateQR}>Generate QR Code</button>
            {qrValue && <QRCode value={qrValue} />}
          </div>
        )}
        <button type="submit">Receive</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReceiveMoney;
