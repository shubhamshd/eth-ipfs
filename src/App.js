import React, { Component, useEffect, useState } from "react";
import getWeb3 from './web3.js';
import contractJson from "./storeHash.json";
import ipfs from "./ipfs";
import './App.css';



function App(){
    const [state, setState] = useState({
        ipfsHash:null,
        buffer:'',
        ethAddress:'',
        blockNumber:'',
        transactionHash:'',
        gasUsed:'',
        txReceipt: '',
        web3: ''   
    });
    useEffect(() => {
        getWeb3().then((result) => {
            let web3 = result;
            console.log(web3);
            setState({ web3 : web3})
        });
        
    }, []);

    const handleChange = (event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader  = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => convertToBuffer(reader)    
    };
    const convertToBuffer = async(reader) => {
        const fileBuffer = await Buffer.from(reader.result);
        setState(values => ({...values, buffer : fileBuffer}))
    };
    const onSubmit = async (event) => {
        event.preventDefault();

        // const accounts = await ethereum.request({ method: 'eth_accounts' });
        const accounts = await state.web3.eth.getAccounts();
        const account = accounts[0];
        // const account = '0x0f0e08C2404E62bF0194a8fda2AE40a147e6C35E';
        console.log(account);        

        const networkId = await state.web3.eth.net.getId();
        const networkData = contractJson.networks[networkId];
        const storeHash = new state.web3.eth.Contract(contractJson.abi, networkData.address);

        const ethAddress = networkData.address
        setState(values => ({...values, ethAddress : ethAddress}))

        await ipfs.add( state.buffer, (err, ipfsHash) => {
            console.log(err, ipfsHash);
            console.log(ipfsHash[0].hash);
            // console.log(ipfsHash.length);

            setState(values => ({...values, ipfsHash : ipfsHash[0].hash }));
            console.log("progressing to contract sendHash method");
            try{
                storeHash.methods.sendHash(ipfsHash[0].hash).send( { from : account }, (err, transactionHash) => {
                    console.log(err, transactionHash);
                    setState(values => ({...values, transactionHash : transactionHash}));
                });
            }
            catch(err){
                console.log(err);
            }
            
        });

        // try {
        //     console.log(ipfsHash);
        //     await storeHash.methods.sendHash(state.ipfsHash).send( {from : accounts[0]}, (err, transactionHash) => {
        //         console.log(err, transactionHash);
        //         setState(values => ({...values, transactionHash : transactionHash}));
        //     });
        // }
        // catch(err){
        //     console.log(err);
        // }
    
    };

    const onClick = async (event) => {

        try {
            setState(values => ({...values, blockNumber : "waiting"}));
            setState(values => ({...values, gasUsed : "waiting"}));

            await state.web3.eth.getTransactionReceipt(state.transactionHash, (err, txReceipt) => {
                console.log(err, txReceipt);
                if(err){
                    console.log('failed to get txReceipt : ' + err);
                }
                else{
                    setState(values => ({...values, txReceipt : txReceipt}));
                    setState(values => ({...values, blockNumber : txReceipt.blockNumber}));
                    setState(values => ({...values, gasUsed : txReceipt.gasUsed}));
                }
            });
        }
        catch(error){
            console.log(error);
        } 
    };

    return (
        <div className="App">
            <header className="App-header">
            <h1> Ethereum and IPFS with Create React App</h1>
            </header>
            <hr />
            <h3> Choose file to send to IPFS </h3>
            <form onSubmit={onSubmit}>
                <input 
                    type = "file"
                    onChange = {handleChange}
                />
                <button  
                    type="submit"> 
                    Send it 
                </button>
            </form>
            <hr/>
            <button onClick = {onClick}> Get Transaction Receipt </button>
            <table bordered responsive>
                <thead>
                    <tr>
                        <th>Tx Receipt Category</th>
                        <th>Values</th>
                    </tr>
                </thead>
            
                <tbody>
                    <tr>
                        <td>IPFS Hash # stored on Eth Contract</td>
                        <td>{state.ipfsHash}</td>
                    </tr>
                    <tr>
                        <td>Ethereum Contract Address</td>
                        <td>{state.ethAddress}</td>
                    </tr>
                    <tr>
                        <td>Tx Hash # </td>
                        <td>{state.transactionHash}</td>
                    </tr>
                    <tr>
                    <td>Block Number # </td>
                        <td>{state.blockNumber}</td>
                    </tr>
                    <tr>
                        <td>Gas Used</td>
                        <td>{state.gasUsed}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default App;
