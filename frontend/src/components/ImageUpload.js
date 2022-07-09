import { useState, useContext } from "react";
import { AppContext } from '../App.js';
import { create } from "ipfs-http-client";
import { Buffer } from 'buffer';

import { useDisclosure, Button, Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalContent, ModalBody, ModalFooter,
  FormControl, FormLabel, Input} from '@chakra-ui/react';

// @ts-ignore
window.Buffer = Buffer;
const client = create("https://ipfs.infura.io:5001/api/v0");

function ImageUpload() {

  const {signer, storageContract } = useContext(AppContext);

  const [image, setImage] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    if(data['type'].split('/')[0] === 'image'){
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(data);
      reader.onloadend = () => {
        setImage(Buffer(reader.result));
      };
    } 
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(image){
      try {
        setIsLoading(true);
        console.log('in here')
        const created = await client.add(image);
        console.log(created.path)
        const txn = await storageContract.connect(signer).addImage(imgTitle, created.path);
        await txn.wait();
        setIsLoading(false);
        window.location.reload();
      } 
      catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
  
    <>
      <Button colorScheme='teal' variant='outline' onClick={onOpen}>Add Image</Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg='none'
          backdropFilter='auto'
          backdropInvert='80%'
          backdropBlur='2px'
        />
        <ModalContent>
          <ModalHeader>Upload Image to DGallery</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor='imgTitle'>Image Title</FormLabel>
              <Input id='imgTitle' placeholder='Capture your image in a few words' size='md' 
                    type="text" onChange={(e) => setImgTitle(e.target.value)}/>
            </FormControl>
            <br/>
            <FormControl isRequired>
              <FormLabel htmlFor='imgFile'>Image File</FormLabel>
              <input id='imgFile'
                    type="file" accept="image/*" onChange={retrieveFile}/>
            </FormControl>

            {/*
              <button disabled={isLoading} type="submit">
                {isLoading ? 'Processing...' : 'Add'}
              </button>
            </form> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='teal' variant='outline' onClick={handleSubmit}
            isLoading={isLoading} loadingText='Processing' type="submit">Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  )
}


{/*  */}


export default ImageUpload;