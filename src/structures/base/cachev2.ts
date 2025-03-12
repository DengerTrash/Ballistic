
export abstract class cacheV2<T> {
    private cache: Map<string, any>;
    constructor(){
        this.cache = new Map();
    }
}