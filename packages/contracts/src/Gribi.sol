// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import { ThreadRegistry } from './ThreadRegistry.sol';
import { BaseThread } from './BaseThread.sol';

contract Gribi {
    address public creator;
    bytes32 public version;
    ThreadRegistry private registry;

    constructor(bytes32 _version) {
        creator = msg.sender;
        version = _version;
        registry = new ThreadRegistry();
    }

    function registerThreads(BaseThread[] memory threads) public {
        for (uint i=0; i<threads.length; i++) {
            registry.registerThread(threads[i]);
        }
    }

    function getThread(uint256 id) public view returns (BaseThread) {
        return registry.getThread(id);
    } 
}