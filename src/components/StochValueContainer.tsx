import React, { useEffect, useState } from 'react';
import './StochValueContainer.scss';
import axios from "axios";
import { Kline } from "../interfaces/interfaces";

interface StochValueContainerProps {
    symbol: string;
    stochData: Array<string>;
    volume: string;
}

export function StochValueContainer(props: StochValueContainerProps) {
    const coinSymbol = props.symbol.split('USDT');
    const pairUrl = `https://www.binance.com/en/trade/${coinSymbol.join('_USDT')}`

    return (
        <div className='stoch-value-container'>
            <span className='pair-symbol'><a href={pairUrl} target='_blank'>{coinSymbol}</a></span>
            {props.stochData.map(stochValue => {
                const value = parseFloat(stochValue);
                return (
                    <span
                        key={Math.random()*10}
                        className='stoch-value'
                        style={calculateBgColor(value)}
                    >
                            {value.toFixed(2)}
                        </span>
                )
            })}
            <span className='stoch-value'>{props.volume}</span>
        </div>
    );

    function calculateBgColor(value: number): any {
        return { backgroundColor: value <= 20 ? `rgba(0,255,0,${1 - 3*value/100})` : 'inherit' }
    }
}

