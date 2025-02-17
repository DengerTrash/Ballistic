import type { Client } from "../mod.ts";

export abstract class BaseCache {
	public client: Client;
	public cache = new Map<string, any>;

	constructor(client: Client){
		this.client = client;
	}
	public _update(key: string, data: any){
		this.cache.set(key, data);
	}
	public _takeit(key: string): any{
		const result = this.cache.get(key);
		return result;
	}
	public access(key: string, doodoo: () => any){
		const result = this._takeit(key);
		if(result) return result;
		else{
			const rere = doodoo()
			this.cache.set(key, rere)
			return rere;
		}
	}
	public _delete(key: string){
		const result = this.cache.get(key);
		if(!result){
			this.cache.delete(key);
		}
	}
}