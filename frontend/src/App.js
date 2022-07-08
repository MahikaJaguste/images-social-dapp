// import { useState, useEffect, createContext } from "react";
// import useLocalStorage from './hooks/useLocalStorage.js';
// import { ethers } from 'ethers';

// // wallet connection
// import { InjectedConnector } from "@web3-react/injected-connector";
// import { useWeb3React } from '@web3-react/core';

// // abi
// import STORAGE_ABI from './artifacts/contracts/ImageStorage.sol/ImageStorage.json';
// import ImageUpload from './components/ImageUpload.js';
// import ImageFeed from './components/ImageFeed.js';

// components
import ConnectWallet from './components/ConnectWallet.js';

function App() {

  return (
    <>
      <ConnectWallet/>
    </>
  );
}

export default App;