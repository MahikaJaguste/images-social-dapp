async function main() {
    const [deployer] = await ethers.getSigners(); //get the account to deploy the contract
    console.log("Deploying contracts with the account:", deployer.address); 

    const ImageStorage = await ethers.getContractFactory("ImageStorage"); // Getting the Contract
    let imageStorage = await ImageStorage.deploy(); //deploying the contract

    await imageStorage.deployed(); // waiting for the contract to be deployed
    console.log("ImageStorage deployed to:", imageStorage.address); // Returning the contract address

}
  
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
}); // Calling the function to deploy the contract 

// Rinkeby address: 
// Mumbai address: 
