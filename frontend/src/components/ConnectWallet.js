import { useContext } from "react";
import { ethers } from 'ethers';
import { AppContext } from '../App.js';
import { Button } from 'react-bootstrap';

function ConnectWallet() {

    const {accounts,
        setAccounts,
        setSigner,
        setProvider} = useContext(AppContext);

    let myAccounts;

    // Requests access to the user's META MASK WALLET
    // https://metamask.io
    async function requestAccount() {
        console.log('Requesting account...');

        // ❌ Check if Meta Mask Extension exists 
        if(window.ethereum) {
            console.log('detected');
            try {
                myAccounts = await window.ethereum.request({
                method: "eth_requestAccounts",
                });
                setAccounts(myAccounts);
            } 
            catch (error) {
                console.log('Error connecting...');
            }
        } 
        else {
            alert('Meta Mask not detected');
        }
    }

    // Create a provider to interact with a smart contract
    async function connectWallet() {

        if(typeof window.ethereum !== 'undefined') {

            
            if(window.ethereum.networkVersion !== '4') {
                alert("Please switch to Rinkeby network!")
            }
            else {
                if(accounts === null) {
                    await requestAccount();
                }
    
                const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(web3Provider);
    
                let mySigner;
                if(accounts === null) {
                    mySigner = web3Provider.getSigner(myAccounts[0]);
                }
                else {
                    mySigner = web3Provider.getSigner(accounts[0]);
                }
                setSigner(mySigner);
            }
              
            window.ethereum.on('chainChanged', (chainId) => {
                // Handle the new chain.
                // Correctly handling chain changes can be complicated.
                // We recommend reloading the page unless you have good reason not to.
                setAccounts(null);
                window.location.reload();
            });
        }
    }

    return (
        <>
            <header>
            {accounts ? 
            <p>Wallet Address: {accounts[0]}</p> :
            <Button variant="outline-primary" onClick={connectWallet}>
                Connect Wallet
            </Button>
            }   
            </header>
        </>
    );
    }

    export default ConnectWallet;