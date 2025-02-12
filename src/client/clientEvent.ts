import { Client } from "../mod.ts";
import { Guild, GuildChannel, Message } from "../structures/mod.ts";

export interface ClientEvents {
	CHANNEL_EDIT?: GuildChannel;
	MESSAGE_CREATE?: Message;
}

export class CommonEvents {
	public guild?: Guild;
	public guildChannel?: GuildChannel | undefined;
	public message?: Message | undefined;
	constructor(event: string, client: Client, data: any){
		if(event == 'MESSAGE_CREATE'){
			this.guild = new Guild(data.guild_id);
			this.guildChannel = new GuildChannel(client, this.guild, data.channel_id);
			this.message = new Message(client, this.guildChannel, data);
		}
	}
}