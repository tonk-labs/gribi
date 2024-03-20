// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import { Operation, PublicInput } from "./Structs.sol";

struct MerkleTrees {
    // faking it for now
    mapping(uint256 => bool) commitmentTree;
    mapping(uint256 => bool) nullifierTree;
    mapping(uint256 => uint256) publicTree;
    uint256[] returnValues;
}

contract Forest {
    // State variable for storing the contract creator's address
    address authorizedCaller;
    MerkleTrees private treeStore;

    modifier onlyAuthorized() {
        require(msg.sender == authorizedCaller, "Caller is not authorized");
        _;
    }

    constructor() {
        authorizedCaller = msg.sender;
        treeStore.returnValues = new uint256[](256);
    }


    function setAuthorizedCaller(address _authorizedCaller) external onlyAuthorized {
        authorizedCaller = _authorizedCaller;
    }

    function commitmentExists(uint256 commitmentKey) public view returns (bool) {
        return treeStore.commitmentTree[commitmentKey];
    }

    function addCommitment(uint256 commitmentKey) public onlyAuthorized {
        if (commitmentExists(commitmentKey)) {
            revert();
        }
        treeStore.commitmentTree[commitmentKey] = true;
    }

    function nullifierExists(uint256 nullifierKey) public view returns (bool) {
        return treeStore.nullifierTree[nullifierKey];
    }

    function addNullifier(uint256 nullifierKey) public onlyAuthorized {
        if (nullifierExists(nullifierKey)) {
            revert();
        }
        treeStore.nullifierTree[nullifierKey] = true;
    }
    function getReturnValue(uint8 index) public view returns (uint256) {
        return treeStore.returnValues[index];
    }

    function setReturnValue(uint8 index, uint256 value) public {
        treeStore.returnValues[index] = value;
    }

    function getPublicState(uint256 slot) public view returns (PublicInput memory) {
        return PublicInput(slot, treeStore.publicTree[slot]);
    }

    function setPublicState(PublicInput memory write) public onlyAuthorized {
        treeStore.publicTree[write.slot] = write.value;
    }

}
