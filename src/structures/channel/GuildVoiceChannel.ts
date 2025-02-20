import type { Client } from "../../mod.ts";
import { Channel } from "./mod.ts";

export class GuildVoiceChannel extends Channel{
	public guild_id: string;
	public channel_id: string;
	constructor(client: Client, guild_id: string, channel_id: string){
		super(client);
		this.client = client;
		this.channel_id = channel_id;
		this.guild_id = guild_id;
	}
	/**
	 * 何かしらの準備工事でございます。
	 * @param self_mute 
	 * @param self_deaf 
	 */
	joinVoiceChannel(self_mute: boolean, self_deaf: boolean){
		this.client.gateway.connectVoiceChannel(this.guild_id, this.channel_id, self_mute, self_deaf);
	}
}