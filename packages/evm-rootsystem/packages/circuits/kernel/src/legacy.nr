use dep::std;

fn main(
    verification_key: [Field; 114],
    proof: [Field; 93],
    // also in here are some transaction objects
    // page can be read from public inputs as well
    //namespace and page can be deserialized from the public inputs
    // address of the player, just used to bind argument and check signature
    address: Field 
    //some kind of serialized form of the context?? this is sent as calldata and overloaded by contract 
    public_inputs: pub [Field; 45], 
    //this will be the fn_register root for that namespace 
    registry_root: pub Field, 
    index: pub Field,
    //used to prove it's in the right place ?? maybe it will be just 3 layers deep
    registry_path: [Field; 3] 
    key_hash: Field
) {
    //check if Pedersen(namespace, key_hash) is in the registry 
    let leaf_hash = std::hash::pedersen([namespace, key_hash]);
    let root = std::merkle::compute_merkle_root(leaf_hash, index, registry_path);
    assert_eq(registry_root, root);

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