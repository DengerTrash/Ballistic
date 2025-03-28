import type { Client, Embed } from "../../mod.ts";
import { Base } from "../base/Base.ts";
//import { EmbedConverter } from "../../maker/mod.ts";
import { GuildChannel } from "../channel/GuildChannel.ts";
import { User } from "../user/User.ts";

export interface MessagePayload {
	content: string,
	tts?: boolean,
	embeds?: (Embed)[],
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
export interface Message {
	id: string;
	channel_id: string;
	author: User;
	content: string;
	timestamp: string;
	edited_timestamp?: string;
	tts: boolean;
	mention_everyone: boolean;
	mentions: Array<User>;
	mention_roles: Array<Role>;
	mention_channels?: Array<ChannelMention>;
	attachments: Array<Attachment>;
	embeds: Array<Embed>;
	reactions?: any;
	nonce?: number | string;
	pinned: boolean;
	webhook_id?: string;
	type: number;
	activity?: any;
	application?: any;
	application_id?: string;
	flags?: number;
	message_reference?: any;
	message_snaoshots?: Array<any>
}
interface ChannelMention {
	id: string;
	guild_id: string;
	type: number;
	name: string;
}
interface Role {
	id: number;
	name: string;
	color: number;
	hoist: boolean;
	icon?: string;
	unicode_emoji?: string;
	position: number;
	permissions: string;
	managed: boolean;
	mentionable: boolean;
	tags: Array<RoleTags>;
	flags: number;
}
interface RoleTags {
	bot_id?: string;
	integration_id?: string;
	premium_subscriber?: null;
	subscription_listing_id?: string;
	available_for_purchase?: null;
	guild_connections?: null;
}
interface Attachment {
	id: string;
	filename: string;
	title?: string;
	description?: string;
	content_type: string;
	size: number;
	url: string;
	proxy_url: string;
	height?: number;
	width?: number;
	ephemeral?: boolean;
	duration_secs?: number;
	waveform?: string;
	flags?: number;
}
export class Message extends Base{
	readonly data: any | undefined;
	public channel: GuildChannel;
	public content: string;
	public guild_id?: string;
	public embed: Array<Embed> | undefined;
	public author: User;
	public channel_id: string;

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
		this.channel = channel
		this.channel_id = channel.channel_id;
		this.author = data.author;
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