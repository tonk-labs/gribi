// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import { ThreadRegistry } from './ThreadRegistry.sol';
import { BaseThread } from './BaseThread.sol';
import { Operation, PublicInput, Proof, Transaction } from "./Structs.sol";
import { IStateSubscriber } from "./IStateSubscriber.sol";

contract EVMRootSystem {
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

    function execute(uint256 id, bytes memory data) public returns (BaseThread) {
        //find the module
        BaseThread thread = this.getThread(id);

        //if the proof passes, shuffle along the inputs and ops to the function of the module
        address(thread).call(data);
        return thread;
    }
    function execute(uint256 id, bytes memory data, Proof memory proof) public returns (BaseThread) {
        //find the module
        BaseThread thread = this.getThread(id);

        //TODO:
        //if there is a proof, verify it
        //(and feed the key_hash in from the tree for function id from that module)
        //(along with roots of the module)

        //if the proof passes, shuffle along the inputs and ops to the function of the module
        address(thread).call(data);
        //the module will have access to codegen bits of MUD and ideally would want to build with those in mind
        //however, that's tough, so I think instead what we do is just have the module only use it's internal memory
        //if someone wants to integrate that internal memory into MUD they can do so easily by using some kind of hook mechanism
        //then when it comes to reading from the client, we can write a module (in long term), but in short term just read from Gribi directly (I guess prob easiest thing)
        //the alternative is having the whole fake tree live in MUD
        //...can think about those alternatives
        //TODO: implement hook mechanism
        return thread;
    }
}