import type { Client } from "../../mod.ts";
import { GuildChannel } from "../mod.ts";
import { Cache } from "../base/mod.ts";


export class ChannelCache extends Cache {
	constructor(client: Client){
		super(client);
	}
}

/**
 * ギルドチャンネル用のキャッシュです。
 */
export class GuildChannelCache extends ChannelCache{
	constructor(client: Client){
		super(client)
	}
	public override access(key: string):GuildChannel {
		const res = super.access(key, ()=>{
			return new GuildChannel(this.client, key)
		})
		return res;
	}
}