import { useState, useContext } from "react";
import { AppContext } from '../App.js';
import { create } from "ipfs-http-client";
import { Card, Form, Button } from 'react-bootstrap';
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
        await storageContract.connect(signer).addImage(imgTitle, created.path);
        setIsLoading(false);
      } 
      catch (error) {
        console.log(error.message);
      }
    }
  };


  return (
  
    <Card>
    <Card.Body>

    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <br/>
        <Form.Control type="text"
                onChange={(e) => setImgTitle(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Add Image</Form.Label>
          <br/>
          <Form.Control type="file" 
                accept="image/*"
                onChange={retrieveFile}/>
        </Form.Group>
        {/* <Form.Text className="text-muted">
        {coinToBeBorrowed ? <p>You can borrow approximately {coinToBeBorrowed} MSC.</p> : <p>Enter deposit value in ETH</p>}
        </Form.Text> */}
        <Button
          variant="primary"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? 'Processing...' : 'Add'}
        </Button>
        </Form>
    </Card.Body>
    </Card>

  )
}




export default ImageUpload;