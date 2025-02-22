import type { Client } from "../../mod.ts";
import { Channel, type Message, type MessageGetPayload, type MessagePayload } from "../mod.ts";
import { BaseChannelStructure } from "./mod.ts";

/**
 * ギルドチャンネル用のChannelです。
 */
export class GuildChannel extends Channel{

	/**
	 * チャンネルIDを指定しればとりあえずできます。
	 * @param client 
	 * @param channel_id 
	 */
	constructor(client: Client, channel_id: string, structure?: Omit<BaseChannelStructure, 'id'>){
		super(client,channel_id);
		this.client = client;
		
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

	async get(args?: MessageGetPayload): Promise<(Message)[]>{
		const res = await this.client.rest.GetChannelMessages(this.channel_id, args)

		return res;
	}
}