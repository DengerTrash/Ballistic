import type { Client } from "../../mod.ts";
import { GuildChannel } from "./GuildChannel.ts";

export class GuildChannelVoice{
	client: Client
	public channel: GuildChannel;
	constructor(client: Client, data: GuildChannel){
		this.client = client;
		this.channel = data
	}
	/**
	 * 何かしらの準備工事でございます。
	 * @param self_mute 
	 * @param self_deaf 
	 */
	async join(self_mute: boolean = true, self_deaf: boolean = true){
		console.log(this.channel)
		await this.client.gateway.connectVoiceChannel(this.channel.data?.guild_id!, this.channel.data?.id, self_mute, self_deaf);
	}
}