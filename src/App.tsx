import React from 'react';
import './App.scss';
import { StochValueContainer } from './components/StochValueContainer';

function App() {
  const standard = [
      'BTCUSDT',
      'FLMUSDT',
      'FTTUSDT',
      'CRVUSDT',
      'ETHUSDT',
      'FIOUSDT',
      'UNFIUSDT',

  ];

  const innovationZones = [
      'XVSUSDT',
      'WNXMUSDT',
      'WINGUSDT',
      'UNFIUSDT',
      'SUSHIUSDT',
      'SUSDUSDT',
      'SUNUSDT',
      'NBSUSDT',
      'HARDUSDT',
      'FLMUSDT'
  ]

  const pairSymbols = innovationZones;

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
            {pairSymbols.map(pairSymbol => {
                return <StochValueContainer key={pairSymbol} pairSymbol={pairSymbol}/>
            })}
        </div>
    </div>
  );
}

export default App;
