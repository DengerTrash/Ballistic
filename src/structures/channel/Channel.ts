import type { Client } from "../../mod.ts";
import { Base } from "../base/mod.ts";


export interface BaseChannelStructure {
	id: any
	type: number
	guild_id?: string,
	
}

/**
 * チャンネルのベースです。現状では特別なことはありません。
 */
export abstract class Channel extends Base{
	constructor(client: Client){
		super(client)
	}
}