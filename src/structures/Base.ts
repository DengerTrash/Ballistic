import { Client } from "../mod.ts";

export class Base{
	client: Client;
	constructor(client: Client){
		this.client = client;
	}
}