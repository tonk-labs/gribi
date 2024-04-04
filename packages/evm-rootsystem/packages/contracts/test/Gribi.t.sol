// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Test, console2} from "forge-std/Test.sol";
import "forge-std/console.sol";

import { Gribi } from '../src/Gribi.sol';
import { BaseThread } from '../src/BaseThread.sol';

event SomethingDone();
event SomethingElseDone(uint32 indexed some);
contract Foo is BaseThread{
    function getModuleID() public pure override returns (uint256) {
        return uint256(keccak256 ("Foo"));
    }
    function doSomething () public {
        emit SomethingDone();
    }
}

contract Bar is BaseThread{
    
    function getModuleID() public pure override returns (uint256) {
        return uint256(keccak256 ("Bar"));
    }
    function doSomething (uint32 some) public {
        emit SomethingElseDone(some);
    }
}


contract GribiTest is Test {
    Gribi gribi;
    uint256[] thread_ids;
    bytes32 constant gribiVersion = "0.0.1";
    function setUp() public {
        gribi = new Gribi(gribiVersion);
    }

    function testRegsterThreads() public {
        BaseThread[] memory threads = new BaseThread[](2);
        
        threads[0] = new Foo();
        threads[1] = new Bar();

        thread_ids = new uint256[](threads.length);
        for (uint n=0; n < threads.length; n++){
            thread_ids[n] = threads[n].getModuleID();
        }
        
        gribi.registerThreads(threads);

    }

    function testExecute() public {
        testRegsterThreads();
        bytes memory data = abi.encodeWithSignature("doSomething()");
        vm.expectEmit(false, false, false, false);
        emit SomethingDone();
        gribi.execute(thread_ids[0], data);
        bytes memory data2 = abi.encodeWithSignature("doSomething(uint32)", 12);
        vm.expectEmit(true, false, false, false);
        emit SomethingElseDone(12);
        gribi.execute(thread_ids[1], data2);
    }

}