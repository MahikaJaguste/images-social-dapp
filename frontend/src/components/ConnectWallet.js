import { useEffect, useState } from "react";
import {
    VStack,
    Button,
    Text,
    HStack,
    Select,
    Input,
    Box
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { toHex, truncateAddress } from "../utils.js";

import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from  'ethers';

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
const signer = provider.getSigner();

function ConnectWallet() {

    const {
    chainId,
    account,
    activate,
    deactivate,
    active
    } = useWeb3React();

    const checkNetwork = async () => {
        if(chainId != Number(4)){
            try {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: toHex(4) }]
                });
            } 
            catch (switchError) {
                console.log(switchError);
            }
        }
    }
    

    const setProvider = (value) => {
        window.localStorage.setItem("provider", value);
    };

    const refreshState = () => {
        window.localStorage.setItem("provider", undefined);
    };

    const connect = () => {
        activate(injected);
        console.log('provider', provider);
        setProvider(true);
        checkNetwork();
    }

    const disconnect = () => {
        refreshState();
        deactivate();
    };

    useEffect(() => {
        const provider = window.localStorage.getItem("provider");
        if (provider === true) {
            activate(injected);
            checkNetwork();
        }
    }, []);

    useEffect(() => {
        console.log('in change')
        checkNetwork();
    }, [chainId]);

    return (
    <>
        <VStack justifyContent="center" alignItems="center" h="100vh">
        
            <HStack>
                {!active ? (
                <Button onClick={connect}>Connect Wallet</Button>
                ) : (
                <Button onClick={disconnect}>Disconnect</Button>
                )}
            </HStack>
            
            <VStack justifyContent="center" alignItems="center" padding="10px 0">
                <HStack>
                <Text>{`Connection Status: `}</Text>
                {active ? (
                    <CheckCircleIcon color="green" />
                ) : (
                    <WarningIcon color="#cd5700" />
                )}
                </HStack>

                <Tooltip label={account} placement="right">
                <Text>{`Account: ${truncateAddress(account)}`}</Text>
                </Tooltip>
                <Text>{`Network ID: ${chainId ? chainId : "No Network"}`}</Text>
            </VStack>
        
        </VStack>
        {provider}
    </>
    );
}
    
    export default ConnectWallet;