import type { Client } from "../mod.ts";
import type { GuildChannel } from './mod.ts'
import { Base } from "./Base.ts";

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
	channel_id: string
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
		this.channel = channel;
		this.guild_id = data.guild_id;
		this.data = data;
		this.content = data.content
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
}