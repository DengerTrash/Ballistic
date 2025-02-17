import type { Client } from "../mod.ts";

export abstract class BaseCache {
	public client: Client;
	public cathe = new Map<string, any>;

	constructor(client: Client){
		this.client = client;
	}
	public _update(key: string, data: any){
		this.cathe.set(key, data);
	}
	public _takeit(key: string): any{
		const result = this.cathe.get(key);
		return result;
	}
	public access(key: string, doodoo: () => any){
		const result = this._takeit(key);
		if(result) return result;
		else{
			const rere = doodoo()
			this.cathe.set(key, rere)
			return rere;
		}
	}
	public _delete(key: string){
		const result = this.cathe.get(key);
		if(!result){
			this.cathe.delete(key);
		}
	}
}