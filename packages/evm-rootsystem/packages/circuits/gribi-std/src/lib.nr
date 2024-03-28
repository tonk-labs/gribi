struct Operation {
	opid: Option<Field>,
	slot: Option<Field>,
	value: Option<Field>,
	nullifier: Option<Field>,
}

struct Input {
    slot: Option<Field>,
    value: Option<Field>,
}