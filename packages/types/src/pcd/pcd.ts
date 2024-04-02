/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Going to use modified version of the PCD.team format from 0xParc in hopes of promoting an emergent standard. 
 * Their construction is simple and functional, alberit highly tailored to their conception of how to use PCDs for ZuPass.
 * 
 * This is an attempt to further generalize the format.
 * 
 * See original work here (https://github.com/proofcarryingdata/zupass)
 * 
 */

export class PCDURI {
    /**
     * Uniquely identifies this instance.
     */
    id: string;

    /**
     * This is a URI which scopes the type and prevents collisions and allows for routing the PCD to its appropriate package.
     * 
     * The namespace uniquness could be enforced through a variety of mechanisms, for example if the namespace is a public key for some
     * symmetric key encryption scheme and the transfer protocol includes the PCD and a signature over the hash. Alternatively, systems using PCD could 
     * simply enforce uniqueness internally using a database.
     */
    namespace: string;
  
    /**
     * In the source PCD SDK this refers typically to package in their PCD system, but
     * here we will keep it more free-form. It's simply a way to uniquely refer to the
     * format of the PCD.
     *     
     */
    type: string;

    /**
     * URI format as described below in string format
     * 
     * pcd://namespace/type/id
     */
    string: string

    constructor(namespace: string, type: string, id: string) {
        this.id = id;
        this.namespace = namespace;
        this.type = type;
        this.string = `pcd://${namespace}/${type}/${id}`
    }
}

/**
 * All PCDs consist of a "claim", which is the human-interpretable statement
 * that the PCD is making (i.e. "I am a Zuzalu resident"); and a "proof" attached
 * to the "claim," which is a cryptographic or mathematical proof of the claim.
 * A PCD consists of only data. The code and algorithms associated with each type
 * of PCD lives in that PCD namespaces corresponding module or package. The package
 * exposes, among other things, `prove` and `verify` functions for each type, which allow you to
 * create new instances of the PCD and, and verify that instances of the PCD are
 * indeed correct respectively.
 */
export interface PCD<C = unknown, P = unknown> {
    /**
     * Encodes all the information necessary to identify this PCD and its corresponding package.
     */
    uri: PCDURI;
  
    /**
     * Information encoded in this PCD that is intended to be consumed by the
     * business logic of some application. For example, a type of PCD that could
     * exist is one that is able to prove that its creator knows the prime factorization
     * of a really big number. In that case, the really big number would be the claim,
     * and a ZK proof of its prime factorization would go in the {@link PCD#proof}.
     *
     */
    claim: C;
  
    /**
     * A cryptographic or mathematical proof of the {@link PCD#claim}.
     */
    proof: P;
  }
  

  export interface PCDPackage<
  I = any
> {
      /**
   * The unique name identifying the type of {@link PCD} this package encapsulates.
   */
  namespace: string;

  /**
   * Initializes this {@link PCDPackage} so that it can be used in the current context.
   * This is an optional field, because not all packages need to be initialized.
   */
  init?: (initArgs: I) => Promise<void>;

  /**
   * Generates a module to prove and verify PCDs of namespace/type.
   * 
   * Also includes initArgs which is optional.  
   * @param type 
   * @param initArgs 
   * @returns 
   */
  module: (type?: string, initArgs?: I) => Promise<PCDModule>;

}

export interface PCDModule<
    C = any,
    P = any,
    A = any,
    I = any,
> {
    /**
     * The unique type of PCD these functions handle
     */
    type: string;

    /**
     * Initializes this {@link PCDPackage} so that it can be used in the current context.
     * This is an optional field, because not all packages need to be initialized.
     */
    init?: (initArgs: I) => Promise<void>;

    /**
     * This is effectively a factory for instances of the {@link PCD} that this {@link PCDPackage}
     * encapsulates. It generates a proof and derives a claim from the args, and returns a
     * new PCD instance.
     */
    prove(args: A): Promise<PCD<C, P>>;

    /**
     * This function lets consumers of the {@link PCD} encapsulated by this {@link PCDPackage}
     * verify whether the {@link PCD}'s {@link PCD#claim} corresponds correctly to its
     * {@link PCD#proof}.
     */
    verify(pcd: PCD<C, P>): Promise<boolean>;

    /**
     * Serializes an instance of this package's {@link PCD} so that it can be stored on disk
     * or sent over a network.
     *
     * More concretely, this function returns a promise of `SerializedPCD<PCD<C, P>>`
     * and {@link PCDPackage.deserialize} takes `SerializedPCD<PCD<C, P>>.pcd` as a parameter
     * and returns an instance of PCD<C, P>.
     */
    serialize(pcd: PCD<C, P>): Promise<SerializedPCD<PCD<C, P>>>;

    /**
     * Sibling method to {@link PCDPackage.serialize} - converts {@link SerializedPCD} back
     * into an instance of this package's {@link PCD} type.
     */
    deserialize(serialized: SerializedPCD): Promise<PCD<C, P>>;

}

/**
 * The input and output of a {@link PCDPackage}'s {@link PCDPackage.serialize} and
 * {@link PCDPackage.deserialize} methods.
 */
export interface SerializedPCD<_T extends PCD = PCD> {
    pcd: string;
}

