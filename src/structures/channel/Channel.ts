import type { Client } from "../../mod.ts";
import { Base } from "../base/Base.ts";


export interface BaseChannelStructure {
	id: any
	type: number
}

/**
 * チャンネルのベースです。現状では特別なことはありません。
 */
export abstract class BaseChannel extends Base{
	constructor(client: Client){
		super(client)
	}
}