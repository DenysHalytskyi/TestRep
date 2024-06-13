
async function getPriceBitcoin() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();

        document.getElementById("bitcoinPrice").innerHTML = `$${data.bitcoin.usd}`;
    } catch (error) {
        console.error('Error when receiving cryptocurrency rate:', error);
    }
}

async function getPriceEthereum() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();

        document.getElementById("EthereumPrice").innerHTML = `$${data.ethereum.usd}`;
    } catch (error) {
        console.error('Error when receiving cryptocurrency rate:', error);
    }
}

async function getPriceTether() { 
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd');
        const data = await response.json();

        document.getElementById("TetherPrice").innerHTML = `$${data.tether.usd}`;
    } catch (error) {
        console.error('Error when receiving cryptocurrency rate:', error);
    }
}

async function getPriceSolana() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const data = await response.json();

        document.getElementById("SolanaPrice").innerHTML = `$${data.solana.usd}`;
    } catch (error) {
        console.error('Error when receiving cryptocurrency rate:', error);
    }
}

async function getPriceDogecoin() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd');
        const data = await response.json();

        document.getElementById("DogecoinPrice").innerHTML = `$${data.dogecoin.usd}`;
    } catch (error) {
        console.error('Error when receiving cryptocurrency rate:', error);
    }
}

async function getPricePepe() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=pepe&vs_currencies=usd');
        const data = await response.json();

        document.getElementById("PepePrice").innerHTML = `$${data.pepe.usd}`;
    } catch (error) {
        console.error('Error when receiving cryptocurrency rate:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getPriceBitcoin();
    getPriceEthereum();
    getPriceTether();
    getPriceSolana();
    getPriceDogecoin();
    getPricePepe();
});
