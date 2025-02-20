import type { Client } from "../../mod.ts";
import { Guild } from "./mod.ts";
import { Cache } from "../base/mod.ts";

export class GuildCache extends Cache{
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