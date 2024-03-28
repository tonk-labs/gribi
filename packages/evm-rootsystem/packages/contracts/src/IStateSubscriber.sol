// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import { BaseThread } from './BaseThread.sol';

interface IStateSubscriber {
    function update(BaseThread thread) external;
}