import type { Client } from "../../mod.ts";

/**
 * とりあえず作った。文句あっか。
 */
export class Guild{
	client: Client;
	constructor(client: Client, guild_id: string){
		this.client = client;
	}
}