import { useState, useEffect, createContext } from "react";
import useLocalStorage from './hooks/useLocalStorage.js';
import { ethers } from 'ethers';
import STORAGE_ABI from './artifacts/contracts/ImageStorage.sol/ImageStorage.json';
import ConnectWallet from './components/ConnectWallet.js';
import ImageUpload from './components/ImageUpload.js';
import ImageFeed from './components/ImageFeed.js';

export const AppContext = createContext();

function App() {

  const [accounts, setAccounts] = useLocalStorage("accounts", null);
  const [signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null);
  const [storageContract, setStorageContract] = useState(null);

  const contextObj = {
    accounts,
    setAccounts,
    signer,
    setSigner,
    provider,
    setProvider,
    storageContract,
    setStorageContract,
  };

  useEffect(() => {
    // rinkeby
    const storageContractAddress = "0x81E1429974423ed3D93C953A300b1C2E094333eF"
    const myContract = new ethers.Contract(storageContractAddress, STORAGE_ABI.abi, provider);
    setStorageContract(myContract);
  }, [provider]);

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
              <ImageFeed/>
            </>
            
            : 
            <p>Please connect wallet to proceed!</p>
          }
    </AppContext.Provider>
  );
}

export default App;