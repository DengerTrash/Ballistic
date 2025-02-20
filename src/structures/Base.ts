import { Client } from "../mod.ts";

export class Base{
	public client: Client;
	constructor(client: Client){
		this.client = client;
	}
}