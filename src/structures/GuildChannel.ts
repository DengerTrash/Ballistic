import { Client } from "../mod.ts";
import { BaseChannel } from "./BaseChannel.ts";
import { MessagePayload } from "./mod.ts";

export class GuildChannel extends BaseChannel{
	private client: Client;
	public channel_id: string;
	constructor(client: Client, channel_id: string){
		super();
		this.client = client;
		this.channel_id = channel_id;
	}
	send(data: string){
		this.client.rest.sendMessage(this.channel_id, {
			content: data
		})
	}
}