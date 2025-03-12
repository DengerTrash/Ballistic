import type { Client } from "../../mod.ts";
import { GuildChannel } from "../channel/GuildChannel.ts";
import { Guild } from "../guild/Guild.ts";
import { User } from "../user/User.ts";
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
		if(data.channel_id) {
			this.client.rest.GetChannel(data.channel_id).then((dat) => {
				this.channel = new GuildChannel(client, data.channel_id, dat);
			});
		}
		if(data.guild_id) this.guild = new Guild(client, data.guild_id);
		if(event == 'MESSAGE_CREATE' || event == 'INTERACTION_CREATE') this.message = new Message(client, this.channel!, data)
		this.author = data.author
	}
}