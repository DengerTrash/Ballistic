import type { Client } from "../../mod.ts";
import type { GuildChannel } from "../channel/GuildChannel.ts";
import type { Guild } from "../guild/Guild.ts";
import type { User } from "../user/User.ts";
import { MessageContent, Message } from "../mod.ts";


export interface AnyEventPayload extends MessageContent {
	guild_id: string
};
export class CommonEvents {
	protected client: Client;
	public author?: User;
	public guild?: Guild;
	public channel?: GuildChannel | undefined;
	public message?: Message | undefined;
	constructor(event: string, client: Client, data: any){
		this.client = client;
		if(data.channel_id) this.channel = client.channels.access(data.channel_id);
		if(data.guild_id) this.guild = client.guilds.access(data.guild_id);
		if(event == 'MESSAGE_CREATE' || event == 'INTERACTION_CREATE') this.message = new Message(client, this.channel!, data)
		this.author = data.author
	}
}