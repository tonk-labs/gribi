// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import { Transaction } from './Structs.sol';
import { BaseThread } from './BaseThread.sol';

contract ThreadRegistry {
    mapping (uint256 => BaseThread) private threads;

    //TODO: this should only be called by an admin
    function registerThread(BaseThread instance) public {
        threads[instance.getModuleID()] = instance;
    }

    function getThread(uint256 id) public view returns (BaseThread) {
        return threads[id];
    }
}
