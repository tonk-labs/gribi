use dep::std;
fn main(x: Field, y: Field, nonce: Field) -> pub Field {
    std::hash::poseidon::bn254::hash_3([x, y, nonce])
}

#[test]
fn test_hash() {
    std::println(main(0, 0, 1));
}
