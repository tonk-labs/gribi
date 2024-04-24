use dep::std;
unconstrained fn hash(i: [Field; 8]) -> Field {
    std::hash::pedersen_hash(i)
}

//If we wish to complicate the helpers here maybe we can be more creative? Or find a way to work with libraries
fn main(input: [Field; 8]) -> pub Field {
    hash(input)
}

#[test]
fn test_main() {
    println(main([1, 2, 0, 0, 0, 0, 0, 0]));
    // Uncomment to make test fail
    // main(1, 1);
}
