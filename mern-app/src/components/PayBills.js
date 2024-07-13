import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './PayBills.css';

const PayBills = () => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.recipient) {
      setRecipient(location.state.recipient);
    }
  }, [location.state]);

  const handlePay = async () => {
    try {
      await axios.post('http://localhost:3000/api/paybills', { amount, recipientId: recipient._id });
      navigate('/');
    } catch (error) {
      console.error('Error paying bills:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>Pay Bills</h1>
      {recipient && (
        <div>
          <p>Paying to: {recipient.name} ({recipient.accountNumber})</p>
        </div>
      )}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={handlePay}>Pay</button>
    </div>
  );
};

export default PayBills;
