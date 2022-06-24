// import Web3 from 'web3';
// var HDWalletProvider = require("@truffle/hdwallet-provider");
// var mnemonic ="cliff first wrestle enforce remove assume door ensure degree airport renew velvet"
// var tokenKey ="b7a2be8a674b4ae4bc6e23c25f1b1ce6"

// // const web3 = new Web3(window.web3.currentProvider);
// // var provider = 'wss://rinkeby.infura.io/ws/v3/b7a2be8a674b4ae4bc6e23c25f1b1ce6';
// // var provider = 'https://rinkeby.infura.io/v3/b7a2be8a674b4ae4bc6e23c25f1b1ce6';
// // var provider = 'http://localhost:9545';
// // console.log(Web3.givenProvider);
// // // const web3 = new Web3(Web3.givenProvider || provider);
// // // const web3 = new Web3(new Web3.providers.WebsocketProvider(provider));
// var hd = new HDWalletProvider(mnemonic,"https://rinkeby.infura.io/v3/" + tokenKey);
// const web3 = new Web3(hd);
// if (window.ethereum){

// }
// console.log(Web3.currentProvider);
// export default web3;

import Web3 from 'web3';
let web3;
let getWeb3 = async () => {
    if (window.ethereum) {
        console.log('inside window.ethereum')
        return web3 = new Web3(window.ethereum);
    } else if (window.web3) {
        console.log('inside window.web3')
        return web3 = new Web3(window.web3.currentProvider);
        // Acccounts always exposed
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
}
    
export default getWeb3;