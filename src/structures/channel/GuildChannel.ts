import type { Client } from "../../mod.ts";
import { Message, MessageContent, MessageGetPayload, MessagePayload } from "../mod.ts";
import { BaseChannelStructure, Channel } from "./Channel.ts";
import { GuildChannelVoice } from "./GuildVoiceChannel.ts";
const channelTypeList = {
	0: 'GUILD_TEXT',
	1: 'DM',
	2: 'GUILD_VOICE',
	3: 'GROUP_DM',
	4: 'GUILD_CATEGORY',
	5: 'GUILD_NEWS',
	6: 'GUILD_STORE',
	10: 'GUILD_NEWS_THREAD',
	11: 'GUILD_PUBLIC_THREAD',
	12: 'GUILD_PRIVATE_THREAD',
	13: 'GUILD_STAGE_VOICE'
}
type ChannelType = keyof typeof channelTypeList;
/**
 * ギルドチャンネル用のChannelです。
 */
export class GuildChannel extends Channel{
	type: number;
	voice: GuildChannelVoice | undefined
	/**
	 * チャンネルIDを指定しればとりあえずできます。
	 * @param client 
	 * @param channel_id 
	 */
	constructor(client: Client, channel_id: string, structure?: BaseChannelStructure){
		super(client,channel_id, structure);
		this.client = client;
		this.type = structure!.type || 0;
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
	delete(messageId: string){
		this.client.rest.message.delete(this.channel_id, messageId);
	}
	async getMessage(args?: MessageGetPayload): Promise<(Message)[]>{
		const res = await this.client.rest.getChannelMessages(this.channel_id, args)
		return res;
	}
}