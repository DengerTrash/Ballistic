import type { Client } from "../mod.ts";
import { Guild } from "../structures/mod.ts";
import { BaseCache } from "./baseCache.ts";

export class GuildCache extends BaseCache{
	constructor(client: Client){
		super(client)
	}
	public override access(key: string):Guild {
		const result = super.access(key, () => {
			return new Guild(this.client, key)
		})
		return result as Guild;
	}
}