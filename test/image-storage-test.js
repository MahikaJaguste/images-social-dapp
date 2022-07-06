const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("ImageStorage contract", function () {
    
    let ImageStorage;
    let imageStorage;
    let deployer;

    before(async () => {
        ImageStorage = await ethers.getContractFactory("ImageStorage");
        imageStorage = await ImageStorage.deploy();
        [deployer, alice, bob] = await ethers.getSigners();
    });

    it("should deploy correctly", async () => {
        assert.isOk(imageStorage, "Deployment failed");
    });

    it("should add valid image details, increment counter and emit event", async () => {
        const count1 = await imageStorage.imgCounter();
        expect(count1).to.equal(0);

        const imgTitle = "My Title";
        const imgHash = "QmPSiu9L3baUZcPAcmKA33sgZqXuY7vbtHQxUSGkCmVAeJ";

        await expect(imageStorage.addImage(imgTitle, imgHash))
        .to.emit(imageStorage, "ImageAdded")
        .withArgs(1, imgTitle, imgHash, deployer.address);

        const count2 = await imageStorage.imgCounter();
        expect(count2).to.equal(1);

        const result = await imageStorage.images(1);
        expect(result[0]).to.equal(imgTitle);
        expect(result[1]).to.equal(imgHash);
        expect(result[2]).to.equal(deployer.address);
    });

    it("should revert InvalidInput error", async () => {
        const imgTitle = "My Title";
        const imgHash = "QmPSiu9L3baUZcPAcmKA33sgZqXuY7vbtHQxUSGkCmVAeJ";
        await expect(imageStorage.addImage('', imgHash)).to.be.revertedWith("InvalidInput");
        await expect(imageStorage.addImage(imgTitle, '')).to.be.revertedWith("InvalidInput");
    });

});