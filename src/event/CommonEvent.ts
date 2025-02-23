import type { Client } from "../mod.ts";
import { Guild, GuildChannel, Message, MessageContent } from "../structures/mod.ts";

export interface AnyEventPayload extends MessageContent {
	guild_id: string
};
export class CommonEvents {
	protected client: Client;
	public guild?: Guild;
	public channel?: GuildChannel | undefined;
	public message?: Message | undefined;
	public constructor(dat: any){
		this.client = dat.client
		this.guild = dat.guild
		this.message = dat.message
	}
	static async restore(event: string, client: Client, data: any){
		const unko: any = {}
		unko.client = client;
		if(data.channel_id) unko.channel = await client.channels.access(data.channel_id);
		if(data.guild_id) unko.guild = await client.guilds.access(data.guild_id);
		if(event == 'MESSAGE_CREATE' || event == 'INTERACTION_CREATE') unko.message = await new Message(client, unko.channel!, data)		
		
		return unko
	}
}