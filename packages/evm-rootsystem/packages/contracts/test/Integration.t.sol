// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.4;

// import {Test, console2} from "forge-std/Test.sol";
// import "forge-std/console.sol";
// import { Gribi } from "../src/Gribi.sol";
// import { Forest } from "../src/Forest.sol";
// import { ForestManager } from "../src/ForestManager.sol";

// contract IntegrationTest is Test {
//     Gribi gribi;
//     function setUp() public {
//         // Implementation of setup function goes here
//         gribi = new Gribi("0.0.1");
//     }

//     function test_sanityCheck() public {
//         ForestManager manager = gribi.getManager();
//         manager.init();
//         Forest forest = manager.getForest();
//         forest.addCommitment(0);
//         assertTrue(forest.commitmentExists(0));
//     }

//     function testFail_addCommitmentToWrongForest() public {
//         ForestManager manager = gribi.getManager();
//         Forest forest = manager.getForest();
//         vm.prank(address(0));
//         forest.addCommitment(0);
//     }
// }