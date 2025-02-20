import { Client } from "../mod.ts";
import { BaseChannel, Guild, MessagePayload } from "./mod.ts";

export class GuildChannel extends BaseChannel{
	readonly channel_id: string;
	constructor(client: Client, channel_id: string){
		super(client);
		this.client = client;
		this.channel_id = channel_id;
	}
	send(data: string | MessagePayload, options?: any){
		let putData: MessagePayload = {
			content: ''
		}
		if(typeof data == 'string') putData.content = data
		else putData = data

		if(options){
			console.log(options.reply)
			putData.message_reference = options.reply
		}
		this.client.rest.sendMessage(this.channel_id, putData)
	}
}