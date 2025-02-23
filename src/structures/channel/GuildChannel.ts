import type { Client } from "../../mod.ts";
import { Channel, type Message, type MessageGetPayload, type MessagePayload } from "../mod.ts";
import { BaseChannelStructure, GuildChannelVoice } from "./mod.ts";

/**
 * ギルドチャンネル用のChannelです。
 */
export class GuildChannel extends Channel{

	voice: GuildChannelVoice | undefined
	/**
	 * チャンネルIDを指定しればとりあえずできます。
	 * @param client 
	 * @param channel_id 
	 */
	constructor(client: Client, channel_id: string, structure?: BaseChannelStructure){
		super(client,channel_id, structure);
		this.client = client;
		if(this.data?.type == 2) this.voice = new GuildChannelVoice(this.client, this)
	}
	static init = async(client: Client, channel_id: string) => {
		const dat = await client.rest.GetChannel(channel_id)
		return new GuildChannel(client,channel_id, dat)
	}
	/**
	 * 指定したチャンネルにメッセージを送信します。
	 * @param data 
	 * @param options 
	 */
	send(data: string | MessagePayload, options?: any){
		let putData: MessagePayload = {
			content: ''
		}
		if(typeof data == 'string') putData.content = data
		else putData = data

		if(options){
			console.log(options.reply)
			putData.message_reference = options.reply
		}
		this.client.rest.message.send(this.channel_id, putData)
	}

	async get(args?: MessageGetPayload): Promise<(Message)[]>{
		const res = await this.client.rest.GetChannelMessages(this.channel_id, args)

		return res;
	}
}