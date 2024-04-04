export type Field = number | bigint | string;

export type WitnessRelation<C = unknown, W = unknown> = { 
    claim: C;
    witness: W;
}