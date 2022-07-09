import { useState, useContext, useEffect } from "react";
import { Card } from 'react-bootstrap'
import { AppContext } from '../App.js';
import img1 from '../images-assets/bulb.jpg';
import img2 from '../images-assets/butterfly.jpg';
import img3 from '../images-assets/car-hand.jpg';
import img4 from '../images-assets/chain.jpg';
import img5 from '../images-assets/jar.jpg';
import img6 from '../images-assets/lamps.jpg';
import img7 from '../images-assets/leaf.jpg';
import img8 from '../images-assets/light-flower.jpg';
import img9 from '../images-assets/marriage.jpg';
import img10 from '../images-assets/rain.jpg';
import img11 from '../images-assets/rose.jpg';
import img12 from '../images-assets/camera.jpg';

import { Box, SimpleGrid, Image, AspectRatio, WrapItem, Wrap } from '@chakra-ui/react';

function ImageUpload() {

  const { storageContract } = useContext(AppContext);

  const [urlArr, setUrlArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getImages(); 
  }, [])

  let arr =[img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12]


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
      isLoading ? <h3>Loading images</h3>:<h3>No data</h3>
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
                fallbackSrc='https://via.placeholder.com/150'
                object-fit='cover'
              />
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