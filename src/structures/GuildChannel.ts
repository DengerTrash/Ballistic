import { Client } from "../mod.ts";
import { BaseChannel, Guild, MessagePayload } from "./mod.ts";

export class GuildChannel extends BaseChannel{
	private client: Client;
	private guild: Guild;
	public channel_id: string;
	constructor(client: Client, guild: Guild, channel_id: string){
		super();
		this.client = client;
		this.channel_id = channel_id;
		this.guild = guild;
	}
	send(data: string | MessagePayload, options?: any){
		let putData: MessagePayload = {
			content: ''
		}
		if(typeof data == 'string') putData.content = data
		else putData = data

		if(options.reply){
			console.log(options.reply)
			putData.message_reference = options.reply
		}
		this.client.rest.sendMessage(this.channel_id, putData)
	}
}