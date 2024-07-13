// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await axios.get('http://localhost:3000/api/transactions');
      setTransactions(res.data);
    };
    fetchTransactions();
  }, []);

  return (
    <div className="app-container">
      <h1>Hey,</h1>
      <p>What would you like to do today?</p>
      <div className="actions">
        <Link to="/send">Send</Link>
        <Link to="/receive">Receive</Link>
      </div>
      <div className="menu">
        <Link to="/pay-bills">Pay Bills</Link>
        <Link to="/donate">Donate</Link>
        <Link to="/recipients">Recipients</Link>
        <Link to="/offers">Offers</Link>
      
      </div>

      <Link to="/auth" className="login-signup-link">login/signup</Link>

      
        
        

      
      <div className="transactions">
        <h2>Recent Transactions</h2>
        {transactions.map((transaction) => (
          <div key={transaction._id}>
            {transaction.amount} - {new Date(transaction.date).toLocaleString()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
