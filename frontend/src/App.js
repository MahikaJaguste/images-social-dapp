import { createContext, useEffect } from "react";
import { ethers } from  'ethers';
import { useWeb3React } from "@web3-react/core";

// abi
import STORAGE_ABI from './artifacts/contracts/ImageStorage.sol/ImageStorage.json';

// components
import ConnectWallet from './components/ConnectWallet.js';
import ImageUpload from './components/ImageUpload.js';
import ImageFeed from './components/ImageFeed.js';

// context
export const AppContext = createContext();

function App() {

  const { active } = useWeb3React();
  
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const storageContractAddress = "0x81E1429974423ed3D93C953A300b1C2E094333eF";
  const storageContract = new ethers.Contract(storageContractAddress, STORAGE_ABI.abi, provider);

  const contextObj = {
    provider,
    signer,
    storageContract
  }

  return (
    <AppContext.Provider value={contextObj}>
      <ConnectWallet/>
      {active?<ImageUpload/>: <p>Connect Wallet to Upload</p>}
      <br/>
      <br/>
      <ImageFeed/>
    </AppContext.Provider>
  );
}

export default App;