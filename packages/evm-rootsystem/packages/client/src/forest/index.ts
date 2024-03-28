import { Roots } from '../kernel';

class _Forest {
    getRoots(): Roots {
        return {
            commitment: "",
            nullifier: "",
            public: "",
        }
    }
}

export const Forest = new _Forest();