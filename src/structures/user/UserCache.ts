import type { Client } from "../../mod.ts";
import { Cache } from "../base/cache.ts";
import { GuildUser } from "./GuildUser.ts";

export class GuildUserCache extends Cache<GuildUser>{
	constructor(client: Client){
		super(client)
	}
	public override access(key: string):GuildUser {
		const result = super.access(key, () => {
			return new GuildUser(this.client, key)
		})
		return result as GuildUser;
	}
}