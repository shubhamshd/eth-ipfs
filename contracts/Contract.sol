pragma solidity ^0.5.16;

contract Contract {
    string ipfsHash;

    function sendHash( string memory x ) public {
        ipfsHash = x;
    }

    function getHash () public returns ( string memory x) {
        return ipfsHash;
    }
}