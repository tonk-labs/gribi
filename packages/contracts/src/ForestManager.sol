pragma solidity ^0.8.4;

import { Forest } from "./Forest.sol";

contract ForestManager {
    // Mapping from an identifier to the Forest contract address
    mapping(address => Forest) private forests;

    // Function to create a new Forest contract
    function init() public {
        if (address(forests[msg.sender]) == address(0)) {
            Forest newForest = new Forest();
            newForest.setAuthorizedCaller(msg.sender);
            forests[msg.sender] = newForest;
        }
    }

    // Function to retrieve a Forest contract address by its identifier
    function getForest() public view returns (Forest) {
        require(address(forests[msg.sender]) != address(0), "Forest does not exist.");
        return forests[msg.sender];
    }
}