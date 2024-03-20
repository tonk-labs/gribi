// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import { Forest } from './Forest.sol';
import { Transaction } from './Structs.sol';

abstract contract BaseThread {
    Forest internal forest;
    constructor() {
        forest = new Forest();
    }

    function getModuleID() public virtual returns (uint256); 

    function getReturnValue(uint8 index) public view returns (uint256) {
        return forest.getReturnValue(index);
    }
}