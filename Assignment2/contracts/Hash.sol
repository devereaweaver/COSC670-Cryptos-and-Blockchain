// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Hash {
    string name;

    constructor(string memory _name) {
        name = _name;
        bytes32 a = keccak256(abi.encodePacked(_name));
        console.logBytes32(a);
    }
}