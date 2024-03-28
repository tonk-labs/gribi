// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;
 
import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";
import { GribiConfig } from "../src/codegen/index.sol";

library GribiScriptInstaller {
    function run() external {
        GribiConfig.set(address(0x280Cc1Fc57a68d437a55F80201735cfd9A9Ae40a));
    }
}