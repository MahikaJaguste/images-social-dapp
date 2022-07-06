import { useState, useContext, useEffect } from "react";
import { AppContext } from '../App.js';
import { create } from "ipfs-http-client";
import { Card } from 'react-bootstrap';
import { Buffer } from 'buffer';

// @ts-ignore
window.Buffer = Buffer;
const client = create("https://ipfs.infura.io:5001/api/v0");

function ImageUpload() {

  const {signer, storageContract, imgCounter} = useContext(AppContext);

  const [urlArr, setUrlArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    for(let i = imgCounter; i >= 1; i--) {
        const result = await storageContract.connect(signer).images(i);
        setUrlArr(...urlArr, result);
    }
    setIsLoading(false);
  }, [])

  return (
    <>
    {urlArr.length !== 0
          ? 
          urlArr.map((el, index) => 
            <Card>
            <Card.Body>
                <img key={index} src={`https://ipfs.infura.io/ipfs/${el}`} alt={`Image${index}`} />
            </Card.Body>
            </Card>)
          : 
          <h3>Upload data</h3>
    }
    </>

  )
}




export default ImageUpload;

//'https://ipfs.infura.io/ipfs/QmPSiu9L3baUZcPAcmKA33sgZqXuY7vbtHQxUSGkCmVAeJ'