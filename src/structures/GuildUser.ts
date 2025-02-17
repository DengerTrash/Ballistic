import { Client } from "../mod.ts";
import { Base } from "./Base.ts";
import { BaseUser } from "./BaseUser.ts";

export class GuildUser extends BaseUser{
	constructor(client: Client){
		super(client)
	}
}