import { create } from "middleware-axios";


// middlewares API coinbase.
export const apiCoins = create({
    baseURL: "https://api.coinbase.com/v2/"
})