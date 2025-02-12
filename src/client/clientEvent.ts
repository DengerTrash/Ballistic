import { Client } from "../mod.ts";
import { GuildChannel, Message } from "../structures/mod.ts";

export interface ClientEvents {
	CHANNEL_EDIT?: GuildChannel;
	MESSAGE_CREATE?: Message;
}

export class CommonEvents {
	public guildChannel?: GuildChannel | undefined;
	public message?: Message | undefined;
	constructor(event: string, client: Client, data: any){
		if(event == 'MESSAGE_CREATE'){
			this.guildChannel = new GuildChannel(client, data.channel_id);
			this.message = new Message(client, this.guildChannel, data);
		}
	}
}