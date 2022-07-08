import { useState, useContext } from "react";
import { AppContext } from '../App.js';
import { create } from "ipfs-http-client";
import { Buffer } from 'buffer';

// @ts-ignore
window.Buffer = Buffer;
const client = create("https://ipfs.infura.io:5001/api/v0");

function ImageUpload() {

  const {signer, storageContract } = useContext(AppContext);

  const [image, setImage] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
     <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" onChange={(e) => setImgTitle(e.target.value)}/>
        <br/>
        <label>Add Image</label>
        <input type="file" accept="image/*" onChange={retrieveFile}/>
        <button disabled={isLoading} type="submit">
          {isLoading ? 'Processing...' : 'Add'}
        </button>
    </form>
 

  )
}




export default ImageUpload;