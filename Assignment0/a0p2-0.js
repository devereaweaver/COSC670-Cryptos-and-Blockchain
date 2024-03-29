/* a0p2-0.js - Returns the amount of ETH in a given wallet. */

"use strict";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const formatter = new Intl.NumberFormat('en-US', {
    /* Use a JS class to change the currency display format */
    style: 'currency',
    currency: 'USD',
});

async function getEthBalance(wallet) {
    /* Get the latest current ETH balance of the given wallet */
    try {
        if (!process.env.ETHERSCAN_API_TOKEN) {    // don't forget your 🔑
            throw new Error("You forgot to set your API token.");
        }

        const currentDate = new Date();
        const walletData = await axios.get('https://api.etherscan.io/api' +
                '?module=account' + 
                '&action=balance' +
                `&address=${wallet}` +
                '&tag=latest' +
                `&apikey=${process.env.ETHERSCAN_API_TOKEN}`);

        // wei -> ETH 
        const ethBalance = (walletData.data.result) * (Math.pow(10,-18));    

        // ETH -> USD  (current price * ETH held)
        const ethusdPrice = await getEthLastPrice();
        const usdBalance = ethBalance * ethusdPrice;

        console.log(`\nWallet Address: ${wallet}\nWallet ETH Balance: ${ethBalance}`);
        console.log(`Total USD Value: ${formatter.format(usdBalance)}  (@ current price: ${formatter.format(ethusdPrice)})`);
        console.log(`Timestamp: ${currentDate.toDateString()} ${currentDate.toTimeString()}\n`);
    } catch (error) {
        console.log(error);
    }
}

async function getEthLastPrice() {
    /* Get the latest ETH-USD price 💰💰💰 */
    try {
        const response = await axios.get('https://api.etherscan.io/api' + 
                '?module=stats' + 
                '&action=ethprice' +
                `&apikey=${process.env.ETHERSCAN_API_TOKEN}`);
        return response.data.result.ethusd;
    } catch (error) {
        console.log(error);
    }
}

getEthBalance('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');