import type { Client } from "../../mod.ts";
import { GuildChannel } from "./GuildChannel.ts";
import { Cache } from "../base/cache.ts";

/**
 * ギルドチャンネル用のキャッシュです。
 */
export class GuildChannelCache extends Cache<GuildChannel>{
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