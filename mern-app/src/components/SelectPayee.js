// src/components/SelectPayee.js
import React from 'react';
import { Link } from 'react-router-dom';

const SelectPayee = () => {
  const payees = [
    { name: 'Eric Peterson', phone: '8-(624)657-1698' },
    { name: 'Douglas Adams', phone: '8-(624)657-1698' },
    // Add more payees as needed
  ];

  return (
    <div className="select-payee">
      <h1>Select Payee</h1>
      <ul>
        {payees.map((payee, index) => (
          <li key={index}>
            <Link to={`/send/${payee.name}`}>{payee.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectPayee;
