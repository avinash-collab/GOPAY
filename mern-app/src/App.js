// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SendMoney from './components/SendMoney';
import ReceiveMoney from './components/ReceiveMoney';
import SelectPayee from './components/SelectPayee';
import PayBills from './components/PayBills';
import Auth from './components/Auth';
import Donate from './components/Donate';  


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/send" element={<SendMoney />} />
        <Route path="/receive" element={<ReceiveMoney />} />
        <Route path="/pay-bills" element={<PayBills />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/auth" component={<Auth/>} />  
        <Route path="/select-payee" element={<SelectPayee />} />
      </Routes>
    </Router>
  );
}

export default App;
