import type { Client } from "../../mod.ts";
import { Channel, Message, type MessagePayload } from "../mod.ts";

/**
 * ギルドチャンネル用のChannelです。
 */
export class GuildChannel extends Channel{
	readonly channel_id: string;

	/**
	 * チャンネルIDを指定しればとりあえずできます。
	 * @param client 
	 * @param channel_id 
	 */
	constructor(client: Client, channel_id: string){
		super(client);
		this.client = client;
		this.channel_id = channel_id;
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
		this.client.rest.sendMessage(this.channel_id, putData)
	}

	async get(state?: string, enzansi?: string, equal?: any): Promise<(Message)[]>{
		const res = await this.client.rest.GetChannelMessages(this.channel_id)
		return res;
	}
}