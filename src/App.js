import { useState, useEffect } from 'react';

import Select from 'react-select';
import axios from 'axios';
import { currencyCodes } from './currencyLabel';
import 'dotenv/config';

import './App.css';


export default function App() {
  const [base, setBase] = useState(currencyCodes[145]); //USD
  const [pair, setPair] = useState(currencyCodes[43]); // EUR
  const [baseAmount, setBaseAmount] = useState(1);
  const [conversion, setConversion] = useState('');

  useEffect(() => {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}/pair/${base.value}/${pair.value}/${baseAmount}`;
    axios.get(url).then(res => {
      // console.log(`1 USD : ${res.data.conversion_result} EUR`);
      setConversion(res.data.conversion_result);
    }).catch(() => {
      // no error handling yet
    })
  }, [baseAmount, base]);

  const handleReverse = () => {
    const newBase = pair;
    const newPair = base;
    setBase(newBase);
    setPair(newPair);
  }

  return (
    <div>
      <h1>Currency Converter</h1>
      <h3>From</h3>
      <input
        value={baseAmount}
        onChange={e => setBaseAmount(e.target.value)}
      />
      <Select
        options={currencyCodes}
        value={base}
        onChange={setBase}
      />
      <button onClick={handleReverse}>Reverse</button>
      <h3>To</h3>
      <p>{conversion}</p>
      <Select
        options={currencyCodes}
        value={pair}
        onChange={setPair}
      />
    </div>
  );
}
