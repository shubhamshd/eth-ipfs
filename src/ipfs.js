const ipfsapi = require('ipfs-api');

const ipfs = ipfsapi('localhost', '5001', {protocol : 'http'});

export default ipfs;