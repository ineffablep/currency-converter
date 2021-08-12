import React from 'react';
import CurrencyConverter from './CurrencyConverter';
import './App.css';

function App() {
  return (
    <div className="container">
      <header className="App-header">
        EUR USD Converter
      </header>
      <CurrencyConverter />
    </div>
  );
}

export default App;
