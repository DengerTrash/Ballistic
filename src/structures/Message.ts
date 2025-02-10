import { Client } from "../mod.ts";
import { Base } from "./Base.ts";
import { GuildChannel } from "./mod.ts";

export interface MessageContent {
	content: string,
	components?: Array<any>,
	// そのうちEmbedContentへ差し替えます
	embeds?: Array<any>,
	allowed_mentions?: any,
	nonce?: string,
	tts?: boolean
}
export class Message extends Base{
	readonly data: any | undefined;
	private client: Client;
	public channel: GuildChannel;
	public guild_id: number | undefined;

	get content(){
		return this.data.content;
	}
	constructor(client:Client, channel: GuildChannel, data: any){
		super();
		this.client = client;
		this.channel = channel;
		this.data = data;
		this.guild_id = data.guild_id;
	}
	send(messageContent: string){
		console.log(this.data)
	}
}