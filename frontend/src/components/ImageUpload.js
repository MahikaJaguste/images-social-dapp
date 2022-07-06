import { useState, useContext, useEffect } from "react";
import { ethers } from 'ethers';
import { AppContext } from '../App.js';
import { Card, Form, Button } from 'react-bootstrap';


function ImageUpload() {

  const {signer, storageContract} = useContext(AppContext);

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(image);
    // if(ethDeposit){
    //   setIsLoading(true);
    //   try{
    //     const txn = await vaultContract.connect(signer).deposit({ value: ethers.utils.parseEther(ethDeposit) });
    //     await txn.wait();
    //   }
    //   catch(err){
    //     alert('Transaction failed');
    //   }
    //   setIsLoading(false);  
    // }   
  }

  return (
  
    <Card>
    <Card.Body>

    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Add Image</Form.Label>
          <Form.Control type="file" 
                accept="image/*"
                onChange={(e) => {
                        const file = e.target.files[0];
                        if(file['type'].split('/')[0] === 'image'){
                            setImage(file);
                        }
                    }
                } />
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