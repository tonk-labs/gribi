// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.4;

// import {Test, console2} from "forge-std/Test.sol";
// import "forge-std/console.sol";
// import { GribiPrototype, Transaction, Storage, TransactionData } from "../src/GribiPrototype.sol";
// import { PublicContext } from "../src/IGribiPrototype.sol";

// // Contract to inherit from GribiPrototype
// contract GribiPrototypeTest is Test {
//     GribiPrototype gribiPrototype;
//     uint256 constant testNamespace = uint256(keccak256("testNamespace"));
//     uint256 constant testCommitmentKey = 123;
//     uint256 constant testNullifierKey = 456;

//     // Public function to set up the contract
//     function setUp() public {
//         // Implementation of setup function goes here
//         gribiPrototype = new GribiPrototype("1.0");
//     }

//     // Generate test functions for each function in GribiPrototype contract
//     function testCommitmentExists() public {
//         // Implementation of testcommitmentExists function goes here
//         bool existsBefore = gribiPrototype.commitmentExists(testNamespace, testCommitmentKey);
//         gribiPrototype.addCommitment(testNamespace, testCommitmentKey);
//         bool existsAfter = gribiPrototype.commitmentExists(testNamespace, testCommitmentKey);
//         assertFalse(existsBefore);
//         assertTrue(existsAfter);
//     }

//     function testAddCommitment() public {
//         // Implementation of testaddCommitment function goes here
//         gribiPrototype.addCommitment(testNamespace, testCommitmentKey);
//         bool exists = gribiPrototype.commitmentExists(testNamespace, testCommitmentKey);
//         assertTrue(exists);
//     }

//     function testNullifierExists() public {
//         // Implementation of testnullifierExists function goes here
//         bool existsBefore = gribiPrototype.nullifierExists(testNamespace, testNullifierKey);
//         gribiPrototype.addNullifier(testNamespace, testNullifierKey);
//         bool existsAfter = gribiPrototype.nullifierExists(testNamespace, testNullifierKey);
//         assertFalse(existsBefore);
//         assertTrue(existsAfter);
//     }

//     function testAddNullifier() public {
//         // Implementation of testaddNullifier function goes here
//         gribiPrototype.addNullifier(testNamespace, testNullifierKey);
//         bool exists = gribiPrototype.nullifierExists(testNamespace, testNullifierKey);
//         assertTrue(exists);
//     }

//     function testGetPublicContext() public {
//         vm.startPrank(address(0x1337));
//         // Implementation of testgetPublicContext function goes here
//         bytes memory transaction = abi.encode(Transaction(
//             Storage(0, 0, 1),
//             TransactionData(0, 0),
//            0 
//         ));
//         gribiPrototype.callAtGribi(testNamespace, transaction);
//         PublicContext memory pc = gribiPrototype.getPublicContext(testNamespace, 0);
//         vm.stopPrank();

//         assertEq(pc.player_storage.slots[0], 1);

//     }

//     function testCall() public {
//         // Implementation of testcall function goes here
//          assertTrue(true); // Placeholder for more complex logic
//     }
// }
