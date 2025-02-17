import type { Client } from "../mod.ts";
import { GuildChannel } from "../structures/mod.ts";
import { BaseCache } from "./baseCache.ts";

export class ChannelCache extends BaseCache {
	constructor(client: Client){
		super(client);
	}
}

export class GuildChannelCache extends ChannelCache{
	constructor(client: Client){
		super(client)
	}
	public override access(key: string):GuildChannel {
		const result = super.access(key, () => {
			return new GuildChannel(this.client, key)
		})
		return result as GuildChannel;
	}
}