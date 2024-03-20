use dep::std;

// if these values are 0 then they are effectively null, that means 0 slot is invalid
struct DataField {
    value: Field,  
    slot: Field, // theoretical "slot" for the data 
    nullifier: Field, // creation or usenullifier
}

struct Operation {
    type: Field,
    value: [DataBlock; 3],
}

fn main(
    verification_key: [Field; 114],
    proof: [Field; 93],
    // also in here are some transaction objects
    // page can be read from public inputs as well
    //namespace and page can be deserialized from the public inputs
    // address of the player, just used to bind argument and check signature
    address: pub Field 

    //some kind of serialized form of the context?? this is sent as calldata and overloaded by contract 
    transactions: pub [Operation; 8], 

    key_hash: pub Field

    //all the trees for that namespace 
    commitment_root: pub Field, 
    nullifier_root: pub Field, 
    public_root: pub Field, 

    //the paths are supplied as private witnesses to the sub-circuit?
) {
    //check if Pedersen(namespace, key_hash) is in the registry 
    // let root = std::merkle::compute_merkle_root(key_hash, index, registry_path);
    // assert_eq(registry_root, root);
    //TODO: check if the Key Hash matches the VK key

    let mut public_inputs = transactions.append([commitment_root, nullifier_root, public_root]);

    std::verify_proof(
        verification_key.as_slice(),
        proof.as_slice(),
        public_inputs.as_slice(),
        key_hash
    );
}


// #[test]
// fn test_main() {
//     main(1, 2);
//     // Uncomment to make test fail
//     // main(1, 1);
// }