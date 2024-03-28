// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

struct PublicInput {
    uint256 slot;
    uint256 value;
}

struct Operation {
    uint256 opid;
    uint256 value;
    uint256 nullifier;
}

struct ProofData {
    bytes32[] data;
    uint256 circuitKey;
}

struct Proof {
    ProofData data;
    PublicInput[] inputs;
}

struct Transaction {
    PublicInput[] inputs;
    Operation[] operations;
}

