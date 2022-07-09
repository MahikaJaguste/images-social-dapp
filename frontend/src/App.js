import { createContext, useEffect } from "react";
import { ethers } from  'ethers';
import { useWeb3React } from "@web3-react/core";

// abi
import STORAGE_ABI from './artifacts/contracts/ImageStorage.sol/ImageStorage.json';

// components
import ConnectWallet from './components/ConnectWallet.js';
import ImageUpload from './components/ImageUpload.js';
import ImageFeed from './components/ImageFeed.js';

import { Flex, Container, Box, Heading, Spacer, ButtonGroup, Button, Center } from '@chakra-ui/react';

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

      <Flex as="header" position="fixed" backgroundColor="rgba(255, 255, 255, 0.8)" backdropFilter="saturate(180%) blur(5px)"  w="100%"  h="10%"
        minWidth='max-content' alignItems='center' gap='2'>
              {/* <Center w='100%'> */}
              <Heading as='h3' size='2xl' marginLeft='175px' position='absolute'>DGallery</Heading>
              {/* </Center> */}
          <Spacer />
          <ButtonGroup gap='2' >
            {active?<ImageUpload/>:null} 
            <ConnectWallet/>
          </ButtonGroup>
        
      </Flex>
      <Box as="main" paddingTop={12}> 
        <br/>
        <br/>
        <ImageFeed/>
      </Box>
        
    </AppContext.Provider>
  );
}

export default App;