import { PCD } from "../pcd";

/**
 * A {@link RootSystem} is used to store or persist an array of type {@link Signal} which are generated from a
 * {@link Receptor}. An example of a {@link RootSystem} might be used for snapshotting or to anchor PCDs to a chain.
 * 
 */
export interface RootSystem <
    I = unknown,
    T = any,
> {
    createTxs(signals: Signal<I>[]): Promise<T[]>;
}

/**
 * A {@link Receptor} takes a type of {@link PCD} and transforms it into a {@link Signal}. 
 */
export interface Receptor<
    C = any,
    P = any,
    I = any,
    A = any
> {
    signal(pcd: PCD<C,P>, args?: A): Signal<I>;
}

export interface Transmitter<
    C = any,
    P = any,
    I = any
> { 
    release(signal: Signal<I>): PCD<C,P>
}

/**
 * A {@link Signal} is sent into a rootsystem to do something (typically make a state update, some commitment or to
 * broadcast some data). Signals can be composed just like PCDs to do batch updates to a root system or to encapsulate
 * the logic of one signal inside another for more complex signaling.
 */
export interface Signal<
    O = any,
> {
    transform?(inputs?: Signal[]): Signal<O>[];
    output: O;
}