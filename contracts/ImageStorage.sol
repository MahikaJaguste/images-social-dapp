// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

error InvalidInput();

contract ImageStorage {

    uint public imgCounter = 0;
    mapping(uint => Image) public images;

    event ImageAdded(uint indexed imgID, string indexed imgTitle, string imgHash, address indexed imgAuthor);

    struct Image {
        string imgTitle;
        string imgHash;
        address imgAuthor;
    }

    function addImage(string calldata _imgTitle, string calldata _imgHash) public {
        // checks on input
        images[++imgCounter] = Image({imgTitle: _imgTitle, imgHash: _imgHash, imgAuthor: msg.sender});
        emit ImageAdded(imgCounter, _imgTitle, _imgHash, msg.sender);
    }
}

// string and bytes, order of declarations, ++ operation gas,
// bytes(s).length
