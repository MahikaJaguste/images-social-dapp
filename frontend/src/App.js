import { useState, useEffect, createContext } from "react";
import useLocalStorage from './hooks/useLocalStorage.js';
import { ethers } from 'ethers';
import STORAGE_ABI from './artifacts/contracts/ImageStorage.sol/ImageStorage.json';
import ConnectWallet from './components/ConnectWallet.js';
import ImageUpload from './components/ImageUpload.js';
// import WithdrawForm from './components/WithdrawForm.js';
// import Balances from './components/Balances.js';

export const AppContext = createContext();

function App() {

  const [accounts, setAccounts] = useLocalStorage("accounts", null);
  const [signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null);
  const [storageContract, setStorageContract] = useState(null);
  const [imgCounter, setImgCounter] = useState(null);

  const contextObj = {
    accounts,
    setAccounts,
    signer,
    setSigner,
    provider,
    setProvider,
    storageContract,
    setStorageContract,
    imgCounter,
    setImgCounter
  };

  // useEffect(() => {
  //   // rinkeby
  //   const storageContractAddress = ""
  //   const myContract = new ethers.Contract(storageContractAddress, STORAGE_ABI.abi, provider);
  //   setStorageContract(myContract);
  // }, [provider]);

  return (
    <AppContext.Provider value={contextObj}>
        
          <ConnectWallet/>
          <br/>
          {accounts ? 
            <>
              <h1>Images Social Dapp</h1>
              <br/>
              <br/>
              <ImageUpload/>
            </>
            
            : 
            <p>Please connect wallet to proceed!</p>
          }
    </AppContext.Provider>
  );
}

export default App;