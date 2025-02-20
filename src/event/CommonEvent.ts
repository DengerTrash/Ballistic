import type { Client } from "../mod.ts";
import { Guild, GuildChannel, Message, MessageContent } from "../structures/mod.ts";

export interface AnyEventPayload extends MessageContent {
	guild_id: string
};
export class CommonEvents {
	protected client: Client;
	public guild?: Guild;
	public guildChannel?: GuildChannel | undefined;
	public message?: Message | undefined;
	constructor(event: string, client: Client, data: any){
		const dat = data as keyof typeof event
		this.client = client;
		if(data.channel_id) this.guildChannel = client.channels.access(data.channel_id);
		if(data.guild_id) this.guild = client.guilds.access(data.guild_id);
		if(event == 'MESSAGE_CREATE' || event == 'INTERACTION_CREATE') this.message = new Message(client, this.guildChannel!, data)		
	}
}