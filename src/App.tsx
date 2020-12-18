import React, { useEffect, useState } from 'react';
import './App.scss';
import axios, { AxiosResponse } from "axios";
import { StochValueContainer } from './components/StochValueContainer';

function App() {
    const [symbols, setSymbols] = useState([]);
  let symbolsUSDT;
  let symbolsBUSD;

  const pairs = [];

  let pairSymbols;

    useEffect(() => {
        axios.get('https://api.binance.com/api/v1/exchangeInfo').then(response => {
            const symbols = response.data.symbols.filter((symbol: any) => symbol.status === 'TRADING');
            symbolsUSDT = symbols.filter((symbol: any) => symbol.quoteAsset === 'USDT');
            symbolsBUSD = symbols.filter((symbol: any) => symbol.quoteAsset === 'BUSD');
            pairSymbols = symbolsUSDT.map((obj: any) => obj.symbol);
            setSymbols(pairSymbols);
        });
    }, [])

  return (
    <div className="App">
        <h2>Stoch index for 1h, 4h, 1d periods</h2>

        <div className='table-container'>
            <div className='stoch-value-container header'>
                <span className='pair-symbol'>Pair symbol</span>
                <span className='stoch-value'>Stoch 1h</span>
                <span className='stoch-value'>Stoch 4h</span>
                <span className='stoch-value'>Stoch 1d</span>
            </div>
            {symbols.map(pairSymbol => {
                return <StochValueContainer key={pairSymbol} pairSymbol={pairSymbol}/>
            })}
        </div>
    </div>
  );
}

export default App;
