import type { Client, EmbedStructure } from "../../mod.ts";
import { Base } from "../base/Base.ts";
//import { EmbedConverter } from "../../maker/mod.ts";
import { GuildChannel } from "../channel/GuildChannel.ts";
import { User } from "../user/User.ts";

export interface MessagePayload {
	content: string,
	tts?: boolean,
	embeds?: (EmbedStructure)[],
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
	user_id?: string;
	limit?: number;
	around?: string;
	before?: string;
	after?: string;
}

export class Message extends Base{
	readonly data: any | undefined;
	public channel: GuildChannel;
	public content: string | undefined;
	public guild_id: number | undefined;
	public embed: Array<EmbedStructure> | undefined;
	public author: User | undefined;
	public channel_id: string | undefined;

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
		this.content = data.content;
		this.channel = channel;
		this.author = new User(client, data.author);
		if(data.embeds){
			for(const embed of data.embeds){
				//const embbed = EmbedConverter(embed)
				this.embed?.push(embed)
			}
		}
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