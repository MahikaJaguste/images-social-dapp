import { useState, useContext, useEffect, useRef } from "react";
import { Card } from 'react-bootstrap'
import { AppContext } from '../App.js';
import img1 from '../images-assets/placeholder.webp';

import { Box, SimpleGrid, Image, AspectRatio, WrapItem, Wrap, Circle, Spinner , Center, useDisclosure} from '@chakra-ui/react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

function ImageUpload() {

  const { storageContract } = useContext(AppContext);

  const [urlArr, setUrlArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    getImages(); 
  }, [])


  async function getImages() {
    if(storageContract !== null){
      setIsLoading(true);
      const imgCounter = await storageContract.imgCounter();
      let arr = []
      for(let i = imgCounter; i >= 1; i--) {
          const result = await storageContract.images(i);
          arr.push(result);
      }
      setUrlArr(arr);
      setIsLoading(false);
    }
  }

  return (
    <>
    {urlArr.length == 0 ?
      isLoading ? 
      <Center w='100%' marginTop='15%'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='teal.500'
          size='xl'
        />

      </Center>
      :
      <Center w='100%' marginTop='15%'>
        <h3>No data uploaded</h3>
      </Center>
        : 
          <Wrap px="1rem" spacing={4} justify="center">
          {urlArr.map((el, index) => (
            <WrapItem
              key={index}
              boxShadow="base"
              rounded="20px"
              overflow="hidden"
              bg="white"
              lineHeight="0"
              _hover={{ boxShadow: "dark-lg" }}
            >
              <Image
                height={600}
                width={400}
                src={`https://ipfs.infura.io/ipfs/${el[1]}`} 
                alt={`${el[1]}`}
                fallbackSrc={img1}
                object-fit='cover'
                onClick={() => setModalData([el[0], el[1], el[2]])}
              />
              <Modal isOpen={modalData ? true : false}
                  onClose={() => setModalData(null)}
                  isCentered size='lg'>
                <ModalOverlay 
                  bg='none'
                  backdropFilter='auto'
                  backdropInvert='80%'
                  backdropBlur='2px'/>
                <ModalContent>
                  <ModalHeader>{modalData?modalData[0]:null}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                  {modalData?"by " + modalData[2]:null}
                  <br/>
                  {modalData?"at CID " + modalData[1]:null}
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme='red' variant='outline' mr={3} onClick={() => setModalData(null)}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </WrapItem>
          ))}
        </Wrap>
        // <Wrap px="1rem" spacing={4} justify="center">
        //   {arr.map((el, index) => (
        //     <WrapItem
        //       key={index}
        //       boxShadow="base"
        //       rounded="20px"
        //       overflow="hidden"
        //       bg="white"
        //       lineHeight="0"
        //       _hover={{ boxShadow: "dark-lg" }}
        //     >
        //       <Image
        //         height={600}
        //         width={400}
        //         src={el} 
        //         alt='Photos'
        //         fallbackSrc='https://via.placeholder.com/150'
        //         object-fit='cover'
        //       />
        //     </WrapItem>
        //   ))}
        // </Wrap>
    }
    
    </>

  )
}




export default ImageUpload;

//'https://ipfs.infura.io/ipfs/QmPSiu9L3baUZcPAcmKA33sgZqXuY7vbtHQxUSGkCmVAeJ'