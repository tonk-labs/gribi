
import { System } from "@latticexyz/world/src/System.sol";
import { GribiConfig } from "../codegen/index.sol";
import { Gribi, PublicInput } from "@gribi/src/Gribi.sol";
import { Operation, Proof, Transaction } from "@gribi/src/Structs.sol";
import { BaseThread } from "@gribi/src/BaseThread.sol";
import { Forest } from "@gribi/src/Forest.sol";

contract GribiSystem is System {
    function call(Transaction transaction) public {
        //find the module
        BaseThread thread = Gribi.getThread(transaction.id);

        //if the proof passes, shuffle along the inputs and ops to the function of the module
        thread.call(transaction);
    }
    function call(Transaction transaction, Proof proof) public {
        //find the module
        BaseThread thread = Gribi.getThread(transaction.id);

        //TODO:
        //if there is a proof, verify it
        //(and feed the key_hash in from the tree for function id from that module)
        //(along with roots of the module)

        //if the proof passes, shuffle along the inputs and ops to the function of the module
        thread.call(transaction);
        //the module will have access to codegen bits of MUD and ideally would want to build with those in mind
        //however, that's tough, so I think instead what we do is just have the module only use it's internal memory
        //if someone wants to integrate that internal memory into MUD they can do so easily by using some kind of hook mechanism
        //then when it comes to reading from the client, we can write a module (in long term), but in short term just read from Gribi directly (I guess prob easiest thing)
        //the alternative is having the whole fake tree live in MUD
        //...can think about those alternatives
        //TODO: implement hook mechanism
    }
}