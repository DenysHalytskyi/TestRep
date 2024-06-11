
async function getCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,litecoin,cardano,polkadot&vs_currencies=usd');
        const data = await response.json();
        
        // Виведення курсу криптовалют в консоль
        console.log("Ціни криптовалют:");
        console.log("Bitcoin (BTC):", data.bitcoin.usd);
        console.log("Ethereum (ETH):", data.ethereum.usd);
        console.log("Ripple (XRP):", data.ripple.usd);
        console.log("Litecoin (LTC):", data.litecoin.usd);
        console.log("Cardano (ADA):", data.cardano.usd);
        console.log("Polkadot (DOT):", data.polkadot.usd);
    } catch (error) {
        console.error('Помилка при отриманні курсу криптовалют:', error);
    }
}
//getCryptoPrices();
    

async function getPriceBitcoin() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();

        document.getElementById("bitcoinPrice").innerHTML = `$${data.bitcoin.usd}`;
    } catch (error) {
        console.error('Помилка при отриманні курсу криптовалют:', error);
    }
}

async function getPriceEthereum() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();

        document.getElementById("EthereumPrice").innerHTML = `$${data.ethereum.usd}`;
    } catch (error) {
        console.error('Помилка при отриманні курсу криптовалют:', error);
    }
}

async function getPriceTether() { // виправлено назву функції
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd');
        const data = await response.json();

        document.getElementById("TetherPrice").innerHTML = `$${data.tether.usd}`;
    } catch (error) {
        console.error('Помилка при отриманні курсу криптовалют:', error);
    }
}

async function getPriceSolana() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const data = await response.json();

        document.getElementById("SolanaPrice").innerHTML = `$${data.solana.usd}`;
    } catch (error) {
        console.error('Помилка при отриманні курсу криптовалют:', error);
    }
}

async function getPriceDogecoin() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd');
        const data = await response.json();

        document.getElementById("DogecoinPrice").innerHTML = `$${data.dogecoin.usd}`;
    } catch (error) {
        console.error('Помилка при отриманні курсу криптовалют:', error);
    }
}

async function getPricePepe() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=pepe&vs_currencies=usd');
        const data = await response.json();

        document.getElementById("PepePrice").innerHTML = `$${data.pepe.usd}`;
    } catch (error) {
        console.error('Помилка при отриманні курсу криптовалют:', error);
    }
}

// Виклик функцій для отримання курсу криптовалют після завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
    getPriceBitcoin();
    getPriceEthereum();
    getPriceTether();
    getPriceSolana();
    getPriceDogecoin();
    getPricePepe();
});
