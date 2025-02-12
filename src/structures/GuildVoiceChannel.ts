import { Client } from "../mod.ts";
import { BaseChannel } from "./BaseChannel.ts";
import { MessagePayload } from "./mod.ts";

export class GuildVoiceChannel extends BaseChannel{
	private client: Client;
	public guild_id: string;
	public channel_id: string;
	constructor(client: Client, guild_id: string, channel_id: string){
		super();
		this.client = client;
		this.channel_id = channel_id;
		this.guild_id = guild_id;
	}
	joinVoiceChannel(self_mute: boolean, self_deaf: boolean){
		this.client.gateway.connectVoiceChannel(this.guild_id, this.channel_id, self_mute, self_deaf);
	}
}