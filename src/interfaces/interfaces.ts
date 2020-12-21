export interface Kline {
    openTime: number;
    price: Price;
    volume: string;
    closeTime: number;
    quoteAssetVolume: string;
    numberOfTrades: number;
}

export interface Price {
    open: string;
    high: string;
    low: string;
    close: string;
}
