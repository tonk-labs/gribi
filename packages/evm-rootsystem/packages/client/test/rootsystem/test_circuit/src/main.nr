struct Operation {
	opid: Field,
	value: Field,
	nullifier: Field,
}

struct Input {
    slot: Field,
    value: Field,
}

fn main(
    commitment_root: pub Field,
    nullifier_root: pub Field,
    public_root: pub Field,
    address: pub Field,
    inputs: pub [Input; 8],
    operations: pub [Operation; 8],
    y: pub Field,
    x: Field
) {
    assert(x != y);
}

#[test]
fn test_main() {
    let inputs: [Input; 8] = [Input { slot: 0, value: 0 }; 8];
    let operations: [Operation; 8] = [Operation { opid: 0, value: 0, nullifier: 0 }; 8];
    main(
        1,
        2,
        3,
        4,
        inputs,
        operations,
        1,
        2
    );
}
