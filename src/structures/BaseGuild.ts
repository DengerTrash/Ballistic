import { Base } from "./Base.ts";

export class BaseGuild extends Base{
	public guild_id: string;
	constructor(guild_id: string){
		super()
		this.guild_id = guild_id
	}
}