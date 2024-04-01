// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import { Forest } from './Forest.sol';
import { Transaction } from './Structs.sol';


struct UpdateRegister {
    uint code;
    bytes value;
}

abstract contract BaseThread {
    uint[] codes;
    UpdateRegister internal register;
    Forest internal forest;

    constructor() {
        forest = new Forest();
    }

    function getModuleID() public virtual pure returns (uint256); 
    function peekUpdates() public view returns (UpdateRegister memory) {
        return register;
    }
}