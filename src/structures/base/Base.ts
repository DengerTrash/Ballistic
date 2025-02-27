import type { Client } from "../../mod.ts";

/**
 * 全ての礎。
 * BASE.
 */
export abstract class Base {
	public client: Client;
	/**
	 * 
	 * @param client 
	 */
	constructor(client: Client){
		this.client = client;
	}
}