// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract FileTransfer {
    address payable public owner;

    uint fileId = 0;

    struct File {
        uint id;
        string cid;
        address[] downloaders;
        address uploader;
    }

    mapping(uint => File) public files;

    event FileIdCreated(uint fileId);
    event FileGetCid(string cid);
    File file;
    constructor() payable {
        owner = payable(msg.sender);
    }

    function uploadFile(string memory _fileCid) public payable {
        // require(msg.value >= 0.01 ether, "0.01 ether is required to upload a file.");

        fileId += 1;

        file.id = fileId;
        file.cid = _fileCid;
        file.uploader = msg.sender;

        files[fileId] = file;

        // owner.transfer(0.01 ether);

        emit FileIdCreated(fileId);
    }

    function downloadFile(uint _fileId) public payable {
        require(msg.value >= 0.01 ether, "0.01 ether is required to download a file.");

        payable(files[_fileId].uploader).transfer(0.008 ether);
        owner.transfer(0.002 ether);

        files[_fileId].downloaders.push(msg.sender);

        emit FileGetCid(files[_fileId].cid);
    }

    function getBalanceOfContract() public view returns (uint) {
        return address(this).balance;
    }

    function ownerWithdraw(uint _amount) public {
        require(msg.sender == owner, "Only the owner of the contract can withdraw");
        owner.transfer(_amount);
    }
}