import React, { useEffect, useState } from 'react';
import './StochValueContainer.scss';
import axios from "axios";

interface StochValueContainerProps {
    pairSymbol: string;
}

interface Kline {
    openTime: number;
    price: Price;
    volume: string;
    closeTime: number;
    quoteAssetVolume: string;
    numberOfTrades: number;
}

interface Price {
    open: string;
    high: string;
    low: string;
    close: string;
}

export function StochValueContainer(props: StochValueContainerProps) {
    const [countedStochs, setCountedStochs] = useState([]);
    const [volume, setVolume] = useState('')

    useEffect(() => {
        const getKlines1h: Promise<Array<Kline>> = getKlines(props.pairSymbol, "1h");
        const getKlines4h: Promise<Array<Kline>> = getKlines(props.pairSymbol, "4h");
        const getKlines1d: Promise<Array<Kline>> = getKlines(props.pairSymbol, "1d");
        axios.all([getKlines1h, getKlines4h, getKlines1d]).then(
            axios.spread((...allData: Array<Array<Kline>>) => {
                const countedStochs = allData.map(dataArray => calculateStoch(dataArray));
                const dayRecord = allData[2];
                const lastDayData = dayRecord[dayRecord.length - 1];
                const coinVolume: number = parseFloat(lastDayData.volume);
                const lastDayAveragePrice = (parseFloat(lastDayData.price.high) + parseFloat(lastDayData.price.low))/2;
                const volume = (coinVolume * lastDayAveragePrice / 1000000).toFixed(2);
                return {
                    symbol: props.pairSymbol,
                    countedStochs,
                    volume1d: volume
                }
            })
        ).then((data) => {
            setCountedStochs(data.countedStochs as any)
            setVolume(data.volume1d as any)
        })

        function calculateStoch(last14records: Array<Kline>): number {
            console.log(last14records);
            const lastPrice = parseFloat(last14records[last14records.length-1].price.close);
            const maxPrice = last14records.map((kline: Kline) => parseFloat(kline.price.high)).sort(compareNumbers)[last14records.length-1];
            const minPrice = last14records.map((kline: Kline) => parseFloat(kline.price.low)).sort(compareNumbers)[0];
            console.log(lastPrice, maxPrice, minPrice);
            return 100*(lastPrice - minPrice)/(maxPrice - minPrice);
        }
    }, [props.pairSymbol])

    const pair = props.pairSymbol.split('USDT').join('_USDT');
    const pairUrl = `https://www.binance.com/en/trade/${pair}`

    return (
        <div className='stoch-value-container'>
            <span className='pair-symbol'><a href={pairUrl} target='_blank'>{props.pairSymbol}</a></span>
            {
                countedStochs.map((value: any) => {
                    return (
                        <span
                            key={Math.random()*10}
                            className='stoch-value'
                            style={calculateBgColor(value)}
                        >
                            {value.toFixed(2)}
                        </span>
                    )
                })
            }
            <span className='stoch-value'>{volume}</span>
        </div>
    );

    function getKlines(symbol: string, interval: string) {
        return axios.get('https://api.binance.com/api/v3/klines', {
            params: {
                symbol,
                interval,
                limit: 14
            }
        }).then((response: any) => {
            const klines: Array<Kline> = response.data.map((kline: Array<any>) => {
                return {
                    openTime: kline[0],
                    price: {
                        open: kline[1],
                        high: kline[2],
                        low: kline[3],
                        close: kline[4]
                    },
                    volume: kline[5],
                    closeTime: kline[6],
                    quoteAssetVolume: kline[7],
                    numberOfTrades: kline[8]
                }
            })
            return klines;
        })
    }

    function calculateBgColor(value: number): any {
        return { backgroundColor: value <= 20 ? `rgba(0,255,0,${1 - 3*value/100})` : 'inherit' }
    }

    function compareNumbers(a: number, b: number): number {
        return a - b;
    }
}

