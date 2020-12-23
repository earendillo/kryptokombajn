import React, { useEffect, useState } from 'react';
import './App.scss';
import axios, { AxiosResponse } from "axios";
import { StochValueContainer } from './components/StochValueContainer';
import { LoadingIndicator } from "./components/LoadingIndicator";
import { Kline } from "./interfaces/interfaces";

interface CryptoData {
    symbol: string;
    stochs: Array<string>;
    volume: any;
}

function App() {
    const [symbols, setSymbols] = useState([]);
    const [cryptoData, setCryptoData] = useState<Array<CryptoData>>([]);
    const [isLoading, setLoadingStatus] = useState<boolean>(false);
    let symbolsUSDT;
    let symbolsBUSD;
    let pairSymbols;

    useEffect(() => {
        axios.get('https://api.binance.com/api/v1/exchangeInfo').then(response => {
            const symbols = response.data.symbols.filter((symbol: any) => symbol.status === 'TRADING');
            symbolsUSDT = symbols.filter((symbol: any) => symbol.quoteAsset === 'USDT');
            symbolsBUSD = symbols.filter((symbol: any) => symbol.quoteAsset === 'BUSD');
            pairSymbols = symbolsUSDT.map((obj: any) => obj.symbol.trim());
            setSymbols(pairSymbols as any);
            setLoadingStatus(true);
        })
    }, [])

    useEffect(() => {
        if (symbols?.length) {
            symbols.forEach(async (symbol) => {
                const data: Array<Array<Kline>> = await axios.all([getKlines(symbol, '1h'), getKlines(symbol, '4h'), getKlines(symbol, '1d')]) as any;
                const last24hKline: Kline = data[2][data[2].length - 1];
                const cryptoDataForSymbol: CryptoData = {
                    symbol,
                    stochs: data.map(calculateStoch),
                    volume: calculateVolume(last24hKline)
                }
                setCryptoData((oldArray) => [...oldArray, cryptoDataForSymbol])
            })
        }
    }, [symbols])

    useEffect(() => {
        if (symbols.length === cryptoData.length) {
            const cryptoDataSortedByVolume = [...cryptoData].sort((a, b) => {
                return b.volume - a.volume;
            })
            setCryptoData(cryptoDataSortedByVolume);
            setLoadingStatus(false);
        }
    }, [cryptoData, symbols])

    return (
        <div className="App">
            <h2>Stoch index for 1h, 4h, 1d periods</h2>

            <div className='table-container'>
                <div className='stoch-value-container header'>
                    <span className='pair-symbol'>Pair symbol</span>
                    <span className='stoch-value'>Stoch 1h</span>
                    <span className='stoch-value'>Stoch 4h</span>
                    <span className='stoch-value'>Stoch 1d</span>
                    <span className='stoch-value'>Volume, M USDT</span>
                </div>
                { !isLoading && cryptoData.length && cryptoData.length === symbols.length ? renderCryptoData() : <LoadingIndicator/> }
            </div>
        </div>
    );

    function renderCryptoData() {
        return cryptoData.map((data) => {
            return <StochValueContainer symbol={data.symbol} stochData={data.stochs} volume={data.volume} />
        })
    }

    // function sortByVolume() {
    //     const cryptoDataSortedByVolume = [...cryptoData].sort((a, b) => {
    //         return b.volume - a.volume;
    //     })
    //     setCryptoData(cryptoDataSortedByVolume);
    // }

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

    function calculateStoch(klineData: Array<Kline>): string {
        const lastPrice = parseFloat(klineData[klineData.length - 1].price.close);
        const maxPrice = klineData.map((kline: Kline) => parseFloat(kline.price.high)).sort(compareNumbers)[klineData.length - 1];
        const minPrice = klineData.map((kline: Kline) => parseFloat(kline.price.low)).sort(compareNumbers)[0];
        return (100 * (lastPrice - minPrice) / (maxPrice - minPrice)).toFixed(2);
    }

    function calculateVolume(kline: Kline): string {
        const coinVolume: number = parseFloat(kline.volume);
        const klineAveragePrice = (parseFloat(kline.price.high) + parseFloat(kline.price.low))/2;
        return (coinVolume * klineAveragePrice / 1000000).toFixed(2);
    }

    function calculateBgColor(value: number): any {
        return {backgroundColor: value <= 20 ? `rgba(0,255,0,${1 - 3 * value / 100})` : 'inherit'}
    }

    function compareNumbers(a: number, b: number): number {
        return a - b;
    }
}

export default App;
