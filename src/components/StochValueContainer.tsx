import React, { useEffect, useState } from 'react';
import './StochValueContainer.scss';
import axios from "axios";

interface StochValueContainerProps {
    pairSymbol: string;
}

export function StochValueContainer(props: StochValueContainerProps) {
    const [countedStochs, setCountedStochs] = useState([]);

    useEffect(() => {
        const getKlines1h = getKlines(props.pairSymbol, "1h");
        const getKlines4h = getKlines(props.pairSymbol, "4h");
        const getKlines1d = getKlines(props.pairSymbol, "1d");
        axios.all([getKlines1h, getKlines4h, getKlines1d]).then(
            axios.spread((...allData) => {
                const countedStochs = allData.map(dataArray => calculateStoch(dataArray.data.slice(-14)));
                return {
                    symbol: props.pairSymbol,
                    countedStochs
                }
            })
        ).then((data) => {
            setCountedStochs(data.countedStochs as any)
        })

        function calculateStoch(last14records: any): number {
            const lastPrice = parseFloat(last14records[last14records.length-1][4]);
            const maxPrice = last14records.map((kline: any) => parseFloat(kline[2])).sort(compareNumbers)[last14records.length-1];
            const minPrice = last14records.map((kline: any) => parseFloat(kline[3])).sort(compareNumbers)[0];

            return 100*(lastPrice - minPrice)/(maxPrice - minPrice);
        }
    }, [props.pairSymbol])

    return (
        <div className='stoch-value-container'>
            <span className='pair-symbol'>{props.pairSymbol}</span>
            {
                countedStochs.map((value: any) => {
                    return (
                        <span
                            key={Math.random()*10}
                            className='stoch-value'>
                            {value.toFixed(2)}
                        </span>
                    )
                })
            }
        </div>
    );

    function getKlines(symbol: string, interval: string) {
        return axios.get('https://api.binance.com/api/v1/klines', {
            params: {
                symbol,
                interval
            }
        })
    }



    function compareNumbers(a: number, b: number): number {
        return a - b;
    }
}

