import { useEffect, useState } from "react";
import {
    VStack,
    Button,
    Text,
    HStack
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { toHex, truncateAddress } from "../utils.js";

import { InjectedConnector } from "@web3-react/injected-connector";

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

function ConnectWallet() {

    const {
    chainId,
    account,
    activate,
    deactivate,
    active
    } = useWeb3React();

    const checkNetwork = async () => {
        if(chainId && chainId != Number(4)){
            alert('Switch to rinkeby chain')
            try {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: toHex(4) }]
                });
            } 
            catch (switchError) {
                console.log(switchError);
            }
        }
    }

    const connect = () => {
        activate(injected);
        window.localStorage.setItem("provider", true);
        checkNetwork();
    }

    const disconnect = () => {
        window.localStorage.setItem("provider", undefined);
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
    </>
    );
}
    
    export default ConnectWallet;