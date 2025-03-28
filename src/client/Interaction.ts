import type { Client, Events } from "../mod.ts";
import { GuildChannel } from "../structures/channel/GuildChannel.ts";
import type { Guild } from "../structures/guild/Guild.ts";
import type { User } from "../structures/user/User.ts";
import type { GatewayEvents } from "../endpoints/mod.ts";
import { MessageContent, Message } from "../structures/mod.ts";


export interface AnyEventPayload extends MessageContent {
	guild_id: string
};

type OptionalIf<T,U> = T extends U ? T : T | undefined

export type MessageInteraction = Interaction<Message>
function isMessage(data: any): data is Message {
	return (data as Message)?.tts !== undefined
}

interface InteractionElement {
	message?: Message;
	channel?: GuildChannel;
	guild: Guild;
}
export class Interaction<T> {
	private client: Client;
	data: any;
	message?: Message;
	channel?: GuildChannel;
	guild?: Guild;
	constructor(event: string, client: Client, data: T){
		this.client = client;
		this.data = data
	}
	static async init<T>(event:string,client: Client, data: T){
		if(isMessage(data)){
			const dataMessage = data as Message
			//もしチャンネル関連で変更があったら、updateを実行するように書き換えること。
			this.channel = await client.channels.access(dataMessage.channel_id!)//new GuildChannel(client, dataMessage.channel_id)
			this.message = new Message(client, this.channel, dataMessage)
			this.guild = client.guilds.access(dataMessage.guild_id!)
		}
	}
}