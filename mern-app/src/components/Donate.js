import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Donate.css';

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [donationType, setDonationType] = useState('disaster');
  const [details, setDetails] = useState('');
  const navigate = useNavigate();

  const handleDonate = async () => {
    try {
      await axios.post('http://localhost:3000/api/donate', { amount, donationType, details });
      navigate('/');
    } catch (error) {
      console.error('Error donating:', error);
    }
  };

  const renderDetailsInput = () => {
    switch (donationType) {
      case 'disaster':
        return (
          <input
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Enter disaster details"
          />
        );
      case 'help':
        return (
          <input
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Enter help details"
          />
        );
      case 'others':
        return (
          <input
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Enter other details"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <h1>Donate</h1>
      <select value={donationType} onChange={(e) => setDonationType(e.target.value)}>
        <option value="disaster">Disaster Donation</option>
        <option value="help">Help Donation</option>
        <option value="others">Other Donation</option>
      </select>
      {renderDetailsInput()}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={handleDonate}>Donate</button>
    </div>
  );
};

export default Donate;
