import { useState, useContext, useEffect } from "react";
import { AppContext } from '../App.js';
import { Card } from 'react-bootstrap';

function ImageUpload() {

  const { storageContract } = useContext(AppContext);

  const [urlArr, setUrlArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getImages(); 
  }, [], [storageContract])

  async function getImages() {
    if(storageContract !== null){
      setIsLoading(true);
      const imgCounter = await storageContract.imgCounter();
      console.log(imgCounter);
      // let arr = []
      // for(let i = imgCounter; i >= 1; i--) {
      //     const result = await storageContract.images(i);
      //     arr.push(result);
      //     setUrlArr(arr);
      // }
      setIsLoading(false);
    }
  }

  return (
    <>
    {urlArr.length === 0 ?
      isLoading ? <h3>Loading images</h3>:<h3>Upload data</h3>
        : 
          urlArr.map((el, index) => 
            <Card key={index}>
            <Card.Body>
                <img src={`https://ipfs.infura.io/ipfs/${el[1]}`} alt={`${index}`} />
            </Card.Body>
            </Card>)
    }
    {urlArr}
    </>

  )
}




export default ImageUpload;

//'https://ipfs.infura.io/ipfs/QmPSiu9L3baUZcPAcmKA33sgZqXuY7vbtHQxUSGkCmVAeJ'