import type { Client } from "../mod.ts";

/**
 * 全ての礎。
 * BASE.
 */
export class Base{
	public client: Client;
	/**
	 * 
	 * @param client 
	 */
	constructor(client: Client){
		this.client = client;
	}
}