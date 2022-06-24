require('dotenv').config();
var HDWalletProvider = require("@truffle/hdwallet-provider");
// var mnemonic = process.env["MNEMONIC"];
// var tokenKey = process.env["ENDPOINT_KEY"];
var mnemonic ="cliff first wrestle enforce remove assume door ensure degree airport renew velvet"
var tokenKey ="b7a2be8a674b4ae4bc6e23c25f1b1ce6"

module.exports = {

    networks : {
        
        development: {
            host: "localhost",
            port: 9545,
            network_id: "*" // Match any network id
        },

        rinkeby: {
            provider: function() {
              return new HDWalletProvider(mnemonic,"wss://rinkeby.infura.io/ws/v3/" + tokenKey);
            },
            network_id: 4
        }
    }
};