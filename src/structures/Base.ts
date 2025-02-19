import { Client } from "../mod.ts";

export class Base{
	public client: Client;
	public application_id : number;
	constructor(client: Client){
		this.client = client;
		this.application_id = this.client.restManager.getThisApp()
	}
}