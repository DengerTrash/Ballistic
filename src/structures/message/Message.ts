import type { Client } from "../../mod.ts";
import type { GuildChannel, User } from '../mod.ts'
import { Base } from "../base/mod.ts";

export interface MessagePayload {
	content: string,
	tts?: boolean,
	embeds?: any,
	allowed_mentions?: any,
	message_reference?: any,
	components?: any,
	sticker_ids?: any,
	files?: any,
	poll?: any
}

export type sendMessageType = string | MessagePayload;

export interface MessageContent extends MessagePayload {
	author: User;
	channel_id: string;
}

export interface MessageGetPayload {
	user_id?: string,
	limit?: number
}

export class Message extends Base{
	readonly data: any | undefined;
	public channel: GuildChannel;
	public content: string | undefined;
	public guild_id: number | undefined;

	/**
	 * 
	 * @param client 
	 * @param channel 
	 * @param data 
	 */
	constructor(client:Client, channel: GuildChannel, data: any){
		super(client);
		this.client = client;
		this.guild_id = data.guild_id;
		this.data = data;
		this.content = data.content
		this.channel = channel
	}
	reply(content: string | MessagePayload){
		this.channel.send(content,{
			reply: {
				type: this.data.type,
				message_id: this.data.id,
				channel_id: this.data.channel_id
			}
		})
	}
	delete(){
		this.channel.delete(this.data.id)
	}
}