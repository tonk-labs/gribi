export type Field = number | bigint | string;

export type WitnessRelation<C = unknown, W = unknown> = { 
    claim: C;
    witness: W;
}

/**
 * A {@link Receptor} takes any type and transforms it into a {@link Signal}. 
 */
export interface Precursor<
    A = any,
    C = any,
    W = any
> {
    bond(args: A): Promise<WitnessRelation<C, W>>;
}