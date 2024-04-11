// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Test, console2} from "forge-std/Test.sol";
import "forge-std/console.sol";
import { Forest } from '../src/Forest.sol';

contract ForestTest is Test {
    Forest forest;
    uint256 constant testCommitmentKey = 123;
    uint256 constant testNullifierKey = 456;

    // Public function to set up the contract
    function setUp() public {
        // Implementation of setup function goes here
        forest = new Forest();
    }

    function testCommitmentExists() public {
        // Implementation of testcommitmentExists function goes here
        bool existsBefore = forest.commitmentExists(testCommitmentKey);
        forest.addCommitment(testCommitmentKey);
        bool existsAfter = forest.commitmentExists(testCommitmentKey);
        assertFalse(existsBefore);
        assertTrue(existsAfter);
    }

    function testAddCommitment() public {
        // Implementation of testaddCommitment function goes here
        forest.addCommitment(testCommitmentKey);
        bool exists = forest.commitmentExists(testCommitmentKey);
        assertTrue(exists);
    }

    function testNullifierExists() public {
        // Implementation of testnullifierExists function goes here
        bool existsBefore = forest.nullifierExists(testNullifierKey);
        forest.addNullifier(testNullifierKey);
        bool existsAfter = forest.nullifierExists(testNullifierKey);
        assertFalse(existsBefore);
        assertTrue(existsAfter);
    }

    function testAddNullifier() public {
        // Implementation of testaddNullifier function goes here
        forest.addNullifier(testNullifierKey);
        bool exists = forest.nullifierExists(testNullifierKey);
        assertTrue(exists);
    }

    function testReturnValues() public {
        // Implementation of testaddNullifier function goes here
        forest.setReturnValue(0, 300);
        assertEq(forest.getReturnValue(0), 300);
    }
}
