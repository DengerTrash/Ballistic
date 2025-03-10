import type { Client } from "../../mod.ts";
import { Cache } from "../base/cache.ts";
import { Guild } from "./Guild.ts";

export class GuildCache extends Cache<Guild>{
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